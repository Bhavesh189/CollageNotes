import React from 'react';
import { Wrench, RefreshCw } from 'lucide-react';
import './MaintenancePage.css';

export default function MaintenancePage() {
  return (
    <div className="maintenance-page">
      <div className="maintenance-card">
        <img src="/logo-96.png" className="maintenance-logo" alt="Bhavesh Notes logo" />
        <div className="maintenance-icon">
          <Wrench size={38} />
        </div>
        <h1>Site Maintenance me hai</h1>
        <p className="maintenance-sub">
          Hum notes ko aur behtar bana rahe hain — Unit-wise notes jald aa rahe hain.
        </p>
        <p className="maintenance-note">
          Thodi der me wapas aayenge. Page ko refresh karke dobara try karein.
        </p>
        <button className="maintenance-refresh" onClick={() => window.location.reload()}>
          <RefreshCw size={18} /> Refresh karein
        </button>
        <p className="maintenance-foot">Bhavesh Notes</p>
      </div>
    </div>
  );
}
