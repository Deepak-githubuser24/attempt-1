import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Scanner = () => {
  const [reportText, setReportText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportText.trim()) {
      toast.error('மருத்துவ அறிக்கை விவரங்களை உள்ளிடவும்');
      return;
    }

    setLoading(true);
    
    // Simulate analysis
    setTimeout(() => {
      const mockAnalysis = {
        summary: 'உங்கள் அறிக்கையின் அடிப்படையில், உங்கள் ஆரோக்கிய குறிகாட்டிகள் பொதுவாக சாதாரணமாக உள்ளன.',
        recommendations: [
          'தொடர்ந்து வழக்கமான உடற்பயிற்சி செய்து சமச்சீர் உணவு முறையை பின்பற்றவும்',
          'வாரத்திற்கு ஒருமுறை இரத்த அழுத்தத்தை கண்காணிக்கவும்',
          '3 மாதங்களில் மீண்டும் பரிசோதனை செய்யவும்',
          'போதுமான தண்ணீர் குடித்து போதுமான தூக்கம் பெறுங்கள்'
        ],
        riskLevel: 'குறைவு',
        nextSteps: 'வழக்கமான பரிசோதனைக்காக உங்கள் முதன்மை மருத்துவரை அணுகவும்'
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
      toast.success('பகுப்பாய்வு வெற்றிகரமாக முடிந்தது!');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">{t('scan.title')}</h1>
        <p className="text-medical-600 mt-2">
          உங்கள் மருத்துவ அறிக்கையின் விவரங்களை உள்ளிட்டு AI பகுப்பாய்வு பெறுங்கள்
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">
              அறிக்கை விவரங்கள் உள்ளிடவும்
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="reportText" className="block text-sm font-medium text-medical-700 mb-2">
                மருத்துவ அறிக்கை உரை
              </label>
              <textarea
                id="reportText"
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                rows={10}
                className="input-field resize-none"
                placeholder="உங்கள் மருத்துவ அறிக்கையின் விவரங்களை இங்கே உள்ளிடவும்... (எ.கா: இரத்த அழுத்தம்: 120/80, இதய துடிப்பு: 72 bpm, இரத்த சர்க்கரை: 95 mg/dL)"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>பகுப்பாய்வு செய்கிறது...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>அறிக்கையை பகுப்பாய்வு செய்யுங்கள்</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Analysis Results */}
        <div className="card">
          <h2 className="text-xl font-semibold text-medical-800 mb-4">
            பகுப்பாய்வு முடிவுகள்
          </h2>

          {!analysis && !loading && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-medical-300 mx-auto mb-4" />
              <p className="text-medical-500">
                AI பகுப்பாய்வு பெற உங்கள் மருத்துவ அறிக்கையின் விவரங்களை உள்ளிடவும்
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-medical-600">உங்கள் அறிக்கையை பகுப்பாய்வு செய்கிறது...</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <h3 className="font-semibold text-medical-800 mb-2">சுருக்கம்</h3>
                <p className="text-medical-700">{analysis.summary}</p>
              </div>

              {/* Risk Level */}
              <div>
                <h3 className="font-semibold text-medical-800 mb-2">ஆபத்து நிலை</h3>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-700 font-medium">
                    {analysis.riskLevel} ஆபத்து
                  </span>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold text-medical-800 mb-2">பரிந்துரைகள்</h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-medical-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div>
                <h3 className="font-semibold text-medical-800 mb-2">அடுத்த படிகள்</h3>
                <p className="text-medical-700">{analysis.nextSteps}</p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-medical-200">
                <button className="btn-primary w-full">
                  மருத்துவரை அணுகவும்
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;