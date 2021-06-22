export const getDateString = (date: string) => {
  const dt = new Date(`${date}T00:00:00`);
  const today = new Date();
  if (dt.toLocaleDateString() === today.toLocaleDateString()) {
    return "Today";
  }
  if (dt.getDate() === today.getDate() + 1) {
    return "Tomorrow";
  }
  return dt.toDateString();
};

const toCelsius = (cel: number) => `${Math.round(cel)}°C`;
const toFahrenheit = (cel: number) => `${Math.round(1.8 * cel + 32)}°F`;
export const getTemp = (cel: number, unit: string) => {
  if (!cel && cel !== 0) return "--";
  return unit === "M" ? toCelsius(cel) : toFahrenheit(cel);
};

const toKiloMet = (miles: number) => (miles * 1.60934)?.toFixed?.(2);
export const getDis = (miles: number, unit: string) => {
  return unit === "M" ? `${toKiloMet(miles)} km` : `${miles?.toFixed(2)} mi`;
};

export const getSpeed = (mph: number, unit: string) => {
  return unit === "M" ? `${toKiloMet(mph)} kmph` : `${mph?.toFixed(2)} mph`;
};
