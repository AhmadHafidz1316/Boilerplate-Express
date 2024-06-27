import express from "express"
import BarangController from "../controllers/BarangController.js"
import UserController from "../controllers/UserController.js"
import Authenticate from "../middleware/AuthMiddleware.js"

const router = express.Router()

// Barang
router.get("/barang", Authenticate ,BarangController.GetBarang)
router.post("/barang", Authenticate ,BarangController.CreateBarang)
router.put("/barang/:barang_id", Authenticate ,BarangController.UpdateBarang)
router.delete("/barang/:barang_id", Authenticate ,BarangController.DeleteBarang)
router.get("/barang/:barang_id", Authenticate ,BarangController.GetBarangById)

// User 
router.get("/users", Authenticate,UserController.GetUser)
router.post("/login", UserController.Login)
router.post("/register", UserController.Register)


export default router;