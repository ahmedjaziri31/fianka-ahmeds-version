'use client';

interface HeroBackgroundProps {
  children: React.ReactNode;
}

export function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Desktop */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: 'url("/background-descktop.jpeg")'
        }}
      />
      
      {/* Background Image - Mobile */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat block md:hidden"
        style={{
          backgroundImage: 'url("/background.jpeg")'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-porto/20"></div>
      
      {/* Content */}
      {children}
    </section>
  );
} 