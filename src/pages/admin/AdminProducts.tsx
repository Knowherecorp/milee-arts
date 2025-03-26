import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowUpDown, 
  X, 
  ImagePlus,
  Upload,
  PackageOpen
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

interface FileWithPreview extends File {
  preview?: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>(getAllProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [imageFiles, setImageFiles] = useState<FileWithPreview[]>([]);
  
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
    inStock: true,
    artistName: '',
    yearCreated: new Date().getFullYear()
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
    // Generate a unique ID
    const newId = `product-${Date.now()}`;
    
    // Process uploaded images
    const processedImages = [...formData.images];
    
    if (imageFiles.length > 0) {
      const imagePromises = imageFiles.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              resolve(e.target.result.toString());
            }
          };
          reader.readAsDataURL(file);
        });
      });
      
      Promise.all(imagePromises).then(imageUrls => {
        // Create new product with all images
        const newProduct: Product = {
          ...formData,
          id: newId,
          price: Number(formData.price),
          images: [...processedImages, ...imageUrls],
        };
        
        // Add to products array
        setProducts([...products, newProduct]);
        toast.success('Product added successfully');
        setIsAddDialogOpen(false);
        resetForm();
      });
    } else {
      // No new images uploaded, use existing URLs
      const newProduct: Product = {
        ...formData,
        id: newId,
        price: Number(formData.price),
      };
      
      // Add to products array
      setProducts([...products, newProduct]);
      toast.success('Product added successfully');
      setIsAddDialogOpen(false);
      resetForm();
    }
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
      inStock: product.inStock,
      artistName: product.artistName || '',
      yearCreated: product.yearCreated || new Date().getFullYear()
    });
    setIsAddDialogOpen(true);
  };
  
  const handleUpdateProduct = () => {
    // Process uploaded images
    const processedImages = [...formData.images];
    
    if (imageFiles.length > 0) {
      const imagePromises = imageFiles.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              resolve(e.target.result.toString());
            }
          };
          reader.readAsDataURL(file);
        });
      });
      
      Promise.all(imagePromises).then(imageUrls => {
        // Update existing product with all images
        const updatedProducts = products.map(product => 
          product.id === formData.id ? {
            ...formData,
            price: Number(formData.price),
            images: [...processedImages, ...imageUrls],
          } : product
        );
        
        setProducts(updatedProducts);
        toast.success('Product updated successfully');
        setIsAddDialogOpen(false);
        resetForm();
      });
    } else {
      // No new images uploaded, use existing URLs
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
    }
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
      inStock: true,
      artistName: '',
      yearCreated: new Date().getFullYear()
    });
    setSelectedProduct(null);
    setImageFiles([]);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles: FileWithPreview[] = Array.from(e.target.files).map(file => {
        const fileWithPreview = file as FileWithPreview;
        fileWithPreview.preview = URL.createObjectURL(file);
        return fileWithPreview;
      });
      
      setImageFiles(prevFiles => [...prevFiles, ...selectedFiles]);
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
  
  const handleRemoveUploadedFile = (index: number) => {
    const newFiles = [...imageFiles];
    
    // Revoke the object URL to avoid memory leaks
    if (newFiles[index].preview) {
      URL.revokeObjectURL(newFiles[index].preview!);
    }
    
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
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
      {products.length > 0 ? (
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
                          <div className="w-10 h-10 bg-muted rounded overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <img 
                                src={product.images[0]} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <ImagePlus size={16} />
                              </div>
                            )}
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize">
                        {product.category.replace('-', ' ')}
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
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Products Yet</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Start adding products to your store inventory. These will appear in your shop.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus size={16} className="mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}
      
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
                  value={formData.price || ''}
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
              
              <div className="space-y-2">
                <Label htmlFor="artistName">Artist Name (optional)</Label>
                <Input
                  id="artistName"
                  placeholder="Artist name"
                  value={formData.artistName}
                  onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearCreated">Year Created (optional)</Label>
                <Input
                  id="yearCreated"
                  type="number"
                  placeholder="Year"
                  value={formData.yearCreated || ''}
                  onChange={(e) => setFormData({ ...formData, yearCreated: parseInt(e.target.value) })}
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
                
                {/* Existing images */}
                {formData.images.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Current Images:</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {formData.images.map((image, index) => (
                        <div 
                          key={`existing-${index}`} 
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
                    </div>
                  </div>
                )}
                
                {/* New images to upload */}
                {imageFiles.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">New Uploads:</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {imageFiles.map((file, index) => (
                        <div 
                          key={`upload-${index}`} 
                          className="relative h-24 bg-muted rounded-md overflow-hidden"
                        >
                          {file.preview && (
                            <img 
                              src={file.preview} 
                              alt={`Upload ${index}`} 
                              className="w-full h-full object-cover"
                            />
                          )}
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={() => handleRemoveUploadedFile(index)}
                          >
                            <X size={12} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Upload button */}
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="product-image-upload"
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
                      id="product-image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
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
