import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface OTPScreenProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onBack: () => void;
}

export const OTPScreen = ({ phoneNumber, onVerify, onResend, onBack }: OTPScreenProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(digit => digit !== '') && newOtp.length === 6) {
      onVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Code de vérification
            </h1>
            <p className="text-gray-600">
              Entrez le code envoyé au {phoneNumber}
            </p>
          </div>

          <div className="flex gap-3 justify-center mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-semibold bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            ))}
          </div>

          <button
            onClick={onResend}
            className="w-full text-indigo-600 font-medium hover:text-indigo-700 active:scale-95 transition-all"
          >
            Renvoyer le code
          </button>
        </div>
      </div>
    </div>
  );
};
