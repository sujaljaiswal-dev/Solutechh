import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logoSolu.jpeg';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logoContainer} onClick={handleNavClick}>
        <img src={logo} alt="Solutechh Logo" className={styles.logoImg} />
        <div className={styles.logoText}>
          <h2>SOLUTECHH</h2>
          <p> Advance Healthcare Solutions Provider</p>
        </div>
      </NavLink>
      <button
        className={`${styles.menuBtn} ${isMenuOpen ? styles.active : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`${styles.navWrapper} ${isMenuOpen ? styles.open : ''}`}>
        {isMenuOpen && (
          <button
            className={styles.closeBtn}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        )}
        <ul className={styles.navList}>
          <li><NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} end onClick={handleNavClick}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={handleNavClick}>Products</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={handleNavClick}>Services</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={handleNavClick}>About Us</NavLink></li>
          <li><NavLink to="/achievements" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={handleNavClick}>Achievements</NavLink></li>

          {isAuthenticated ? (
            <li className={styles.authLinks}>
              {isAdmin && (
                <NavLink to="/admin" className={`${styles.navLink} ${styles.adminBtn}`} onClick={handleNavClick}>
                  <i className="fa-solid fa-gauge"></i> Admin
                </NavLink>
              )}
              <span className={styles.userName}>
                <i className="fa-solid fa-user-circle"></i> {user?.name}
              </span>
              <button onClick={() => { handleLogout(); handleNavClick(); }} className={`${styles.navLink} ${styles.logoutBtn}`}>
                <i className="fa-solid fa-sign-out-alt"></i> Logout
              </button>
            </li>
          ) : (
            <li className={styles.authLinks}>
              <NavLink to="/login" className={`${styles.navLink} ${styles.loginBtn}`} onClick={handleNavClick}>Sign In</NavLink>
              <NavLink to="/signup" className={`${styles.navLink} ${styles.signupBtn}`} onClick={handleNavClick}>Sign Up</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
