
import { ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

const HeroSection = () => {
  const navigate = useNavigate();

  // Create background bubbles
  useEffect(() => {
    const createBubbles = () => {
      const container = document.querySelector('.bubbles-container');
      if (!container) return;
      
      // Clean up existing bubbles before creating new ones
      container.innerHTML = '';
      
      // Create new bubbles
      for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Randomize size
        const size = Math.random() * 100 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Randomize position
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.bottom = `-${size}px`;
        
        // Randomize animation duration and direction
        const duration = Math.random() * 10 + 10;
        const translateX = Math.random() * 100 - 50;
        const rotate = Math.random() * 360;
        
        bubble.style.setProperty('--d', duration.toString());
        bubble.style.setProperty('--tx', `${translateX}px`);
        bubble.style.setProperty('--r', `${rotate}deg`);
        
        container.appendChild(bubble);
      }
    };
    
    // Initial creation
    createBubbles();
    
    // Recreate bubbles on resize
    window.addEventListener('resize', createBubbles);
    
    // Create new bubbles periodically
    const interval = setInterval(() => {
      const container = document.querySelector('.bubbles-container');
      if (container && container.childElementCount < 50) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 100 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.bottom = `-${size}px`;
        
        const duration = Math.random() * 10 + 10;
        const translateX = Math.random() * 100 - 50;
        const rotate = Math.random() * 360;
        
        bubble.style.setProperty('--d', duration.toString());
        bubble.style.setProperty('--tx', `${translateX}px`);
        bubble.style.setProperty('--r', `${rotate}deg`);
        
        container.appendChild(bubble);
      }
    }, 1000);
    
    // Parallax effect for background elements
    const handleMouseMove = (e: MouseEvent) => {
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      const x = (window.innerWidth - e.pageX * 2) / 100;
      const y = (window.innerHeight - e.pageY * 2) / 100;
      
      parallaxElements.forEach((el) => {
        const htmlElement = el as HTMLElement;
        const speed = htmlElement.getAttribute('data-speed') || '5';
        htmlElement.style.transform = `translate(${x * parseFloat(speed)}px, ${y * parseFloat(speed)}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', createBubbles);
      clearInterval(interval);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden animate-gradient">
      {/* Interactive Bubble Background */}
      <div className="bubbles-container absolute inset-0 overflow-hidden pointer-events-none"></div>
      
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute w-64 h-64 rounded-full bg-crypto-blue/10 blur-[80px] top-1/4 left-1/4 parallax-bg"
          data-speed="2"
        ></div>
        <div 
          className="absolute w-96 h-96 rounded-full bg-crypto-green/10 blur-[100px] bottom-1/4 right-1/4 parallax-bg"
          data-speed="3"
        ></div>
        <div 
          className="absolute w-48 h-48 rounded-full bg-purple-500/10 blur-[60px] top-3/4 right-1/3 parallax-bg"
          data-speed="4"
        ></div>
      </div>

      {/* Background Image with interactive effect */}
      <div 
        className="absolute inset-0 z-0 parallax-bg"
        data-speed="1"
        style={{
          backgroundImage: 'url("/lovable-uploads/1f1b7894-c97b-48df-9bbc-12bb865c97d4.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          mixBlendMode: 'screen',
          filter: 'blur(2px)',
        }}
        role="img"
        aria-label="Hero background"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6 parallax-container">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white text-shadow-lg">
          Together, we are bigger
          <br />
          <span className="bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent animate-pulse">
            Than ICO Market
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
          Your comprehensive platform for ICO analytics and portfolio management. Join thousands of investors who trust Mericulum.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
          <Button 
            size="lg"
            className="bg-crypto-blue hover:bg-crypto-blue/90 text-crypto-dark min-w-[180px] h-12 text-base cursor-rocket backdrop-blur-sm interactive-hover"
            onClick={() => navigate('/signin', { state: { isSignUp: true } })}
          >
            Register <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline" 
            className="border-crypto-green text-crypto-green hover:bg-crypto-green/10 min-w-[180px] h-12 text-base cursor-rocket backdrop-blur-sm interactive-hover"
            onClick={() => navigate('/signin')}
          >
            Sign In <LogIn className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Enhanced grid pattern with animation */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-10 z-[2] parallax-bg" data-speed="0.5"></div>
    </div>
  );
};

export default HeroSection;
