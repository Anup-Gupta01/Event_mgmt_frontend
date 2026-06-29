import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: '?', label: 'Dashboard' },
  { to: '/admin/bookings',  icon: '??', label: 'Booking Requests' },
  { to: '/admin/services',  icon: '??', label: 'Manage Services' },
  { to: '/admin/packages',  icon: '??', label: 'Manage Packages' },
  { to: '/admin/calendar',  icon: '??', label: 'Availability' },
];

function getInitials(name) {
  if (!name) return 'A';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not logged in or not admin
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="adm-layout">
      {/* Sidebar overlay for mobile viewport */}
      {sidebarOpen && (
        <div className="adm-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* -- Sidebar --------------------------------------------------- */}
      <aside className={`adm-sidebar ${sidebarOpen ? 'adm-sidebar--open' : ''}`}>
        <div className="adm-sidebar__brand">
          <div className="adm-sidebar__brand-icon">?</div>
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
            <span className="adm-sidebar__item-icon">??</span>
            Public Website
          </a>
        </nav>

        <div className="adm-sidebar__footer">
          <div style={{ padding: '0 1rem 0.75rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
            Signed in as <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{user?.name}</strong>
          </div>
          <button className="adm-sidebar__logout" onClick={handleLogout}>
            <span style={{ fontSize: '0.85rem' }}>?</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* -- Main column ----------------------------------------------- */}
      <div className="adm-main-col">
        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar__left">
            <button
              className="adm-topbar__menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Sidebar"
            >
              ?
            </button>
            <div className="adm-topbar__title">Raj Mahal</div>
            <span style={{ color: 'var(--clr-border)', fontSize: '1.2rem' }} className="adm-topbar__bread-arrow">›</span>
            <div className="adm-topbar__breadcrumb">Admin Dashboard</div>
          </div>

          <div className="adm-topbar__right">
            <button className="adm-topbar__notif" aria-label="Notifications">
              ??
              <span className="adm-topbar__notif-dot" />
            </button>

            <div className="adm-topbar__profile">
              <div className="adm-topbar__avatar">{getInitials(user?.name)}</div>
              <div className="adm-topbar__profile-info">
                <div className="adm-topbar__name">{user?.name || 'Admin'}</div>
                <div className="adm-topbar__role">Administrator</div>
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
