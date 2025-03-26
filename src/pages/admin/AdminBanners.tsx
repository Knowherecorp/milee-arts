
import React, { useState } from 'react';
import { Image, Plus, Edit, Trash2, MoveUp, MoveDown, Link as LinkIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Banner {
  id: string;
  title: string;
  image: string;
  link: string;
  active: boolean;
  order: number;
}

const AdminBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [newBanner, setNewBanner] = useState({
    title: '',
    image: '',
    link: '',
    active: true
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAddBanner = () => {
    if (!newBanner.title || (!newBanner.image && !selectedFile)) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const banner = {
      id: Date.now().toString(),
      ...newBanner,
      order: banners.length + 1
    };
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const imageUrl = e.target.result.toString();
          setBanners([...banners, {...banner, image: imageUrl}]);
          
          setIsAddModalOpen(false);
          resetForm();
          toast.success('Banner added successfully');
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setBanners([...banners, banner]);
      setIsAddModalOpen(false);
      resetForm();
      toast.success('Banner added successfully');
    }
  };

  const handleEditClick = (banner: Banner) => {
    setSelectedBanner(banner);
    setIsEditModalOpen(true);
  };

  const handleUpdateBanner = () => {
    if (!selectedBanner) return;
    
    if (!selectedBanner.title || (!selectedBanner.image && !selectedFile)) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const imageUrl = e.target.result.toString();
          
          setBanners(banners.map(banner => 
            banner.id === selectedBanner.id ? {...selectedBanner, image: imageUrl} : banner
          ));
          
          setIsEditModalOpen(false);
          resetForm();
          toast.success('Banner updated successfully');
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setBanners(banners.map(banner => 
        banner.id === selectedBanner.id ? selectedBanner : banner
      ));
      
      setIsEditModalOpen(false);
      resetForm();
      toast.success('Banner updated successfully');
    }
  };

  const handleDeleteClick = (banner: Banner) => {
    setSelectedBanner(banner);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedBanner) return;
    
    setBanners(banners.filter(banner => banner.id !== selectedBanner.id));
    setIsDeleteModalOpen(false);
    resetForm();
    toast.success('Banner deleted successfully');
  };

  const moveUp = (id: string) => {
    const index = banners.findIndex(banner => banner.id === id);
    if (index > 0) {
      const newBanners = [...banners];
      [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]];
      
      // Update order properties
      newBanners[index - 1].order = index;
      newBanners[index].order = index + 1;
      
      setBanners(newBanners);
      toast.success('Banner order updated');
    }
  };

  const moveDown = (id: string) => {
    const index = banners.findIndex(banner => banner.id === id);
    if (index < banners.length - 1) {
      const newBanners = [...banners];
      [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
      
      // Update order properties
      newBanners[index].order = index + 1;
      newBanners[index + 1].order = index + 2;
      
      setBanners(newBanners);
      toast.success('Banner order updated');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setNewBanner({
      title: '',
      image: '',
      link: '',
      active: true
    });
    setSelectedBanner(null);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-medium">Banner Management</h1>
        <Button className="bg-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add New Banner
        </Button>
      </div>
      
      {banners.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="border rounded-lg overflow-hidden">
              <div className="aspect-[21/9] relative bg-muted">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{banner.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <LinkIcon size={14} className="mr-1" />
                      {banner.link}
                    </p>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${banner.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {banner.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => moveUp(banner.id)} disabled={banner.order === 1}>
                      <MoveUp size={16} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => moveDown(banner.id)} disabled={banner.order === banners.length}>
                      <MoveDown size={16} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleEditClick(banner)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDeleteClick(banner)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <Image className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Banners Yet</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Add banners to showcase on your website's homepage. These will appear in the slider section.
          </p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            Add Your First Banner
          </Button>
        </div>
      )}

      {/* Add Banner Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Banner</DialogTitle>
            <DialogDescription>
              Create a new banner for your homepage slider.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Banner Title</Label>
              <Input
                id="title"
                value={newBanner.title}
                onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
                placeholder="Enter banner title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Banner Image</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image-url"
                  value={newBanner.image}
                  onChange={(e) => setNewBanner({...newBanner, image: e.target.value})}
                  placeholder="Or enter image URL"
                  className="flex-1"
                />
                <div className="relative">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                  <Label
                    htmlFor="image-upload"
                    className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                  >
                    <Upload size={14} className="mr-1" />
                    Upload
                  </Label>
                </div>
              </div>
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="link">Link (URL)</Label>
              <Input
                id="link"
                value={newBanner.link}
                onChange={(e) => setNewBanner({...newBanner, link: e.target.value})}
                placeholder="Enter destination URL"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                checked={newBanner.active}
                onChange={(e) => setNewBanner({...newBanner, active: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              setIsAddModalOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddBanner}>
              Add Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Banner Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
            <DialogDescription>
              Update banner details.
            </DialogDescription>
          </DialogHeader>
          {selectedBanner && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Banner Title</Label>
                <Input
                  id="edit-title"
                  value={selectedBanner.title}
                  onChange={(e) => setSelectedBanner({...selectedBanner, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Banner Image</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="edit-image-url"
                    value={selectedBanner.image}
                    onChange={(e) => setSelectedBanner({...selectedBanner, image: e.target.value})}
                    placeholder="Or enter image URL"
                    className="flex-1"
                  />
                  <div className="relative">
                    <Input
                      id="edit-image-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                    <Label
                      htmlFor="edit-image-upload"
                      className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                    >
                      <Upload size={14} className="mr-1" />
                      Upload
                    </Label>
                  </div>
                </div>
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected file: {selectedFile.name}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-link">Link (URL)</Label>
                <Input
                  id="edit-link"
                  value={selectedBanner.link}
                  onChange={(e) => setSelectedBanner({...selectedBanner, link: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-active"
                  checked={selectedBanner.active}
                  onChange={(e) => setSelectedBanner({...selectedBanner, active: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              setIsEditModalOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateBanner}>
              Update Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this banner? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              setIsDeleteModalOpen(false);
              setSelectedBanner(null);
            }}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBanners;
