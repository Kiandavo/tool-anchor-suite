
export const finglishMap: Record<string, string> = {
  a: "ا", aa: "آ", b: "ب", c: "ک", d: "د", e: "ه", ee: "ی", f: "ف",
  g: "گ", gh: "ق", h: "ه", i: "ی", j: "ج", k: "ک", kh: "خ", l: "ل",
  m: "م", n: "ن", o: "و", oo: "و", p: "پ", q: "ق", r: "ر", s: "س", sh: "ش",
  t: "ت", u: "و", v: "و", w: "و", x: "خ", y: "ی", z: "ز", zh: "ژ", ch: "چ",
  '.' : "‌.", ',' : "،", '?' : "؟", "'" : "‌", ' ' : " ",
};

export function finglishToPersian(finglish: string): string {
  let out = "";
  let i = 0;
  finglish = finglish.toLowerCase();
  while (i < finglish.length) {
    if (i < finglish.length - 1) {
      const two = finglish.slice(i, i + 2);
      if (finglishMap[two]) { out += finglishMap[two]; i += 2; continue; }
    }
    const one = finglish[i];
    out += finglishMap[one] || one;
    i++;
  }
  return out;
}

export function countCharacters(text: string): number {
  return text.length;
}
export function countWords(text: string): number {
  const trimmedText = text.trim();
  if (!trimmedText) return 0;
  return trimmedText.split(/[\s\u200C]+/).filter(word => word.length > 0).length;
}
export function countSentences(text: string): number {
  if (!text.trim()) return 0;
  const sentenceEndings = text.match(/[.!?؟\.\n]+/g);
  return sentenceEndings ? sentenceEndings.length : 1;
}
export function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/\n+/).filter(para => para.trim().length > 0).length;
}
export function calculateReadingTime(text: string): number {
  const words = countWords(text);
  return Math.ceil(words / 200);
}
export function reverseText(text: string): string {
  return text.split('').reverse().join('');
}
export function removeDuplicateLines(text: string): string {
  const lines = text.split('\n');
  const uniqueLines = [...new Set(lines)];
  return uniqueLines.join('\n');
}
export function sortLines(text: string, ascending = true): string {
  const lines = text.split('\n');
  const sortedLines = lines.sort((a, b) =>
    ascending ? a.localeCompare(b) : b.localeCompare(a)
  );
  return sortedLines.join('\n');
}
export function trimLines(text: string): string {
  const lines = text.split('\n');
  const trimmedLines = lines.map(line => line.trim());
  return trimmedLines.join('\n');
}
export function removeEmptyLines(text: string): string {
  const lines = text.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  return nonEmptyLines.join('\n');
}
export function removeEmojis(text: string): string {
  return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
}
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}
export function toLowerCase(text: string): string {
  return text.toLowerCase();
}
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// The image utilities
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
