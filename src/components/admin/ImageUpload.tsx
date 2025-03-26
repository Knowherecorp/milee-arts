
import React, { useState } from 'react';
import { ImageIcon, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadProductImage } from '@/services/api';
import { toast } from 'sonner';

interface ImageUploadProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  currentImage, 
  onImageUploaded,
  className = ""
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image file is too large. Please select a file under 5MB');
      return;
    }

    // Create local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Upload to Supabase
    try {
      setIsUploading(true);
      const imageUrl = await uploadProductImage(file);
      onImageUploaded(imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
      // Revert to previous image if upload fails
      setPreviewUrl(currentImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUploaded('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {previewUrl ? (
        <div className="relative image-preview">
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 rounded-full"
            onClick={handleRemoveImage}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="image-upload-area">
          <div className="file-input-button">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <label className="image-upload-area-label">
              <ImageIcon className="h-8 w-8 mb-2 text-muted-foreground" />
              <span className="text-sm text-center text-muted-foreground">
                {isUploading ? 'Uploading...' : 'Click to upload an image'}
              </span>
            </label>
          </div>
        </div>
      )}
      
      {previewUrl && (
        <div className="flex justify-center">
          <div className="file-input-button">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs" 
              disabled={isUploading}
            >
              <Upload className="h-3 w-3 mr-1" />
              Change Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
