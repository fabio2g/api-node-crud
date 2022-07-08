const mongoose = require("mongoose");

const Produto = mongoose.model("Produto", {
    nome: String,
    marca: String,
    quantidade: Number,
    descricao: String,
    valor: Number,
    data: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = Produto;
