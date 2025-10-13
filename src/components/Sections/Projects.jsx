import styles from "./styles/Projects.module.css";
import { EmblaCarousel } from "../EmblaCarousel";
import { Link } from "react-router-dom";
import EventSlider from "../General/Slider";

export default function Projects() {
  return (
    <>
      <header id="atividades" className={styles.headerProjects}>
        <h2 data-aos="fade-bottom">Projetos e Eventos</h2>
        <p>Projetos sociais e Eventos Anuais</p>
      </header>
      <section data-aos="fade-right" className={styles.projectsContainer}>
        <article className={styles.articleProjects}>
          <h3>Projetos Sociais</h3>
          <ul>
            <li>
              <strong>Sustentabilidade</strong>
              <br />
              Com foco na preservação ambiental, promovemos projetos e
              atividades que incentivam a conscientização ecológica e o cuidado
              com o meio ambiente.
            </li>
            <li>
              <strong>Inclusão Social</strong>
              <br />
              Criamos um ambiente acolhedor e inclusivo, proporcionando
              atividades para jovens com necessidades especiais, promovendo
              integração e apoio.
            </li>
            <li>
              <strong>Prevenção ao Uso de Drogas</strong>
              <br />
              Nossos projetos de prevenção e conscientização alertam sobre os
              riscos das drogas, fortalecendo o conhecimento e a
              responsabilidade entre os jovens.
            </li>
          </ul>
        </article>
        <article className={styles.articleProjects}>
          <h3>Eventos Anuais</h3>
          <ul>
            <li>
              <strong>Feijoada Escoteira</strong>
              <br />
              Desde 1975, a Feijoada Escoteira se tornou uma tradição no Grupo
              Escoteiro Pirabeiraba, reunindo a comunidade em um momento
              especial de celebração e arrecadação. Confira as fotos dos eventos
              anteriores e inscreva-se para a próxima edição!
            </li>
          </ul>
          <Link
            className={styles.linkToEvents}
            to="/eventos">
            Confira os eventos
          </Link>
        </article>
      </section>
      <section className={styles.projectsImages}>
        {/* <figure>
          <img loading="lazy" src={img1} width={400} height={300} alt="" />
        </figure>
        <figure>
          <img loading="lazy" src={img2} width={400} height={300} alt="" />
        </figure>
        <figure>
          <img loading="lazy" src={img3} width={400} height={300} alt="" />
        </figure>
        <figure>
          <img loading="lazy" src={img4} width={400} height={300} alt="" />
        </figure> */}
        <EmblaCarousel />
      </section>
      <section className={styles.projectsSlider}>
        <EventSlider />
      </section>
    </>
  );
}
