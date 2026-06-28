import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import './Admin.css';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: '⬛', label: 'Dashboard' },
  { to: '/admin/bookings',  icon: '📋', label: 'Booking Requests', badge: 4 },
  { to: '/admin/services',  icon: '🎪', label: 'Manage Services' },
  { to: '/admin/packages',  icon: '💎', label: 'Manage Packages' },
  { to: '/admin/calendar',  icon: '📅', label: 'Availability' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const isAuthenticated =
    localStorage.getItem('isAdminAuthenticated') === 'true' ||
    sessionStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="adm-layout">
      {/* Sidebar overlay for mobile viewport */}
      {sidebarOpen && (
        <div className="adm-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside className={`adm-sidebar ${sidebarOpen ? 'adm-sidebar--open' : ''}`}>
        <div className="adm-sidebar__brand">
          <div className="adm-sidebar__brand-icon">✦</div>
          <div>
            <div className="adm-sidebar__brand-name">Raj Mahal</div>
            <div className="adm-sidebar__brand-tag">Admin Portal</div>
          </div>
        </div>

        <nav className="adm-sidebar__nav">
          <div className="adm-sidebar__section-label">Navigation</div>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `adm-sidebar__item${isActive ? ' adm-sidebar__item--active' : ''}`
              }
            >
              <span className="adm-sidebar__item-icon">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="adm-sidebar__badge">{item.badge}</span>
              )}
            </NavLink>
          ))}

          <div className="adm-sidebar__section-label" style={{ marginTop: '1rem' }}>Site</div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="adm-sidebar__item"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="adm-sidebar__item-icon">🌐</span>
            Public Website
          </a>
        </nav>

        <div className="adm-sidebar__footer">
          <button className="adm-sidebar__logout" onClick={handleLogout}>
            <span style={{ fontSize: '0.85rem' }}>⎋</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main column ─────────────────────────────────────────────── */}
      <div className="adm-main-col">
        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar__left">
            <button
              className="adm-topbar__menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Sidebar"
            >
              ☰
            </button>
            <div className="adm-topbar__title">Raj Mahal</div>
            <span style={{ color: 'var(--clr-border)', fontSize: '1.2rem' }} className="adm-topbar__bread-arrow">›</span>
            <div className="adm-topbar__breadcrumb">Admin Dashboard</div>
          </div>

          <div className="adm-topbar__right">
            <button className="adm-topbar__notif" aria-label="Notifications">
              🔔
              <span className="adm-topbar__notif-dot" />
            </button>

            <div className="adm-topbar__profile">
              <div className="adm-topbar__avatar">RM</div>
              <div className="adm-topbar__profile-info">
                <div className="adm-topbar__name">Raj Mahal</div>
                <div className="adm-topbar__role">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content rendered here */}
        <div className="adm-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
