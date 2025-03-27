
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
            My name is Khushi Gupta and I am a passionate, self-taught artist with over four years of experience in realistic portraiture, mixed media, and customized artwork. I have successfully completed over 200+ commissioned projects and enjoy experimenting with different art forms.
            </p>
            <p className="text-muted-foreground mb-6">
            My journey has also extended to wall art and minimalist sculptures, where I explore floral and nature-inspired designs. My love for art has only been growing stronger since 2020.
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
                <img 
              src="../k1.jpg" 
              alt="Khushi Sharma" />
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
