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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Historique</h1>
        </div>

        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une transaction..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
          {filteredTransactions.map((transaction) => {
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
                className="bg-white rounded-xl p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {transaction.destinationName}
                        </h3>
                        <p className="text-sm text-gray-600">{transaction.destination}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">
                          -{transaction.amount.toLocaleString()} XAF
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-500">{transaction.source}</p>
                      <p className="text-gray-400">
                        {formattedDate} • {formattedTime}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
                      Frais: {transaction.fees.toLocaleString()} XAF • Total: {transaction.total.toLocaleString()} XAF
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Aucune transaction trouvée</p>
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
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all active:scale-95 ${
        active
          ? 'bg-indigo-600 text-white'
          : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  );
};
