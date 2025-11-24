import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { DeliveryManagement } from "./components/DeliveryManagement";
import { RouteOptimization } from "./components/RouteOptimization";
import { DriversManagement } from "./components/DriversManagement";
import { MobileDriverApp } from "./components/MobileDriverApp";
import {
  LayoutDashboard,
  Package,
  Route,
  Users,
  BarChart3,
  Smartphone,
  Menu,
  X,
} from "lucide-react";

type ViewType =
  | "dashboard"
  | "deliveries"
  | "routes"
  | "drivers"
  | "reports"
  | "mobile";

export default function App() {
  const [currentView, setCurrentView] =
    useState<ViewType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    {
      id: "dashboard" as ViewType,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "deliveries" as ViewType,
      label: "Entregas/Pacotes",
      icon: Package,
    },
    { id: "routes" as ViewType, label: "Rotas", icon: Route },
    {
      id: "drivers" as ViewType,
      label: "Motoristas",
      icon: Users,
    },
    {
      id: "reports" as ViewType,
      label: "Relatórios",
      icon: BarChart3,
    },
    {
      id: "mobile" as ViewType,
      label: "App Motorista (Demo)",
      icon: Smartphone,
    },
  ];

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "deliveries":
        return <DeliveryManagement />;
      case "routes":
        return <RouteOptimization />;
      case "drivers":
        return <DriversManagement />;
      case "reports":
        return (
          <div className="p-6">
            Relatórios em desenvolvimento...
          </div>
        );
      case "mobile":
        return <MobileDriverApp />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-blue-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl">AC LOGISTICA</h1>
          <p className="text-blue-200 text-sm">
            Sistema de Rotas
          </p>
        </div>
        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  currentView === item.id
                    ? "bg-blue-800 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Administrador
              </p>
              <p>João Silva</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              JS
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}