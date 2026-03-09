"use client";

const CUSTOM_IMAGE_PREFIX = "cocktail-custom-image-";

export function getCustomImage(cocktailId: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CUSTOM_IMAGE_PREFIX + cocktailId);
  } catch {
    return null;
  }
}

export function setCustomImage(cocktailId: string, dataUrl: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CUSTOM_IMAGE_PREFIX + cocktailId, dataUrl);
  } catch {
    // localStorage quota exceeded or unavailable
  }
}

export function removeCustomImage(cocktailId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CUSTOM_IMAGE_PREFIX + cocktailId);
  } catch {
    // ignore
  }
}

export function hasCustomImage(cocktailId: string): boolean {
  return getCustomImage(cocktailId) !== null;
}

export function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 800;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          if (width > height) {
            height = Math.round((height * MAX) / width);
            width = MAX;
          } else {
            width = Math.round((width * MAX) / height);
            height = MAX;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
