import { useState } from 'react';
import { User, Calendar, MapPin, Globe } from 'lucide-react';
import { countries } from '../mocks/data';

interface KYCLevel1Props {
  onComplete: (data: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    nationality: string;
  }) => void;
}

export const KYCLevel1 = ({ onComplete }: KYCLevel1Props) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    nationality: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const isValid = Object.values(formData).every(value => value !== '');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Vérification d'identité</h1>
        <p className="text-gray-600 mt-1">Étape 1 sur 2</p>
        <div className="mt-4 flex gap-2">
          <div className="h-2 flex-1 bg-indigo-600 rounded-full"></div>
          <div className="h-2 flex-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Prénom
              </div>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Jean"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nom
              </div>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Mbella"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date de naissance
              </div>
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Adresse
              </div>
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              placeholder="Votre adresse complète"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Nationalité
              </div>
            </label>
            <select
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="">Sélectionner</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuer
        </button>
      </div>
    </div>
  );
};
