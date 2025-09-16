import React from 'react';

const PhoneStatusBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-15 py-4 bg-black/50 backdrop-blur-sm">
      <span className="text-white text-sm font-semibold">9:41</span>
      <div className="flex items-center">
        <img src="/phone/cellular.svg" alt="Signal" className="w-4 h-3" />
        <img src="/phone/wifi.svg" alt="WiFi" className="w-4 h-3 ml-2" />
        <img src="/phone/battery.svg" alt="Battery" className="w-6 h-3 ml-1" />
      </div>
    </div>
  );
};

export default PhoneStatusBar;
