import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const crypotApiHeaders = {
  "X-RapidAPI-Key": "89f89a3a6fmsh64885356b066209p1a52d8jsn486fb88f180a",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: crypotApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
  }),
});
export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;
