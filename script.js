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
        // Show email input modal
        const email = await showEmailModal();
        if (!email) return; // User cancelled

        // Convert base64 to blob
        const base64Response = await fetch(imageData);
        const blob = await base64Response.blob();
        
        // Create FormData and append the file and email
        const formData = new FormData();
        formData.append('file', blob, 'image.png');
        formData.append('email', email);

        const response = await fetch('https://phungz010.app.n8n.cloud/webhook/5c0ff0f6-779f-4108-a017-a357ac112a6a', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Image sent successfully:', result);
        showSuccessMessage();
        return result;
    } catch (error) {
        console.error('Error sending image:', error);
        alert('Có lỗi xảy ra khi gửi ảnh. Vui lòng thử lại.');
    }
}

// Function to show email input modal
function showEmailModal() {
    return new Promise((resolve) => {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'email-modal';
        modal.innerHTML = `
            <div class="email-modal-content">
                <h3>Nhập email để nhận kết quả phân tích</h3>
                <input type="email" id="emailInput" placeholder="Nhập địa chỉ email của bạn" required>
                <div class="email-modal-buttons">
                    <button id="submitEmail">Gửi</button>
                    <button id="cancelEmail">Hủy</button>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .email-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .email-modal-content {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                width: 90%;
                max-width: 400px;
            }
            .email-modal-content h3 {
                margin-top: 0;
                color: #333;
            }
            .email-modal-content input {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-sizing: border-box;
            }
            .email-modal-buttons {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 15px;
            }
            .email-modal-buttons button {
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .email-modal-buttons button:first-child {
                background-color: #FF69B4;
                color: white;
            }
            .email-modal-buttons button:last-child {
                background-color: #f0f0f0;
                color: #333;
            }
        `;
        document.head.appendChild(style);

        // Add modal to body
        document.body.appendChild(modal);

        // Get elements
        const emailInput = modal.querySelector('#emailInput');
        const submitButton = modal.querySelector('#submitEmail');
        const cancelButton = modal.querySelector('#cancelEmail');

        // Focus on email input
        emailInput.focus();

        // Handle submit
        submitButton.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (email && isValidEmail(email)) {
                document.body.removeChild(modal);
                resolve(email);
            } else {
                alert('Vui lòng nhập địa chỉ email hợp lệ');
            }
        });

        // Handle cancel
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(null);
        });

        // Handle enter key
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitButton.click();
            }
        });
    });
}

// Function to validate email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'Gửi ảnh thành công! Kết quả phân tích sẽ được gửi đến email của bạn.';
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 500);
    }, 5000);
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
    
    // Hide preview after sending
    previewContainer.style.display = 'none';
    preview.src = '';
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
            
            // Hide preview after sending
            previewContainer.style.display = 'none';
            preview.src = '';
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
