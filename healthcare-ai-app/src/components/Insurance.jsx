import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, FileText, Clock, CheckCircle } from 'lucide-react';

const Insurance = () => {
  const { t } = useTranslation();

  const claims = [
    {
      id: 1,
      type: 'மருத்துவமனை பில்',
      amount: '₹15,000',
      status: 'approved',
      date: '2024-07-05',
      hospital: 'அப்போலோ மருத்துவமனை'
    },
    {
      id: 2,
      type: 'மருந்து பில்',
      amount: '₹2,500',
      status: 'processing',
      date: '2024-07-06',
      hospital: 'அப்போலோ மருந்தகம்'
    }
  ];

  const insuranceInfo = {
    policyNumber: 'HLT123456789',
    provider: 'ஸ்டார் ஹெல்த் இன்சூரன்ஸ்',
    coverage: '₹5,00,000',
    expiry: '2025-03-15'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">{t('insurance.title')}</h1>
        <p className="text-medical-600 mt-2">உங்கள் காப்பீடு தகவல்கள் மற்றும் கோரிக்கைகள்</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Insurance Info */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">காப்பீடு விவரங்கள்</h2>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-medical-600">கொள்கை எண்</p>
              <p className="font-semibold text-medical-800">{insuranceInfo.policyNumber}</p>
            </div>
            <div>
              <p className="text-sm text-medical-600">காப்பீட்டு நிறுவனம்</p>
              <p className="font-semibold text-medical-800">{insuranceInfo.provider}</p>
            </div>
            <div>
              <p className="text-sm text-medical-600">கவரேஜ் அளவு</p>
              <p className="font-semibold text-primary-600 text-lg">{insuranceInfo.coverage}</p>
            </div>
            <div>
              <p className="text-sm text-medical-600">காலாவதி</p>
              <p className="font-semibold text-medical-800">{insuranceInfo.expiry}</p>
            </div>
          </div>
        </div>

        {/* Claims List */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-medical-800">கோரிக்கைகள்</h2>
            <button className="btn-primary">
              புதிய கோரிக்கை
            </button>
          </div>

          <div className="space-y-4">
            {claims.map((claim) => (
              <div key={claim.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-primary-100 rounded-full p-2">
                        <FileText className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-medical-800">{claim.type}</h3>
                        <p className="text-sm text-medical-600">{claim.hospital}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 text-sm text-medical-600">
                      <span>கோரிக்கை #{claim.id}</span>
                      <span>{claim.date}</span>
                      <span className="font-semibold text-primary-600">{claim.amount}</span>
                    </div>
                  </div>

                  <div className="ml-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                      claim.status === 'approved' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {claim.status === 'approved' ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      <span>
                        {claim.status === 'approved' ? 'அங்கீகரிக்கப்பட்டது' : 'செயலாக்கத்தில்'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;