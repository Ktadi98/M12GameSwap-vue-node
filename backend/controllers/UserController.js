import { validateLogin, validateUser } from '../schemas/users.js'

export class UserController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    res.json("All users");
  };

  register = async (req, res) => {

    //Apply validation schema to the data received
    const userValidated = validateUser(req.body);

    if (!userValidated.success) {
      return res.status(422).json({ error: JSON.parse(userValidated.error.message) })
    }

    //Pass validated data to model to create user
    if (await this.userModel.register(req.body) === 1) {
      return res.json("User registered successfully!");
    }

    return res.status(500).json({ error: "User could not be registered!" })

  };

  login = async (req, res) => {
    //Apply validation schema to the data received
    const userValidated = validateLogin(req.body);

    if (!userValidated.success) {
      return res.status(422).json({ error: JSON.parse(userValidated.error.message) })
    }

    //Pass validated data to authenticate user.
    if (await this.userModel.login(req.body) === 1) {
      return res.status(200).json("User logged in successfully!");
    }

    return res.status(500).json({ error: "User could not log in!" })

  };
}