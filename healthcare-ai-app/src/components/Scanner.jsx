import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Send, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Scanner = () => {
  const [reportText, setReportText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportText.trim()) {
      toast.error('Please enter your medical report details');
      return;
    }

    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        summary: 'Based on your report, your health indicators are generally normal.',
        recommendations: [
          'Continue regular exercise and maintain a balanced diet',
          'Monitor blood pressure weekly',
          'Schedule follow-up in 3 months',
          'Stay hydrated and get adequate sleep'
        ],
        riskLevel: 'low',
        nextSteps: 'Consult with your primary care physician for routine check-up'
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
      toast.success('Analysis completed successfully!');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">{t('scan.title')}</h1>
        <p className="text-medical-600 mt-2">
          {t('scan.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">
              Enter Report Details
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="reportText" className="block text-sm font-medium text-medical-700 mb-2">
                Medical Report Text
              </label>
              <textarea
                id="reportText"
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                rows={10}
                className="input-field resize-none"
                placeholder="Enter your medical report details here... (e.g., Blood pressure: 120/80, Heart rate: 72 bpm, Blood sugar: 95 mg/dL)"
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
                  <span>{t('scan.analyzing')}</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Analyze Report</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Analysis Results */}
        <div className="card">
          <h2 className="text-xl font-semibold text-medical-800 mb-4">
            {t('scan.results')}
          </h2>

          {!analysis && !loading && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-medical-300 mx-auto mb-4" />
              <p className="text-medical-500">
                Enter your medical report details to get AI analysis
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-medical-600">{t('scan.analyzing')}</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <h3 className="font-semibold text-medical-800 mb-2">Summary</h3>
                <p className="text-medical-700">{analysis.summary}</p>
              </div>

              {/* Risk Level */}
              <div>
                <h3 className="font-semibold text-medical-800 mb-2">Risk Level</h3>
                <div className="flex items-center space-x-2">
                  {analysis.riskLevel === 'low' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                  <span className={`capitalize font-medium ${
                    analysis.riskLevel === 'low' ? 'text-green-700' : 'text-yellow-700'
                  }`}>
                    {analysis.riskLevel} Risk
                  </span>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold text-medical-800 mb-2">
                  {t('scan.recommendations')}
                </h3>
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
                <h3 className="font-semibold text-medical-800 mb-2">Next Steps</h3>
                <p className="text-medical-700">{analysis.nextSteps}</p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-medical-200">
                <button className="btn-primary w-full">
                  {t('scan.consultDoctor')}
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