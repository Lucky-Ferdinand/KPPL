import Category from "../components/guest/Category";
import Hero from "../components/guest/Hero";
import Jobs from "../components/guest/Jobs";
import Blog from "../components/guest/Blog";
import Slider from "../components/guest/Slider";
import Board from "../components/guest/Board";

export default function Guest() {
  return (
    <div>
      <section id="hero">
        <Hero />
      </section>

      <section id="slider">
        <Slider />
      </section>

      <section id="category">
        <Category />
      </section>

      <section id="jobs">
        <Jobs />
      </section>

      <section id="board">
        <Board />
      </section>

      <section id="blog">
        <Blog />
      </section>
    </div>
  );
}
