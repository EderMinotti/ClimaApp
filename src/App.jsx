import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { useEffect, useState } from "react";
import { ContainerCard } from "./components/ContainerCard";
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

  // Fetch por cidade
  useEffect(() => {
    const city = encodeURIComponent(cidade);

    async function weatherFetch() {
      try {
        setLoading(true);

        // URL sempre como string válida
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();

        if (data) {
          setWeather(data.results);
        }
      } catch (error) {
        console.error("erro na requisição", error);
      } finally {
        setLoading(false);
      }
    }

    weatherFetch();
  }, [cidade]);

  // Fetch por localização
  async function climaPorLocalizacao() {
    try {
      setLoading(true);

      // Geolocalização precisa de await
      const { latitude: lat, longitude: lon } = await geolocation();

      // Confirma a URL antes de enviar
      const url = `/api/weather?lat=${lat}&lon=${lon}`;
      console.log("Fetching URL:", url);

      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        setWeather(data.results);
      }
    } catch (error) {
      console.error("Erro ao buscar por localização", error);
    } finally {
      setLoading(false);
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
