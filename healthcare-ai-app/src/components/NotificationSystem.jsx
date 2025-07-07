import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const NotificationSystem = () => {
  useEffect(() => {
    // Show initial notification after 3 seconds
    const timer1 = setTimeout(() => {
      toast('💧 தண்ணீர் குடிக்கும் நேரம்! ஹைட்ரேட்டாக இருங்கள்.', {
        duration: 4000,
        icon: '💧',
      });
    }, 3000);

    // Show medicine reminder after 10 seconds
    const timer2 = setTimeout(() => {
      toast('💊 உங்கள் மருந்தை மறக்காதீர்கள்.', {
        duration: 4000,
        icon: '💊',
      });
    }, 10000);

    // Show exercise reminder after 20 seconds
    const timer3 = setTimeout(() => {
      toast('🏃‍♂️ தினசரி உடற்பயிற்சி நேரம்!', {
        duration: 4000,
        icon: '🏃‍♂️',
      });
    }, 20000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default NotificationSystem;