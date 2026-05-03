import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import LoadingBar from '../components/LoadingBar';
import { productAPI } from '../services/api';
import styles from './Products.module.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productAPI.getAllProducts();
      setProducts(response.data.data.products || []);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.heroContent}>
          <h1>Our Products</h1>
          <p>Medical Equipment &amp; Devices We Supply</p>
        </div>
      </div>
      <section className={styles.pageSection}>
        <div className={styles.sectionHeader}><h2>Our Products</h2></div>
        {isLoading ? (
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 0' }}>
            <LoadingBar message="Loading products..." />
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
            <p>{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>No products available</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((p) => (
              <div className={styles.card} key={p._id}>
                <div className={styles.cardImageContainer}>
                  <img src={p.image?.url || 'https://via.placeholder.com/300'} alt={p.name} />
                </div>
                <div className={styles.cardContent}>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  {p.category && <span style={{ fontSize: '12px', color: '#666' }}>Category: {p.category}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
