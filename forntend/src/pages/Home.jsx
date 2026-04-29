import { Link } from 'react-router-dom';
import founder1 from '../assets/founder1.jpg';
import founder2 from '../assets/founder2.jpg';
import Footer from '../components/Footer';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className='shape-1'></div>
        <div className={styles.heroContent}>
          <h1 className={styles.mainHeading}>
            Building the Future<br />of <span>Healthcare Infrastructure</span>
          </h1>
          <p>Designing &amp; Delivering Modern Healthcare Spaces</p>
          <div className={styles.btnGroup}>
            <a href="#services" className={`${styles.btn} ${styles.btnPrimary}`}>
              Explore Our Services <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#contact" className={`${styles.btn} ${styles.btnOutline}`}>
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className={styles.statsWrapper}>
        <div className={styles.statsContainer}>
          <div className={styles.statBox}>
            <i className="fa-solid fa-building-columns" style={{ fontSize: 36, color: '#1DB9AE', marginBottom: 15 }}></i>
            <h3>GOVERNMENT<br />PROJECTS</h3>
            <p>Delivered with Trust</p>
          </div>
          <div className={styles.statBox}>
            <i className="fa-solid fa-award" style={{ fontSize: 36, color: '#1DB9AE', marginBottom: 15 }}></i>
            <h3>10+ YEARS<br />EXPERIENCE</h3>
            <p>Expertise You Can Rely On</p>
          </div>
          <div className={styles.statBox}>
            <i className="fa-solid fa-clipboard-check" style={{ fontSize: 36, color: '#1DB9AE', marginBottom: 15 }}></i>
            <h3>25+<br />PROJECTS</h3>
            <p>Successfully Completed</p>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className={styles.servicesSection} id="services">
        <div className="section-header"><h2>OUR SERVICES</h2></div>
        <div className={styles.servicesGrid}>
          {[
            { to: '/services/cssd', icon: 'fa-solid fa-server', title: 'CSSD Solutions', desc: 'Complete Central Sterile Supply Department Setup' },
            { to: '/services/modular', icon: 'fa-solid fa-procedures', title: 'Modular Operation Theatres', desc: 'Advanced & Safe Surgical Spaces' },
            { to: '/services/skill-labs', icon: 'fa-solid fa-book-medical', title: 'Skill Labs', desc: 'Empowering Medical Education & Training' },
            { to: '/services/pneumatic', icon: 'fa-solid fa-fan', title: 'Pneumatic Tube System', desc: 'Smart & Efficient Hospital Transport' },
          ].map((s) => (
            <Link to={s.to} key={s.to} className={styles.serviceLink}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIconWrapper}>
                  <i className={`${s.icon} ${styles.serviceIcon}`}></i>
                </div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOUNDERS */}
      <section className={styles.servicesSection}>
        <div className="section-header"><h2>OUR FOUNDERS</h2></div>
        <div className={styles.servicesGrid}>
          {[
            { img: founder1, name: 'Ramesh Maurya', role: 'Partner', desc: 'Expert in healthcare infrastructure, specializing in CSSD and modular OT projects.' },
            { img: founder2, name: 'Kalpesh Dalvi', role: 'Partner', desc: 'Skilled in project execution and medical equipment solutions.' },
          ].map((f) => (
            <div className={styles.serviceCard} key={f.name}>
              <div className={styles.serviceIconWrapper}>
                <img src={f.img} alt={f.name} className={styles.founderImg} />
              </div>
              <h4>{f.name}</h4>
              <p><b>{f.role}</b></p>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
