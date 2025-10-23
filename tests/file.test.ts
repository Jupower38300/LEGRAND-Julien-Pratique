import { Carts } from "../src/carts";
import * as fs from "fs";

jest.mock("fs", () => ({
  writeFileSync: jest.fn(),
  readFileSync: jest.fn(),
  mkdirSync: jest.fn(),
  existsSync: jest.fn().mockReturnValue(false),
}));

describe("Panier - Sauvegarde et chargement", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("test_WriteAndReadFileSync_SavingAndLoadingFromFile_ShouldHaveTheLoadedFile", () => {
    const cart = new Carts();
    cart.addProduct("Bonbon", 3);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([{ name: "Bonbon", price: 3 }]),
    );

    cart.saveToFile("panier.json");

    const newCart = new Carts();
    newCart.loadFromFile("panier.json");

    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(newCart.getTotal()).toBe(3);
  });

  it("test_saveToFile_CreatingANewSave_ShouldAddATimeStamp", () => {
    const cart = new Carts();
    cart.addProduct("Bonbon", 3);

    cart.saveToFile("panier.json");

    expect(fs.mkdirSync).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it("test_saveToFile_DirectoryExists_ShouldNotCallMkdir", () => {
    const cart = new Carts();
    cart.addProduct("Bonbon", 3);

    (fs.existsSync as jest.Mock).mockReturnValue(true);

    cart.saveToFile("panier.json");

    expect(fs.mkdirSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
