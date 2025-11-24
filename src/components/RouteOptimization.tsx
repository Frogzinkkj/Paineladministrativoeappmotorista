import { useState } from 'react';
import { MapPin, Send, Clock, Package, Navigation } from 'lucide-react';

interface Route {
  id: string;
  name: string;
  driver: string;
  deliveries: number;
  distance: string;
  estimatedTime: string;
  color: string;
  published: boolean;
}

export function RouteOptimization() {
  const [selectedRoute, setSelectedRoute] = useState<string>('R001');
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: 'R001',
      name: 'Rota 01',
      driver: 'João Silva',
      deliveries: 15,
      distance: '35 km',
      estimatedTime: '2h 30min',
      color: 'bg-blue-500',
      published: false,
    },
    {
      id: 'R002',
      name: 'Rota 02',
      driver: 'Maria Santos',
      deliveries: 12,
      distance: '28 km',
      estimatedTime: '2h 00min',
      color: 'bg-green-500',
      published: false,
    },
    {
      id: 'R003',
      name: 'Rota 03',
      driver: 'Carlos Oliveira',
      deliveries: 18,
      distance: '42 km',
      estimatedTime: '3h 00min',
      color: 'bg-purple-500',
      published: true,
    },
  ]);

  const deliveryPoints = [
    { id: 1, address: 'Rua da Conceição, 123', recipient: 'Maria Silva', order: 1 },
    { id: 2, address: 'Av. Sete de Setembro, 1000', recipient: 'João Santos', order: 2 },
    { id: 3, address: 'Rua Chile, 456', recipient: 'Ana Costa', order: 3 },
    { id: 4, address: 'Av. Garibaldi, 789', recipient: 'Carlos Oliveira', order: 4 },
    { id: 5, address: 'Av. Tancredo Neves, 2000', recipient: 'Pedro Alves', order: 5 },
  ];

  const publishRoutes = () => {
    setRoutes(routes.map((route) => ({ ...route, published: true })));
  };

  const unpublishedCount = routes.filter((r) => !r.published).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Roteirização Inteligente</h1>
        <p className="text-gray-600">Visualize e publique rotas otimizadas</p>
      </div>

      {/* Publish Button */}
      {unpublishedCount > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Send className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm">
                Você tem {unpublishedCount} rota(s) não publicada(s)
              </p>
              <p className="text-xs text-gray-600">Publique para enviar aos motoristas</p>
            </div>
          </div>
          <button
            onClick={publishRoutes}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            <Send size={18} />
            Publicar Rotas
          </button>
        </div>
      )}

      {/* Main Layout: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Routes List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg">Rotas Geradas</h2>
            <p className="text-sm text-gray-600">{routes.length} rotas ativas</p>
          </div>
          <div className="divide-y divide-gray-200">
            {routes.map((route) => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`w-full p-4 text-left transition-colors ${
                  selectedRoute === route.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${route.color}`}></div>
                    <span className="text-sm">{route.name}</span>
                  </div>
                  {route.published && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                      Publicada
                    </span>
                  )}
                </div>
                <p className="text-sm mb-2">{route.driver}</p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Package size={14} />
                    {route.deliveries} entregas
                  </span>
                  <span className="flex items-center gap-1">
                    <Navigation size={14} />
                    {route.distance}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <Clock size={14} />
                  {route.estimatedTime}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Map and Route Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg">Visualização da Rota</h2>
              <p className="text-sm text-gray-600">
                {routes.find((r) => r.id === selectedRoute)?.name} -{' '}
                {routes.find((r) => r.id === selectedRoute)?.driver}
              </p>
            </div>
            <div className="relative bg-gray-100" style={{ height: '400px' }}>
              {/* Map Placeholder with Route Path */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Mapa de Rota Otimizada</p>
                  <p className="text-gray-400 text-sm">Trajeto colorido da rota selecionada</p>
                </div>
              </div>

              {/* Route Path Visualization (Simplified) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 50 50 Q 150 100, 250 150 T 450 250 T 650 300"
                  stroke={
                    routes.find((r) => r.id === selectedRoute)?.color.replace('bg-', '') === 'blue-500'
                      ? '#3b82f6'
                      : routes.find((r) => r.id === selectedRoute)?.color.replace('bg-', '') === 'green-500'
                      ? '#10b981'
                      : '#a855f7'
                  }
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,5"
                />
              </svg>

              {/* Delivery Points on Map */}
              {[
                { x: '10%', y: '15%' },
                { x: '25%', y: '35%' },
                { x: '45%', y: '45%' },
                { x: '65%', y: '60%' },
                { x: '80%', y: '70%' },
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="absolute w-8 h-8 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-lg"
                  style={{ left: point.x, top: point.y }}
                >
                  <span className="text-xs text-blue-600">{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Points List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg">Pontos de Entrega (em ordem)</h2>
              <p className="text-sm text-gray-600">
                {deliveryPoints.length} paradas na sequência otimizada
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              {deliveryPoints.map((point) => (
                <div key={point.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {point.order}
                  </div>
                  <div className="flex-1">
                    <p className="mb-1">{point.recipient}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin size={14} />
                      {point.address}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">~15 min</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}