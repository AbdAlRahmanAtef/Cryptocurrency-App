import React from "react";
import { useParams } from "react-router";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import {
  AiOutlineDollarCircle,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineMoneyCollect,
  AiOutlineCheck,
  AiOutlineExclamationCircle,
  AiOutlineFund,
} from "react-icons/ai";
import { CgHashtag } from "react-icons/cg";
import Loader from "./Loader";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;
  if (isFetching) return <Loader/>;

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <AiOutlineDollarCircle />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <CgHashtag /> },
    {
      title: "24h Volume",
      value: ` ${
        cryptoDetails?.volume ? "$" + millify(cryptoDetails?.volume) : ""
      }`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: "Daily Avarage",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <AiOutlineTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <AiOutlineFund />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <AiOutlineCheck />
      ) : (
        <AiOutlineExclamationCircle />
      ),
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
  ];
  return (
    <div className="details">
      <div className="title">
        <h2>
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </h2>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </div>
      <div className="stats-container">
        <div className="left">
          <div className="heading">
            <h3>{cryptoDetails.name} Value Statistics</h3>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          <div className="stats">
            {stats.map(({ icon, title, value }) => (
              <div className="stat">
                <p>
                  {icon}
                  <span>{title}</span>
                </p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="right">
          <div className="heading">
            <h3>{cryptoDetails.name} Other Stats Info</h3>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          <div className="stats">
            {genericStats.map(({ icon, title, value }) => (
              <div className="stat">
                <p>
                  {icon}
                  <span>{title}</span>
                </p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="more-info">
        <div className="description">
          <h3>What is {cryptoDetails.name}?</h3>
          {HTMLReactParser(cryptoDetails.description)}
        </div>
        <div className="coin-links">
          <h3>{cryptoDetails.name} Links</h3>
          {cryptoDetails?.links?.map((link) => (
            <div className="coin-link">
              <span>{link.type}</span>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
