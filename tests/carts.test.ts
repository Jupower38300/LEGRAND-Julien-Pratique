import { Carts } from "../src/carts";

describe("Ajout de produits dans le panier", () => {
  let cart: Carts;

  beforeEach(() => {
    cart = new Carts();
  });

  it("test_getTotal_AddingProductsInCart_ShouldReturnTotal", () => {
    cart.addProduct("Bonbon", 3);
    cart.addProduct("Sucette", 2);
    expect(cart.getTotal()).toBe(5);
  });

  it("test_removeProduct_RemovingAProduct_ShouldLowerTheTotal", () => {
    cart.addProduct("Bonbon", 3);
    cart.addProduct("Sucette", 2);
    cart.removeProduct("Sucette");
    expect(cart.getTotal()).toBe(3);
  });

  it("test_removeProduct_RemovingSomethingThatDoesntExist_ShouldNotThrowError", () => {
    cart.addProduct("Bonbon", 3);
    expect(() => cart.removeProduct("Sucette")).not.toThrow();
  });
});
