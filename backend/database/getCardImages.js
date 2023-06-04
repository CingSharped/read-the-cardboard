const axios = require('axios')
const fs = require('fs')

const getCardImages = async () => {
await axios
  .get("https://db.ygoprodeck.com/api/v7/cardinfo.php")
  .then((response) => {
    const data = response.data.data;
    console.log(data)
    // Store the data in your own API

    // Download all the card images
    data.forEach((card) => {
      const imageUrl = card.card_images[0].image_url;
      const imageName = card.id + ".jpg";
      axios
        .get(imageUrl, { responseType: "stream" })
        .then((response) => {
          response.data.pipe(fs.createWriteStream("/backend/database/card-images" + imageName));
        })
        .catch((error) => console.error(error.message));
    });
  })
  .catch((error) => console.error(error));
}
getCardImages()