export const compressImage = (file: File, quality: number = 0.7): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};

export const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};

export const convertToFormat = (file: File, format: string): Promise<Blob> => {
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
        let mimeType;
        switch(format) {
          case 'webp': mimeType = 'image/webp'; break;
          case 'jpg': case 'jpeg': mimeType = 'image/jpeg'; break;
          case 'png': mimeType = 'image/png'; break;
          default: mimeType = 'image/jpeg';
        }
        canvas.toBlob(
          (blob) => { if (!blob) { reject(new Error('Canvas toBlob failed')); return; } resolve(blob); },
          mimeType, 0.9
        );
      };
      img.onerror = () => { reject(new Error('Failed to load image')); };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => { reject(new Error('Failed to read file')); };
    reader.readAsDataURL(file);
  });
};

export const rotateImage = (file: File, degrees: number): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};

export const flipImage = (file: File, direction: 'horizontal' | 'vertical'): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};

export const applyGrayscale = (file: File): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};

export const applyBlur = (file: File, blurAmount: number): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};

export const invertImage = (file: File): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};

export const adjustContrast = (file: File, contrast: number): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};

export const adjustBrightness = (file: File, brightness: number): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};

export const adjustSaturation = (file: File, saturation: number): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};

export const adjustHueRotate = (file: File, degrees: number): Promise<Blob> => {
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
    reader.readAsDataURL(file);
  });
};
