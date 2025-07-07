import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Globe, Bell, Shield, HelpCircle, Info } from 'lucide-react';

const Settings = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">{t('settings.title')}</h1>
        <p className="text-medical-600 mt-2">உங்கள் கணக்கு மற்றும் ஆப் அமைப்புகள்</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">சுயவிவரம்</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-medical-700 mb-1">
                பெயர்
              </label>
              <input 
                type="text" 
                className="input-field" 
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-medical-700 mb-1">
                மின்னஞ்சல்
              </label>
              <input 
                type="email" 
                className="input-field" 
                defaultValue="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-medical-700 mb-1">
                தொலைபேசி
              </label>
              <input 
                type="tel" 
                className="input-field" 
                defaultValue="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-medical-700 mb-1">
                வயது
              </label>
              <input 
                type="number" 
                className="input-field" 
                defaultValue="35"
              />
            </div>
          </div>
          <button className="btn-primary mt-4">
            {t('common.save')}
          </button>
        </div>

        {/* Language Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">{t('settings.language')}</h2>
          </div>
          <p className="text-medical-600 mb-4">உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  i18n.language === lang.code
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-medical-200 hover:border-medical-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="font-medium">{lang.name}</div>
                    {i18n.language === lang.code && (
                      <div className="text-xs text-primary-600">தற்போது தேர்ந்தெடுக்கப்பட்டது</div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">{t('settings.notifications')}</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: 'தண்ணீர் நினைவூட்டல்', checked: true },
              { label: 'மருந்து நினைவூட்டல்', checked: true },
              { label: 'அப்பாயிண்ட்மென்ட் நினைவூட்டல்', checked: true },
              { label: 'உடற்பயிற்சி நினைவூட்டல்', checked: false }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-medical-700">{item.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    defaultChecked={item.checked}
                  />
                  <div className="w-11 h-6 bg-medical-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">{t('settings.privacy')}</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 border border-medical-200 rounded-lg hover:bg-medical-50">
              தரவு பாதுகாப்பு மற்றும் கொள்கை
            </button>
            <button className="w-full text-left p-3 border border-medical-200 rounded-lg hover:bg-medical-50">
              கணக்கு நீக்கம்
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">{t('settings.support')}</h2>
          </div>
          <div className="bg-primary-50 p-4 rounded-lg">
            <p className="text-primary-800 font-medium">24/7 வாடிக்கையாளர் சேவை</p>
            <p className="text-primary-700 text-sm mt-1">
              உங்கள் தாய்மொழியில் உதவி பெறுங்கள்
            </p>
            <div className="flex space-x-4 mt-3">
              <button className="btn-primary text-sm">
                📞 அழைக்கவும்
              </button>
              <button className="btn-secondary text-sm">
                💬 சாட் செய்யுங்கள்
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-medical-800">{t('settings.about')}</h2>
          </div>
          <div className="text-sm text-medical-600 space-y-2">
            <p>AI Health Care v1.0</p>
            <p>உங்கள் நம்பகமான ஆரோக்கிய துணையாளர்</p>
            <p>தேவையான உரிமங்கள்: HIPAA, ISO 27001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;