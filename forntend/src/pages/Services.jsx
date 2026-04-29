import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import styles from './Services.module.css';

const services = [
  { to: '/services/cssd', img: 'https://www.bbraun.com.au/adobe/dynamicmedia/deliver/dm-aid--6691ce89-3c22-420a-82e4-2a053b34ce89/central-sterile-supply-department-cssd-employee-with-containers-16-9.jpg?preferwebp=true&quality=100', title: 'CSSD', desc: 'The CSSD is a vital unit in a hospital responsible for the cleaning, sterilization, and distribution of all surgical instruments, medical devices, and supplies.' },
  { to: '/services/modular', img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67', title: 'Modular Operation Theatre', desc: 'Modular Operating Theatre are state-of-the-art surgical environments designed to provide maximum safety, efficiency, and flexibility.' },
  { to: '/services/skill-labs', img: 'https://www.lakeheadu.ca/sites/default/files/uploads/86/photos/Copy%20of%20LU_Nursing-056.png', title: 'Skill Lab', desc: 'Skill Lab provides a modern, hands-on training environment for medical professionals and students.' },
  { to: '/services/pneumatic', img: 'https://www.air-log.com/files/images/de/anwendungen/krankenhaus/rohrpost-kompaktstation-versand-rohrpostbuechse.jpg', title: 'Pneumatic Tube System', desc: 'Pneumatic Tube System is an advanced transport solution designed to move samples, medicines, and documents quickly and safely.' },
  { img: 'https://tse3.mm.bing.net/th/id/OIP.GzhTuRCInMw1qsqcjis-YAHaE8?pid=Api&P=0&h=180', title: 'Laparoscopy System', desc: 'Laproscope System delivers advanced visualization and precision for minimally invasive surgeries.' },
  { img: 'https://blog.geoexams.com/wp-content/uploads/2025/03/Hospital-waste-management.webp', title: 'Bio Waste Management', desc: "Solutechh's Bio Waste Management System ensures safe, efficient, and compliant disposal of biomedical waste in healthcare facilities." },
  { img: 'https://www.gehealthcare.com/-/jssmedia/be144729bab44bd7afa65f18b093ac5b.jpg?h=1080&la=en-US&w=1920', title: 'Patient Monitoring', desc: 'Advanced patient monitoring solutions, designed to deliver accurate, non-invasive measurements for critical care and routine monitoring.' },
  { img: 'https://turnerxray.com/wp-content/uploads/2025/05/best-practices-featured.jpg', title: 'Cadaver Lab & Turnkey Solutions', desc: 'Solutechh provides complete Cadaver Lab turnkey solutions designed to support advanced medical education, surgical training, and research.' },
];

export default function Services() {
  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.heroContent}>
          <h1>Our Services</h1>
          <p>Healthcare Infrastructure Solutions We Provide</p>
        </div>
      </div>
      <section className={styles.pageSection}>
        <div className={styles.sectionHeader}><h2>Healthcare Solutions</h2></div>
        <div className={styles.grid}>
          {services.map((s) => {
            const card = (
              <div className={styles.card} key={s.title}>
                <img src={s.img} alt={s.title} />
                <div className={styles.cardContent}>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            );
            return s.to ? <Link to={s.to} key={s.title} className={styles.cardLink}>{card}</Link> : card;
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
