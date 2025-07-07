import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, User, MapPin, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const Appointments = () => {
  const { t } = useTranslation();
  const [showBooking, setShowBooking] = useState(false);
  const [formData, setFormData] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    reason: ''
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. முத்து குமார்',
      specialty: 'இதய மருத்துவர்',
      date: '2024-07-08',
      time: '10:30 AM',
      hospital: 'அரசு பொது மருத்துவமனை',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. ப்ரியா ஷர்மா',
      specialty: 'தோல் மருத்துவர்',
      date: '2024-07-10',
      time: '2:00 PM',
      hospital: 'சிட்டி மெடிக்கல் சென்டர்',
      status: 'pending'
    }
  ]);

  const doctors = [
    { name: 'Dr. முத்து குமார்', specialty: 'இதய மருத்துவர்' },
    { name: 'Dr. ப்ரியா ஷர்மா', specialty: 'தோல் மருத்துவர்' },
    { name: 'Dr. ராஜேஷ் குப்தா', specialty: 'எலும்பு மருத்துவர்' },
    { name: 'Dr. லக்ஷ்மி நாயர்', specialty: 'பெண்கள் மருத்துவர்' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: appointments.length + 1,
      doctor: formData.doctor,
      specialty: doctors.find(d => d.name === formData.doctor)?.specialty || '',
      date: formData.date,
      time: formData.time,
      hospital: 'அரசு பொது மருத்துவமனை',
      status: 'pending'
    };
    
    setAppointments([...appointments, newAppointment]);
    toast.success('அப்பாயிண்ட்மெண்ட் வெற்றிகரமாக பதிவு செய்யப்பட்டது!');
    setShowBooking(false);
    setFormData({ doctor: '', specialty: '', date: '', time: '', reason: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-medical-900">{t('appointments.title')}</h1>
          <p className="text-medical-600 mt-2">மருத்துவர்களுடன் அப்பாயிண்ட்மெண்ட் பதிவு செய்யுங்கள்</p>
        </div>
        <button
          onClick={() => setShowBooking(!showBooking)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>{t('appointments.book')}</span>
        </button>
      </div>

      {/* Booking Form */}
      {showBooking && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-medical-800 mb-4">புதிய அப்பாயிண்ட்மெண்ட்</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-medical-700 mb-1">
                மருத்துவர்
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">மருத்துவரைத் தேர்ந்தெடுக்கவும்</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor.name}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-medical-700 mb-1">
                {t('appointments.date')}
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-medical-700 mb-1">
                {t('appointments.time')}
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">நேரத்தைத் தேர்ந்தெடுக்கவும்</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-medical-700 mb-1">
                {t('appointments.reason')}
              </label>
              <input
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="பிரச்சனையை விவரிக்கவும்"
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="btn-primary">
                அப்பாயிண்ட்மெண்ட் பதிவு செய்யுங்கள்
              </button>
              <button
                type="button"
                onClick={() => setShowBooking(false)}
                className="btn-secondary ml-4"
              >
                {t('common.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Appointments List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-medical-800">உங்கள் அப்பாயிண்ட்மெண்ட்கள்</h2>
        {appointments.map((appointment) => (
          <div key={appointment.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-primary-100 rounded-full p-2">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-medical-800">{appointment.doctor}</h3>
                    <p className="text-sm text-medical-600">{appointment.specialty}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center space-x-2 text-sm text-medical-600">
                    <Calendar className="h-4 w-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-medical-600">
                    <Clock className="h-4 w-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-medical-600">
                    <MapPin className="h-4 w-4" />
                    <span>{appointment.hospital}</span>
                  </div>
                </div>
              </div>

              <div className="ml-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {appointment.status === 'confirmed' ? 'உறுதி செய்யப்பட்டது' : 'நிலுவையில்'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;