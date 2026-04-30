import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showProductForm, setShowProductForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'CSSD',
        image: null,
    });

    // Load dashboard data
    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            const [dashboardRes, productsRes, contactsRes] = await Promise.all([
                adminAPI.getDashboardStats(),
                adminAPI.getAllProducts(),
                adminAPI.getAllContacts(),
            ]);
            setStats(dashboardRes.data.data);
            setProducts(productsRes.data.data.products || []);
            setContacts(contactsRes.data.data);
        } catch (err) {
            setError('Failed to load data');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedProduct) {
                await adminAPI.updateProduct(selectedProduct._id, formData);
            } else {
                await adminAPI.addProduct(formData);
            }
            setFormData({ name: '', description: '', category: 'CSSD', image: null });
            setShowProductForm(false);
            setSelectedProduct(null);
            loadDashboardData();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await adminAPI.deleteProduct(id);
                loadDashboardData();
            } catch (err) {
                setError('Failed to delete product');
            }
        }
    };

    const handleToggleProductStatus = async (id) => {
        try {
            await adminAPI.toggleProductStatus(id);
            loadDashboardData();
        } catch (err) {
            setError('Failed to update product status');
        }
    };

    const handleContactStatusUpdate = async (contactId, status) => {
        try {
            await adminAPI.updateContactStatus(contactId, { status });
            loadDashboardData();
        } catch (err) {
            setError('Failed to update contact status');
        }
    };

    const handleDeleteContact = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await adminAPI.deleteContact(id);
                loadDashboardData();
            } catch (err) {
                setError('Failed to delete contact');
            }
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            category: product.category,
            image: null,
        });
        setShowProductForm(true);
    };

    if (isLoading && !stats) {
        return <div className={styles.container}><p>Loading...</p></div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Admin Dashboard</h1>
                <p>Welcome, {user?.name}</p>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'dashboard' ? styles.active : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    <i className="fa-solid fa-chart-line"></i> Dashboard
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'products' ? styles.active : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    <i className="fa-solid fa-boxes"></i> Products
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'contacts' ? styles.active : ''}`}
                    onClick={() => setActiveTab('contacts')}
                >
                    <i className="fa-solid fa-envelope"></i> Contacts
                </button>
            </div>

            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && stats && (
                <div className={styles.content}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <i className="fa-solid fa-box"></i>
                            <h3>{stats.totalProducts}</h3>
                            <p>Total Products</p>
                        </div>
                        <div className={styles.statCard}>
                            <i className="fa-solid fa-envelope"></i>
                            <h3>{stats.totalContacts}</h3>
                            <p>Total Contacts</p>
                        </div>
                        <div className={styles.statCard}>
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <h3>{stats.newContacts}</h3>
                            <p>New Messages</p>
                        </div>
                        <div className={styles.statCard}>
                            <i className="fa-solid fa-user"></i>
                            <h3>{stats.totalUsers}</h3>
                            <p>Total Users</p>
                        </div>
                    </div>
                </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
                <div className={styles.content}>
                    <div className={styles.sectionHeader}>
                        <h2>Product Management</h2>
                        <button
                            className={styles.btnPrimary}
                            onClick={() => {
                                setShowProductForm(true);
                                setSelectedProduct(null);
                                setFormData({ name: '', description: '', category: 'CSSD', image: null });
                            }}
                        >
                            <i className="fa-solid fa-plus"></i> Add Product
                        </button>
                    </div>

                    {showProductForm && (
                        <div className={styles.formContainer}>
                            <h3>{selectedProduct ? 'Edit Product' : 'Add New Product'}</h3>
                            <form onSubmit={handleProductSubmit}>
                                <div className={styles.formGroup}>
                                    <label>Product Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        rows="4"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>CSSD</option>
                                        <option>Modular OT</option>
                                        <option>Skill Labs</option>
                                        <option>Pneumatic System</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Image {!selectedProduct && '*'}</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                        required={!selectedProduct}
                                    />
                                    {selectedProduct && <small>Leave empty to keep current image</small>}
                                </div>
                                <div className={styles.formButtons}>
                                    <button type="submit" className={styles.btnPrimary}>
                                        {selectedProduct ? 'Update' : 'Add'} Product
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.btnSecondary}
                                        onClick={() => {
                                            setShowProductForm(false);
                                            setSelectedProduct(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className={styles.table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <span className={`${styles.badge} ${product.isActive ? styles.active : styles.inactive}`}>
                                                {product.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className={styles.actions}>
                                            <button
                                                className={styles.btnSmall}
                                                onClick={() => handleEditProduct(product)}
                                                title="Edit"
                                            >
                                                <i className="fa-solid fa-edit"></i>
                                            </button>
                                            <button
                                                className={styles.btnSmall}
                                                onClick={() => handleToggleProductStatus(product._id)}
                                                title="Toggle Status"
                                            >
                                                <i className="fa-solid fa-toggle-on"></i>
                                            </button>
                                            <button
                                                className={styles.btnSmallDanger}
                                                onClick={() => handleDeleteProduct(product._id)}
                                                title="Delete"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* CONTACTS TAB */}
            {activeTab === 'contacts' && (
                <div className={styles.content}>
                    <h2>Contact Requests</h2>
                    <div className={styles.contactsList}>
                        {contacts.map((contact) => (
                            <div key={contact._id} className={styles.contactCard}>
                                <div className={styles.contactHeader}>
                                    <h3>{contact.name}</h3>
                                    <span className={`${styles.badge} ${styles[contact.status]}`}>
                                        {contact.status}
                                    </span>
                                </div>
                                <p><strong>Email:</strong> {contact.email}</p>
                                <p><strong>Phone:</strong> {contact.phone}</p>
                                <p><strong>Message:</strong> {contact.reason}</p>
                                <div className={styles.contactActions}>
                                    <select
                                        value={contact.status}
                                        onChange={(e) => handleContactStatusUpdate(contact._id, e.target.value)}
                                        className={styles.statusSelect}
                                    >
                                        <option value="new">New</option>
                                        <option value="read">Read</option>
                                        <option value="responded">Responded</option>
                                    </select>
                                    <button
                                        className={styles.btnSmallDanger}
                                        onClick={() => handleDeleteContact(contact._id)}
                                    >
                                        <i className="fa-solid fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
