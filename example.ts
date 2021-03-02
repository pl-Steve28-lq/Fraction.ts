import { Fraction } from "./fraction.ts"

let a = new Fraction(1, 2),
    b = new Fraction(1, 3)
console.log(a.add(b).toString())