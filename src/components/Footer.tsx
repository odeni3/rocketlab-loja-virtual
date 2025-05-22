import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full py-4 text-center text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 shadow-lg">🚀</span>
        <span className="font-bold text-lg tracking-wide">Rocketlab Loja Virtual</span>
      </div>
      <div className="text-sm text-blue-1000/80 text-center md:text-right max-w-md">
        <span className="font-semibold text-blue-1000/80">Sobre nós:</span> A Rocketlab é uma loja virtual fictícia criada para demonstrar tecnologia, design e experiência de compra moderna. Nosso objetivo é inspirar e mostrar o potencial do e-commerce com uma interface bonita, intuitiva e responsiva.
        <br className="hidden md:block" />
        &copy; {new Date().getFullYear()} Rocketlab. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer; 