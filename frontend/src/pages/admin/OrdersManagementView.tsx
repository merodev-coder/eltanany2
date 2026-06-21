import { useState, useEffect, useCallback } from 'react';
import { Search, X, ZoomIn, CheckCircle, XCircle } from 'lucide-react';
import { getOrders, updateOrderDepositVerificationAsync, updateOrderStatusAsync } from '@/services/mockApi';
import type { Order } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const statusConfig: Record<Order['status'], { label: string; className: string }> = {
  pending: { label: 'معلق', className: 'bg-warning/10 text-warning' },
  processing: { label: 'قيد التنفيذ', className: 'bg-blue-500/10 text-blue-500' },
  completed: { label: 'مكتمل', className: 'bg-success/10 text-success' },
  cancelled: { label: 'ملغي', className: 'bg-error/10 text-error' },
};

const depositStatusConfig = {
  pending: { label: 'قيد المراجعة', className: 'bg-warning/10 text-warning' },
  confirmed: { label: 'تم التأكيد', className: 'bg-success/10 text-success' },
  rejected: { label: 'مرفوض', className: 'bg-error/10 text-error' },
};

const categoryLabels: Record<string, string> = {
  laptop: 'لابتوب',
  accessory: 'إكسسوار',
  gaming: 'ألعاب',
  business: 'أعمال',
  general: 'عام',
  mouse: 'ماوس',
  headset: 'سماعات',
};

export default function OrdersManagementView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filtered = orders.filter(order => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      order.id.toLowerCase().includes(q) ||
      order.customer.name.toLowerCase().includes(q) ||
      order.customer.phone.includes(q)
    );
  });

  const openOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeOrder = () => {
    setSelectedOrder(null);
  };

  const handleDepositVerification = async (status: 'confirmed' | 'rejected') => {
    if (!selectedOrder) return;
    setActionLoading(true);
    await updateOrderDepositVerificationAsync(selectedOrder.id, status);
    const updatedDeposit = {
      ...selectedOrder.deposit,
      paidAmount: selectedOrder.deposit?.paidAmount ?? 0,
      remainingAmount: selectedOrder.deposit?.remainingAmount ?? selectedOrder.total,
      verificationStatus: status,
    };
    const newStatus = status === 'confirmed' ? 'processing' : 'cancelled';
    setOrders(prev =>
      prev.map(o =>
        o.id === selectedOrder.id
          ? { ...o, deposit: updatedDeposit, status: newStatus as Order['status'] }
          : o
      )
    );
    setSelectedOrder({
      ...selectedOrder,
      deposit: updatedDeposit,
      status: newStatus as Order['status'],
    });
    setActionLoading(false);
  };

  const handleStatusChange = async (status: Order['status']) => {
    if (!selectedOrder) return;
    await updateOrderStatusAsync(selectedOrder.id, status);
    setOrders(prev =>
      prev.map(o => (o.id === selectedOrder.id ? { ...o, status } : o))
    );
    setSelectedOrder({ ...selectedOrder, status });
  };

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-card p-12 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-steel-light border-t-ignition-start rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-xl text-[#18181B]">إدارة الطلبات</h2>
        <p className="font-body text-sm text-slate mt-1">متابعة الطلبات ومراجعة إيصالات العربون</p>
      </div>

      <div className="bg-white shadow-sm rounded-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="font-heading font-bold text-lg text-[#18181B]">سجل الطلبات</h3>
          <div className="relative w-full sm:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="بحث برقم الطلب أو اسم العميل..."
              className="w-full h-10 pr-9 pl-4 rounded-lg bg-steel-light border-0 font-body text-sm text-[#18181B] placeholder:text-slate outline-none focus:ring-2 focus:ring-ignition-start/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-steel-light">
                <th className="text-right py-3 px-4 font-body text-sm text-slate font-medium">رقم الطلب</th>
                <th className="text-right py-3 px-4 font-body text-sm text-slate font-medium">اسم العميل</th>
                <th className="text-right py-3 px-4 font-body text-sm text-slate font-medium">تاريخ الطلب</th>
                <th className="text-right py-3 px-4 font-body text-sm text-slate font-medium">القيمة الإجمالية</th>
                <th className="text-right py-3 px-4 font-body text-sm text-slate font-medium">حالة الطلب</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 font-body text-slate">
                    لا توجد طلبات مطابقة
                  </td>
                </tr>
              ) : (
                filtered.map(order => (
                  <tr
                    key={order.id}
                    onClick={() => openOrder(order)}
                    className="border-b border-steel-light/50 last:border-0 hover:bg-steel-light/30 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 font-body text-sm text-[#18181B] font-medium">{order.id}</td>
                    <td className="py-3 px-4 font-body text-sm text-[#18181B]">{order.customer.name}</td>
                    <td className="py-3 px-4 font-body text-sm text-slate">
                      {new Date(order.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                    <td className="py-3 px-4 font-body text-sm text-[#18181B] font-medium">{order.total.toLocaleString()} ج.م</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-body font-medium ${statusConfig[order.status].className}`}>
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={!!selectedOrder} onOpenChange={open => !open && closeOrder()}>
        <SheetContent side="left" className="w-full sm:max-w-xl bg-white p-0 overflow-y-auto">
          {selectedOrder && (
            <div className="p-6 space-y-6">
              <SheetHeader className="p-0">
                <SheetTitle className="font-heading font-bold text-xl text-[#18181B] text-right">
                  تفاصيل الطلب {selectedOrder.id}
                </SheetTitle>
              </SheetHeader>

              <div className="bg-steel-light/50 rounded-xl p-4 space-y-3">
                <h4 className="font-heading font-bold text-sm text-[#18181B]">بيانات العميل</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body text-sm">
                  <div>
                    <span className="text-slate">الاسم:</span>
                    <p className="text-[#18181B] font-medium">{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <span className="text-slate">الهاتف:</span>
                    <p className="text-[#18181B] font-medium" dir="ltr">{selectedOrder.customer.phone}</p>
                  </div>
                  <div>
                    <span className="text-slate">محافظة التوصيل:</span>
                    <p className="text-[#18181B] font-medium">{selectedOrder.customer.governorate}</p>
                  </div>
                  <div>
                    <span className="text-slate">المدينة:</span>
                    <p className="text-[#18181B] font-medium">{selectedOrder.customer.city}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate">العنوان:</span>
                    <p className="text-[#18181B] font-medium">{selectedOrder.customer.address}</p>
                  </div>
                  {selectedOrder.customer.landmark && (
                    <div className="sm:col-span-2">
                      <span className="text-slate">علامة مميزة:</span>
                      <p className="text-[#18181B] font-medium">{selectedOrder.customer.landmark}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-sm text-[#18181B] mb-3">المنتجات المشتراة</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-steel-light">
                      <img
                        src={item.product.images[0] || '/images/logo.jpeg'}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover border border-steel-light flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-medium text-[#18181B] truncate">{item.product.name}</p>
                        <p className="font-body text-xs text-slate">
                          {categoryLabels[item.product.subcategory || item.product.category] || 'عام'}
                        </p>
                        <p className="font-body text-xs text-slate">الكمية: {item.quantity}</p>
                      </div>
                      <p className="font-heading font-bold text-sm text-[#18181B]">
                        {(item.product.price * item.quantity).toLocaleString()} ج.م
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-steel-light rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-[#18181B]">قسم التحقق من العربون</h4>
                  {selectedOrder.deposit?.verificationStatus && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-body font-medium ${depositStatusConfig[selectedOrder.deposit.verificationStatus].className}`}>
                      {depositStatusConfig[selectedOrder.deposit.verificationStatus].label}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-body text-sm font-medium text-[#18181B] mb-2">صورة إيصال العربون</p>
                    {selectedOrder.deposit?.receiptImage ? (
                      <button
                        type="button"
                        onClick={() => setLightboxImage(selectedOrder.deposit!.receiptImage!)}
                        className="relative group w-full rounded-xl overflow-hidden border border-steel-light bg-steel-light/30"
                      >
                        <img
                          src={selectedOrder.deposit.receiptImage}
                          alt=""
                          className="w-full max-h-48 object-contain mx-auto"
                        />
                        <div className="absolute inset-0 bg-carbon/0 group-hover:bg-carbon/40 transition-colors flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ) : (
                      <div className="flex items-center justify-center h-40 rounded-xl border-2 border-dashed border-steel-dark/30 bg-steel-light/30">
                        <p className="font-body text-sm text-slate text-center px-4">لم يرفع العميل إيصالاً بعد</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="bg-steel-light/50 rounded-xl p-4">
                      <p className="font-body text-xs text-slate mb-1">مبلغ العربون المدفوع</p>
                      <p className="font-heading font-bold text-xl text-[#18181B]">
                        {(selectedOrder.deposit?.paidAmount ?? 0).toLocaleString()} ج.م
                      </p>
                    </div>
                    <div className="bg-steel-light/50 rounded-xl p-4">
                      <p className="font-body text-xs text-slate mb-1">القيمة المتبقية للاستلام</p>
                      <p className="font-heading font-bold text-xl text-ignition-start">
                        {(selectedOrder.deposit?.remainingAmount ?? selectedOrder.total).toLocaleString()} ج.م
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleDepositVerification('confirmed')}
                    disabled={actionLoading || selectedOrder.deposit?.verificationStatus === 'confirmed'}
                    className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl gradient-brand text-white font-heading font-bold text-sm hover:shadow-glow transition-shadow disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4" />
                    تأكيد واستلام العربون
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDepositVerification('rejected')}
                    disabled={actionLoading || selectedOrder.deposit?.verificationStatus === 'rejected'}
                    className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-error/10 text-error font-heading font-bold text-sm hover:bg-error/20 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    مرفوض
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-[#18181B] mb-2">حالة الطلب</label>
                <select
                  value={selectedOrder.status}
                  onChange={e => handleStatusChange(e.target.value as Order['status'])}
                  className="w-full h-11 px-4 rounded-lg bg-steel-light border-0 font-body text-sm text-[#18181B] outline-none focus:ring-2 focus:ring-ignition-start/30"
                >
                  <option value="pending">معلق</option>
                  <option value="processing">قيد التنفيذ</option>
                  <option value="completed">مكتمل</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-carbon/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightboxImage}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
