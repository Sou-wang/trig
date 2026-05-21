$(window).on("load", function () {

    const $flipbook = $('#flipbook');

    const isMobile = window.innerWidth <= 768;

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

    let bookWidth = containerW;
    let bookHeight = bookWidth / BOOK_RATIO;

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

            display: isMobile ? 'single' : 'double',

            autoCenter: true,

            elevation: 0,

            gradients: false,

            acceleration: true
        });

    });

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
function checkOrientation() {
    const isPortrait = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;

    document.getElementById("rotate-tip").style.display =
        isPortrait ? "flex" : "none";
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);