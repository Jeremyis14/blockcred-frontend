import Image from "next/image";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import ProblemSolve from "../../components/ProblemSolve";
import Founders from "../../components/Founders";
import Contact from "../../components/Contact";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";

export default function Home() {
  return (
      <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Navbar/>
        <Hero/>
        <Features/>
        <ProblemSolve/>
        <Founders/>
        <Contact/>
        <Faq/>
        <Footer/>
      </div>
  );
}
