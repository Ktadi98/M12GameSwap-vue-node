import { validateUser } from '../schemas/movies.js'

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    res.json("All users");
  };

  register = async (req, res) => {
    const { nickname, email, password } = req.body;

  }
}
