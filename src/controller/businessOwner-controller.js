import BusinessOwner from "../models/BusinessOwner.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// export const addBusinessOwner = async (req, res) => {
//     try {
//         const businessOwner = new BusinessOwner(req.body);
//         await businessOwner.save();
//         const token = jwt.sign({ _id: businessOwner._id }, process.env.JWT_SECRET_KEY);
//         res.status(201).json({ businessOwner, token });
//     } catch (error) {
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

export const signup = async (req, res, next) => {
  const { name, password } = req.body;

  if (password.length < 8) {
    return res.status(400).json({ message: "Password is less than 8 characters" });
  }

  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new BusinessOwner({ name, password: hashedPassword });
    await user.save();

    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(
      { id: user._id, name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: maxAge }
    );

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ message: "User successfully created", user });
  } catch (err) {
    res.status(400).json({
      message: "User not successfully created",
      error: err.message,
    });
  }
};

export const login = async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  try {
    const existingUser = await BusinessOwner.findOne({ name });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const maxAge = 3 * 60 * 60;

    const token = jwt.sign(
      { id: existingUser._id, name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: maxAge }
    );

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({
      message: "Authentication Complete",
      token,
      id: existingUser._id,
      existingUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};