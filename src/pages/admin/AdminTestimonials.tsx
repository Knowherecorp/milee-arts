
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial,
  uploadTestimonialImage
} from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Trash2, Edit, UserCircle } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from '@/components/admin/ImageUpload';
import EmptyState from '@/components/admin/EmptyState';
import { Testimonial } from '@/types/supabase';

const testimonialSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  location: z.string().min(2, 'Location is required'),
  text: z.string().min(10, 'Testimonial text should be at least 10 characters'),
  image_url: z.string().nullable()
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

const AdminTestimonials = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials
  });

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      location: '',
      text: '',
      image_url: null
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<Testimonial, 'id' | 'created_at'>) => createTestimonial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial added successfully');
      setIsOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error('Failed to add testimonial: ' + (error as Error).message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Testimonial, 'id' | 'created_at'>> }) => 
      updateTestimonial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial updated successfully');
      setIsOpen(false);
      setEditingId(null);
      form.reset();
    },
    onError: (error) => {
      toast.error('Failed to update testimonial: ' + (error as Error).message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete testimonial: ' + (error as Error).message);
    }
  });

  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      form.reset({
        name: testimonial.name,
        location: testimonial.location,
        text: testimonial.text,
        image_url: testimonial.image_url
      });
    } else {
      setEditingId(null);
      form.reset({
        name: '',
        location: '',
        text: '',
        image_url: null
      });
    }
    setIsOpen(true);
  };

  const onSubmit = (values: TestimonialFormValues) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: values });
    } else {
      // Ensure required fields are provided for new testimonials
      createMutation.mutate({
        name: values.name,
        location: values.location,
        text: values.text,
        image_url: values.image_url
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadTestimonialImage(file);
      return imageUrl;
    } catch (error) {
      toast.error('Failed to upload image');
      throw error;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Testimonials</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus size={16} className="mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="admin-form">
                <div className="mb-6">
                  <ImageUpload
                    onChange={(url) => form.setValue('image_url', url)}
                    onUpload={handleImageUpload}
                    value={form.watch('image_url')}
                    label="Customer Photo (Optional)"
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Customer Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Customer Location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Testimonial</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What the customer said about your products or service..." 
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-2 mt-4">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editingId ? 'Update Testimonial' : 'Add Testimonial'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-muted/30">
              <CardContent className="p-6 h-48 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : testimonials.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {testimonial.image_url ? (
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-primary/10 mr-3">
                      <img 
                        src={testimonial.image_url} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ) : (
                    <UserCircle className="h-12 w-12 text-muted-foreground mr-3" />
                  )}
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">{testimonial.text}</p>
                
                <div className="absolute top-4 right-4 flex space-x-1">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => handleOpenDialog(testimonial)}
                    className="h-8 w-8"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => handleDelete(testimonial.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={UserCircle}
          title="No Testimonials Yet"
          description="Add customer testimonials to build trust with potential customers."
          actionLabel="Add Testimonial"
          onAction={() => handleOpenDialog()}
        />
      )}
    </div>
  );
};

export default AdminTestimonials;
