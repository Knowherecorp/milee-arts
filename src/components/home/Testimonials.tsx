
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    quote: "The painting I purchased from Realism By Khushi has become the focal point of my living room. The colors and textures are even more breathtaking in person than they appeared online.",
    rating: 5,
    purchasedItem: "Abstract Harmony",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    quote: "I've been collecting art for years, and the sculpture I bought from Khushi is one of my favorite pieces. The craftsmanship and attention to detail are exceptional.",
    rating: 5,
    purchasedItem: "Eternal Balance",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Chicago, IL",
    quote: "The customer service was impeccable. Khushi was very responsive to my questions and the resin art piece arrived perfectly packaged. I'll definitely be back for more!",
    rating: 5,
    purchasedItem: "Ocean Depths",
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">What Collectors Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read about the experiences of art lovers who have added Realism By Khushi pieces to their collections.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white hover:shadow-md transition-shadow hover-scale">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-base mb-4 font-medium italic">"{testimonial.quote}"</p>
                <div className="mt-6">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location} · Purchased {testimonial.purchasedItem}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
