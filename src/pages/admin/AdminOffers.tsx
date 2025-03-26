
import React, { useState } from 'react';
import { Tag, Plus, Edit, Trash2, Calendar, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Offer {
  id: string;
  code: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  startDate: string;
  endDate: string;
  minPurchase: number;
  active: boolean;
}

const AdminOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [newOffer, setNewOffer] = useState({
    code: '',
    description: '',
    discount: 0,
    discountType: 'percentage' as 'percentage' | 'fixed',
    startDate: '',
    endDate: '',
    minPurchase: 0,
    active: true
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter offers based on search term
  const filteredOffers = offers.filter(offer => 
    offer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOffer = () => {
    if (!newOffer.code || !newOffer.description || !newOffer.discount || !newOffer.startDate || !newOffer.endDate) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const offer = {
      id: Date.now().toString(),
      ...newOffer,
    };
    
    setOffers([...offers, offer]);
    setIsAddModalOpen(false);
    resetForm();
    toast.success('Offer added successfully');
  };

  const handleEditClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsEditModalOpen(true);
  };

  const handleUpdateOffer = () => {
    if (!selectedOffer) return;
    
    if (!selectedOffer.code || !selectedOffer.description || !selectedOffer.discount || !selectedOffer.startDate || !selectedOffer.endDate) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setOffers(offers.map(offer => 
      offer.id === selectedOffer.id ? selectedOffer : offer
    ));
    
    setIsEditModalOpen(false);
    resetForm();
    toast.success('Offer updated successfully');
  };

  const handleDeleteClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedOffer) return;
    setOffers(offers.filter(offer => offer.id !== selectedOffer.id));
    setIsDeleteModalOpen(false);
    resetForm();
    toast.success('Offer deleted successfully');
  };

  const toggleOfferStatus = (id: string) => {
    setOffers(offers.map(offer => 
      offer.id === id ? {...offer, active: !offer.active} : offer
    ));
    
    const offer = offers.find(o => o.id === id);
    if (offer) {
      toast.success(`Offer ${offer.code} ${!offer.active ? 'activated' : 'deactivated'}`);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const resetForm = () => {
    setNewOffer({
      code: '',
      description: '',
      discount: 0,
      discountType: 'percentage',
      startDate: '',
      endDate: '',
      minPurchase: 0,
      active: true
    });
    setSelectedOffer(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-medium">Offers & Promotions</h1>
        <Button className="bg-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add New Offer
        </Button>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
        <Input 
          type="search" 
          placeholder="Search offers..." 
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit">
          <Tag size={16} />
        </Button>
      </div>

      {offers.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="hidden md:table-cell">Discount</TableHead>
                <TableHead className="hidden md:table-cell">Validity</TableHead>
                <TableHead className="hidden md:table-cell">Min. Purchase</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOffers.length > 0 ? (
                filteredOffers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">{offer.code}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{offer.description}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {offer.discountType === 'percentage' ? `${offer.discount}%` : `₹${offer.discount}`}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="flex items-center text-sm">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">₹{offer.minPurchase}</TableCell>
                    <TableCell>
                      <Button 
                        variant={offer.active ? "outline" : "ghost"} 
                        size="sm"
                        className={`${offer.active ? 'bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800' : 'text-muted-foreground'}`}
                        onClick={() => toggleOfferStatus(offer.id)}
                      >
                        {offer.active ? 'Active' : 'Inactive'}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(offer)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(offer)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No offers found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <Percent className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Offers Yet</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Create promotional offers and discount codes to boost your sales and attract customers.
          </p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            Add Your First Offer
          </Button>
        </div>
      )}

      {/* Add Offer Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Offer</DialogTitle>
            <DialogDescription>
              Create a new promotional offer or discount code.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Offer Code</Label>
                <Input
                  id="code"
                  value={newOffer.code}
                  onChange={(e) => setNewOffer({...newOffer, code: e.target.value.toUpperCase()})}
                  placeholder="SUMMER25"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount">Discount Value</Label>
                <div className="flex">
                  <Input
                    id="discount"
                    type="number"
                    value={newOffer.discount || ''}
                    onChange={(e) => setNewOffer({...newOffer, discount: parseFloat(e.target.value)})}
                    placeholder="25"
                  />
                  <select
                    className="ml-2 border rounded-md px-2"
                    value={newOffer.discountType}
                    onChange={(e) => setNewOffer({...newOffer, discountType: e.target.value as 'percentage' | 'fixed'})}
                  >
                    <option value="percentage">%</option>
                    <option value="fixed">₹</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newOffer.description}
                onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                placeholder="Summer sale discount on all products"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newOffer.startDate}
                  onChange={(e) => setNewOffer({...newOffer, startDate: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newOffer.endDate}
                  onChange={(e) => setNewOffer({...newOffer, endDate: e.target.value})}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minPurchase">Minimum Purchase Amount (₹)</Label>
              <Input
                id="minPurchase"
                type="number"
                value={newOffer.minPurchase || ''}
                onChange={(e) => setNewOffer({...newOffer, minPurchase: parseFloat(e.target.value)})}
                placeholder="1000"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                checked={newOffer.active}
                onChange={(e) => setNewOffer({...newOffer, active: e.target.checked})}
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
            <Button type="button" onClick={handleAddOffer}>
              Add Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Offer Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Offer</DialogTitle>
            <DialogDescription>
              Update offer details.
            </DialogDescription>
          </DialogHeader>
          {selectedOffer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-code">Offer Code</Label>
                  <Input
                    id="edit-code"
                    value={selectedOffer.code}
                    onChange={(e) => setSelectedOffer({...selectedOffer, code: e.target.value.toUpperCase()})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-discount">Discount Value</Label>
                  <div className="flex">
                    <Input
                      id="edit-discount"
                      type="number"
                      value={selectedOffer.discount || ''}
                      onChange={(e) => setSelectedOffer({...selectedOffer, discount: parseFloat(e.target.value)})}
                    />
                    <select
                      className="ml-2 border rounded-md px-2"
                      value={selectedOffer.discountType}
                      onChange={(e) => setSelectedOffer({...selectedOffer, discountType: e.target.value as 'percentage' | 'fixed'})}
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">₹</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={selectedOffer.description}
                  onChange={(e) => setSelectedOffer({...selectedOffer, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={selectedOffer.startDate}
                    onChange={(e) => setSelectedOffer({...selectedOffer, startDate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-endDate">End Date</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={selectedOffer.endDate}
                    onChange={(e) => setSelectedOffer({...selectedOffer, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-minPurchase">Minimum Purchase Amount (₹)</Label>
                <Input
                  id="edit-minPurchase"
                  type="number"
                  value={selectedOffer.minPurchase || ''}
                  onChange={(e) => setSelectedOffer({...selectedOffer, minPurchase: parseFloat(e.target.value)})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-active"
                  checked={selectedOffer.active}
                  onChange={(e) => setSelectedOffer({...selectedOffer, active: e.target.checked})}
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
            <Button type="button" onClick={handleUpdateOffer}>
              Update Offer
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
              Are you sure you want to delete this offer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              setIsDeleteModalOpen(false);
              setSelectedOffer(null);
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

export default AdminOffers;
