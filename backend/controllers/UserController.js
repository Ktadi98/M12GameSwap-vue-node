import { validateLogin, validateUser } from '../schemas/users.js'
import "dotenv/config";

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

  deactivate = async (req, res) => {
    const logInStatus = await this.userModel.deactivate(req.user_id);

    if (logInStatus === 1) {
      return res.status(200).json("User deactivated successfully!");
    }

    return res.status(500).json({ error: "User could not be deactivated!" })
  }

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


    return res.json({ email: user.user_email, name: user.user_name, photo: user.user_photo });

  };

  getUserStats = async (req, res) => {
    const userId = Number(req.params.userId);

    const userStats = await this.userModel.getUserStats(userId);
    //console.log(userStats);

    return res.json({ ...userStats });
  };

  getUserStatsAuth = async (req, res) => {
    const userId = req.user_id;

    const userStats = await this.userModel.getUserStats(userId);
    //console.log(userStats);

    return res.json({ ...userStats });
  };


  sendData = async (req, res) => {

    const userEmail = await req.user_email;
    const userId = req.user_id;

    if (userEmail) {
      if (
        userEmail.length === 0 ||
        !userEmail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
        userEmail > 150
      ) {
        return res.status(422).json({ error: "Invalid email" });
      }
    }

    if (req.body.username) {
      if (req.body.username.length < 3 || req.body.username > 20) {
        return res.status(422).json({ error: "Invalid username" });
      }
    }

    const returnStatus = await this.userModel.sendData(req.body, userId);

    if (returnStatus === 1) {
      return res.json({ message: "User updated successfully" });

    }

    return res.status(500).json({ error: "Error updating user" })

  };

  sendPhoto = async (req, res) => {

    console.log(req.file);
    const returnState = await this.userModel.sendPhoto(req.user_id, req.file);

    if (returnState === 1) {
      console.log("Profile Image updated successfully!");
      return res.json({ message: "Image updated succesfully" });
    }

    return res.status(500).json({ error: "Image could not be updated!" })
  };

  getUserImage = async (req, res) => {

    const status = await this.userModel.getUserImage(req.file);

    if (status === 1) {
      console.log("Éxito!!")
      return res.json({ file: `${process.env.PHOTOS_URL}/${req.file.originalname}` });
    }
    return res.status(500).json({ error: "Images could not be retrieved" });
  };

  addFavorite = async (req, res) => {
    const userId = req.user_id;
    const postId = req.body.post_id;

    const returnState = await this.userModel.addFavorite(userId, postId);

    if (returnState === 1) {
      return res.json({ "message": "Product added to favorites successfully!" });

    }
    return res.status(500).json({ error: "Product already in favorites list" })

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

  ///CREAR EL uploadPhoto



}
