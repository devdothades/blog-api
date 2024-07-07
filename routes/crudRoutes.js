import { Router } from "express";
import {
    getAllArticle,
    getSingleArticle,
    createArticle,
    deleteArticle,
    updateArticle,
} from "../controller/blogController.js";

const router = Router();

router.get("/", getAllArticle);
router.get("/:id", getSingleArticle);
router.post("/", createArticle);
router.delete("/:id", deleteArticle);
router.patch("/:id", updateArticle);

export default router;
