import { Carts } from "../src/carts";

describe("Ajout de produits dans le panier", () => {
  it("test_getTotal_AddingProductsInCart_ShouldReturnTotal", () => {
    const cart = new Carts();
    cart.addProduct("Bonbon", 3);
    cart.addProduct("Sucette", 2);
    expect(cart.getTotal()).toBe(5);
  });
});
