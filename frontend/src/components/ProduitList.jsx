import { useState, useEffect } from 'react';
import { produitService } from '../services/api';
import ProduitForm from './ProduitForm';
import './ProduitList.css';

function ProduitList() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduit, setEditingProduit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProduits();
  }, []);

  const loadProduits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await produitService.getAll();
      setProduits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadProduits();
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await produitService.search(searchTerm);
      setProduits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }
    try {
      await produitService.delete(id);
      loadProduits();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (produit) => {
    setEditingProduit(produit);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduit(null);
    loadProduits();
  };

  if (loading && produits.length === 0) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="produit-list-container">
      <div className="header">
        <h1>Gestion des Produits</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Nouveau Produit
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Rechercher</button>
        {searchTerm && (
          <button onClick={() => { setSearchTerm(''); loadProduits(); }}>
            Effacer
          </button>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <ProduitForm
          produit={editingProduit}
          onClose={handleFormClose}
        />
      )}

      <div className="produits-grid">
        {produits.length === 0 ? (
          <div className="no-products">Aucun produit trouvé</div>
        ) : (
          produits.map((produit) => (
            <div key={produit.id} className="produit-card">
              <div className="produit-header">
                <h3>{produit.nom}</h3>
                <div className="produit-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(produit)}
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(produit.id)}
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
              <p className="produit-description">{produit.description}</p>
              <div className="produit-details">
                <div className="detail-item">
                  <span className="label">Prix:</span>
                  <span className="value">{produit.prix.toFixed(2)} €</span>
                </div>
                <div className="detail-item">
                  <span className="label">Quantité:</span>
                  <span className="value">{produit.quantite}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProduitList;

