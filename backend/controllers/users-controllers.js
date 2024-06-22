const HttpError = require("../models/http-error");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../users.json");
// Helper function to read users from file
const readUsersFromFile = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Helper function to write users to file
const writeUsersToFile = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
};

const getUsers = (req, res, next) => {
  const users = readUsersFromFile();
  res.json({ mesaage: users });
};

const signup = (req, res, next) => {
  const { id, name, email, password } = req.body;
  const newUser = {
    id,
    name,
    email,
    password,
  };
  const users = readUsersFromFile();

  if (users.find((u) => newUser.email === email)) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }
  users.push(newUser);
  writeUsersToFile(users);
  res.status(201).json({ users });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const users = readUsersFromFile();
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new HttpError("This email does not exist in our system", 401);
  }

  if (user.password !== password) {
    throw new HttpError("Wrong password", 401);
  }

  res.json({ message: `Welcome back ${user.name}` });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
