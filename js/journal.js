// ============================================
// JOURNAL PAGE SCRIPT - RED DOT TOURS
// ============================================

// Complete Article Database
//const articlesDB = {
//    'the-sacred-city-of-kandy': {
//        slug: 'the-sacred-city-of-kandy',
//        title: "The Sacred City of Kandy: Where Tradition Meets Tranquility",
//        category: "culture",
//        categoryDisplay: "Culture & Heritage",
//        region: "hill-country",
//        date: "March 15, 2025",
//        readTime: "8 min read",
//        author: "Samanthie Perera",
//        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//        featuredImage: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
//        excerpt: "Discover the spiritual heart of Sri Lanka, where ancient rituals and the Temple of the Tooth create an atmosphere unlike anywhere else.",
//        featured: true
//    },
//    'guide-to-sri-lanka-wildlife-safaris': {
//        slug: 'guide-to-sri-lanka-wildlife-safaris',
//        title: "A Guide to Sri Lanka's Best Wildlife Safaris",
//        category: "wildlife",
//        categoryDisplay: "Wildlife & Nature",
//        region: "coastal",
//        date: "March 10, 2025",
//        readTime: "6 min read",
//        author: "Mark Wilson",
//        image: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//        featuredImage: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
//        excerpt: "From leopards in Yala to elephants in Udawalawe, discover the best places to witness Sri Lanka's incredible biodiversity.",
//        featured: false
//    },
//    'flavours-of-jaffna-culinary-journey': {
//        slug: 'flavours-of-jaffna-culinary-journey',
//        title: "The Flavours of Jaffna: A Culinary Journey",
//        category: "food",
//        categoryDisplay: "Food & Culinary",
//        region: "coastal",
//        date: "March 5, 2025",
//        readTime: "7 min read",
//        author: "Priya Kumar",
//        image: "https://images.pexels.com/photos/4045581/pexels-photo-4045581.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//        featuredImage: "https://images.pexels.com/photos/4045581/pexels-photo-4045581.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
//        excerpt: "Explore the unique Tamil cuisine of Northern Sri Lanka, from crab curry to traditional sweets.",
//        featured: false
//    },
//    'hidden-beaches-sri-lanka': {
//        slug: 'hidden-beaches-sri-lanka',
//        title: "5 Hidden Beaches You Won't Find in Guidebooks",
//        category: "travel-tips",
//        categoryDisplay: "Travel Tips",
//        region: "coastal",
//        date: "February 28, 2025",
//        readTime: "5 min read",
//        author: "Emma Thompson",
//        image: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//        featuredImage: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
//        excerpt: "Escape the crowds and discover secluded coastal gems along Sri Lanka's southern and eastern shores.",
//        featured: false
//    },
//    'art-of-ceylon-tea': {
//        slug: 'art-of-ceylon-tea',
//        title: "The Art of Ceylon Tea: From Leaf to Cup",
//        category: "culture",
//        categoryDisplay: "Culture & Heritage",
//        region: "hill-country",
//        date: "February 22, 2025",
//        readTime: "6 min read",
//        author: "Samanthie Perera",
//        image: "https://images.pexels.com/photos/1461282/pexels-photo-1461282.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//        featuredImage: "https://images.pexels.com/photos/1461282/pexels-photo-1461282.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
//        excerpt: "Visit the misty tea plantations of Nuwara Eliya and learn about the centuries-old tradition of Ceylon tea.",
//        featured: false
//    },
//    'interview-local-fisherman-mirissa': {
//        slug: 'interview-local-fisherman-mirissa',
//        title: "Interview: A Local Fisherman's Life in Mirissa",
//        category: "interviews",
//        categoryDisplay: "Interviews",
//        region: "coastal",
//        date: "February 18, 2025",
//        readTime: "9 min read",
//        author: "James Carter",
//        image: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//        featuredImage: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
//        excerpt: "Meet Dayan, a third-generation fisherman who shares stories of life on the Indian Ocean.",
//        featured: false
//    }
//};
//
//const regularArticles = Object.values(articlesDB).filter(a => !a.featured);
//let activeFilters = [];
//let currentPage = 1;
//const itemsPerPage = 6;
//let filteredArticles = [...regularArticles];
//
//function getCategoryName(category) {
//    const categories = {
//        'culture': 'Culture & Heritage',
//        'wildlife': 'Wildlife & Nature',
//        'food': 'Food & Culinary',
//        'travel-tips': 'Travel Tips',
//        'interviews': 'Interviews',
//        'sustainable': 'Sustainable Travel'
//    };
//    return categories[category] || category;
//}
//
//function renderArticles() {
//    if (activeFilters.length > 0) {
//        filteredArticles = regularArticles.filter(article => 
//            activeFilters.some(filter => 
//                article.category === filter || article.region === filter
//            )
//        );
//    } else {
//        filteredArticles = [...regularArticles];
//    }
//    
//    const filterCount = document.getElementById('filterCount');
//    const clearAll = document.getElementById('clearAll');
//    if (filterCount) filterCount.textContent = filteredArticles.length;
//    if (clearAll) clearAll.classList.toggle('visible', activeFilters.length > 0);
//    
//    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
//    const startIndex = (currentPage - 1) * itemsPerPage;
//    const endIndex = startIndex + itemsPerPage;
//    const paginatedItems = filteredArticles.slice(startIndex, endIndex);
//    
//    const grid = document.getElementById('articlesGrid');
//    if (grid) {
//        grid.innerHTML = paginatedItems.map(article => `
//            <a href="article.html?slug=${article.slug}" class="article-card">
//                <div class="article-image-square">
//                    <img src="${article.image}" alt="${article.title}">
//                </div>
//                <div class="article-description-outer">
//                    <div class="article-description-inner">
//                        <span class="article-category">${article.categoryDisplay}</span>
//                        <h3 class="article-title">${article.title}</h3>
//                        <p class="article-excerpt">${article.excerpt.substring(0, 80)}...</p>
//                        <div class="article-meta">
//                            <span>📅 ${article.date}</span>
//                            <span>⏱ ${article.readTime}</span>
//                        </div>
//                        <span class="article-btn">Read Article →</span>
//                    </div>
//                </div>
//            </a>
//        `).join('');
//    }
//    
//    updatePaginationButtons(totalPages);
//}
//
//function updatePaginationButtons(totalPages) {
//    const prevBtn = document.getElementById('prevPageBtn');
//    const nextBtn = document.getElementById('nextPageBtn');
//    const pageNumbersContainer = document.getElementById('pageNumbers');
//    
//    if (prevBtn) prevBtn.disabled = currentPage === 1;
//    if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;
//    
//    if (!pageNumbersContainer) return;
//    
//    let pageNumbersHtml = '';
//    const maxVisiblePages = 5;
//    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
//    
//    if (endPage - startPage + 1 < maxVisiblePages) {
//        startPage = Math.max(1, endPage - maxVisiblePages + 1);
//    }
//    
//    if (startPage > 1) {
//        pageNumbersHtml += `<div class="page-number" data-page="1">1</div>`;
//        if (startPage > 2) pageNumbersHtml += `<span class="page-dots">...</span>`;
//    }
//    
//    for (let i = startPage; i <= endPage; i++) {
//        pageNumbersHtml += `<div class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</div>`;
//    }
//    
//    if (endPage < totalPages) {
//        if (endPage < totalPages - 1) pageNumbersHtml += `<span class="page-dots">...</span>`;
//        pageNumbersHtml += `<div class="page-number" data-page="${totalPages}">${totalPages}</div>`;
//    }
//    
//    pageNumbersContainer.innerHTML = pageNumbersHtml;
//    
//    document.querySelectorAll('.page-number').forEach(el => {
//        el.addEventListener('click', () => {
//            const page = parseInt(el.dataset.page);
//            if (!isNaN(page) && page !== currentPage) {
//                currentPage = page;
//                renderArticles();
//            }
//        });
//    });
//}
//
//function initFilters() {
//    const filterTags = document.querySelectorAll('.filter-tag');
//    filterTags.forEach(tag => {
//        tag.addEventListener('click', () => {
//            const filterValue = tag.dataset.filter;
//            if (activeFilters.includes(filterValue)) {
//                activeFilters = activeFilters.filter(f => f !== filterValue);
//                tag.classList.remove('active');
//            } else {
//                activeFilters.push(filterValue);
//                tag.classList.add('active');
//            }
//            currentPage = 1;
//            renderArticles();
//        });
//    });
//    
//    const clearAll = document.getElementById('clearAll');
//    if (clearAll) {
//        clearAll.addEventListener('click', (e) => {
//            e.preventDefault();
//            activeFilters = [];
//            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
//            currentPage = 1;
//            renderArticles();
//        });
//    }
//}
//
//// Initialize
//document.addEventListener('DOMContentLoaded', function() {
//    renderArticles();
//    initFilters();
//    
//    const prevBtn = document.getElementById('prevPageBtn');
//    const nextBtn = document.getElementById('nextPageBtn');
//    if (prevBtn) {
//        prevBtn.addEventListener('click', () => {
//            if (currentPage > 1) {
//                currentPage--;
//                renderArticles();
//            }
//        });
//    }
//    if (nextBtn) {
//        nextBtn.addEventListener('click', () => {
//            const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
//            if (currentPage < totalPages) {
//                currentPage++;
//                renderArticles();
//            }
//        });
//    }
//    
//    // Lenis Smooth Scroll
//    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
//    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
//    requestAnimationFrame(raf);
//    
//    // Scroll indicator click
//    const scrollIndicator = document.getElementById('scrollIndicator');
//    if (scrollIndicator) {
//        scrollIndicator.addEventListener('click', () => {
//            const overviewSection = document.querySelector('.intro-text-section');
//            if (overviewSection) lenis.scrollTo(overviewSection, { offset: -70 });
//        });
//    }
//    
//    // Back to top
//    const backToTop = document.getElementById('backToTop');
//    if (backToTop) {
//        backToTop.addEventListener('click', (e) => {
//            e.preventDefault();
//            lenis.scrollTo(0, { immediate: true });
//        });
//    }
//});

// ============================================
// JOURNAL PAGE SCRIPT - SUPABASE BLOG VERSION
// ============================================

let allArticles = [];
let regularArticles = [];
let featuredArticle = null;

let activeFilters = [];
let currentPage = 1;
const itemsPerPage = 6;
let filteredArticles = [];

// ------------------------------
// HELPERS
// ------------------------------
function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function stripHtml(value) {
  if (!value) return "";
  const div = document.createElement("div");
  div.innerHTML = value;
  return div.textContent || div.innerText || "";
}

function estimateReadTimeFromContent(row) {
  const parts = [];

  if (row.excerpt) parts.push(row.excerpt);
  if (row.content?.intro) parts.push(row.content.intro);
  if (row.content?.blockquote) parts.push(row.content.blockquote);
  if (row.content?.pullQuote) parts.push(row.content.pullQuote);

  if (Array.isArray(row.content?.sections)) {
    row.content.sections.forEach(section => {
      if (section.heading) parts.push(section.heading);
      if (Array.isArray(section.paragraphs)) {
        parts.push(section.paragraphs.join(" "));
      }
    });
  }

  const text = stripHtml(parts.join(" "));
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.max(3, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function normaliseRegion(row) {
  // Optional support for region if you add it later
  return (
    row.region ||
    row.content?.region ||
    row.content?.meta?.region ||
    ""
  );
}

function mapBlogPostToArticle(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title || "Untitled Article",
    category: row.category || "general",
    categoryDisplay: row.category_display || row.category || "General",
    excerpt: row.excerpt || row.content?.intro || "",
    author: row.author || "Serendib Escape",
    image: row.card_image || row.hero_image || "",
    featuredImage: row.hero_image || row.card_image || "",
    date: formatDate(row.published_at || row.created_at),
    readTime: estimateReadTimeFromContent(row),
    region: normaliseRegion(row),
    publishedAt: row.published_at || row.created_at,
    featured: row.layout_type === "feature",
  };
}

function slugToLabel(value) {
  return String(value || "")
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

// ------------------------------
// DATA LOADING
// ------------------------------
async function loadArticlesFromSupabase() {
  const grid = document.getElementById("articlesGrid");
  if (grid) {
    grid.innerHTML = `
      <div class="loading-cell" style="grid-column: 1 / -1; padding: 24px; text-align: center;">
        Loading articles...
      </div>
    `;
  }

  if (typeof supabaseClient === "undefined") {
    console.error("supabaseClient is not defined.");
    if (grid) {
      grid.innerHTML = `
        <div class="loading-cell" style="grid-column: 1 / -1; padding: 24px; text-align: center;">
          Could not load articles. Supabase client is missing.
        </div>
      `;
    }
    return;
  }

  const { data, error } = await supabaseClient
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });
  console.log(data);

  if (error) {
    console.error("Error loading blog posts:", error);
    if (grid) {
      grid.innerHTML = `
        <div class="loading-cell" style="grid-column: 1 / -1; padding: 24px; text-align: center;">
          Could not load articles.
        </div>
      `;
    }
    return;
  }

  allArticles = (data || []).map(mapBlogPostToArticle);

  // Pick featured article:
  // 1) first explicit featured article
  // 2) otherwise newest published article
  featuredArticle =
    allArticles.find(article => article.featured) ||
    allArticles[0] ||
    null;

  regularArticles = allArticles.filter(article => {
    if (!featuredArticle) return true;
    return article.slug !== featuredArticle.slug;
  });

  buildCategoryFilters();
  buildRegionFilters();
  renderFeaturedArticle();
  renderArticles();
}

// ------------------------------
// FILTER BUILDERS
// ------------------------------
function buildCategoryFilters() {
  const filterTags = document.getElementById("filterTags");
  if (!filterTags) return;

  const uniqueCategories = [...new Map(
    allArticles
      .filter(article => article.category)
      .map(article => [article.category, article.categoryDisplay || article.category])
  ).entries()];

  filterTags.innerHTML = uniqueCategories.map(([value, label]) => `
    <button class="filter-tag" data-filter="${escapeHtml(value)}">${escapeHtml(label)}</button>
  `).join("");

  bindFilterTagEvents(filterTags.querySelectorAll(".filter-tag"));
}

function buildRegionFilters() {
  const regionTags = document.getElementById("regionTags");
  if (!regionTags) return;

  const regionGroup = regionTags.closest(".filter-group");
  const uniqueRegions = [...new Set(
    allArticles
      .map(article => article.region)
      .filter(Boolean)
  )];

  if (!uniqueRegions.length) {
    if (regionGroup) regionGroup.style.display = "none";
    return;
  }

  if (regionGroup) regionGroup.style.display = "";

  regionTags.innerHTML = uniqueRegions.map(region => `
    <button class="filter-tag" data-filter="${escapeHtml(region)}">${escapeHtml(slugToLabel(region))}</button>
  `).join("");

  bindFilterTagEvents(regionTags.querySelectorAll(".filter-tag"));
}

function bindFilterTagEvents(tags) {
  tags.forEach(tag => {
    tag.addEventListener("click", () => {
      const filterValue = tag.dataset.filter;

      if (activeFilters.includes(filterValue)) {
        activeFilters = activeFilters.filter(item => item !== filterValue);
        tag.classList.remove("active");
      } else {
        activeFilters.push(filterValue);
        tag.classList.add("active");
      }

      currentPage = 1;
      renderArticles();
    });
  });
}

// ------------------------------
// FEATURED ARTICLE
// ------------------------------
function renderFeaturedArticle() {
  const featuredEl = document.querySelector(".featured-article");
  if (!featuredEl) return;

  if (!featuredArticle) {
    featuredEl.style.display = "none";
    return;
  }

  featuredEl.style.display = "";
  featuredEl.href = `article.html?slug=${encodeURIComponent(featuredArticle.slug)}`;
  featuredEl.innerHTML = `
    <div class="featured-image-full">
      <img src="${escapeHtml(featuredArticle.featuredImage || featuredArticle.image || "")}" alt="${escapeHtml(featuredArticle.title)}">
    </div>
    <div class="featured-description-box">
      <div>
        <span class="featured-category">${escapeHtml(featuredArticle.categoryDisplay)}</span>
        <h3 class="featured-title">${escapeHtml(featuredArticle.title)}</h3>
        <p class="featured-excerpt">${escapeHtml(featuredArticle.excerpt || "")}</p>
      </div>
      <span class="read-article-btn">Read Article →</span>
    </div>
  `;
}

// ------------------------------
// ARTICLE RENDERING
// ------------------------------
function applyFilters() {
  if (!activeFilters.length) {
    filteredArticles = [...regularArticles];
    return;
  }

  filteredArticles = regularArticles.filter(article =>
    activeFilters.some(filter =>
      article.category === filter || article.region === filter
    )
  );
}

function renderArticles() {
  applyFilters();

  const filterCount = document.getElementById("filterCount");
  const clearAll = document.getElementById("clearAll");

  if (filterCount) filterCount.textContent = filteredArticles.length;
  if (clearAll) clearAll.classList.toggle("visible", activeFilters.length > 0);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredArticles.slice(startIndex, endIndex);

  const grid = document.getElementById("articlesGrid");
  if (!grid) return;

  if (!paginatedItems.length) {
    grid.innerHTML = `
      <div class="loading-cell" style="grid-column: 1 / -1; padding: 24px; text-align: center;">
        No articles found.
      </div>
    `;
    updatePaginationButtons(0);
    return;
  }

  grid.innerHTML = paginatedItems.map(article => `
    <a href="article.html?slug=${encodeURIComponent(article.slug)}" class="article-card">
      <div class="article-image-square">
        <img src="${escapeHtml(article.image || article.featuredImage || "")}" alt="${escapeHtml(article.title)}">
      </div>
      <div class="article-description-outer">
        <div class="article-description-inner">
          <span class="article-category">${escapeHtml(article.categoryDisplay)}</span>
          <h3 class="article-title">${escapeHtml(article.title)}</h3>
          <p class="article-excerpt">${escapeHtml((article.excerpt || "").slice(0, 110))}${article.excerpt && article.excerpt.length > 110 ? "..." : ""}</p>
          <div class="article-meta">
            <span>📅 ${escapeHtml(article.date)}</span>
            <span>⏱ ${escapeHtml(article.readTime)}</span>
          </div>
          <span class="article-btn">Read Article →</span>
        </div>
      </div>
    </a>
  `).join("");

  updatePaginationButtons(Math.ceil(filteredArticles.length / itemsPerPage));
}

function updatePaginationButtons(totalPages) {
  const paginationContainer = document.getElementById("paginationContainer");
  const prevBtn = document.getElementById("prevPageBtn");
  const nextBtn = document.getElementById("nextPageBtn");
  const pageNumbersContainer = document.getElementById("pageNumbers");

  if (!paginationContainer || !prevBtn || !nextBtn || !pageNumbersContainer) return;

  if (totalPages <= 1) {
    paginationContainer.style.display = filteredArticles.length ? "none" : "none";
  } else {
    paginationContainer.style.display = "";
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;

  let pageNumbersHtml = "";
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
    pageNumbersHtml += `<div class="page-number ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</div>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pageNumbersHtml += `<span class="page-dots">...</span>`;
    pageNumbersHtml += `<div class="page-number" data-page="${totalPages}">${totalPages}</div>`;
  }

  pageNumbersContainer.innerHTML = pageNumbersHtml;

  pageNumbersContainer.querySelectorAll(".page-number").forEach(el => {
    el.addEventListener("click", () => {
      const page = parseInt(el.dataset.page, 10);
      if (!Number.isNaN(page) && page !== currentPage) {
        currentPage = page;
        renderArticles();
      }
    });
  });
}

// ------------------------------
// FILTER ACTIONS
// ------------------------------
function initClearAll() {
  const clearAll = document.getElementById("clearAll");
  if (!clearAll) return;

  clearAll.addEventListener("click", e => {
    e.preventDefault();
    activeFilters = [];
    document.querySelectorAll(".filter-tag").forEach(tag => tag.classList.remove("active"));
    currentPage = 1;
    renderArticles();
  });
}

// ------------------------------
// PAGINATION ACTIONS
// ------------------------------
function initPaginationButtons() {
  const prevBtn = document.getElementById("prevPageBtn");
  const nextBtn = document.getElementById("nextPageBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderArticles();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderArticles();
      }
    });
  }
}

// ------------------------------
// MISC UI
// ------------------------------
function initSmoothScroll() {
  if (typeof Lenis === "undefined") return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const scrollIndicator = document.getElementById("scrollIndicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const overviewSection = document.querySelector(".intro-text-section");
      if (overviewSection) lenis.scrollTo(overviewSection, { offset: -70 });
    });
  }

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", e => {
      e.preventDefault();
      lenis.scrollTo(0, { immediate: true });
    });
  }
}

// ------------------------------
// INIT
// ------------------------------
document.addEventListener("DOMContentLoaded", async function () {
  initClearAll();
  initPaginationButtons();
  initSmoothScroll();
  await loadArticlesFromSupabase();
});