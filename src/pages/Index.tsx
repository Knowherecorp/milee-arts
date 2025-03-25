
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSlider from '@/components/home/HeroSlider';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import AboutSection from '@/components/home/AboutSection';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

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
    </MainLayout>
  );
};

export default Index;
