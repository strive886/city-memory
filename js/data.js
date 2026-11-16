/* ============================================================
   拾城记 · 数据层 + AI 智能体（本地模拟）
   - 首批两个城市：石家庄 / 正定，各 8 件老物件
   - 每件物件：80 字左右记忆故事 + 问答知识库（对应方案书 RAG 知识库）
   - AI.reply 为本地知识库模拟；正式版替换为 Coze / Dify API 调用
   ============================================================ */
'use strict';

/* ---------- 城市配置（坐标用于 GPS 就近匹配） ---------- */
var CITY_DATA = {
  shijiazhuang: {
    id: 'shijiazhuang', name: '石家庄', en: 'SHIJIAZHUANG',
    tagline: '火车拉来的城市',
    desc: '因铁路而兴的省会，正太铁路与京汉铁路在此交汇。',
    lat: 38.0422, lng: 114.5086,
    items: ['ticket87', 'enamel', 'clock78', 'spindle', 'doorPlate', 'bridgePass', 'jingxingCup', 'shimenExtra'],
    hidden: {
      title: '隐藏故事 · 一座城的汽笛声',
      text: '一百年前，这里只是获鹿县上一个不起眼的小村子。1907年，正太铁路与京汉铁路在村东交会，站台立起来了，货栈立起来了，接着是商铺、工厂、学校——石家庄用几十年时间，从村庄长成了省会。老石家庄人说：这座城不是走出来的，是火车一声声汽笛"拉"来的。从石门的门牌到解放的号外，从赵州桥的游览券到井陉窑的白瓷盏——八件物件集齐，你收好的其实是一整段汽笛声里的岁月。'
    }
  },
  zhengding: {
    id: 'zhengding', name: '正定', en: 'ZHENG DING',
    tagline: '千年古郡 · 常山故里',
    desc: '国家历史文化名城，"古建宝库"，赵子龙故里。',
    lat: 38.1442, lng: 114.5714,
    items: ['brick86', 'warDrum', 'foodBox', 'bell', 'surveyMap', 'bixiStone', 'gongmianBox', 'linjiBook'],
    hidden: {
      title: '隐藏故事 · 九朝不断代',
      text: '梁思成先生曾三次探访正定，称这里是"古建艺术的宝库"。隋的寺、唐的钟、五代的塔、宋的殿、金的塑像、元的碑、明的城墙、清的碑刻——九个朝代的建筑在小小一座城里层层叠叠，从未断代。从梁思成的测绘图纸到开元寺的赑屃拓片，从战鼓、食盒到砖雕、铜铃——八件物件集齐，九朝不断代的正定，就装进了你的口袋。'
    }
  }
};

/* ---------- 老物件（含故事与问答知识库） ---------- */
var ITEM_DATA = {
  /* ============ 石家庄 ============ */
  ticket87: {
    id: 'ticket87', city: 'shijiazhuang',
    name: '1987年老车票', en: 'OLD TICKET · 1987',
    emoji: '🎫', era: '1987年', hue: 16,
    story: '1987年，石家庄站还是绿皮车的天下。这张硬板票从石家庄到太原，在正太铁路上要摇摇晃晃六个小时。那时候出远门是件大事，车票要用布包好揣进怀里，汽笛一响，整座城市仿佛都跟着颤了颤。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '这是上世纪八十年代石家庄站的硬板火车票，去太原的慢车。石家庄是"火车拉来的城市"，1907年正太铁路与京汉铁路在此交汇，才有这座城——这张票，就是那段历史的入场券。' },
      { q: ['正太铁路', '铁路', '火车'], a: '正太铁路1907年全线通车，连接石家庄与太原，最初是窄轨铁路，与南北向的京汉铁路在石家庄交会。两股铁轨把一个小村庄，拉成了华北重镇。' },
      { q: ['老火车站', '车站'], a: '石家庄老火车站位于中山路南侧，法式风格的站房曾是全城最高的建筑之一。绿皮车时代，站前广场永远挤满扛编织袋的人。' }
    ]
  },
  enamel: {
    id: 'enamel', city: 'shijiazhuang',
    name: '药厂搪瓷缸子', en: 'ENAMEL MUG · 1969',
    emoji: '🍶', era: '1969年', hue: 210,
    story: '印着"华北制药厂"五个红字的搪瓷缸，是当年让全厂羡慕的奖品。1958年建成的华北制药厂，结束了中国人青霉素依赖进口的历史。缸子边磕出的每一块黑疤，都记着车间里一个熬红眼的夜班。',
    facts: [
      { q: ['来历', '谁的', '什么东西'], a: '这是华北制药厂的先进生产者奖品。华北制药1953年筹建、1958年投产，是新中国"一五"计划重点项目，让老百姓第一次用上了国产青霉素。' },
      { q: ['华北制药', '药厂', '青霉素'], a: '华北制药厂位于石家庄和平路旁，是新中国抗生素工业的摇篮。投产当年即产出第一批青霉素，从此"一针难求"的进口药走进了寻常人家。' },
      { q: ['搪瓷', '缸子'], a: '搪瓷缸是上世纪五六十年代的"国民水杯"，耐磕耐摔，上面印字的多是单位奖励。谁家柜子里没一两个磕了瓷、印着红字的老缸子呢？' }
    ]
  },
  clock78: {
    id: 'clock78', city: 'shijiazhuang',
    name: '中山路老座钟', en: 'OLD CLOCK · 1978',
    emoji: '⏰', era: '1978年', hue: 260,
    story: '1978年，它是结婚时最气派的陪嫁。摆在五斗柜正中央，七天上一回弦，整点报时全楼都听得见。孩子上学、大人上工，都听它招呼。钟摆晃啊晃，晃过了改革开放头一年的春天。',
    facts: [
      { q: ['来历', '谁的', '什么东西'], a: '这是七十年代末石家庄人家里的机械座钟，当年结婚讲究"三转一响"——自行车、缝纫机、手表加收音机，再摆上一座钟，日子就算齐整了。' },
      { q: ['三转一响', '结婚', '嫁妆'], a: '"三转一响"是六七十年代的结婚标配：自行车、缝纫机、手表会转，收音机会响。在石家庄，凭票还得排队半年才买得上。' },
      { q: ['中山路', '商业', '商场'], a: '中山路是石家庄的老商业街，从解放路商场到人民商场，钟表店里玻璃柜台里的座钟挂钟，是当年最金贵的摆设。' }
    ]
  },
  spindle: {
    id: 'spindle', city: 'shijiazhuang',
    name: '国棉厂纱锭', en: 'COTTON SPINDLE · 1985',
    emoji: '🧵', era: '1985年', hue: 330,
    story: '纱锭一转，半个石家庄都听得见。五六十年代起，国棉一厂到四厂沿着和平路一字排开，几万名纺织女工三班倒，"纺城"的名号叫响了全国。这枚纱锭上的白絮，是1985年最后一个夜班留下的。',
    facts: [
      { q: ['来历', '谁的', '什么东西'], a: '这是石家庄国棉厂的细纱机纱锭。石家庄曾是国家重要的纺织工业基地，国棉一厂1954年建成投产，此后二厂、三厂、四厂陆续建起，纺织女工一度占全市产业工人近半数。' },
      { q: ['国棉厂', '纺织', '纺织厂'], a: '"纺织城"是石家庄的另一张名片。鼎盛时期几大棉纺厂自办食堂、子弟学校、医院，一座厂就是一个小社会。90年代后期转型，厂房如今改成了文创园。' },
      { q: ['女工', '工人'], a: '当年进棉纺厂是要考试的：手眼要快，接线头要稳。三班倒的纺织女工戴着白帽子白口罩，车间里棉絮飞舞像下雪，"全国劳动模范"里从不缺她们的名字。' }
    ]
  },

  doorPlate: {
    id: 'doorPlate', city: 'shijiazhuang',
    name: '石门老门牌', en: 'SHIMEN DOOR PLATE · 1935',
    emoji: '🚪', era: '1935年', hue: 205,
    story: '1935年，石家庄还叫石门。蓝底白字的搪瓷门牌钉在院门上，一条街的家户买卖、婚丧嫁娶都从这块牌子底下过。1947年石门解放，城名改作石家庄，旧门牌卸下来，被有心人收进了抽屉，一收就是一辈子。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '这是"石门"时代的搪瓷门牌。1925年石家庄建市，与休门合并各取一字称"石门市"；1947年解放后才改称石家庄。' },
      { q: ['石门', '名字'], a: '"石门"由石家庄与休门两个村子各取一字而来。老石家庄人至今还习惯把老城区叫"石门"，老照片里的招牌、车票上印的都是这两个字。' },
      { q: ['改名', '石家庄'], a: '1947年11月12日石家庄解放，次年正式定名石家庄市。"石门"从此留在门牌、票据和老辈人的称呼里。' }
    ]
  },
  bridgePass: {
    id: 'bridgePass', city: 'shijiazhuang',
    name: '赵州桥游览券', en: 'ZHAOZHOU BRIDGE PASS · 1962',
    emoji: '🌉', era: '1962年', hue: 195,
    story: '1962年，花两毛钱买一张游览券，跨过洨河就能看到1400岁的赵州桥。隋代匠人李春造的敞肩石拱，比欧洲同类桥早了几百年。老人们说桥面上的车辙沟是柴王爷推车压的——传说归传说，脚底下的石头，是真的千年。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '这是上世纪六十年代赵州桥的游览券。赵州桥又名安济桥，就在石家庄赵县的洨河上，是辖区里最古老的国宝。' },
      { q: ['赵州桥', '李春', '安济桥'], a: '赵州桥由隋代匠师李春设计建造，是世界现存最古老的敞肩石拱桥，距今一千四百多年。' },
      { q: ['传说', '柴王爷', '小放牛'], a: '河北民歌《小放牛》唱道：赵州桥是鲁班爷修，张果老倒骑驴、柴王爷推车从桥上过，留下了驴蹄印和车辙沟。' }
    ]
  },
  jingxingCup: {
    id: 'jingxingCup', city: 'shijiazhuang',
    name: '井陉窑白瓷盏', en: 'JINGXING WARE CUP',
    emoji: '🏺', era: '金代', hue: 40,
    story: '金代井陉窑的匠人，把太行山的瓷土烧成了这只白瓷盏，印花纹理细得像水波。井陉窑藏在太行山深处，鼎盛时窑火连绵数十里，盏沿一处小小的磕口，是七八百年前谁家喝茶时不小心碰的。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '这是井陉窑烧制的白瓷盏。井陉窑位于石家庄井陉县，隋代创烧、金代鼎盛，窑址是全国重点文物保护单位。' },
      { q: ['井陉窑', '特点', '瓷器'], a: '井陉窑以白瓷与印花装饰著称，戳印填彩技法独树一帜，产品多为民间日用的碗盏盘碟。' },
      { q: ['地位', '名窑'], a: '井陉窑与定窑、磁州窑等并称河北古窑；井陉关又是太行八陉之一，烧瓷的瓷土与柴薪都得天独厚。' }
    ]
  },
  shimenExtra: {
    id: 'shimenExtra', city: 'shijiazhuang',
    name: '石门解放号外', en: 'SHIMEN EXTRA · 1947',
    emoji: '📰', era: '1947年', hue: 0,
    story: '1947年11月12日夜里，石门解放的号外印出来了，油墨还没干透就被抢空。这座解放军攻克的第一座设防坚固的大城市，第二天换了名字的路牌。报童攥着最后一张号外跑过街口，身后的城市，从这一夜起叫石家庄。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '1947年11月12日石家庄（时名石门）解放，号外是报纸为重大突发新闻临时加印的特刊。' },
      { q: ['意义', '第一座'], a: '石家庄是解放战争中人民解放军攻克的第一座设防坚固的较大城市，把晋察冀和晋冀鲁豫两大解放区连成了一片。' },
      { q: ['华北人民政府'], a: '石家庄解放不到一年，1948年9月华北人民政府在此成立，这座城市一度是华北的政治中心。' }
    ]
  },

  /* ============ 正定 ============ */
  brick86: {
    id: 'brick86', city: 'zhengding',
    name: '荣国府砖雕', en: 'BRICK CARVING · 1986',
    emoji: '🧱', era: '1986年', hue: 26,
    story: '1986年，为拍电视剧《红楼梦》，荣国府在正定落成。一块"黛玉葬花"砖雕被砌进了垂花门旁。大观园里的人来了又走，砖雕留在原地，看游客的笑脸一茬又一茬，看了将近四十年。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '这是荣国府建筑的青砖砖雕。1986年正定为拍摄87版《红楼梦》修建荣国府，一比一还原清代王府宅邸，从此"一座府带火一座城"，开创了中国人文旅游的先河。' },
      { q: ['荣国府', '红楼梦'], a: '荣国府位于正定县城，1986年建成，是87版《红楼梦》的主要取景地。当年剧组离开后，这里成为永久景区，旅游收入让正定早早尝到了文化的甜头。' },
      { q: ['砖雕', '工艺'], a: '砖雕要经过选土、制坯、阴干、烧制，再由匠人一刀一刀"镀铬"般凿出人物花鸟。荣国府的影壁、垂花门上，至今能看到细如发丝的刻线。' }
    ]
  },
  warDrum: {
    id: 'warDrum', city: 'zhengding',
    name: '常山战鼓鼓槌', en: 'WAR DRUM BEATER',
    emoji: '🥁', era: '祖辈相传', hue: 356,
    story: '鼓槌磨得发亮，是爷爷的爷爷传下来的。常山战鼓起于战国，兴于宋元，鼓点密如骤雨，据说当年赵子龙的兵马出征，就擂这样的鼓。如今正定的庙会上，几十面大鼓一齐擂响，地皮都在颤。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '这是常山战鼓的枣木鼓槌。常山战鼓是国家级非物质文化遗产，与太原锣鼓、陕西安塞腰鼓齐名，鼓点套路有"翻江倒海""群马奔腾"等上百种。' },
      { q: ['常山', '赵云', '赵子龙'], a: '"吾乃常山赵子龙也！"正定是三国名将赵云的故里，古称常山郡、真定。城里的赵云庙、常山战鼓，都是这位"一身是胆"将军留给家乡的回声。' },
      { q: ['战鼓', '鼓', '表演'], a: '常山战鼓由鼓、钹、锣等合奏，鼓手边击边舞，气势磅礴。每逢节庆，正定城鼓声连片，最远的鼓声据说能传到滹沱河对岸。' }
    ]
  },
  foodBox: {
    id: 'foodBox', city: 'zhengding',
    name: '八大碗老食盒', en: 'OLD FOOD BOX',
    emoji: '🍱', era: '祖辈相传', hue: 120,
    story: '提梁磨得温润，樟木的香气还在。正定八大碗——四荤四素，逢娶亲待客，后厨把方肉、丸子、豆腐装进八只海碗，摞进这样的食盒，一路提着穿过街巷。开席时掀开盖，热气糊了半张脸。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '这是装八大碗的提梁食盒。正定八大碗是河北省非物质文化遗产，四荤：方肉、酥肉、扣肘、肉丸子；四素：豆腐、海带、粉条和时蔬，讲究"碗碗见功夫"。' },
      { q: ['八大碗', '吃的', '美食', '菜'], a: '八大碗是正定待客的最高礼数，先炸后蒸，肉烂汤醇。相传从宋代流传至今，红白喜事、年节家宴，桌上没有八大碗，主人会觉得脸上无光。' },
      { q: ['食盒', '木头'], a: '老食盒多用樟木或柏木，分层带提梁，既保温又防虫。走亲戚送年饭，全靠它提着，一路上香气从缝里往外钻。' }
    ]
  },
  bell: {
    id: 'bell', city: 'zhengding',
    name: '隆兴寺祈福铜铃', en: 'TEMPLE BELL',
    emoji: '🎐', era: '隋寺遗音', hue: 45,
    story: '大悲阁的檐角挂着几十只铜铃，风一过，叮当声能落满一整个院子。隆兴寺始建于隋开皇六年，寺里21.3米的千手观音立了一千多年。老人们说，铃响一声，是一句心愿被听见了。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '这是隆兴寺檐角的祈福铜铃。隆兴寺始建于隋开皇六年（586年），初名龙藏寺，康熙年间赐额"隆兴"，是国内现存时代较早、规模保存完整的佛教寺院之一。' },
      { q: ['隆兴寺', '大佛', '观音'], a: '隆兴寺大悲阁内的铜铸千手千眼观音菩萨立像高21.3米，铸造于北宋开宝四年，是我国现存最高大的古代铜铸佛教造像，梁思成称之为"京外名刹之首"。' },
      { q: ['梁思成', '古建', '建筑'], a: '1933年梁思成到正定调查古建筑，摩尼殿、转轮藏、倒座观音都让他惊叹。他绘制的实测图，让正定古建在学界名扬中外。' }
    ]
  },
  surveyMap: {
    id: 'surveyMap', city: 'zhengding',
    name: '梁思成测绘图', en: 'LIANG SURVEY DRAWING · 1933',
    emoji: '📐', era: '1933年', hue: 200,
    story: '1933年，梁思成背着测绘仪器住进隆兴寺，把摩尼殿的每一根梁架画进图纸。这支画笔在后来的许多劫难里救下了古建。这张晒蓝图纸是当年的复刻样，摊开来，宋代建筑的斗拱还在纸上严丝合缝地站着。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '1933年梁思成先生到正定调查古建筑，历时月余绘制大量实测图，《正定调查纪略》是古建研究的经典文献。' },
      { q: ['摩尼殿'], a: '隆兴寺摩尼殿建于北宋，四面抱厦的形制存世罕见，被梁思成赞为艺臻极品。' },
      { q: ['意义', '梁思成'], a: '正定是营造学社古建调查的重要一站，正定古建从此名扬学界，梁先生与正定结缘传为佳话。' }
    ]
  },
  bixiStone: {
    id: 'bixiStone', city: 'zhengding',
    name: '开元寺赑屃拓片', en: 'BIXI RUBBING',
    emoji: '🪨', era: '五代', hue: 30,
    story: '2000年，正定府前街挖出了一只巨大的赑屃——五代遗物，体量全国罕见，如今卧在开元寺里。拓片匠人拿宣纸墨包，把残碑文字一寸寸拓下来。石头会风化，纸上的字不会，每一道墨痕都是一千年前刻下去的力气。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '2000年正定府前街出土五代时期巨型赑屃，体量居全国同类之首，现陈列于开元寺。' },
      { q: ['赑屃'], a: '赑屃是传说中龙之九子之一，善于驮负重物，所以常被雕成碑座石兽。' },
      { q: ['拓片', '怎么做的'], a: '拓片是把碑刻文字转印到宣纸上的传统技艺：上纸、捶入、上墨，碑上的字便一分不差地"走"到纸上。' }
    ]
  },
  gongmianBox: {
    id: 'gongmianBox', city: 'zhengding',
    name: '正定贡面木匣', en: 'GONGMIAN NOODLE BOX',
    emoji: '🍜', era: '清代', hue: 28,
    story: '正定贡面细得能穿针，空心能吹响。相传明代就进了贡单，木匣一提，走亲访友最有面子。一口锅里下不了多少，汤要清、面要立，挑起来像一挂银丝。老手艺人和面要看天，天阴天晴，水都得兑着调。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '正定贡面（挂面）是正定传统名产，相传明代曾进贡宫廷，"贡面"之名由此而来。' },
      { q: ['手艺', '做法'], a: '和面、盘条、上杆、拉伸、晾晒全凭手工，做出的面细如发丝、久煮不烂。' },
      { q: ['讲究', '怎么吃'], a: '贡面空心细韧，煮时汤清面立，是正定人逢年过节走亲访友的体面礼物。' }
    ]
  },
  linjiBook: {
    id: 'linjiBook', city: 'zhengding',
    name: '《临济录》线装书', en: 'LINJI RECORD BOOK',
    emoji: '📕', era: '清刻本', hue: 255,
    story: '临济寺是禅宗临济宗的祖庭，唐代的义玄禅师在这里接引学人，喝断迷障。《临济录》记下的每一句棒喝，都被后来的读书人刻进了木板。这本清刻线装书翻开来，千年前的机锋，还带着墨香。',
    facts: [
      { q: ['来历', '怎么来的', '什么东西'], a: '临济寺始建于东魏，唐代义玄禅师在此创立临济宗，是禅宗影响最大一支的祖庭。' },
      { q: ['临济录'], a: '《临济录》全称《镇州临济慧照禅师语录》，记录义玄禅师言行，是禅宗核心典籍之一。' },
      { q: ['影响'], a: '临济宗后来远传日本等地，"临济子孙"遍布天下，正定也因此成为禅宗寻根之地。' }
    ]
  }
};

/* ---------- 城市级通用问答 ---------- */
var CITY_QA = {
  shijiazhuang: [
    { q: ['石家庄', '城市', '介绍'], a: '石家庄是河北省会，人称"火车拉来的城市"：1907年正太铁路与京汉铁路在此交会，小村庄几十年间长成华北重镇。纺织、制药曾是它的名片，如今老厂房变成了文创园。' },
    { q: ['好玩', '景点', '去哪'], a: '可以去看正太广场旁的老火车站大钟楼、华北制药厂旧址，再坐二十分钟高铁去正定逛隆兴寺和荣国府——老石家庄的周末，常常是这么过的。' },
    { q: ['还有哪些老物件', '别的物件', '其他'], a: '这座城市藏着不少记忆：老火车站的硬板车票、华北制药的搪瓷缸、七十年代的座钟、国棉厂的纱锭……抓几次盲盒，把它们一件件收进图鉴吧。' }
  ],
  zhengding: [
    { q: ['正定', '城市', '介绍'], a: '正定是国家历史文化名城，古称常山、真定，是赵子龙故里。隋寺、唐钟、宋殿、明城在这里"九朝不断代"，梁思成称它是"古建艺术的宝库"。' },
    { q: ['好玩', '景点', '去哪'], a: '隆兴寺的千手观音、荣国府的红楼布景、古城墙的日落，再加上一碗热腾腾的八大碗——从石家庄坐公交半小时就到，值得住一晚。' },
    { q: ['还有哪些老物件', '别的物件', '其他'], a: '正定的记忆可多了：荣国府的砖雕、常山战鼓的鼓槌、八大碗的提梁食盒、隆兴寺檐角的铜铃……集齐四件，还有隐藏故事等你解锁。' }
  ]
};

/* ---------- 默认兜底回答（多轮对话轮换使用） ---------- */
var AI_FALLBACK = [
  '这个问题有意思。就这件老物件本身，我知道的都写在故事里了——你也可以问我它的来历、年代，或者这座城市的旧事。',
  '嗯……让我翻翻记忆里的资料。要不要换个问法？比如"它的来历""相关的历史"，我答起来会更有依据。',
  '我的知识库主要装着这两座城市的旧时光。想听故事里的细节，或者问点城市历史，我都能给你讲得有鼻子有眼。'
];

/* ============================================================
   AI 智能体
   - js/ai-config.js 里配置了 DeepSeek apiKey → 调用真实大模型
     （知识库资料作为上下文注入，相当于轻量 RAG）
   - 未配置 / 断网 / 接口报错 → 自动回退本地知识库匹配，演示不中断
   ============================================================ */
var AI = (function(){
  var fallbackIdx = 0;
  var warned = false;

  function enabled(){
    return typeof AI_CONFIG !== 'undefined' && !!(AI_CONFIG.apiKey && AI_CONFIG.apiKey.trim());
  }

  /* 组装知识库上下文（物件资料 + 城市资料），相当于喂给大模型的 RAG 资料 */
  function knowledge(itemId){
    var item = ITEM_DATA[itemId];
    if(!item) return '';
    var city = CITY_DATA[item.city];
    var lines = [];
    lines.push('【物件】' + item.name + '（' + item.era + '，' + city.name + '）');
    lines.push('【参考故事】' + item.story);
    item.facts.forEach(function(f){ lines.push('【物件知识】' + f.a); });
    (CITY_QA[city.id] || []).forEach(function(f){ lines.push('【城市知识】' + f.a); });
    return lines.join('\n');
  }

  function sysPrompt(){
    return '你是「拾城讲述人」，为网页应用「拾城记」的用户讲述中国城市老物件背后的故事。' +
      '规则：1) 优先依据【知识库资料】回答，不编造具体史实，资料不足时用可靠的常识补充，语气留有余地；' +
      '2) 口吻像健谈的老街坊，亲切、有画面感；3) 单次回答不超过120字；' +
      '4) 只聊城市历史、老物件、民俗文化相关话题，用户跑题时礼貌拉回；5) 直接输出正文，不要标题、不要自我介绍。';
  }

  function chatCall(messages){
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function(){ ctrl.abort(); }, 25000) : null;
    return fetch((AI_CONFIG.baseUrl || 'https://api.deepseek.com') + '/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AI_CONFIG.apiKey
      },
      body: JSON.stringify({
        model: AI_CONFIG.model || 'deepseek-chat',
        messages: messages,
        temperature: 0.9,
        max_tokens: 500
      }),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function(r){
      if(!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function(d){
      if(timer) clearTimeout(timer);
      var txt = d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
      if(!txt) throw new Error('empty response');
      return String(txt).trim();
    }, function(e){
      if(timer) clearTimeout(timer);
      throw e;
    });
  }

  function warnFallback(){
    if(warned || !enabled()) return;
    warned = true;
    if(window.toast) toast('AI 接口暂时连不上，已切换本地知识库模式');
  }

  /* ---------- 本地知识库兜底（关键词匹配） ---------- */
  function pickLocal(itemId, question){
    var item = ITEM_DATA[itemId];
    var pool = [];
    if(item){
      item.facts.forEach(function(f){ pool = pool.concat(f); });
      pool.push({
        q: ['还有哪些老物件', '别的物件', '其他物件'],
        a: '这座城市的老物件还有好几件呢：' + CITY_DATA[item.city].items
            .map(function(id){ return '「' + ITEM_DATA[id].name + '」'; }).join('、') +
           '。集齐全城四件，还能解锁一段隐藏故事。'
      });
      var cityQa = CITY_QA[CITY_DATA[item.city].id] || [];
      cityQa.forEach(function(f){ pool = pool.concat(f); });
    }
    var q = (question || '').trim();
    var best = null, bestScore = 0;
    pool.forEach(function(f){
      var score = 0;
      f.q.forEach(function(kw){ if(q.indexOf(kw) >= 0) score += kw.length; });
      if(score > bestScore){ bestScore = score; best = f; }
    });
    if(best && bestScore > 0) return best.a;
    var ans = AI_FALLBACK[fallbackIdx % AI_FALLBACK.length];
    fallbackIdx++;
    return ans;
  }

  return {
    enabled: enabled,
    /* 首次故事：配置了 Key 时由大模型按知识库生成（会话内缓存一次），否则用本地故事 */
    story: function(itemId){
      var item = ITEM_DATA[itemId];
      var local = item ? item.story : '这件物件的记忆还在整理中……';
      if(!enabled() || !item) return Promise.resolve(local);
      var cached = null;
      try{ cached = sessionStorage.getItem('cmb_aistory_' + itemId); }catch(e){}
      if(cached) return Promise.resolve(cached);
      return chatCall([
        { role: 'system', content: sysPrompt() },
        { role: 'user', content: '请依据下面资料，为这件老物件写一段80字左右的拾城记故事：第一句带年代感，结尾留一点余味。直接输出正文。\n\n' + knowledge(itemId) }
      ]).then(function(txt){
        try{ sessionStorage.setItem('cmb_aistory_' + itemId, txt); }catch(e){}
        return txt;
      }).catch(function(){ warnFallback(); return local; });
    },
    /* 多轮对话：带历史消息调用大模型；失败回退本地匹配 */
    reply: function(itemId, question, history){
      var q = (question || '').trim();
      if(!enabled()){
        return new Promise(function(resolve){
          setTimeout(function(){ resolve(pickLocal(itemId, q)); }, 500 + Math.min(1200, q.length * 20) + Math.random() * 400);
        });
      }
      var msgs = [{ role: 'system', content: sysPrompt() }];
      (history || []).slice(-10).forEach(function(m){
        if(m && m.role && m.content) msgs.push({ role: m.role, content: m.content });
      });
      msgs.push({ role: 'user', content: '【知识库资料】\n' + knowledge(itemId) + '\n\n【用户提问】' + q });
      return chatCall(msgs).catch(function(){ warnFallback(); return pickLocal(itemId, q); });
    }
  };
})();

window.CITY_DATA = CITY_DATA;
window.ITEM_DATA = ITEM_DATA;
window.AI = AI;
