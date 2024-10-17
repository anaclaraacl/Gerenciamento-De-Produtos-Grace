const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Produto, sequelize } = require('./models/Produto');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/produtos', async (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;
  try {
    const produto = await Produto.create({ nome, descricao, preco, quantidade });
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
});

app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade } = req.body;
  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      produto.nome = nome;
      produto.descricao = descricao;
      produto.preco = preco;
      produto.quantidade = quantidade;
      await produto.save();
      res.json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      await produto.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
  });
});
