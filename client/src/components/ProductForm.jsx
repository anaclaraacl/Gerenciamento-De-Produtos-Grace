import { useState, useEffect } from 'react';

const ProductForm = ({ produto, onSave }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setDescricao(produto.descricao);
      setPreco(produto.preco);
      setQuantidade(produto.quantidade);
    }
  }, [produto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduto = { id: produto?.id, nome, descricao, preco, quantidade };
    onSave(newProduto);
    setNome('');
    setDescricao('');
    setPreco('');
    setQuantidade('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        min="0"
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProductForm;
