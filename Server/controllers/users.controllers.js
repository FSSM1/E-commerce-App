const db = require("../database/index");
const Users = db.User;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 


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


   login : async (req, res) => {
    try {
        const { email, password, role, firstname } = req.body;

        const user = await Users.findOne({ where: { email } });
        console.log("user", user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("password", password)
        console.log("user.password", user.password)
        
        const isMatch = await bcrypt.compare(password,user.password);
        console.log("Password match result:", isMatch);
       

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, firstname: user.firstname, email: user.email, role: user.role },
            "jdjdjjdjjjddjjdjdjjdjdjdjd", // Store secret key in .env
            // Optional expiration time
        );

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                firstname: user.firstname,
                email: user.email,
            },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}, 

signup : async (req ,res) =>{
  try {
      const {
          email, 
          firstname,
          password, 
          role
      } = req.body

      const  hashedPassword = await bcrypt.hash(password,10)  // password 
      
      console.log("hashed Password", hashedPassword); 

      if(!email || !password || !firstname) {
          return res.status(400).send("Missing required fields");   // condition 
      } 

      const getuser = await db.User.findOne({
          where: {
              email: email
          }
      })

      if (getuser) {
        return res.status(400).send('User already exists');
      } else {
          const user = await db.User.create({
              email: email, 
              firstname: firstname, 
              password: hashedPassword, 
              role: role || "admin"
          });

          console.log("USer created: ", user);
          res.send(user); 
      }
  } catch (err) {
    console.log(err)
  }
}



};



