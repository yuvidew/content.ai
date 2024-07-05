import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import style from "./_components/home.module.css"

export default function Home() {
  return (
    <div className={`h-[100vh] ${style.hero} `}>
      <div className=" container">
        <Header/>
        <Hero/>
      </div>
    </div>
  );
}
