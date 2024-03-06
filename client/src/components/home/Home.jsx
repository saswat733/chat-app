import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Hero from "../hero/Hero";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-20 ">
      <Hero/>
    </div>
  );
};

export default Home;
