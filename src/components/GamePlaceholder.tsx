
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface GamePlaceholderProps {
  title: string;
  index: number;
}

const GamePlaceholder = ({ title, index }: GamePlaceholderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    toast.info(`${title} coming soon!`, {
      description: "This game is currently under development. Check back later!"
    });
  };
  
  // Calculate animation delay based on index
  const animationDelay = `${index * 0.15}s`;

  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden relative cursor-pointer group",
        "h-64 md:h-80 flex flex-col items-center justify-center",
        "opacity-0 animate-blur-in"
      )}
      style={{ animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Glowing background effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-tcore-blue/10 to-transparent opacity-0",
          "group-hover:opacity-40 transition-opacity duration-500"
        )}
      />
      
      {/* Animated border */}
      <div 
        className={cn(
          "absolute inset-0 border border-tcore-blue/0 rounded-xl",
          "group-hover:border-tcore-blue/50 transition-all duration-300",
          isHovered && "shadow-[0_0_15px_rgba(0,224,255,0.3)]"
        )}
      />
      
      <div className="text-3xl font-bold mb-2 font-montserrat tracking-tight">
        {title}
      </div>
      
      <div 
        className={cn(
          "px-4 py-2 bg-tcore-blue/10 rounded-full text-sm text-tcore-blue",
          "border border-tcore-blue/30 uppercase tracking-wider font-medium",
          "transition-all duration-300"
        )}
      >
        Coming Soon
      </div>
      
      {/* Hover message */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}
      >
        <div className="text-center px-6">
          <p className="text-lg font-medium mb-3">Game under development</p>
          <span 
            className={cn(
              "px-4 py-2 bg-tcore-blue text-tcore-dark-text rounded-lg",
              "font-medium inline-block"
            )}
          >
            View Details
          </span>
        </div>
      </div>
    </div>
  );
};

export default GamePlaceholder;
