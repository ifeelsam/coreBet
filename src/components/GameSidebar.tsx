
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface GameSidebarProps {
  games: { title: string }[];
  selectedGame: string | null;
  onGameSelect: (gameTitle: string) => void;
}

const GameSidebar = ({ games, selectedGame, onGameSelect }: GameSidebarProps) => {
  return (
    <Sidebar className="h-full" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Available Games</SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[400px]">
              <SidebarMenu>
                {games.map((game) => (
                  <SidebarMenuItem key={game.title}>
                    <SidebarMenuButton 
                      isActive={selectedGame === game.title}
                      onClick={() => onGameSelect(game.title)}
                      tooltip={`Switch to ${game.title}`}
                    >
                      {selectedGame === game.title ? (
                        <ChevronRight className="h-4 w-4 mr-2" />
                      ) : (
                        <ChevronLeft className="h-4 w-4 mr-2 opacity-40" />
                      )}
                      <span>{game.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default GameSidebar;
