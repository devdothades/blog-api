import pool from "../model/pool.js";
import asyncHandler from "express-async-handler";

const TAGS = [
    "SQL",
    "Python",
    "JavaScript",
    "Java",
    "C#",
    "C++",
    "HTML",
    "CSS",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "TypeScript",
    "R",
    "Go",
    "Rust",
    "MATLAB",
    "Bash",
    "PowerShell",
    "Perl",
    "Scala",
    "Groovy",
    "Dart",
    "Objective-C",
    "Assembly",
    "Visual Basic",
    "Lua",
    "Haskell",
    "Elixir",
    "F#",
    "Julia",
    "COBOL",
    "Fortran",
    "XML",
    "JSON",
    "YAML",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",
    "DevOps",
    "Machine Learning",
    "Artificial Intelligence",
    "Data Science",
    "Big Data",
    "Cybersecurity",
    "Blockchain",
    "Internet of Things (IoT)",
    "Agile",
    "Scrum",
    "Version Control (e.g., Git)",
    "Database Management",
    "Web Development",
    "Mobile Development",
    "Game Development",
    "Software Engineering",
    "Testing and QA",
    "Networking",
    "System Administration",
    "Cloud Computing",
];

const getAllArticle = asyncHandler(async (req, res) => {
    const { date, tag } = req.query;

    const getAllDate = async (date) => {
        const query = await pool.query(
            "SELECT * FROM BlogArticle WHERE CreatedAt >= $1 AND CreatedAt < $1::date + 1",
            [date]
        );
        return query.rows;
    };

    const getAllTag = async (tag) => {
        if (TAGS.includes(tag)) {
            const query = await pool.query(
                "SELECT * FROM BlogArticle WHERE tags=$1",
                [tag]
            );
            return query.rows;
        } else {
            throw new Error("Invalid Tag");
        }
    };

    const getAllDateAndTag = async (date, tag) => {
        const query = await pool.query(
            "SELECT * FROM BlogArticle WHERE CreatedAt >= $1 AND CreatedAt < $1::date + INTERVAL '1 day' AND tags = $2",
            [date, tag]
        );
        return query.rows;
    };

    const getAll = async () => {
        const query = await pool.query("SELECT * FROM BlogArticle");
        return query.rows;
    };

    try {
        let result;
        if (tag && date) {
            result = await getAllDateAndTag(date, tag);
        } else if (tag) {
            result = await getAllTag(tag);
        } else if (date) {
            result = await getAllDate(date);
        } else {
            result = await getAll();
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const getSingleArticle = asyncHandler(async (req, res) => {
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
});

const createArticle = asyncHandler(async (req, res) => {
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
});

const deleteArticle = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const query = await pool.query("DELETE FROM BlogArticle WHERE id=$1", [
            id,
        ]);
        query;
        res.status(200).json({ msg: "Successfully Deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const updateArticle = asyncHandler(async (req, res) => {
    const { id } = req.params;
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
            "UPDATE BlogArticle SET title=$1, introduction=$2, body=$3, images=$4, links=$5, conclusion=$6, author_bio=$7, comments=$8, tags=$9 WHERE id=$10 RETURNING *",
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
                id,
            ]
        );

        res.status(200).json(query.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export {
    getAllArticle,
    getSingleArticle,
    createArticle,
    deleteArticle,
    updateArticle,
};
