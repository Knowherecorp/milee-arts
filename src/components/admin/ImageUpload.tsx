
import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export interface ImageUploadProps {
  onChange: (url: string | null) => void;
  onUpload: (file: File) => Promise<string>;
  value?: string | null;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onChange, 
  onUpload,
  value,
  label = 'Image'
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await onUpload(file);
      onChange(url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onUpload, onChange]);

  const handleRemove = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <div className="space-y-2">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>

        {value ? (
          <div className="relative aspect-square w-40 overflow-hidden rounded-md border">
            <img 
              src={value} 
              alt="Uploaded image" 
              className="object-cover w-full h-full"
            />
            <Button 
              onClick={handleRemove}
              className="absolute top-1 right-1 h-6 w-6 p-0" 
              variant="destructive"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-sm text-muted-foreground">
            <div className="flex flex-col items-center mb-2">
              <Upload className="h-8 w-8 mb-1 text-muted-foreground" />
              <p>Drag and drop or click to upload</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="image-upload"
              disabled={isUploading}
            />
            <label htmlFor="image-upload" className="w-full">
              <Button
                variant="secondary"
                className="w-full"
                disabled={isUploading}
                type="button"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Choose Image'
                )}
              </Button>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
