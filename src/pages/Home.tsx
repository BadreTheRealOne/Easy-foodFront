import "./Home.css";
import heroFood from "../assets/menue-home-img.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home">
      {/* Background plein écran */}
      <div className="home-bg" />

      <section className="home-content">
        <div className="home-left">
          <div className="hero-image">
            <img src={heroFood} alt="Plat EasyFood" />
          </div>
        </div>

        <div className="home-right">
     <h1 className="home-title">
  <span className="title-main">EasyFood</span>
  <span className="title-accent">Recettes étudiant</span>
</h1>


          <p>
            EasyFood vous aide à cuisiner facilement grâce à des recettes
            rapides, accessibles et adaptées aux contraintes de temps et de
            budget des étudiants.
          </p>

          <button className="cta-btn" >  <Link to="/recipes">Voir les recettes</Link></button>
        </div>
      </section>
    </main>
  );
}
