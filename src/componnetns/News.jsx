import moment from "moment/moment";
import React, { useState } from "react";
import { useGetNewsQuery } from "../services/newsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from './Loader';
const defaultImage =
  "https://imageio.forbes.com/specials-images/imageserve/6075b9684037ea37cf901b2e/E-commerce-concept-with-bitcoin-circuit-and-business-statistic-screen-/960x0.jpg?format=jpg&width=100";

const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);
  if (!cryptoNews?.value) return <Loader/>;
  return (
    <div className="news">
      {!simplified && (
        <>
          <input
            list="currencies"
            placeholder="Select a Currency"
            onMouseEnter={(e) => (e.target.value = "")}
            onChange={(e) => {
              setnewsCategory(e.target.value);
            }}
          />
          <datalist className="data" id="currencies">
            <div>
              {data?.data?.coins.map((coin) => (
                <option value={coin.name} />
              ))}
            </div>
          </datalist>
        </>
      )}
      <div className="news-container">
        {cryptoNews?.value?.map((news, index) => (
          <a
            className="news-card"
            href={news.url}
            target="_blank"
            rel="noreferrer"
            key={index}
          >
            <div className="title">
              <p>
                {news.name.length > 50
                  ? `${news.name.slice(0, 50)}...`
                  : news.name}
              </p>
              <img
                src={news?.image?.thumbnail?.contentUrl || defaultImage}
                alt=""
              />
            </div>
            <div className="description">
              {news.description.length > 100
                ? `${news.description.slice(0, 100)}...`
                : news.description}
            </div>
            <div className="provider">
              <div>
                <img
                  src={
                    news.provider[0]?.image?.thumbnail?.contentUrl ||
                    defaultImage
                  }
                  alt=""
                />
                <p>{news.provider[0]?.name}</p>
              </div>
              <p className="time">
                {moment(news.datePublished).startOf("ss").fromNow()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default News;
