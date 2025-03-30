function displayAllRegisteredBusinesses() {
    const container = document.getElementById('businessList');
    container.innerHTML = ''; 

    const businesses = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('business_')) {
            const business = JSON.parse(localStorage.getItem(key));
            businesses.push(business);
        }
    }

    businesses.forEach(business => {
        const businessCard = document.createElement('div');
        businessCard.className = 'business-card';

        businessCard.innerHTML = `
            <h3>${business.name}</h3>
            <p><strong>Address:</strong> ${business.address}</p>
            <div class="details" style="display: none;">
                <p><strong>Description:</strong> ${business.description}</p>
                <h4>Items for Sale:</h4>
                <ul>
                    ${business.items.map(item => `<li>${item.name}: $${item.price}</li>`).join('')}
                </ul>
                <h4>Business Hours:</h4>
                <ul>
                    ${Object.entries(business.hours).map(([day, hours]) => {
                        return `<li>${day}: ${hours.open || 'Closed'} - ${hours.close || 'Closed'}</li>`;
                    }).join('')}
                </ul>
            </div>
        `;

        businessCard.onclick = () => {
            const details = businessCard.querySelector('.details');
            details.style.display = (details.style.display === 'none') ? 'block' : 'none';
        };

        container.appendChild(businessCard);
    });
}
