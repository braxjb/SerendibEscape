// ============================================
// ARTICLE PAGE SCRIPT - RED DOT TOURS
// ============================================

// Complete Article Database
// const articlesDB = {
//     'the-sacred-city-of-kandy': {
//         id: 'the-sacred-city-of-kandy',
//         slug: 'the-sacred-city-of-kandy',
//         title: "The Sacred City of Kandy: Where Tradition Meets Tranquility",
//         category: "culture",
//         categoryDisplay: "Culture & Heritage",
//         date: "March 15, 2025",
//         readTime: "8 min read",
//         author: "Samanthie Perera",
//         image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
//         heroImage: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop",
//         content: `
//             <p>Nestled among misty hills and overlooking a serene lake, Kandy stands as the spiritual heart of Sri Lanka. This UNESCO World Heritage city is home to the sacred Temple of the Tooth Relic (Sri Dalada Maligawa), where the sacred tooth of Buddha is enshrined. For over 2,500 years, this relic has been a symbol of sovereignty and faith, drawing pilgrims and travellers from across the globe.</p>
//             
//             <h2>The Temple of the Sacred Tooth Relic</h2>
//             <p>The temple complex is an architectural marvel, blending Kandyan style with intricate woodwork, gold inlays, and ancient frescoes. The main shrine, known as the "Weda Hitana," is where daily rituals are performed, filling the air with the scent of frangipani and the sound of traditional drumming. The Esala Perahera, held annually in July or August, is a grand procession featuring dozens of elephants, dancers, and drummers — a spectacle that honours the sacred relic.</p>
//             
//             <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Temple of the Tooth, Kandy">
//             
//             <blockquote>"Kandy is not just a city; it is a living museum of Sri Lanka's cultural soul. Every corner tells a story."</blockquote>
//             
//             <h2>Beyond the Temple: The City of Kandy</h2>
//             <p>Beyond the temple, Kandy offers a wealth of experiences. The Royal Botanical Gardens in Peradeniya span 147 acres and house over 4,000 species of plants, including an avenue of royal palms and an orchid collection. A stroll around Kandy Lake, built by the last king of Sri Lanka, offers tranquil views of the city and temple.</p>
//             
//             <p>The city's cultural performances at the Kandy Lake Club showcase traditional Kandyan dance, fire-walking, and drumming — a vibrant introduction to Sri Lankan performing arts. For those seeking deeper cultural immersion, visits to nearby villages offer opportunities to learn about traditional crafts like batik, wood carving, and mask making.</p>
//             
//             <div class="pull-quote">"In Kandy, tradition is not preserved in museums — it is lived, daily, in the rhythm of life."</div>
//             
//             <h2>When to Visit and How to Experience Kandy</h2>
//             <p>The best time to visit Kandy is from December to April when the weather is dry and pleasant. The Esala Perahera in July/August is a spectacular time to experience the city at its most vibrant, though accommodation should be booked well in advance.</p>
//             
//             <p>For a truly immersive experience, consider staying in a heritage property or colonial-era bungalow. Many offer private tours of the temple, cooking classes featuring Kandyan cuisine, and guided walks through the surrounding hills. The nearby Knuckles Mountain Range provides excellent hiking opportunities for nature enthusiasts.</p>
//             
//             <h2>Preserving Tradition for Future Generations</h2>
//             <p>As tourism grows, so does the importance of sustainable practices. Many local initiatives focus on preserving Kandy's cultural heritage while ensuring that the benefits of tourism reach the local community. Visitors can support these efforts by choosing responsible tour operators, respecting sacred sites, and engaging with local artisans and businesses.</p>
//             
//             <p>Kandy is more than a destination — it's an invitation to step into a world where tradition meets tranquility, where every stone tells a story, and where the spirit of Sri Lanka finds its most eloquent expression.</p>
//         `,
//         excerpt: "Discover the spiritual heart of Sri Lanka, where ancient rituals and the Temple of the Tooth create an atmosphere unlike anywhere else."
//     },
//     'guide-to-sri-lanka-wildlife-safaris': {
//         id: 'guide-to-sri-lanka-wildlife-safaris',
//         slug: 'guide-to-sri-lanka-wildlife-safaris',
//         title: "A Guide to Sri Lanka's Best Wildlife Safaris",
//         category: "wildlife",
//         categoryDisplay: "Wildlife & Nature",
//         date: "March 10, 2025",
//         readTime: "6 min read",
//         author: "Mark Wilson",
//         image: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//         heroImage: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop",
//         excerpt: "From leopards in Yala to elephants in Udawalawe, discover the best places to witness Sri Lanka's incredible biodiversity.",
//         content: "<p>Full article content for Wildlife Safaris would go here...</p>"
//     },
//     'flavours-of-jaffna-culinary-journey': {
//         id: 'flavours-of-jaffna-culinary-journey',
//         slug: 'flavours-of-jaffna-culinary-journey',
//         title: "The Flavours of Jaffna: A Culinary Journey",
//         category: "food",
//         categoryDisplay: "Food & Culinary",
//         date: "March 5, 2025",
//         readTime: "7 min read",
//         author: "Priya Kumar",
//         image: "https://images.pexels.com/photos/4045581/pexels-photo-4045581.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//         heroImage: "https://images.pexels.com/photos/4045581/pexels-photo-4045581.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop",
//         excerpt: "Explore the unique Tamil cuisine of Northern Sri Lanka, from crab curry to traditional sweets.",
//         content: "<p>Full article content for Jaffna Cuisine would go here...</p>"
//     },
//     'hidden-beaches-sri-lanka': {
//         id: 'hidden-beaches-sri-lanka',
//         slug: 'hidden-beaches-sri-lanka',
//         title: "5 Hidden Beaches You Won't Find in Guidebooks",
//         category: "travel-tips",
//         categoryDisplay: "Travel Tips",
//         date: "February 28, 2025",
//         readTime: "5 min read",
//         author: "Emma Thompson",
//         image: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//         heroImage: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop",
//         excerpt: "Escape the crowds and discover secluded coastal gems along Sri Lanka's southern and eastern shores.",
//         content: "<p>Full article content for Hidden Beaches would go here...</p>"
//     },
//     'art-of-ceylon-tea': {
//         id: 'art-of-ceylon-tea',
//         slug: 'art-of-ceylon-tea',
//         title: "The Art of Ceylon Tea: From Leaf to Cup",
//         category: "culture",
//         categoryDisplay: "Culture & Heritage",
//         date: "February 22, 2025",
//         readTime: "6 min read",
//         author: "Samanthie Perera",
//         image: "https://images.pexels.com/photos/1461282/pexels-photo-1461282.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//         heroImage: "https://images.pexels.com/photos/1461282/pexels-photo-1461282.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop",
//         excerpt: "Visit the misty tea plantations of Nuwara Eliya and learn about the centuries-old tradition of Ceylon tea.",
//         content: "<p>Full article content for Ceylon Tea would go here...</p>"
//     }
// };
// 
// function getArticleSlug() {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('slug');
// }
// 
// function loadArticle() {
//     const slug = getArticleSlug();
//     const article = articlesDB[slug];
//     
//     if (!article) {
//         document.getElementById('articleTitle').textContent = "Article Not Found";
//         document.getElementById('articleCategory').textContent = "Error";
//         document.getElementById('articleMeta').innerHTML = "Please check the link and try again";
//         document.getElementById('articleContent').innerHTML = '<p>Sorry, the article you\'re looking for could not be found. <a href="journal.html" style="color: var(--color-red);">Return to Journal →</a></p>';
//         return;
//     }
//     
//     document.title = `${article.title} | Red Dot Tours Journal`;
//     document.getElementById('articleCategory').textContent = article.categoryDisplay;
//     document.getElementById('articleTitle').textContent = article.title;
//     document.getElementById('articleMeta').innerHTML = `
//         <span>📅 ${article.date}</span>
//         <span>⏱ ${article.readTime}</span>
//         <span>👤 By ${article.author}</span>
//     `;
//     document.getElementById('breadcrumbTitle').textContent = article.title;
//     document.getElementById('articleContent').innerHTML = article.content;
//     document.querySelector('.hero-article').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${article.heroImage}')`;
//     
//     // Load read next articles (excluding current)
//     loadReadNext(article.slug);
// }
// 
// function loadReadNext(currentSlug) {
//     const otherArticles = Object.values(articlesDB).filter(a => a.slug !== currentSlug);
//     const displayArticles = otherArticles.slice(0, 5);
//     
//     const track = document.getElementById('readNextTrack');
//     if (!track) return;
//     
//     track.innerHTML = displayArticles.map(article => `
//         <a href="article.html?slug=${article.slug}" class="read-next-card">
//             <div class="read-next-image">
//                 <img src="${article.image}" alt="${article.title}">
//             </div>
//             <div class="read-next-content">
//                 <span class="read-next-category">${article.categoryDisplay}</span>
//                 <h3 class="read-next-card-title">${article.title}</h3>
//                 <p class="read-next-excerpt">${article.excerpt.substring(0, 100)}...</p>
//                 <span class="read-next-btn">Read Article →</span>
//             </div>
//         </a>
//     `).join('');
// }
// 
// // Initialize on page load
// document.addEventListener('DOMContentLoaded', function() {
//     loadArticle();
//     
//     // Lenis Smooth Scroll
//     const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
//     function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
//     requestAnimationFrame(raf);
//     
//     // Header scroll effect
//     const header = document.getElementById('siteHeader');
//     window.addEventListener('scroll', () => {
//         if (header) header.classList.toggle('scrolled', window.scrollY > 50);
//     });
//     
//     // Back to top
//     const backToTop = document.getElementById('backToTop');
//     if (backToTop) {
//         backToTop.addEventListener('click', (e) => {
//             e.preventDefault();
//             lenis.scrollTo(0, { immediate: true });
//         });
//     }
//     
//     // Mobile menu placeholder
//     const menuToggle = document.getElementById('menuToggle');
//     if (menuToggle) {
//         menuToggle.addEventListener('click', () => {
//             alert('Mobile menu navigation would expand here');
//         });
//     }
// });


// js/article.js

function getArticleSlug() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('slug');
}

function formatPublishedDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function estimateReadTime(content) {
  const textParts = [];
  if (content?.intro) textParts.push(content.intro);

  if (Array.isArray(content?.sections)) {
    content.sections.forEach(section => {
      if (section.heading) textParts.push(section.heading);
      if (Array.isArray(section.paragraphs)) {
        textParts.push(...section.paragraphs);
      }
      if (section.pullQuote) textParts.push(section.pullQuote);
    });
  }

  if (content?.blockquote) textParts.push(content.blockquote);
  if (content?.pullQuote) textParts.push(content.pullQuote);

  const fullText = textParts.join(' ');
  const words = fullText.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function escapeHtml(str = '') {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderStandardLayout(content = {}) {
  let html = '';

  if (content.intro) {
    html += `<p>${escapeHtml(content.intro)}</p>`;
  }

  if (content.blockquote) {
    html += `<blockquote>${escapeHtml(content.blockquote)}</blockquote>`;
  }

  if (Array.isArray(content.sections)) {
    content.sections.forEach(section => {
      if (section.heading) {
        html += `<h2>${escapeHtml(section.heading)}</h2>`;
      }

      if (Array.isArray(section.paragraphs)) {
        section.paragraphs.forEach(p => {
          html += `<p>${escapeHtml(p)}</p>`;
        });
      }

      if (section.image) {
        html += `<img src="${escapeHtml(section.image)}" alt="${escapeHtml(section.imageAlt || section.heading || 'Article image')}">`;
      }

      if (section.pullQuote) {
        html += `<div class="pull-quote">${escapeHtml(section.pullQuote)}</div>`;
      }
    });
  }

  if (content.pullQuote) {
    html += `<div class="pull-quote">${escapeHtml(content.pullQuote)}</div>`;
  }

  return html;
}

function renderFeatureLayout(content = {}) {
  let html = '';

  if (content.intro) {
    html += `<p>${escapeHtml(content.intro)}</p>`;
  }

  if (content.leadImage) {
    html += `<img src="${escapeHtml(content.leadImage)}" alt="${escapeHtml(content.leadImageAlt || 'Feature image')}">`;
  }

  if (Array.isArray(content.sections)) {
    content.sections.forEach(section => {
      if (section.heading) {
        html += `<h2>${escapeHtml(section.heading)}</h2>`;
      }

      if (section.pullQuote) {
        html += `<div class="pull-quote">${escapeHtml(section.pullQuote)}</div>`;
      }

      if (Array.isArray(section.paragraphs)) {
        section.paragraphs.forEach(p => {
          html += `<p>${escapeHtml(p)}</p>`;
        });
      }

      if (section.image) {
        html += `<img src="${escapeHtml(section.image)}" alt="${escapeHtml(section.imageAlt || section.heading || 'Article image')}">`;
      }
    });
  }

  return html;
}

function renderArticleContent(article) {
  if (article.layout_type === 'feature') {
    return renderFeatureLayout(article.content);
  }
  return renderStandardLayout(article.content);
}

async function loadArticle() {
  const slug = getArticleSlug();

  const { data: article, error } = await supabaseClient
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  console.log(article);

  if (error || !article) {
    document.getElementById('articleTitle').textContent = 'Article Not Found';
    document.getElementById('articleCategory').textContent = 'Error';
    document.getElementById('articleMeta').textContent = 'Please check the link and try again';
    document.getElementById('articleContent').innerHTML =
      '<p>Sorry, the article you are looking for could not be found. <a href="journal.html" style="color: var(--color-red);">Return to Journal →</a></p>';
    return;
  }

  document.title = `${article.title} | Journal`;
  document.getElementById('articleCategory').textContent = article.category_display || article.category || '';
  document.getElementById('articleTitle').textContent = article.title;
  document.getElementById('articleMeta').innerHTML = `
    <span>📅 ${formatPublishedDate(article.published_at)}</span>
    <span>⏱ ${estimateReadTime(article.content)}</span>
    <span>👤 By ${escapeHtml(article.author || 'Admin')}</span>
  `;
  document.getElementById('breadcrumbTitle').textContent = article.title;
  document.getElementById('articleContent').innerHTML = renderArticleContent(article);

  const hero = document.querySelector('.hero-article');
  if (hero && article.hero_image) {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${article.hero_image}')`;
  }

  await loadReadNext(article.slug);
}

async function loadReadNext(currentSlug) {
  const { data: posts, error } = await supabaseClient
    .from('blog_posts')
    .select('slug, title, excerpt, card_image, category_display, published_at')
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(5);

  if (error || !posts) return;

  const track = document.getElementById('readNextTrack');
  if (!track) return;

  track.innerHTML = posts.map(article => `
    <a href="article.html?slug=${encodeURIComponent(article.slug)}" class="read-next-card">
      <div class="read-next-image">
        <img src="${escapeHtml(article.card_image || article.hero_image || '')}" alt="${escapeHtml(article.title)}">
      </div>
      <div class="read-next-content">
        <span class="read-next-category">${escapeHtml(article.category_display || '')}</span>
        <h3 class="read-next-card-title">${escapeHtml(article.title)}</h3>
        <p class="read-next-excerpt">${escapeHtml(article.excerpt || '')}</p>
        <span class="read-next-btn">Read Article →</span>
      </div>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', function () {
  loadArticle();

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  });

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo(0, { immediate: true });
    });
  }
});