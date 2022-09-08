import "./Styles/index.scss";
import { Route, Routes } from "react-router-dom";
import {
  Navbar,
  HomePage,
  Cryptocurrencies,
  CryptoDetails,
  News,
  Footer,
} from "./componnetns";
function App() {
  return (
    <div className="app">
      <div className="header">
        <Navbar />
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/cryptoDetails/:coinId" element={<CryptoDetails />} />
          <Route path="/news" element={<News />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
