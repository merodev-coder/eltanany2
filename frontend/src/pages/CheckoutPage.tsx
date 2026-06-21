import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Package, Check, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { createOrder, getGovernorates } from '@/services/mockApi';
import type { Governorate } from '@/types';

const steps = [
  { id: 'info', label: 'البيانات', icon: MapPin },
  { id: 'delivery', label: 'التوصيل', icon: Package },
  { id: 'payment', label: 'الدفع', icon: CreditCard },
  { id: 'confirm', label: 'التأكيد', icon: Check },
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [formData, setFormData] = useState({
    name: '', phone: '', governorate: '', city: '', address: '', landmark: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'pickup'>('home');
  const [loading, setLoading] = useState(false);

  const deliveryCost = deliveryMethod === 'home' ? 50 : 0;
  const finalTotal = totalPrice + deliveryCost;

  const loadGovernorates = async () => {
    if (governorates.length === 0) {
      const data = await getGovernorates();
      setGovernorates(data);
    }
  };

  const selectedGov = governorates.find(g => g.name === formData.governorate);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.name.trim() && formData.phone.trim() && formData.governorate && formData.city.trim() && formData.address.trim();
      case 1: return true;
      case 2: return true;
      default: return false;
    }
  };

  const submitOrder = async () => {
    setLoading(true);
    try {
      const order = await createOrder({
        customer: {
          name: formData.name,
          phone: formData.phone,
          governorate: formData.governorate,
          city: formData.city,
          address: formData.address,
          landmark: formData.landmark,
        },
        items,
        deliveryMethod,
        paymentMethod: 'cod',
        total: finalTotal,
      });
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch {
      showToast('حدث خطأ، حاول مرة أخرى', 'error');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const inputClass = "w-full h-12 px-4 rounded-xl bg-white border border-steel-light font-body text-ink placeholder:text-slate outline-none focus:border-ignition-start focus:ring-2 focus:ring-ignition-start/20 transition-all duration-200";
  const labelClass = "block font-body text-sm font-medium text-ink mb-1.5";

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-ink mb-8 text-center">إتمام الطلب</h1>

        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-steel-light -translate-y-1/2" />
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStep;
            const isDone = idx < currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDone ? 'bg-success text-white' : isActive ? 'gradient-brand text-white shadow-glow' : 'bg-steel-light text-slate'
                }`}>
                  {isDone ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`font-body text-xs ${isActive || isDone ? 'text-ink font-medium' : 'text-slate'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-card p-6 sm:p-8"
          >
            {currentStep === 0 && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-lg text-ink mb-4">بيانات التوصيل</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>الاسم الكامل *</label>
                    <input type="text" value={formData.name} onChange={e => updateField('name', e.target.value)} className={inputClass} placeholder="محمد أحمد" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>رقم الموبايل *</label>
                    <input type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} className={inputClass} placeholder="01xxxxxxxxx" dir="ltr" />
                  </div>
                  <div>
                    <label className={labelClass}>المحافظة *</label>
                    <select
                      value={formData.governorate}
                      onChange={e => { updateField('governorate', e.target.value); loadGovernorates(); }}
                      className={inputClass}
                    >
                      <option value="">اختر المحافظة</option>
                      {governorates.map(g => (
                        <option key={g.name} value={g.name}>{g.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>المدينة / المنطقة *</label>
                    <select
                      value={formData.city}
                      onChange={e => updateField('city', e.target.value)}
                      className={inputClass}
                      disabled={!selectedGov}
                    >
                      <option value="">اختر المدينة</option>
                      {selectedGov?.cities.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>العنوان التفصيلي *</label>
                    <input type="text" value={formData.address} onChange={e => updateField('address', e.target.value)} className={inputClass} placeholder="الشارع، رقم العمارة، الشقة" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>أقرب علامة مميزة (اختياري)</label>
                    <input type="text" value={formData.landmark} onChange={e => updateField('landmark', e.target.value)} className={inputClass} placeholder="مثال: بجوار مسجد، محل كذا" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <h2 className="font-heading font-bold text-lg text-ink mb-4">طريقة التوصيل</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setDeliveryMethod('home')}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 text-right transition-all duration-200 ${
                      deliveryMethod === 'home' ? 'border-ignition-start bg-ignition-start/5' : 'border-steel-light hover:border-steel-dark'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      deliveryMethod === 'home' ? 'border-ignition-start' : 'border-steel-dark'
                    }`}>
                      {deliveryMethod === 'home' && <div className="w-2.5 h-2.5 rounded-full bg-ignition-start" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-heading font-bold text-ink">توصيل للمنزل</p>
                      <p className="font-body text-sm text-slate">التوصيل خلال 2-5 أيام عمل</p>
                    </div>
                    <span className="font-heading font-bold text-ink">50 ج.م</span>
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 text-right transition-all duration-200 ${
                      deliveryMethod === 'pickup' ? 'border-ignition-start bg-ignition-start/5' : 'border-steel-light hover:border-steel-dark'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      deliveryMethod === 'pickup' ? 'border-ignition-start' : 'border-steel-dark'
                    }`}>
                      {deliveryMethod === 'pickup' && <div className="w-2.5 h-2.5 rounded-full bg-ignition-start" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-heading font-bold text-ink">استلام من المتجر</p>
                      <p className="font-body text-sm text-slate">القاهرة، مصر</p>
                    </div>
                    <span className="font-heading font-bold text-success">مجاني</span>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="font-heading font-bold text-lg text-ink mb-4">طريقة الدفع</h2>
                <div className="p-5 rounded-xl border-2 border-ignition-start bg-ignition-start/5">
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-ignition-start flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-ignition-start" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-ink">الدفع عند الاستلام</p>
                      <p className="font-body text-sm text-slate">ادفع لما تستلم الطلب</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-steel-light/50">
                  <p className="font-body text-sm text-slate text-center">وسائل دفع إلكترونية قريباً</p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="font-heading font-bold text-lg text-ink mb-4">تأكيد الطلب</h2>
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-xl bg-steel-light/50">
                    <p className="font-body text-sm text-slate mb-1">الاسم</p>
                    <p className="font-body text-ink font-medium">{formData.name}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-steel-light/50">
                    <p className="font-body text-sm text-slate mb-1">العنوان</p>
                    <p className="font-body text-ink font-medium">{formData.governorate}، {formData.city}، {formData.address}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-steel-light/50">
                    <p className="font-body text-sm text-slate mb-1">التوصيل</p>
                    <p className="font-body text-ink font-medium">{deliveryMethod === 'home' ? 'توصيل للمنزل' : 'استلام من المتجر'}</p>
                  </div>
                </div>
                <div className="border-t border-steel-light pt-4 space-y-2">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-slate">المجموع</span>
                    <span className="text-ink">{totalPrice.toLocaleString()} ج.م</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-slate">الشحن</span>
                    <span className="text-ink">{deliveryCost === 0 ? 'مجاني' : `${deliveryCost} ج.م`}</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-lg pt-2">
                    <span>الإجمالي</span>
                    <span>{finalTotal.toLocaleString()} ج.م</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 h-12 rounded-xl border-2 border-steel-light text-ink font-body font-medium hover:border-ignition-start transition-colors duration-200"
                >
                  رجوع
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => canProceed() && setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className={`flex-[2] h-12 rounded-xl font-heading font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                    canProceed() ? 'gradient-brand text-white hover:shadow-glow' : 'bg-steel-light text-slate cursor-not-allowed'
                  }`}
                >
                  التالي
                  <ChevronLeft className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={submitOrder}
                  disabled={loading}
                  className="flex-[2] h-12 rounded-xl gradient-brand text-white font-heading font-bold flex items-center justify-center gap-2 hover:shadow-glow transition-shadow duration-300 disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>تأكيد الطلب</>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
