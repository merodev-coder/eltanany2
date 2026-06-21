import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'لابتوبات', href: '/laptops' },
    { label: 'إكسسوارات', href: '/accessories' },
    { label: 'قائمة الأسعار', href: '/price-list' },
    { label: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 right-0 z-50 w-full bg-white shadow-sm">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/images/logo.jpeg" alt="ELTANANY 2" className="h-10 w-10 object-contain rounded" />
            <span className="font-heading font-bold text-lg text-ink">
              ELTANANY 2
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-body text-sm font-medium transition-colors duration-200 hover:text-ignition-start ${location.pathname === link.href ? 'text-ignition-start' : 'text-ink/70'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-steel-light transition-colors duration-200"
              aria-label="بحث"
            >
              <Search className="w-5 h-5 text-ink" />
            </button>

            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-steel-light transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5 text-ink" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white gradient-brand rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAdmin && (
              <Link
                to="/AhmedEltanany"
                className="hidden md:flex p-2 rounded-full hover:bg-steel-light transition-colors duration-200"
              >
                <User className="w-5 h-5 text-ignition-start" />
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full hover:bg-steel-light transition-colors duration-200"
              aria-label="القائمة"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-steel-light bg-white"
            >
              <form onSubmit={handleSearch} className="p-4 max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن منتج، ماركة، أو فئة..."
                    className="w-full h-12 pr-12 pl-4 rounded-full bg-steel-light border-0 font-body text-ink placeholder:text-slate focus:ring-2 focus:ring-ignition-start/30 outline-none transition-all duration-200"
                    autoFocus
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-steel-light bg-white"
            >
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-3 rounded-lg font-body text-sm font-medium transition-colors ${location.pathname === link.href ? 'bg-ignition-start/10 text-ignition-start' : 'text-ink/70 hover:bg-steel-light'}`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    to="/AhmedEltanany"
                    className="px-4 py-3 rounded-lg font-body text-sm font-medium text-ignition-start hover:bg-ignition-start/10 transition-colors"
                  >
                    لوحة التحكم
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="h-16" />
    </>
  );
}
