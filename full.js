///utworz na podstawie tego pliku nowy plik z tymi danymi z dodana labelka np isPriceGreaterThanTen true/false


const fs = require("fs");
const { parseString } = require("xml2js");
const { Readable } = require("stream");

const xmlPath = "./full.xml"; // Ścieżka do pliku XML
const jsonPath = "./full/full2.json"; // Ścieżka do pliku JSON

function createXmlObjectStream() {
  const xmlStream = new Readable({ objectMode: true });

  try {
    const xmlData = fs.readFileSync(xmlPath);
    parseString(xmlData, (err, result) => {
      if (err) {
        xmlStream.emit("error", err);
      } else {
        if (result) {
          // Przetwarzaj wszystkie elementy na najwyższym poziomie
          for (key in result) {
            if (Array.isArray(result[key])) {
              result[key].forEach((element) => {
                xmlStream.push(element);
              });
            } else {
              xmlStream.push(result[key]);
            }
            if (key=price)
          }

          // Zapisz dane do pliku JSON
          fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), "utf8");
        } else {
          xmlStream.emit(
            "error",
            new Error("Nieprawidłowa struktura pliku XML.")
          );
        }
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
 
