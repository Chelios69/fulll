const fs = require("fs");
const { parseString } = require("xml2js");
const { Readable } = require("stream");

const xmlPath = "./full.xml"; 
const jsonPath = "./full/full2.json"; 

function createXmlObjectStream() {
  const xmlStream = new Readable({ objectMode: true });

  try {
    const xmlData = fs.readFileSync(xmlPath);
    parseString(xmlData, (err, result) => {
      if (err) {
        xmlStream.emit("error", err);
      } else {
        if (result && result.offers && result.offers.o) {
          const products = result.offers.o;
          if (Array.isArray(products)) {
            products.forEach((product) => {
              if (product.$ && product.$.price) {
                const price = parseFloat(product.$.price);
                if (!isNaN(price)) {
                  product.$.isPriceGreaterThanTen = price > 10;
                }
              }
            });
          } else if (products.$ && products.$.price) {
            const price = parseFloat(products.$.price);
            if (!isNaN(price)) {
              products.$.isPriceGreaterThanTen = price > 10;
            }
          }
        } else {
          xmlStream.emit(
            "error",
            new Error("Nieprawidłowa struktura pliku XML.")
          );
        }

        // Zapisz dane do pliku JSON
        fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), "utf8");

        xmlStream.push(null);
      }
    });
  } catch (err) {
    xmlStream.emit("error", err);
  }

  return xmlStream;
}

const objectStream = createXmlObjectStream();

objectStream.on("data", (object) => {
  console.log("Nowy obiekt XML:", object);
});

objectStream.on("end", () => {
  console.log("Strumień zakończony.");
});

objectStream.on("error", (err) => {
  console.error("Błąd strumienia:", err);
});
