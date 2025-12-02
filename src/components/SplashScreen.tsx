import { CreditCard } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  setTimeout(onComplete, 2000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center">
      <div className="text-center animate-pulse">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-6 rounded-3xl shadow-2xl">
            <CreditCard className="w-16 h-16 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">MbotamaPay</h1>
        <p className="text-indigo-200 text-lg">Transferts instantanés</p>
      </div>
    </div>
  );
};
