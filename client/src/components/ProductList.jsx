const ProductList = ({ produtos, onEdit, onDelete }) => {
    return (
      <ul style={{
        flexDirection:'column'
      }}>
        {produtos.map((produto) => (
          <li key={produto.id} className="productListContainer">
            <span>{produto.nome} • {produto.descricao} • {produto.quantidade} unidades • R${produto.preco}</span>
            <div className="btns-container">
            <button className="edit" onClick={() => onEdit(produto)}>Editar</button>
            <button onClick={() => onDelete(produto.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default ProductList;
  