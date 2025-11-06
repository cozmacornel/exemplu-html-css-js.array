// Array pentru stocarea produselor
let products = ['Laptop', 'Telefon', 'Tablet', 'Monitor', 'Tastatura'];

// Selectarea elementelor DOM
const productInput = document.getElementById('productInput');
const addBtn = document.getElementById('addBtn');
const searchInput = document.getElementById('searchInput');
const productList = document.getElementById('productList');
const totalProducts = document.getElementById('totalProducts');
const sortBtn = document.getElementById('sortBtn');
const clearBtn = document.getElementById('clearBtn');

// Funcție pentru afișarea produselor
function displayProducts(productsToShow = products) {
    productList.innerHTML = '';
    
    productsToShow.forEach((product, index) => {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = product;
        span.className = 'product-text';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Șterge';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteProduct(index);
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        productList.appendChild(li);
    });
    
    // Actualizează numărul total de produse
    totalProducts.textContent = products.length;
}

// Funcție pentru adăugarea unui produs
function addProduct() {
    const productName = productInput.value.trim();
    
    if (productName === '') {
        alert('Te rog introdu un nume de produs!');
        return;
    }
    
    // Verifică dacă produsul există deja în array
    if (products.includes(productName)) {
        alert('Acest produs există deja în listă!');
        return;
    }
    
    // Adaugă produsul în array folosind push()
    products.push(productName);
    
    // Resetează input-ul
    productInput.value = '';
    
    // Reafișează lista
    displayProducts();
}

// Funcție pentru ștergerea unui produs
function deleteProduct(index) {
    // Șterge elementul din array folosind splice()
    products.splice(index, 1);
    
    // Reafișează lista
    displayProducts();
}

// Funcție pentru căutarea produselor
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Filtrează array-ul folosind filter()
    const filteredProducts = products.filter(product => 
        product.toLowerCase().includes(searchTerm)
    );
    
    // Afișează produsele filtrate
    displayProducts(filteredProducts);
}

// Funcție pentru sortarea produselor
function sortProducts() {
    // Sortează array-ul folosind sort()
    products.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    // Reafișează lista
    displayProducts();
}

// Funcție pentru ștergerea tuturor produselor
function clearAllProducts() {
    if (products.length === 0) {
        alert('Lista este deja goală!');
        return;
    }
    
    if (confirm('Ești sigur că vrei să ștergi toate produsele?')) {
        // Golește array-ul
        products = [];
        
        // Reafișează lista
        displayProducts();
    }
}

// Event listeners
addBtn.addEventListener('click', addProduct);

// Permite adăugarea produsului cu tasta Enter
productInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addProduct();
    }
});

searchInput.addEventListener('input', searchProducts);
sortBtn.addEventListener('click', sortProducts);
clearBtn.addEventListener('click', clearAllProducts);

// Afișează produsele inițiale la încărcarea paginii
displayProducts();
