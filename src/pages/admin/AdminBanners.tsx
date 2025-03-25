
import React, { useState } from 'react';
import { Image, Plus, Edit, Trash2, MoveUp, MoveDown, Link as LinkIcon } from 'lucide-react';
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

// Mock banner data
const mockBanners = [
  { 
    id: '1', 
    title: 'Festival Sale',
    image: 'https://placehold.co/800x400/e9d5ff/703fc8?text=Festival+Sale',
    link: '/shop?campaign=festival', 
    active: true,
    order: 1
  },
  { 
    id: '2', 
    title: 'New Collection',
    image: 'https://placehold.co/800x400/d1fae5/065f46?text=New+Collection',
    link: '/new-arrivals', 
    active: true,
    order: 2
  },
  { 
    id: '3', 
    title: 'Special Discount',
    image: 'https://placehold.co/800x400/fee2e2/991b1b?text=Special+Discount',
    link: '/offers', 
    active: true,
    order: 3
  }
];

const AdminBanners = () => {
  const [banners, setBanners] = useState(mockBanners);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [newBanner, setNewBanner] = useState({
    title: '',
    image: '',
    link: '',
    active: true
  });

  const handleAddBanner = () => {
    if (!newBanner.title || !newBanner.image) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const banner = {
      id: Date.now().toString(),
      ...newBanner,
      order: banners.length + 1
    };
    
    setBanners([...banners, banner]);
    setIsAddModalOpen(false);
    setNewBanner({
      title: '',
      image: '',
      link: '',
      active: true
    });
    toast.success('Banner added successfully');
  };

  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
    setIsEditModalOpen(true);
  };

  const handleUpdateBanner = () => {
    if (!selectedBanner.title || !selectedBanner.image) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setBanners(banners.map(banner => 
      banner.id === selectedBanner.id ? selectedBanner : banner
    ));
    
    setIsEditModalOpen(false);
    toast.success('Banner updated successfully');
  };

  const handleDeleteClick = (banner) => {
    setSelectedBanner(banner);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setBanners(banners.filter(banner => banner.id !== selectedBanner.id));
    setIsDeleteModalOpen(false);
    toast.success('Banner deleted successfully');
  };

  const moveUp = (id) => {
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

  const moveDown = (id) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-medium">Banner Management</h1>
        <Button className="bg-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add New Banner
        </Button>
      </div>
      
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
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={newBanner.image}
                onChange={(e) => setNewBanner({...newBanner, image: e.target.value})}
                placeholder="Enter image URL"
              />
              <p className="text-sm text-muted-foreground">
                In a real app, you would upload an image file here.
              </p>
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
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
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
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={selectedBanner.image}
                  onChange={(e) => setSelectedBanner({...selectedBanner, image: e.target.value})}
                />
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
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
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
            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
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
