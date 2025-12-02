import { CheckCircle } from 'lucide-react';

interface SuccessScreenProps {
  onComplete: () => void;
}

export const SuccessScreen = ({ onComplete }: SuccessScreenProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-6 rounded-3xl animate-pulse">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Transfert réussi !
        </h1>

        <p className="text-gray-600 mb-8">
          Votre transfert a été effectué avec succès. Le destinataire recevra les fonds dans quelques instants.
        </p>

        <button
          onClick={onComplete}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 active:scale-95 transition-all"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};
