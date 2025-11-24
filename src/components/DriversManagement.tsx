import { useState } from 'react';
import { UserPlus, Search, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  vehicle: string;
  plate: string;
  phone: string;
  status: 'Disponível' | 'Em Rota' | 'Offline';
}

export function DriversManagement() {
  const [showModal, setShowModal] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: 'D001',
      name: 'João Silva',
      vehicle: 'Fiorino',
      plate: 'ABC-1234',
      phone: '(71) 98765-4321',
      status: 'Em Rota',
    },
    {
      id: 'D002',
      name: 'Maria Santos',
      vehicle: 'Kangoo',
      plate: 'DEF-5678',
      phone: '(71) 98765-1234',
      status: 'Em Rota',
    },
    {
      id: 'D003',
      name: 'Carlos Oliveira',
      vehicle: 'Sprinter',
      plate: 'GHI-9012',
      phone: '(71) 98765-5678',
      status: 'Disponível',
    },
    {
      id: 'D004',
      name: 'Ana Costa',
      vehicle: 'Master',
      plate: 'JKL-3456',
      phone: '(71) 98765-8765',
      status: 'Disponível',
    },
    {
      id: 'D005',
      name: 'Pedro Alves',
      vehicle: 'Daily',
      plate: 'MNO-7890',
      phone: '(71) 98765-4567',
      status: 'Offline',
    },
  ]);

  const [newDriver, setNewDriver] = useState({
    name: '',
    vehicle: '',
    plate: '',
    phone: '',
  });

  const handleAddDriver = () => {
    if (newDriver.name && newDriver.vehicle && newDriver.plate) {
      const driver: Driver = {
        id: `D${String(drivers.length + 1).padStart(3, '0')}`,
        ...newDriver,
        status: 'Disponível',
      };
      setDrivers([...drivers, driver]);
      setNewDriver({ name: '', vehicle: '', plate: '', phone: '' });
      setShowModal(false);
    }
  };

  const getStatusColor = (status: Driver['status']) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800';
      case 'Em Rota':
        return 'bg-blue-100 text-blue-800';
      case 'Offline':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Driver['status']) => {
    switch (status) {
      case 'Disponível':
        return <CheckCircle size={16} />;
      case 'Em Rota':
        return <Clock size={16} />;
      default:
        return null;
    }
  };

  const availableCount = drivers.filter((d) => d.status === 'Disponível').length;
  const activeCount = drivers.filter((d) => d.status === 'Em Rota').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Gestão de Motoristas</h1>
        <p className="text-gray-600">Cadastre e gerencie motoristas da frota</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Total de Motoristas</p>
          <p className="text-3xl">{drivers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Disponíveis</p>
          <p className="text-3xl text-green-600">{availableCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-1">Em Rota</p>
          <p className="text-3xl text-blue-600">{activeCount}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus size={20} />
            Novo Motorista
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar motorista..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Veículo</th>
              <th className="px-6 py-3 text-left">Placa</th>
              <th className="px-6 py-3 text-left">Telefone</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-blue-600">{driver.id}</td>
                <td className="px-6 py-4">{driver.name}</td>
                <td className="px-6 py-4 text-gray-600">{driver.vehicle}</td>
                <td className="px-6 py-4 text-gray-600">{driver.plate}</td>
                <td className="px-6 py-4 text-gray-600">{driver.phone}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 w-fit ${getStatusColor(driver.status)}`}>
                    {getStatusIcon(driver.status)}
                    {driver.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Driver Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl mb-4">Novo Motorista</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: João Silva"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Veículo</label>
                <input
                  type="text"
                  value={newDriver.vehicle}
                  onChange={(e) => setNewDriver({ ...newDriver, vehicle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Fiorino"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Placa</label>
                <input
                  type="text"
                  value={newDriver.plate}
                  onChange={(e) => setNewDriver({ ...newDriver, plate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: ABC-1234"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Telefone</label>
                <input
                  type="text"
                  value={newDriver.phone}
                  onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: (71) 98765-4321"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddDriver}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}