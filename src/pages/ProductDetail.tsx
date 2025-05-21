import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../mocks/productsmock';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return <div className="p-8">Produto não encontrado.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setInCart((prev) => prev + quantity);
    console.log(quantity);
    console.log(product);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        className="text-blue-700 hover:underline flex items-center mb-6"
        onClick={() => navigate(-1)}
      >
        <span className="mr-2">&larr;</span> Voltar para produtos
      </button>
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-lg"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-700 mr-3">R$ {product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through mr-2 text-lg">R$ {product.oldPrice.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-1 rounded">{product.discount}% OFF</span>
              )}
            </div>
            <h2 className="font-semibold mb-1">Descrição</h2>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="flex items-center gap-2 mb-4">
              <span>Quantidade:</span>
              <button
                className="border rounded px-2 py-1 text-lg"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >-</button>
              <span className="px-2">{quantity}</span>
              <button
                className="border rounded px-2 py-1 text-lg"
                onClick={() => setQuantity((q) => q + 1)}
              >+</button>
            </div>
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded transition-colors mb-2"
              onClick={handleAddToCart}
            >
              Adicionar ao carrinho
            </button>
            {inCart > 0 && (
              <div className="text-green-600 text-sm font-medium mt-2">{inCart} unidade{inCart > 1 ? 's' : ''} no carrinho</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 