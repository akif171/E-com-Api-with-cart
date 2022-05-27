const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
   try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User Not Found" });
    }
    const isPsswordCorrect = await user.comparePassword(password);

    if (!isPsswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "email or password is wrong" });
    }
 
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
