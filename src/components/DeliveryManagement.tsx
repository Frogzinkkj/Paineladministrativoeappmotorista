import { useState } from 'react';
import { Upload, Search, Filter, CheckSquare, Square, Zap } from 'lucide-react';

interface Package {
  id: string;
  recipient: string;
  address: string;
  city: string;
  weight: string;
  priority: 'Normal' | 'Urgente';
  status: 'Pendente' | 'Em Rota' | 'Entregue';
  selected: boolean;
}

export function DeliveryManagement() {
  const [showImportModal, setShowImportModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const [packages, setPackages] = useState<Package[]>([
    {
      id: 'PKG001',
      recipient: 'Maria Silva',
      address: 'Rua da Conceição, 123',
      city: 'Salvador',
      weight: '2.5kg',
      priority: 'Normal',
      status: 'Pendente',
      selected: false,
    },
    {
      id: 'PKG002',
      recipient: 'João Santos',
      address: 'Av. Sete de Setembro, 1000',
      city: 'Salvador',
      weight: '1.2kg',
      priority: 'Urgente',
      status: 'Pendente',
      selected: false,
    },
    {
      id: 'PKG003',
      recipient: 'Ana Costa',
      address: 'Rua Chile, 456',
      city: 'Salvador',
      weight: '3.0kg',
      priority: 'Normal',
      status: 'Pendente',
      selected: false,
    },
    {
      id: 'PKG004',
      recipient: 'Carlos Oliveira',
      address: 'Av. Garibaldi, 789',
      city: 'Salvador',
      weight: '0.8kg',
      priority: 'Urgente',
      status: 'Em Rota',
      selected: false,
    },
  ]);

  const handleImportCSV = () => {
    setShowImportModal(true);
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setTimeout(() => setShowImportModal(false), 1000);
    }, 2000);
  };

  const toggleSelectAll = () => {
    const allSelected = packages.every((pkg) => pkg.selected);
    setPackages(packages.map((pkg) => ({ ...pkg, selected: !allSelected })));
  };

  const toggleSelect = (id: string) => {
    setPackages(packages.map((pkg) => (pkg.id === id ? { ...pkg, selected: !pkg.selected } : pkg)));
  };

  const selectedCount = packages.filter((pkg) => pkg.selected).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Gestão de Entregas</h1>
        <p className="text-gray-600">Importe e gerencie pacotes para roteirização</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={handleImportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={20} />
              Importar CSV
            </button>
            <button
              disabled={selectedCount === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCount > 0
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Zap size={20} />
              Gerar Rotas ({selectedCount})
            </button>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar pacotes..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} />
              Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <button onClick={toggleSelectAll} className="hover:text-blue-600 transition-colors">
                  {packages.every((pkg) => pkg.selected) ? (
                    <CheckSquare size={20} />
                  ) : (
                    <Square size={20} />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Destinatário</th>
              <th className="px-6 py-3 text-left">Endereço</th>
              <th className="px-6 py-3 text-left">Cidade</th>
              <th className="px-6 py-3 text-left">Peso</th>
              <th className="px-6 py-3 text-left">Prioridade</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleSelect(pkg.id)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {pkg.selected ? <CheckSquare size={20} /> : <Square size={20} />}
                  </button>
                </td>
                <td className="px-6 py-4 text-blue-600">{pkg.id}</td>
                <td className="px-6 py-4">{pkg.recipient}</td>
                <td className="px-6 py-4 text-gray-600">{pkg.address}</td>
                <td className="px-6 py-4 text-gray-600">{pkg.city}</td>
                <td className="px-6 py-4 text-gray-600">{pkg.weight}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      pkg.priority === 'Urgente'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {pkg.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      pkg.status === 'Entregue'
                        ? 'bg-green-100 text-green-800'
                        : pkg.status === 'Em Rota'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {pkg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            {importing ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                <h3 className="text-xl mb-2">Carregando Arquivo...</h3>
                <p className="text-gray-600">Processando dados do CSV</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <CheckSquare className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl mb-2">Importação Concluída!</h3>
                <p className="text-gray-600">Arquivo processado com sucesso</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}