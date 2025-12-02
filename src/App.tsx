import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { OTPScreen } from './components/OTPScreen';
import { KYCLevel1 } from './components/KYCLevel1';
import { KYCLevel2 } from './components/KYCLevel2';
import { KYCVerifying } from './components/KYCVerifying';
import { Dashboard } from './components/Dashboard';
import { SendMoney } from './components/SendMoney';
import { HistoryScreen } from './components/HistoryScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { User } from './types';

type Screen =
  | 'splash'
  | 'login'
  | 'otp'
  | 'kyc1'
  | 'kyc2'
  | 'kycVerifying'
  | 'dashboard'
  | 'send'
  | 'history'
  | 'settings'
  | 'success';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    document.title = 'MbotamaPay - Transferts instantanés';
  }, []);

  const handleLoginContinue = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentScreen('otp');
  };

  const handleOTPVerify = (otp: string) => {
    if (otp.length >= 4) {
      setUser({
        id: '1',
        phone: phoneNumber,
        kycLevel: 0,
      });
      setCurrentScreen('kyc1');
    }
  };

  const handleKYC1Complete = (data: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    nationality: string;
  }) => {
    if (user) {
      setUser({
        ...user,
        ...data,
        kycLevel: 1,
      });
    }
    setCurrentScreen('kyc2');
  };

  const handleKYC2Complete = () => {
    setCurrentScreen('kycVerifying');
  };

  const handleKYCVerified = () => {
    if (user) {
      setUser({
        ...user,
        kycLevel: 2,
      });
    }
    setCurrentScreen('dashboard');
  };

  const handleSendComplete = () => {
    setCurrentScreen('success');
  };

  const handleSuccessComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('login')} />;
      case 'login':
        return <LoginScreen onContinue={handleLoginContinue} />;
      case 'otp':
        return (
          <OTPScreen
            phone={phoneNumber}
            onVerify={handleOTPVerify}
            onBack={() => setCurrentScreen('login')}
          />
        );
      case 'kyc1':
        return <KYCLevel1 onComplete={handleKYC1Complete} />;
      case 'kyc2':
        return <KYCLevel2 onComplete={handleKYC2Complete} />;
      case 'kycVerifying':
        return <KYCVerifying onComplete={handleKYCVerified} />;
      case 'dashboard':
        return user ? (
          <Dashboard user={user} onNavigate={setCurrentScreen} />
        ) : null;
      case 'send':
        return (
          <SendMoney
            onBack={() => setCurrentScreen('dashboard')}
            onComplete={handleSendComplete}
          />
        );
      case 'history':
        return <HistoryScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'settings':
        return user ? (
          <SettingsScreen
            user={user}
            onBack={() => setCurrentScreen('dashboard')}
            onLogout={handleLogout}
          />
        ) : null;
      case 'success':
        return <SuccessScreen onComplete={handleSuccessComplete} />;
      default:
        return <SplashScreen onComplete={() => setCurrentScreen('login')} />;
    }
  };

  return <div className="antialiased">{renderScreen()}</div>;
}

export default App;
