# Mini Projet Angular – Découverte des Signals

Ce mini-projet a pour objectif d'explorer les **Signals** introduits dans Angular pour la gestion réactive de l'état. Il propose une démonstration simple où l'utilisateur peut :

- Sélectionner un produit dans une liste déroulante,
- Modifier la quantité souhaitée,
- Voir en temps réel le **prix total calculé** à partir du produit sélectionné et de la quantité.

---

## 🛠️ Technologies utilisées

- **Angular (Standalone Components)**
- **Signals, Computed et LinkedSignal**
- **FormsModule** (pour `ngModel`)
- **@for** syntax (boucle Angular moderne)

---

## 📂 Fonctionnalités

- Liste de produits affichée dans un `<select>`.
- Le produit sélectionné est stocké dans un signal (`selectedProduct`).
- Une quantité par défaut de 1 est automatiquement assignée à chaque changement de produit via `linkedSignal`.
- Le prix total est recalculé dynamiquement avec `computed`, en multipliant le prix du produit sélectionné par la quantité.
- L'affichage est mis à jour en temps réel grâce au système réactif des Signals.

---

## 📄 Structure du composant principal

```ts
products = signal<Product[]>([ ... ]); // Liste des produits
selectedProduct = signal<Product | null>(null); // Produit choisi
quantity = linkedSignal({ ... }); // Quantité réinitialisée à chaque changement de produit
price = computed(() => ... ); // Prix total calculé
