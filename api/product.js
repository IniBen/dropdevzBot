const express = require("express");
const router = express.Router();

router.get("/index", async (req, res) => {
    try {
        res.json({
            status:200,
            message: "Get data was successful",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("server error");
    }
});
module.exports = router;