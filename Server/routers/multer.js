const multer = require("multer");
const path = require("path");
const fs = require("fs");

const multerRouter = require("express").Router();

// Ensure the "uploads/" directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Route to upload an image (POST)
multerRouter.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({ file: { path: `http://localhost:3000/uploads/${req.file.filename}` } });
});

// ✅ Route to update an image (PUT)
multerRouter.put("/:oldImage", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No new image uploaded" });
  }

  const oldImage = req.params.oldImage;
  const newImagePath = `http://localhost:3000/uploads/${req.file.filename}`;

  // Delete old image (if exists)
  const oldImagePath = path.join(__dirname, "..", "uploads", oldImage);
  if (fs.existsSync(oldImagePath)) {
    fs.unlinkSync(oldImagePath); // Delete old file
  }

  res.json({ message: "Image updated successfully", file: { path: newImagePath } });
});

module.exports = multerRouter;
