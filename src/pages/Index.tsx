
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import GamePlaceholder from '@/components/GamePlaceholder';
import BetPanel from '@/components/BetPanel';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useWallet } from '@/lib/walletUtils';
import GameSidebar from '@/components/GameSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Index = () => {
  const { walletInfo } = useWallet();
  const [gameSelected, setGameSelected] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  
  // Game list
  const games = [
    { title: "Game 1" },
    { title: "Game 2" },
    { title: "Game 3" },
    { title: "Game 4" },
    { title: "Game 5" },
  ];
  
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

  // Handle game selection
  const handleGameSelect = (gameTitle: string) => {
    setSelectedGame(gameTitle);
    setGameSelected(true);
  };

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {!gameSelected ? (
          // Welcome Screen - Before Game Selection
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
              
              {/* Games Section - Feature Showcase */}
              <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 font-montserrat tracking-tight">
                  Featured Games
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {games.slice(0, 3).map((game, index) => (
                    <GamePlaceholder 
                      key={game.title}
                      title={game.title} 
                      index={index} 
                      onSelect={() => handleGameSelect(game.title)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          // Game Layout with Sidebar - After Game Selection
          <SidebarProvider defaultOpen={true}>
            <section className="py-20 px-4 md:px-6 min-h-screen">
              <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)]">
                <div className="flex h-full">
                  {/* Game Sidebar */}
                  <GameSidebar 
                    games={games} 
                    selectedGame={selectedGame} 
                    onGameSelect={handleGameSelect}
                  />
                  
                  {/* Main Game Area */}
                  <SidebarInset>
                    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                      {/* Left Column - Bet Panel */}
                      <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
                        <div className="h-full p-2">
                          <BetPanel />
                        </div>
                      </ResizablePanel>
                      
                      {/* Resizable handle */}
                      <ResizableHandle withHandle />
                      
                      {/* Right Column - Game Area */}
                      <ResizablePanel defaultSize={70}>
                        <div className="h-full glass-card rounded-xl overflow-hidden p-4 flex items-center justify-center">
                          <div className="text-center">
                            <h2 className="text-3xl font-bold text-tcore-blue mb-4">
                              {selectedGame}
                            </h2>
                            <p className="text-gray-400">
                              Game content will load here
                            </p>
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </SidebarInset>
                </div>
              </div>
            </section>
          </SidebarProvider>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
