export function isTextType(type: string | undefined) {
  return type === "text" || type === "i-text" || type === "textbox";
}


export function rgbaObjectToString(rgba: string | { r: number; g: number; b: number; a?: number }) {
  if (typeof rgba === 'string') {
    return rgba;
  }
  
  const alpha = rgba.a === undefined ? 1 : rgba.a;
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
}