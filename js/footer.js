// ============================================
// FOOTER SCRIPT - SERENDIB ESCAPE
// ============================================

function initFooter() {
    // Set current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Initialize footer when DOM is ready
document.addEventListener('DOMContentLoaded', initFooter);