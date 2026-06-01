/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ExperienceView from './components/ExperienceView';
import ProjectsView from './components/ProjectsView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home'); // Land on the hero + animated pipeline visual
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Render correct view block
  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'experience':
        return <ExperienceView />;
      case 'projects':
        return <ProjectsView />;
      case 'contact':
        return <ContactView />;
      default:
        return <ExperienceView />;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-brand-bg text-brand-text selection:bg-brand-primary/30 selection:text-white overflow-x-hidden">
      {/* Background static canvas radial pattern glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.06),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(78,222,163,0.03),transparent_40%)]" />

      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenResume={() => setIsResumeOpen(true)} 
      />

      {/* Primary Main Content */}
      <main className="relative z-10 flex-grow" id="primary-app-layout">
        {renderActiveView()}
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Comprehensive Resume Dialog Modal */}
      {isResumeOpen && (
        <ResumeModal onClose={() => setIsResumeOpen(false)} />
      )}
    </div>
  );
}
