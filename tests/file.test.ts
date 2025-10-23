import { Carts } from "../src/carts";
import * as fs from "fs";

jest.mock("fs");

describe("Panier - Sauvegarde et chargement", () => {
  it("test_WriteAndReadFileSync_SavingAndLoadingFromFile_ShouldHaveTheLoadedFile", () => {
    const cart = new Carts();
    cart.addProduct("Bonbon", 3);

    const writeFileSync = jest.spyOn(fs, "writeFileSync");
    const readFileSync = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValue(JSON.stringify([{ name: "Bonbon", price: 3 }]));

    cart.saveToFile("panier.json");

    const newCart = new Carts();
    newCart.loadFromFile("panier.json");

    expect(writeFileSync).toHaveBeenCalled();
    expect(newCart.getTotal()).toBe(3);
  });
});
