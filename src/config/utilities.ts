export function generateID() {
  return `id${Math.random().toString(16).slice(2)}`;
}

export function getFileExtension(fileName: string) {
  return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
}
