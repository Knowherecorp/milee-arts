
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0JTIwZ2FsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Discover Unique Artworks",
    subtitle: "Handcrafted with passion, delivered with care.",
    buttonText: "Explore Collection",
    buttonLink: "/shop"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1577720643272-265d27a0d335?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFydCUyMHBhaW50aW5nfGVufDB8fDB8fHww",
    title: "Original Paintings",
    subtitle: "Unique creations that tell a story.",
    buttonText: "View Paintings",
    buttonLink: "/category/paintings"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544277581-540707ce14fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2N1bHB0dXJlfGVufDB8fDB8fHww",
    title: "Sculptural Masterpieces",
    subtitle: "Tactile art that transforms spaces.",
    buttonText: "Explore Sculptures",
    buttonLink: "/category/sculptures"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const goToSlide = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToNextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };
  
  const goToPrevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  return (
    <div className="relative h-[90vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-xl">
              <h1 
                className={`text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-4 tracking-tight transition-all duration-500 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}
              >
                {slide.title}
              </h1>
              <p 
                className={`text-lg md:text-xl text-white/90 mb-8 transition-all duration-500 delay-100 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}
              >
                {slide.subtitle}
              </p>
              <Button 
                asChild
                className={`px-6 py-6 transition-all duration-500 delay-200 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}
                size="lg"
              >
                <Link to={slide.buttonLink}>
                  {slide.buttonText}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Arrow controls */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default HeroSlider;
