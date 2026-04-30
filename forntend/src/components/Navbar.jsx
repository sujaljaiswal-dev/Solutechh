import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/solutechh.png';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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

          {isAuthenticated ? (
            <li className={styles.authLinks}>
              {isAdmin && (
                <NavLink to="/admin" className={`${styles.navLink} ${styles.adminBtn}`}>
                  <i className="fa-solid fa-gauge"></i> Admin
                </NavLink>
              )}
              <span className={styles.userName}>
                <i className="fa-solid fa-user-circle"></i> {user?.name}
              </span>
              <button onClick={handleLogout} className={`${styles.navLink} ${styles.logoutBtn}`}>
                <i className="fa-solid fa-sign-out-alt"></i> Logout
              </button>
            </li>
          ) : (
            <li className={styles.authLinks}>
              <NavLink to="/login" className={`${styles.navLink} ${styles.loginBtn}`}>Sign In</NavLink>
              <NavLink to="/signup" className={`${styles.navLink} ${styles.signupBtn}`}>Sign Up</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
