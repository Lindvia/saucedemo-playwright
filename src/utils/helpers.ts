
export function generateRandomEmail() {
  return `test${Math.random().toString(36).substring(2, 10)}@example.com`;
}