import { useState } from 'react';
import './Admin.css';

const INITIAL_PACKAGES = [
  {
    id: 1,
    name: 'Silver Celebration',
    tier: 'Essential',
    pricePerPlate: 2200,
    capacity: '50–150',
    duration: '1 Day',
    services: [
      'Floral Decoration (Basic)',
      'Royal Catering — 5 Courses',
      'Sound System & DJ',
      'Photography (6 hours)',
      'Event Coordinator',
      'Complimentary Valet Parking',
    ],
  },
  {
    id: 2,
    name: 'Golden Splendour',
    tier: 'Premium',
    pricePerPlate: 3800,
    capacity: '150–400',
    duration: '2 Days',
    services: [
      'Premium Floral Decoration',
      'Multi-Cuisine Royal Catering',
      'Live Music & DJ',
      'Photography + Videography',
      'Lighting & AV Setup',
      'Guest Transportation (Local)',
      'Bridal Suite (1 night)',
      'Dedicated Event Manager',
    ],
  },
  {
    id: 3,
    name: 'Maharaja Grand',
    tier: 'Luxury',
    pricePerPlate: 6500,
    capacity: '300–600',
    duration: '3 Days',
    services: [
      'Designer Floral & Theme Décor',
      'Premium Multi-Cuisine Banquet',
      'Live Orchestra & Bollywood Band',
      'Drone + Cinematic Videography',
      'Full Lighting & LED Wall',
      'Airport Transfers & Coaches',
      'Heritage Suite (3 nights)',
      'Fireworks Display',
      'Dedicated Planning Team',
      'Sangeet, Haldi & Wedding Day',
    ],
  },
  {
    id: 4,
    name: 'Corporate Excellence',
    tier: 'Corporate',
    pricePerPlate: 1800,
    capacity: '30–200',
    duration: '1 Day',
    services: [
      'Branded Stage & Backdrop',
      'Business Catering Package',
      'PA System & LED Screen',
      'Photo Coverage (4 hours)',
      'Registration Desk Setup',
      'High-speed Wi-Fi & AV Tech',
    ],
  },
];

const TIER_COLORS = {
  Essential:  { bg: '#EDE4D8', text: '#6B4C2A', border: '#D4C4A8' },
  Premium:    { bg: '#E8EDF8', text: '#1D4A8E', border: '#B8C8E8' },
  Luxury:     { bg: '#F5EFE7', text: '#6B1F2A', border: '#D4AF5A' },
  Corporate:  { bg: '#EEF2EC', text: '#2D5A3A', border: '#A8C8A8' },
};

function PackageModal({ pkg, onClose, onSave }) {
  const [form, setForm] = useState(
    pkg || { name: '', tier: 'Essential', pricePerPlate: '', capacity: '', duration: '', services: [] }
  );
  const [svcInput, setSvcInput] = useState('');

  const addSvc = () => {
    const v = svcInput.trim();
    if (v && !form.services.includes(v)) {
      setForm(f => ({ ...f, services: [...f.services, v] }));
    }
    setSvcInput('');
  };

  const removeSvc = (i) => setForm(f => ({ ...f, services: f.services.filter((_, idx) => idx !== i) }));

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ ...form, pricePerPlate: Number(form.pricePerPlate) });
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        <div className="adm-modal__header">
          <h2 className="adm-modal__title">{pkg ? 'Edit Package' : 'Add New Package'}</h2>
          <button className="adm-modal__close" onClick={onClose}>✕</button>
        </div>

        <form className="adm-modal__body" onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
            <div className="form-group">
              <label className="form-label">Package Name *</label>
              <input className="form-input" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Golden Splendour" required />
            </div>
            <div className="form-group">
              <label className="form-label">Tier *</label>
              <select className="form-select" value={form.tier}
                onChange={e => setForm(f => ({ ...f, tier: e.target.value }))} required>
                {['Essential', 'Premium', 'Luxury', 'Corporate'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--sp-3)' }}>
            <div className="form-group">
              <label className="form-label">Price / Plate (₹) *</label>
              <input type="number" className="form-input" value={form.pricePerPlate}
                onChange={e => setForm(f => ({ ...f, pricePerPlate: e.target.value }))}
                placeholder="2200" required min={0} />
            </div>
            <div className="form-group">
              <label className="form-label">Capacity *</label>
              <input className="form-input" value={form.capacity}
                onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
                placeholder="150–400" required />
            </div>
            <div className="form-group">
              <label className="form-label">Duration *</label>
              <input className="form-input" value={form.duration}
                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                placeholder="2 Days" required />
            </div>
          </div>

          {/* Included services */}
          <div className="form-group">
            <label className="form-label">Included Services</label>
            <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
              <input className="form-input" value={svcInput}
                onChange={e => setSvcInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSvc(); } }}
                placeholder="Type a service and press Enter or Add" />
              <button type="button" className="btn btn--secondary" style={{ flexShrink: 0 }} onClick={addSvc}>
                Add
              </button>
            </div>
            {form.services.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', marginTop: 'var(--sp-2)' }}>
                {form.services.map((s, i) => (
                  <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '3px 10px', background: 'var(--clr-surface-alt)',
                    border: '1px solid var(--clr-border)', borderRadius: '100px',
                    fontSize: 'var(--fs-xs)', color: 'var(--clr-body)'
                  }}>
                    {s}
                    <button type="button" onClick={() => removeSvc(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-muted)', fontSize: '0.65rem', padding: 0 }}>✕</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="adm-modal__footer">
            <button type="button" className="btn btn--secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--primary">
              {pkg ? 'Save Changes' : 'Add Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPackages() {
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [modal, setModal] = useState(null);

  const deletePackage = (id) => {
    if (!window.confirm('Delete this package?')) return;
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  const handleSave = (data) => {
    if (modal === 'add') {
      setPackages(prev => [...prev, { ...data, id: Date.now() }]);
    } else {
      setPackages(prev => prev.map(p => p.id === modal.id ? { ...p, ...data } : p));
    }
    setModal(null);
  };

  return (
    <div>
      {modal && (
        <PackageModal
          pkg={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Manage Packages</h1>
          <p className="adm-page-sub">{packages.length} packages configured</p>
        </div>
        <button
          id="add-package-btn"
          className="btn btn--primary"
          style={{ fontSize: 'var(--fs-sm)' }}
          onClick={() => setModal('add')}
        >
          + Add Package
        </button>
      </div>

      <div className="adm-pkg-grid">
        {packages.map(pkg => {
          const tierStyle = TIER_COLORS[pkg.tier] || TIER_COLORS.Essential;
          return (
            <div key={pkg.id} className="adm-pkg-card">
              {/* Header */}
              <div className="adm-pkg-card__header">
                <div>
                  <div className="adm-pkg-card__name">{pkg.name}</div>
                  <div className="adm-pkg-card__tier"
                    style={{ color: tierStyle.text, background: tierStyle.bg, display: 'inline-block', padding: '2px 8px', borderRadius: '3px', marginTop: '4px', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}
                  >
                    {pkg.tier}
                  </div>
                </div>
                <div className="adm-pkg-card__price">
                  <div className="adm-pkg-card__amount">
                    ₹{pkg.pricePerPlate.toLocaleString('en-IN')}
                  </div>
                  <div className="adm-pkg-card__per">per plate</div>
                </div>
              </div>

              {/* Body */}
              <div className="adm-pkg-card__body">
                {/* Meta row */}
                <div className="adm-pkg-meta">
                  <div className="adm-pkg-meta__item">
                    <span className="adm-pkg-meta__val">👥 {pkg.capacity}</span>
                    <span className="adm-pkg-meta__lbl">Capacity</span>
                  </div>
                  <div className="adm-pkg-meta__item">
                    <span className="adm-pkg-meta__val">📅 {pkg.duration}</span>
                    <span className="adm-pkg-meta__lbl">Duration</span>
                  </div>
                  <div className="adm-pkg-meta__item">
                    <span className="adm-pkg-meta__val">✦ {pkg.services.length}</span>
                    <span className="adm-pkg-meta__lbl">Services</span>
                  </div>
                </div>

                {/* Services list */}
                <div className="adm-pkg-services">
                  {pkg.services.map((svc, i) => (
                    <div key={i} className="adm-pkg-service">{svc}</div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="adm-pkg-card__footer">
                <button
                  className="adm-action-btn"
                  title="Edit package"
                  onClick={() => setModal(pkg)}
                  aria-label={`Edit ${pkg.name}`}
                  style={{ width: 'auto', padding: '0 12px', fontSize: 'var(--fs-xs)', gap: '4px', display: 'flex', alignItems: 'center' }}
                >
                  ✏ Edit
                </button>
                <button
                  className="adm-action-btn adm-action-btn--delete"
                  title="Delete package"
                  onClick={() => deletePackage(pkg.id)}
                  aria-label={`Delete ${pkg.name}`}
                  style={{ width: 'auto', padding: '0 12px', fontSize: 'var(--fs-xs)', gap: '4px', display: 'flex', alignItems: 'center' }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
