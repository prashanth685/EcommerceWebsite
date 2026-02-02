import React from "react";
import Mainbanner from "../components/mainbanner";
import Catagories from "../components/catagories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import EmailSubscription from "../components/EmailSubscription";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <div className="mt-10">
        <Mainbanner />
        <Catagories />
        <BestSeller />
        <BottomBanner />
        <EmailSubscription />
        <Footer />
      </div>
    </>
  );
};

export default Home;
