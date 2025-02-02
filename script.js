// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.querySelector('i').classList.toggle('fa-bars');
    mobileMenu.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenu.querySelector('i').classList.remove('fa-times');
        mobileMenu.querySelector('i').classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.querySelector('i').classList.remove('fa-times');
        mobileMenu.querySelector('i').classList.add('fa-bars');
    });
});

// Sample flight data (in a real application, this would come from an API)
const flights = [
    {
        airline: 'malaysia airlines',
        from: 'Kuala Lumpur',
        to: 'Tokyo',
        price: 550,
        departure: '10:00 AM',
        arrival: '6:00 PM',
        duration: '8h'
    },
    {
        airline: 'singapore airlines',
        from: 'Singapore',
        to: 'London',
        price: 950,
        departure: '11:30 PM',
        arrival: '5:30 AM',
        duration: '13h'
    },
    {
        airline: 'cathay pacific',
        from: 'Hong Kong',
        to: 'Sydney',
        price: 750,
        departure: '9:00 AM',
        arrival: '8:00 PM',
        duration: '9h'
    },
    {
        airline: 'air asia',
        from: 'Bangkok',
        to: 'Seoul',
        price: 350,
        departure: '2:00 PM',
        arrival: '9:30 PM',
        duration: '5h 30m'
    },
    {
        airline: 'garuda indonesia',
        from: 'Jakarta',
        to: 'Melbourne',
        price: 650,
        departure: '8:00 AM',
        arrival: '7:00 PM',
        duration: '7h'
    }
];

// Function to display flights
function displayFlights(filteredFlights = flights) {
    const flightResults = document.getElementById('flightResults');
    flightResults.innerHTML = '';

    filteredFlights.forEach(flight => {
        const flightCard = document.createElement('div');
        flightCard.className = 'flight-card';
        flightCard.innerHTML = `
            <div class="flight-info">
                <div class="airline">${flight.airline.toUpperCase()}</div>
                <div class="route">
                    <span>${flight.from}</span>
                    <i class="fas fa-plane"></i>
                    <span>${flight.to}</span>
                </div>
                <div class="details">
                    <div>
                        <small>Departure</small>
                        <p>${flight.departure}</p>
                    </div>
                    <div>
                        <small>Arrival</small>
                        <p>${flight.arrival}</p>
                    </div>
                    <div>
                        <small>Duration</small>
                        <p>${flight.duration}</p>
                    </div>
                </div>
                <div class="price">$${flight.price}</div>
                <button class="book-btn">Book Now</button>
            </div>
        `;
        flightResults.appendChild(flightCard);
    });
}

// Filter flights based on airline and price range
function filterFlights() {
    const airlineFilter = document.getElementById('airline-filter').value;
    const priceFilter = document.getElementById('price-filter').value;

    let filteredFlights = flights;

    if (airlineFilter) {
        filteredFlights = filteredFlights.filter(flight => flight.airline === airlineFilter);
    }

    if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(num => parseInt(num));
        filteredFlights = filteredFlights.filter(flight => {
            if (max) {
                return flight.price >= min && flight.price <= max;
            } else {
                return flight.price >= min;
            }
        });
    }

    displayFlights(filteredFlights);
}

// Add event listeners to filters
document.getElementById('airline-filter').addEventListener('change', filterFlights);
document.getElementById('price-filter').addEventListener('change', filterFlights);

// Initialize flight display
displayFlights();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Date input handling
function setupDateInputs() {
    const dayInput = document.querySelector('.day-input');
    const monthInput = document.querySelector('.month-input');
    const yearInput = document.querySelector('.year-input');
    const returnDateInput = document.querySelector('.date-single-input');
    const dateHelpers = document.querySelectorAll('.date-helper');

    // Helper function to format number with leading zero
    const formatNumber = (num) => num.toString().padStart(2, '0');

    // Helper function to validate date
    const isValidDate = (day, month, year) => {
        const date = new Date(year, month - 1, day);
        return date.getDate() === parseInt(day) && 
               date.getMonth() === month - 1 && 
               date.getFullYear() === parseInt(year);
    };

    // Helper function to show error
    const showError = (input, helper, message) => {
        input.classList.add('invalid');
        helper.textContent = message;
        helper.classList.add('error');
        
        // Remove error state after animation
        setTimeout(() => {
            input.classList.remove('invalid');
        }, 400);
    };

    // Helper function to reset error
    const resetError = (input, helper, defaultMessage) => {
        input.classList.remove('invalid');
        helper.textContent = defaultMessage;
        helper.classList.remove('error');
    };

    // Setup travel date inputs
    const validateTravelDate = () => {
        const day = dayInput.value;
        const month = monthInput.value;
        const year = yearInput.value;
        const helper = dateHelpers[0];

        if (day && month && year) {
            if (!isValidDate(day, month, year)) {
                showError(dayInput, helper, 'Please enter a valid date');
                showError(monthInput, helper, 'Please enter a valid date');
                showError(yearInput, helper, 'Please enter a valid date');
                return false;
            }
            
            const selectedDate = new Date(year, month - 1, day);
            const today = new Date();
            
            if (selectedDate < today) {
                showError(dayInput, helper, 'Travel date cannot be in the past');
                showError(monthInput, helper, 'Travel date cannot be in the past');
                showError(yearInput, helper, 'Travel date cannot be in the past');
                return false;
            }
        }
        
        resetError(dayInput, helper, 'Enter date in DD/MM/YYYY format');
        resetError(monthInput, helper, 'Enter date in DD/MM/YYYY format');
        resetError(yearInput, helper, 'Enter date in DD/MM/YYYY format');
        return true;
    };

    // Setup day input
    dayInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
            value = Math.min(31, parseInt(value));
            e.target.value = formatNumber(value);
            if (e.target.value.length === 2) {
                validateTravelDate();
                monthInput.focus();
            }
        }
    });

    // Setup month input
    monthInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
            value = Math.min(12, parseInt(value));
            e.target.value = formatNumber(value);
            if (e.target.value.length === 2) {
                validateTravelDate();
                yearInput.focus();
            }
        }
    });

    // Setup year input
    yearInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
            const currentYear = new Date().getFullYear();
            value = Math.max(currentYear, Math.min(currentYear + 2, parseInt(value)));
            e.target.value = value;
            if (e.target.value.length === 4) {
                validateTravelDate();
            }
        }
    });

    // Setup return date input
    returnDateInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^\d/]/g, '');
        
        // Add slashes automatically
        if (value.length >= 2 && value.charAt(2) !== '/') {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        if (value.length >= 5 && value.charAt(5) !== '/') {
            value = value.slice(0, 5) + '/' + value.slice(5);
        }
        
        // Limit the length
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        e.target.value = value;
    });

    // Validate return date
    returnDateInput.addEventListener('blur', () => {
        const helper = dateHelpers[1];
        const parts = returnDateInput.value.split('/');
        
        if (returnDateInput.value && parts.length === 3) {
            const day = parseInt(parts[0]);
            const month = parseInt(parts[1]);
            const year = parseInt(parts[2]);
            
            if (!isValidDate(day, month, year)) {
                showError(returnDateInput, helper, 'Please enter a valid date');
                return;
            }
            
            // Check if return date is after travel date
            if (dayInput.value && monthInput.value && yearInput.value) {
                const travelDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
                const returnDate = new Date(year, month - 1, day);
                
                if (returnDate <= travelDate) {
                    showError(returnDateInput, helper, 'Return date must be after travel date');
                    return;
                }
            }
            
            resetError(returnDateInput, helper, 'Optional - Leave empty for one-way flight');
        }
    });

    // Add blur validation for travel date inputs
    [dayInput, monthInput, yearInput].forEach(input => {
        input.addEventListener('blur', validateTravelDate);
    });
}

// Popular cities for suggestions
const popularCities = [
    { name: 'New York', code: 'NYC', country: 'United States' },
    { name: 'London', code: 'LON', country: 'United Kingdom' },
    { name: 'Paris', code: 'PAR', country: 'France' },
    { name: 'Tokyo', code: 'TYO', country: 'Japan' },
    { name: 'Dubai', code: 'DXB', country: 'United Arab Emirates' },
    { name: 'Singapore', code: 'SIN', country: 'Singapore' },
    { name: 'Hong Kong', code: 'HKG', country: 'China' },
    { name: 'Bangkok', code: 'BKK', country: 'Thailand' },
    { name: 'Sydney', code: 'SYD', country: 'Australia' },
    { name: 'Seoul', code: 'SEL', country: 'South Korea' }
];

// Setup city input suggestions
function setupCityInputs() {
    const fromInput = document.getElementById('fromInput');
    const toInput = document.getElementById('toInput');
    const fromSuggestions = document.getElementById('fromSuggestions');
    const toSuggestions = document.getElementById('toSuggestions');

    function showSuggestions(input, suggestionsElement) {
        const value = input.value.toLowerCase();
        if (!value) {
            suggestionsElement.classList.remove('active');
            return;
        }

        const matches = popularCities.filter(city => 
            city.name.toLowerCase().includes(value) || 
            city.code.toLowerCase().includes(value) ||
            city.country.toLowerCase().includes(value)
        );

        if (matches.length > 0) {
            suggestionsElement.innerHTML = matches.map(city => `
                <div class="suggestion-item">
                    <i class="fas fa-city"></i>
                    <div>
                        <strong>${city.name}</strong> (${city.code})
                        <div style="font-size: 0.8em; color: #666;">${city.country}</div>
                    </div>
                </div>
            `).join('');
            suggestionsElement.classList.add('active');
        } else {
            suggestionsElement.classList.remove('active');
        }
    }

    function setupInput(input, suggestionsElement) {
        input.addEventListener('input', () => showSuggestions(input, suggestionsElement));
        input.addEventListener('focus', () => {
            if (input.value) {
                showSuggestions(input, suggestionsElement);
            }
        });

        // Handle suggestion clicks
        suggestionsElement.addEventListener('click', (e) => {
            const suggestionItem = e.target.closest('.suggestion-item');
            if (suggestionItem) {
                const cityName = suggestionItem.querySelector('strong').textContent;
                input.value = cityName;
                suggestionsElement.classList.remove('active');
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !suggestionsElement.contains(e.target)) {
                suggestionsElement.classList.remove('active');
            }
        });
    }

    setupInput(fromInput, fromSuggestions);
    setupInput(toInput, toSuggestions);
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    setupDateInputs();
    setupCityInputs();
});
