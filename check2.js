const fs = require("fs");

try {
  // Wczytaj zawartość pliku JSON
  const jsonData = fs.readFileSync("./full/full2.json", "utf8");
  const data = JSON.parse(jsonData);

  if (typeof data !== "object") {
    throw new Error(
      "Plik JSON nie zawiera pojedynczego obiektu lub jest uszkodzony."
    );
  }

  // Sprawdź, czy pole "price" istnieje i jest typu string
  if (data && typeof data.price === "string") {
    const price = number(data.price);
    if (!isNaN(price)) {
      data.priceBiggerThan10 = price > 10;
    }
  }

  // Zapisz zmodyfikowane dane z powrotem do pliku JSON
  const newData = JSON.stringify(data, null, 2);
  fs.writeFileSync("./full/newfull.json", newData);
  console.log('Poprawnie zaktualizowano plik "newfull.json".');
} catch (error) {
  console.error("Wystąpił błąd:", error.message);
}
