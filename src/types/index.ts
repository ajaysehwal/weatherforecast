// types.ts
export type TemperatureUnit = "metric" | "imperial";

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    description: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      description: string;
    }>;
  }>;
}
