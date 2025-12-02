import { useEffect } from 'react';
import { CheckCircle, Loader } from 'lucide-react';

interface KYCVerifyingProps {
  onComplete: () => void;
}

export const KYCVerifying = ({ onComplete }: KYCVerifyingProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="bg-indigo-100 p-6 rounded-3xl">
              <CheckCircle className="w-16 h-16 text-indigo-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
              <Loader className="w-6 h-6 text-indigo-600 animate-spin" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Vérification en cours...
        </h1>

        <p className="text-gray-600 mb-8">
          Nous vérifions vos documents. Cela ne prendra que quelques instants.
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Analyse des documents</span>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl p-4">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Vérification de l'identité</span>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl p-4">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-500">Finalisation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
