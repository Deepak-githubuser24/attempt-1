import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pill, MapPin, Clock, Upload, ShoppingCart, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

const Pharmacy = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('order');
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orders, setOrders] = useState([
    {
      id: 1,
      medicines: ['பாராசிட்டமால் 500mg', 'அமோக்சிசில்லின் 250mg'],
      pharmacy: 'அப்போலோ மருந்தகம்',
      status: 'delivered',
      date: '2024-07-05',
      total: '₹450'
    },
    {
      id: 2,
      medicines: ['சிட்ரிசின் 10mg', 'ஓஎம்இபிராசோல் 20mg'],
      pharmacy: 'மெட்பிளஸ் மருந்தகம்',
      status: 'processing',
      date: '2024-07-07',
      total: '₹320'
    }
  ]);

  const nearbyPharmacies = [
    { name: 'அப்போலோ மருந்தகம்', distance: '0.5 km', rating: 4.5, delivery: '30 நிமிடம்' },
    { name: 'மெட்பிளஸ் மருந்தகம்', distance: '0.8 km', rating: 4.3, delivery: '45 நிமிடம்' },
    { name: 'நெட்மெட்ஸ் மருந்தகம்', distance: '1.2 km', rating: 4.7, delivery: '25 நிமிடம்' },
    { name: 'ஃபார்மேசி ப்ளஸ்', distance: '1.5 km', rating: 4.2, delivery: '50 நிமிடம்' }
  ];

  const commonMedicines = [
    { name: 'காய்ச்சலுக்கு', medicines: ['பாராசிட்டமால்', 'இபுப்ரோஃபன்'], price: '₹80' },
    { name: 'இருமலுக்கு', medicines: ['டெக்ஸ்ட்ரோமெதார்ஃபான்', 'தேன் சிரப்'], price: '₹120' },
    { name: 'ஒவ்வாமைக்கு', medicines: ['சிட்ரிசின்', 'கலமைன் லோஷன்'], price: '₹150' }
  ];

  const handlePrescriptionUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrescriptionFile(file);
      toast.success('மருத்துவர் சீட்டு பதிவேற்றப்பட்டது!');
    }
  };

  const handleOrderSubmit = () => {
    if (!prescriptionFile) {
      toast.error('மருத்துவர் சீட்டை பதிவேற்றவும்');
      return;
    }
    if (!deliveryAddress) {
      toast.error('முகவரியை நிரப்பவும்');
      return;
    }

    const newOrder = {
      id: orders.length + 1,
      medicines: ['மருத்துவர் சீட்டு அடிப்படையில்'],
      pharmacy: 'அப்போலோ மருந்தகம்',
      status: 'processing',
      date: new Date().toISOString().split('T')[0],
      total: 'கணக்கிடப்படும்'
    };

    setOrders([newOrder, ...orders]);
    toast.success('ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது!');
    setPrescriptionFile(null);
    setDeliveryAddress('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900">{t('pharmacy.title')}</h1>
        <p className="text-medical-600 mt-2">மருந்துகளை வீட்டிலேயே பெறுங்கள்</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-medical-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'order', label: 'ஆர்டர் செய்யுங்கள்', icon: Upload },
              { id: 'common', label: 'பொதுவான மருந்துகள்', icon: Pill },
              { id: 'nearby', label: 'அருகிலுள்ள மருந்தகங்கள்', icon: MapPin },
              { id: 'orders', label: 'என் ஆர்டர்கள்', icon: ShoppingCart }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-medical-500 hover:text-medical-700'
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

      {/* Order with Prescription */}
      {activeTab === 'order' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-medical-800 mb-4">மருத்துவர் சீட்டுடன் ஆர்டர்</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-medical-700 mb-2">
                  மருத்துவர் சீட்டை பதிவேற்றவும்
                </label>
                <div className="border-2 border-dashed border-medical-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-medical-400 mb-4" />
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handlePrescriptionUpload}
                    className="hidden"
                    id="prescription-upload"
                  />
                  <label
                    htmlFor="prescription-upload"
                    className="cursor-pointer text-primary-600 hover:text-primary-700"
                  >
                    புகைப்படம் அல்லது PDF பதிவேற்றவும்
                  </label>
                  {prescriptionFile && (
                    <p className="mt-2 text-sm text-green-600">
                      ✓ {prescriptionFile.name} பதிவேற்றப்பட்டது
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-medical-700 mb-2">
                  டெலிவரி முகவரி
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  rows={3}
                  className="input-field"
                  placeholder="உங்கள் முழு முகவரியை எழுதுங்கள்..."
                />
              </div>

              <button
                onClick={handleOrderSubmit}
                className="btn-primary w-full"
              >
                ஆர்டர் செய்யுங்கள்
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Common Medicines */}
      {activeTab === 'common' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {commonMedicines.map((category, index) => (
            <div key={index} className="card">
              <h3 className="font-semibold text-medical-800 mb-2">{category.name}</h3>
              <ul className="space-y-1 mb-4">
                {category.medicines.map((medicine, idx) => (
                  <li key={idx} className="text-sm text-medical-600">• {medicine}</li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-primary-600">{category.price}</span>
                <button className="btn-primary text-sm px-4 py-2">
                  ஆர்டர் செய்யுங்கள்
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nearby Pharmacies */}
      {activeTab === 'nearby' && (
        <div className="space-y-4">
          {nearbyPharmacies.map((pharmacy, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-medical-800">{pharmacy.name}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-medical-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{pharmacy.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{pharmacy.delivery}</span>
                    </div>
                    <div>
                      ⭐ {pharmacy.rating}
                    </div>
                  </div>
                </div>
                <button className="btn-primary">
                  தேர்ந்தெடுக்கவும்
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* My Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="h-5 w-5 text-primary-600" />
                    <span className="font-semibold text-medical-800">
                      ஆர்டர் #{order.id}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === 'delivered' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status === 'delivered' ? 'டெலிவர் செய்யப்பட்டது' : 'செயலாக்கத்தில்'}
                    </span>
                  </div>
                  <p className="text-sm text-medical-600 mb-2">
                    மருந்துகள்: {order.medicines.join(', ')}
                  </p>
                  <p className="text-sm text-medical-600">
                    மருந்தகம்: {order.pharmacy}
                  </p>
                  <p className="text-sm text-medical-600">
                    தேதி: {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary-600">{order.total}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pharmacy;