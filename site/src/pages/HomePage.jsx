import React from 'react';
import Hero from '../components/Hero.jsx';
import ProgramsSection from '../components/ProgramsSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import VerseSection from '../components/VerseSection.jsx';
import AgendaSection from '../components/AgendaSection.jsx';
import StatsSection from '../components/StatsSection.jsx';

export default function HomePage({ site, onNavigate }) {
  return (
    <>
      <Hero site={site} onNavigate={onNavigate} />
      <ProgramsSection site={site} />
      <GallerySection site={site} />
      <VerseSection />
      <AgendaSection site={site} onNavigate={onNavigate} />
      <StatsSection site={site} />
    </>
  );
}
