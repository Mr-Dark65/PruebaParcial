import { createContext, useState, useContext, useEffect } from 'react';

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('selectedCity') || 'quito';
  });

  const cities = [
    { id: 'quito', name: 'Quito' },
    { id: 'guayaquil', name: 'Guayaquil' },
    { id: 'cuenca', name: 'Cuenca' },
    { id: 'latacunga', name: 'Latacunga' }
  ];

  const handleCityChange = (city) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
  };

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity: handleCityChange, cities }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}; 