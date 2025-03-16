
import { useEffect } from 'react';
import Header from '@/components/Header';
import GamePlaceholder from '@/components/GamePlaceholder';
import BetPanel from '@/components/BetPanel';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const Index = () => {
  // Add a subtle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSectionElement = document.getElementById('hero-background');
      
      if (heroSectionElement) {
        heroSectionElement.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background blur effect */}
          <div 
            id="hero-background" 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,224,255,0.15)_0%,_transparent_70%)]"
          />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-montserrat tracking-tight">
              <span className="text-white">Welcome to </span>
              <span className="text-tcore-blue">TCoreBet</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              Experience the future of crypto gaming with secure and transparent betting.
            </p>
            
            {/* Bet Panel */}
            <BetPanel />
          </div>
        </section>
        
        {/* Games Section */}
        <section 
          className={cn(
            "py-20 px-6",
            "bg-gradient-to-b from-transparent to-tcore-darker"
          )}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat tracking-tight">
                Featured Games
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Check out our upcoming games. More exciting games will be added soon.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GamePlaceholder title="Game 1" index={0} />
              <GamePlaceholder title="Game 2" index={1} />
              <GamePlaceholder title="Game 3" index={2} />
            </div>
          </div>
        </section>
        
        {/* Info Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card rounded-xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 font-montserrat tracking-tight">
                    Why Choose <span className="text-tcore-blue">TCoreBet</span>?
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-tcore-blue mr-3 text-xl">•</span>
                      <span>
                        <strong className="text-white">Secure Betting</strong>
                        <p className="text-gray-400 mt-1">
                          Built on CoreDAO's TCore blockchain for maximum security and transparency.
                        </p>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-tcore-blue mr-3 text-xl">•</span>
                      <span>
                        <strong className="text-white">Fast Transactions</strong>
                        <p className="text-gray-400 mt-1">
                          Enjoy instant deposits and withdrawals with minimal fees.
                        </p>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-tcore-blue mr-3 text-xl">•</span>
                      <span>
                        <strong className="text-white">Innovative Games</strong>
                        <p className="text-gray-400 mt-1">
                          Unique gaming experiences designed specifically for crypto enthusiasts.
                        </p>
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="glass-card rounded-xl overflow-hidden h-64 relative animate-pulse-glow">
                  <div className="absolute inset-0 bg-gradient-to-br from-tcore-blue/10 to-transparent opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold font-montserrat tracking-tight">
                      Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
