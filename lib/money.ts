export function moneyUZS(n: number): string {
  // 108900 -> 108 900
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
