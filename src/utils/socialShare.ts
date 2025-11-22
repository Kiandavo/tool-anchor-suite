export interface ShareOptions {
  url: string;
  title: string;
  text?: string;
  hashtags?: string[];
}

export const socialShareUrls = {
  twitter: (options: ShareOptions) => {
    const params = new URLSearchParams({
      url: options.url,
      text: options.title,
      ...(options.hashtags?.length && { hashtags: options.hashtags.join(',') })
    });
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  },

  facebook: (options: ShareOptions) => {
    const params = new URLSearchParams({
      u: options.url,
      quote: options.title
    });
    return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
  },

  linkedin: (options: ShareOptions) => {
    const params = new URLSearchParams({
      url: options.url,
      title: options.title,
      summary: options.text || ''
    });
    return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
  },

  telegram: (options: ShareOptions) => {
    const params = new URLSearchParams({
      url: options.url,
      text: options.title
    });
    return `https://t.me/share/url?${params.toString()}`;
  },

  whatsapp: (options: ShareOptions) => {
    const text = `${options.title} - ${options.url}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  },

  email: (options: ShareOptions) => {
    const params = new URLSearchParams({
      subject: options.title,
      body: `${options.text || ''}\n\n${options.url}`
    });
    return `mailto:?${params.toString()}`;
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const canShare = () => {
  return typeof navigator !== 'undefined' && 'share' in navigator;
};

export const nativeShare = async (options: ShareOptions): Promise<boolean> => {
  if (!canShare()) return false;
  
  try {
    await navigator.share({
      title: options.title,
      text: options.text,
      url: options.url
    });
    return true;
  } catch {
    return false;
  }
};
