import React from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loader from "./Loader";
const HomePage = () => {
  const { data, isFetchig } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetchig) return <Loader/>;
  return (
    <div className="home">
      <div className="statistics-container">
        <h2 className="main-title">Global Crypto Stats</h2>
        <div className="statistics">
          <div className="stat">
            <h3 className="title">Total Cryptocurrencies</h3>
            <span className="count">{globalStats?.total}</span>
          </div>
          <div className="stat">
            <h3 className="title">Total Exchanges</h3>
            <span className="count">
              {millify(globalStats?.totalExchanges)}
            </span>
          </div>
          <div className="stat">
            <h3 className="title">Total Market Cap</h3>
            <span className="count">
              ${millify(globalStats?.totalMarketCap)}
            </span>
          </div>
          <div className="stat">
            <h3 className="title">Total 24h Volume</h3>
            <span className="count">
              ${millify(globalStats?.total24hVolume)}
            </span>
          </div>
          <div className="stat">
            <h3 className="title">Total Markets</h3>
            <span className="count">{millify(globalStats?.totalMarkets)}</span>
          </div>
        </div>
      </div>
      <div className="top-10-cryptos">
        <div className="heading">
          <h2 className="main-title">Top 10 Cryptos In The World</h2>
          <Link to="/cryptocurrencies">Show More</Link>
        </div>
        <Cryptocurrencies simplified />
      </div>
      <div className="latest">
        <div className="heading">
          <h2 className="main-title">Latest Crypto News</h2>
          <Link to="/news">Show More</Link>
        </div>
        <News simplified />
      </div>
    </div>
  );
};

export default HomePage;
