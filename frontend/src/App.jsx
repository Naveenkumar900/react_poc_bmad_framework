import { useEffect, useMemo, useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=120';

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        const data = await response.json();
        setProducts(data);
        setSelectedProduct(data[0] || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) => {
      return product.title.toLowerCase().includes(query);
    });
  }, [products, searchQuery]);

  return (
    <div className="app-shell">
      <header className="toolbar">
        <div>
          <p className="eyebrow">React Dashboard</p>
          <h1>Products Dashboard</h1>
          <p className="subtitle">Browse, search, and inspect product photos from JSONPlaceholder.</p>
        </div>
        <div className="search-wrapper">
          <label htmlFor="search">Search products</label>
          <input
            id="search"
            type="search"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="status-message">Loading products…</div>
      ) : error ? (
        <div className="status-message status-error">{error}</div>
      ) : (
        <main className="content-grid">
          <section className="panel product-list-panel">
            <div className="panel-heading">
              <h2>Products</h2>
              <span>{filteredProducts.length} results</span>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="empty-state">No products match your search.</div>
            ) : (
              <ul className="product-list">
                {filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className={`product-card ${selectedProduct?.id === product.id ? 'selected' : ''}`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="product-image">
                      <img src={product.thumbnailUrl} alt={product.title} />
                    </div>
                    <h3>{product.title}</h3>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="panel detail-panel">
            <div className="panel-heading">
              <h2>Product details</h2>
            </div>
            {selectedProduct ? (
              <div className="detail-card">
                <img className="detail-image" src={selectedProduct.url} alt={selectedProduct.title} />
                <h3>{selectedProduct.title}</h3>
                <div className="detail-meta">
                  <span>Photo ID: {selectedProduct.id}</span>
                  <span>Album ID: {selectedProduct.albumId}</span>
                </div>
                <p>Source: jsonplaceholder.typicode.com/photos</p>
              </div>
            ) : (
              <div className="empty-state">Select a product to see details.</div>
            )}
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
