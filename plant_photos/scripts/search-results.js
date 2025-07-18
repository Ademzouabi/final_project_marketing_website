const plants = [
    {
        name: "Monstera Deliciosa",
        img: "/plant_photos/best_seller_monstera.jpg",
        oldPrice: "54.99",
        discountPrice: "43.99"
    },
    {
        name: "Variegated Canna Lily",
        img: "/plant_photos/best_seller_canna_lilly.jpg",
        oldPrice: "37.99",
        discountPrice: "30.39"
    },
    {
        name: "Aloe Vera",
        img: "/plant_photos/best_seller_aloevera.jpg",
        oldPrice: "19.99",
        discountPrice: "15.99"
    },
    // ...add all your plants here
];

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || '';
}

function renderResults() {
    const query = getQueryParam('q').toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (!query) {
        resultsContainer.innerHTML = '<p style="text-align:center;">No search query provided.</p>';
        return;
    }

    const matches = plants.filter(plant => plant.name.toLowerCase().includes(query));
    if (matches.length === 0) {
        resultsContainer.innerHTML = `<p style="text-align:center;">No plants found for "<strong>${query}</strong>".</p>`;
        return;
    }

    matches.forEach((plant, idx) => {
        resultsContainer.innerHTML += `
            <div class="product" style="margin: 0 auto; display: flex; flex-direction: column; align-items: center; max-width: 350px;">
                <img src="${plant.img}" alt="${plant.name}" style="width:220px;height:220px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-bottom:15px;" />
                <h5>${plant.name}</h5>
                <p>
                    <del style="color:#ae4343;">$${plant.oldPrice}</del>
                    <span style="color:#93a267;font-weight:bold;margin-left:10px;">$${plant.discountPrice}</span>
                </p>
                <button onclick="addToCart('${plant.name}','${plant.oldPrice}','${plant.discountPrice}','${plant.img}')">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(name, oldPrice, discountPrice, img) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, oldPrice, discountPrice, img });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " added to cart!");
}

document.addEventListener('DOMContentLoaded', renderResults);