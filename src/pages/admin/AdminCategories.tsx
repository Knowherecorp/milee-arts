
import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Layers,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'cat1',
      name: 'Paintings',
      slug: 'paintings',
      description: 'Original handmade paintings from talented Indian artists.',
      imageUrl: '/placeholder.svg'
    },
    {
      id: 'cat2',
      name: 'Sculptures',
      slug: 'sculptures',
      description: 'Handcrafted sculptures made with attention to detail.',
      imageUrl: '/placeholder.svg'
    },
    {
      id: 'cat3',
      name: 'Resin Art',
      slug: 'resin-art',
      description: 'Beautiful and unique resin artworks in various styles.',
      imageUrl: '/placeholder.svg'
    }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // Form state for adding/editing category
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    description: '',
    imageUrl: ''
  });
  
  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      imageUrl: category.imageUrl
    });
    setIsAddDialogOpen(true);
  };
  
  const handleAddCategory = () => {
    // Generate a unique ID (for demo)
    const newId = `cat-${Date.now()}`;
    
    // Create new category
    const newCategory: Category = {
      ...formData,
      id: newId,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')
    };
    
    // Add to categories array
    setCategories([...categories, newCategory]);
    toast.success('Category added successfully');
    setIsAddDialogOpen(false);
    resetForm();
  };
  
  const handleUpdateCategory = () => {
    // Update existing category
    const updatedCategories = categories.map(category => 
      category.id === formData.id ? {
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')
      } : category
    );
    
    setCategories(updatedCategories);
    toast.success('Category updated successfully');
    setIsAddDialogOpen(false);
    resetForm();
  };
  
  const confirmDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    
    const updatedCategories = categories.filter(category => category.id !== selectedCategory.id);
    setCategories(updatedCategories);
    toast.success('Category deleted successfully');
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };
  
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      slug: '',
      description: '',
      imageUrl: ''
    });
    setSelectedCategory(null);
  };
  
  // Generate slug when name changes
  const handleNameChange = (name: string) => {
    setFormData({
      ...formData, 
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    });
  };
  
  // For demo - set image URL
  const handleSetImage = () => {
    const imageUrl = prompt('Enter image URL (for demo purposes)');
    if (imageUrl) {
      setFormData({
        ...formData,
        imageUrl
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-medium">Categories</h1>
        
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      
      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="rounded-lg border overflow-hidden bg-card"
          >
            <div className="h-40 bg-muted">
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-medium mb-1">{category.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">/{category.slug}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditCategory(category)}
                >
                  <Edit size={14} className="mr-1" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => confirmDelete(category)}
                >
                  <Trash2 size={14} className="mr-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add/Edit Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? 'Edit Category' : 'Add New Category'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details to {selectedCategory ? 'update' : 'create'} the category.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                This will be used in the URL: /category/{formData.slug || 'example-slug'}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Category Image</Label>
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 bg-muted rounded-md overflow-hidden">
                  {formData.imageUrl ? (
                    <img 
                      src={formData.imageUrl} 
                      alt="Category" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <Layers size={24} />
                    </div>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  onClick={handleSetImage}
                >
                  Set Image URL
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                For demo purposes, enter image URL when prompted.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            </DialogClose>
            <Button 
              onClick={selectedCategory ? handleUpdateCategory : handleAddCategory}
              disabled={!formData.name || !formData.description}
            >
              {selectedCategory ? 'Update Category' : 'Add Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the "{selectedCategory?.name}" category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategories;
