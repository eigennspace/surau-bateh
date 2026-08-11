import React from 'react';
import Hero from '../components/Hero.jsx';
import ProgramsSection from '../components/ProgramsSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import VerseSection from '../components/VerseSection.jsx';
import AgendaSection from '../components/AgendaSection.jsx';
import StatsSection from '../components/StatsSection.jsx';
import Reveal from '../components/Reveal.jsx';

export default function HomePage({ site, onNavigate }) {
  return (
    <>
      <Hero site={site} onNavigate={onNavigate} />
      <Reveal>
        <ProgramsSection site={site} />
      </Reveal>
      <Reveal>
        <GallerySection site={site} />
      </Reveal>
      <Reveal>
        <VerseSection />
      </Reveal>
      <Reveal>
        <AgendaSection site={site} onNavigate={onNavigate} />
      </Reveal>
      <Reveal>
        <StatsSection site={site} />
      </Reveal>
    </>
  );
}
