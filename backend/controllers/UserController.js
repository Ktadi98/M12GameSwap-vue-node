import { validateLogin, validateUser } from '../schemas/users.js'

export class UserController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    res.json("All users");
  };

  getByType = async (req, res) => {
    try {
      const results = await this.userModel.findByType(req.params.type);

      res.json(results)
    } catch (_) {
      res.status(400).json({})
    }

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

  activate = async (req, res) => {
    const status = await this.userModel.activate(req.body);
    if (status === 1) {
      return res.status(200).json("User activated successfully!");
    }

    return res.status(500).json({ error: "User could not be activated!" })
  }


  getData = async (req, res) => {

    const userEmail = await req.user_email;
    const userId = req.user_id;

    const user = await this.userModel.getData(userId);

    return res.json({ email: user.user_email, name: user.user_name });

  };

  getUserStats = async (req, res) => {
    const userId = Number(req.params.userId);

    const userStats = await this.userModel.getUserStats(userId);
    console.log(userStats);

    return res.json({ ...userStats });
  };

  getUserStatsAuth = async (req, res) => {
    const userId = req.user_id;

    const userStats = await this.userModel.getUserStats(userId);
    console.log(userStats);

    return res.json({ ...userStats });
  };


  sendData = async (req, res) => {

    const userEmail = await req.user_email;
    const userId = req.user_id;

    const returnStatus = await this.userModel.sendData(req.body, userId);

    if (returnStatus === 1) {
      return res.json({message:"user updated successfully" });

    }

    return res.status(500).json({error: "error updating user"})

  };

  getFavorites = async (req, res) => {
    const userId = req.user_id;

    const userFavorites = await this.userModel.getFavorites(userId);

    return res.json(userFavorites);

  };

  toggleFavorite = async (req, res) => {
    const userId = req.user_id;
    const postId = req.body.post_id;

    const userFavorites = await this.userModel.toggleFavorite(userId, postId);

    return res.json(userFavorites);

  }

  getRanking = async (req, res) => {

    const topVendors = await this.userModel.getRanking();

    return res.json({ topVendors: topVendors });
  };

}
