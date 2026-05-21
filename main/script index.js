// ============================================================
// 🔧 配置区域：密码 → 仓库内文档的相对路径
// ============================================================

// 基础路径：你的 Git 仓库托管地址（开启 Pages 后获得）
const BASE_URL = "https://www.parttriangleagencypart.top/";

// 密码映射：密码 → 文档相对路径（相对于 docs/ 文件夹）
const PASSWORD_MAP = {
    // 格式："密码" : "文档相对路径"
    "冻酸奶": "docs/agent map.html",
    "projectX": "docs/project-plan.pdf",
    "finance88": "docs/finance-report.html",
    "internal": "docs/internal/secret-doc.md"
};
//记得相对路径
// ============================================================

const passwordInput = document.getElementById('passwordInput');
const submitBtn = document.getElementById('submitBtn');
const messageBox = document.getElementById('messageBox');

function showError(msg) {
    messageBox.textContent = msg;
    messageBox.className = 'message error';
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

function validateAndRedirect() {
    const inputPassword = passwordInput.value;
    hideMessage();
    
    if (!inputPassword.trim()) {
        showError('⚠️ 请输入密码');
        passwordInput.focus();
        return;
    }
    
    const relativePath = PASSWORD_MAP[inputPassword];
    
    if (relativePath) {
        // 构建完整访问URL
        const fullUrl = BASE_URL + relativePath;
        console.log(`✅ 密码匹配成功，跳转到: ${fullUrl}`);
        window.location.href = fullUrl;
    } else {
        showError('❌ 密码错误，无访问权限');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

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