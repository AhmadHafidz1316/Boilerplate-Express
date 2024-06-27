import express from "express";
import router from "./src/routes/Routes.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Mendapatkan direktori saat ini menggunakan ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup multer untuk menyimpan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file dengan timestamp
  }
});

const upload = multer({ storage });

// Tambahkan multer middleware ke router
app.use(upload.single('Gambar')); // `Gambar` adalah nama field untuk file

// Menyajikan file statis dari direktori uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
