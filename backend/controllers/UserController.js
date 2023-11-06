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

    const [returnState, token] = await this.userModel.register(req.body);

    //Pass validated data to model to create user
    if (returnState === 1) {
      console.log("User registered successfully");
      console.log("TOKEN: " + token);
      return res.json({ message: "user registered successfully", token: token });
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
    const [logInStatus, token] = await this.userModel.login(req.body);
    // console.log(logInStatus);
    // console.log(userId);

    if (logInStatus === 1) {
      return res.status(200).json({ message: "User logged in successfully!", token: token });
    }

    return res.status(500).json({ error: "User could not log in!" })

  };

  delete = async (req, res) => {
    //Apply validation schema to the data received
    //const userValidated = validateLogin(req.body);

    // if (!userValidated.success) {
    //   return res.status(422).json({ error: JSON.parse(userValidated.error.message) })
    // }

    //Pass validated data to authenticate user.
    const logInStatus = await this.userModel.delete(req.body);
    // console.log(logInStatus);
    // console.log(userId);

    if (logInStatus === 1) {
      return res.status(200).json("User deleted successfully!");
    }

    return res.status(500).json({ error: "User could not be deleted!" })

  };
}
