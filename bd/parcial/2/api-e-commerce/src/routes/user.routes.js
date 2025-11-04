
import express from "express"
import { getAllUsers, createUser,getProfile,getUserById,updateUser,deleteUser } from "../controllers/user.controlle.js"
import { isAdmin, isUser, validateToken } from "../middlewares/auth.middleware.js"

export const userRoutes = express.Router()

//usuario
userRoutes.get("/profile", validateToken,isUser, getProfile)

//admin
userRoutes.post("/",validateToken,isAdmin, createUser )
userRoutes.get("/", validateToken,isAdmin, getAllUsers )
userRoutes.get("/:id", validateToken,isAdmin, getUserById )
userRoutes.put("/:id", validateToken,isUser, updateUser)
userRoutes.delete("/:id", validateToken,isAdmin, deleteUser)




