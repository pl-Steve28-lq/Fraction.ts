let isFloat = (n: number): boolean => (n - (n | 0) != 0)
let getDigit = (n: number): number => isFloat(n) ? n.toString().split('.')[1].length : 0
let gcd = (a: number, b: number): number => (b != 0 ? gcd(b, a%b) : a)

export { isFloat, getDigit, gcd }