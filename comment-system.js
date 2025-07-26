// Comment System for Blog Pages
class CommentSystem {
    constructor(pageId) {
        this.pageId = pageId;
        this.commentForm = document.querySelector('.comment-form');
        this.commentsList = document.getElementById('commentsList');
        this.submitBtn = document.getElementById('submitComment');
        
        this.init();
    }
    
    init() {
        this.loadComments();
        this.bindEvents();
    }
    
    bindEvents() {
        this.submitBtn.addEventListener('click', () => this.submitComment());
        
        document.getElementById('commentContent').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.submitComment();
            }
        });
    }
    
    submitComment() {
        const name = document.getElementById('commentName').value.trim();
        const email = document.getElementById('commentEmail').value.trim();
        const content = document.getElementById('commentContent').value.trim();
        
        // Validation
        if (!name || !email || !content) {
            this.showMessage('Vui lòng điền đầy đủ thông tin!', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showMessage('Email không hợp lệ!', 'error');
            return;
        }
        
        // Create comment object
        const comment = {
            id: Date.now(),
            name: name,
            email: email,
            content: content,
            date: new Date().toLocaleString('vi-VN'),
            pageId: this.pageId
        };
        
        // Save to localStorage
        this.saveComment(comment);
        
        // Add to UI
        this.addCommentToUI(comment);
        
        // Clear form
        this.clearForm();
        
        // Show success message
        this.showMessage('Bình luận đã được gửi thành công!', 'success');
    }
    
    saveComment(comment) {
        const comments = this.getComments();
        comments.push(comment);
        localStorage.setItem('blogComments', JSON.stringify(comments));
    }
    
    getComments() {
        const comments = localStorage.getItem('blogComments');
        return comments ? JSON.parse(comments) : [];
    }
    
    loadComments() {
        const comments = this.getComments();
        const pageComments = comments.filter(comment => comment.pageId === this.pageId);
        
        if (pageComments.length === 0) {
            this.commentsList.innerHTML = '<div class="no-comments">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</div>';
        } else {
            this.commentsList.innerHTML = '';
            pageComments.forEach(comment => {
                this.addCommentToUI(comment);
            });
        }
    }
    
    addCommentToUI(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${this.escapeHtml(comment.name)}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-content">${this.escapeHtml(comment.content)}</div>
        `;
        
        // Remove no-comments message if it exists
        const noComments = this.commentsList.querySelector('.no-comments');
        if (noComments) {
            noComments.remove();
        }
        
        this.commentsList.appendChild(commentElement);
    }
    
    clearForm() {
        document.getElementById('commentName').value = '';
        document.getElementById('commentEmail').value = '';
        document.getElementById('commentContent').value = '';
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.comment-success, .comment-error');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = type === 'success' ? 'comment-success' : 'comment-error';
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        
        // Insert before form
        this.commentForm.parentNode.insertBefore(messageElement, this.commentForm);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Initialize comment system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get page ID from script tag or default
    const scriptTag = document.querySelector('script[data-page-id]');
    const pageId = scriptTag ? scriptTag.getAttribute('data-page-id') : 'default-page';
    
    if (document.querySelector('.comment-form')) {
        new CommentSystem(pageId);
    }
}); 