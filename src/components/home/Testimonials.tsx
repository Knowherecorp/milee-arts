
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon, UserCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getTestimonials } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';

const Testimonials = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials
  });

  return (
    <section className="py-16 md:py-24">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">What Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read what our customers have to say about their experience with our products and services.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white">
                <CardContent className="p-6">
                  <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
                  <Skeleton className="w-full h-20 mb-4" />
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white hover:shadow-md transition-shadow hover-scale">
                <CardContent className="p-6">
                  <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="mb-4 italic text-muted-foreground">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    {testimonial.image_url ? (
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-muted mr-3">
                        <img src={testimonial.image_url} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <UserCircle className="h-10 w-10 text-muted-foreground mr-3" />
                    )}
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-muted-foreground">
              No testimonials available yet. They will appear here once customers provide feedback.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
