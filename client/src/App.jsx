import { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import axios from 'axios';
import './App.css';

const App = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [detalheProduto, setDetalheProduto] = useState(null);

  const loadProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    loadProdutos();
  }, []);

  const handleSave = async (produto) => {
    if (produto.id) {
      await axios.put(`http://localhost:3001/produtos/${produto.id}`, produto);
    } else {
      await axios.post('http://localhost:3001/produtos', produto);
    }
    loadProdutos();
    setProdutoSelecionado(null);
  };

  const handleEdit = (produto) => {
    setProdutoSelecionado(produto);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/produtos/${id}`);
    loadProdutos();
  };

  return (
    <div>
      <div className="tables" id="vers">
        <div className="row">
          <div className="cell">
            “No princípio, aquele que é a Palavra já existia. A Palavra estava com Deus, e a Palavra era Deus.” João 1:1
          </div>
        </div>
      </div>

      <div className="tables" id="header">
        <div className="cell title">grace</div>
      </div>

      <div className="tables" id="table_icons">
        <div className="row">
          <div className="cell" id="caminhao">
            <img src="/src/assets/images/caminhao.png" width="25px" alt="Caminhão" />
            <p>frete grátis</p>
          </div>
          <div className="cell">
            <img src="/src/assets/images/envio.png" width="25px" alt="Envio Internacional" />
            <p>envio internacional</p>
          </div>
          <div className="cell">
            <img src="/src/assets/images/cartao.png" width="25px" alt="Cartão" />
            <p>parcele em até 8x</p>
          </div>
          <div className="cell" id="caixa">
            <img src="/src/assets/images/caixa.png" width="25px" alt="Envio Rápido" />
            <p>envio rápido</p>
          </div>
        </div>
      </div>


      <h2>OLÁ, SEJA BEM VINDO ツ</h2>
      <p id="Add">Sistema de gerenciamento de produtos da loja Grace</p>
      <div className="container">
        <ProductForm produto={produtoSelecionado} onSave={handleSave} />
        <ProductList produtos={produtos} onEdit={handleEdit} onDelete={handleDelete} />
        {detalheProduto && <ProductDetail produto={detalheProduto} />}
      </div>
    </div>
  );
}

export default App;
