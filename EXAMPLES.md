# Exemples d'utilisation de l'API

## Créer un produit

```bash
curl -X POST http://localhost:8080/api/produits \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Laptop",
    "description": "Ordinateur portable haute performance",
    "prix": 999.99,
    "quantite": 10
  }'
```

## Récupérer tous les produits

```bash
curl http://localhost:8080/api/produits
```

## Récupérer un produit par ID

```bash
curl http://localhost:8080/api/produits/1
```

## Rechercher des produits par nom

```bash
curl "http://localhost:8080/api/produits/search?nom=Laptop"
```

## Mettre à jour un produit

```bash
curl -X PUT http://localhost:8080/api/produits/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Laptop Pro",
    "description": "Ordinateur portable professionnel",
    "prix": 1299.99,
    "quantite": 5
  }'
```

## Supprimer un produit

```bash
curl -X DELETE http://localhost:8080/api/produits/1
```

## Informations sur l'application

```bash
curl http://localhost:8080/api/info
```

