document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.querySelector("form[action='/search']");
    
    if (searchForm) {
        searchForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const query = searchForm.querySelector("input[name='q']").value;
            if (query) {
                // Redirect to the search results page with the query
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        });
    }
});

const plants = [
    { name: "Monstera Deliciosa" },
    { name: "Variegated Canna Lily" },
    { name: "Aloe Vera" },
    { name: "Phalaenopsis Orchids" },
    { name: "Calathea Orbifolia" },
    { name: "Mint Plant" },
    { name: "Pilea Peperomioides" },
    { name: "Cactus" },
    { name: "Fiddle Leaf Fig" },
    { name: "Snake Plant" }
    // ...add all your plants here
];

const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('search-suggestions');

searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    suggestionsBox.innerHTML = '';
    if (query.length === 0) return;

    const matches = plants.filter(plant => plant.name.toLowerCase().includes(query));
    if (matches.length === 0) return;

    const list = document.createElement('ul');
    list.style.background = "#fff";
    list.style.border = "1px solid #ccc";
    list.style.listStyle = "none";
    list.style.padding = "0";
    list.style.margin = "0";
    list.style.position = "absolute";
    list.style.left = "0";
    list.style.top = "100%";
    list.style.width = searchInput.offsetWidth + "px";
    list.style.zIndex = "1000";

    matches.forEach(plant => {
        const item = document.createElement('li');
        item.textContent = plant.name;
        item.style.padding = "8px";
        item.style.cursor = "pointer";
        item.addEventListener('mousedown', function() {
            searchInput.value = plant.name;
            suggestionsBox.innerHTML = '';
        });
        list.appendChild(item);
    });

    suggestionsBox.appendChild(list);
});

// Optional: Hide suggestions when input loses focus
searchInput.addEventListener('blur', function() {
    setTimeout(() => suggestionsBox.innerHTML = '', 100);
});

// Listen for search form submit
document.querySelector('form[action="/search"]').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = this.q.value.trim().toLowerCase();
    const results = plants.filter(plant =>
        plant.name.toLowerCase().includes(query) ||
        plant.type.toLowerCase().includes(query)
    );
    // Show results (for demo, alert names)
    if (results.length > 0) {
        alert("Found: " + results.map(p => p.name).join(", "));
        // You can instead display results on the page or redirect to shop.html with query params
    } else {
        alert("No plants found for: " + query);
    }
});

// Add to Cart functionality for main page products
document.querySelectorAll('.product button').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const product = btn.parentElement;
        const name = product.querySelector('h5') ? product.querySelector('h5').innerText : "Unknown Plant";
        let oldPrice = 0;
        let discountPrice = 0;

        // Get old price from <del>
        const del = product.querySelector('del');
        if (del) {
            oldPrice = parseFloat(del.innerText.replace('$', '').trim());
        }

        // Get discount price from text node after <del>
        const p = product.querySelector('p');
        if (p) {
            const nodes = Array.from(p.childNodes);
            nodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().startsWith('$')) {
                    discountPrice = parseFloat(node.textContent.trim().replace('$', ''));
                }
            });
        }

        const img = product.querySelector('img') ? product.querySelector('img').src : "";

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name, oldPrice, discountPrice, img });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(name + " added to cart!");
    });
});