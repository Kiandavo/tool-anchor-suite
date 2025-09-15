// Helper function to convert HEIC files to JPEG if needed
const processHEICFile = async (file: File): Promise<File> => {
  const isHEIC = file.type === 'image/heic' || file.type === 'image/HEIC' || 
                 file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.HEIC');
  
  if (isHEIC) {
    try {
      // Import heic2any dynamically
      const heic2any = (await import('heic2any')).default;
      // Convert HEIC to JPEG first
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.95
      }) as Blob;
      return new File([convertedBlob], file.name.replace(/\.heic$/i, '.jpg'), {
        type: 'image/jpeg'
      });
    } catch (error) {
      throw new Error('Failed to convert HEIC file. Please use a supported image format.');
    }
  }
  
  return file;
};

export const compressImage = async (file: File, quality: number = 0.7): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const resizeImage = async (file: File, maxWidth: number, maxHeight: number): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width, height = img.height;
        if (width > height) {
          if (width > maxWidth) { height = Math.round(height * maxWidth / width); width = maxWidth; }
        } else {
          if (height > maxHeight) { width = Math.round(width * maxHeight / height); height = maxHeight; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const convertToFormat = async (file: File, format: string): Promise<Blob> => {
  // Check if the file is HEIC format and convert it first
  const isHEIC = file.type === 'image/heic' || file.type === 'image/HEIC' || 
                 file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.HEIC');
  
  let processedFile = file;
  
  if (isHEIC) {
    try {
      // Import heic2any dynamically
      const heic2any = (await import('heic2any')).default;
      // Convert HEIC to JPEG first
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.95
      }) as Blob;
      processedFile = new File([convertedBlob], file.name.replace(/\.heic$/i, '.jpg'), {
        type: 'image/jpeg'
      });
    } catch (error) {
      throw new Error('Failed to convert HEIC file. Please try converting to JPEG format first.');
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        
        // For PNG conversion, ensure transparent background is preserved
        if (format === 'png') {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.drawImage(img, 0, 0);
        let mimeType;
        let quality = 0.95; // High quality for format conversion
        
        switch(format.toLowerCase()) {
          case 'webp': 
            mimeType = 'image/webp';
            // Check WebP support
            if (!document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp')) {
              console.warn('WebP format not supported by this browser, falling back to JPEG');
              mimeType = 'image/jpeg';
            }
            break;
          case 'jpg': 
          case 'jpeg': 
            mimeType = 'image/jpeg'; 
            break;
          case 'png': 
            mimeType = 'image/png'; 
            quality = undefined; // PNG doesn't use quality parameter
            break;
          default: 
            mimeType = 'image/jpeg';
        }
        
        canvas.toBlob(
          (blob) => { 
            if (!blob) { 
              reject(new Error(`Canvas toBlob failed - format ${format} may not be supported`)); 
              return; 
            }
            // Additional debugging info
            console.log(`Format conversion complete:`, {
              requestedFormat: format,
              outputMimeType: mimeType,
              blobType: blob.type,
              blobSize: blob.size,
              browserSupportsWebP: document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp')
            });
            resolve(blob); 
          },
          mimeType, 
          quality
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const rotateImage = async (file: File, degrees: number): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        if (degrees === 90 || degrees === 270) {
          canvas.width = img.height; canvas.height = img.width;
        } else { canvas.width = img.width; canvas.height = img.height; }
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((degrees * Math.PI) / 180);
        if (degrees === 90 || degrees === 270) {
          ctx.drawImage(img, -img.height / 2, -img.width / 2);
        } else {
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
        }
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const flipImage = async (file: File, direction: 'horizontal' | 'vertical'): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        if (direction === 'horizontal') { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
        else { ctx.translate(0, canvas.height); ctx.scale(1, -1); }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const applyGrayscale = async (file: File): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const gray = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11);
          data[i] = gray; data[i + 1] = gray; data[i + 2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const applyBlur = async (file: File, blurAmount: number): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.drawImage(img, 0, 0);
        if (ctx.filter !== undefined) {
          ctx.filter = `blur(${blurAmount}px)`;
          ctx.drawImage(img, 0, 0);
        }
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const invertImage = async (file: File): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.drawImage(img, 0, 0);
        ctx.filter = 'invert(100%)';
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const adjustContrast = async (file: File, contrast: number): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.filter = `contrast(${contrast}%)`;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const adjustBrightness = async (file: File, brightness: number): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.filter = `brightness(${brightness}%)`;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const adjustSaturation = async (file: File, saturation: number): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.filter = `saturate(${saturation}%)`;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const adjustHueRotate = async (file: File, degrees: number): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.filter = `hue-rotate(${degrees}deg)`;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};

export const applySepia = async (file: File): Promise<Blob> => {
  const processedFile = await processHEICFile(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.drawImage(img, 0, 0);
        
        // Apply sepia filter using canvas filter
        ctx.filter = 'sepia(100%)';
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          'image/jpeg', 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(processedFile);
  });
};
