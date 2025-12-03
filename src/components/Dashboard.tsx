import { Send, History, Settings, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { User, Transaction } from '../types';
import { mockTransactions } from '../mocks/data';

import { RippleButton } from './RippleButton';

interface DashboardProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export const Dashboard = ({ user, onNavigate }: DashboardProps) => {
  const recentTransactions = mockTransactions.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header with animated gradient */}
      <div className="bg-gradient-animated px-6 pt-12 pb-24 rounded-b-[2.5rem] relative overflow-hidden shadow-colored-lg">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-xl shadow-lg ring-4 ring-white/20">
                {user.firstName?.[0] || 'U'}
              </div>
              <div>
                <p className="text-indigo-100 text-sm font-medium">Bonjour,</p>
                <h2 className="text-white font-bold text-xl">
                  {user.firstName || 'Utilisateur'}
                </h2>
              </div>
            </div>
            <button
              onClick={() => onNavigate('settings')}
              className="w-11 h-11 glass-strong rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="glass-strong rounded-3xl p-6 border border-white/30 shadow-2xl animate-scale-in pulse-slow">
            <p className="text-white/90 text-sm mb-2 font-medium">Solde disponible</p>
            <p className="text-white text-5xl font-extrabold mb-4 tracking-tight">--- <span className="text-3xl font-bold">XAF</span></p>
            <div className="flex items-center gap-2 text-white/80 text-xs bg-white/10 rounded-xl px-3 py-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              Les soldes sont sur vos sources de paiement externes
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-10 mb-6 animate-slide-up">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-5 grid grid-cols-2 gap-4 border border-gray-100 dark:border-gray-700">
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

      {/* Recent Transactions */}
      <div className="flex-1 px-6 pb-6">
        <div className="mb-5 flex items-center justify-between animate-fade-in">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Transactions récentes</h3>
          <button
            onClick={() => onNavigate('history')}
            className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 hover:gap-2 flex items-center gap-1 transition-all group"
          >
            Voir tout
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <div key={transaction.id} className="stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <TransactionItem transaction={transaction} />
            </div>
          ))}
        </div>

        {recentTransactions.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <History className="w-10 h-10 text-indigo-400" />
            </div>
            <p className="text-gray-500 font-medium text-lg">Aucune transaction</p>
            <p className="text-gray-400 text-sm mt-1">Vos transactions apparaîtront ici</p>
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
    <RippleButton
      onClick={onClick}
      className="group flex flex-col items-center gap-3 p-5 rounded-2xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 active:scale-95 transition-all duration-300 hover-lift w-full"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-colored-lg group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {label}
      </span>
    </RippleButton>
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
    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-indigo-200">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${isOutgoing ? 'bg-gradient-to-br from-red-50 to-pink-50 ring-2 ring-red-100' : 'bg-gradient-to-br from-green-50 to-emerald-50 ring-2 ring-green-100'
        }`}>
        {isOutgoing ? (
          <ArrowUpRight className="w-7 h-7 text-red-600" />
        ) : (
          <ArrowDownLeft className="w-7 h-7 text-green-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-900 truncate text-base">
          {transaction.destinationName}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-gray-500 truncate">
            {transaction.source}
          </p>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${isOutgoing ? 'text-red-600' : 'text-green-600'
          }`}>
          {isOutgoing ? '-' : '+'}{transaction.amount.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400 font-medium">XAF</p>
      </div>
    </div>
  );
};
