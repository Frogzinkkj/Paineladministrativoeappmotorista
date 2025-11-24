import { Package, Truck, CheckCircle, DollarSign, MapPin } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Entregas Pendentes', value: '24', icon: Package, color: 'bg-orange-500' },
    { label: 'Em Rota', value: '8', icon: Truck, color: 'bg-blue-500' },
    { label: 'Concluídas Hoje', value: '47', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Economia Gerada', value: 'R$ 2.4k', icon: DollarSign, color: 'bg-purple-500' },
  ];

  // Mock data para caminhões em tempo real
  const trucks = [
    { id: 1, driver: 'João Silva', lat: -12.9714, lng: -38.5014, route: 'Rota 01' },
    { id: 2, driver: 'Maria Santos', lat: -12.9814, lng: -38.5214, route: 'Rota 02' },
    { id: 3, driver: 'Carlos Oliveira', lat: -12.9614, lng: -38.4814, route: 'Rota 03' },
  ];

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl">Rastreamento em Tempo Real</h2>
          <p className="text-gray-600 text-sm">Localização dos caminhões ativos</p>
        </div>
        <div className="relative bg-gray-100" style={{ height: '500px' }}>
          {/* Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Mapa de Rastreamento</p>
              <p className="text-gray-400 text-sm">Salvador - Bahia</p>
            </div>
          </div>

          {/* Truck Markers */}
          {trucks.map((truck) => (
            <div
              key={truck.id}
              className="absolute bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm"
              style={{
                top: `${30 + truck.id * 15}%`,
                left: `${40 + truck.id * 10}%`,
              }}
            >
              <Truck size={16} className="inline mr-2" />
              {truck.driver}
              <div className="text-xs text-blue-100 mt-1">{truck.route}</div>
            </div>
          ))}
        </div>

        {/* Active Routes List */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="mb-4">Rotas Ativas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trucks.map((truck) => (
              <div key={truck.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-600">{truck.route}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    Em Rota
                  </span>
                </div>
                <p className="text-sm text-gray-600">{truck.driver}</p>
                <p className="text-xs text-gray-400 mt-2">Última atualização: agora</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}