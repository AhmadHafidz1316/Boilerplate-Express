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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });


app.use(upload.single('Gambar')); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(router);

app.get("/", (req,res) => {
    res.send("Hai")
})

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
