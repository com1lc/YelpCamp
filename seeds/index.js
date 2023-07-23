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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "64bba5055700690dc1634a9f",
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias magni sapiente, repellat harum voluptates distinctio perferendis nostrum quaerat incidunt, placeat earum fugit ratione, sequi non. Ut, nostrum? Porro, a quis.",
            price,
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
