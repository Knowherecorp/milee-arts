
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!');
      form.reset();
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="page-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Stay Updated</h2>
          <p className="mb-8 opacity-90">
            Subscribe to our newsletter for exclusive previews of new artworks, exhibition announcements, and special offers.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              name="email"
              placeholder="Your email address" 
              className="flex-1 bg-primary-foreground text-foreground" 
              required 
            />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
