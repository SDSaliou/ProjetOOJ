// Produit 
class Produit {
    constructor(id, nom, prix) {
        this.id = id;
        this.nom = nom;
        this.prix = prix; 
    }
}

// ShoppingCartItem
class ShoppingCartItem {
    constructor(produit, quantity) {
        this.produit = produit;
        this.quantity = quantity;
    }

    // Calcul total
    getTotalPrix() {
        const totalPrix = this.produit.prix * this.quantity;
        console.log(`Calculat total pour ${this.produit.nom}: ${this.produit.prix} * ${this.quantity} = ${totalPrix}`);
        return totalPrix;
    }
}


class ShoppingCart {
    constructor() {
        this.items = [];
    }

    
    addItem(produit, quantity) {
        const exItem = this.items.find(item => item.produit.id === produit.id);
        if (exItem) {
            exItem.quantity += quantity; 
        } else {
            const newItem = new ShoppingCartItem(produit, quantity);
            this.items.push(newItem); 
        }
        this.displayItems(); 
    }

    // Delete 
    deleteItem(produitId) {
        this.items = this.items.filter(item => item.produit.id !== produitId);
        this.displayItems(); 
    }

    getTotal() {
        const total = this.items.reduce((total, item) => total + item.getTotalPrix(), 0);
        console.log(`Total panier: ${total}`);
        return total;
    }

    
    displayItems() {
        const cartDiv = document.getElementById('cart');
        cartDiv.innerHTML = ''; 
        this.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.textContent = `${item.produit.nom} (${item.quantity}): ${item.getTotalPrix()} FCFA`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Delete';
            removeButton.onclick = () => this.deleteItem(item.produit.id);
            itemDiv.appendChild(removeButton);
            cartDiv.appendChild(itemDiv);
        });

   
        const totalDiv = document.getElementById('total');
        totalDiv.textContent = `Total: ${this.getTotal()} FCFA`;
    }
}

// ajout produits
const produit1 = new Produit(1, 'Madd', 1000);
const produit2 = new Produit(2, 'Tool', 500);
const produit3 = new Produit(3, 'Mangue', 500);


console.log(typeof produit1.prix); 
console.log(typeof produit2.prix); 
console.log(typeof produit3.prix); 


const cart = new ShoppingCart();


const produitsDiv = document.getElementById('produits');

// Function to display a single product
const displayProduit = (produit) => {
    const produitDiv = document.createElement('div');
    produitDiv.classList.add('produit');
    produitDiv.innerHTML = `
        <span>${produit.nom} - ${produit.prix} FCFA</span>
        <button onclick="cart.addItem(produit${produit.id}, 1)">Ajouter</button>
    `;
    produitsDiv.appendChild(produitDiv);
};


[produit1, produit2, produit3].forEach(displayProduit);

