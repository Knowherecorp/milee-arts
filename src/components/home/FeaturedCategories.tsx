
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: "paintings",
    name: "Paintings",
    description: "Paintings description - customize this text.",
    link: "/category/paintings"
  },
  {
    id: "sculptures",
    name: "Sculptures",
    description: "Sculptures description - customize this text.",
    link: "/category/sculptures"
  },
  {
    id: "resin-art",
    name: "Resin Art",
    description: "Resin art description - customize this text.",
    link: "/category/resin-art"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Explore Our Collections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover handcrafted art across various mediums, each piece created with passion and attention to detail.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group relative rounded-lg overflow-hidden bg-white shadow-sm hover-scale">
              <div className="aspect-[4/5] relative overflow-hidden bg-muted flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity z-10"></div>
                <div className="text-muted-foreground text-center p-4 z-0">
                  Category image will be displayed here
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 p-4 text-center">
                  <h3 className="text-2xl font-serif font-medium mb-2">{category.name}</h3>
                  <p className="mb-4 max-w-xs opacity-90">{category.description}</p>
                  <Button asChild variant="outline" className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30">
                    <Link to={category.link}>
                      Explore {category.name}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
