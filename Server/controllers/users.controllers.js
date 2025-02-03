const db = require("../database/index");
const Users = db.User;
const nodemailer = require("nodemailer");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


// Helper function to generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      firstname: user.firstname,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET, // Store secret in .env file
    { expiresIn: "15m" } // 15 minutes expiration time for access token
  );
};

// Helper function to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET, // Store secret in .env file
    { expiresIn: "7d" } // 7 days expiration time for refresh token
  );
};


const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465, // Secure SSL connection
  secure: true, // Set to true for port 465
  auth: {
    user: "drongasadok@yahoo.fr", // Your Yahoo email
    pass: "qqogqaxlnekqghku", // Use the generated App Password
  },
});

// Function to send an email
const sendMail = async (subject,title) => {
  try {
    const info = await transporter.sendMail({
      from: 'drongasadok@yahoo.fr',
      to: "drongasadok@yahoo.fr",
      subject: subject,
      html:title,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await Users.findAll();
      res.send({ message: "success to get all users", data: users });
    } catch (err) {
      console.error({ messageError: "unable to get all users", error: err });
    }
  },

  getOneUser: async (req, res) => {
    try {
      const user = await Users.findByPk(req.params.userId);
      res.send({ message: "success to get one user", data: user });
    } catch (err) {
      console.error({ messageError: "unable to get one user", error: err });
    }
  },

  addOneUser: async (req, res) => {
    try {
      const user = await Users.create(req.body);
      res.send({ message: "success to add one user", data: user });
    } catch (err) {
      console.error({ messageError: "unable to add one user", error: err });
    }
  },

  deleteOneUser: async (req, res) => {
    try {
      await Users.destroy({ where: { id: req.params.userId } });
      res.send({ message: "success to delete one user" });
    } catch (err) {
      console.error({ messageError: "unable to delete one user", error: err });
    }
  },

  updateOneUser: async (req, res) => {
    try {
      await Users.update(req.body, { where: { id: req.params.userId } });
      res.send({ message: "success to update one user" });
    } catch (err) {
      console.error({ messageError: "unable to update one user", error: err });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await Users.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate access token and refresh token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
  
      // Send the refresh token in the response body (to be stored in localStorage on the frontend)
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          firstname: user.firstname,
          email: user.email,
          role: user.role,
        },
        accessToken, // Send the access token to the frontend
        refreshToken, // Send the refresh token in the response body
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  },
  

  signup: async (req, res) => {
    try {
      const { email, firstname, password, role } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      if (!email || !password || !firstname) {
        return res.status(400).send("Missing required fields");
      }

      const getuser = await db.User.findOne({
        where: { email: email },
      });

      if (getuser) {
        return res.status(400).send("User already exists");
      } else {
        const user = await db.User.create({
          email: email,
          firstname: firstname,
          password: hashedPassword,
          role: role || "admin",
        });

        res.send(user);
      }
    } catch (err) {
      console.log(err);
    }
  },


  // Refresh token route
  refreshToken: async (req, res) => {
    const { refreshToken } = req.body; // Get refresh token from request body

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token not found, please log in again" });
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Find the user associated with the refresh token
      const user = await Users.findByPk(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a new access token
      const accessToken = generateAccessToken(user);

      return res.json({ accessToken });
    } catch (error) {
      console.error("Refresh token error:", error);
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }
  },


   authenticateToken :(req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
  
      // Attach the user to the request for further use
      req.user = user;
      next(); // Proceed to the next handler if token is valid
    });
  }, 

   verifyToken: (req, res) => {
    // If the request reached this point, the token is valid
    return res.json({ message: 'Token is valid' });
  },


  
   forgotPassword : async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find the user by email
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Generate a reset token
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpires = Date.now() + 3600000; // 1 hour
  
      // Save the token and expiration time in the database
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetTokenExpires;
      await user.save();
  
      const resetUrl = `<a href="http://localhost:5173/seller/reset-password?token=${resetToken}"> here </a>`;
      sendMail('Forget Password',"Click this link to reset your password :" + resetUrl)
  
      res.status(200).json({ message: "Password reset link sent to your email." });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      res.status(500).json({ error: "Internal server error forgot password" });
    }
  },
   verifyResetToken :async (req, res) => {
    try {
      const { token } = req.query;
  
      // Find the user by the reset token
      const user = await db.User.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { [db.Sequelize.Op.gt]: Date.now() }, // Check if the token is not expired
        },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }
  
      // Redirect to the frontend reset password page with the token
      res.redirect(`http://yourfrontend.com/reset-password?token=${token}`);
    } catch (error) {
      console.error("Error in verifyResetToken:", error);
      res.status(500).json({ error: "Internal server error verify token" });
    }
  },

   resetPassword : async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      
      // Find the user by the reset token
      const user = await Users.findOne({
        where: {
          resetPasswordToken: token,
        
        },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }
  
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      // Update the password and clear the reset token
      user.password = newPasswordHash; // Ensure the password is hashed before saving
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
  
      res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
      console.error("Error in resetPassword:", error);
      res.status(500).json({ error: "Internal server error reset" });
    }
  },

  

};
