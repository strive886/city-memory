/* ============================================================
   老物件手绘插画库（方案 A）
   每件物件一幅精细 SVG：材质渐变 + 木纹/釉面/纸纹细节 + 高光
   itemArt(id, size) 返回「悬空展台」组件（聚光 + 浮动 + 脚底投影）
   未绘制的物件自动回退 emoji。
   ============================================================ */
'use strict';

var ITEM_ART = {

  /* ---------- 常山战鼓鼓槌：一双交叉的枣木鼓槌，红绳缠柄 ---------- */
  warDrum:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_wd_a" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#9a5632"/><stop offset=".45" stop-color="#7c3f22"/><stop offset="1" stop-color="#5a2c15"/>' +
      '</linearGradient>' +
      '<linearGradient id="art_wd_b" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#7c4123"/><stop offset="1" stop-color="#43210f"/>' +
      '</linearGradient>' +
      '<radialGradient id="art_wd_h" cx=".35" cy=".3" r=".95">' +
        '<stop offset="0" stop-color="#b8703f"/><stop offset=".55" stop-color="#8a4526"/><stop offset="1" stop-color="#552a13"/>' +
      '</radialGradient>' +
    '</defs>' +
    /* 后槌（背光，较暗） */
    '<g transform="translate(106,102) rotate(-31)">' +
      '<rect x="-8.5" y="-64" width="17" height="130" rx="8.5" fill="url(#art_wd_b)"/>' +
      '<ellipse cx="0" cy="-64" rx="9.5" ry="11" fill="#63301b"/>' +
      '<path d="M-3 -54 C -1 -18, -4 18, -2 52" stroke="#331809" stroke-width="1.6" fill="none" opacity=".55"/>' +
      '<path d="M3.5 -48 C 4.5 -12, 2.5 20, 3.5 48" stroke="#331809" stroke-width="1.1" fill="none" opacity=".4"/>' +
    '</g>' +
    /* 前槌（受光） */
    '<g transform="translate(86,94) rotate(27)">' +
      '<rect x="-9.5" y="-70" width="19" height="140" rx="9.5" fill="url(#art_wd_a)"/>' +
      '<ellipse cx="0" cy="-70" rx="10.5" ry="12" fill="url(#art_wd_h)"/>' +
      '<path d="M-5.5 -58 C -3.5 -20, -6 18, -4.5 56" stroke="#c98d5c" stroke-width="2.4" fill="none" opacity=".55"/>' +
      '<path d="M-2.5 -56 C -1 -16, -3.5 18, -1.5 54" stroke="#4a2412" stroke-width="1.4" fill="none" opacity=".5"/>' +
      '<path d="M3 -50 C 4 -14, 2 20, 3.5 50" stroke="#4a2412" stroke-width="1.1" fill="none" opacity=".4"/>' +
      '<path d="M-9.5 16 L 9.5 20 M-9.5 24 L 9.5 28 M-9.5 32 L 9.5 36" stroke="#a83a26" stroke-width="3.6"/>' +
      '<path d="M-9.5 20 L 9.5 24 M-9.5 28 L 9.5 32" stroke="#6b2013" stroke-width="1.2" opacity=".8"/>' +
      '<ellipse cx="0" cy="-71" rx="4.2" ry="4.6" fill="#dba76a" opacity=".6"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 1987 年老车票：硬板票，纸黄、折痕、检票孔、红章 ---------- */
  ticket87:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_tk_p" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#eeddab"/><stop offset="1" stop-color="#d6bd82"/>' +
      '</linearGradient>' +
      '<radialGradient id="art_tk_stain" cx=".5" cy=".5" r=".5">' +
        '<stop offset="0" stop-color="#a8853e" stop-opacity=".35"/><stop offset="1" stop-color="#a8853e" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<g transform="translate(100,100) rotate(-4)">' +
      '<rect x="-79" y="-34" width="158" height="68" rx="3" fill="url(#art_tk_p)" stroke="#8a6f3a" stroke-width="1.4"/>' +
      '<rect x="-73" y="-28" width="146" height="56" fill="none" stroke="#9a4a2c" stroke-width="1.5"/>' +
      '<ellipse cx="-40" cy="16" rx="26" ry="9" fill="url(#art_tk_stain)"/>' +
      '<ellipse cx="34" cy="-18" rx="20" ry="7" fill="url(#art_tk_stain)"/>' +
      '<text x="-66" y="-9" font-family="SimSun,STSong,serif" font-size="14" font-weight="bold" fill="#7a3a20">石家庄—太原</text>' +
      '<text x="-66" y="9" font-family="SimSun,STSong,serif" font-size="11.5" fill="#7a3a20">337次　硬座</text>' +
      '<text x="-66" y="24" font-family="SimSun,STSong,serif" font-size="10" fill="#8a6f3a">1987年05月12日</text>' +
      '<circle cx="57" cy="-2" r="5" fill="#f6f1e7" stroke="#8a6f3a" stroke-width="1.2"/>' +
      '<path d="M-73 6 L 73 -1" stroke="#b89a58" stroke-width="1" opacity=".45"/>' +
      '<circle cx="44" cy="12" r="10.5" fill="none" stroke="#b5402c" stroke-width="1.7" opacity=".85"/>' +
      '<text x="44" y="12.5" font-size="6.2" fill="#b5402c" text-anchor="middle" font-family="SimSun,STSong,serif" opacity=".9">石家庄站</text>' +
      '<path d="M-79 -34 l 5 0 l -5 5 z" fill="#b9a05e"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 药厂搪瓷缸子：白搪瓷 + 红字厂徽带 + 磕碰露铁 ---------- */
  enamel:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_em_b" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#fdfcf4"/><stop offset=".5" stop-color="#ddd6c1"/><stop offset="1" stop-color="#b3ac93"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(100,102)">' +
      '<path d="M-52 -46 L52 -46 L45 56 Q0 66 -45 56 Z" fill="url(#art_em_b)"/>' +
      '<ellipse cx="0" cy="-46" rx="52" ry="12" fill="#e8e2d0" stroke="#b0a88e" stroke-width="1.4"/>' +
      '<ellipse cx="0" cy="-46" rx="45" ry="9.5" fill="#efe9d6" stroke="#a89f84"/>' +
      '<path d="M-50.5 -31 L50.5 -31 L48 -6 L-48 -6 Z" fill="#b5402c"/>' +
      '<text x="0" y="-13.5" text-anchor="middle" font-size="15" letter-spacing="1.5" fill="#fdf6e8" font-family="SimSun,STSong,serif" font-weight="bold">华北制药厂</text>' +
      '<path d="M29 -46 l 7 3 l -2 5.5 l -6.5 -2.2 z" fill="#4a4238"/>' +
      '<path d="M-37 -32 C -42 2, -40 30, -33 50" stroke="#fffdf4" stroke-width="5" fill="none" opacity=".5"/>' +
      '<path d="M38 -28 C 42 2, 40 26, 33 48" stroke="#8a8270" stroke-width="5.5" fill="none" opacity=".35"/>' +
      '<path d="M46 -16 C 65 -12, 65 12, 44 18" stroke="#c9c2ac" stroke-width="7" fill="none"/>' +
      '<path d="M46 -16 C 65 -12, 65 12, 44 18" stroke="#8f8871" stroke-width="2.2" fill="none" opacity=".55"/>' +
      '<ellipse cx="0" cy="57" rx="44" ry="7" fill="#b3ac93" opacity=".55"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 中山路老座钟：拱顶木壳 + 米黄字面 + 黄铜圈 ---------- */
  clock78:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_ck_w" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#6b4426"/><stop offset=".5" stop-color="#54331b"/><stop offset="1" stop-color="#3c2411"/>' +
      '</linearGradient>' +
      '<radialGradient id="art_ck_f" cx=".4" cy=".35" r=".9">' +
        '<stop offset="0" stop-color="#f6efdb"/><stop offset="1" stop-color="#ddd0ae"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<g transform="translate(100,102)">' +
      '<path d="M-56 72 L-56 -18 Q-56 -64 0 -64 Q56 -64 56 -18 L56 72 Z" fill="url(#art_ck_w)"/>' +
      '<path d="M-40 -12 C -38 10, -40 40, -38 62 M40 -12 C 38 10, 40 40, 38 62" stroke="#2e1c0c" stroke-width="1.3" fill="none" opacity=".6"/>' +
      '<circle cx="0" cy="-50" r="4" fill="#c8a24b"/>' +
      '<circle cx="0" cy="-6" r="40" fill="url(#art_ck_f)" stroke="#c8a24b" stroke-width="3.2"/>' +
      '<path d="M32 -8 L26 -8 M16 -35.7 L13 -30.5 M27.7 -24 L22.5 -19.5 M0 -40 L0 -34 M-27.7 -24 L-22.5 -19.5 M-16 -35.7 L-13 -30.5 M-32 -8 L-26 -8 M-16 19.7 L-13 14.5 M-27.7 8 L-22.5 3.5 M0 24 L0 18 M27.7 8 L22.5 3.5 M16 19.7 L13 14.5" stroke="#5a5140" stroke-width="1.6"/>' +
      '<path d="M0 -6 L-14 -17" stroke="#2a251d" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M0 -6 L19 -18" stroke="#2a251d" stroke-width="2.4" stroke-linecap="round"/>' +
      '<circle cx="0" cy="-6" r="2.8" fill="#b5402c"/>' +
      '<rect x="-64" y="70" width="128" height="9" rx="3" fill="#3c2411"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 国棉厂纱锭：木锭 + 银白纱管，细线缠绕 ---------- */
  spindle:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_sp_y" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#f7f2e3"/><stop offset=".55" stop-color="#e4dcc6"/><stop offset="1" stop-color="#b8b096"/>' +
      '</linearGradient>' +
      '<linearGradient id="art_sp_w" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#9a6a3c"/><stop offset="1" stop-color="#5f3d1e"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(100,100)">' +
      '<rect x="-3" y="-82" width="6" height="32" rx="2.5" fill="url(#art_sp_w)"/>' +
      '<ellipse cx="0" cy="-50" rx="7" ry="4.5" fill="#8a5a30"/>' +
      '<path d="M-10 -48 C -30 -34, -32 24, -11 50 L 11 50 C 32 24, 30 -34, 10 -48 Z" fill="url(#art_sp_y)"/>' +
      '<path d="M-12 -40 C 12 -36, -12 -28, 13 -22 M-14 -18 C 12 -14, -13 -8, 14 -2 M-14 4 C 12 8, -13 14, 13 20 M-12 26 C 11 30, -11 36, 11 42" stroke="#c4bb9e" stroke-width="1.6" fill="none" opacity=".9"/>' +
      '<path d="M-9 -36 C 9 -32, -9 -26, 10 -20 M-10 -12 C 10 -8, -10 -2, 10 4 M-10 12 C 9 16, -9 22, 9 28" stroke="#a89f84" stroke-width="1.1" fill="none" opacity=".7"/>' +
      '<path d="M-20 -30 C -26 0, -24 26, -18 44" stroke="#fffdf4" stroke-width="4" fill="none" opacity=".5"/>' +
      '<path d="M-3 50 L 3 50 L 3 78 Q 0 82 -3 78 Z" fill="url(#art_sp_w)"/>' +
      '<path d="M8 -44 C 20 -20, 22 20, 10 44" stroke="#a89f84" stroke-width="1.4" fill="none" opacity=".5"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 荣国府砖雕：青砖 + 牡丹浮雕 + 缺角 ---------- */
  brick86:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_bk_g" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#a4acb1"/><stop offset="1" stop-color="#767e84"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(100,100) rotate(-1.5)">' +
      '<rect x="-76" y="-50" width="152" height="100" rx="4" fill="url(#art_bk_g)" stroke="#575f65" stroke-width="1.6"/>' +
      '<rect x="-66" y="-41" width="132" height="82" fill="none" stroke="#5f676d" stroke-width="1.3"/>' +
      '<g>' +
        '<ellipse cx="0" cy="0" rx="13" ry="24" fill="#939ba1" transform="rotate(0)"/>' +
        '<ellipse cx="0" cy="0" rx="13" ry="24" fill="#939ba1" transform="rotate(45)"/>' +
        '<ellipse cx="0" cy="0" rx="13" ry="24" fill="#939ba1" transform="rotate(90)"/>' +
        '<ellipse cx="0" cy="0" rx="13" ry="24" fill="#939ba1" transform="rotate(135)"/>' +
        '<circle cx="0" cy="0" r="12" fill="#a4acb1"/>' +
        '<ellipse cx="0" cy="0" rx="8" ry="15" fill="#aab2b7" transform="rotate(22)"/>' +
        '<ellipse cx="0" cy="0" rx="8" ry="15" fill="#aab2b7" transform="rotate(67)"/>' +
        '<ellipse cx="0" cy="0" rx="8" ry="15" fill="#aab2b7" transform="rotate(112)"/>' +
        '<ellipse cx="0" cy="0" rx="8" ry="15" fill="#aab2b7" transform="rotate(157)"/>' +
        '<circle cx="0" cy="0" r="6.5" fill="#b4bbbf"/>' +
        '<circle cx="0" cy="0" r="2.6" fill="#7d858b"/>' +
      '</g>' +
      '<path d="M52 -50 l 8 6 l -10 4 z" fill="#5f676d"/>' +
      '<path d="M-76 30 l 7 -4 l 3 8 l -8 2 z" fill="#5f676d"/>' +
      '<circle cx="-46" cy="-26" r="1.6" fill="#5f676d" opacity=".7"/>' +
      '<circle cx="44" cy="26" r="1.8" fill="#5f676d" opacity=".6"/>' +
      '<circle cx="30" cy="-30" r="1.4" fill="#5f676d" opacity=".6"/>' +
      '<path d="M-60 34 C -30 40, 30 40, 60 34" stroke="#6f777c" stroke-width="1.2" fill="none" opacity=".6"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 八大碗老食盒：双层提梁木匣 ---------- */
  foodBox:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_fb_w" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#a4713c"/><stop offset=".5" stop-color="#8a5a2e"/><stop offset="1" stop-color="#6f4a24"/>' +
      '</linearGradient>' +
      '<linearGradient id="art_fb_l" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#b8834a"/><stop offset="1" stop-color="#7d5228"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(100,104)">' +
      '<path d="M-42 -46 C -42 -88, 42 -88, 42 -46" stroke="#6f4a24" stroke-width="8" fill="none"/>' +
      '<path d="M-42 -46 C -42 -84, 42 -84, 42 -46" stroke="#a4713c" stroke-width="2.2" fill="none" opacity=".7"/>' +
      '<ellipse cx="0" cy="-50" rx="52" ry="11" fill="url(#art_fb_l)"/>' +
      '<path d="M-52 -50 L52 -50 L50 -28 L-50 -28 Z" fill="url(#art_fb_l)"/>' +
      '<path d="M-54 -28 L54 -28 L52 8 L-52 8 Z" fill="url(#art_fb_w)"/>' +
      '<path d="M-56 8 L56 8 L53 44 Q0 52 -53 44 Z" fill="url(#art_fb_l)"/>' +
      '<path d="M-54 -28 L54 -28 M-52 8 L52 8" stroke="#4a3014" stroke-width="2"/>' +
      '<path d="M-40 -40 C -20 -44, 20 -44, 40 -40 M-42 -12 C -20 -16, 20 -16, 42 -12 M-44 22 C -20 18, 20 18, 44 22" stroke="#5a3a1a" stroke-width="1.2" fill="none" opacity=".6"/>' +
      '<path d="M-34 -44 C -38 -20, -36 12, -32 40" stroke="#c99a5e" stroke-width="2.4" fill="none" opacity=".5"/>' +
      '<circle cx="0" cy="-10" r="3.2" fill="#c8a24b"/>' +
      '<circle cx="0" cy="26" r="3.2" fill="#c8a24b"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 隆兴寺祈福铜铃：青铜 + 铜绿斑 + 刻纹带 ---------- */
  bell:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_bl_b" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#a8894a"/><stop offset=".45" stop-color="#7d6432"/><stop offset="1" stop-color="#554319"/>' +
      '</linearGradient>' +
      '<radialGradient id="art_bl_p" cx=".5" cy=".5" r=".5">' +
        '<stop offset="0" stop-color="#4a7a5a" stop-opacity=".65"/><stop offset="1" stop-color="#4a7a5a" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<g transform="translate(100,104)">' +
      '<circle cx="0" cy="-72" r="6.5" fill="none" stroke="#7d6432" stroke-width="3.2"/>' +
      '<path d="M-9 -66 C -30 -56, -42 -18, -45 8 L 45 8 C 42 -18, 30 -56, 9 -66 Z" fill="url(#art_bl_b)"/>' +
      '<ellipse cx="0" cy="8" rx="46" ry="8.5" fill="#8a6f3a" stroke="#554319" stroke-width="1.4"/>' +
      '<ellipse cx="0" cy="8" rx="36" ry="6" fill="#2a2014"/>' +
      '<path d="M-38 -6 C -20 0, 20 0, 38 -6 M-36 1 C -18 6, 18 6, 36 1" stroke="#c8a24b" stroke-width="1.4" fill="none" opacity=".8"/>' +
      '<circle cx="-24" cy="-3" r="1.5" fill="#c8a24b" opacity=".9"/><circle cx="-12" cy="0" r="1.5" fill="#c8a24b" opacity=".9"/>' +
      '<circle cx="0" cy="1" r="1.5" fill="#c8a24b" opacity=".9"/><circle cx="12" cy="0" r="1.5" fill="#c8a24b" opacity=".9"/><circle cx="24" cy="-3" r="1.5" fill="#c8a24b" opacity=".9"/>' +
      '<ellipse cx="-16" cy="-30" rx="12" ry="20" fill="url(#art_bl_p)"/>' +
      '<ellipse cx="20" cy="-8" rx="10" ry="16" fill="url(#art_bl_p)"/>' +
      '<path d="M-24 -52 C -26 -30, -28 -14, -28 2" stroke="#d8bd7a" stroke-width="2.4" fill="none" opacity=".5"/>' +
      '<path d="M0 8 L 0 16" stroke="#554319" stroke-width="2"/><circle cx="0" cy="19" r="4" fill="#7d6432"/>' +
    '</g>' +
  '</svg>'
};

/* 悬空展台组件：聚光 + 浮动 + 脚底投影 */
function itemArt(id, size){
  var svg = window.ITEM_ART && ITEM_ART[id];
  if(!svg) return null;
  return '<span class="pedestal" style="width:' + size + 'px;height:' + size + 'px">' +
           '<span class="glow"></span>' +
           '<span class="art">' + svg + '</span>' +
           '<span class="shadow"></span>' +
         '</span>';
}
window.itemArt = itemArt;
