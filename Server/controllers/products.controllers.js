const db = require("../database/index");
const Product = db.Product;
const FLOUCI_API_KEY = process.env.FLOUCI_API_KEY;
const FLOUCI_API_SECRET = process.env.FLOUCI_API_SECRET;
const axios = require('axios');



module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.findAll();
      res
        .status(200)
        .send({ message: "success to get all Product", data: products });
    } catch (err) {
      console.error({ messageError: "unable to get all Product", error: err });
    }
  },
  getAllProductSeller: async (req, res) => {
    try {
      const {id}=req.params
      const products = await Product.findAll({where: { userId: id}});
      res
        .status(200)
        .send({ message: "success to get all Product", data: products });
    } catch (err) {
      console.error({ messageError: "unable to get all Product", error: err });
    }
  },
  getOneProduct: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.productId);
      res.send({ message: "success to get one Product", data: product });
    } catch (err) {
      console.error({ messageError: "unable to get one Product", error: err });
    }
  },
  addOneProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.send({ message: "success to add one Product", data: product });
    } catch (err) {
       
      console.error({ messageError: "unable to add one Product", error: err });
    }
  },
  deleteOneProduct: async (req, res) => {
    try {
      await Product.destroy({ where: { id: req.params.productId } });
      res.send({ message: "success to delete one Product" });
    } catch (err) {
      console.error({
        messageError: "unable to delete one Product",
        error: err,
      });
    }
  },
  updateOneProduct: async (req, res) => {
    try {
      await Product.update(req.body, { where: { id: req.params.productId } });
      res.send({ message: "success to update one Product" });
    } catch (err) {
      console.error({
        messageError: "unable to update one Product",
        error: err,
      });
    }
  },
  paywithflouci: async (req, res) => {
     


    console.log("api secreet", FLOUCI_API_KEY)
      try {
        console.log("api secreet", FLOUCI_API_KEY)
        console.log("api secreet", FLOUCI_API_SECRET)


          const { amount, currency, customer_email } = req.body;
          const payload = {
            app_token: FLOUCI_API_KEY, // Replace with your app token
            app_secret: FLOUCI_API_SECRET, // Replace with your app secret
            accept_card:true,
            amount:5000,
            success_link: "https://example.website.com/success",
            fail_link: "https://example.website.com/fail",
            session_timeout_secs: 1200,
            developer_tracking_id: "iojsdfoidsfjo"
          };
          
         
  
          const response = await axios.post(
              'https://developers.flouci.com/api/generate_payment',
              payload,
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer "${FLOUCI_API_KEY}":${FLOUCI_API_SECRET}`,
                  },
              }
          );
  
          res.json(response.data);
      } catch (error) {
          console.error('Error creating payment session:', error);
          res.status(500).json({ error: 'Failed to create payment session' });
      }
  },
};
