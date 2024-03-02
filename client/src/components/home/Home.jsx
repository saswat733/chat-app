import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Hero from "../hero/Hero";

const Home = () => {
  return (
    <div className="flex flex-col gap-12 md:gap-20 ">
      <Header/>
      <Hero/>
      <Footer/>
    </div>
  );
};

export default Home;
