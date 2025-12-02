import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Filter, Search } from 'lucide-react';
import { mockTransactions } from '../mocks/data';

interface HistoryScreenProps {
  onBack: () => void;
}

export const HistoryScreen = ({ onBack }: HistoryScreenProps) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [searchQuery] = useState('');

  const filteredTransactions = mockTransactions.filter((transaction) => {
    if (filter !== 'all' && transaction.status !== filter) return false;
    if (searchQuery && !transaction.destinationName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <div className="px-6 py-6 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 flex-1">Historique</h1>
        </div>

        <div className="relative mb-5">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une transaction..."
            className="w-full pl-13 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex gap-2">
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            label="Tout"
          />
          <FilterButton
            active={filter === 'completed'}
            onClick={() => setFilter('completed')}
            label="Complétées"
          />
          <FilterButton
            active={filter === 'pending'}
            onClick={() => setFilter('pending')}
            label="En attente"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-4">
          {filteredTransactions.map((transaction, index) => {
            const date = new Date(transaction.date);
            const formattedDate = date.toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            });
            const formattedTime = date.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={transaction.id}
                className="stagger-item bg-white rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl flex items-center justify-center flex-shrink-0 ring-2 ring-red-100 shadow-md">
                    <ArrowUpRight className="w-7 h-7 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">
                          {transaction.destinationName}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">{transaction.destination}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600 text-lg">
                          -{transaction.amount.toLocaleString()} <span className="text-sm text-gray-400">XAF</span>
                        </p>
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mt-1 ${transaction.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                          {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-500 font-medium">{transaction.source}</p>
                      <p className="text-gray-400 text-xs">
                        {formattedDate} • {formattedTime}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 flex items-center gap-3">
                      <span className="font-medium">Frais: {transaction.fees.toLocaleString()} XAF</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="font-medium">Total: {transaction.total.toLocaleString()} XAF</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium text-lg">Aucune transaction trouvée</p>
            <p className="text-gray-400 text-sm mt-1">Essayez un autre filtre</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const FilterButton = ({ active, onClick, label }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${active
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-colored'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
    >
      {label}
    </button>
  );
};
