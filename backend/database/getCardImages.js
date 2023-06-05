const axios = require("axios");
const fs = require("fs");

const getCardImages = async () => {
  await axios
    .get("https://db.ygoprodeck.com/api/v7/cardinfo.php")
    .then((response) => {
      const data = response.data.data;

      data.forEach((card) => {

      card.card_images.forEach((image, index) => {
        const imageUrl = image.image_url;
        const imageName = card.id + "_" + index + ".jpg";
        axios
          .get(imageUrl, { responseType: "stream" })
          .then((response) => {
            response.data.pipe(
              fs.createWriteStream("database/card-images/" + imageName)
            );
          })
          .catch((error) => console.error(error));
      });
        const imageUrl = card.card_images[0].image_url;
        const imageName = card.id + ".jpg";
      });
    })
    .catch((error) => console.error(error));
};
fs.mkdirSync("database/card-images");
getCardImages();
