import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = "Jokowi";

const GetUser = async (req, res) => {
  try {
    const user = await User.findAll();
    return res.status(200).send({
      status: 200,
      message: "Data",
      data: user,
    });
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      errors: error,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { Username, Password } = req.body;

    const user = await User.findOne({
      where: {
        Username: Username,
      },
    });

    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "User not found",
        errors: {},
      });
    }

    const match = await bcrypt.compare(Password, user.Password);

    if (!match) {
      return res.status(401).send({
        status: 401,
        message: "Incorect Password",
        errors: {},
      });
    }

    const token = jwt.sign(
      { userId: user.id, Username: user.Username },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).send({
      status: 200,
      message: "Login Succesful",
      data: { token },
    });
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      errors: error,
    });
  }
};

const Register = async (req, res) => {
  try {
    const { Email, Username, Password, Role } = req.body;

    const NameExist = await User.findOne({
      where: {
        Username: Username,
      },
    });

    if (NameExist) {
      return res.status(409).send({
        status: 409,
        message: "Username already exist",
        errors: {},
      });
    }

    const EmailExist = await User.findOne({
      where: {
        Email: Email,
      },
    });

    if (EmailExist) {
      return res.status(409).send({
        status: 409,
        message: "Email already exist",
        errors: {},
      });
    }

    const hashPassword = await bcrypt.hash(Password, 10);

    const create = await User.create({
      Email,
      Username,
      Password: hashPassword,
      Role,
    });

    return res.status(201).send({
      status: 201,
      message: "Created New User",
      data: create,
    });
  } catch (error) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        erorrs: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      errors: error,
    });
  }
};

export default {
  GetUser,
  Register,
  Login,
};
