import styles from './LoadingBar.module.css';

export default function LoadingBar({ message = 'Loading...', show = true }) {
    if (!show) return null;

    return (
        <div className={styles.wrapper} role="status" aria-live="polite" aria-label={message}>
            <div className={styles.card}>
                <div className={styles.visual}>
                    <div className={styles.ring}></div>
                    <div className={styles.spinner}></div>
                </div>
                <div className={styles.message}>{message}</div>
                <div className={styles.barTrack}>
                    <div className={styles.barFill}></div>
                </div>
                <div className={styles.dots} aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
}