import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { X, RotateCw, ZoomOut, RotateCcw, Move, RefreshCw, Image } from 'lucide-react';
import { ModalPortal } from '../ui/modal-portal';
import { useAppStore } from '../../store';

interface ImageEditorModalProps {
  isOpen: boolean;
  imageFile: File;
  onSave: (editedFile: File) => void;
  onClose: () => void;
}

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ 
  isOpen, 
  imageFile, 
  onSave, 
  onClose 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const { addNotification } = useAppStore();

  useEffect(() => {
    if (!isOpen || !imageFile) return;
    
    const img = new window.Image();
    img.onload = () => {
      // Calculate initial scale to fit image in circle
      const canvas = canvasRef.current;
      if (canvas) {
        const circleRadius = 140;
        const imageSize = Math.min(img.width, img.height);
        const initialScale = (circleRadius * 2 * 0.8) / imageSize; // 80% of circle size
        setScale(initialScale);
      }
      setImage(img);
    };
    img.src = URL.createObjectURL(imageFile);
    return () => URL.revokeObjectURL(img.src);
  }, [imageFile, isOpen]);

  useEffect(() => {
    if (image) {
      drawImage(image, scale, rotation, position);
    }
  }, [scale, rotation, position, image]);

  const drawImage = (img: HTMLImageElement, s: number, r: number, pos: { x: number, y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 320;
    canvas.height = 320;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2 + pos.x, canvas.height / 2 + pos.y);
    ctx.rotate((r * Math.PI) / 180);
    ctx.scale(s, s);

    const size = Math.min(img.width, img.height);
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();

    // Draw crop circle overlay
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 140, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // Draw circle border
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 140, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - rect.left - position.x, 
      y: e.clientY - rect.top - position.y 
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setPosition({
      x: e.clientX - rect.left - dragStart.x,
      y: e.clientY - rect.top - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    setLoading(true);
    try {
      // Create a new canvas for the final cropped image
      const finalCanvas = document.createElement('canvas');
      const finalCtx = finalCanvas.getContext('2d');
      if (!finalCtx) return;

      finalCanvas.width = 280;
      finalCanvas.height = 280;

      // Draw the transformed image
      finalCtx.save();
      finalCtx.translate(finalCanvas.width / 2 + position.x, finalCanvas.height / 2 + position.y);
      finalCtx.rotate((rotation * Math.PI) / 180);
      finalCtx.scale(scale, scale);

      const size = Math.min(image.width, image.height);
      finalCtx.drawImage(image, -size / 2, -size / 2, size, size);
      finalCtx.restore();

      finalCanvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], imageFile.name, { type: 'image/png' });
          onSave(file);
          addNotification({ message: 'Avatar updated successfully!', type: 'success' });
        }
      }, 'image/png', 0.9);
    } catch (error) {
      addNotification({ message: 'Failed to process image', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const resetTransforms = () => {
    // Reset to initial calculated scale
    if (image) {
      const circleRadius = 140;
      const imageSize = Math.min(image.width, image.height);
      const initialScale = (circleRadius * 2 * 0.8) / imageSize;
      setScale(initialScale);
    }
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
        <div className="bg-white dark:bg-[#282a36] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-scrollbar border border-gray-200 dark:border-[#6272a4]">
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#282a36]">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-[#f8f8f2] flex items-center gap-2">
              <Image className="h-5 w-5" />
              Edit Avatar
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Image Preview (2/3 width) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-[#f8f8f2] mb-2">Preview</h3>
                  <p className="text-sm text-gray-600 dark:text-[#6272a4] mb-4">
                    Drag to reposition • Orange circle shows crop area
                  </p>
                </div>
                
                {/* Zoom Control above image */}
                <div className="max-w-md mx-auto">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 dark:text-[#6272a4] w-8">20%</span>
                    <input
                      type="range"
                      min="0.2"
                      max="3"
                      step="0.1"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-[#44475a] rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-600 dark:text-[#6272a4] w-8">300%</span>
                  </div>
                  <div className="text-center mt-1">
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      {Math.round(scale * 100)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <canvas
                    ref={canvasRef}
                    className="border border-gray-300 dark:border-[#6272a4] rounded-lg cursor-move shadow-lg"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onWheel={(e) => {
                      e.preventDefault();
                      const delta = e.deltaY > 0 ? -0.1 : 0.1;
                      setScale(Math.max(0.2, Math.min(3, scale + delta)));
                    }}
                  />
                </div>
              </div>

              {/* Right Column - Edit Controls (1/3 width) */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-[#f8f8f2] mb-4">Controls</h3>
                  
                  <div className="space-y-4">
                    {/* Rotation Controls */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-[#f8f8f2]">Rotation</label>
                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRotation((rotation - 90 + 360) % 360)}
                          className="text-xs"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Rotate Left
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRotation((rotation + 90) % 360)}
                          className="text-xs"
                        >
                          <RotateCw className="h-4 w-4 mr-2" />
                          Rotate Right
                        </Button>
                      </div>
                      <div className="text-center">
                        <span className="text-sm text-gray-600 dark:text-[#6272a4]">
                          Current: {rotation}°
                        </span>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetTransforms}
                        className="w-full"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset All
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 dark:border-[#6272a4] pt-6">
                  <div className="space-y-3">
                    <Button 
                      onClick={handleSave} 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Avatar'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full" 
                      onClick={onClose}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};