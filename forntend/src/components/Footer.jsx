import { Link } from 'react-router-dom';
import logo from '../assets/solutechh.png';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.logoFooter}>
              <img src={logo} alt="Solutechh Logo" />
              <span>SOLUTECHH</span>
            </div>
            <p>Medical equipment supply, installation &amp; maintenance for hospitals and institutions across India.</p>
          </div>
          <div className={styles.footerCol}>
            <h5>Services</h5>
            <Link to="/services/cssd">CSSD Systems</Link>
            <Link to="/services/modular">Modular OT</Link>
            <Link to="/services/skill-labs">Skill Labs</Link>
            <Link to="/services/pneumatic">Pneumatic Systems</Link>
          </div>
          <div className={styles.footerCol}>
            <h5>Company</h5>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/products">Products</Link>
          </div>
          <div className={styles.footerCol}>
            <h5>Contact</h5>
            <a href="mailto:solutechh@gmail.com">solutechh@gmail.com</a>
            <a href="tel:+918879469955">+91 8879469955</a>
            <span>Mumbai, India</span>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 Solutechh. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
