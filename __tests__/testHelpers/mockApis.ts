import { location, weather } from "./mockData";
import { weatherUrl } from "../../src/app.config";

export const mockApis = (mockAxios) => {
  mockAxios
    .onGet(`${weatherUrl}api/location/search/?query=San`)
    .reply(200, location);
  mockAxios.onGet(`${weatherUrl}api/location/2487956/`).reply(200, weather);
};
