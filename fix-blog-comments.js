// Script để tự động thêm comment system vào tất cả các trang blog
const blogPages = [
    'blog-smart-mirror.html',
    'blog-smart-schedule.html', 
    'blog-smart-mirror-tech.html',
    'blog-skincare-statistics.html',
    'blog-tech-beauty-revolution.html'
];

const pageIds = {
    'blog-smart-mirror.html': 'blog-smart-mirror',
    'blog-smart-schedule.html': 'blog-smart-schedule',
    'blog-smart-mirror-tech.html': 'blog-smart-mirror-tech',
    'blog-skincare-statistics.html': 'blog-skincare-statistics',
    'blog-tech-beauty-revolution.html': 'blog-tech-beauty-revolution'
};

// CSS cho comment system
const commentCSS = `
/* Comment Section Styles */
.comment-section {
    background: #f9f9f9;
    padding: 4rem 0;
}

.comment-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 5%;
}

.comment-section h2 {
    color: #4a2c82;
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
}

.comment-form {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(160, 130, 204, 0.1);
    margin-bottom: 2rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a2c82;
    font-weight: 600;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #4a2c82;
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
}

.submit-comment-btn {
    background: var(--gradient-primary);
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.submit-comment-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(160, 130, 204, 0.3);
}

.submit-comment-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.comments-list {
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(160, 130, 204, 0.1);
    overflow: hidden;
}

.comment-item {
    padding: 1.5rem;
    border-bottom: 1px solid #f0f0f0;
}

.comment-item:last-child {
    border-bottom: none;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.comment-author {
    font-weight: 600;
    color: #4a2c82;
}

.comment-date {
    color: #666;
    font-size: 0.9rem;
}

.comment-content {
    color: #333;
    line-height: 1.6;
}

.no-comments {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-style: italic;
}

.comment-success {
    background: #d4edda;
    color: #155724;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: none;
}

.comment-error {
    background: #f8d7da;
    color: #721c24;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: none;
}

@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr;
    }

    .comment-container {
        padding: 0 3%;
    }

    .comment-form {
        padding: 1.5rem;
    }
}
`;

// HTML cho comment section
const commentHTML = `
    <!-- Comment Section -->
    <section class="comment-section">
        <div class="comment-container">
            <h2>Bình luận</h2>
            <div class="comment-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="commentName">Tên của bạn *</label>
                        <input type="text" id="commentName" placeholder="Nhập tên của bạn" required>
                    </div>
                    <div class="form-group">
                        <label for="commentEmail">Email *</label>
                        <input type="email" id="commentEmail" placeholder="Nhập email của bạn" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="commentContent">Bình luận *</label>
                    <textarea id="commentContent" placeholder="Chia sẻ suy nghĩ của bạn về bài viết..." rows="4" required></textarea>
                </div>
                <button type="button" id="submitComment" class="submit-comment-btn">
                    <i class="fas fa-paper-plane"></i> Gửi bình luận
                </button>
            </div>
            
            <div class="comments-list" id="commentsList">
                <!-- Comments will be loaded here -->
            </div>
        </div>
    </section>
`;

// JavaScript cho comment system
function generateCommentJS(pageId) {
    return `
    <!-- Comment System JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const commentForm = document.querySelector('.comment-form');
            const commentsList = document.getElementById('commentsList');
            const submitBtn = document.getElementById('submitComment');
            
            // Load comments from localStorage
            loadComments();
            
            // Handle form submission
            submitBtn.addEventListener('click', function() {
                submitComment();
            });
            
            // Handle Enter key in textarea
            document.getElementById('commentContent').addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && e.ctrlKey) {
                    submitComment();
                }
            });
            
            function submitComment() {
                const name = document.getElementById('commentName').value.trim();
                const email = document.getElementById('commentEmail').value.trim();
                const content = document.getElementById('commentContent').value.trim();
                
                // Validation
                if (!name || !email || !content) {
                    showMessage('Vui lòng điền đầy đủ thông tin!', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showMessage('Email không hợp lệ!', 'error');
                    return;
                }
                
                // Create comment object
                const comment = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    content: content,
                    date: new Date().toLocaleString('vi-VN'),
                    pageId: '${pageId}' // Unique identifier for this page
                };
                
                // Save to localStorage
                saveComment(comment);
                
                // Add to UI
                addCommentToUI(comment);
                
                // Clear form
                clearForm();
                
                // Show success message
                showMessage('Bình luận đã được gửi thành công!', 'success');
            }
            
            function saveComment(comment) {
                const comments = getComments();
                comments.push(comment);
                localStorage.setItem('blogComments', JSON.stringify(comments));
            }
            
            function getComments() {
                const comments = localStorage.getItem('blogComments');
                return comments ? JSON.parse(comments) : [];
            }
            
            function loadComments() {
                const comments = getComments();
                const pageComments = comments.filter(comment => comment.pageId === '${pageId}');
                
                if (pageComments.length === 0) {
                    commentsList.innerHTML = '<div class="no-comments">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</div>';
                } else {
                    commentsList.innerHTML = '';
                    pageComments.forEach(comment => {
                        addCommentToUI(comment);
                    });
                }
            }
            
            function addCommentToUI(comment) {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment-item';
                commentElement.innerHTML = \`
                    <div class="comment-header">
                        <span class="comment-author">\${escapeHtml(comment.name)}</span>
                        <span class="comment-date">\${comment.date}</span>
                    </div>
                    <div class="comment-content">\${escapeHtml(comment.content)}</div>
                \`;
                
                // Remove no-comments message if it exists
                const noComments = commentsList.querySelector('.no-comments');
                if (noComments) {
                    noComments.remove();
                }
                
                commentsList.appendChild(commentElement);
            }
            
            function clearForm() {
                document.getElementById('commentName').value = '';
                document.getElementById('commentEmail').value = '';
                document.getElementById('commentContent').value = '';
            }
            
            function isValidEmail(email) {
                const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                return emailRegex.test(email);
            }
            
            function escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
            
            function showMessage(message, type) {
                // Remove existing messages
                const existingMessages = document.querySelectorAll('.comment-success, .comment-error');
                existingMessages.forEach(msg => msg.remove());
                
                // Create new message
                const messageElement = document.createElement('div');
                messageElement.className = type === 'success' ? 'comment-success' : 'comment-error';
                messageElement.textContent = message;
                messageElement.style.display = 'block';
                
                // Insert before form
                commentForm.parentNode.insertBefore(messageElement, commentForm);
                
                // Auto remove after 5 seconds
                setTimeout(() => {
                    messageElement.remove();
                }, 5000);
            }
        });
    </script>
    `;
}

// Hàm để thêm comment system vào một trang blog
function addCommentSystemToBlog(blogFile) {
    console.log(`Đang thêm comment system vào ${blogFile}...`);
    
    // Đọc file
    const fs = require('fs');
    let content = fs.readFileSync(blogFile, 'utf8');
    
    // Kiểm tra xem đã có comment section chưa
    if (content.includes('comment-section')) {
        console.log(`${blogFile} đã có comment system rồi!`);
        return;
    }
    
    // Thêm CSS vào phần style
    const styleEndIndex = content.lastIndexOf('</style>');
    if (styleEndIndex !== -1) {
        content = content.slice(0, styleEndIndex) + commentCSS + content.slice(styleEndIndex);
    }
    
    // Thêm HTML comment section trước footer
    const footerIndex = content.indexOf('<!-- Footer Section -->');
    if (footerIndex !== -1) {
        content = content.slice(0, footerIndex) + commentHTML + '\n\n    ' + content.slice(footerIndex);
    }
    
    // Thêm JavaScript trước </body>
    const bodyEndIndex = content.lastIndexOf('</body>');
    if (bodyEndIndex !== -1) {
        const pageId = pageIds[blogFile];
        const commentJS = generateCommentJS(pageId);
        content = content.slice(0, bodyEndIndex) + '\n    ' + commentJS + '\n' + content.slice(bodyEndIndex);
    }
    
    // Ghi lại file
    fs.writeFileSync(blogFile, content, 'utf8');
    console.log(`✅ Đã thêm comment system thành công vào ${blogFile}`);
}

// Thêm comment system vào tất cả các trang blog
blogPages.forEach(blogFile => {
    try {
        addCommentSystemToBlog(blogFile);
    } catch (error) {
        console.error(`❌ Lỗi khi thêm comment system vào ${blogFile}:`, error.message);
    }
});

console.log('🎉 Hoàn thành việc thêm comment system vào tất cả các trang blog!'); 