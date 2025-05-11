// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add animation to feature cards on scroll
const featureCards = document.querySelectorAll('.feature-card');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Scroll to top functionality
const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Face capture functionality
const captureButton = document.getElementById('captureFace');
const imageInput = document.getElementById('imageInput');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const preview = document.getElementById('preview');
const previewContainer = document.getElementById('preview-container');
let stream = null;

// Function to start camera
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.display = 'block';
        previewContainer.style.display = 'block';
    } catch (err) {
        console.error('Error accessing camera:', err);
        alert('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập camera của trình duyệt.');
    }
}

// Function to stop camera
function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        video.style.display = 'none';
    }
}

// Function to send image to API
async function sendImageToAPI(imageData) {
    try {
        // Convert base64 to blob
        const base64Response = await fetch(imageData);
        const blob = await base64Response.blob();
        
        // Create FormData and append the file
        const formData = new FormData();
        formData.append('file', blob, 'image.png');

        const response = await fetch('https://phungz010.app.n8n.cloud/webhook-test/5c0ff0f6-779f-4108-a017-a357ac112a6a', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Image sent successfully:', result);
        return result;
    } catch (error) {
        console.error('Error sending image:', error);
        alert('Có lỗi xảy ra khi gửi ảnh. Vui lòng thử lại.');
    }
}

// Function to capture image from camera
async function captureImage() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/png');
    preview.src = imageData;
    stopCamera();
    
    // Send image to API
    await sendImageToAPI(imageData);
}

// Handle capture button click
captureButton.addEventListener('click', () => {
    if (video.style.display === 'none') {
        startCamera();
        captureButton.textContent = 'Chụp ảnh';
    } else {
        captureImage();
        captureButton.textContent = 'Chụp khuôn mặt';
    }
});

// Handle file input change
imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const imageData = e.target.result;
            preview.src = imageData;
            previewContainer.style.display = 'block';
            
            // Send image to API
            await sendImageToAPI(imageData);
        };
        reader.readAsDataURL(file);
    }
});

// Add click event to open file dialog when clicking the button
captureButton.addEventListener('click', (e) => {
    if (e.shiftKey) {
        imageInput.click();
    }
});

// Slideshow functionality
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");

function showSlides() {
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active-dot");
    }
    
    // Move to next slide
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // Show current slide and activate corresponding dot
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].classList.add("active-dot");
    
    // Change slide every 5 seconds
    setTimeout(showSlides, 5000);
}

// Start slideshow when page loads
document.addEventListener('DOMContentLoaded', function() {
    showSlides();
    
    // Add click event to dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function() {
            slideIndex = i;
            showSlides();
        });
    }
}); 