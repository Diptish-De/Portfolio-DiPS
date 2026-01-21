import React from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import CustomCursor from './components/CustomCursor';
import OriginStory from './components/OriginStory';
import SkillsMarquee from './components/SkillsMarquee';
import Projects from './components/Projects';
import Hero from './components/Hero';

function App() {
  return (
    <ReactLenis root>
      <div className="relative min-h-screen bg-background text-white selection:bg-primary/30 overflow-x-hidden">
        <CustomCursor />

        <main>
          <Hero />
          <OriginStory />
          <SkillsMarquee />
          <Projects />
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
