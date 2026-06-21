import { useState, useEffect, useCallback } from 'react';
import { Truck, Store, Save, CheckCircle, Plus, Trash2, Pencil, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDeliverySettings, updateDeliverySettings } from '@/services/mockApi';
import type { DeliverySettings, ShippingCompany, DeliveryGovernorate } from '@/types';

const inputClass =
  'w-full h-11 px-4 rounded-lg bg-steel-light border-0 font-body text-sm text-[#18181B] placeholder:text-slate outline-none focus:ring-2 focus:ring-ignition-start/30 transition-all';

export default function DeliveryOptionsView() {
  const [settings, setSettings] = useState<DeliverySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [govName, setGovName] = useState('');
  const [govFee, setGovFee] = useState('');
  const [govCarrier, setGovCarrier] = useState('');
  const [editingGovId, setEditingGovId] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    const data = await getDeliverySettings();
    setSettings(data);
    const firstActive = data.shippingCompanies.find(c => c.active)?.id || data.shippingCompanies[0]?.id || '';
    setGovCarrier(firstActive);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    await updateDeliverySettings(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateCompany = (id: string, patch: Partial<ShippingCompany>) => {
    if (!settings) return;
    setSettings({
      ...settings,
      shippingCompanies: settings.shippingCompanies.map(c =>
        c.id === id ? { ...c, ...patch } : c
      ),
    });
  };

  const addCompany = () => {
    if (!settings) return;
    const newCompany: ShippingCompany = {
      id: `company-${Date.now()}`,
      name: 'شركة شحن جديدة',
      active: true,
      deliverySla: '2-4 أيام عمل',
    };
    setSettings({
      ...settings,
      shippingCompanies: [...settings.shippingCompanies, newCompany],
    });
  };

  const removeCompany = (id: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      shippingCompanies: settings.shippingCompanies.filter(c => c.id !== id),
      governorates: settings.governorates.map(g =>
        g.carrierId === id
          ? { ...g, carrierId: settings.shippingCompanies.find(c => c.id !== id)?.id || '' }
          : g
      ),
    });
  };

  const resetGovForm = () => {
    setGovName('');
    setGovFee('');
    setEditingGovId(null);
    if (settings) {
      const firstActive = settings.shippingCompanies.find(c => c.active)?.id || settings.shippingCompanies[0]?.id || '';
      setGovCarrier(firstActive);
    }
  };

  const handleGovSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || !govName.trim() || !govFee || !govCarrier) return;
    if (editingGovId) {
      setSettings({
        ...settings,
        governorates: settings.governorates.map(g =>
          g.id === editingGovId
            ? { ...g, name: govName.trim(), shippingFee: Number(govFee), carrierId: govCarrier }
            : g
        ),
      });
    } else {
      const newGov: DeliveryGovernorate = {
        id: `gov-${Date.now()}`,
        name: govName.trim(),
        shippingFee: Number(govFee),
        carrierId: govCarrier,
      };
      setSettings({
        ...settings,
        governorates: [...settings.governorates, newGov],
      });
    }
    resetGovForm();
  };

  const startEditGov = (gov: DeliveryGovernorate) => {
    setEditingGovId(gov.id);
    setGovName(gov.name);
    setGovFee(String(gov.shippingFee));
    setGovCarrier(gov.carrierId);
  };

  const deleteGov = (id: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      governorates: settings.governorates.filter(g => g.id !== id),
    });
    if (editingGovId === id) resetGovForm();
  };

  const activeCarriers = settings?.shippingCompanies.filter(c => c.active) || [];

  const getCarrierName = (carrierId: string) =>
    settings?.shippingCompanies.find(c => c.id === carrierId)?.name || '—';

  if (loading || !settings) {
    return (
      <div className="bg-white shadow-sm rounded-card p-12 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-steel-light border-t-ignition-start rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-[#18181B]">خيارات التوصيل وإدارة المحافظات</h2>
          <p className="font-body text-sm text-slate mt-1">إدارة شركات الشحن وتسعير المحافظات ديناميكياً</p>
        </div>
        <button
          type="button"
          onClick={addCompany}
          className="flex items-center justify-center gap-2 px-4 h-11 rounded-xl border border-ignition-start text-ignition-start font-body text-sm font-medium hover:bg-ignition-start/5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          إضافة شركة شحن
        </button>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20 text-success font-body text-sm"
        >
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          تم حفظ الإعدادات بنجاح
        </motion.div>
      )}

      <div>
        <h3 className="font-heading font-bold text-lg text-[#18181B] mb-4">إدارة شركات الشحن</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {settings.shippingCompanies.map(company => (
            <div
              key={company.id}
              className={`bg-white shadow-sm rounded-card p-5 border-2 transition-colors ${company.active ? 'border-ignition-start/30' : 'border-transparent'}`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ignition-start/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-ignition-start" />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={company.name}
                      onChange={e => updateCompany(company.id, { name: e.target.value })}
                      className="font-heading font-bold text-base text-[#18181B] bg-transparent border-0 outline-none w-full"
                    />
                    <p className="font-body text-xs text-slate">اسم الشركة</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateCompany(company.id, { active: !company.active })}
                    className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${company.active ? 'gradient-brand' : 'bg-steel-dark/30'}`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${company.active ? 'right-0.5' : 'left-0.5'}`}
                    />
                  </button>
                  {settings.shippingCompanies.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCompany(company.id)}
                      className="p-2 rounded-lg text-error hover:bg-error/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className={!company.active ? 'opacity-50 pointer-events-none' : ''}>
                <label className="block font-body text-sm font-medium text-[#18181B] mb-2">مدة الشحن المتوقعة</label>
                <input
                  type="text"
                  value={company.deliverySla}
                  onChange={e => updateCompany(company.id, { deliverySla: e.target.value })}
                  className={inputClass}
                  placeholder="مثال: 2-3 أيام عمل"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <MapPin className="w-5 h-5 text-ignition-start" />
          <h3 className="font-heading font-bold text-lg text-[#18181B]">إضافة وإدارة المحافظات</h3>
        </div>

        <form onSubmit={handleGovSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-steel-light/50 rounded-xl">
          <div>
            <label className="block font-body text-sm font-medium text-[#18181B] mb-2">اسم المحافظة</label>
            <input
              type="text"
              value={govName}
              onChange={e => setGovName(e.target.value)}
              className={inputClass}
              placeholder="مثال: القاهرة"
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-[#18181B] mb-2">تكلفة الشحن (ج.م)</label>
            <input
              type="number"
              min="0"
              value={govFee}
              onChange={e => setGovFee(e.target.value)}
              className={inputClass}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-[#18181B] mb-2">الشركة المسؤولة</label>
            <select
              value={govCarrier}
              onChange={e => setGovCarrier(e.target.value)}
              className={inputClass}
            >
              {activeCarriers.length === 0 ? (
                <option value="">لا توجد شركات نشطة</option>
              ) : (
                activeCarriers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))
              )}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              disabled={!govName.trim() || !govFee || !govCarrier}
              className="flex-1 h-11 rounded-xl gradient-brand text-white font-heading font-bold text-sm hover:shadow-glow transition-shadow disabled:opacity-50"
            >
              {editingGovId ? 'تحديث المحافظة' : 'إضافة محافظة'}
            </button>
            {editingGovId && (
              <button
                type="button"
                onClick={resetGovForm}
                className="h-11 px-4 rounded-xl bg-steel-light text-slate font-body text-sm hover:text-[#18181B] transition-colors"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-steel-light">
                <th className="text-right py-3 px-4 font-body text-sm text-slate font-medium">المحافظة</th>
                <th className="text-right py-3 px-4 font-body text-sm text-slate font-medium">تكلفة الشحن</th>
                <th className="text-right py-3 px-4 font-body text-sm text-slate font-medium">الشركة المسؤولة</th>
                <th className="text-right py-3 px-4 font-body text-sm text-slate font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {settings.governorates.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 font-body text-slate">لا توجد محافظات مضافة</td>
                </tr>
              ) : (
                settings.governorates.map(gov => (
                  <tr key={gov.id} className="border-b border-steel-light/50 last:border-0 hover:bg-steel-light/30 transition-colors">
                    <td className="py-3 px-4 font-body text-sm text-[#18181B] font-medium">{gov.name}</td>
                    <td className="py-3 px-4 font-body text-sm text-[#18181B]">{gov.shippingFee.toLocaleString()} ج.م</td>
                    <td className="py-3 px-4 font-body text-sm text-slate">{getCarrierName(gov.carrierId)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEditGov(gov)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-ignition-start font-body text-xs font-medium hover:bg-ignition-start/10 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          تعديل
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteGov(gov.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-error font-body text-xs font-medium hover:bg-error/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`bg-white shadow-sm rounded-card p-6 border-2 transition-colors ${settings.storePickup.enabled ? 'border-ignition-start/30' : 'border-transparent'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-ignition-start/10 flex items-center justify-center">
              <Store className="w-5 h-5 text-ignition-start" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#18181B]">استلام من الفرع</h3>
          </div>
          <button
            type="button"
            onClick={() =>
              setSettings({
                ...settings,
                storePickup: { ...settings.storePickup, enabled: !settings.storePickup.enabled },
              })
            }
            className={`relative w-12 h-6 rounded-full transition-colors ${settings.storePickup.enabled ? 'gradient-brand' : 'bg-steel-dark/30'}`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${settings.storePickup.enabled ? 'right-0.5' : 'left-0.5'}`}
            />
          </button>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${!settings.storePickup.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <label className="block font-body text-sm font-medium text-[#18181B] mb-2">عنوان الفرع</label>
            <input
              type="text"
              value={settings.storePickup.address}
              onChange={e =>
                setSettings({
                  ...settings,
                  storePickup: { ...settings.storePickup, address: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-[#18181B] mb-2">مواعيد العمل</label>
            <input
              type="text"
              value={settings.storePickup.workingHours}
              onChange={e =>
                setSettings({
                  ...settings,
                  storePickup: { ...settings.storePickup, workingHours: e.target.value },
                })
              }
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="flex items-center justify-center gap-2 px-8 h-12 rounded-xl gradient-brand text-white font-heading font-bold hover:shadow-glow transition-shadow disabled:opacity-50"
      >
        {saving ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Save className="w-5 h-5" />
            حفظ الإعدادات
          </>
        )}
      </button>
    </div>
  );
}
