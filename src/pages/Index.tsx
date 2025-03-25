
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import HeroSlider from '@/components/home/HeroSlider';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import AboutSection from '@/components/home/AboutSection';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <MainLayout 
      title="Realism By Khushi | Exquisite Indian Handcrafted Art"
      description="Discover beautiful handcrafted Indian art including paintings, sculptures, and resin art at Realism By Khushi. Shop authentic artworks created with passion."
    >
      <HeroSlider />
      <FeaturedCategories />
      <FeaturedProducts />
      <NewArrivals />
      <AboutSection />
      <Testimonials />
      <Newsletter />
      
      {/* Admin link - for demo purposes */}
      <div className="text-center py-4 bg-muted/30">
        <p className="text-sm text-muted-foreground mb-2">For demonstration purposes</p>
        <Link to="/admin/login">
          <Button variant="outline" size="sm">
            Access Admin Dashboard
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Index;
