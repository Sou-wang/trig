// ============================================================
// 🔧 配置区域：密码 → 仓库内文档的相对路径
// ============================================================

// 基础路径：你的 Git 仓库托管地址（开启 Pages 后获得）
const BASE_URL = "https://www.parttriangleagencypart.top/";

// 密码映射：密码 → 文档相对路径（相对于 docs/ 文件夹）
const PASSWORD_MAP = {
    "冻酸奶": "docs/agent map.html",
    "projectX": "docs/project-plan.pdf",
    "finance88": "docs/finance-report.html",
    "internal": "docs/internal/secret-doc.md"
};

// 防刷配置
const FAIL_KEY_PREFIX = "fail_"; // 记录失败次数
const LOCK_KEY_PREFIX = "lock_"; // 记录锁定时间
const MAX_FAIL = 3;              // 错误次数上限
const LOCK_TIME = 99*  9999;     // 锁定时间，毫秒（30秒）

// ============================================================
// 🔧 DOM元素
// ============================================================
const passwordInput = document.getElementById('passwordInput');
const submitBtn = document.getElementById('submitBtn');
const messageBox = document.getElementById('messageBox');

function showError(msg) {
    messageBox.textContent = msg;
    messageBox.className = 'message error';
    messageBox.style.display = 'block';
    setTimeout(() => {
        if (messageBox.className === 'message error') {
            messageBox.style.display = 'none';
            messageBox.className = 'message';
        }
    }, 3000);
}

function hideMessage() {
    messageBox.style.display = 'none';
    messageBox.className = 'message';
}

// ============================================================
// 🔧 防刷工具函数
// ============================================================

function getFailCount(password) {
    return parseInt(localStorage.getItem(FAIL_KEY_PREFIX + password) || "0");
}

function setFailCount(password, val) {
    localStorage.setItem(FAIL_KEY_PREFIX + password, val);
}

function resetFail(password) {
    localStorage.removeItem(FAIL_KEY_PREFIX + password);
}

function isLocked(password) {
    const expire = localStorage.getItem(LOCK_KEY_PREFIX + password);
    return expire && Date.now() < parseInt(expire);
}

function setLock(password, duration) {
    localStorage.setItem(LOCK_KEY_PREFIX + password, Date.now() + duration);
}

// ============================================================
// 🔧 核心验证跳转
// ============================================================
function validateAndRedirect() {
    const inputPassword = passwordInput.value.trim();
    hideMessage();

    if (!inputPassword) {
        showError('请输入密钥');
        passwordInput.focus();
        return;
    }

    // 🔒 检查锁定
    if (isLocked(inputPassword)) {
        const remain = Math.ceil((parseInt(localStorage.getItem(LOCK_KEY_PREFIX + inputPassword)) - Date.now()) / 1000);
        showError(`系统已锁定`);
        return;
    }

    const relativePath = PASSWORD_MAP[inputPassword];

    if (relativePath) {
        // 成功 → 清空失败计数 & 跳转
        resetFail(inputPassword);
        const fullUrl = BASE_URL + relativePath;
        console.log(`✅ 密码匹配成功，跳转到: ${fullUrl}`);
        window.location.href = fullUrl;
    } else {
        // 错误处理
        let fail = getFailCount(inputPassword) + 1;
        setFailCount(inputPassword, fail);

        if (fail >= MAX_FAIL) {
            // 锁定
            setLock(inputPassword, LOCK_TIME);
            resetFail(inputPassword);
            showError(`侦测到不明身份人员，请立即原地等候调查`);
        } else {
            showError(`警告，未输入正确密钥`);
        }

        passwordInput.value = '';
        passwordInput.focus();
    }
}

// ============================================================
// 🔧 事件绑定
// ============================================================
submitBtn.addEventListener('click', validateAndRedirect);
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        validateAndRedirect();
    }
});

passwordInput.addEventListener('focus', function() {
    hideMessage();
});

console.log(`🔐 文档门户已启动，配置 ${Object.keys(PASSWORD_MAP).length} 个文档`);