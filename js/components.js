// Function to load HTML components
function loadComponent(elementId, componentPath) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', componentPath, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById(elementId).innerHTML = xhr.responseText;
            } else {
                console.error(`Error loading component ${componentPath}: ${xhr.status}`);
            }
        }
    };
    xhr.send();
}

// Load header and footer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');
}); 