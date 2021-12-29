const HttpError = require("../Models/http-error");
const { v4: uuidv4 } = require("uuid");
const userSchema = require("../Models/userSchema");

let userData = [
  {
    id: "u1",
    name: "Saud ul Hassan",
    email: "saudchaudhary0@gmail.com",
    phone: "+92 302 2321 605",
    password: "Saud.1234",
  },
];

const getAllUser = (req, res, next) => {
  const result = userData;

  if (!result || result.length === 0) {
    return next(new HttpError("No user Found", 404));
  }
  res.json({ result });
};

const getUserById = (req, res, next) => {
  //const { uid } = req.body;
  const uid = req.params.uid;
  let result;

  result = userData.find((user) => {
    return user.id === uid;
  });

  if (!result) {
    return next(new HttpError("No User Found", 404));
  }

  res.json(result);
};

const addUser = async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  let exsitingUser;
  try {
    exsitingUser = await userSchema.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Sign up Failed Please try again later", 500); // for Sync function
    return next(error);
  }

  if (exsitingUser) {
    const error = new HttpError("Email Already exist", 422); // for Sync function
    return next(error);
  }

  res.status(201).json({ user: newUser });
};

exports.getAllUser = getAllUser;
exports.getUserById = getUserById;
exports.addUser = addUser;
