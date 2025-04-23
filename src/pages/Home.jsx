import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bienvenido a <span className="text-blue-500">Ubika</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Tu solución integral para la gestión de recursos
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Comenzar
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Saber más
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Nuestras Características
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-blue-500 text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Rápido y Eficiente</h3>
            <p className="text-gray-300">
              Optimiza tus procesos con nuestra plataforma de alta velocidad
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-blue-500 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Seguro y Confiable</h3>
            <p className="text-gray-300">
              Tus datos están protegidos con la más alta seguridad
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-blue-500 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Analíticas Avanzadas</h3>
            <p className="text-gray-300">
              Toma decisiones basadas en datos en tiempo real
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-blue-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Únete a nuestra plataforma y transforma tu negocio hoy mismo
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-300">
            Registrarse Ahora
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home; 