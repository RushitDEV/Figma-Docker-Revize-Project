// Import Bootstrap JS functionality
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

// Import Stimulus and Turbo
import '@hotwired/turbo';
import './bootstrap.js';

// Import all CSS files
import './styles/app.css';
import './styles/components/root.css';
import './styles/components/fonts.css';
import './styles/components/header.css';
import './styles/components/utility.css';
import './styles/components/hero_section.css';
import './styles/components/card_featured.css';
import './styles/components/accordion_item.css';
import './styles/components/bibliography.css';
//import './styles/components/scrollbar.css';
import './styles/components/social_buttons.css';
import './styles/components/social_links.css';
import './styles/components/list_group.css';
import './styles/components/footer.css';
import './styles/components/breadcrumb.css';
import './styles/components/academic_paper_card.css';



console.log('AssetMapper loaded successfully! 🎉');


import './controllers/accordion.js';
import './controllers/header.js';

