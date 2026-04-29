import officeImg from '../assets/office.jpg';
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpeg';
import img4 from '../assets/4.jpeg';
import Footer from '../components/Footer';
import styles from './About.module.css';

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>About Solutechh</h1>
      </section>

      {/* WHO WE ARE */}
      <section className={styles.section + ' ' + styles.aboutFlex}>
        <div className={styles.aboutText}>
          <h2>Who We Are</h2>
          <p>
            Solutechh is a dedicated healthcare solutions provider specializing in hospital infrastructure,
            government tenders, and advanced medical equipment. We are a team of highly motivated professionals
            committed to delivering quality solutions with strong technical expertise and excellent after-sales service.
          </p>
        </div>
        <div className={styles.aboutImg}>
          <img src={officeImg} alt="Solutechh Office" />
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Mission &amp; Vision</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Our Mission</h3>
            <p>To provide reliable, high-quality healthcare solutions that enhance patient safety and improve hospital efficiency.</p>
          </div>
          <div className={styles.card}>
            <h3>Our Vision</h3>
            <p>To become a trusted leader in healthcare infrastructure and medical equipment supply across India and internationally.</p>
          </div>
        </div>
      </section>

      {/* OFFICE PHOTOS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Office</h2>
        <div className={styles.grid}>
          {[img1, img2, img3, img4].map((img, i) => (
            <div className={styles.card} key={i}>
              <img src={img} alt={`Office ${i + 1}`} className={styles.officeImg} />
            </div>
          ))}
        </div>
      </section>

      {/* HEAD OFFICE */}
      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Solutechh Head Office</h3>
            <p>📍 C-412, Damji Shamji Corporate Square, Sawali Society, Laxmi Nagar, Ghatkopar East, Mumbai, Maharashtra 400075</p>
            <p>📧 Email: solutechh@gmail.com</p>
            <p>📞 Phone: +91 8879469955</p>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24198.741597633195!2d72.91423142910156!3d19.0739450576697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7b0a2c3d4f7%3A0x3c4d5e6f7a8b9c0d!2sC-412%2C%20Damji%20Shamji%20Corporate%20Square%2C%20Sawali%20Society%2C%20Laxmi%20Nagar%2C%20Ghatkopar%20East%2C%20Mumbai%2C%20Maharashtra%20400075!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Solutechh Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Choose Us</h2>
        <div className={styles.grid}>
          {['✔ Government Tender Expertise', '✔ International Standard Solutions', '✔ Strong After-Sales Support', '✔ Technically Skilled Team'].map(item => (
            <div className={styles.card} key={item}>{item}</div>
          ))}
        </div>
      </section>

      {/* PRESENCE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Presence</h2>
        <p>We operate across Western India including Maharashtra, Gujarat, and Goa, delivering reliable and efficient healthcare solutions.</p>
      </section>

      <Footer />
    </>
  );
}
