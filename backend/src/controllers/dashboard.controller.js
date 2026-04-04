export const getDashboard = async (req, res) => {
  const { lat, lon } = req.query;
  let temp = 35;
  let rain = 80;
  let wind = 0;
  let clouds = 0;
  let zone = "Unknown";

  try {
    if (lat && lon) {
      const apiKey = process.env.OPENWEATHER_API_KEY || 'YOUR_API_KEY';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const data = await response.json();
      
      zone = data.name || "Unknown";
      temp = data.main.temp - 273; // Celsius
      rain = data.rain?.['1h'] || 0;
      wind = data.wind?.speed || 0;
      clouds = data.clouds?.all || 0;
    }
  } catch (error) {
    // Fallback on fail
    rain = 80;
    temp = 35;
    wind = 15;
    clouds = 95;
  }

  const triggers = [];

  if (rain > 5) {
    triggers.push("HEAVY_RAIN");
  }

  if (temp > 40) {
    triggers.push("EXTREME_HEAT");
  }

  if (wind > 10) {
    triggers.push("HIGH_WIND");
  }

  if (clouds > 90) {
    triggers.push("LOW_VISIBILITY");
  }

  let riskLevel = "LOW";
  let premium = 100;

  if (triggers.length >= 2) {
    riskLevel = "HIGH";
    premium = 180;
  } else if (triggers.length === 1) {
    riskLevel = "MEDIUM";
    premium = 140;
  }

  const claim = {
    status: "NONE",
    amount: 0
  };

  if (triggers.length > 0) {
    claim.status = "APPROVED";
    claim.amount = triggers.length * 100;
  }

  res.status(200).json({
    riskLevel,
    premium,
    triggers,
    claim,
    temp,
    rain,
    wind,
    clouds,
    activeZone: zone
  });
};
