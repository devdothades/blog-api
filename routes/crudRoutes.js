import { Router } from "express";
import {
    getAllArticle,
    getSingleArticle,
    createArticle,
    deleteArticle,
    updateArticle,
} from "../controller/blogController.js";
import errorHandler from "../middleware/errorHandler.js";

const router = Router();

router.use(errorHandler);
router.get("/", getAllArticle);
router.get("/:id", getSingleArticle);
router.post("/", createArticle);
router.delete("/:id", deleteArticle);
router.patch("/:id", updateArticle);

export default router;
