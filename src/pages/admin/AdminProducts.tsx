
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowUpDown, 
  X, 
  ImagePlus,
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { getAllProducts, Product } from '@/data/products';
import { Switch } from '@/components/ui/switch';

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>(getAllProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Form state for adding/editing product
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'paintings',
    price: 0,
    images: [] as string[],
    description: '',
    dimensions: '',
    materials: '',
    inStock: true
  });
  
  // For demo purposes, filter products
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const handleSort = (field: keyof Product) => {
    setSortDirection(current => 
      sortField === field 
        ? (current === 'asc' ? 'desc' : 'asc') 
        : 'asc'
    );
    setSortField(field);
  };
  
  const handleAddProduct = () => {
    // Generate a unique ID (for demo)
    const newId = `product-${Date.now()}`;
    
    // Create new product
    const newProduct: Product = {
      ...formData,
      id: newId,
      price: Number(formData.price),
      images: formData.images.length > 0 ? formData.images : ['/placeholder.svg'],
    };
    
    // Add to products array
    setProducts([...products, newProduct]);
    toast.success('Product added successfully');
    setIsAddDialogOpen(false);
    resetForm();
  };
  
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      images: product.images,
      description: product.description,
      dimensions: product.dimensions || '',
      materials: product.materials || '',
      inStock: product.inStock
    });
    setIsAddDialogOpen(true);
  };
  
  const handleUpdateProduct = () => {
    // Update existing product
    const updatedProducts = products.map(product => 
      product.id === formData.id ? {
        ...formData,
        price: Number(formData.price)
      } : product
    );
    
    setProducts(updatedProducts);
    toast.success('Product updated successfully');
    setIsAddDialogOpen(false);
    resetForm();
  };
  
  const confirmDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    
    const updatedProducts = products.filter(product => product.id !== selectedProduct.id);
    setProducts(updatedProducts);
    toast.success('Product deleted successfully');
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };
  
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      category: 'paintings',
      price: 0,
      images: [],
      description: '',
      dimensions: '',
      materials: '',
      inStock: true
    });
    setSelectedProduct(null);
  };
  
  // For demo - add placeholder image
  const handleAddImage = () => {
    const imageUrl = prompt('Enter image URL (for demo purposes)');
    if (imageUrl) {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl]
      });
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-serif font-medium">Products</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>
      
      {/* Products table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left font-medium">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-1 p-0 font-medium"
                    onClick={() => handleSort('name')}
                  >
                    Name
                    <ArrowUpDown size={14} />
                  </Button>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-1 p-0 font-medium"
                    onClick={() => handleSort('category')}
                  >
                    Category
                    <ArrowUpDown size={14} />
                  </Button>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-1 p-0 font-medium"
                    onClick={() => handleSort('price')}
                  >
                    Price
                    <ArrowUpDown size={14} />
                  </Button>
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-1 p-0 font-medium"
                    onClick={() => handleSort('inStock')}
                  >
                    Status
                    <ArrowUpDown size={14} />
                  </Button>
                </th>
                <th className="py-3 px-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize">
                      {product.category}
                    </td>
                    <td className="py-3 px-4">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      {product.inStock ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          In Stock
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDelete(product)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted-foreground">
                    No products found. Try a different search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details to {selectedProduct ? 'update' : 'create'} the product.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paintings">Paintings</SelectItem>
                    <SelectItem value="sculptures">Sculptures</SelectItem>
                    <SelectItem value="resin-art">Resin Art</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions (optional)</Label>
                <Input
                  id="dimensions"
                  placeholder="e.g. 24 x 36 inches"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="materials">Materials (optional)</Label>
                <Input
                  id="materials"
                  placeholder="e.g. Acrylic on canvas"
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="inStock" 
                  checked={formData.inStock}
                  onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="grid grid-cols-3 gap-2">
                  {formData.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="relative h-24 bg-muted rounded-md overflow-hidden"
                    >
                      <img 
                        src={image} 
                        alt={`Product ${index}`} 
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    onClick={handleAddImage}
                  >
                    <ImagePlus size={20} />
                    <span className="mt-1 text-xs">Add Image</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  For demo purposes, enter image URLs when prompted.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            </DialogClose>
            <Button 
              onClick={selectedProduct ? handleUpdateProduct : handleAddProduct}
              disabled={!formData.name || !formData.description || formData.price <= 0}
            >
              {selectedProduct ? 'Update Product' : 'Add Product'}
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
              Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
