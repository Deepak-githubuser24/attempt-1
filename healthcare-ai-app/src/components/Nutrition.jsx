import React from 'react';
import { useTranslation } from 'react-i18next';
import { Apple, Utensils, Droplets } from 'lucide-react';

const Nutrition = () => {
  const { t } = useTranslation();

  const mealPlan = [
    {
      meal: 'காலை உணவு',
      items: ['இட்லி', 'சாம்பார்', 'தேங்காய் சட்னி', 'பழம்'],
      calories: 350,
      time: '8:00 AM'
    },
    {
      meal: 'மதிய உணவு', 
      items: ['சாதம்', 'ரசம்', 'காய் கறி', 'மோர்'],
      calories: 450,
      time: '1:00 PM'
    },
    {
      meal: 'இரவு உணவு',
      items: ['சப்பாத்தி', 'பருப்பு கறி', 'கீரை', 'தயிர்'],
      calories: 400,
      time: '8:00 PM'
    }
  ];

  const waterReminder = {
    consumed: 6,
    target: 8,
    unit: 'glasses'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">{t('nutrition.title')}</h1>
        <p className="text-medical-600 mt-2">உங்கள் ஆரோக்கியமான உணவு திட்டம்</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Meal Plan */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-medical-800">இன்றைய உணவு திட்டம்</h2>
          
          {mealPlan.map((meal, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 rounded-full p-2">
                    <Utensils className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-medical-800">{meal.meal}</h3>
                    <p className="text-sm text-medical-600">{meal.time}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary-600">
                  {meal.calories} கலோரிகள்
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {meal.items.map((item, idx) => (
                  <span key={idx} className="bg-medical-100 text-medical-700 px-3 py-1 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Water Reminder */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Droplets className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-medical-800">நீர் உட்கொள்ளல்</h3>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {waterReminder.consumed}/{waterReminder.target}
              </div>
              <p className="text-sm text-medical-600 mb-4">{waterReminder.unit} குடித்துள்ளீர்கள்</p>
              
              <div className="w-full bg-blue-100 rounded-full h-3 mb-4">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(waterReminder.consumed / waterReminder.target) * 100}%` }}
                ></div>
              </div>
              
              <button className="btn-primary w-full text-sm">
                💧 தண்ணீர் குடித்தேன்
              </button>
            </div>
          </div>

          {/* Nutrition Tips */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Apple className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-medical-800">ஊட்டச்சத்து குறிப்புகள்</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  🥗 அதிக காய்கறிகள் சாப்பிடுங்கள்
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  🚫 பதப்படுத்தப்பட்ட உணவுகளை தவிர்க்கவும்
                </p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-800">
                  🍎 ஒவ்வொரு வேளையும் பழம் சேர்க்கவும்
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="font-semibold text-medical-800 mb-4">இன்றைய சுருக்கம்</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-medical-600">மொத்த கலோரிகள்</span>
                <span className="font-semibold">1,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-medical-600">புரதம்</span>
                <span className="font-semibold">45g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-medical-600">கார்போஹைட்ரேட்</span>
                <span className="font-semibold">150g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-medical-600">கொழுப்பு</span>
                <span className="font-semibold">40g</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;