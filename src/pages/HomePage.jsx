import { useEffect, useState } from 'react';
import { DATA } from '../data/portfolio';
import { navigate } from '../lib/navigation';
import Atmosphere from '../components/Atmosphere';
import HallPane from '../components/HallPane';
import SiteNav from '../components/SiteNav';
import CircuitField from '../components/hall/CircuitField';
import EmbeddingSpace from '../components/hall/EmbeddingSpace';
import FluidWaves from '../components/hall/FluidWaves';

export default function HomePage() {
  const [activePane, setActivePane] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = 'Gyanateet Dutta';
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener('resize', checkDevice);
    checkDevice();
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div className="hall">
      <SiteNav variant="ink" overlay />

      <div className="hall__plate" aria-hidden="true">
        <img
          src="/assets/images/kanagawa_latentspace_autoencoder.jpg"
          alt=""
          width={3923}
          height={2160}
          fetchPriority="high"
        />
      </div>
      <Atmosphere variant="film" />

      <div className="hall__rooms">
        <HallPane
          id="left"
          room="ryukijano"
          kicker="Systems"
          activePane={activePane}
          setActivePane={setActivePane}
          onExpand={() => navigate('/persona/ryukijano')}
          titleLines={['Ryu', 'ki', 'jano']}
          subtitle={DATA.ryukijano.subtitle}
          desc={DATA.ryukijano.desc}
          tags={DATA.ryukijano.tags}
          projects={DATA.ryukijano.projects}
          socials={DATA.ryukijano.socials}
          isMobile={isMobile}
        >
          <FluidWaves />
        </HallPane>

        <HallPane
          id="center"
          room="gyanateet"
          kicker="Vision"
          activePane={activePane}
          setActivePane={setActivePane}
          onExpand={() => navigate('/persona/gyanateet')}
          titleLines={['G', 'YANA', 'TEET']}
          subtitle={DATA.ai.subtitle}
          desc={DATA.ai.desc}
          tags={DATA.ai.tags}
          projects={DATA.ai.projects}
          socials={DATA.ai.socials}
          isMobile={isMobile}
        >
          <EmbeddingSpace />
        </HallPane>

        <HallPane
          id="right"
          room="ryoushi"
          kicker="Quantum"
          activePane={activePane}
          setActivePane={setActivePane}
          onExpand={() => navigate('/persona/ryoushi')}
          titleLines={['RY', 'OU', 'SHI']}
          subtitle={DATA.ryoushi.subtitle}
          desc={DATA.ryoushi.desc}
          tags={DATA.ryoushi.tags}
          projects={DATA.ryoushi.projects}
          socials={DATA.ryoushi.socials}
          isMobile={isMobile}
        >
          <CircuitField />
        </HallPane>
      </div>
    </div>
  );
}
