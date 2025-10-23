import { InvalidPriceError } from "./exceptions";

export class Carts {
  products: { name: string; price: number }[] = [];

  discount: number = 0;

  addProduct(name: string, price: number): void {
    if (price <= 0) {
      throw new InvalidPriceError("Le prix est invalide");
    }
    this.products.push({ name, price });
  }

  getTotal(): number {
    const total = this.products.reduce((acc, prod) => acc + prod.price, 0);
    return +(total * (1 - this.discount / 100)).toFixed(2);
  }

  removeProduct(name: string): void {
    this.products = this.products.filter((product) => product.name !== name);
  }

  applyDiscount(pourcent: number): void {
    this.discount = pourcent;
  }
}
