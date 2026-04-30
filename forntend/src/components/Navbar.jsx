import { NavLink } from 'react-router-dom';
import logo from '../assets/solutechh.png';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logoContainer}>
        <img src={logo} alt="Solutechh Logo" className={styles.logoImg} />
        <div className={styles.logoText}>
          <h2>SOLUTECHH</h2>
          <p>Healthcare Infrastructure Solutions</p>
        </div>
      </NavLink>
      <nav>
        <ul className={styles.navList}>
          <li><NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} end>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>About Us</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Services</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Products</NavLink></li>
          <li><NavLink to="/achievements" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Achievements</NavLink></li>
          <li className={styles.authLinks}>
            <NavLink to="/login" className={`${styles.navLink} ${styles.loginBtn}`}>Sign In</NavLink>
            <NavLink to="/signup" className={`${styles.navLink} ${styles.signupBtn}`}>Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
