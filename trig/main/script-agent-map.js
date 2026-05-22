$(window).on("load", function () {
    const $flipbook = $('#flipbook');
    const isMobile = window.innerWidth <= 768;

    // 图片比例
    const PAGE_RATIO = 1275 / 1650;
    const BOOK_RATIO = PAGE_RATIO * 2;

    let containerW = window.innerWidth;
    let containerH = window.innerHeight;
    let bookWidth = containerW;
    let bookHeight = bookWidth / BOOK_RATIO;

    if (bookHeight > containerH) {
        bookHeight = containerH;
        bookWidth = bookHeight * BOOK_RATIO;
    }

    // 生成页面 + 直接赋值图片（修复黑屏）
    for (let i = 1; i <= 139; i++) {
        let pageNum = i.toString().padStart(3, '0');
        // 🔴 这里路径必须正确！如果你的图片在 images 下请改成：images/page-${pageNum}.webp
        $flipbook.append(`<div class="page"><img src="agent/page-${pageNum}.webp"></div>`);
    }

    // 初始化翻书
    requestAnimationFrame(() => {
        $flipbook.turn({
            width: bookWidth,
            height: bookHeight,
            display: 'double',
            autoCenter: true,
            elevation: 0,
            gradients: false,
            acceleration: true
        });
    });

    // 手机滑动
    let startX = 0;
    document.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) $flipbook.turn("previous");
        else if (startX - endX > 50) $flipbook.turn("next");
    });

    // 按钮
    $("#prevBtn").click(() => $flipbook.turn("previous"));
    $("#nextBtn").click(() => $flipbook.turn("next"));
});