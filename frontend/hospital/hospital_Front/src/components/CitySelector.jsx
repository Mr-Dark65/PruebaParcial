import { useCity } from '../context/CityContext';

const CitySelector = () => {
  const { selectedCity, setSelectedCity, cities } = useCity();

  return (
    <div className="city-selector">
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="city-select"
      >
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector; 