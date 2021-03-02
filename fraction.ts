import { isFloat, getDigit, gcd } from './utils.ts'
import { ZeroDivisionError, FractionError } from './error.ts'

class Fraction {
  a: number
  b: number

  constructor(a: number, b?: number) {
    let res = b ? this._twoArg(a, b) : this._oneArg(a)
    this.a = res[0]
    this.b = res[1]
  }

  static parse(t: string): Fraction {
    let minus = t.includes('-'), a = t
    if (minus) a = t.split('-')[1]
    let repeat = a.includes('[')
    if (repeat) {
      let [fl, re] = a.split('[')
      let flt = Number.parseFloat(fl),
          rep = Number.parseInt(re.replace(/\]/, '')),
          all = Number.parseInt(fl.replace(/\./, '') + re),
          deno = Number.parseInt(
            '9'.repeat(rep.toString().length) +
            '0'.repeat(flt.toString().split('.')[1]?.length || 0)
          )
      return new Fraction(all-flt*10**getDigit(flt), deno).mul(minus?-1:1)
    } else {
      return this.parse(`${minus?'-':''}${a}[0]`)
    }
  }

  private _oneArg(a: number) {
    if (isFloat(a)) {
      let exp = 10**getDigit(a)
      return this._twoArg(a*exp, exp)
    } else { return this._twoArg(a, 1) }
  }

  private _twoArg(a: number, b: number) {
    if (b == 0) throw new ZeroDivisionError()
    if (isFloat(a) || isFloat(b)) {
      let exp = Math.max(getDigit(a), getDigit(b))
      a *= 10**exp
      b *= 10**exp
    }
    let g = gcd(a, b)
    return [a/g, b/g]
  }

  toString() {
    if (this.b != 1) return `${this.a}/${this.b}`
    return this.a.toString()
  }

  add(other: Fraction | number): Fraction {
    if (typeof other == 'number') return this.add(new Fraction(other))
    let a = this.a, b = this.b, c = other.a, d = other.b
    return new Fraction(a*d+b*c, b*d)
  }

  sub(other: Fraction | number): Fraction {
    if (typeof other == 'number') return this.sub(new Fraction(other))
    let a = this.a, b = this.b, c = other.a, d = other.b
    return new Fraction(a*d-b*c, b*d)
  }

  mul(other: Fraction | number): Fraction {
    if (typeof other == 'number') return this.mul(new Fraction(other))
    let a = this.a, b = this.b, c = other.a, d = other.b
    return new Fraction(a*c, b*d)
  }

  div(other: Fraction | number): Fraction {
    if (typeof other == 'number') return this.div(new Fraction(other))
    let a = this.a, b = this.b, c = other.a, d = other.b
    return new Fraction(a*d, b*c)
  }

  pow(other: number): Fraction | number {
    let a = this.a, b = this.b
    if (!isFloat(other) && other > 0) return new Fraction(a**other, b**other)
    else throw new FractionError('Only positive integer is allowed')
  }
}

export { Fraction }