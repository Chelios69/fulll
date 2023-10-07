const fs = require("fs");

const jsonPath = "./full/full2.json"

try {
  // Wczytaj zawartość pliku JSON
  const jsonData = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(jsonData);

  if (data.offers && data.offers.o) {
    const offers = data.offers.o;
    if (Array.isArray(offers)) {
      // Przetwarzaj oferty
      offers.forEach((offer) => {
        if (offer.$ && offer.$.price) {
          const price = parseFloat(offer.$.price);
          if (!isNaN(price)) {
            offer.$.isPriceGreaterThanTen = price > 10;
          }
        }
      });
    } else if (offers.$ && offers.$.price) {
      // Przetwarzaj pojedynczą ofertę
      const price = parseFloat(offers.$.price);
      if (!isNaN(price)) {
        offers.$.isPriceGreaterThanTen = price > 10;
      }
    }

    // Zapisz zmodyfikowane dane z powrotem do pliku JSON
    const newData = JSON.stringify(data, null, 2);
    fs.writeFileSync(jsonPath, newData);
    console.log('Poprawnie zapisano nowe dane');
  } else {
    console.error('Nieprawidłowa struktura pliku JSON.');
  }
} catch (error) {
  console.error('Wystąpił błąd:', error.message);
}
