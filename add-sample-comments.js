// Script để thêm comment mẫu vào các trang blog
const sampleComments = [
    // Blog detail 1 - Xu Hướng Làm Đẹp Thông Minh
    {
        id: 1703123456789,
        name: "Nguyễn Thị Hương",
        email: "huong.nguyen@email.com",
        content: "Bài viết rất hay! Tôi đang tìm hiểu về gương thông minh và thấy thông tin này rất hữu ích. Có ai đã sử dụng gương GlowTech chưa?",
        date: "15/12/2024 14:30",
        pageId: "blog-detail-1"
    },
    {
        id: 1703123456790,
        name: "Trần Văn Minh",
        email: "minh.tran@email.com",
        content: "Công nghệ AI trong làm đẹp thật sự rất thú vị. Tôi hy vọng sẽ có cơ hội trải nghiệm sản phẩm của GlowTech.",
        date: "15/12/2024 15:45",
        pageId: "blog-detail-1"
    },
    {
        id: 1703123456791,
        name: "Lê Thị Lan",
        email: "lan.le@email.com",
        content: "Tôi đã sử dụng gương thông minh được 2 tháng rồi, thật sự rất tiện lợi! Việc phân tích da và hướng dẫn trang điểm rất chính xác.",
        date: "15/12/2024 16:20",
        pageId: "blog-detail-1"
    },

    // Blog detail 2 - Công Nghệ Gương Thông Minh Mới
    {
        id: 1703123456792,
        name: "Phạm Quốc Anh",
        email: "anh.pham@email.com",
        content: "Công nghệ phân tích da 3D nghe có vẻ rất hiện đại. Tôi muốn biết thêm về độ chính xác của công nghệ này.",
        date: "10/12/2024 09:15",
        pageId: "blog-detail-2"
    },
    {
        id: 1703123456793,
        name: "Hoàng Thị Mai",
        email: "mai.hoang@email.com",
        content: "Tôi rất quan tâm đến việc theo dõi tình trạng da theo thời gian. Công nghệ này có thể giúp tôi hiểu rõ hơn về làn da của mình.",
        date: "10/12/2024 11:30",
        pageId: "blog-detail-2"
    },

    // Blog detail 3 - Làm Đẹp Bền Vững
    {
        id: 1703123456794,
        name: "Vũ Thị Hoa",
        email: "hoa.vu@email.com",
        content: "Làm đẹp bền vững là xu hướng rất quan trọng hiện nay. Tôi thích cách GlowTech góp phần bảo vệ môi trường.",
        date: "05/12/2024 13:45",
        pageId: "blog-detail-3"
    },
    {
        id: 1703123456795,
        name: "Đặng Văn Tuấn",
        email: "tuan.dang@email.com",
        content: "Tôi ủng hộ việc sử dụng công nghệ để giảm thiểu lãng phí mỹ phẩm. Đây là cách làm đẹp thông minh và có trách nhiệm.",
        date: "05/12/2024 15:20",
        pageId: "blog-detail-3"
    },

    // Blog AI Makeup
    {
        id: 1703123456796,
        name: "Ngô Thị Thảo",
        email: "thao.ngo@email.com",
        content: "AI trong trang điểm thật sự là một bước tiến lớn! Tôi đã thử tính năng thử mỹ phẩm ảo và rất ấn tượng.",
        date: "15/06/2024 10:30",
        pageId: "blog-ai-makeup"
    },
    {
        id: 1703123456797,
        name: "Lý Văn Dũng",
        email: "dung.ly@email.com",
        content: "Là nam giới, tôi cũng thấy công nghệ này rất hữu ích cho việc chăm sóc da. Có thể áp dụng cho nam giới không?",
        date: "15/06/2024 14:15",
        pageId: "blog-ai-makeup"
    },
    {
        id: 1703123456798,
        name: "Bùi Thị Nga",
        email: "nga.bui@email.com",
        content: "Tôi thích tính năng lưu trữ các kiểu trang điểm yêu thích. Giúp tôi tiết kiệm thời gian mỗi sáng rất nhiều!",
        date: "15/06/2024 16:45",
        pageId: "blog-ai-makeup"
    },

    // Blog Smart Mirror
    {
        id: 1703123456799,
        name: "Trịnh Thị Hà",
        email: "ha.trinh@email.com",
        content: "Gương thông minh GlowTech thật sự thay đổi cách tôi chăm sóc da. Phân tích da chính xác và tư vấn rất hữu ích.",
        date: "15/03/2024 08:30",
        pageId: "blog-smart-mirror"
    },
    {
        id: 1703123456800,
        name: "Nguyễn Văn Hùng",
        email: "hung.nguyen@email.com",
        content: "Tôi mua gương này cho vợ và cô ấy rất thích. Công nghệ AI thật sự ấn tượng!",
        date: "15/03/2024 12:20",
        pageId: "blog-smart-mirror"
    },

    // Blog Smart Schedule
    {
        id: 1703123456801,
        name: "Lê Thị Phương",
        email: "phuong.le@email.com",
        content: "Tính năng nhắc lịch thông minh rất tiện lợi. Tôi không còn quên các bước chăm sóc da nữa!",
        date: "15/03/2024 09:15",
        pageId: "blog-smart-schedule"
    },
    {
        id: 1703123456802,
        name: "Võ Văn Nam",
        email: "nam.vo@email.com",
        content: "Tôi thích cách gương đồng bộ với lịch trình và gửi thông báo. Giúp tôi duy trì thói quen chăm sóc da đều đặn.",
        date: "15/03/2024 14:30",
        pageId: "blog-smart-schedule"
    },

    // Blog Smart Mirror Tech
    {
        id: 1703123456803,
        name: "Đinh Thị Linh",
        email: "linh.dinh@email.com",
        content: "Công nghệ chống nước và không bám vân tay thật sự rất cần thiết cho phòng tắm. Sản phẩm rất thiết thực!",
        date: "15/03/2024 10:45",
        pageId: "blog-smart-mirror-tech"
    },
    {
        id: 1703123456804,
        name: "Hồ Văn Thành",
        email: "thanh.ho@email.com",
        content: "Tôi đã sử dụng gương cao cấp được 6 tháng, chất lượng rất tốt và không có vấn đề gì về vân tay hay nước.",
        date: "15/03/2024 16:20",
        pageId: "blog-smart-mirror-tech"
    },

    // Blog Skincare Statistics
    {
        id: 1703123456805,
        name: "Dương Thị Thu",
        email: "thu.duong@email.com",
        content: "Thống kê này thật sự đáng báo động! Tôi cũng từng chăm sóc da sai cách. Cảm ơn GlowTech đã giúp tôi hiểu đúng hơn.",
        date: "20/07/2024 11:30",
        pageId: "blog-skincare-statistics"
    },
    {
        id: 1703123456806,
        name: "Tạ Văn Sơn",
        email: "son.ta@email.com",
        content: "Tôi thấy nhiều người xung quanh cũng đang chăm sóc da không đúng cách. Cần phổ biến kiến thức này rộng rãi hơn.",
        date: "20/07/2024 15:45",
        pageId: "blog-skincare-statistics"
    },
    {
        id: 1703123456807,
        name: "Châu Thị Kim",
        email: "kim.chau@email.com",
        content: "Sau khi đọc bài viết này, tôi đã thay đổi hoàn toàn routine chăm sóc da. Kết quả thật sự khác biệt!",
        date: "20/07/2024 17:20",
        pageId: "blog-skincare-statistics"
    },

    // Blog Tech Beauty Revolution
    {
        id: 1703123456808,
        name: "Lâm Thị Hồng",
        email: "hong.lam@email.com",
        content: "Cách mạng công nghệ trong làm đẹp thật sự thay đổi cuộc sống phụ nữ. Tôi cảm thấy tự tin hơn nhiều!",
        date: "22/07/2024 09:00",
        pageId: "blog-tech-beauty-revolution"
    },
    {
        id: 1703123456809,
        name: "Nguyễn Văn Bình",
        email: "binh.nguyen@email.com",
        content: "Là chồng, tôi thấy vợ mình hạnh phúc hơn khi sử dụng công nghệ làm đẹp thông minh. Đầu tư xứng đáng!",
        date: "22/07/2024 13:15",
        pageId: "blog-tech-beauty-revolution"
    },
    {
        id: 1703123456810,
        name: "Trần Thị Thanh",
        email: "thanh.tran@email.com",
        content: "Tôi đã theo dõi xu hướng làm đẹp thông minh từ đầu và thấy GlowTech là một trong những thương hiệu tiên phong.",
        date: "22/07/2024 16:30",
        pageId: "blog-tech-beauty-revolution"
    }
];

// Hàm để thêm comment mẫu vào localStorage
function addSampleComments() {
    // Lấy comment hiện tại từ localStorage
    const existingComments = JSON.parse(localStorage.getItem('blogComments') || '[]');
    
    // Thêm comment mẫu mới (chỉ thêm nếu chưa có)
    const newComments = sampleComments.filter(sampleComment => {
        return !existingComments.some(existingComment => 
            existingComment.id === sampleComment.id
        );
    });
    
    // Kết hợp comment cũ và mới
    const allComments = [...existingComments, ...newComments];
    
    // Lưu vào localStorage
    localStorage.setItem('blogComments', JSON.stringify(allComments));
    
    console.log(`Đã thêm ${newComments.length} comment mẫu mới`);
    console.log(`Tổng cộng có ${allComments.length} comment trong hệ thống`);
    
    return newComments.length;
}

// Thêm comment mẫu khi script được chạy
const addedCount = addSampleComments();
console.log(`Đã thêm thành công ${addedCount} comment mẫu vào hệ thống!`);

// Export function để có thể sử dụng từ console
window.addSampleComments = addSampleComments; 