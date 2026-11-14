/** Koşullu className birleştirici */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
