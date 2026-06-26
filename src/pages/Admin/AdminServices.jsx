import { useState } from 'react';
import './Admin.css';

const INITIAL_SERVICES = [
  { id: 1, icon: '💐', name: 'Floral Decoration', description: 'Premium imported and local floral arrangements for all venues and mandaps', price: 185000, tag: 'Decor', available: true },
  { id: 2, icon: '🎵', name: 'Live Music & Orchestra', description: 'Classical shehnai, folk and Bollywood live bands, DJ & sound system', price: 120000, tag: 'Entertainment', available: true },
  { id: 3, icon: '🍽️', name: 'Royal Catering', description: 'Multi-cuisine catering — Rajasthani, Mughlai, Continental, South Indian', price: 1800, tag: 'Catering', available: true },
  { id: 4, icon: '📸', name: 'Photography & Videography', description: 'Professional DSLR photographers, drone coverage, cinematic reel edits', price: 95000, tag: 'Media', available: true },
  { id: 5, icon: '💡', name: 'Lighting & AV Setup', description: 'LED wash, truss lighting, projectors, LED walls and PA system', price: 75000, tag: 'Technical', available: true },
  { id: 6, icon: '🚗', name: 'Guest Transportation', description: 'Luxury coaches, vintage car entry, airport transfers for outstation guests', price: 45000, tag: 'Logistics', available: false },
  { id: 7, icon: '🎪', name: 'Tent & Shamiana', description: 'Customised fabric canopies, rajasthani tents, German hangar structures', price: 250000, tag: 'Infrastructure', available: true },
  { id: 8, icon: '🎨', name: 'Theme & Concept Design', description: 'Complete event concept, mood boards, colour palette and décor coordination', price: 55000, tag: 'Design', available: true },
];

function ServiceModal({ service, onClose, onSave }) {
  const [form, setForm] = useState(service || { icon: '', name: '', description: '', price: '', tag: '', available: true });

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ ...form, price: Number(form.price) });
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-modal__header">
          <h2 className="adm-modal__title">{service ? 'Edit Service' : 'Add New Service'}</h2>
          <button className="adm-modal__close" onClick={onClose}>✕</button>
        </div>

        <form className="adm-modal__body" onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 'var(--sp-3)' }}>
            <div className="form-group">
              <label className="form-label">Icon</label>
              <input
                className="form-input"
                value={form.icon}
                onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                placeholder="💐"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Service Name *</label>
              <input
                className="form-input"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Floral Decoration"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="form-input form-textarea"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of the service offered…"
              rows={3}
              required
              style={{ minHeight: '80px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
            <div className="form-group">
              <label className="form-label">Base Price (₹) *</label>
              <input
                type="number"
                className="form-input"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                placeholder="85000"
                required
                min={0}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category Tag *</label>
              <select
                className="form-select"
                value={form.tag}
                onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                required
              >
                <option value="">Select category</option>
                {['Decor', 'Catering', 'Entertainment', 'Media', 'Technical', 'Logistics', 'Infrastructure', 'Design'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--fs-sm)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.available}
              onChange={e => setForm(f => ({ ...f, available: e.target.checked }))}
              style={{ accentColor: 'var(--clr-maroon)' }}
            />
            Service is currently available
          </label>

          <div className="adm-modal__footer">
            <button type="button" className="btn btn--secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--primary">
              {service ? 'Save Changes' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminServices() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [modal, setModal] = useState(null); // null | 'add' | service object

  const toggleAvail = (id) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, available: !s.available } : s));
  };

  const deleteService = (id) => {
    if (!window.confirm('Delete this service?')) return;
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const handleSave = (data) => {
    if (modal === 'add') {
      setServices(prev => [...prev, { ...data, id: Date.now() }]);
    } else {
      setServices(prev => prev.map(s => s.id === modal.id ? { ...s, ...data } : s));
    }
    setModal(null);
  };

  return (
    <div>
      {modal && (
        <ServiceModal
          service={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Manage Services</h1>
          <p className="adm-page-sub">{services.length} services configured · {services.filter(s => s.available).length} currently available</p>
        </div>
        <button
          id="add-service-btn"
          className="btn btn--primary"
          style={{ fontSize: 'var(--fs-sm)' }}
          onClick={() => setModal('add')}
        >
          + Add Service
        </button>
      </div>

      <div className="adm-table-card">
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Service Name</th>
                <th>Description</th>
                <th>Base Price</th>
                <th>Category</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(svc => (
                <tr key={svc.id}>
                  <td>
                    <div className="adm-service-icon-cell">{svc.icon}</div>
                  </td>
                  <td>
                    <div className="adm-table__primary">{svc.name}</div>
                  </td>
                  <td style={{ maxWidth: '280px', whiteSpace: 'normal', lineHeight: '1.4', color: 'var(--clr-muted)', fontSize: 'var(--fs-xs)' }}>
                    {svc.description}
                  </td>
                  <td>
                    <span className="adm-price-tag">
                      ₹{svc.price.toLocaleString('en-IN')}
                    </span>
                    {svc.tag === 'Catering' && <span style={{ fontSize: '0.65rem', color: 'var(--clr-muted)' }}> /plate</span>}
                  </td>
                  <td>
                    <span className="adm-badge adm-badge--new" style={{ fontSize: '0.62rem' }}>{svc.tag}</span>
                  </td>
                  <td>
                    <label className="adm-toggle">
                      <input
                        type="checkbox"
                        checked={svc.available}
                        onChange={() => toggleAvail(svc.id)}
                        aria-label={`Toggle availability for ${svc.name}`}
                      />
                      <span className="adm-toggle__track" />
                    </label>
                  </td>
                  <td>
                    <div className="adm-actions-row">
                      <button
                        className="adm-action-btn"
                        title="Edit service"
                        onClick={() => setModal(svc)}
                        aria-label={`Edit ${svc.name}`}
                      >
                        ✏
                      </button>
                      <button
                        className="adm-action-btn adm-action-btn--delete"
                        title="Delete service"
                        onClick={() => deleteService(svc.id)}
                        aria-label={`Delete ${svc.name}`}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
