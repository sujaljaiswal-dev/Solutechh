import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            console.log('Login attempt:', formData);

            // Simulate API call
            setTimeout(() => {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify({ email: formData.email }));
                navigate('/');
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            setError('Login failed. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>

            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className={styles.rememberForgot}>
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#forgot">Forgot password?</a>
                    </div>

                    <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className={styles.divider}>OR</div>

                <div className={styles.socialLogin}>
                    <button className={styles.socialBtn} type="button">
                        <i className="fa-brands fa-google"></i> Google
                    </button>
                    <button className={styles.socialBtn} type="button">
                        <i className="fa-brands fa-linkedin"></i> LinkedIn
                    </button>
                </div>

                <div className={styles.signup}>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
