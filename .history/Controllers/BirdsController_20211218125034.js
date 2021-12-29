const { v4: uuidv4 } = require("uuid");
const BirdSchema = require("../Models/birdsSchema");

const HttpError = require("../Models/http-error");

const getBirdById = async (req, res, next) => {
  const birdId = req.params.bid;
  let bird;

  try {
    bird = await BirdSchema.findById(birdId);
  } catch (err) {
    const error = new HttpError("Could not find a Bird for that id", 500); // for Sync function
    return next(error);
  }

  if (!bird) {
    const error = new HttpError("Could not find a Bird for that id", 500); // for Sync function
    return next(error);
  }
  res.json({ bird: bird.toObject({ getters: true }) });
};

const getBirdByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let bird;
  try {
    bird = await BirdSchema.find({ user: userId });
  } catch (err) {
    return next(new HttpError("Fetching Failed", 500));
  }
  if (!bird || bird.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user", 404)
    );
  }

  res.json({ bird });
};

const addBird = async (req, res, next) => {
  //console.log("Post Request");
  const { name, location, price, img, time, category, user } = req.body;

  const newBird = new BirdSchema({
    name,
    location,
    price,
    img,
    time,
    category,
    user,
  });

  try {
    await newBird.save();
  } catch (err) {
    const error = new HttpError("Failed", 500);
    return next(error);
  }

  res.status(201).json({ bird: newBird });
};

const updateBird = async (req, res, next) => {
  const { name, price } = req.body;
  const id = req.params.bid;

  let bird;
  try {
    bird = await BirdSchema.findByIdAndUpdate(id, { name: name, price: price });
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(200).json({ bird: bird });
};

const deleteBird = async (req, res, next) => {
  const birdId = req.params.bid;
  let birdsData;

  try {
    birdsData = await BirdSchema.findByIdAndDelete(birdId);
  } catch (err) {
    const error = new HttpError("Failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Bird Deleted" });
};

exports.getBirdById = getBirdById;
exports.getBirdByUserId = getBirdByUserId;
exports.addBird = addBird;
exports.updateBird = updateBird;
exports.deleteBird = deleteBird;
