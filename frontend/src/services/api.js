// L'URL de l'API sera gérée par le proxy Nginx en production
// ou directement en développement
// Si tu es dans K8s, utiliser le service backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://backend-service:8080';

export const produitService = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/produits`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des produits');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/produits/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération du produit');
    return response.json();
  },

  search: async (nom) => {
    const response = await fetch(`${API_BASE_URL}/produits/search?nom=${encodeURIComponent(nom)}`);
    if (!response.ok) throw new Error('Erreur lors de la recherche');
    return response.json();
  },

  create: async (produit) => {
    const response = await fetch(`${API_BASE_URL}/produits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produit),
    });
    if (!response.ok) throw new Error('Erreur lors de la création du produit');
    return response.json();
  },

  update: async (id, produit) => {
    const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produit),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du produit');
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression du produit');
  },
};

