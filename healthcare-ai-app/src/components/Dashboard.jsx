import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  Heart,
  Droplets,
  Moon,
  Scan,
  Calendar,
  Pill,
  Shield,
  Clock,
  TrendingUp,
  Users,
  MapPin
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const { t } = useTranslation();

  // Mock data for dashboard
  const todayStats = {
    waterIntake: { value: 6, target: 8, unit: 'glasses' },
    steps: { value: 8423, target: 10000, unit: 'steps' },
    heartRate: { value: 72, unit: 'bpm' },
    sleep: { value: 7.5, target: 8, unit: 'hours' }
  };

  const quickActions = [
    {
      title: t('dashboard.scanReport'),
      description: 'Upload medical reports for AI analysis',
      icon: Scan,
      path: '/scan',
      color: 'bg-blue-500'
    },
    {
      title: t('dashboard.bookAppointment'),
      description: 'Schedule with specialists',
      icon: Calendar,
      path: '/appointments',
      color: 'bg-green-500'
    },
    {
      title: t('dashboard.orderMedicine'),
      description: 'Order from nearby pharmacies',
      icon: Pill,
      path: '/pharmacy',
      color: 'bg-purple-500'
    },
    {
      title: t('dashboard.trackInsurance'),
      description: 'Manage insurance claims',
      icon: Shield,
      path: '/insurance',
      color: 'bg-orange-500'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2024-07-08',
      time: '10:30 AM',
      location: 'City Medical Center',
      type: 'Follow-up'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: '2024-07-10',
      time: '2:00 PM',
      location: 'Skin Care Clinic',
      type: 'Consultation'
    }
  ];

  const healthReminders = [
    {
      id: 1,
      message: t('dashboard.drinkWater'),
      time: '2 hours ago',
      type: 'water'
    },
    {
      id: 2,
      message: t('dashboard.takeMedicine'),
      time: '6:00 PM',
      type: 'medicine'
    },
    {
      id: 3,
      message: t('dashboard.exerciseTime'),
      time: 'Daily',
      type: 'exercise'
    }
  ];

  const StatCard = ({ title, value, target, unit, icon: Icon, color }) => {
    const percentage = target ? (value / target) * 100 : 100;
    
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          {target && (
            <div className="text-right">
              <div className="text-xs text-medical-500">Target</div>
              <div className="text-sm font-medium text-medical-700">{target} {unit}</div>
            </div>
          )}
        </div>
        <div className="mb-2">
          <h3 className="text-sm font-medium text-medical-600">{title}</h3>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-medical-900">{value}</span>
            <span className="text-sm text-medical-500">{unit}</span>
          </div>
        </div>
        {target && (
          <div className="w-full bg-medical-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${color.replace('bg-', 'bg-').replace('-500', '-500')}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">
          {t('dashboard.welcome')}, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-medical-600 mt-2">
          Here's your health summary for today
        </p>
      </div>

      {/* Today's Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-medical-800 mb-4">
          {t('dashboard.todayStats')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title={t('dashboard.waterIntake')}
            value={todayStats.waterIntake.value}
            target={todayStats.waterIntake.target}
            unit={todayStats.waterIntake.unit}
            icon={Droplets}
            color="bg-blue-500"
          />
          <StatCard
            title={t('dashboard.steps')}
            value={todayStats.steps.value.toLocaleString()}
            target={todayStats.steps.target.toLocaleString()}
            unit=""
            icon={Activity}
            color="bg-green-500"
          />
          <StatCard
            title={t('dashboard.heartRate')}
            value={todayStats.heartRate.value}
            unit={todayStats.heartRate.unit}
            icon={Heart}
            color="bg-red-500"
          />
          <StatCard
            title={t('dashboard.sleep')}
            value={todayStats.sleep.value}
            target={todayStats.sleep.target}
            unit={todayStats.sleep.unit}
            icon={Moon}
            color="bg-indigo-500"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-medical-800 mb-4">
          {t('dashboard.quickActions')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className="card hover:shadow-md transition-shadow duration-200 group"
              >
                <div className={`p-3 rounded-lg ${action.color} mb-4 inline-block`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-medical-800 mb-2 group-hover:text-primary-600">
                  {action.title}
                </h3>
                <p className="text-sm text-medical-600">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-medical-800">
              {t('dashboard.upcomingAppointments')}
            </h2>
            <Link
              to="/appointments"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-medical-200 rounded-lg p-4 hover:bg-medical-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-medical-800">{appointment.doctor}</h3>
                    <p className="text-sm text-medical-600">{appointment.specialty}</p>
                  </div>
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                    {appointment.type}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-medical-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-2 text-sm text-medical-600">
                  <MapPin className="h-4 w-4" />
                  <span>{appointment.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Reminders */}
        <div className="card">
          <h2 className="text-xl font-semibold text-medical-800 mb-4">
            {t('dashboard.healthReminders')}
          </h2>
          <div className="space-y-4">
            {healthReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-start space-x-3 p-3 bg-medical-50 rounded-lg"
              >
                <div className="bg-primary-100 rounded-full p-2">
                  {reminder.type === 'water' && <Droplets className="h-4 w-4 text-primary-600" />}
                  {reminder.type === 'medicine' && <Pill className="h-4 w-4 text-primary-600" />}
                  {reminder.type === 'exercise' && <Activity className="h-4 w-4 text-primary-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-medical-800">{reminder.message}</p>
                  <p className="text-xs text-medical-600 mt-1">{reminder.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;