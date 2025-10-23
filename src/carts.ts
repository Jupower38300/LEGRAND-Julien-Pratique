import { InvalidPriceError } from "./exceptions";
import * as fs from "fs";

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

  saveToFile(filepath: string): void {
    const timestamp = new Date().toISOString();
    const archiveDir = "archives";
    if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir);
    const archivePath = `${archiveDir}/panier_${timestamp}.json`;
    fs.writeFileSync(filepath, JSON.stringify(this.products, null, 2), "utf-8");
  }

  loadFromFile(filepath: string): void {
    const data = fs.readFileSync(filepath, "utf-8");
    this.products = JSON.parse(data);
  }
}
