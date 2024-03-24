export function generateNumber(min: number = 1, max: number = 99): number {
  return Math.round(Math.random() * (max - min) + min);
}

export function generateID() {
  return `id${Math.random().toString(16).slice(2)}`;
}
