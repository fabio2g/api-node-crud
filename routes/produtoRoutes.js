const router = require("express").Router();
const Produto = require("../models/Produto");

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
            res.status(422).json({ message: "Product not found!" });
            return;
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post("/produto", async (req, res) => {
    const { nome, marca, quantidade, descricao, valor } = req.body;

    if (!nome) {
        res.status(422).json({ message: "Name is required!" });
        return;
    }
    if (!marca) {
        res.status(422).json({ message: "Brand is required!" });
        return;
    }
    if (!quantidade) {
        res.status(422).json({ message: "Quantity is required!" });
        return;
    }
    if (!descricao) {
        res.status(422).json({ message: "Description is required!" });
        return;
    }
    if (!valor) {
        res.status(422).json({ message: "Value is required!" });
        return;
    }

    const novoProduto = {
        nome,
        marca,
        quantidade,
        descricao,
        valor,
    };
    try {
        await Produto.create(novoProduto);
        res.send(201).json({ message: "1 record inserted" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post("/produto/:id", async (req, res) => {
    const id = req.params.id;
    const { nome, marca, quantidade, descricao, valor } = req.body;
    const produto = {
        nome,
        marca,
        quantidade,
        descricao,
        valor,
    };

    try {
        const UpdateProduto = await Produto.updateOne({ _id: id }, produto);
        if (UpdateProduto.matchedCount === 0) {
            res.status(422).json({ message: "Product not foound!" });
            return;
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
