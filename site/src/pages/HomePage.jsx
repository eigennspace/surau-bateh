import React from 'react';
import Hero from '../components/Hero.jsx';
import ProgramsSection from '../components/ProgramsSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import VerseSection from '../components/VerseSection.jsx';
import AgendaSection from '../components/AgendaSection.jsx';
import StatsSection from '../components/StatsSection.jsx';
import ArticlesSection from '../components/ArticlesSection.jsx';
import Reveal from '../components/Reveal.jsx';

export default function HomePage({ site, onNavigate }) {
  return (
    <>
      <Hero site={site} onNavigate={onNavigate} />
      <Reveal>
        <ProgramsSection site={site} />
      </Reveal>
      <Reveal>
        <AgendaSection site={site} onNavigate={onNavigate} />
      </Reveal>
      {/* Artikel Terbaru: setelah Agenda/Kajian, sebelum Gallery -- lihat
          .scratch/artikel-page/spec.md */}
      <Reveal>
        <ArticlesSection onNavigate={onNavigate} />
      </Reveal>
      <Reveal>
        <GallerySection site={site} />
      </Reveal>
      <Reveal>
        <VerseSection />
      </Reveal>
      <Reveal>
        <StatsSection site={site} />
      </Reveal>
    </>
  );
}
