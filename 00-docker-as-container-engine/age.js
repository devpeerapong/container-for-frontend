export function age(yearOfBirth) {
  const now = new Date()

  // return Math.floor(now.getFullYear() - yearOfBirth) - 1
  return Math.max(Math.floor(now.getFullYear() - yearOfBirth) - 1, 0)
}
