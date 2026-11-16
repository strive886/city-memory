/* ============================================================
   拾城记 · 公共脚本
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
  if(!u){ location.replace('index.html'); throw new Error('need-login'); }
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

/* ---------- 底部导航（自动注入当前页 active 状态；图标对齐规范：线性默认态 + 朱砂圆徽选中态） ---------- */
var TAB_ICONS = {
  home:  '<path d="M4.5 10.5 12 4l7.5 6.5"/><path d="M6 9.8V19a1.6 1.6 0 0 0 1.6 1.6h8.8A1.6 1.6 0 0 0 18 19V9.8"/><path d="M10.2 20.6v-3.5a1.8 1.8 0 0 1 3.6 0v3.5"/>',
  book:  '<path d="M12 7.2V5"/><path d="M4 10.5Q12 4.5 20 10.5"/><path d="M4 10.5q-.9-1-1-2.3M20 10.5q.9-1 1-2.3"/><path d="M8 16V9M16 16V9"/><path d="M6 16h12"/><path d="M4.5 18.8h15"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2.5"/>',
  me:    '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/>'
};
function tabSvg(inner){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
}
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
    var icon = (t.key === active)
      ? '<span class="badge">' + tabSvg(TAB_ICONS[t.key]) + '</span>'
      : tabSvg(TAB_ICONS[t.key]);
    return '<a class="tab ' + (t.key === active ? 'active' : '') + '" href="' + t.href + '">' +
             icon + '<span>' + t.label + '</span></a>';
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

/* ---------- 线性 SVG 图标库（与底部导航同一描边风格，替代 emoji 小图标） ---------- */
var Ico = {
  pin:    '<path d="M12 21s-6.5-5.4-6.5-10.2a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21z"/><circle cx="12" cy="10.6" r="2.4"/>',
  book:   '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M20 18H6.5A2.5 2.5 0 0 0 4 20.5"/>',
  clock:  '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2.5"/>',
  card:   '<path d="M8.5 6.3V6a2.3 2.3 0 0 1 2.3-2.3h6.9A2.3 2.3 0 0 1 20 6v8.9a2.3 2.3 0 0 1-2.3 2.3h-.4"/><rect x="4" y="6.3" width="12.4" height="14.2" rx="2.3"/><path d="M7 13.4l2.5-2.2 2.5 2.2"/><path d="M7 15.8h5"/>',
  user:   '<circle cx="12" cy="8" r="3.5"/><path d="M5.5 20c1.2-3.4 3.6-5 6.5-5s5.3 1.6 6.5 5"/>',
  trash:  '<path d="M4.5 6.5h15"/><path d="M9.5 6.5V5A1.5 1.5 0 0 1 11 3.5h2A1.5 1.5 0 0 1 14.5 5v1.5"/><path d="M6.5 6.5l1 13.5h9l1-13.5"/>',
  key:    '<circle cx="8" cy="15" r="3.5"/><path d="M10.6 12.4L19 4M15.5 7.5l2.5 2.5M13 10l2 2"/>',
  city:   '<path d="M4 20.5h16"/><path d="M6 20.5V9.5l5-3v14"/><path d="M11 20.5V4l7 3.2v13.3"/>',
  camera: '<path d="M4 8.5a2 2 0 0 1 2-2h2l1.2-2h5.6L16 6.5h2a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.4"/>',
  edit:   '<path d="M4 20l1-4L16.5 4.5a2.12 2.12 0 0 1 3 3L8 19z"/>',
  lock:   '<rect x="5.5" y="10.5" width="13" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  report: '<path d="M4 10.5v3.5l3 .5 8 4.5V5.5l-8 4.5z"/><path d="M17.5 9.5a4.5 4.5 0 0 1 0 5.5"/>',
  link:   '<circle cx="6" cy="12" r="2.6"/><circle cx="17.5" cy="6" r="2.6"/><circle cx="17.5" cy="18" r="2.6"/><path d="M8.4 10.9l6.7-3.7M8.4 13.1l6.7 3.7"/>',
  gift:   '<path d="M6 10.5h12V20H6z"/><path d="M4.5 7.5h15v3h-15z"/><path d="M12 7.5V20"/><path d="M12 7.5c-2.2 0-4.2-1-4.2-2.4C7.8 3.8 9 3.2 10 3.8c1.1.6 2 2.2 2 3.7.0-1.5.9-3.1 2-3.7 1-.6 2.2 0 2.2 1.3 0 1.4-2 2.4-4.2 2.4z"/>',
  spark:  '<path d="M12 4l1.8 4.6L18 10l-4.2 1.4L12 16l-1.8-4.6L6 10l4.2-1.4z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  star:   '<path d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/>',
  stop:   '<rect x="7" y="7" width="10" height="10" rx="1.5"/>',
  box:    '<path d="M4 8l8-4.5L20 8v8l-8 4.5L4 16z"/><path d="M4 8l8 4.5L20 8M12 12.5V20.5"/>',
  phone:  '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M10.5 17.5h3"/>',
  chat:   '<path d="M14.5 4.5h1.6A3.9 3.9 0 0 1 20 8.4v2"/><path d="M4 11.2a4.9 4.9 0 0 1 4.9-4.9h4.2a4.9 4.9 0 0 1 .4 9.8l-4.3 3.4.5-3A4.9 4.9 0 0 1 4 11.2z"/><circle cx="8.2" cy="11.3" r=".95" fill="currentColor" stroke="none"/><circle cx="11.5" cy="11.3" r=".95" fill="currentColor" stroke="none"/><circle cx="14.8" cy="11.3" r=".95" fill="currentColor" stroke="none"/>',
  check:  '<path d="M4.5 12.5l5 5L19.5 6.5"/>',
  grab:   '<path d="M4.5 8V6.6A2.1 2.1 0 0 1 6.6 4.5H8M16 4.5h1.4A2.1 2.1 0 0 1 19.5 6.6V8M19.5 16v1.4a2.1 2.1 0 0 1-2.1 2.1H16M8 19.5H6.6A2.1 2.1 0 0 1 4.5 17.4V16"/><path d="M8.3 16.6c-1-.7-1.6-1.5-1.6-2.6v-2.6a1.25 1.25 0 0 1 2.5 0v-1.2a1.25 1.25 0 0 1 2.5 0V9a1.25 1.25 0 0 1 2.5 0v.7a1.25 1.25 0 0 1 2.5 0v3.5c0 2.1-1.5 3.3-3.3 3.4z"/>',
  brush:  '<g transform="rotate(45 12 12)"><rect x="9.2" y="3.2" width="5.6" height="6" rx="1.2"/><rect x="8.2" y="9.2" width="7.6" height="7.4" rx="2.6"/></g><circle cx="5.2" cy="19" r=".8" fill="currentColor" stroke="none"/><circle cx="18.8" cy="19" r=".8" fill="currentColor" stroke="none"/>',
  spread: '<path d="M9.5 12H3.5M6 9.5 3.5 12 6 14.5"/><path d="M14.5 12h6M18 9.5l2.5 2.5L18 14.5"/>',
  robot:  '<rect x="5" y="8.2" width="14" height="10.6" rx="3"/><circle cx="12" cy="4.6" r="1.5"/><path d="M12 6.1v2.1"/><path d="M3.2 12.5v2.6M20.8 12.5v2.6"/><circle cx="9.3" cy="13.2" r="1.15"/><circle cx="14.7" cy="13.2" r="1.15"/><path d="M10 16.2h4"/>',
  medal:  '<circle cx="12" cy="8.8" r="4.6"/><path d="M12 6.6l.75 1.5 1.65.25-1.2 1.2.3 1.65L12 10.4l-1.5.8.3-1.65-1.2-1.2 1.65-.25z"/><path d="M9.4 12.8 7.2 19.6l4.8-2.8 4.8 2.8-2.2-6.8"/>'
};
window.Ico = Ico;
window.ico = function(name, size, color){
  size = size || 16;
  return '<svg class="ico" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="' + (color || 'currentColor') + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + Ico[name] + '</svg>';
};

/* ---------- 音效（WebAudio 合成，无音频文件；grab/burst/clean/collect/achieve） ---------- */
var Sfx = (function(){
  var ctx = null;
  function ac(){
    if(!ctx){
      var AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return null;
      ctx = new AC();
    }
    if(ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freq, t0, dur, vol, sweepTo){
    var a = ac(); if(!a) return;
    var o = a.createOscillator(), g = a.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, a.currentTime + t0);
    if(sweepTo) o.frequency.exponentialRampToValueAtTime(sweepTo, a.currentTime + t0 + dur);
    g.gain.setValueAtTime(0.0001, a.currentTime + t0);
    g.gain.exponentialRampToValueAtTime(vol || .16, a.currentTime + t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + t0 + dur);
    o.connect(g).connect(a.destination);
    o.start(a.currentTime + t0); o.stop(a.currentTime + t0 + dur + .05);
  }
  function noise(t0, dur, vol){
    var a = ac(); if(!a) return;
    var len = Math.floor(a.sampleRate * dur);
    var buf = a.createBuffer(1, len, a.sampleRate);
    var d = buf.getChannelData(0);
    for(var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    var src = a.createBufferSource(); src.buffer = buf;
    var g = a.createGain(); g.gain.value = vol || .2;
    src.connect(g).connect(a.destination);
    src.start(a.currentTime + t0);
  }
  var fx = {
    grab:    function(){ tone(420, 0, .18, .14, 900); },                     // 上滑提示
    burst:   function(){ noise(0, .25, .2); tone(150, 0, .3, .22, 60); },    // 噪声+低音"砰"
    clean:   function(){ tone(880, 0, .7, .11); tone(1318, .03, .9, .07); }, // 小钟鸣
    collect: function(){ tone(659, 0, .1, .13); tone(880, .09, .2, .14); },  // 两音上跳
    achieve: function(){ tone(523, 0, .12, .13); tone(659, .1, .12, .13); tone(784, .2, .28, .15); } // 三连音
  };
  return { play: function(name){ try{ if(fx[name]) fx[name](); }catch(e){} } };
})();
window.Sfx = Sfx;

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
  cards: function(){ return Store.get('cards', []); },                  // 纪念卡册 [{item, ts}]
  saveCard: function(itemId){                                           // 生成/查看过的卡保留在卡册
    var c = this.cards();
    var t = Date.now(), found = false;
    c.forEach(function(x){ if(x.item === itemId){ x.ts = t; found = true; } });
    if(!found) c.unshift({ item: itemId, ts: t });
    Store.set('cards', c);
  },
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
