// ============================================
// JOURNAL PAGE SCRIPT - RED DOT TOURS
// ============================================

// Complete Article Database
const articlesDB = {
    'the-sacred-city-of-kandy': {
        slug: 'the-sacred-city-of-kandy',
        title: "The Sacred City of Kandy: Where Tradition Meets Tranquility",
        category: "culture",
        categoryDisplay: "Culture & Heritage",
        region: "hill-country",
        date: "March 15, 2025",
        readTime: "8 min read",
        author: "Samanthie Perera",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        featuredImage: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
        excerpt: "Discover the spiritual heart of Sri Lanka, where ancient rituals and the Temple of the Tooth create an atmosphere unlike anywhere else.",
        featured: true
    },
    'guide-to-sri-lanka-wildlife-safaris': {
        slug: 'guide-to-sri-lanka-wildlife-safaris',
        title: "A Guide to Sri Lanka's Best Wildlife Safaris",
        category: "wildlife",
        categoryDisplay: "Wildlife & Nature",
        region: "coastal",
        date: "March 10, 2025",
        readTime: "6 min read",
        author: "Mark Wilson",
        image: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        featuredImage: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
        excerpt: "From leopards in Yala to elephants in Udawalawe, discover the best places to witness Sri Lanka's incredible biodiversity.",
        featured: false
    },
    'flavours-of-jaffna-culinary-journey': {
        slug: 'flavours-of-jaffna-culinary-journey',
        title: "The Flavours of Jaffna: A Culinary Journey",
        category: "food",
        categoryDisplay: "Food & Culinary",
        region: "coastal",
        date: "March 5, 2025",
        readTime: "7 min read",
        author: "Priya Kumar",
        image: "https://images.pexels.com/photos/4045581/pexels-photo-4045581.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        featuredImage: "https://images.pexels.com/photos/4045581/pexels-photo-4045581.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
        excerpt: "Explore the unique Tamil cuisine of Northern Sri Lanka, from crab curry to traditional sweets.",
        featured: false
    },
    'hidden-beaches-sri-lanka': {
        slug: 'hidden-beaches-sri-lanka',
        title: "5 Hidden Beaches You Won't Find in Guidebooks",
        category: "travel-tips",
        categoryDisplay: "Travel Tips",
        region: "coastal",
        date: "February 28, 2025",
        readTime: "5 min read",
        author: "Emma Thompson",
        image: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        featuredImage: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
        excerpt: "Escape the crowds and discover secluded coastal gems along Sri Lanka's southern and eastern shores.",
        featured: false
    },
    'art-of-ceylon-tea': {
        slug: 'art-of-ceylon-tea',
        title: "The Art of Ceylon Tea: From Leaf to Cup",
        category: "culture",
        categoryDisplay: "Culture & Heritage",
        region: "hill-country",
        date: "February 22, 2025",
        readTime: "6 min read",
        author: "Samanthie Perera",
        image: "https://images.pexels.com/photos/1461282/pexels-photo-1461282.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        featuredImage: "https://images.pexels.com/photos/1461282/pexels-photo-1461282.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
        excerpt: "Visit the misty tea plantations of Nuwara Eliya and learn about the centuries-old tradition of Ceylon tea.",
        featured: false
    },
    'interview-local-fisherman-mirissa': {
        slug: 'interview-local-fisherman-mirissa',
        title: "Interview: A Local Fisherman's Life in Mirissa",
        category: "interviews",
        categoryDisplay: "Interviews",
        region: "coastal",
        date: "February 18, 2025",
        readTime: "9 min read",
        author: "James Carter",
        image: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        featuredImage: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
        excerpt: "Meet Dayan, a third-generation fisherman who shares stories of life on the Indian Ocean.",
        featured: false
    }
};

const regularArticles = Object.values(articlesDB).filter(a => !a.featured);
let activeFilters = [];
let currentPage = 1;
const itemsPerPage = 6;
let filteredArticles = [...regularArticles];

function getCategoryName(category) {
    const categories = {
        'culture': 'Culture & Heritage',
        'wildlife': 'Wildlife & Nature',
        'food': 'Food & Culinary',
        'travel-tips': 'Travel Tips',
        'interviews': 'Interviews',
        'sustainable': 'Sustainable Travel'
    };
    return categories[category] || category;
}

function renderArticles() {
    if (activeFilters.length > 0) {
        filteredArticles = regularArticles.filter(article => 
            activeFilters.some(filter => 
                article.category === filter || article.region === filter
            )
        );
    } else {
        filteredArticles = [...regularArticles];
    }
    
    const filterCount = document.getElementById('filterCount');
    const clearAll = document.getElementById('clearAll');
    if (filterCount) filterCount.textContent = filteredArticles.length;
    if (clearAll) clearAll.classList.toggle('visible', activeFilters.length > 0);
    
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredArticles.slice(startIndex, endIndex);
    
    const grid = document.getElementById('articlesGrid');
    if (grid) {
        grid.innerHTML = paginatedItems.map(article => `
            <a href="article.html?slug=${article.slug}" class="article-card">
                <div class="article-image-square">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="article-description-outer">
                    <div class="article-description-inner">
                        <span class="article-category">${article.categoryDisplay}</span>
                        <h3 class="article-title">${article.title}</h3>
                        <p class="article-excerpt">${article.excerpt.substring(0, 80)}...</p>
                        <div class="article-meta">
                            <span>📅 ${article.date}</span>
                            <span>⏱ ${article.readTime}</span>
                        </div>
                        <span class="article-btn">Read Article →</span>
                    </div>
                </div>
            </a>
        `).join('');
    }
    
    updatePaginationButtons(totalPages);
}

function updatePaginationButtons(totalPages) {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageNumbersContainer = document.getElementById('pageNumbers');
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    if (!pageNumbersContainer) return;
    
    let pageNumbersHtml = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        pageNumbersHtml += `<div class="page-number" data-page="1">1</div>`;
        if (startPage > 2) pageNumbersHtml += `<span class="page-dots">...</span>`;
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pageNumbersHtml += `<div class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</div>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbersHtml += `<span class="page-dots">...</span>`;
        pageNumbersHtml += `<div class="page-number" data-page="${totalPages}">${totalPages}</div>`;
    }
    
    pageNumbersContainer.innerHTML = pageNumbersHtml;
    
    document.querySelectorAll('.page-number').forEach(el => {
        el.addEventListener('click', () => {
            const page = parseInt(el.dataset.page);
            if (!isNaN(page) && page !== currentPage) {
                currentPage = page;
                renderArticles();
            }
        });
    });
}

function initFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const filterValue = tag.dataset.filter;
            if (activeFilters.includes(filterValue)) {
                activeFilters = activeFilters.filter(f => f !== filterValue);
                tag.classList.remove('active');
            } else {
                activeFilters.push(filterValue);
                tag.classList.add('active');
            }
            currentPage = 1;
            renderArticles();
        });
    });
    
    const clearAll = document.getElementById('clearAll');
    if (clearAll) {
        clearAll.addEventListener('click', (e) => {
            e.preventDefault();
            activeFilters = [];
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            currentPage = 1;
            renderArticles();
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderArticles();
    initFilters();
    
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderArticles();
            }
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderArticles();
            }
        });
    }
    
    // Lenis Smooth Scroll
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    
    // Scroll indicator click
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const overviewSection = document.querySelector('.intro-text-section');
            if (overviewSection) lenis.scrollTo(overviewSection, { offset: -70 });
        });
    }
    
    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            lenis.scrollTo(0, { immediate: true });
        });
    }
});