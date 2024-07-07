import pool from "../model/pool.js";

const getAllArticle = async (req, res) => {
    try {
        const query = await pool.query("SELECT * FROM BlogArticle");
        res.status(200).json(query.rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getSingleArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const query = await pool.query(
            "SELECT * FROM BlogArticle WHERE id=$1",
            [id]
        );
        res.status(200).json(query.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createArticle = async (req, res) => {
    const {
        title,
        introduction,
        body,
        images,
        links,
        conclusion,
        author_bio,
        comments,
        tags,
    } = req.body;

    try {
        const query = await pool.query(
            "INSERT INTO BlogArticle (title, introduction, body, images, links, conclusion, author_bio, comments, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [
                title,
                introduction,
                body,
                images,
                links,
                conclusion,
                author_bio,
                comments,
                tags,
            ]
        );

        res.status(200).json(query.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteArticle = async (req, res) => {};

const updateArticle = async (req, res) => {};

export {
    getAllArticle,
    getSingleArticle,
    createArticle,
    deleteArticle,
    updateArticle,
};
