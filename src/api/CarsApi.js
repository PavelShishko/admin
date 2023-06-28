import { $host } from "./index";

export const createBrand = async (device) => {
  const { data } = await $host.post(`api/brand`, device);
  return data;
};

export const createModel = async (device) => {
  const { data } = await $host.post(`api/model`, device);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get(`api/brand`);
  return data;
};

export const fetchModels = async () => {
  const { data } = await $host.get(`api/model`);
  return data;
};

export const fetchOffers = async () => {
  const { data } = await $host.get(`api/offer`);
  return data;
};

export const fetchDevices = async () => {
  const { data } = await $host.get(`api/device`);
  return data;
};

export const updateOffer = async () => {
  const { data } = await $host.put(`api/offer`);
  return data;
};
