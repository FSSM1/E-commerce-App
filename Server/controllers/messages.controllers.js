const db = require("../database/index");
const Message = db.Message;

module.exports = {
  addOneMessage: async (req, res) => {
    try {
      const { name, email, message } = req.body;

      // Validate input
      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Create the message in the database
      const newMessage = await Message.create({ name, email, message });

      res.status(201).json({
        message: "Message sent successfully!",
        data: newMessage,
      });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Failed to send message." });
    }
  },
};
