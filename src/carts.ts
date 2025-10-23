export class Carts {
  products: { name: string; price: number }[] = [];

  addProduct(name: string, price: number): void {
    this.products.push({ name, price });
  }

  getTotal(): number {
    return this.products.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0,
    );
  }
}
