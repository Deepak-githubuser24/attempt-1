import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Activity, 
  Heart, 
  Scale, 
  Thermometer, 
  Gauge,
  Plus,
  TrendingUp
} from 'lucide-react';

const HealthTracking = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('vitals');

  // Mock health data
  const vitalSigns = [
    {
      id: 1,
      type: 'bloodPressure',
      icon: Gauge,
      label: t('health.bloodPressure'),
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 2,
      type: 'heartRate',
      icon: Heart,
      label: t('health.heartRate'),
      value: '72',
      unit: 'bpm',
      status: 'normal',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 3,
      type: 'weight',
      icon: Scale,
      label: t('health.weight'),
      value: '70.5',
      unit: 'kg',
      status: 'normal',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 4,
      type: 'temperature',
      icon: Thermometer,
      label: t('health.temperature'),
      value: '98.6',
      unit: '°F',
      status: 'normal',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const activityData = {
    steps: { value: 8423, goal: 10000, unit: 'steps' },
    calories: { value: 1850, goal: 2200, unit: 'cal' },
    distance: { value: 6.2, goal: 8.0, unit: 'km' },
    activeMinutes: { value: 45, goal: 60, unit: 'min' }
  };

  const tabs = [
    { id: 'vitals', label: t('health.vitals'), icon: Heart },
    { id: 'activity', label: t('health.activity'), icon: Activity }
  ];

  const VitalCard = ({ vital }) => {
    const IconComponent = vital.icon;
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${vital.bgColor}`}>
            <IconComponent className={`h-6 w-6 ${vital.color}`} />
          </div>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            vital.status === 'normal' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {vital.status}
          </span>
        </div>
        <h3 className="text-sm font-medium text-medical-600 mb-1">{vital.label}</h3>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-medical-900">{vital.value}</span>
          <span className="text-sm text-medical-500">{vital.unit}</span>
        </div>
      </div>
    );
  };

  const ActivityCard = ({ title, value, goal, unit }) => {
    const percentage = (value / goal) * 100;
    return (
      <div className="card">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-medical-600">{title}</h3>
          <span className="text-xs text-medical-500">{goal} {unit}</span>
        </div>
        <div className="flex items-baseline space-x-1 mb-3">
          <span className="text-2xl font-bold text-medical-900">{value.toLocaleString()}</span>
          <span className="text-sm text-medical-500">{unit}</span>
        </div>
        <div className="w-full bg-medical-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-medical-600">
          {Math.round(percentage)}% of goal
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">{t('health.title')}</h1>
        <p className="text-medical-600 mt-2">
          Track your vital signs and daily activity
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-medical-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-medical-500 hover:text-medical-700 hover:border-medical-300'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Vital Signs Tab */}
      {activeTab === 'vitals' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vitalSigns.map((vital) => (
              <VitalCard key={vital.id} vital={vital} />
            ))}
          </div>

          {/* Add New Reading */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-medical-800">Add New Reading</h2>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Reading</span>
              </button>
            </div>
            <p className="text-medical-600">
              Manually enter your latest vital sign measurements.
            </p>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ActivityCard 
              title="Steps" 
              value={activityData.steps.value} 
              goal={activityData.steps.goal} 
              unit={activityData.steps.unit} 
            />
            <ActivityCard 
              title="Calories" 
              value={activityData.calories.value} 
              goal={activityData.calories.goal} 
              unit={activityData.calories.unit} 
            />
            <ActivityCard 
              title="Distance" 
              value={activityData.distance.value} 
              goal={activityData.distance.goal} 
              unit={activityData.distance.unit} 
            />
            <ActivityCard 
              title="Active Minutes" 
              value={activityData.activeMinutes.value} 
              goal={activityData.activeMinutes.goal} 
              unit={activityData.activeMinutes.unit} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTracking;