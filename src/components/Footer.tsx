import React from 'react';

const Footer: React.FC = () => (
  <footer className="mt-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white py-2 px-4 shadow-inner">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 shadow-lg">🚀</span>
        <span className="font-bold text-lg tracking-wide">Rocketlab Loja Virtual</span>
      </div>
      <div className="text-sm text-blue-100/80 text-center md:text-right max-w-md">
        <span className="font-semibold text-white">Sobre nós:</span> A Rocketlab é uma loja virtual fictícia criada para demonstrar tecnologia, design e experiência de compra moderna. Nosso objetivo é inspirar e mostrar o potencial do e-commerce com uma interface bonita, intuitiva e responsiva.
        <br className="hidden md:block" />
        &copy; {new Date().getFullYear()} Rocketlab. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer; 