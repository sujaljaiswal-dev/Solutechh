import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import founder1 from '../assets/founder1.jpg';
import founder2 from '../assets/founder2.jpg';
import homeBgTry from '../assets/home_bg_try.jpeg';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import styles from './Home.module.css';

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openContact && isAuthenticated) {
      setIsContactFormOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate, isAuthenticated]);

  const handleGetInTouch = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          returnTo: '/',
          openContact: true,
        },
      });
      return;
    }

    setIsContactFormOpen(true);
  };

  return (
    <>
      {/* HERO */}
      <section className={styles.hero} style={{ backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0) 100%), url(${homeBgTry})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='shape-1'></div>
        <div className={styles.heroContent}>
          <h1 className={styles.mainHeading}>
            <span>  Building the Future<br />of Healthcare Infrastructure</span>
          </h1>
          <p>Designing &amp; Delivering Modern Healthcare</p>
          <div className={styles.btnGroup}>
            <a href="#services" className={`${styles.btn} ${styles.btnPrimary}`}>
              Explore Our Services <i className="fa-solid fa-arrow-right"></i>
            </a>
            <button
              onClick={handleGetInTouch}
              className={`${styles.btn} ${styles.btnPrimary}`}
              style={{ padding: 0, cursor: isLoading ? 'wait' : 'pointer' }}
              disabled={isLoading}
            >
              Get in Touch
            </button>
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

      {/* MAP SECTION */}
      <section className={styles.mapSection}>
        <div className="section-header"><h2>VISIT US</h2></div>
        <a
          href="https://www.google.com/maps/place/Damji+shamji+corporate+square/@19.0906927,72.9162142,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c7efb9449357:0xb2f99b5fbea7af95!8m2!3d19.0906927!4d72.9162142!16s%2Fg%2F11s_lgg1wp?entry=ttu&g_ep=EgoyMDI2MDQyOC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapContainer}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8165548164857!2d72.9162142!3d19.0906927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7efb9449357%3A0xb2f99b5fbea7af95!2sDamji%20shamji%20corporate%20square!5e0!3m2!1sen!2sin!4v1714369201234"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <p className={styles.mapLabel}>Click to view on Google Maps</p>
        </a>
      </section>

      <Footer />
      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </>
  );
}
