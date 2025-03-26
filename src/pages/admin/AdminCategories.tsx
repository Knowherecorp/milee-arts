
import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Layers,
  Upload,
  FolderOpen
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
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
    // Generate a unique ID
    const newId = `cat-${Date.now()}`;
    
    // Generate slug if not provided
    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const imageUrl = e.target.result.toString();
          
          // Create new category with the image
          const newCategory: Category = {
            ...formData,
            id: newId,
            slug,
            imageUrl
          };
          
          // Add to categories array
          setCategories([...categories, newCategory]);
          toast.success('Category added successfully');
          setIsAddDialogOpen(false);
          resetForm();
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Create new category without a new image
      const newCategory: Category = {
        ...formData,
        id: newId,
        slug
      };
      
      // Add to categories array
      setCategories([...categories, newCategory]);
      toast.success('Category added successfully');
      setIsAddDialogOpen(false);
      resetForm();
    }
  };
  
  const handleUpdateCategory = () => {
    // Generate slug if not provided
    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const imageUrl = e.target.result.toString();
          
          // Update existing category with new image
          const updatedCategories = categories.map(category => 
            category.id === formData.id ? {
              ...formData,
              slug,
              imageUrl
            } : category
          );
          
          setCategories(updatedCategories);
          toast.success('Category updated successfully');
          setIsAddDialogOpen(false);
          resetForm();
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Update existing category without changing the image
      const updatedCategories = categories.map(category => 
        category.id === formData.id ? {
          ...formData,
          slug
        } : category
      );
      
      setCategories(updatedCategories);
      toast.success('Category updated successfully');
      setIsAddDialogOpen(false);
      resetForm();
    }
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
    setSelectedFile(null);
  };
  
  // Generate slug when name changes
  const handleNameChange = (name: string) => {
    setFormData({
      ...formData, 
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="rounded-lg border overflow-hidden bg-card"
            >
              <div className="h-40 bg-muted">
                {category.imageUrl ? (
                  <img 
                    src={category.imageUrl} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Layers size={48} className="text-muted-foreground/40" />
                  </div>
                )}
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
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Categories Yet</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Create categories to organize your products and help customers find what they're looking for.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus size={16} className="mr-2" />
            Add Your First Category
          </Button>
        </div>
      )}
      
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
              
              {/* Current image preview */}
              {(formData.imageUrl || selectedFile) && (
                <div className="mb-4">
                  <div className="h-32 w-full bg-muted rounded-md overflow-hidden">
                    {selectedFile ? (
                      <img 
                        src={URL.createObjectURL(selectedFile)} 
                        alt="Category preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : formData.imageUrl ? (
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
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </div>
              )}
              
              {/* Upload control */}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="category-image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or WEBP (MAX. 5MB)
                    </p>
                  </div>
                  <Input
                    id="category-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
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
