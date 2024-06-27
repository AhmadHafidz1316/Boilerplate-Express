import jwt from "jsonwebtoken";
const secretKey = "Jokowi"

const Authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send({
      status: 401,
      message: "Token Tidak Ada",
    });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send({
        status: 403,
        message: "Invalid Token",
        errors: {},
      });
    }

    req.user = user
    next()
  });
};

export default Authenticate
