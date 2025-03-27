
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
            My name is Khushi Gupta and I am a passionate, self-taught artist with over four years of experience in realistic portraiture, mixed media, and customized artwork.
            </p>
            <p className="text-muted-foreground mb-4">
            I have successfully completed over 200+ commissioned projects and enjoy experimenting with different art forms.
            </p>
            <p className="text-muted-foreground">
            My journey has also extended to wall art and minimalist sculptures, where I explore floral and nature-inspired designs. My love for art has only been growing stronger since 2020.
            </p>
          </div>
          <div className="relative">
            <img 
              src="../k1.jpg" 
              alt="Khushi Sharma" 
              className="rounded-lg w-full object-cover aspect-[3/4]"
            />
            <div className="absolute -bottom-6 -right-6 w-2/3 h-1/2 border-2 border-primary rounded-lg -z-10"></div>
          </div>
        </div>
        
        <Separator className="my-16" />
        
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-serif font-medium mb-6 text-center">My Story</h2>
          <p className="text-muted-foreground mb-4">
          I come from a small town, Chirimiri, my hometown, where I completed my schooling. Since childhood, I have been deeply passionate about art. No matter where I was—in school, in books, or around me—my eyes always searched for creativity and drawings. But my real journey as an artist began in 2020, right after I passed my 12th grade.

          </p>
          <p className="text-muted-foreground mb-4">
          With immense dedication and countless hours of practice, I worked tirelessly to refine my skills. At the age of 17, I received my very first art order, worth just ₹300. I didn’t have expensive tools or materials—just a simple ₹10 or ₹20 pencil was enough for me to start sketching. From that moment, I never looked back.

          </p>
          <p className="text-muted-foreground mb-4">
          I kept practicing, learning, and improving, all on my own. I never had formal training or a mentor—I explored every art form by myself, experimenting and evolving with each stroke. Alongside my artistic journey, I balanced my education, managing both my studies and my passion with equal dedication.

          </p>
          <p className="text-muted-foreground">
          One thing I truly believe is that you don't need a fortune to start something—you just need the will to begin. Even ₹100 is enough if you have the determination. Never let the thought of financial limitations hold you back. Just start, and the path will unfold before you!

          </p>
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
