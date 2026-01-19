package com.example.cloud.service;

import com.example.cloud.model.Produit;
import com.example.cloud.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    
    @Autowired
    private ProduitRepository produitRepository;
    
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }
    
    public Optional<Produit> getProduitById(Long id) {
        return produitRepository.findById(id);
    }
    
    public List<Produit> searchProduits(String nom) {
        return produitRepository.findByNomContainingIgnoreCase(nom);
    }
    
    public Produit createProduit(Produit produit) {
        return produitRepository.save(produit);
    }
    
    public Produit updateProduit(Long id, Produit produitDetails) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'id: " + id));
        
        produit.setNom(produitDetails.getNom());
        produit.setDescription(produitDetails.getDescription());
        produit.setPrix(produitDetails.getPrix());
        produit.setQuantite(produitDetails.getQuantite());
        
        return produitRepository.save(produit);
    }
    
    public void deleteProduit(Long id) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'id: " + id));
        produitRepository.delete(produit);
    }
}

