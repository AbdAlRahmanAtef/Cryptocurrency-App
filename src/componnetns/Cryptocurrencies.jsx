import React, { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import { millify } from "millify";
import Loader from './Loader';
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data.coins);
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchData.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchData]);
  if (isFetching) return <Loader/>;
  return (
    <div className="currencies">
      {!simplified && (
        <input
          type="search"
          placeholder="Search..."
          onBlur={(e) => {
            e.target.value = "";
          }}
          onChange={(e) => setSearchData(e.target.value)}
        />
      )}
      <div className="currencies-container">
        {cryptos?.map((currency) => (
          <Link
            className="currncy-card"
            key={currency.uuid}
            to={`/cryptoDetails/${currency.uuid}`}
          >
            <div className="title">
              {`${currency.rank}. ${
                currency.name.length > 10
                  ? currency.name.slice(0, 10) + "..."
                  : currency.name
              }`}
              <img src={currency.iconUrl} alt="" className="image" />
            </div>
            <div className="pricing">
              <p>Price: {millify(currency.price)}</p>
              <p>Market Cap: {millify(currency.marketCap)}</p>
              <p>Daily Changes: {millify(currency.change)}%</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
