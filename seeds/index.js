const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));
async function main() {
    await mongoose
        .connect("mongodb://127.0.0.1:27017/yelp-camp")
        .then(() => {
            console.log("Mongo connection open");
        })
        .catch((err) => {
            console.log("Oh no Mongo error!!!");
            console.log(err);
        });
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "64bceb7257ebffdff7dd421d",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dbgwshotc/image/upload/v1690180123/Yelpcamp/mcw7pbdojqttjebjey8o.jpg",
                    filename: "Yelpcamp/mcw7pbdojqttjebjey8o",
                },
                {
                    url: "https://res.cloudinary.com/dbgwshotc/image/upload/v1690180125/Yelpcamp/rrisfvrdptqwciuk1x5t.webp",
                    filename: "Yelpcamp/rrisfvrdptqwciuk1x5t",
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
