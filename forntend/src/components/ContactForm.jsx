import { useState } from 'react';
import { contactAPI } from '../services/api';
import styles from './ContactForm.module.css';

export default function ContactForm({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        reason: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
        setError('');

        try {
            await contactAPI.submitContact(formData);
            setSubmitted(true);

            // Reset form after 2 seconds and close
            setTimeout(() => {
                setFormData({ name: '', email: '', phone: '', reason: '' });
                setSubmitted(false);
                onClose();
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {submitted ? (
                    <div className={styles.successMessage}>
                        <i className="fa-solid fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>We've received your message. Our team will get back to you soon.</p>
                    </div>
                ) : (
                    <>
                        <h2>Get in Touch</h2>
                        <p className={styles.subtitle}>Let's discuss how we can help your healthcare facility</p>

                        {error && <div style={{ color: '#dc3545', marginBottom: '15px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>{error}</div>}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email Address *</label>
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
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="reason">Reason for Contact *</label>
                                <textarea
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    placeholder="Tell us what you're interested in..."
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                                {isLoading ? 'Submitting...' : 'Submit'} <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
