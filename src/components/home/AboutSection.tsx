
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">The Artist Behind Realism By Khushi</h2>
            <p className="text-muted-foreground mb-4">
              Each artwork at Realism By Khushi is carefully crafted by artist Khushi Sharma, whose unique vision and attention to detail brings beauty into everyday spaces.
            </p>
            <p className="text-muted-foreground mb-6">
              With a passion for exploring various artistic mediums, from traditional oil painting to contemporary resin techniques, Khushi creates pieces that evoke emotion and transform environments.
            </p>
            <Button asChild>
              <Link to="/about">
                Learn More About Khushi
              </Link>
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560421683-6856ea585c78?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFydGlzdCUyMHBhaW50aW5nfGVufDB8fDB8fHww" 
                alt="Artist at work" 
                className="rounded-lg shadow-md object-cover w-full aspect-[3/4]"
              />
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
