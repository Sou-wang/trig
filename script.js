
/**************************************************
 * 📦 JSON数据
 **************************************************/
const data = [
{
    id: 1,
    index: "01",
    img: "./docs/imgo/001.webp",
    modalImg: "./docs/imgi/001.webp",
    title: "“我们是谁？”",
    fontIndex: "打卡上班，拯救世界",
    answer: "三角机构",
    url: "./trigl/index.html"
},

/*
{
    id: 2,
    index: "02",
    img: "图片位置02",
    modalImg: "弹窗图片0",
    title: "“我们是谁？”",
    fontIndex: "打卡上班，拯救世界",
    answer: "admin",
    url: "trig/index.html"
}
    
*/
];

/**************************************************
 * 📌 DOM容器
 **************************************************/
const app = document.getElementById("app");

/**************************************************
 * 📌 防刷 + 持久化（核心升级）
 **************************************************/
const FAIL_KEY = "fail_";
const LOCK_KEY = "lock_";

/* 获取锁状态 */
function isLocked(id){
    const lock = localStorage.getItem(LOCK_KEY + id);
    return lock && Date.now() < parseInt(lock);
}

/* 设置锁 */
function setLock(id, time){
    localStorage.setItem(LOCK_KEY + id, Date.now() + time);
}

/* 获取失败次数 */
function getFail(id){
    return parseInt(localStorage.getItem(FAIL_KEY + id) || "0");
}

/* 设置失败次数 */
function setFail(id, val){
    localStorage.setItem(FAIL_KEY + id, val);
}

/* 重置失败 */
function resetFail(id){
    localStorage.removeItem(FAIL_KEY + id);
}

/**************************************************
 * 📌 渲染UI
 **************************************************/
data.forEach(item => {

    const div = document.createElement("div");

    div.innerHTML = `
    <div class="btn" onclick="openModal(${item.id})">
        <div class="img-placeholder">  <img src="${item.img}" alt="图片${item.id}" /></div>
    </div>

    <div class="modal" id="modal${item.id}">
        <div class="modal-content">

            <div class="close" onclick="closeModal(${item.id})">✕</div>

            <div class="modal-img"> <img src="${item.modalImg}" alt="弹窗图片${item.id}" /></div>

            <div class="title">${item.title}</div>

            <div class="font-index">${item.fontIndex}</div>

            <input type="text" id="input${item.id}" placeholder="请输入内容...">

            <button onclick="verify(${item.id})">继续</button>
        </div>
    </div>
    `;

    app.appendChild(div);
});

/**************************************************
 * 这里用来写独立类以定义css格式
 * 
 * 
 *  **************************************************/

    window.addEventListener("DOMContentLoaded", () => {
    // 找到第一个 modal 的 font-index
    const firstFontIndex = document.querySelector("#modal1 .font-index");
    if (firstFontIndex) {
        firstFontIndex.classList.add("highlight"); // 添加独立类
    }
});


 /************************************************** 
 * 
 * 📌 打开 / 关闭 modal
 **************************************************/
function openModal(id){
    document.getElementById("modal"+id).style.display="flex";
}

function closeModal(id){
    document.getElementById("modal"+id).style.display="none";
}

/**************************************************
 * 📌 验证 + 防刷 + 持久化锁
 **************************************************/
function verify(id){

    const item = data.find(d => d.id === id);
    const val = document.getElementById("input"+id).value.trim();

    /* 🔒 是否锁定 */
    if(isLocked(id)){
        alert("遗失……");
        return;
    }

    /* ❌ 错误 */
    if(val !== item.answer){

        let fail = getFail(id) + 1;
        setFail(id, fail);

        alert("可曾记否……");

        /* 🔒 达到3次锁定30秒 */
        if(fail >= 3){
            setLock(id, 9999999999);
            resetFail(id);

            alert("知之为知之，不知为不知");
        }

        return;
    }

    /* ✅ 成功 */
    resetFail(id);
    window.location.href = item.url;
}

/**************************************************
 * 📌 点击遮罩关闭
 **************************************************/
window.addEventListener("click", function(e){
    document.querySelectorAll(".modal").forEach(m=>{
        if(e.target === m) m.style.display="none";
    });
});