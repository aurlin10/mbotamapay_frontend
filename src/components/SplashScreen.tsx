import { useEffect } from 'react';
import { CreditCard } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-animated flex items-center justify-center overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-bounce-subtle"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>

      <div className="text-center relative z-10 animate-scale-in">
        <div className="flex justify-center mb-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl animate-bounce-subtle ring-8 ring-white/20">
            <CreditCard className="w-20 h-20 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">MbotamaPay</h1>
        <p className="text-white/90 text-xl font-medium">Transferts instantanés</p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};
