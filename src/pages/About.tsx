
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <MainLayout>
      <div className="bg-secondary/30 py-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">About Realism By Khushi</h1>
            <p className="text-lg text-muted-foreground">
              Creating unique art that tells stories and evokes emotions
            </p>
          </div>
        </div>
      </div>
      
      <div className="page-container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-serif font-medium mb-6">The Artist</h2>
            <p className="text-muted-foreground mb-4">
              Khushi Sharma is a contemporary artist whose work spans multiple mediums, from traditional oil paintings to modern resin art and sculptural pieces. With a background in fine arts and a passion for experimentation, Khushi creates pieces that bridge classical techniques with contemporary aesthetics.
            </p>
            <p className="text-muted-foreground mb-4">
              Having studied at the renowned School of Visual Arts, Khushi's work has been featured in galleries across the country. Her unique perspective and attention to detail have earned her recognition in the art community and a growing collector base.
            </p>
            <p className="text-muted-foreground">
              "Art should not only be visually captivating but should also tell a story and evoke emotion. Each piece I create is infused with narrative and meaning." - Khushi Sharma
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1568819317551-31051b37f69f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0aXN0JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D" 
              alt="Khushi Sharma" 
              className="rounded-lg w-full object-cover aspect-[3/4]"
            />
            <div className="absolute -bottom-6 -right-6 w-2/3 h-1/2 border-2 border-primary rounded-lg -z-10"></div>
          </div>
        </div>
        
        <Separator className="my-16" />
        
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-serif font-medium mb-6 text-center">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Realism By Khushi began as a small studio practice in 2018, where Khushi created pieces primarily for local art fairs and exhibitions. As demand for her work grew, so did the vision for creating a platform where art enthusiasts could discover and acquire unique, handcrafted pieces that would transform their spaces.
          </p>
          <p className="text-muted-foreground mb-4">
            What started as a passion project has evolved into a curated online gallery featuring original artwork across various mediums. Each piece in our collection is created with intention, skill, and a commitment to artistic excellence.
          </p>
          <p className="text-muted-foreground">
            Today, Realism By Khushi continues to grow, connecting art lovers with original pieces that resonate with them on a personal level. We believe that art has the power to transform spaces and lives, and we're dedicated to making that connection possible.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-secondary/30 p-8 rounded-lg">
            <h3 className="text-xl font-serif font-medium mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              To create and curate meaningful artwork that connects with people on an emotional level, enhancing their living spaces and daily lives through beauty and storytelling.
            </p>
          </div>
          
          <div className="bg-secondary/30 p-8 rounded-lg">
            <h3 className="text-xl font-serif font-medium mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              To become a trusted destination for discovering unique, handcrafted art that resonates with individual tastes and transforms spaces.
            </p>
          </div>
          
          <div className="bg-secondary/30 p-8 rounded-lg">
            <h3 className="text-xl font-serif font-medium mb-4">Our Values</h3>
            <p className="text-muted-foreground">
              Artistic integrity, craftsmanship, creativity, authenticity, and a commitment to creating meaningful connections through art.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">The Creative Process</h2>
            <p className="mb-12 opacity-90">
              Each artwork at Realism By Khushi follows a thoughtful journey from concept to creation
            </p>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-lg font-medium mx-auto">1</div>
                <h3 className="font-serif font-medium">Inspiration</h3>
                <p className="text-sm opacity-90">Drawing inspiration from nature, human experience, and emotional narratives</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-lg font-medium mx-auto">2</div>
                <h3 className="font-serif font-medium">Conceptualization</h3>
                <p className="text-sm opacity-90">Developing concepts through sketches, color studies, and material exploration</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-lg font-medium mx-auto">3</div>
                <h3 className="font-serif font-medium">Creation</h3>
                <p className="text-sm opacity-90">Crafting each piece by hand with attention to detail and artistic excellence</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-lg font-medium mx-auto">4</div>
                <h3 className="font-serif font-medium">Curation</h3>
                <p className="text-sm opacity-90">Selecting finished works that meet our standards for quality and artistic expression</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
