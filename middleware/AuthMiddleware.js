import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded?.user?.id;
      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      console.error("Protect Error", error);
      res.status(401).json({ message: "Token validation Failed" });
    }
  } else {
    res.status(401).json({ message: "No Token Provided" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not Authorized As A Admin" });
  }
};

export { protect, admin };
