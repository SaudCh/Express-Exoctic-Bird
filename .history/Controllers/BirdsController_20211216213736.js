const HttpError = require("../Model/http-error");
const { v4: uuidv4 } = require("uuid");

let birdsData = [
  {
    id: "p1",
    name: "austorloop-2-pairs-for-sale",
    location: "Faisalabad",
    price: 4500,
    img: "https://exoticbirds.pk/storage/files/pk/1884/thumb-816x460-e3508c588dfd16bf3cc14003d3fcb446.jpeg",
    category: "Hens",
    user: "u1",
  },
  {
    id: "p2",
    name: "austorloop-2-pairs-for-sale",
    location: "Lahore",
    price: 3000,
    img: "https://exoticbirds.pk/storage/files/pk/1884/thumb-816x460-e3508c588dfd16bf3cc14003d3fcb446.jpeg",
    category: "Hens",
    user: "u1",
  },
];

const getBirdById = (req, res, next) => {
  const birdId = req.params.bid;
  const bird = birdsData.find((p) => {
    return p.id === birdId;
  });
  if (!bird) {
    throw new HttpError("Could not find a Bird for that id", 404); // for Sync function
  }
  res.json({ bird });
};

const getBirdByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const bird = birdsData.filter((p) => {
    return p.user === userId;
  });

  if (!bird || bird.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user", 404)
    );
  }

  res.json({ bird });
};

const addBird = (req, res, next) => {
  //console.log("Post Request");
  const { name, location, price, img, category, user } = req.body;

  const newBird = {
    id: uuidv4(),
    name: name,
    location: location,
    price: price,
    img: img,
    category: category,
    user: user,
  };

  birdsData.push(newBird);

  res.status(201).json({ bird: newBird });
};

const updateBird = (req, res, next) => {
  const { name, price } = req.body;
  const birdId = req.params.bid;

  const updatedBird = { ...birdsData.find((p) => p.id === birdId) };
  const birdIndex = birdsData.findIndex((b) => b.id === birdId);
  updatedBird.name = name;
  updatedBird.price = price;

  birdsData[birdIndex] = updatedBird;

  res.status(200).json({ bird: updatedBird });
};
const deleteBird = (req, res, next) => {
  const birdId = req.params.bid;
  birdsData = birdsData.filter((p) => p.id !== birdId);

  res.status(200).json({ message: "Bird Deleted" });
};

exports.getBirdById = getBirdById;
exports.getBirdByUserId = getBirdByUserId;
exports.addBird = addBird;
exports.updateBird = updateBird;
exports.deleteBird = deleteBird;
