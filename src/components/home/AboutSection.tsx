
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">The Artist Behind Realism By Khushi</h2>
            <p className="text-muted-foreground mb-4">
              Add your artist biography here. Describe your artistic journey, inspiration, and vision.
            </p>
            <p className="text-muted-foreground mb-6">
              This is where you can share your artistic philosophy and what makes your art unique and special.
            </p>
            <Button asChild>
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-center p-4">
                  Artist image will be displayed here
                </p>
              </div>
              <div className="absolute -bottom-6 -left-6 w-1/2 h-1/2 border-2 border-primary rounded-lg -z-10"></div>
              <div className="absolute -top-6 -right-6 w-1/2 h-1/2 border-2 border-primary rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
