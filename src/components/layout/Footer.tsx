
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!');
      form.reset();
    }
  };

  return (
    <footer className="bg-secondary/50 pt-16 pb-8">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-serif font-medium mb-4">Realism By Khushi</h4>
            <p className="text-muted-foreground mb-4">
              We curate and craft unique artworks that tell stories and create lasting impressions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/category/paintings" className="text-muted-foreground hover:text-foreground transition-colors">
                  Paintings
                </Link>
              </li>
              <li>
                <Link to="/category/sculptures" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sculptures
                </Link>
              </li>
              <li>
                <Link to="/category/resin-art" className="text-muted-foreground hover:text-foreground transition-colors">
                  Resin Art
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-muted-foreground hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-medium mb-4">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-medium mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input 
                type="email" 
                name="email"
                placeholder="Your email address" 
                required 
                className="bg-white/60"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Realism By Khushi. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <img src="/payment-visa.svg" alt="Visa" className="h-8 w-auto object-contain opacity-70" />
            <img src="/payment-mastercard.svg" alt="Mastercard" className="h-8 w-auto object-contain opacity-70" />
            <img src="/payment-amex.svg" alt="American Express" className="h-8 w-auto object-contain opacity-70" />
            <img src="/payment-paypal.svg" alt="PayPal" className="h-8 w-auto object-contain opacity-70" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
