export function uniqId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}
