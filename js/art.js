/* ============================================================
   老物件手绘插画库（方案 A）
   每件物件一幅精细 SVG：材质渐变 + 木纹/釉面/纸纹细节 + 高光
   itemArt(id, size) 返回「悬空展台」组件（聚光 + 浮动 + 脚底投影）
   16 件物件全部手绘完成，emoji 仅作兜底。
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
  '</svg>',

  /* ---------- 石门老门牌：蓝底白字搪瓷牌，四角螺丝 + 瓷面磕碰 ---------- */
  doorPlate:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_dp_b" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#3a6f9c"/><stop offset=".55" stop-color="#2b5a82"/><stop offset="1" stop-color="#1e4463"/>' +
      '</linearGradient>' +
      '<radialGradient id="art_dp_s" cx=".32" cy=".28" r=".8">' +
        '<stop offset="0" stop-color="#ffffff" stop-opacity=".22"/><stop offset=".6" stop-color="#ffffff" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<g transform="translate(100,102) rotate(-2.5)">' +
      '<rect x="-72" y="-46" width="144" height="92" rx="7" fill="url(#art_dp_b)" stroke="#17334c" stroke-width="2"/>' +
      '<rect x="-62" y="-36" width="124" height="72" fill="none" stroke="#e9f1f6" stroke-width="2.2" opacity=".9"/>' +
      '<text x="3" y="-6" text-anchor="middle" font-family="SimSun,STSong,serif" font-size="19" font-weight="bold" letter-spacing="7" fill="#f2f7fa">石门市</text>' +
      '<text x="3" y="22" text-anchor="middle" font-family="SimSun,STSong,serif" font-size="13" letter-spacing="3" fill="#dbe8f0">大桥街 12 号</text>' +
      '<g fill="#132b40" stroke="#9db8cb" stroke-width="1.2">' +
        '<circle cx="-64" cy="-38" r="3.4"/><circle cx="64" cy="-38" r="3.4"/><circle cx="-64" cy="38" r="3.4"/><circle cx="64" cy="38" r="3.4"/>' +
      '</g>' +
      '<path d="M-66 -40 L -62 -36 M62 -40 L 66 -36 M-66 40 L -62 36 M62 40 L 66 36" stroke="#0f2233" stroke-width="1"/>' +
      '<path d="M72 46 L 59 46 L 65 37 L 72 29 Z" fill="#22303c"/>' +
      '<path d="M59 46 L 65 37 L 72 29" stroke="#0f2233" stroke-width="1.2" fill="none"/>' +
      '<ellipse cx="-24" cy="-14" rx="34" ry="18" fill="url(#art_dp_s)" transform="rotate(-18 -24 -14)"/>' +
      '<circle cx="0" cy="-46" r="4" fill="#132b40" stroke="#8fb0c6" stroke-width="1.4"/>' +
      '<circle cx="-46" cy="28" r="1.6" fill="#7a4a1e" opacity=".55"/><circle cx="34" cy="-30" r="1.3" fill="#7a4a1e" opacity=".5"/><circle cx="18" cy="36" r="1.4" fill="#7a4a1e" opacity=".45"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 赵州桥游览券：竖排名 + 敞肩拱线稿 + 撕票孔 + 朱印 ---------- */
  bridgePass:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_bp_p" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#efe8d0"/><stop offset="1" stop-color="#dcd2ac"/>' +
      '</linearGradient>' +
      '<radialGradient id="art_bp_st" cx=".5" cy=".5" r=".5">' +
        '<stop offset="0" stop-color="#a8853e" stop-opacity=".3"/><stop offset="1" stop-color="#a8853e" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<g transform="translate(100,100) rotate(3)">' +
      '<rect x="-70" y="-44" width="140" height="88" rx="3" fill="url(#art_bp_p)" stroke="#8a8058" stroke-width="1.5"/>' +
      '<line x1="-52" y1="-44" x2="-52" y2="44" stroke="#8a8058" stroke-width="1.2" stroke-dasharray="3 4"/>' +
      '<circle cx="-52" cy="-44" r="4" fill="#f0e7cd" stroke="#8a8058" stroke-width="1.2"/>' +
      '<circle cx="-52" cy="44" r="4" fill="#f0e7cd" stroke="#8a8058" stroke-width="1.2"/>' +
      '<text x="-36" y="0" text-anchor="middle" font-family="SimSun,STSong,serif" font-size="12.5" fill="#4a4432" font-weight="bold">' +
        '<tspan x="-36" y="-26">赵</tspan><tspan x="-36" y="-13">州</tspan><tspan x="-36" y="0">桥</tspan><tspan x="-36" y="13">游</tspan><tspan x="-36" y="26">览</tspan><tspan x="-36" y="39">券</tspan>' +
      '</text>' +
      '<g stroke="#5a6470" fill="none">' +
        '<path d="M-20 -12 Q 18 -17 56 -12" stroke-width="1.8"/>' +
        '<path d="M-20 -8 Q 18 -13 56 -8" stroke-width="1.4"/>' +
        '<path d="M-8 -12 L -8 -8 M8 -12 L 8 -8 M24 -12 L 24 -8 M40 -12 L 40 -8" stroke-width="1" opacity=".7"/>' +
        '<path d="M-18 -8 L -16 24 M54 -8 L 52 24" stroke-width="1.8"/>' +
        '<path d="M-16 24 L 52 24" stroke-width="1.6"/>' +
        '<path d="M-6 24 A 29 21 0 0 1 44 24" stroke-width="2"/>' +
        '<path d="M-12 -4 L 6 -4 M20 -4 L 40 -4 M-8 0 L 2 0 M30 0 L 46 0" stroke-width="1" opacity=".55"/>' +
      '</g>' +
      '<circle cx="2" cy="9" r="4.2" fill="url(#art_bp_p)" stroke="#5a6470" stroke-width="1.4"/>' +
      '<circle cx="34" cy="9" r="4.2" fill="url(#art_bp_p)" stroke="#5a6470" stroke-width="1.4"/>' +
      '<path d="M-28 29 q 6 -3 12 0 t 12 0 t 12 0 t 12 0 t 12 0 t 12 0" stroke="#7a8694" stroke-width="1.2" fill="none" opacity=".7"/>' +
      '<path d="M-28 33 q 6 -3 12 0 t 12 0 t 12 0 t 12 0 t 12 0 t 12 0" stroke="#7a8694" stroke-width="1.2" fill="none" opacity=".5"/>' +
      '<text x="53" y="37" text-anchor="middle" font-family="SimSun,STSong,serif" font-size="10.5" fill="#4a4432">贰角</text>' +
      '<text x="44" y="-34" text-anchor="middle" font-size="6.5" fill="#8a8058" font-family="monospace">No.00247</text>' +
      '<circle cx="36" cy="30" r="8" fill="none" stroke="#b5402c" stroke-width="1.5" opacity=".75"/>' +
      '<text x="36" y="32.5" text-anchor="middle" font-size="6" fill="#b5402c" font-family="SimSun,STSong,serif" opacity=".8">赵县</text>' +
      '<path d="M-50 -2 L 56 2" stroke="#b3a877" stroke-width="1" opacity=".4"/>' +
      '<ellipse cx="58" cy="-30" rx="13" ry="6" fill="url(#art_bp_st)"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 井陉窑白瓷盏：象牙白釉 + 印花波带 + 口沿磕口 ---------- */
  jingxingCup:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_jc_g" x1="0" y1="0" x2="1" y2=".35">' +
        '<stop offset="0" stop-color="#fffdf6"/><stop offset=".55" stop-color="#efe8d4"/><stop offset="1" stop-color="#cfc3a2"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(100,100)">' +
      '<path d="M-44 -26 C -47 6, -36 34, -18 44 L 18 44 C 36 34, 47 6, 44 -26 Z" fill="url(#art_jc_g)" stroke="#b8ab88" stroke-width="1.6"/>' +
      '<ellipse cx="0" cy="-26" rx="44" ry="11" fill="#f7f1de" stroke="#b8ab88" stroke-width="1.6"/>' +
      '<ellipse cx="0" cy="-26" rx="36" ry="8" fill="#efe6cf" stroke="#c3b694" stroke-width="1"/>' +
      '<path d="M30 -32 L 38.5 -28.5 L 33 -22.5 Z" fill="#c3b694"/>' +
      '<path d="M30 -32 L 38.5 -28.5" stroke="#8a8060" stroke-width="1.2"/>' +
      '<path d="M-37 -10 C -18 -3, 18 -3, 37 -10" stroke="#c2b28a" stroke-width="1.5" fill="none"/>' +
      '<path d="M-35 -3 C -17 4, 17 4, 35 -3" stroke="#c2b28a" stroke-width="1.2" fill="none" opacity=".8"/>' +
      '<circle cx="-24" cy="-6.5" r="1.2" fill="#b3a273"/><circle cx="-12" cy="-4.5" r="1.2" fill="#b3a273"/><circle cx="0" cy="-4" r="1.2" fill="#b3a273"/><circle cx="12" cy="-4.5" r="1.2" fill="#b3a273"/><circle cx="24" cy="-6.5" r="1.2" fill="#b3a273"/>' +
      '<path d="M-20 14 L -8 22 L -14 34 M16 10 L 24 22 L 18 34" stroke="#d5c9a8" stroke-width="1" fill="none" opacity=".7"/>' +
      '<ellipse cx="0" cy="50" rx="15" ry="4.5" fill="#e8dfc6" stroke="#b8ab88" stroke-width="1.4"/>' +
      '<path d="M-30 -14 C -34 6, -28 24, -18 34" stroke="#fffef9" stroke-width="5" fill="none" opacity=".65"/>' +
      '<path d="M26 -10 C 30 4, 27 20, 18 32" stroke="#c9bc9c" stroke-width="4.5" fill="none" opacity=".4"/>' +
      '<ellipse cx="0" cy="55" rx="24" ry="3.5" fill="#b3ac93" opacity=".4"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 石门解放号外：红字号外框 + 竖排头条 + 铅字行 + 油墨 ---------- */
  shimenExtra:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_se_p" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#f2ecd9"/><stop offset="1" stop-color="#ddd3b4"/>' +
      '</linearGradient>' +
      '<radialGradient id="art_se_ink" cx=".5" cy=".5" r=".5">' +
        '<stop offset="0" stop-color="#2a251d" stop-opacity=".3"/><stop offset="1" stop-color="#2a251d" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<g transform="translate(100,102) rotate(2)">' +
      '<path d="M-66 36 L 66 36 L 70 51 L -62 51 Z" fill="#e2d8ba" stroke="#a8996e" stroke-width="1"/>' +
      '<rect x="-72" y="-52" width="144" height="90" rx="2" fill="url(#art_se_p)" stroke="#9a8f6e" stroke-width="1.4"/>' +
      '<path d="M-72 16 L 72 16" stroke="#b3a877" stroke-width="1" opacity=".6"/>' +
      '<rect x="-64" y="-46" width="26" height="58" fill="none" stroke="#b5402c" stroke-width="1.6"/>' +
      '<text x="-51" y="-24" text-anchor="middle" font-family="SimSun,STSong,serif" font-size="20" font-weight="bold" fill="#b5402c">号</text>' +
      '<text x="-51" y="2" text-anchor="middle" font-family="SimSun,STSong,serif" font-size="20" font-weight="bold" fill="#b5402c">外</text>' +
      '<text x="-51" y="10" text-anchor="middle" font-size="5.5" fill="#8a8058" font-family="monospace">1947.11.12</text>' +
      '<text x="-33" y="0" text-anchor="middle" font-family="SimSun,STSong,serif" font-size="15" font-weight="bold" fill="#2a251d">' +
        '<tspan x="-33" y="-30">石</tspan><tspan x="-33" y="-14">门</tspan><tspan x="-33" y="2">解</tspan><tspan x="-33" y="18">放</tspan>' +
      '</text>' +
      '<g stroke="#8a8266" stroke-width="1.5" opacity=".75">' +
        '<path d="M-16 -40 L 60 -40 M-16 -32 L 60 -32 M-16 -24 L 52 -24"/>' +
        '<path d="M-16 -14 L 60 -14 M-16 -6 L 56 -6 M-16 2 L 44 2"/>' +
      '</g>' +
      '<g stroke="#8a8266" stroke-width="1.5" opacity=".6">' +
        '<path d="M-60 24 L 30 24 M-60 31 L 22 31"/>' +
      '</g>' +
      '<circle cx="52" cy="26" r="8.5" fill="none" stroke="#b5402c" stroke-width="1.5" opacity=".8"/>' +
      '<text x="52" y="28.5" text-anchor="middle" font-size="5.5" fill="#b5402c" font-family="SimSun,STSong,serif" opacity=".85">石门市</text>' +
      '<ellipse cx="30" cy="-30" rx="22" ry="9" fill="url(#art_se_ink)" transform="rotate(-8 30 -30)"/>' +
      '<path d="M-72 -52 l 6 0 l -6 6 z" fill="#c9b98a"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 梁思成测绘图：晒蓝图纸 + 白线摩尼殿立面 + 标题栏 ---------- */
  surveyMap:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_sm_b" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#33587e"/><stop offset="1" stop-color="#26415f"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(100,100) rotate(-2)">' +
      '<rect x="-76" y="-54" width="152" height="108" rx="2" fill="url(#art_sm_b)" stroke="#1b3350" stroke-width="1.6"/>' +
      '<path d="M-76 -18 L 76 -18 M-26 -54 L -26 54" stroke="#16283c" stroke-width="2" opacity=".3"/>' +
      '<g stroke="#e8eef4" stroke-width="1.4" fill="none" opacity=".92">' +
        '<path d="M-62 24 L 62 24 M-56 19 L 56 19"/>' +
        '<path d="M-58 -10 Q -36 -26 -14 -29 L 14 -29 Q 36 -26 58 -10"/>' +
        '<path d="M-58 -10 L -58 -14 M58 -10 L 58 -14"/>' +
        '<path d="M-26 -36 L 26 -36"/>' +
        '<path d="M-26 -36 Q -44 -30 -58 -14 M26 -36 Q 44 -30 58 -14"/>' +
        '<path d="M-26 -36 l -4 -6 l 4 -2 M26 -36 l 4 -6 l -4 -2"/>' +
        '<path d="M-48 -13 L -48 19 M-24 -13 L -24 19 M0 -13 L 0 19 M24 -13 L 24 19 M48 -13 L 48 19"/>' +
        '<path d="M-54 -16 L -42 -16 M-30 -16 L -18 -16 M-6 -16 L 6 -16 M18 -16 L 30 -16 M42 -16 L 54 -16"/>' +
        '<path d="M-56 10 L 56 10 M-56 14 L 56 14 M-40 8 L -40 14 M-16 8 L -16 14 M8 8 L 8 14 M32 8 L 32 14"/>' +
        '<path d="M-62 34 L 62 34 M-62 30 L -62 38 M62 30 L 62 38" opacity=".8"/>' +
      '</g>' +
      '<text x="0" y="41" text-anchor="middle" font-size="6.5" fill="#dfe8f0" font-family="SimSun,STSong,serif">面阔五间 · 1:100</text>' +
      '<rect x="10" y="-50" width="58" height="17" fill="none" stroke="#e8eef4" stroke-width="1" opacity=".85"/>' +
      '<path d="M10 -41.5 L 68 -41.5" stroke="#e8eef4" stroke-width=".8" opacity=".85"/>' +
      '<text x="39" y="-45" text-anchor="middle" font-size="6.5" fill="#eef3f8" font-family="SimSun,STSong,serif">摩尼殿 立面</text>' +
      '<text x="39" y="-37" text-anchor="middle" font-size="5.5" fill="#cfdbe6" font-family="SimSun,STSong,serif">营造学社 · 一九三三</text>' +
      '<circle cx="-66" cy="-46" r="2.5" fill="#16283c" stroke="#8fa5ba" stroke-width="1.2"/>' +
      '<circle cx="66" cy="-46" r="2.5" fill="#16283c" stroke="#8fa5ba" stroke-width="1.2"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 开元寺赑屃拓片：墨拓碑座神兽 + 刻字留白 + 朱印 ---------- */
  bixiStone:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_bx_p" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#f6f1e0"/><stop offset="1" stop-color="#e6dcb9"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(100,102) rotate(-1.5)">' +
      '<rect x="-66" y="-56" width="132" height="112" rx="2" fill="url(#art_bx_p)" stroke="#b3a273" stroke-width="1.4"/>' +
      '<g fill="#322b23">' +
        '<ellipse cx="0" cy="22" rx="36" ry="17"/>' +
        '<ellipse cx="36" cy="16" rx="13" ry="8.5" transform="rotate(-18 36 16)"/>' +
        '<rect x="-28" y="30" width="9" height="14" rx="3"/>' +
        '<rect x="14" y="30" width="9" height="14" rx="3"/>' +
        '<path d="M-36 18 Q -44 14 -46 24 Q -40 26 -36 24 Z"/>' +
        '<rect x="-15" y="-40" width="30" height="46" rx="1.5"/>' +
        '<path d="M-18 -40 L 18 -40 L 14 -46 Q 8 -50 0 -50 Q -8 -50 -14 -46 Z"/>' +
      '</g>' +
      '<g stroke="#f2ecda" stroke-width="1.3" opacity=".6" fill="none" stroke-linecap="round">' +
        '<path d="M-6 -31 L 6 -31 M0 -33 L 0 -27"/>' +
        '<path d="M-6 -21 q 6 -3 12 0"/>' +
        '<path d="M-6 -13 L 6 -13"/>' +
        '<path d="M-5 -5 q 5 3 10 0"/>' +
      '</g>' +
      '<g fill="#f2ecda" opacity=".5">' +
        '<circle cx="-20" cy="16" r="1.6"/><circle cx="8" cy="26" r="1.4"/><circle cx="22" cy="18" r="1.2"/><circle cx="-6" cy="30" r="1.5"/><circle cx="30" cy="20" r="1.2"/><circle cx="-30" cy="24" r="1.3"/>' +
      '</g>' +
      '<g stroke="#6e6250" stroke-width="1.1" opacity=".7"><path d="M-56 -48 L -40 -48 M-56 -42 L -44 -42"/></g>' +
      '<circle cx="44" cy="38" r="8.5" fill="none" stroke="#b5402c" stroke-width="1.6" opacity=".7"/>' +
      '<text x="44" y="40.5" text-anchor="middle" font-size="6" fill="#b5402c" font-family="SimSun,STSong,serif" opacity=".75">开元寺</text>' +
      '<path d="M-66 8 L 66 6" stroke="#c9bc94" stroke-width="1" opacity=".5"/>' +
      '<circle cx="-58" cy="-48" r="2.2" fill="#c9bc94" stroke="#8a7a4e" stroke-width="1"/>' +
      '<circle cx="58" cy="-48" r="2.2" fill="#c9bc94" stroke="#8a7a4e" stroke-width="1"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 正定贡面木匣：掀盖木匣 + 银丝面束 + 朱签 ---------- */
  gongmianBox:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_gb_w" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#a4713c"/><stop offset=".5" stop-color="#8a5a2e"/><stop offset="1" stop-color="#6f4a24"/>' +
      '</linearGradient>' +
      '<linearGradient id="art_gb_l" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#b8834a"/><stop offset="1" stop-color="#7d5228"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(100,104)">' +
      '<g transform="rotate(-14 0 -18)">' +
        '<rect x="-48" y="-54" width="96" height="26" rx="3" fill="url(#art_gb_l)" stroke="#4a3014" stroke-width="1.8"/>' +
        '<path d="M-40 -48 L 40 -48" stroke="#5a3a1a" stroke-width="1" opacity=".6"/>' +
      '</g>' +
      '<path d="M-34 -12 C -34 -28, 34 -28, 34 -12" stroke="#6f4a24" stroke-width="3.5" fill="none"/>' +
      '<g stroke="#eee7d4" stroke-width="1.3" fill="none">' +
        '<path d="M-26 -10 C -27 -34, -26 -42, -27 -48"/>' +
        '<path d="M-20 -10 C -20 -36, -21 -44, -20 -50"/>' +
        '<path d="M-14 -10 C -13 -34, -14 -44, -14 -49"/>' +
        '<path d="M-8 -10 C -8 -36, -9 -44, -8 -51"/>' +
        '<path d="M-2 -10 C -2 -34, -3 -44, -2 -50"/>' +
        '<path d="M4 -10 C 4 -36, 3 -44, 4 -51"/>' +
        '<path d="M10 -10 C 10 -34, 9 -44, 10 -49"/>' +
        '<path d="M16 -10 C 16 -36, 17 -44, 16 -50"/>' +
        '<path d="M22 -10 C 23 -34, 22 -42, 23 -48"/>' +
        '<path d="M28 -10 C 28 -34, 28 -40, 27 -45"/>' +
      '</g>' +
      '<rect x="-30" y="-22" width="60" height="11" rx="1.5" fill="#e8dfc6" stroke="#c9a75e" stroke-width="1.2"/>' +
      '<circle cx="0" cy="-16.5" r="3" fill="#b5402c" opacity=".85"/>' +
      '<rect x="-48" y="-12" width="96" height="52" rx="4" fill="url(#art_gb_w)" stroke="#4a3014" stroke-width="2"/>' +
      '<path d="M-48 4 L 48 4 M-16 -12 L -16 40 M16 -12 L 16 40" stroke="#4a3014" stroke-width="1.2" opacity=".55"/>' +
      '<rect x="-5" y="-16" width="10" height="9" rx="2" fill="#c8a24b" stroke="#8a6a2a" stroke-width="1"/>' +
      '<rect x="-30" y="12" width="60" height="20" rx="2" fill="#f1e8cf" stroke="#b39c62" stroke-width="1.2"/>' +
      '<text x="1" y="26.5" text-anchor="middle" font-family="SimSun,STSong,serif" font-size="12" font-weight="bold" fill="#8a4a2c" letter-spacing="2">正定贡面</text>' +
      '<path d="M-38 -6 C -40 12, -38 28, -36 36" stroke="#c99a5e" stroke-width="2" fill="none" opacity=".5"/>' +
      '<path d="M40 -6 C 42 12, 40 26, 38 34" stroke="#5a3a1a" stroke-width="2" fill="none" opacity=".45"/>' +
    '</g>' +
  '</svg>',

  /* ---------- 《临济录》线装书：靛青书衣 + 白签题名 + 四眼线装 ---------- */
  linjiBook:
    '<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
      '<linearGradient id="art_lb_c" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#4d5880"/><stop offset=".55" stop-color="#3a4464"/><stop offset="1" stop-color="#2c3550"/>' +
      '</linearGradient>' +
      '<radialGradient id="art_lb_m" cx=".5" cy=".5" r=".5">' +
        '<stop offset="0" stop-color="#1e2438" stop-opacity=".45"/><stop offset="1" stop-color="#1e2438" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>' +
    '<g transform="translate(100,102) rotate(-2)">' +
      '<rect x="-42" y="-26" width="102" height="66" rx="2" fill="#333c58" stroke="#232b42" stroke-width="1.5" transform="rotate(3 7 7)"/>' +
      '<rect x="40" y="-33" width="12" height="66" fill="#f0ead8" stroke="#c9bc94" stroke-width="1"/>' +
      '<path d="M41 -24 L 51 -24 M41 -12 L 51 -12 M41 0 L 51 0 M41 12 L 51 12 M41 24 L 51 24" stroke="#d5c9a8" stroke-width=".8" opacity=".8"/>' +
      '<rect x="-52" y="-36" width="104" height="72" rx="2" fill="url(#art_lb_c)" stroke="#232b42" stroke-width="1.8"/>' +
      '<ellipse cx="-10" cy="20" rx="26" ry="14" fill="url(#art_lb_m)" opacity=".5"/>' +
      '<ellipse cx="22" cy="-12" rx="20" ry="12" fill="url(#art_lb_m)" opacity=".4"/>' +
      '<path d="M-52 36 l 8 -1 l -6 5 z" fill="#5a6488"/>' +
      '<rect x="-46" y="-30" width="24" height="52" fill="#f2ecd9" stroke="#b3a273" stroke-width="1.2"/>' +
      '<text x="-34" y="0" text-anchor="middle" font-family="SimSun,STSong,serif" font-size="13.5" font-weight="bold" fill="#2a251d">' +
        '<tspan x="-34" y="-14">临</tspan><tspan x="-34" y="2">济</tspan><tspan x="-34" y="18">录</tspan>' +
      '</text>' +
      '<path d="M46 -30 L 46 30" stroke="#d8cba8" stroke-width="1.6"/>' +
      '<path d="M42 -28 L 50 -28 M42 -9 L 50 -9 M42 11 L 50 11 M42 30 L 50 30" stroke="#d8cba8" stroke-width="1.3"/>' +
      '<circle cx="42" cy="-28" r="1.3" fill="#b3a273"/><circle cx="50" cy="-28" r="1.3" fill="#b3a273"/><circle cx="42" cy="-9" r="1.3" fill="#b3a273"/><circle cx="50" cy="-9" r="1.3" fill="#b3a273"/><circle cx="42" cy="11" r="1.3" fill="#b3a273"/><circle cx="50" cy="11" r="1.3" fill="#b3a273"/><circle cx="42" cy="30" r="1.3" fill="#b3a273"/><circle cx="50" cy="30" r="1.3" fill="#b3a273"/>' +
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
