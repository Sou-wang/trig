$(window).on("load", function () {

    const $flipbook = $('#flipbook');
    const displayMode = 'double'; // ❗强制双页
    const isMobile = window.innerWidth <= 768;
    const view = $flipbook.turn("view");
    const isRealDouble = view && view.length === 2 && view[1] !== 0;
    // =========================
    // 📐 固定图片比例
    // =========================
    const PAGE_RATIO = 1275 / 1650;
    const BOOK_RATIO = PAGE_RATIO * 2;

    // =========================
    // 📦 用窗口尺寸（关键修复）
    // =========================
    let containerW = window.innerWidth;
    let containerH = window.innerHeight;
    let bookWidth = window.innerWidth;

// ❗关键：人为扩大宽度，让它永远认为够双页
if (isMobile) {
    bookWidth = window.innerWidth * 2.2;
}
    let bookWidth = containerW;
    let bookHeight = bookWidth / BOOK_RATIO;
    if (isMobile) {

    // 强制横向布局思维
    bookWidth = window.innerWidth * 1.2; // 故意略放大
    bookHeight = bookWidth / BOOK_RATIO;
}

    if (bookHeight > containerH) {
        bookHeight = containerH;
        bookWidth = bookHeight * BOOK_RATIO;
    }

    // =========================
    // 📄 生成页面
    // =========================
    for (let i = 1; i <= 139; i++) {

        let pageNum = i.toString().padStart(3, '0');

        $flipbook.append(`
            <div class="page">
                <img src="which is agent/page-${pageNum}.webp">
            </div>
        `);
    }

    // =========================
    
    // ⏱️ 再延迟确保 layout
    // =========================
    requestAnimationFrame(() => {

       $flipbook.turn({

    width: bookWidth,
    height: bookHeight,

    display: 'double',

    autoCenter: true,

    elevation: 0,

    gradients: false,

    acceleration: true,

    // ❗关键：禁止内部 layout 重算
    when: {
        turning: function (e, page) {
            return true;
        }

    
    }
});
 updateFlipbookState();
    });
    $(window).off("resize");
    // =========================
    // 📱 手机触摸翻页
    // =========================
    let startX = 0;

    document.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;

        if (endX - startX > 50) {
            $flipbook.turn("previous");
        } else if (startX - endX > 50) {
            $flipbook.turn("next");
        }
    });

    // =========================
    // 🔘 按钮
    // =========================
    $("#prevBtn").click(() => $flipbook.turn("previous"));
    $("#nextBtn").click(() => $flipbook.turn("next"));
});
window.addEventListener("resize", updateFlipbookState);
window.addEventListener("load", updateFlipbookState);



function updateFlipbookState() {
    const isPortrait = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;

    const $flipbook = $('#flipbook');

    // turn.js 当前模式
    let display = $flipbook.turn("display");

    const isDouble = (display === "double") && isRealDouble;

    const $tip = $("#rotate-tip");

    // =========================
    // 📱 1. 竖屏提示（替代原逻辑）
    // =========================
    if (isPortrait) {
        $tip.html("请竖屏观看 📱").show();
        return;
    }

    // =========================
    // ❌ 2. 双页失败提示
    // =========================
    if (!isDouble) {
        $tip.html("双页模式加载失败，请竖屏查看单页模式").show();
        return;
    }

    // =========================
    // ✅ 正常状态
    // =========================
    $tip.hide();
}