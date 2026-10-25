/* ============================================================
   城市记忆盲盒 · 公共脚本
   本地存储 / 登录会话 / Toast / 底部导航 / 通用工具
   课程作业约定：全部数据存于浏览器 localStorage，正式版接入云开发
   ============================================================ */
(function(){
'use strict';

var PREFIX = 'cmb_';

/* ---------- 存储层 ---------- */
var Store = {
  get: function(k, d){
    try{
      var v = localStorage.getItem(PREFIX + k);
      return v == null ? d : JSON.parse(v);
    }catch(e){ return d; }
  },
  set: function(k, v){ localStorage.setItem(PREFIX + k, JSON.stringify(v)); },
  del: function(k){ localStorage.removeItem(PREFIX + k); }
};
window.Store = Store;

/* ---------- 会话 ---------- */
var Session = {
  current: function(){ return Store.get('session', null); },   // {id, phone, nick, hue, isWx}
  login: function(u){ Store.set('session', u); },
  logout: function(){ Store.del('session'); }
};
window.Session = Session;

/* 页面守卫：未登录跳回登录页（登录页不调用） */
function requireLogin(){
  var u = Session.current();
  if(!u){ location.replace('01-login.html'); throw new Error('need-login'); }
  return u;
}
window.requireLogin = requireLogin;

/* ---------- Toast ---------- */
var toastTimer = null;
function toast(msg, ms){
  var el = document.getElementById('toast');
  if(!el){
    el = document.createElement('div'); el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ el.classList.remove('show'); }, ms || 2200);
}
window.toast = toast;

/* ---------- 模态框 ---------- */
/* openDialog({title, html, okText, cancelText, onOk, hideCancel}) -> 返回关闭函数 */
function openDialog(opt){
  var mask = document.createElement('div');
  mask.className = 'mask';
  mask.innerHTML =
    '<div class="dialog">' +
      '<h3>' + (opt.title || '提示') + '</h3>' +
      '<div class="dlg-body" style="font-size:13.5px;color:var(--ink-2);line-height:1.9">' + (opt.html || '') + '</div>' +
      '<div class="actions">' +
        (opt.hideCancel ? '' : '<button class="btn ghost dlg-cancel">取消</button>') +
        '<button class="btn solid dlg-ok">' + (opt.okText || '确定') + '</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(mask);
  requestAnimationFrame(function(){ mask.classList.add('show'); });
  function close(){
    mask.classList.remove('show');
    setTimeout(function(){ mask.remove(); }, 220);
  }
  mask.querySelector('.dlg-cancel') && mask.querySelector('.dlg-cancel').addEventListener('click', close);
  mask.querySelector('.dlg-ok').addEventListener('click', function(){
    if(opt.onOk && opt.onOk(mask) === false) return;
    close();
  });
  mask.addEventListener('click', function(e){ if(e.target === mask) close(); });
  return close;
}
window.openDialog = openDialog;

/* confirm 简化封装 */
function confirmDialog(msg, onOk, opt){
  opt = opt || {};
  openDialog({
    title: opt.title || '确认操作',
    html: msg, okText: opt.okText || '确定',
    onOk: onOk
  });
}
window.confirmDialog = confirmDialog;

/* ---------- 底部导航（自动注入当前页 active 状态） ---------- */
var TAB_ICONS = {
  home:  '<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  book:  '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 4v16M4 9h5"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2.5"/></svg>',
  me:    '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/></svg>'
};
/* renderTabbar('home') 在 .phone 内最后一个 .tabbar 占位处填充；若无占位则追加 */
function renderTabbar(active){
  var tabs = [
    {key:'home',  label:'首页', href:'03-home.html'},
    {key:'book',  label:'图鉴', href:'06-collection.html'},
    {key:'clock', label:'记录', href:'07-history.html'},
    {key:'me',    label:'我的', href:'09-profile.html'}
  ];
  var bar = document.querySelector('.phone .tabbar');
  if(!bar){
    bar = document.createElement('div');
    bar.className = 'tabbar';
    document.querySelector('.phone').appendChild(bar);
  }
  bar.innerHTML = tabs.map(function(t){
    return '<a class="tab ' + (t.key === active ? 'active' : '') + '" href="' + t.href + '">' +
             TAB_ICONS[t.key] + '<span>' + t.label + '</span></a>';
  }).join('');
}
window.renderTabbar = renderTabbar;

/* ---------- 工具 ---------- */
function qs(name){
  var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
  return m ? decodeURIComponent(m[1]) : null;
}
window.qsParam = qs;

function pad2(n){ return (n < 10 ? '0' : '') + n; }
function fmtTime(ts){
  var d = new Date(ts);
  return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
}
function fmtDate(ts){
  var d = new Date(ts);
  return (d.getMonth() + 1) + '月' + d.getDate() + '日';
}
function dayLabel(ts){
  var d = new Date(ts), now = new Date();
  var one = function(x){ return new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime(); };
  var diff = (one(now) - one(d)) / 86400000;
  if(diff === 0) return '今天';
  if(diff === 1) return '昨天';
  if(diff < 7) return diff + '天前';
  return fmtDate(ts);
}
function maskPhone(p){
  if(!p || p.indexOf('wx_') === 0) return '微信登录用户';
  return p.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
}
function escapeHtml(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}
window.fmtTime = fmtTime; window.fmtDate = fmtDate;
window.dayLabel = dayLabel; window.maskPhone = maskPhone; window.escapeHtml = escapeHtml;

/* 头像：优先用户上传的图片（base64），否则按 hue 生成底色 + 昵称首字 */
function avatarHtml(user, size){
  size = size || 40;
  if(user && user.avatar){
    return '<span class="avatar" style="width:' + size + 'px;height:' + size + 'px;overflow:hidden;background:#e8e0d0">' +
      '<img src="' + user.avatar + '" alt="头像" style="width:100%;height:100%;object-fit:cover;display:block"></span>';
  }
  var hue = user && user.hue != null ? user.hue : 20;
  var ch = (user && user.nick ? user.nick : '客')[0];
  return '<span class="avatar" style="width:' + size + 'px;height:' + size + 'px;' +
    'font-size:' + Math.round(size * .42) + 'px;background:linear-gradient(135deg,hsl(' + hue + ',48%,52%),hsl(' + ((hue + 40) % 360) + ',45%,38%))">' +
    escapeHtml(ch) + '</span>';
}
window.avatarHtml = avatarHtml;

/* 头像上传：文件 → 居中裁剪压缩为 160px 方图（base64），课程作业本地存储方案 */
function saveAvatar(file, cb){
  if(!file || !/^image\//.test(file.type)){ toast('请选择图片文件'); return; }
  if(file.size > 10 * 1024 * 1024){ toast('图片太大，请选 10MB 以内的'); return; }
  var reader = new FileReader();
  reader.onload = function(e){
    var img = new Image();
    img.onload = function(){
      var S = 160, side = Math.min(img.width, img.height);
      var cv = document.createElement('canvas');
      cv.width = S; cv.height = S;
      cv.getContext('2d').drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, S, S);
      cb(cv.toDataURL('image/jpeg', .85));
    };
    img.onerror = function(){ toast('图片读取失败，换一张试试'); };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
window.saveAvatar = saveAvatar;

/* 保存头像到当前账号（会话 + 本地账号库同步更新） */
function setUserAvatar(dataUrl){
  var u = Session.current();
  if(!u) return;
  u.avatar = dataUrl;
  Session.login(u);
  if(!u.isWx && u.phone){
    var users = Store.get('users', {});
    if(users[u.phone]){ users[u.phone].avatar = dataUrl; Store.set('users', users); }
  }
}
window.setUserAvatar = setUserAvatar;

/* ---------- 业务数据读写 ---------- */
var Biz = {
  city: function(){ return Store.get('city', 'shijiazhuang'); },
  setCity: function(id){ Store.set('city', id); },
  collected: function(){ return Store.get('collected', {}); },          // {itemId: ts}
  isCollected: function(id){ return !!this.collected()[id]; },
  collect: function(id, ts){
    var c = this.collected();
    if(c[id]) return false;
    c[id] = ts || Date.now(); Store.set('collected', c); return true;
  },
  history: function(){ return Store.get('history', []); },              // [{item, ts}]
  addHistory: function(itemId, ts){
    var h = this.history();
    if(h.length && h[0].item === itemId && (ts || Date.now()) - h[0].ts < 30000) return; // 防刷新重复
    h.unshift({ item: itemId, ts: ts || Date.now() });
    Store.set('history', h.slice(0, 200));
  },
  askCount: function(){ return Store.get('askCount', 0); },             // 向 AI 提问累计次数（成就用）
  addAsk: function(){ Store.set('askCount', this.askCount() + 1); },
  hidden: function(){ return Store.get('hidden', {}); },                // {cityId: ts}
  /* 城市集齐判定：返回解锁时间戳或 null；自动登记 */
  checkHidden: function(cityId){
    var city = CITY_DATA[cityId];
    var c = this.collected();
    var all = city.items.every(function(id){ return c[id]; });
    if(!all) return null;
    var h = this.hidden();
    if(!h[cityId]){ h[cityId] = Date.now(); Store.set('hidden', h); }
    return h[cityId];
  },
  users: function(){ return Store.get('users', {}); },
  clearAppData: function(){
    ['collected','history','hidden','lastGrab','city'].forEach(function(k){ Store.del(k); });
  }
};
window.Biz = Biz;

})();
