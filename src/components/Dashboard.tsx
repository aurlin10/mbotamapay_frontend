import { Send, History, Settings, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { User, Transaction } from '../types';
import { mockTransactions } from '../mocks/data';

interface DashboardProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export const Dashboard = ({ user, onNavigate }: DashboardProps) => {
  const recentTransactions = mockTransactions.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 px-6 pt-12 pb-20 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
              {user.firstName?.[0] || 'U'}
            </div>
            <div>
              <p className="text-indigo-100 text-sm">Bonjour,</p>
              <h2 className="text-white font-bold text-lg">
                {user.firstName || 'Utilisateur'}
              </h2>
            </div>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
          <p className="text-indigo-100 text-sm mb-1">Solde disponible</p>
          <p className="text-white text-4xl font-bold mb-4">--- XAF</p>
          <p className="text-indigo-200 text-xs">
            Les soldes sont sur vos sources de paiement externes
          </p>
        </div>
      </div>

      <div className="px-6 -mt-8 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 grid grid-cols-2 gap-3">
          <QuickAction
            icon={<Send className="w-6 h-6" />}
            label="Envoyer"
            onClick={() => onNavigate('send')}
          />
          <QuickAction
            icon={<History className="w-6 h-6" />}
            label="Historique"
            onClick={() => onNavigate('history')}
          />
        </div>
      </div>

      <div className="flex-1 px-6 pb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Transactions récentes</h3>
          <button
            onClick={() => onNavigate('history')}
            className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
          >
            Voir tout
          </button>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>

        {recentTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Aucune transaction</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const QuickAction = ({ icon, label, onClick }: QuickActionProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
    >
      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </button>
  );
};

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isOutgoing = true;
  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        isOutgoing ? 'bg-red-100' : 'bg-green-100'
      }`}>
        {isOutgoing ? (
          <ArrowUpRight className="w-6 h-6 text-red-600" />
        ) : (
          <ArrowDownLeft className="w-6 h-6 text-green-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate">
          {transaction.destinationName}
        </h4>
        <p className="text-sm text-gray-500 truncate">
          {transaction.source}
        </p>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${
          isOutgoing ? 'text-red-600' : 'text-green-600'
        }`}>
          {isOutgoing ? '-' : '+'}{transaction.amount.toLocaleString()} XAF
        </p>
        <p className="text-xs text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
};
