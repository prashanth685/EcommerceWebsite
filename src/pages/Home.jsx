import React from "react";
import Mainbanner from "../components/mainbanner";
import Catagories from "../components/catagories";
import BestSeller from "../components/BestSeller";
const Home = () => {
  return (
    <>
      <div className="mt-10">
        <Mainbanner />
        <Catagories />
        {/* <BestSeller /> */}
      </div>
    </>
  );
};

export default Home;
