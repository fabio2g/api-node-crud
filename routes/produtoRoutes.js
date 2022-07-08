const router = require("express").Router();

const Produto = require("../models/Produto");

//Listar produtos
router.get("/produto", async (req, res) => {
    try {
        const produto = await Produto.find().lean();
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/produto/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const produto = await Produto.findOne({ _id: id }).lean();

        if (!produto) {
            res.status(422).json({ message: "Produto não encontrado" });
            return;
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
