import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { useEffect, useState } from "react";
import { ContainerCard } from "./components/containerCard";
import { CardPrevisaoFutura } from "./components/CardPrevisaoFutura";
import { converterDiaSemana } from "./components/Hooks/converterDiaSemana";
import { Loading } from "./components/Loading";
import { Sunrise } from "./components/Sunrise";
import { Localizacao } from "./components/Localizacao";
import { geolocation } from "./components/Hooks/geolocation";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cidade, setCidade] = useState("São Paulo");

  useEffect(() => {
    const city = encodeURIComponent(cidade);

    async function weatherFetch() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/weather?city_name=${city}&key=${API_KEY}`
        );
        const data = await response.json();
        if (data) {
          setWeather(data.results);
          setLoading(false);
        }
      } catch (error) {
        console.error("erro na requisição", error);
      }
    }
    weatherFetch();
  }, [cidade]);

  
    async function climaPorLocalizacao() {
      try {
        const { lat, lon } = await geolocation();
        const response = await fetch(
          `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        if (data) {
          setWeather(data.results);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar por localização", error);
      }
    }
  

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app-container">
      <SearchBar alterarCidade={setCidade} />
      <Localizacao climaPorLocalizacao={climaPorLocalizacao} />
      {weather && <h1>{weather.city}</h1>}
      {weather && <Sunrise dados={weather} />}
      {weather && <WeatherCard weather={weather} />}
      <ContainerCard>
        {weather &&
          weather.forecast.map((item) => (
            <CardPrevisaoFutura
              key={item.date}
              dados={item}
              diaDaSemana={converterDiaSemana(item.full_date)}
            />
          ))}
      </ContainerCard>
    </div>
  );
}

export default App;
