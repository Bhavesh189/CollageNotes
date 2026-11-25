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
        <h1>Site Under Maintenance</h1>
        <p className="maintenance-sub">
          We are improving your notes — unit-wise notes are coming soon.
        </p>
        <p className="maintenance-note">
          We will be back shortly. Refresh the page to try again.
        </p>
        <button className="maintenance-refresh" onClick={() => window.location.reload()}>
          <RefreshCw size={18} /> Refresh
        </button>
        <p className="maintenance-foot">Bhavesh Notes</p>
      </div>
    </div>
  );
}
