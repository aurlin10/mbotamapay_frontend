import { useState } from 'react';
import { Upload, CheckCircle, Camera, CreditCard, ArrowLeft } from 'lucide-react';

interface KYCLevel2Props {
  onComplete: () => void;
  onBack: () => void;
}

export const KYCLevel2 = ({ onComplete, onBack }: KYCLevel2Props) => {
  const [uploads, setUploads] = useState({
    idFront: false,
    idBack: false,
    selfie: false,
  });

  const handleUpload = (type: keyof typeof uploads) => {
    setUploads({ ...uploads, [type]: true });
  };

  const allUploaded = Object.values(uploads).every(v => v);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Vérification d'identité</h1>
        </div>
        <p className="text-gray-600 mt-1">Étape 2 sur 2</p>
        <div className="mt-4 flex gap-2">
          <div className="h-2 flex-1 bg-indigo-600 rounded-full"></div>
          <div className="h-2 flex-1 bg-indigo-600 rounded-full"></div>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-gray-700 mb-6">
            Pour finaliser votre inscription, nous avons besoin de vérifier votre identité.
          </p>

          <UploadCard
            title="Carte d'identité (Recto)"
            icon={<CreditCard className="w-6 h-6" />}
            uploaded={uploads.idFront}
            onUpload={() => handleUpload('idFront')}
          />

          <UploadCard
            title="Carte d'identité (Verso)"
            icon={<CreditCard className="w-6 h-6" />}
            uploaded={uploads.idBack}
            onUpload={() => handleUpload('idBack')}
          />

          <UploadCard
            title="Selfie avec votre pièce d'identité"
            icon={<Camera className="w-6 h-6" />}
            uploaded={uploads.selfie}
            onUpload={() => handleUpload('selfie')}
          />

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mt-6">
            <p className="text-sm text-indigo-900">
              <strong>Pourquoi ces documents ?</strong><br />
              Nous devons vérifier votre identité pour assurer la sécurité de vos transactions et respecter la réglementation.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <button
          onClick={onComplete}
          disabled={!allUploaded}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Soumettre
        </button>
      </div>
    </div>
  );
};

interface UploadCardProps {
  title: string;
  icon: React.ReactNode;
  uploaded: boolean;
  onUpload: () => void;
}

const UploadCard = ({ title, icon, uploaded, onUpload }: UploadCardProps) => {
  return (
    <button
      onClick={onUpload}
      className={`w-full p-5 rounded-xl border-2 transition-all active:scale-95 ${uploaded
          ? 'bg-green-50 border-green-500'
          : 'bg-white border-gray-300 hover:border-indigo-400'
        }`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${uploaded ? 'bg-green-100' : 'bg-gray-100'}`}>
          {uploaded ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <span className="text-gray-600">{icon}</span>
          )}
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">
            {uploaded ? 'Document téléchargé' : 'Cliquer pour télécharger'}
          </p>
        </div>
        {!uploaded && <Upload className="w-5 h-5 text-gray-400" />}
      </div>
    </button>
  );
};
