import { useEffect, useMemo, useState } from 'react';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const API_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=120';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to load photos');
        }

        const data = (await response.json()) as Photo[];
        setPhotos(data);
        setSelectedPhoto(data[0] ?? null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return photos;
    return photos.filter((photo) => photo.title.toLowerCase().includes(query));
  }, [photos, searchQuery]);

  return (
    <div className="app-shell">
      <header className="toolbar">
        <div>
          <p className="eyebrow">React Dashboard</p>
          <h1>Photos Dashboard</h1>
          <p className="subtitle">Browse, search, and inspect photos from JSONPlaceholder.</p>
        </div>
        <div className="search-wrapper">
          <label htmlFor="search">Search photos</label>
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
        <div className="status-message">Loading photos…</div>
      ) : error ? (
        <div className="status-message status-error">{error}</div>
      ) : (
        <main className="content-grid">
          <section className="panel product-list-panel">
            <div className="panel-heading">
              <h2>Photos</h2>
              <span>{filteredPhotos.length} results</span>
            </div>
            {filteredPhotos.length === 0 ? (
              <div className="empty-state">No photos match your search.</div>
            ) : (
              <ul className="product-list">
                {filteredPhotos.map((photo) => (
                  <li
                    key={photo.id}
                    className={`product-card ${selectedPhoto?.id === photo.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="product-image">
                      <img src={photo.thumbnailUrl} alt={photo.title} />
                    </div>
                    <h3>{photo.title}</h3>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="panel detail-panel">
            <div className="panel-heading">
              <h2>Photo details</h2>
            </div>
            {selectedPhoto ? (
              <div className="detail-card">
                <img className="detail-image" src={selectedPhoto.url} alt={selectedPhoto.title} />
                <h3>{selectedPhoto.title}</h3>
                <div className="detail-meta">
                  <span>Photo ID: {selectedPhoto.id}</span>
                  <span>Album ID: {selectedPhoto.albumId}</span>
                </div>
                <p>Source: jsonplaceholder.typicode.com/photos</p>
              </div>
            ) : (
              <div className="empty-state">Select a photo to see details.</div>
            )}
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
