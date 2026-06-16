import { Attributes, Chapter } from "./types";

export const attributeLabels: Record<keyof Attributes, string> = {
  identity: "自我认同",
  resilience: "心理韧性",
  expression: "表达能力",
  curiosity: "探索欲",
  trust: "关系信任",
  awareness: "情绪觉察",
};

export const initialAttributes: Attributes = {
  identity: 42,
  resilience: 42,
  expression: 40,
  curiosity: 44,
  trust: 38,
  awareness: 45,
};

export const chapters: Chapter[] = [
  {
    id: "university",
    order: 1,
    title: "你的选择，自有答案",
    subtitle: "大学副本",
    theme: "未来不是一道单选题",
    intro:
      "你回到大三下的夜晚。屏幕上有保研通知、实习网申、留学攻略和秋招经验帖。那些看似关于前途的问题，其实都在问同一件事：我可不可以用自己的节奏往前走？",
    next: "teen",
    scenes: [
      {
        id: "u-baoyan",
        title: "保研名单公布前夜",
        time: "大学 · 大三",
        image: "/assets/dorm-night.png",
        emotion: ["不确定", "比较", "害怕落后"],
        narration: [
          "凌晨一点，宿舍只剩电脑屏幕亮着。",
          "学院群里有人说名单明天会贴出来，朋友圈已经有人开始感谢导师。",
          "你看着自己的绩点和排名，像看一张还没宣判的天气图。",
        ],
        worry:
          "如果这次没有上岸，我是不是就落后了？如果上岸了，我是不是也只是因为不敢选择别的路？",
        choices: [
          {
            id: "u1a",
            text: "继续争取，把材料再检查一遍",
            tag: "在不确定中行动",
            effects: { resilience: 8, awareness: 4, identity: 3 },
            outcome:
              "你把材料重新命名、备份、发送。事情没有因此变得确定，但你发现自己还能行动。焦虑没有消失，它只是从一团雾，变成了一张可以处理的清单。",
            letter:
              "你好，我是很多年后的你。那晚你没有等焦虑完全退去才开始做事。你一边害怕，一边把材料整理好。后来你会明白，很多重要的路都不是在笃定中开始的，而是在颤抖中往前走了一步。",
          },
          {
            id: "u1b",
            text: "准备备选方案：考研、实习、求职并行",
            tag: "多线并行",
            effects: { resilience: 6, curiosity: 6, awareness: 4 },
            outcome:
              "你打开一个新表格，写下 Plan B、Plan C、Plan D。它们不是失败的替代品，而是你为自己留出的呼吸空间。",
            letter:
              "你好，我是未来的你。谢谢你没有把人生押在一个名单上。你后来会知道，备用方案不是懦弱，而是一个人开始真正照顾自己。",
          },
          {
            id: "u1c",
            text: "承认自己不想保研，转向真正想试的方向",
            tag: "听见自己",
            effects: { identity: 9, curiosity: 7, expression: 3 },
            outcome:
              "你第一次把那句话说完整：我可能不想继续这个专业。说出来之后，世界没有塌，只是安静了一会儿，给你让出了一条新路。",
            letter:
              "你好，我是很多年后的你。那天你放下的不是机会，而是别人替你定义的稳妥。你没有立刻变得轻松，但你终于开始为自己选择。人生是旷野，不是轨道。",
          },
        ],
      },
      {
        id: "u-intern",
        title: "实习面试失败后的傍晚",
        time: "大学 · 招聘季",
        image: "/assets/dorm-night.png",
        emotion: ["挫败", "自我怀疑", "羡慕"],
        narration: [
          "面试官说今天就到这里。",
          "你关掉会议软件，发现室友刚好在晒新工牌。",
          "你把简历文件夹打开又关上，突然觉得自己像一份没有亮点的草稿。",
        ],
        worry: "如果我现在还没有好实习，是不是说明我不够优秀？",
        choices: [
          {
            id: "u2a",
            text: "复盘面试，把问题拆成下一次能练的动作",
            tag: "把焦虑变成行动",
            effects: { resilience: 8, awareness: 5, expression: 4 },
            outcome:
              "你写下面试里卡住的三个问题，给学长发消息约模拟面试。失败仍然刺痛，但它开始有了可学习的形状。",
            letter:
              "你好，我是未来的你。你后来得到的很多机会，都不是第一次就来的。那天你没有把拒绝翻译成否定，你把它翻译成下一次的准备。",
          },
          {
            id: "u2b",
            text: "先接受一份小公司的实习，进入真实职场",
            tag: "每一步都算数",
            effects: { resilience: 5, trust: 3, curiosity: 5 },
            outcome:
              "那家公司不大，工资也低，但你第一次看见会议、需求、修改和交付如何发生。它不光鲜，却真实。",
            letter:
              "你好，我是很多年后的你。不是只有大厂经历才叫经历。你在小地方学会的踏实、沟通和复盘，后来都悄悄帮过你。",
          },
          {
            id: "u2c",
            text: "暂停投递一天，承认自己真的累了",
            tag: "允许停顿",
            effects: { awareness: 8, identity: 4, trust: 2 },
            outcome:
              "你没有继续刷邮箱。你下楼买了一杯热饮，坐在路边看天慢慢暗下来。停顿不是放弃，是给系统降温。",
            letter:
              "你好，我是未来的你。谢谢你那天没有逼自己继续硬撑。你会发现，休息不是落后，恢复力也是竞争力的一部分。",
          },
        ],
      },
      {
        id: "u-abroad",
        title: "留学申请季的深夜",
        time: "大学 · 申请季",
        image: "/assets/dorm-night.png",
        emotion: ["不确定", "预算压力", "同龄人比较"],
        narration: [
          "图书馆快闭馆了，你还开着十几个学校官网。",
          "有人刷到了雅思 7.5，有人已经找好中介，而你连为什么想出去都说不完整。",
          "你盯着申请截止日期，突然不知道自己是在选择世界，还是在逃离现在。",
        ],
        worry:
          "如果我不出国，会不会少一条路？如果我出去了，却发现那也不是答案呢？",
        choices: [
          {
            id: "u3a",
            text: "继续申请，但把目标改成真正匹配自己的项目",
            tag: "适合比光环重要",
            effects: { identity: 6, curiosity: 5, awareness: 4 },
            outcome:
              "你删掉几个只是因为排名好才加入的项目，留下那些课程、预算和城市都更适合你的选择。列表变短了，心反而稳了一点。",
            letter:
              "你好，我是未来的你。你后来会知道，开阔不是由校名决定的。真正重要的是，你有没有在新的环境里继续长成自己。",
          },
          {
            id: "u3b",
            text: "给自己一年时间，先弄清楚为什么想走",
            tag: "允许暂停",
            effects: { awareness: 7, identity: 6, resilience: 2 },
            outcome:
              "你把截止日期从倒计时改成了观察期。这一年不是空白，而是你第一次把方向交回自己手里。",
            letter:
              "你好，我是未来的你。停顿不等于掉队。有些答案不是想出来的，是在真实生活里一步一步走出来的。",
          },
          {
            id: "u3c",
            text: "留下来，把资源投向实习和作品集",
            tag: "不跟风",
            effects: { identity: 7, resilience: 4, curiosity: 3 },
            outcome:
              "你关掉留学论坛，打开作品集文档。那一刻你仍然有点羡慕别人，但你开始把羡慕翻译成自己的行动。",
            letter:
              "你好，我是未来的你。没有选择那条看起来更体面的路，并不说明你胆小。你只是在学习辨认，哪一条路是真的属于你。",
          },
        ],
      },
      {
        id: "u-career",
        title: "秋招提前批开始了",
        time: "大学 · 求职前夜",
        image: "/assets/dorm-night.png",
        emotion: ["焦虑", "现实压力", "自我定位"],
        narration: [
          "宣讲会海报贴满了学院公告栏。",
          "班级群里有人分享笔试通知，也有人说考公更稳。",
          "你打开那份还没更新过的简历，光标停在自我评价那一栏。",
        ],
        worry:
          "我到底应该冲大厂、求稳定，还是先找一个能让我慢慢成长的地方？",
        choices: [
          {
            id: "u4a",
            text: "冲击大厂，但为自己保留生活边界",
            tag: "向前也照顾自己",
            effects: { resilience: 7, expression: 4, awareness: 4 },
            outcome:
              "你开始刷题、复盘、投递，也在日历里标出休息时间。你想赢，但不想把自己消耗成一张工牌。",
            letter:
              "你好，我是未来的你。成长很重要，边界也很重要。你后来会明白，真正长久的能力，是工作时不敷衍，休息时也不亏欠自己。",
          },
          {
            id: "u4b",
            text: "选择中小公司或体制内，优先稳定和生活",
            tag: "承认自己的节奏",
            effects: { identity: 5, trust: 3, awareness: 5 },
            outcome:
              "你没有跟风把所有简历投向最拥挤的地方。你开始研究城市、通勤、团队氛围和长期生活。",
            letter:
              "你好，我是未来的你。你不是不敢拼，只是开始认真问自己：我想过怎样的日子？这个问题值得被尊重。",
          },
          {
            id: "u4c",
            text: "先做项目和实习，延后给自己下定义",
            tag: "在实践中确认",
            effects: { curiosity: 7, resilience: 4, identity: 4 },
            outcome:
              "你不急着把自己归类成产品、运营、考公或读研。你先去做一个真实项目，让经验替焦虑说话。",
            letter:
              "你好，我是未来的你。你不需要在二十岁出头就把一生定义完。很多方向，是在试过以后才慢慢显影的。",
          },
        ],
      },
    ],
  },
  {
    id: "teen",
    order: 2,
    title: "那些还来得及的事",
    subtitle: "初高中副本",
    theme: "评价到来时，自己没有消失",
    intro:
      "你回到更早的走廊、饭桌和教室。那时世界第一次开始用成绩、排名和目光评价你。可在那些评价下面，还有一个正在形成的自己。",
    next: "childhood",
    scenes: [
      {
        id: "t-transfer",
        title: "那个坐在角落的学期",
        time: "初一 · 转学",
        image: "/assets/school-corridor.png",
        emotion: ["孤独", "渴望被接纳", "自我保护"],
        narration: [
          "你转学来这里已经三周。",
          "餐厅很吵，你端着托盘，知道哪些桌子属于哪些圈子。",
          "有人招手，也有人只是看着你。你的脚停了一下。",
        ],
        worry: "如果走过去被拒绝怎么办？如果一直这样下去，高中也会是一个人吗？",
        npc: {
          name: "小方",
          surface: "沉默，低头吃饭，偶尔抬眼看你。",
          inner: "她也一个人坐了很久。你坐下时，她心里松了一口气。",
        },
        choices: [
          {
            id: "t1a",
            text: "走向靠墙那桌，坐到同样一个人的女生对面",
            tag: "安静的连接",
            effects: { trust: 8, identity: 4, expression: 2 },
            outcome:
              "三分钟后，她推来一张纸巾。你们没有变成最热闹的朋友，但那学期你中午有了坐的地方。",
            letter:
              "你好，我是很多年后的你。你不需要让所有人注意到你，才算存在。一个人、一张纸巾、一个眼神，就足够了。",
          },
          {
            id: "t1b",
            text: "找最角落的空桌，用书撑住场面",
            tag: "保护自己",
            effects: { awareness: 6, resilience: 3, trust: -2 },
            outcome:
              "你读了一页，却一个字都没记住。那本书挡住了你的尴尬，也挡住了一点想被接纳的心。",
            letter:
              "你好，我是未来的你。你那时候不是没有勇气，只是还没学会一个人坐着也可以抬头。你后来学会了。",
          },
          {
            id: "t1c",
            text: "走向最热闹的桌子，问这里可以坐吗",
            tag: "试着靠近",
            effects: { expression: 6, curiosity: 4, identity: 3 },
            outcome:
              "他们让了位置，却没有真正让出话题。你有点失落，也第一次懂得：热闹不等于适合。",
            letter:
              "你好，我是未来的你。那顿不太成功的午饭，是你找路的第一步。后来你会找到不那么吵、但更像你的圈子。",
          },
        ],
      },
      {
        id: "t-score",
        title: "成绩单放在饭桌上的那晚",
        time: "初三 · 中考",
        image: "/assets/school-corridor.png",
        emotion: ["焦虑", "委屈", "等待审判"],
        narration: [
          "成绩单被压在饭碗下面。",
          "电视开着，没人在看。妈妈给你夹了一块鱼，也没有说话。",
          "这个沉默比任何批评都重。",
        ],
        worry: "他们会不会觉得我不够努力？如果我尽力了但结果不好，还会被理解吗？",
        choices: [
          {
            id: "t2a",
            text: "放下筷子，说想讲讲那段时间",
            tag: "不完美地开口",
            effects: { expression: 9, trust: 5, awareness: 4 },
            outcome:
              "你说得有点乱，但你说了。妈妈说她不是要你考第一，只是怕你以后走的路更难。",
            letter:
              "你好，我是未来的你。很多好的改变，都从一个不太完美的对话开始。你不完美地说了，她不完美地听了，这样就够了。",
          },
          {
            id: "t2b",
            text: "默默吃完，回房间锁上门",
            tag: "独自撑过",
            effects: { resilience: 6, awareness: 5, trust: -1 },
            outcome:
              "你靠着门坐下。你不是因为考砸才难过，而是觉得努力没有被看见。",
            letter:
              "你好，我是未来的你。那个夜晚教会你：你可以一个人待着，但你不需要永远一个人扛着。",
          },
          {
            id: "t2c",
            text: "多年后回家，重新问那晚他们在想什么",
            tag: "跨时间理解",
            effects: { identity: 7, trust: 6, awareness: 7 },
            outcome:
              "妈妈说，她那晚也不知道怎么安慰你。原来饭桌上孤独的不止你一个。",
            letter:
              "你好，我是未来的你。你终于明白，那年的沉默不是你做错了什么，而是你们都还不太会说话。",
          },
        ],
      },
      {
        id: "t-letter",
        title: "高二走廊里没写完的信",
        time: "高二 · 晚自习后",
        image: "/assets/school-corridor.png",
        emotion: ["期待", "恐惧", "时间紧迫"],
        narration: [
          "走廊的灯一排一排暗下去。",
          "TA 的背影朝出口走去，而你口袋里有一封没写完的信。",
          "你告诉自己等一个合适的时机，可今晚好像就是最后一个普通的夜晚。",
        ],
        worry:
          "如果我说了被拒绝怎么办？如果我不说，会不会一直记得这个没说出口的自己？",
        choices: [
          {
            id: "t3a",
            text: "叫住 TA，把信递出去",
            tag: "把心意给出去",
            effects: { expression: 8, resilience: 4, identity: 3 },
            outcome:
              "你的声音有点抖，但 TA 停下了。无论回应如何，你终于没有让那句话在心里腐烂。",
            letter:
              "你好，我是未来的你。你后来会遇到很多要不要说的时刻。那晚的你告诉我：表达不是为了保证结果，而是为了不把真实的自己一直藏起来。",
          },
          {
            id: "t3b",
            text: "把信留在口袋里，陪自己走完这段喜欢",
            tag: "温柔地收藏",
            effects: { awareness: 6, resilience: 3, expression: -1 },
            outcome:
              "你没有追上去。那封信后来被夹进一本书里，像青春里一片没有寄出的叶子。",
            letter:
              "你好，我是未来的你。没说出口不等于懦弱。有些喜欢的意义，不在于结果，而在于它让你第一次那么认真地看见另一个人，也看见自己。",
          },
          {
            id: "t3c",
            text: "先问自己：我想表达喜欢，还是害怕遗憾？",
            tag: "辨认真实需求",
            effects: { awareness: 8, identity: 4, expression: 2 },
            outcome:
              "你停在原地，第一次没有急着把心跳交给某个答案。你开始听见心意背后的愿望：我想被回应，也想被自己诚实对待。",
            letter:
              "你好，我是未来的你。那晚你没有急着审判自己。你学会了分辨，冲动、喜欢、遗憾和期待其实是不同的东西。",
          },
        ],
      },
    ],
  },
  {
    id: "childhood",
    order: 3,
    title: "最初的房间",
    subtitle: "童年副本",
    theme: "小时候的保护方式，长大后可以被温柔更新",
    intro:
      "你走进最初的房间。那里有试卷、画笔、操场边的位置，也有一个小小的你，正在学会怎样被爱、怎样表达、怎样保护自己。",
    scenes: [
      {
        id: "c-paper",
        title: "那张没有满分的试卷",
        time: "童年 · 晚饭后",
        image: "/assets/childhood-room.png",
        emotion: ["紧张", "怕失望", "想被认可"],
        narration: [
          "你把数学试卷放进书包最里面。",
          "它不是一张很差的试卷，但你知道大人也许会先看见错题。",
          "晚饭后，母亲问你：试卷发了吗？",
        ],
        worry: "如果我不是最优秀的，是不是就不值得被表扬？",
        choices: [
          {
            id: "c1a",
            text: "主动拿出试卷，告诉她自己知道错在哪里",
            tag: "犯错也可以面对",
            effects: { resilience: 6, expression: 5, identity: 4 },
            outcome:
              "你的手心有点出汗，但你把试卷递了出去。错误第一次不像怪物，而像可以一起看的题目。",
            letter:
              "你好，我是未来的你。你可以改正错误，但不必因为错误否定自己。分数从来不是判断一个人价值的唯一方式。",
          },
          {
            id: "c1b",
            text: "说试卷还没有发，先躲过今晚",
            tag: "回避换安全",
            effects: { awareness: 5, resilience: -1, trust: -2 },
            outcome:
              "你松了一口气。至少今晚不会挨批评。只是那张纸还在书包里，像一个没有关掉的声音。",
            letter:
              "你好，我是未来的你。我知道你不是故意撒谎，你只是太害怕被责备了。你可以从回避开始，但不必永远停在那里。",
          },
          {
            id: "c1c",
            text: "拿出试卷，但沉默观察她的脸色",
            tag: "敏感的观察者",
            effects: { awareness: 8, trust: -1, expression: -1 },
            outcome:
              "你像等待天气预报一样看着大人的表情。你因此变得细腻，也有一点累。",
            letter:
              "你好，我是未来的你。懂事不是错，敏感也不是错。只是你不必永远把自己放在最后。",
          },
        ],
      },
      {
        id: "c-brush",
        title: "那支被收起来的画笔",
        time: "童年 · 周末下午",
        image: "/assets/childhood-room.png",
        emotion: ["喜欢", "犹豫", "怕不懂事"],
        narration: [
          "你画了一片蓝色森林，树上长着星星。",
          "大人走过来说：画画可以当兴趣，但作业写完了吗？",
          "你看着那盒彩笔，忽然不知道该继续画，还是收起来。",
        ],
        worry: "如果喜欢的东西没有用，是不是就不值得花时间？",
        choices: [
          {
            id: "c2a",
            text: "放下画笔，先去写作业",
            tag: "把喜欢放轻",
            effects: { identity: -1, resilience: 3, curiosity: -2 },
            outcome:
              "你把画纸压在书下面。生活安全地回到轨道上，只是那片森林还没画完。",
            letter:
              "你好，我是未来的你。你不是不喜欢画画了，只是太早学会把有用放在喜欢前面。后来你会慢慢找回被收起来的东西。",
          },
          {
            id: "c2b",
            text: "继续画完这棵树，再去写作业",
            tag: "保护喜欢",
            effects: { curiosity: 8, identity: 5, resilience: 3 },
            outcome:
              "你给森林添上最后一点颜色。喜欢和责任第一次没有互相打架。",
            letter:
              "你好，我是未来的你。人生不是只能在喜欢和责任之间二选一。有时候，我们可以先把一棵树画完，再去面对作业本。",
          },
          {
            id: "c2c",
            text: "问大人能不能每周留一点时间画画",
            tag: "为自己留位置",
            effects: { expression: 7, identity: 6, trust: 3 },
            outcome:
              "你问得很小声，但那句话很重要。你不是在争一盒彩笔，而是在问自己的喜欢能否被认真对待。",
            letter:
              "你好，我是未来的你。你会一次次练习为自己留出一点位置。我想告诉你，我想要这三个字并不羞耻。",
          },
        ],
      },
      {
        id: "c-stage",
        title: "被选中的小朋友",
        time: "童年 · 讲故事比赛",
        image: "/assets/childhood-room.png",
        emotion: ["紧张", "期待被看见", "怕出错"],
        narration: [
          "老师希望你代表班级参加讲故事比赛。",
          "你有点害怕站上台，可心里又隐隐期待被大家看见。",
          "放学后，你把这件事告诉父母。一个说这是锻炼，另一个担心耽误功课。",
        ],
        worry:
          "如果我上台忘词怎么办？如果我喜欢这件事，但大人觉得它不重要怎么办？",
        choices: [
          {
            id: "c3a",
            text: "接受比赛，试着站上舞台",
            tag: "害怕也试试看",
            effects: { expression: 7, curiosity: 4, resilience: 4 },
            outcome:
              "比赛那天，你的声音有一点抖，但你讲完了整个故事。掌声不算很大，却真实地落在你身上。",
            letter:
              "你好，我是未来的你。勇敢不是一点都不害怕，而是害怕的时候，仍然愿意给自己一次机会。",
          },
          {
            id: "c3b",
            text: "拒绝比赛，把时间留给学习",
            tag: "选择安全",
            effects: { resilience: 3, curiosity: -1, expression: -2 },
            outcome:
              "生活回到原来的秩序，没有额外风险，也没有额外目光。你安全了，只是那个想被看见的自己安静了一点。",
            letter:
              "你好，我是未来的你。那一次没有上台，并不代表你胆小。人生里不止有一次讲故事比赛。晚一点，也没有关系。",
          },
          {
            id: "c3c",
            text: "答应老师，也请求父母每天陪你练十分钟",
            tag: "学会求助",
            effects: { trust: 7, expression: 5, resilience: 3 },
            outcome:
              "你没有假装自己不怕。你把害怕说出来，也把需要帮助说出来。",
            letter:
              "你好，我是未来的你。成熟不是永远一个人解决所有问题，而是知道什么时候可以把手伸出去。",
          },
        ],
      },
      {
        id: "c-playground",
        title: "操场边的位置",
        time: "童年 · 课间",
        image: "/assets/childhood-room.png",
        emotion: ["想加入", "怕被拒绝", "孤单"],
        narration: [
          "几个同学正在玩游戏，笑声离你很近。",
          "你站在操场边，手里捏着跳绳的一端。",
          "阳光很亮，可你忽然觉得自己像站在一扇没有打开的门外。",
        ],
        worry:
          "如果我主动过去，他们不理我怎么办？如果没有人选择我，是不是说明我不讨人喜欢？",
        choices: [
          {
            id: "c4a",
            text: "主动走过去，问能不能一起玩",
            tag: "主动靠近",
            effects: { trust: 5, expression: 6, resilience: 3 },
            outcome:
              "你问得不算大声，但已经足够让门开一条缝。有人欢迎你，也有人只是继续玩。你知道了靠近本来就带着不确定。",
            letter:
              "你好，我是未来的你。一次拒绝不等于你不值得被喜欢。它只是一次具体的互动结果，而你仍然可以继续寻找愿意为你留位置的人。",
          },
          {
            id: "c4b",
            text: "假装不在意，自己去角落看书",
            tag: "独处的外壳",
            effects: { awareness: 5, curiosity: 3, trust: -2 },
            outcome:
              "你看起来很安静，也很独立。只有你自己知道，刚才其实有一点想加入。",
            letter:
              "你好，我是未来的你。独处可以是自由，也可能是受伤后的保护。你可以喜欢一个人待着，也可以允许自己偶尔需要别人。",
          },
          {
            id: "c4c",
            text: "找熟悉的同学，请他带你加入",
            tag: "温和进入关系",
            effects: { trust: 7, expression: 4, awareness: 3 },
            outcome:
              "你没有一下子面对所有人的目光，而是牵住一个熟悉的入口。原来勇敢也可以很轻。",
            letter:
              "你好，我是未来的你。勇敢不只有一种样子。有人大步走向人群，也有人先牵住一只熟悉的手。这两种都很好。",
          },
        ],
      },
    ],
  },
];

export const chapterMap = Object.fromEntries(
  chapters.map((chapter) => [chapter.id, chapter]),
) as Record<string, Chapter>;
