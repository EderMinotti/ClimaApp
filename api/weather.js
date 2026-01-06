/* eslint-env node */


export default async function handler(req, res) {
  try {
    const { city, lat, lon } = req.query;

    let url = "https://api.hgbrasil.com/weather?format=json-cors";

    if (city) {
      url += `&city_name=${city}`;
    }

    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    }

    url += `&key=${process.env.WEATHER_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar clima" });
  }
}
