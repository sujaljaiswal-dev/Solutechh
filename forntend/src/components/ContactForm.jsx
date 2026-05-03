import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoadingBar from './LoadingBar';
import { contactAPI } from '../services/api';
import styles from './ContactForm.module.css';

const careerPositions = [
    'Office Admin',
    'CSSD Manager',
    'CSSD Clerk',
    'Housekeeping',
    'Project Manager',
    'Sales',
];

export default function ContactForm({ isOpen, onClose }) {
    const { user, isAuthenticated } = useAuth();
    const [formType, setFormType] = useState('customer');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        reason: '',
        applyingFor: '',
    });

    useEffect(() => {
        if (isAuthenticated) {
            setFormData((prev) => ({
                ...prev,
                name: user?.name || '',
                email: user?.email || '',
            }));
        }
    }, [isAuthenticated, user]);

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
            await contactAPI.submitContact({
                ...formData,
                inquiryType: formType,
            });
            setSubmitted(true);

            // Reset form after 2 seconds and close
            setTimeout(() => {
                setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: '',
                    reason: '',
                    applyingFor: '',
                });
                setSubmitted(false);
                onClose();
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !isAuthenticated) return null;

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

                        <div className={styles.tabSwitcher}>
                            <button
                                type="button"
                                className={`${styles.tabBtn} ${formType === 'customer' ? styles.activeTab : ''}`}
                                onClick={() => {
                                    setFormType('customer');
                                    setFormData(prev => ({ ...prev, applyingFor: '' }));
                                }}
                            >
                                Customer Inquiry
                            </button>
                            <button
                                type="button"
                                className={`${styles.tabBtn} ${formType === 'career' ? styles.activeTab : ''}`}
                                onClick={() => setFormType('career')}
                            >
                                Career Opportunity
                            </button>
                        </div>

                        <LoadingBar show={isLoading} message="Submitting your request..." />

                        {error && <div style={{ color: '#dc3545', marginBottom: '15px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>{error}</div>}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    readOnly
                                    placeholder="Your profile name"
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
                                    readOnly
                                    placeholder="Your profile email"
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

                            {formType === 'career' && (
                                <div className={styles.formGroup}>
                                    <label htmlFor="applyingFor">Applying For *</label>
                                    <select
                                        id="applyingFor"
                                        name="applyingFor"
                                        value={formData.applyingFor}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a position</option>
                                        {careerPositions.map((position) => (
                                            <option key={position} value={position}>
                                                {position}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <label htmlFor="reason">
                                    {formType === 'career' ? 'Message / Cover Letter *' : 'Reason for Contact *'}
                                </label>
                                <textarea
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    placeholder={
                                        formType === 'career'
                                            ? 'Tell us about your experience and interest in the role...'
                                            : "Tell us what you're interested in..."
                                    }
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
