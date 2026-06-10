const translations = {
    en: {
        'donate-btn': 'DONATE',
        'nav-about': 'About us',
        'sub-goal': 'Our goal',
        'sub-org': 'Organization',
        'sub-plans': 'Plans',
        'nav-what': 'What we do',
        'sub-projects': 'Projects',
        'sub-youth': 'The Young People',
        'nav-participate': 'Participate',
        'sub-onetime': 'One-time Donation',
        'sub-donor': 'become a donor',
        'nav-news': 'News & stories',
        'sub-photos': 'Photos',
        'sub-videos': 'videos',
        'sub-stories': 'Stories',
        'nav-contact': 'Contact',
        'who-btn': 'Who are we?'
    },
    nl: {
        'donate-btn': 'DONEREN',
        'nav-about': 'Over ons',
        'sub-goal': 'Ons doel',
        'sub-org': 'Organisatie',
        'sub-plans': 'Plannen',
        'nav-what': 'Wat we doen',
        'sub-projects': 'Projecten',
        'sub-youth': 'De Jongeren',
        'nav-participate': 'Deelnemen',
        'sub-onetime': 'Eenmalige donatie',
        'sub-donor': 'Word donateur',
        'nav-news': 'Nieuws & verhalen',
        'sub-photos': 'Foto\'s',
        'sub-videos': 'Video\'s',
        'sub-stories': 'Verhalen',
        'nav-contact': 'Contact',
        'who-btn': 'Wie zijn wij?'
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    if (lang === currentLang) return;
    
    currentLang = lang;
    
    // Update active button styling
    document.getElementById('lang-eng').classList.toggle('active', lang === 'en');
    document.getElementById('lang-nl').classList.toggle('active', lang === 'nl');
    
    // Translate texts
    const dict = translations[lang];
    for (const [id, text] of Object.entries(dict)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }
}

document.getElementById('lang-eng').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-nl').addEventListener('click', () => setLanguage('nl'));

// Direct to donate section when clicked
document.getElementById('donate-btn').addEventListener('click', () => {
    alert(currentLang === 'en' ? "Redirecting to Donate Section" : "Doorsturen naar Donatie Sectie");
});

// Dropdown click functionality
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click from closing it immediately
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown.show').forEach(dropdown => {
            if (dropdown.previousElementSibling !== btn) {
                dropdown.classList.remove('show');
            }
        });
        
        // Toggle current dropdown
        const dropdown = btn.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown')) {
            dropdown.classList.toggle('show');
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown.show').forEach(dropdown => {
        dropdown.classList.remove('show');
    });
});

// Prevent dropdown clicks from closing themselves
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
