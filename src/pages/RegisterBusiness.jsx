import React from 'react';
import Button from '../components/Button';

const RegisterBusiness = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Navbar */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">Ubika</div>
        <Button variant="outline">Ver Mapa</Button>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-6">Registro de Negocio</h1>
            
            <form className="space-y-6">
              {/* Business Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Información del Negocio</h2>
                
                <div>
                  <label className="block text-sm mb-1">Nombre del Negocio</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2"
                    placeholder="Ej: Transportes La Paz"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Tipo de Transporte</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2">
                    <option value="">Selecciona un tipo</option>
                    <option value="taxi">Taxi</option>
                    <option value="micro">Micro</option>
                    <option value="trufi">Trufi</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">Descripción</label>
                  <textarea 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 h-24"
                    placeholder="Describe tu servicio de transporte"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Información de Contacto</h2>
                
                <div>
                  <label className="block text-sm mb-1">Teléfono</label>
                  <input 
                    type="tel" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2"
                    placeholder="Número de contacto"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Ubicación</h2>
                
                <div>
                  <label className="block text-sm mb-1">Zona de Operación</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2"
                    placeholder="Ej: Zona Sur, Zona Central"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Rutas Principales</label>
                  <textarea 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 h-24"
                    placeholder="Describe las rutas que cubres"
                  />
                </div>
              </div>

              {/* Schedule Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Horario de Operación</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Hora de Inicio</label>
                    <input 
                      type="time" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Hora de Cierre</label>
                    <input 
                      type="time" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full">Registrar Negocio</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBusiness; 