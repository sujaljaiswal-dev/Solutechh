import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import styles from './ServiceDetail.module.css';

export default function ServiceDetail({ title, subtitle, heroBg, about, images, features, benefits }) {
  return (
    <>
      {/* HERO */}
      <div className={styles.hero} style={{ '--hero-bg': `url('${heroBg}')` }}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {/* ABOUT */}
      <div className={styles.section}>
        <h2>About {title}</h2>
        <p>{about}</p>
      </div>

      {/* IMAGE GALLERY */}
      <div className={styles.section}>
        <h2>{title} Gallery</h2>
        <div className={styles.gallery}>
          {images.map((src, i) => (
            <img key={i} src={src} alt={`${title} ${i + 1}`} />
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className={styles.section}>
        <h2>Key Features</h2>
        <div className={styles.grid}>
          {features.map((f, i) => (
            <div className={styles.card} key={i}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BENEFITS */}
      <div className={styles.section}>
        <h2>Why Choose Our {title}</h2>
        <div className={styles.grid}>
          {benefits.map((b, i) => (
            <div className={styles.card} key={i}>{b}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 60px 40px' }}>
        <Link to="/" className={styles.back}>← Back to Home</Link>
      </div>

      <Footer />
    </>
  );
}
