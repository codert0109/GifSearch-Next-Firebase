import { GiphyFetch } from "@giphy/js-fetch-api";

let gf_instance: any;

export const getGFInstance = () => {
  if (gf_instance == undefined && process.env.NEXT_PUBLIC_GIPHY_API_KEY) {
    gf_instance = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY);
  }
  return gf_instance;
}