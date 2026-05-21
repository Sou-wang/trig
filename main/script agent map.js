// ============================================
// 📖 3D翻页电子书 - 配置文件
// ============================================

// 🔧 在这里修改你的配置
const TOTAL_PAGES = 139;                    // 总页数（改成你实际的页数）
const IMAGE_PATH = "which is agent/page-";  // 图片路径前缀
const IMAGE_EXT = ".webp";                   // 图片扩展名
const USE_PADDING = true;                   // 是否使用前导零（001, 002 格式）
const PADDING_DIGITS = 3;                   // 前导零位数（3 表示 001）

// 如果文件名是 page-1.png, page-2.png 格式，设置 USE_PADDING = false
// 如果文件名是 page-001.png, page-002.png 格式，设置 USE_PADDING = true
// ============================================

$(document).ready(function() {
    // 动态生成所有页面
    const $flipbook = $('#flipbook');
    
    for (let i = 1; i <= TOTAL_PAGES; i++) {
        // 根据配置格式化页码
        let pageNum;
        if (USE_PADDING) {
            pageNum = i.toString().padStart(PADDING_DIGITS, '0');
        } else {
            pageNum = i;
        }
        
        // 生成页面HTML
        const pageHtml = `
            <div class="page">
                <img src="${IMAGE_PATH}${pageNum}${IMAGE_EXT}" alt="第${i}页">
            </div>
        `;
        $flipbook.append(pageHtml);
    }
    
    console.log(`✅ 已生成 ${TOTAL_PAGES} 页`);
    console.log(`📁 图片路径: ${IMAGE_PATH}{1..${TOTAL_PAGES}}${IMAGE_EXT}`);
    
    // 初始化翻页效果
    $("#flipbook").turn({
        width: 800,
        height: 550,
        autoCenter: true,
        elevation: 50,
        gradients: true,
        duration: 600,
        display: 'double',
        acceleration: true,
        when: {
            turned: function(e, page) {
                console.log("当前页码: " + page);
            }
        }
    });
    
    // 按钮控制
    $("#prevBtn").click(function() {
        $("#flipbook").turn("previous");
    });
    
    $("#nextBtn").click(function() {
        $("#flipbook").turn("next");
    });
    
    // 键盘左右键支持
    $(document).keydown(function(e) {
        if (e.key === 'ArrowLeft') {
            $("#flipbook").turn("previous");
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            $("#flipbook").turn("next");
            e.preventDefault();
        }
    });
});