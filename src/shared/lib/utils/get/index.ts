export function getFileExtension(fileName: string) {
  return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
}
