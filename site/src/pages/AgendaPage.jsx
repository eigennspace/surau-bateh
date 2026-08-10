import React from 'react';
import AgendaSection from '../components/AgendaSection.jsx';

export default function AgendaPage({ site, onNavigate }) {
  return <AgendaSection site={site} onNavigate={onNavigate} />;
}
