
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/products", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);

    } catch (error) {
        console.error("Error fetching products:", error);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
});



app.post("/api/products", async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || name.trim() === "") {
            return res.status(400).json({
                message: "Dress name is required"
            });
        }

        if (name.trim().length > 100) {
            return res.status(400).json({
                message: "Dress name cannot exceed 100 characters"
            });
        }

        if (price === undefined || price === null || price === "" || !Number.isFinite(Number(price)) || Number(price) <= 0) {
            return res.status(400).json({
                message: "Please enter a valid price greater than zero"
            });
        }

        const result = await pool.query(
            "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
            [name, price]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            message: "Failed to add product"
        });
    }
});



app.listen(3000, () => {
    console.log("StyleCart server running on port 3000");
});
