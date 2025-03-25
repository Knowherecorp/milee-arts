
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';

const NavLinks = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <ul className={cn("flex flex-col lg:flex-row gap-6 lg:gap-8", className)}>
    <li>
      <Link to="/" className="text-foreground hover:text-foreground/80 transition-colors" onClick={onClick}>
        Home
      </Link>
    </li>
    <li>
      <Link to="/shop" className="text-foreground hover:text-foreground/80 transition-colors" onClick={onClick}>
        Shop All
      </Link>
    </li>
    <li>
      <Link to="/category/paintings" className="text-foreground hover:text-foreground/80 transition-colors" onClick={onClick}>
        Paintings
      </Link>
    </li>
    <li>
      <Link to="/category/sculptures" className="text-foreground hover:text-foreground/80 transition-colors" onClick={onClick}>
        Sculptures
      </Link>
    </li>
    <li>
      <Link to="/category/resin-art" className="text-foreground hover:text-foreground/80 transition-colors" onClick={onClick}>
        Resin Art
      </Link>
    </li>
    <li>
      <Link to="/about" className="text-foreground hover:text-foreground/80 transition-colors" onClick={onClick}>
        About
      </Link>
    </li>
    <li>
      <Link to="/contact" className="text-foreground hover:text-foreground/80 transition-colors" onClick={onClick}>
        Contact
      </Link>
    </li>
  </ul>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "py-2 bg-background/90 backdrop-blur-md shadow-sm" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="page-container">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-medium tracking-tight">
            Realism By Khushi
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLinks />
            <div className="flex items-center gap-4">
              <Link to="/search" aria-label="Search" className="text-foreground hover:text-foreground/80 transition-colors">
                <Search size={20} />
              </Link>
              <Link to="/cart" aria-label="Cart" className="relative text-foreground hover:text-foreground/80 transition-colors">
                <ShoppingBag size={20} />
                {items.length > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium"
                  >
                    {items.length}
                  </Badge>
                )}
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link to="/search" aria-label="Search" className="text-foreground hover:text-foreground/80 transition-colors">
              <Search size={20} />
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative text-foreground hover:text-foreground/80 transition-colors">
              <ShoppingBag size={20} />
              {items.length > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium"
                >
                  {items.length}
                </Badge>
              )}
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <div className="flex flex-col h-full pt-6">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-serif font-medium">Menu</span>
                  </div>
                  <nav className="flex-1">
                    <NavLinks className="space-y-4 text-lg" onClick={() => setIsMenuOpen(false)} />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
