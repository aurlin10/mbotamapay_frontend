import { useState } from 'react';
import {
  ArrowLeft,
  CreditCard,
  User,
  Shield,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { User as UserType, PaymentMethod } from '../types';
import { mockPaymentMethods } from '../mocks/data';
import { ThemeToggle } from './ThemeToggle';

interface SettingsScreenProps {
  user: UserType;
  onBack: () => void;
  onLogout: () => void;
}

export const SettingsScreen = ({ user, onBack, onLogout }: SettingsScreenProps) => {
  const [activeTab, setActiveTab] = useState<'payment' | 'profile' | 'security'>('payment');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col">
      <div className="px-6 py-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          <TabButton
            icon={<CreditCard className="w-4 h-4" />}
            label="Paiements"
            active={activeTab === 'payment'}
            onClick={() => setActiveTab('payment')}
          />
          <TabButton
            icon={<User className="w-4 h-4" />}
            label="Profil"
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
          <TabButton
            icon={<Shield className="w-4 h-4" />}
            label="Sécurité"
            active={activeTab === 'security'}
            onClick={() => setActiveTab('security')}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'payment' && <PaymentMethodsTab />}
        {activeTab === 'profile' && <ProfileTab user={user} />}
        {activeTab === 'security' && <SecurityTab onLogout={onLogout} />}
      </div>
    </div>
  );
};

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ icon, label, active, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all active:scale-95 whitespace-nowrap ${active
        ? 'bg-indigo-600 text-white'
        : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
        }`}
    >
      {icon}
      {label}
    </button>
  );
};

const PaymentMethodsTab = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDelete = (id: string) => {
    setMethods(methods.filter((m) => m.id !== id));
  };

  const getProviderColor = (provider: string) => {
    const colors: Record<string, string> = {
      OrangeMoney: 'bg-orange-100 text-orange-600',
      Wave: 'bg-blue-100 text-blue-600',
      MTN: 'bg-yellow-100 text-yellow-600',
      Moov: 'bg-green-100 text-green-600',
      Visa: 'bg-indigo-100 text-indigo-600',
      Mastercard: 'bg-red-100 text-red-600',
    };
    return colors[provider] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="px-6 py-6">
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all mb-6"
      >
        <Plus className="w-5 h-5" />
        Ajouter un moyen de paiement
      </button>

      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
        Moyens de paiement
      </h3>

      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getProviderColor(method.provider)}`}>
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white">{method.provider}</h4>
              <p className="text-sm text-gray-600">
                <span className="text-gray-600 dark:text-gray-400">{method.type === 'Card' ? 'Carte' : 'Mobile Money'} •••• {method.lastDigits}</span>
              </p>
            </div>
            <button
              onClick={() => handleDelete(method.id)}
              className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-100 active:scale-95 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddPaymentModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

const ProfileTab = ({ user }: { user: UserType }) => {
  return (
    <div className="px-6 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl">
            {user.firstName?.[0] || 'U'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{user.phone}</p>
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-200 pt-4">
          <InfoRow label="Date de naissance" value={user.dateOfBirth || 'Non renseigné'} />
          <InfoRow label="Adresse" value={user.address || 'Non renseigné'} />
          <InfoRow label="Nationalité" value={user.nationality || 'Non renseigné'} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Statut KYC</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
          {user.kycLevel === 2 ? 'Vérification complète' : 'Vérification en cours'}
        </p>
      </div>
    </div>
  );
};

const SecurityTab = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="px-6 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-700">
        <ThemeToggle />

        <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white">Code PIN</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Modifier votre code PIN</p>
            </div>
          </div>
        </button>

        <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white">Authentification biométrique</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Activer Touch ID / Face ID</p>
            </div>
          </div>
        </button>
      </div>

      <button
        onClick={onLogout}
        className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 active:scale-95 transition-all mt-6"
      >
        <LogOut className="w-5 h-5" />
        Se déconnecter
      </button>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
};

const AddPaymentModal = ({ onClose }: { onClose: () => void }) => {
  const [type, setType] = useState<'Card' | 'MobileMoney' | null>(null);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Ajouter un moyen de paiement
        </h2>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => setType('Card')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${type === 'Card'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 bg-white'
              }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-indigo-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Carte bancaire</h3>
                <p className="text-sm text-gray-600">Visa, Mastercard</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setType('MobileMoney')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${type === 'MobileMoney'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 bg-white'
              }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-indigo-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Mobile Money</h3>
                <p className="text-sm text-gray-600">Orange, MTN, Wave, Moov</p>
              </div>
            </div>
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-200 active:scale-95 transition-all"
          >
            Annuler
          </button>
          <button
            disabled={!type}
            className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};
