
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
    <MainLayout>
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
