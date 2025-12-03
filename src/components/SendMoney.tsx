import { useState } from 'react';
import { ArrowLeft, User, DollarSign, CreditCard, CheckCircle } from 'lucide-react';
import { Contact, PaymentMethod } from '../types';
import { mockContacts, mockPaymentMethods } from '../mocks/data';
import { RippleButton } from './RippleButton';

interface SendMoneyProps {
  onBack: () => void;
  onComplete: () => void;
}

export const SendMoney = ({ onBack, onComplete }: SendMoneyProps) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [recipient, setRecipient] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const fees = amount ? Math.ceil(parseFloat(amount) * 0.01) : 0;
  const total = amount ? parseFloat(amount) + fees : 0;

  const handleNext = () => {
    if (step < 4) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleConfirm = () => {
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <div className="px-6 py-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={step === 1 ? onBack : () => setStep((step - 1) as 1 | 2 | 3 | 4)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex-1">Envoyer de l'argent</h1>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-colored' : 'bg-gray-200'
                }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {step === 1 && (
          <RecipientStep
            contacts={mockContacts}
            selected={recipient}
            onSelect={(contact) => {
              setRecipient(contact);
              handleNext();
            }}
          />
        )}
        {step === 2 && (
          <AmountStep
            amount={amount}
            onAmountChange={setAmount}
            onNext={handleNext}
          />
        )}
        {step === 3 && (
          <PaymentMethodStep
            methods={mockPaymentMethods}
            selected={paymentMethod}
            onSelect={(method) => {
              setPaymentMethod(method);
              handleNext();
            }}
          />
        )}
        {step === 4 && recipient && paymentMethod && (
          <ConfirmationStep
            recipient={recipient}
            amount={parseFloat(amount)}
            fees={fees}
            total={total}
            paymentMethod={paymentMethod}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  );
};

interface RecipientStepProps {
  contacts: Contact[];
  selected: Contact | null;
  onSelect: (contact: Contact) => void;
}

const RecipientStep = ({ contacts, onSelect }: RecipientStepProps) => {
  return (
    <div className="px-6 py-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Sélectionner un destinataire</h2>
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <button
            key={contact.id}
            onClick={() => onSelect(contact)}
            className="stagger-item w-full bg-white dark:bg-gray-800 rounded-2xl p-5 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {contact.name[0]}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">{contact.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{contact.phone}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

interface AmountStepProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  onNext: () => void;
}

const AmountStep = ({ amount, onAmountChange, onNext }: AmountStepProps) => {
  const handleNumberClick = (num: string) => {
    if (num === 'del') {
      onAmountChange(amount.slice(0, -1));
    } else {
      onAmountChange(amount + num);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center w-full">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {amount || '0'} <span className="text-3xl text-gray-500 dark:text-gray-400">XAF</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400">Entrez le montant</p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', 'del'].map((key) => (
            <button
              key={key}
              onClick={() => handleNumberClick(key)}
              className="h-16 bg-white dark:bg-gray-800 rounded-2xl font-bold text-xl text-gray-900 dark:text-white hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:shadow-lg active:scale-95 transition-all border border-gray-100 dark:border-gray-700"
            >
              {key === 'del' ? '⌫' : key}
            </button>
          ))}
        </div>
        <RippleButton
          onClick={onNext}
          disabled={!amount || parseFloat(amount) === 0}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-colored-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Continuer
        </RippleButton>
      </div>
    </div>
  );
};

interface PaymentMethodStepProps {
  methods: PaymentMethod[];
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentMethodStep = ({ methods, onSelect }: PaymentMethodStepProps) => {
  const getProviderColor = (provider: string) => {
    const colors: Record<string, string> = {
      OrangeMoney: 'bg-orange-100 text-orange-600',
      Wave: 'bg-blue-100 text-blue-600',
      MTN: 'bg-yellow-100 text-yellow-600',
      Moov: 'bg-green-100 text-green-600',
      Visa: 'bg-indigo-100 text-indigo-600',
      Mastercard: 'bg-red-100 text-red-600',
    };
    return colors[provider] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="px-6 py-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Source de paiement</h2>
      <p className="text-gray-600 mb-6">Sélectionnez la source à débiter</p>
      <div className="space-y-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method)}
            className="w-full bg-white rounded-xl p-5 flex items-center gap-4 hover:bg-gray-50 active:scale-95 transition-all border-2 border-gray-200"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getProviderColor(method.provider)}`}>
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">{method.provider}</h3>
              <p className="text-sm text-gray-600">
                {method.type === 'Card' ? 'Carte' : 'Mobile Money'} •••• {method.lastDigits}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

interface ConfirmationStepProps {
  recipient: Contact;
  amount: number;
  fees: number;
  total: number;
  paymentMethod: PaymentMethod;
  onConfirm: () => void;
}

const ConfirmationStep = ({
  recipient,
  amount,
  fees,
  total,
  paymentMethod,
  onConfirm,
}: ConfirmationStepProps) => {
  return (
    <div className="px-6 py-6 flex flex-col h-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Confirmer le transfert</h2>

      <div className="flex-1">
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
              {recipient.name[0]}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{recipient.name}</h3>
              <p className="text-gray-600">{recipient.phone}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Montant</span>
              <span className="font-semibold text-gray-900">{amount.toLocaleString()} XAF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Frais</span>
              <span className="font-semibold text-gray-900">{fees.toLocaleString()} XAF</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-indigo-600 text-xl">{total.toLocaleString()} XAF</span>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-900 mb-1">Source de paiement</p>
            <p className="text-sm text-indigo-700">
              {paymentMethod.provider} •••• {paymentMethod.lastDigits}
            </p>
          </div>
        </div>
      </div>

      <RippleButton
        onClick={onConfirm}
        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
      >
        <CheckCircle className="w-5 h-5" />
        Confirmer le transfert
      </RippleButton>
    </div>
  );
};
