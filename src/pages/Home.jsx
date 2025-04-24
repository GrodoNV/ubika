import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import Map from '../components/Map';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Navbar */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">Ubika</div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate('/mapa')}>Ver Mapa</Button>
          <Button onClick={() => navigate('/registrar-negocio')}>Registrar Negocio</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Conectando <span className="text-blue-400">Transporte</span> y <span className="text-blue-400">Comunidad</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl">
            La plataforma que une a conductores y pasajeros de manera segura y eficiente en La Paz
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => navigate('/mapa')}>Ver Mapa en Tiempo Real</Button>
            <Button variant="secondary" onClick={() => navigate('/registrar-negocio')}>Registrar Mi Negocio</Button>
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">Mapa en Tiempo Real</h2>
          <Map />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          ¿Por qué elegir Ubika?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🚗"
            title="Transporte Seguro"
            description="Conductores verificados y rutas optimizadas para tu seguridad"
          />
          <FeatureCard
            icon="💰"
            title="Precios Justos"
            description="Tarifas transparentes y sin sorpresas"
          />
          <FeatureCard
            icon="⏱️"
            title="Tiempo Real"
            description="Seguimiento en vivo de tu transporte"
          />
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Descubre las experiencias de quienes ya confían en nuestra plataforma
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="María González"
              role="Dueña de Restaurante"
              image="/images/testimonials/maria.jpg"
              content="Gracias a Ubika, he podido aumentar la visibilidad de mi negocio y atraer más clientes. La plataforma es muy fácil de usar y el soporte es excelente."
            />
            <TestimonialCard
              name="Carlos Rodríguez"
              role="Gerente de Hotel"
              image="/images/testimonials/carlos.jpg"
              content="La integración con Google Maps ha sido fundamental para nuestro negocio. Ahora los clientes nos encuentran más fácilmente y las reservas han aumentado significativamente."
            />
            <TestimonialCard
              name="Ana Martínez"
              role="Emprendedora"
              image="/images/testimonials/ana.jpg"
              content="Como emprendedora, necesitaba una solución que me ayudara a destacar en el mercado. Ubika ha sido la herramienta perfecta para dar a conocer mi negocio."
            />
          </div>
        </div>
      </section>

      {/* Business Registration CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Eres conductor o tienes un negocio de transporte?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Únete a nuestra plataforma y llega a más pasajeros
          </p>
          <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
            Registrarse Ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold mb-4 md:mb-0">Ubika</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Términos</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 