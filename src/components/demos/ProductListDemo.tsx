import { useState } from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductListDemo = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Laptop Pro',
      price: 1299,
      description: 'High-performance laptop for professionals',
      image: '💻',
    },
    {
      id: 2,
      name: 'SmartPhone X',
      price: 799,
      description: 'Latest smartphone with advanced features',
      image: '📱',
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      price: 199,
      description: 'Premium wireless headphones with noise cancellation',
      image: '🎧',
    },
    {
      id: 4,
      name: 'Smartwatch',
      price: 299,
      description: 'Fitness tracking and notifications on your wrist',
      image: '⌚',
    },
  ]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={item}
            className="glass-card p-6 space-y-4"
          >
            <div className="text-center text-4xl mb-2">
              {product.image}
            </div>
            <h3 className="text-xl font-semibold text-center">
              {product.name}
            </h3>
            <p className="text-gray-600 text-center">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">
                ${product.price}
              </p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="glass-card p-4">
        <p className="text-sm text-gray-600">
          This demo shows how to use map() to render a list of products with
          staggered animations using Framer Motion.
        </p>
      </div>
    </div>
  );
};

export default ProductListDemo; 