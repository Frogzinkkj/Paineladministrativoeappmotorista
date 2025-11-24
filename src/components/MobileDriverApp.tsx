import { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  CheckCircle, 
  Camera, 
  User,
  Clock,
  Package,
  Phone,
  Home
} from 'lucide-react';

type Screen = 'login' | 'routes' | 'delivery' | 'proof';

interface Delivery {
  id: string;
  recipient: string;
  address: string;
  phone: string;
  notes: string;
  status: 'pending' | 'completed';
}

export function MobileDriverApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [signature, setSignature] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(0);
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 'PKG001',
      recipient: 'Maria Silva',
      address: 'Rua da Conceição, 123 - Pelourinho',
      phone: '(71) 98765-4321',
      notes: 'Apartamento 45, torre B',
      status: 'pending',
    },
    {
      id: 'PKG002',
      recipient: 'João Santos',
      address: 'Av. Sete de Setembro, 1000 - Centro',
      phone: '(71) 98765-1234',
      notes: 'Recepção',
      status: 'pending',
    },
    {
      id: 'PKG003',
      recipient: 'Ana Costa',
      address: 'Rua Chile, 456 - Comércio',
      phone: '(71) 98765-5678',
      notes: 'Casa térrea',
      status: 'pending',
    },
  ]);

  const completedCount = deliveries.filter((d) => d.status === 'completed').length;

  // Login Screen
  const LoginScreen = () => (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="text-blue-600" size={40} />
          </div>
          <h1 className="text-3xl mb-2">SARDE Driver</h1>
          <p className="text-blue-100">AC LOGÍSTICA</p>
        </div>
      </div>
      <div className="bg-white rounded-t-3xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Matrícula</label>
          <input
            type="text"
            defaultValue="D001"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua matrícula"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-2">Senha</label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua senha"
          />
        </div>
        <button
          onClick={() => setCurrentScreen('routes')}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>
      </div>
    </div>
  );

  // Routes List Screen
  const RoutesScreen = () => (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm">Bem-vindo,</p>
            <p className="text-lg">João Silva</p>
          </div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
        </div>
        <div className="bg-blue-500 rounded-lg p-3">
          <p className="text-sm text-blue-100 mb-1">Rota do Dia #1024</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl">{completedCount}/{deliveries.length} Entregas</span>
            <span className="px-3 py-1 bg-blue-400 rounded-full text-sm">Em Andamento</span>
          </div>
        </div>
      </div>

      {/* Deliveries Timeline */}
      <div className="flex-1 overflow-auto p-4">
        <h2 className="text-sm text-gray-600 mb-4">ENTREGAS DE HOJE</h2>
        <div className="space-y-3">
          {deliveries.map((delivery, idx) => (
            <button
              key={delivery.id}
              onClick={() => {
                setSelectedDelivery(idx);
                setCurrentScreen('delivery');
              }}
              className={`w-full bg-white rounded-lg p-4 border-l-4 ${
                delivery.status === 'completed' ? 'border-green-500' : 'border-blue-500'
              } text-left transition-shadow hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    delivery.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {delivery.status === 'completed' ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span className="text-sm">{idx + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="mb-1">{delivery.recipient}</p>
                  <p className="text-sm text-gray-600 flex items-start gap-1">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                    {delivery.address}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{delivery.id}</p>
                </div>
                {delivery.status === 'pending' && (
                  <Navigation className="text-blue-600 flex-shrink-0" size={20} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      {deliveries.some((d) => d.status === 'pending') && (
        <div className="p-4 bg-white border-t border-gray-200">
          <button
            onClick={() => {
              const nextIdx = deliveries.findIndex((d) => d.status === 'pending');
              setSelectedDelivery(nextIdx);
              setCurrentScreen('delivery');
            }}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Navigation size={20} />
            Navegar para Próxima Entrega
          </button>
        </div>
      )}
    </div>
  );

  // Delivery Detail Screen
  const DeliveryScreen = () => {
    const delivery = deliveries[selectedDelivery];
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center gap-3">
          <button onClick={() => setCurrentScreen('routes')} className="p-1">
            <ArrowLeft size={24} />
          </button>
          <div>
            <p className="text-sm text-blue-100">Entrega #{selectedDelivery + 1}</p>
            <p className="text-lg">{delivery.id}</p>
          </div>
        </div>

        {/* Map */}
        <div className="relative bg-gray-200 h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin size={48} className="text-gray-400" />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>12 min (3.5 km)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Destinatário</p>
            <p className="text-lg">{delivery.recipient}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Endereço</p>
            <p className="flex items-start gap-2">
              <MapPin size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              {delivery.address}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Telefone</p>
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-blue-600" />
              {delivery.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Observações</p>
            <p className="text-gray-700">{delivery.notes}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-3 border-t border-gray-200">
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <Navigation size={20} />
            Navegar (Waze/Maps)
          </button>
          <button
            onClick={() => setCurrentScreen('proof')}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} />
            Confirmar Entrega
          </button>
        </div>
      </div>
    );
  };

  // Proof of Delivery Screen
  const ProofScreen = () => {
    const delivery = deliveries[selectedDelivery];
    const [deliveryStatus, setDeliveryStatus] = useState('Entregue');
    const [photoTaken, setPhotoTaken] = useState(false);

    const handleComplete = () => {
      const newDeliveries = [...deliveries];
      newDeliveries[selectedDelivery].status = 'completed';
      setDeliveries(newDeliveries);
      setCurrentScreen('routes');
      setPhotoTaken(false);
      setSignature('');
    };

    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 flex items-center gap-3">
          <button onClick={() => setCurrentScreen('delivery')} className="p-1">
            <ArrowLeft size={24} />
          </button>
          <div>
            <p className="text-sm text-green-100">Comprovação de Entrega</p>
            <p className="text-lg">{delivery.id}</p>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-auto p-4 space-y-6">
          {/* Status */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Status da Entrega</label>
            <select
              value={deliveryStatus}
              onChange={(e) => setDeliveryStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Entregue</option>
              <option>Ausente</option>
              <option>Recusado</option>
              <option>Endereço não encontrado</option>
            </select>
          </div>

          {/* Signature */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Assinatura do Cliente</label>
            <div
              className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:border-gray-400 transition-colors relative"
              onClick={() => setSignature('signed')}
            >
              {signature ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    <path
                      d="M 20 50 Q 40 20, 80 40 T 160 60 Q 180 70, 190 50"
                      stroke="#000"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <p className="text-sm">Toque para assinar</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Foto do Pacote</label>
            <button
              onClick={() => setPhotoTaken(true)}
              className={`w-full h-40 border-2 border-dashed rounded-lg transition-colors relative ${
                photoTaken
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            >
              {photoTaken ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <CheckCircle className="text-green-600 mx-auto mb-2" size={32} />
                    <p className="text-sm text-green-600">Foto capturada</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Camera className="mx-auto mb-2" size={32} />
                    <p className="text-sm">Tirar foto</p>
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Observações (opcional)</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
              placeholder="Adicione informações adicionais..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleComplete}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} />
            Concluir Entrega
          </button>
        </div>
      </div>
    );
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'routes':
        return <RoutesScreen />;
      case 'delivery':
        return <DeliveryScreen />;
      case 'proof':
        return <ProofScreen />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Mobile Frame */}
      <div className="w-full max-w-md bg-gray-800 rounded-3xl p-3 shadow-2xl">
        <div className="bg-white rounded-2xl overflow-hidden" style={{ height: '700px' }}>
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}