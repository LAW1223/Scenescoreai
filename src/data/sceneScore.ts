export type SceneWork = {
  id: string
  index: string
  year: string
  title: string
  director: string
  type: string
  status: string
  accent: 'red' | 'blue' | 'gold' | 'green' | 'violet'
  note: string
  image: string
  video: string
}

export const works: SceneWork[] = [
  {
    id: 'sample-film-a',
    index: '01',
    year: '2026',
    title: 'SAMPLE FILM A',
    director: 'Director name',
    type: 'Featured',
    status: 'Score pending',
    accent: 'red',
    note: 'A placeholder entry for the first public ranking release.',
    image: '/images/works/work-01.png',
    video: '/media/ranking/work-01.mp4',
  },
  {
    id: 'sample-film-b',
    index: '02',
    year: '2026',
    title: 'SAMPLE FILM B',
    director: 'Director name',
    type: 'Featured',
    status: 'Score pending',
    accent: 'blue',
    note: 'A visual language built around rhythm, atmosphere and restraint.',
    image: '/images/works/work-02.png',
    video: '/media/ranking/work-02.mp4',
  },
  {
    id: 'sample-film-c',
    index: '03',
    year: '2025',
    title: 'SAMPLE FILM C',
    director: 'Director name',
    type: 'Short Film',
    status: 'Score pending',
    accent: 'gold',
    note: 'A short-form scene awaiting its first verified jury read.',
    image: '/images/works/work-03.png',
    video: '/media/ranking/work-03.mp4',
  },
  {
    id: 'sample-film-d',
    index: '04',
    year: '2025',
    title: 'SAMPLE FILM D',
    director: 'Director name',
    type: 'Series',
    status: 'Score pending',
    accent: 'green',
    note: 'A series marker reserved for the next curation cycle.',
    image: '/images/works/work-04.png',
    video: '/media/ranking/work-04.mp4',
  },
  {
    id: 'sample-film-e',
    index: '05',
    year: '2025',
    title: 'SAMPLE FILM E',
    director: 'Director name',
    type: 'Featured',
    status: 'Score pending',
    accent: 'violet',
    note: 'The fifth entry in the current preview dataset.',
    image: '/images/works/work-05.png',
    video: '/media/ranking/work-05.mp4',
  },
]

export type Judge = {
  id: string
  name: string
  romanized: string
  role: string
  roleZhHant: string
  headline: string
  headlineZhHant: string
  image: string
  bio: string[]
  bioZhHant: string[]
}

export type JudgeProfileSection = {
  heading: string
  paragraphs: string[]
}

export const judges: Judge[] = [
  {
    id: 'paco-wong',
    name: '黃柏高',
    romanized: 'Paco Wong',
    role: 'Music Executive / Film Producer',
    roleZhHant: '音樂行政／電影監製',
    headline: 'The gold-record manager who crossed into film',
    headlineZhHant: '樂壇金牌經理人的電影跨界傳奇',
    image: '/images/judges/paco-wong.jpeg',
    bio: [
      'A defining Hong Kong music executive who helped shape generations of artists before bringing the same market instinct to film production',
      'His investments across dance films, thrillers and the SPL action franchise helped connect local talent with the wider Chinese-language screen market',
    ],
    bioZhHant: [
      '先後於華納唱片、正東唱片及金牌大風擔任要職，提攜多代歌手，令「多謝Paco」成為香港頒獎禮的經典名句',
      '其後由唱片跨足電影投資製作，推動《狂舞派》《殺破狼》系列及《貪狼》等作品，並持續發掘新一代動作演員',
    ],
  },
  {
    id: 'edmond-wong',
    name: '黃子桓',
    romanized: 'Edmond Wong',
    role: 'Screenwriter / Producer',
    roleZhHant: '編劇／監製',
    headline: 'A genre screenwriter carrying cinema craft forward',
    headlineZhHant: '承繼星輝的類型片編劇',
    image: '/images/judges/edmond-wong.jpeg',
    bio: [
      'A screenwriter and producer whose work on all four Ip Man films helped turn a martial-arts biography into a global genre landmark',
      'From the Breakout Brothers series to producing and founding Mandarin Motion Pictures, he brings an unusually complete view of story, production and market',
    ],
    bioZhHant: [
      '由幕後花絮、剪接及片頭設計做起，並自2008年起參與《葉問》系列全四部電影的編劇工作',
      '其後跨足監製並成立東方影業，作品橫跨動作、喜劇與時裝類型，以完整製片視野延續香港商業電影的敘事力量',
    ],
  },
  {
    id: 'bennett-pang',
    name: '彭健新',
    romanized: 'Bennett Pang',
    role: 'Musician / Performer',
    roleZhHant: '音樂人／演員',
    headline: 'The Wynners’ lead guitarist and band anchor',
    headlineZhHant: '溫拿樂隊的靈魂主音結他手兼班長',
    image: '/images/judges/bennett-pang.jpeg',
    bio: [
      'The lead guitarist and organising force of The Wynners, a band whose music and screen presence have shaped Hong Kong popular culture for more than half a century',
      'His warm comic timing in films such as Second Class Citizens carries the optimism, humour and resilience of everyday people',
    ],
    bioZhHant: [
      '作為溫拿樂隊主音結他手及核心籌組人，以音樂、舞台默契與親和力陪伴香港流行文化逾半世紀',
      '從《二等良民》到多部溫拿電影，他以憨厚幽默的表演捕捉小人物的生命力，並持續把音樂創作帶進銀幕',
    ],
  },
  {
    id: 'ck-chan',
    name: '陳錦強',
    romanized: 'CK Chan',
    role: 'Photographer / Creative Director',
    roleZhHant: '攝影師／創意總監',
    headline: 'A recorder of light, character and time',
    headlineZhHant: '光影時間的紀錄者',
    image: '/images/judges/ck-chan.jpeg',
    bio: [
      'A photographer and creative director with more than fifteen years of experience, known for defining portraits for the Hong Kong Film Awards',
      'His practice favours the honest instant over spectacle, turning light, weather, place and personality into images with a quiet documentary pulse',
    ],
    bioZhHant: [
      '從事攝影工作逾十五年，現為Secret 9創意及攝影總監，並長年為香港電影金像獎候選者拍攝形象照',
      '他重視人物與當下時間、空間及天氣共同形成的真實瞬間，在商業攝影與影視造星文化之間建立獨特位置',
    ],
  },
  {
    id: 'chen-tai-lee',
    name: '陳大利',
    romanized: 'Chan Tai Lee',
    role: 'Director / Screenwriter',
    roleZhHant: '導演／編劇',
    headline: 'A local storyteller shaped by screenwriting',
    headlineZhHant: '由編劇到導演的港產本土說書人',
    image: '/images/judges/chen-tai-lee.jpeg',
    bio: [
      'A Hong Kong filmmaker whose two decades of screenwriting include the Ip Man films, The Way We Dance and major Chinese-language productions',
      'His directing work turns family relationships and the city’s lived reality into grounded stories while he continues to advocate for the craft and rights of screenwriters',
    ],
    bioZhHant: [
      '由新聞節目導演轉入電影編劇，參與《葉問》系列、《狂舞派》及《九龍城寨之圍城》等作品，累積逾二十年敘事經驗',
      '首部導演作品《黃金花》以細膩家庭關係連結香港城市處境，並延續以本土視角書寫人物韌性的創作方向',
    ],
  },
]

export const judgeProfilesZhHant: Record<string, JudgeProfileSection[]> = {
  'paco-wong': [
    {
      heading: '黃柏高先生 | 樂壇金牌經理人的電影跨界傳奇',
      paragraphs: [
        '黃柏高先生（Paco Wong），先後在華納唱片、正東唱片及金牌大風等公司出任要職，一手提攜陳百強、林子祥、葉倩文、鄭秀文、許志安、楊千嬅、古巨基、鄧麗欣等多位歌手，令「多謝Paco」成為香港頒獎禮上的經典名句，故有「金牌經理人」之稱。2012年，他加盟太陽娛樂文化出任董事總經理直到2020年，正式將事業版圖由唱片跨足至電影投資製作，展現他點石成金的市場眼光',
      ],
    },
    {
      heading: '從《殺破狼》到吳京、張晉的星途推手',
      paragraphs: [
        '黃柏高在太陽娛樂任內大力投資超過十部電影，包括《狂舞派》《逃出生天》《賭城風雲》《掃毒》等，其中最具代表性的是主導投資《殺破狼》系列及《貪狼》等硬派動作大片，成功打造叫好叫座的口碑。他更是吳京走紅的關鍵推手，吳京當年憑《殺破狼》獲Paco力薦入行，其後在《殺破狼II》發布會上公開感激「特別感謝當年Paco一手提攜」，該片內地票房逾5.6億元，讓吳京與張晉一同躋身動作片一線男星之列',
      ],
    },
    {
      heading: '大病後未忘初心的電影夢',
      paragraphs: [
        '2020年太陽娛樂減產裁員後，Paco一度因病休假並淡出幕前。年過七十後，他創立新公司「天狼星影業娛樂」重新出發，並在2025年公開表示仍有目標未完成，包括推動動作電影發展及發掘新一代動作演員。從樂壇金牌經理人到電影監製，黃柏高橫跨音樂與影視兩大產業逾半世紀，始終以精準的市場直覺，成為聯繫香港藝人與華語娛樂市場的重要橋樑',
      ],
    },
  ],
  'edmond-wong': [
    {
      heading: '黃子桓導演 | 承繼星輝的類型片編劇',
      paragraphs: [
        '黃子桓先生（Edmond Wong），畢業於加拿大麥基爾大學社會科學系主修經濟學，出身電影世家卻選擇由編劇一職低調入行。他早在留學期間已完成首部劇本《終極格鬥》，2002年正式踏入電影圈，從幕後花絮、剪接、片頭設計做起，一步步磨練出全面的製片視野',
      ],
    },
    {
      heading: '執筆《葉問》系列的幕後功臣',
      paragraphs: [
        '黃子桓最為人稱道的成就，是自2008年起參與《葉問》系列全四部電影的編劇工作，將真實武術宗師的故事轉化為風靡全球的商業類型片範本，並延伸出《葉問外傳：張天志》系列，展現他刻劃武打人物細膩見長的編劇特色。他亦擅長操刀系列電影，例如自2020年起連續三集的《逃獄兄弟》，以及賀歲喜劇《家有囍事2020》，橫跨動作、喜劇、時裝多種類型，被視為香港影壇最多元化的編劇之一',
      ],
    },
    {
      heading: '由編劇到監製的雙軌發展',
      paragraphs: [
        '2018年，黃子桓首次跨足監製崗位，執掌《古宅》一片，並於同年成立東方影業，逐步從單純編劇轉型為集出品人、監製、編劇於一身的全能電影人。近年他參與甄子丹主演的《誤判》編劇工作，並監製陳大利執導的《拼命三郎》，持續在動作類型片領域深耕，其編劇成就亦獲第14屆澳門國際電影節金蓮花獎最佳編劇肯定，確立他在香港電影新世代編劇監製中的地位',
      ],
    },
  ],
  'bennett-pang': [
    {
      heading: '彭健新先生 | 溫拿樂隊的靈魂主音結他手兼班長',
      paragraphs: [
        '彭健新先生（Bennett Pang），是溫拿樂隊（The Wynners）的主音結他手，更是這支樂隊由「Loosers」過渡到「Wynners」時期的核心籌組人，隊內暱稱「健哥」「OK仔」，樂迷更視他為樂隊的精神支柱。溫拿五虎——譚詠麟、鍾鎮濤、彭健新、陳友及葉智強——自成軍以來屹立華語樂壇逾半世紀，1988年憑《千載不變》成為首隊獲頒「金針獎」的樂隊，並保持紅館開騷場數最多紀錄，於2023年正式舉行告別演唱會，為半世紀的樂隊生涯畫上圓滿句號',
      ],
    },
    {
      heading: '從歌壇跨足銀幕的親民笑匠',
      paragraphs: [
        '彭健新的影壇生涯與溫拿的成長緊密相連，早期在《大家樂》《溫拿與教授》及《追趕跑跳碰》等青春歌舞片中，以憨厚幽默的形象將樂隊的活力轉化為銀幕符號。1981年他主演《二等良民》，並親自演唱同名主題曲，歌詞「人生又似苦海裡浮沉」道盡基層市民自嘲又豁達的心境，成為他個人的代表作之一。他日後在《廣東五虎之鐵拳無敵孫中山》及《兄弟班》等作品中延續喜劇本色，前作更重聚全員溫拿成員，展現彼此間數十年不變的默契',
      ],
    },
    {
      heading: '音樂與演出並重的長青藝人及公益',
      paragraphs: [
        '除幕前演出，彭健新亦活躍於幕後創作，多年來獲頒多屆「十大勁歌金曲」及「十大中文金曲」獎項，包括與鍾鎮濤合唱的《一段情》及個人代表作《聲音》《可愛的笑容》，並持續投入公益活動如香港癌症基金會前列腺癌防範工作。從樂隊班長到銀幕笑匠，彭健新以音符與笑聲雙軌並行，成為香港流行文化中歷久不衰的親和面孔',
      ],
    },
  ],
  'ck-chan': [
    {
      heading: '陳錦強先生 | 光影時間的紀錄者',
      paragraphs: [
        '陳錦強先生（CK Chan）從事攝影工作逾十五年，早年隨攝影大師張文華習藝，並擔任其影樓的攝影及監製工作，打下扎實的商業攝影根基，現為Secret 9創意及攝影總監。他最廣為人知的成就，是連續多年獨力操刀香港電影金像獎頒獎典禮特刊的候選者形象照拍攝，帶領旗下攝影團隊配合每屆典禮主題，將影帝影后、新晉演員的星光魅力凝聚於鏡頭之下，成為香港電影界最具代表性的「造星攝影師」之一',
      ],
    },
    {
      heading: '從商業大片到私密婚照',
      paragraphs: [
        '除了電影圈的官方拍攝工作外，CK亦深受明星藝人信賴，親自為藝人熊黛林與丈夫郭可頌操刀婚紗照拍攝，以《葉問》系列為靈感的主題造型系列尤其令人印象深刻，展現他將商業攝影與人物故事結合的敘事能力。他亦跨界與國際品牌合作，例如為名士錶（Baume & Mercier）拍攝主題短片，透過鏡頭詮釋都市職人對時間流逝的感悟，將攝影從靜態肖像延伸至品牌敘事層面',
      ],
    },
    {
      heading: '捕捉當下而非刻意經營的攝影哲學',
      paragraphs: [
        '不同於強調技術炫技的攝影師，CK在專訪中坦言自己「沒有甚麼攝影理念」，只希望透過照片表達他與當下時間、空間、人物或天氣共同擁有的瞬間，這種返璞歸真的態度反而讓他擅於捕捉人物最自然的神態。從街拍愛好者到獲獎無數的專業攝影師，陳錦強憑藉對「時間與光影」的敏銳觸覺，在香港商業攝影與影視造星產業之間，建立起獨特而具份量的地位',
      ],
    },
  ],
  'chen-tai-lee': [
    {
      heading: '陳大利導演 | 由編劇到導演的港產本土說書人',
      paragraphs: [
        '陳大利先生（Chan Tai Lee）畢業於香港浸會大學傳理學院電影電視系，早年於電視台任職新聞節目導演，後轉投電影編劇之路，二十餘年來遊走香港與內地兩地，見證港產片幾番浪潮。他早期以編劇身份參與《葉問》系列、《狂舞派》及《西遊記之大鬧天宮》等作品的劇本創作，甚至曾擔任「劇本醫生」，專門為拍攝中的劇本執漏，練成一身扎實的敘事功底',
      ],
    },
    {
      heading: '由母子情到父子情的城市三部曲',
      paragraphs: [
        '2017年，陳大利首次執導個人作品《黃金花》，以一對母子的特殊照顧關係為軸心，細膩刻劃基層家庭的無奈與堅韌，此作為他帶來第37屆香港電影金像獎新晉導演提名，兩位主演毛舜筠及凌文龍更分別奪得最佳女主角及最佳新演員。他在構思階段即已規劃以「明天三部曲」延續《黃金花》英文名Tomorrow is Another Day的主題——2025年上映的《拼命三郎》正是第二部，將視角由母子關係轉向父子情感，由譚耀文與林家熙演繹跨代拼搏的江湖故事，把人物命運與香港這座城市的處境緊密扣連',
      ],
    },
    {
      heading: '編劇底蘊撐起導演視野',
      paragraphs: [
        '即使轉型執導，陳大利的編劇本行仍未間斷，近年參與《九龍城寨之圍城》及《鏢人：風起大漠》等大型製作的劇本工作，並曾憑劇本署名爭議事件公開呼籲業界完善編劇權利保障制度，展現他對電影行業生態的關注與思考。從電影系畢業的無名編劇，到憑《黃金花》一舉入圍金像獎新晉導演，再到親自為本土電影市場進行「社會實驗」式的宣發嘗試，陳大利以創作人兼市場觀察者的雙重視角，成為香港電影新一代講述本土故事的重要聲音',
      ],
    },
  ],
}

export const judgeProfilesEn: Record<string, JudgeProfileSection[]> = {
  'paco-wong': [
    {
      heading: 'Paco Wong | The gold-record manager who crossed into film',
      paragraphs: [
        'Paco Wong is one of Hong Kong’s defining music executives. After working with major record companies and helping shape the careers of artists across Cantopop, he became widely known as the “gold-record manager” whose instincts connected talent, audience and cultural timing',
        'In 2012 he joined Sun Entertainment Culture as managing director, later moving into film investment and production. His work across dance films, thrillers and the SPL action franchise helped local creators meet a wider Chinese-language screen market',
      ],
    },
    {
      heading: 'From record culture to screen culture',
      paragraphs: [
        'Wong’s producing and investment work has covered projects including SPL II: A Time for Consequences, Wolf Warrior and the SPL action series. The films reflect his interest in commercial energy without losing the personality of the people making them',
        'His perspective brings together artist development, audience instinct and production realities. That combination is central to the way he reads a scene: not only as an isolated image, but as a piece of culture with a life before and after the screen',
      ],
    },
    {
      heading: 'A wider field for Hong Kong cinema',
      paragraphs: [
        'After leaving Sun Entertainment in 2020, Wong continued to develop work across music and film. His experience gives the jury a rare view of how creative decisions travel from a performer’s first idea to a finished public work',
      ],
    },
  ],
  'edmond-wong': [
    {
      heading: 'Edmond Wong | A genre screenwriter carrying cinema craft forward',
      paragraphs: [
        'Edmond Wong is a screenwriter and producer whose work has helped define the modern Hong Kong action film. His writing on all four Ip Man films turned a martial-arts biography into a globally recognised genre landmark',
        'He entered the film industry in the early 2000s and developed a practice that moves comfortably between action, comedy and character-driven stories',
      ],
    },
    {
      heading: 'A complete view of story and production',
      paragraphs: [
        'From the Breakout Brothers series to producing Mandarin Motion Pictures, Wong has worked across development, writing and production. He understands how a screenplay becomes a performance, how an action sequence becomes rhythm and how a local story finds its audience',
        'His judgement is grounded in structure, but never separated from tone. He looks for the emotional logic beneath a genre surface and for the small decisions that make a familiar form feel alive again',
      ],
    },
    {
      heading: 'Writing for the next audience',
      paragraphs: [
        'Wong continues to develop stories that carry Hong Kong’s genre language forward while staying open to new production models and new audiences. His jury perspective connects craft, market awareness and the responsibility of representing a place through cinema',
      ],
    },
  ],
  'bennett-pang': [
    {
      heading: 'Bennett Pang | The Wynners’ lead guitarist and band anchor',
      paragraphs: [
        'Bennett Pang is the lead guitarist and organising force of The Wynners, a band whose music and screen presence have shaped Hong Kong popular culture for more than half a century. As a performer, he brings an instinct for timing, ensemble and the emotional temperature of a room',
        'His career has moved between concerts, recordings, television and film, giving him a direct understanding of how performance changes when it moves from a live audience to a camera',
      ],
    },
    {
      heading: 'A warm comic intelligence',
      paragraphs: [
        'Pang’s film appearances, including Second Class Citizens, carry a generous comic timing and an attentive eye for ordinary people. His work is built on warmth rather than spectacle, finding character in gesture, pause and the way a group responds to pressure',
        'That long view of popular culture makes him sensitive to whether a scene has a pulse that can travel beyond its immediate style',
      ],
    },
    {
      heading: 'The instinct of a performer',
      paragraphs: [
        'As a musician and organiser, Pang reads collaboration intuitively. He recognises when a scene is technically polished but emotionally distant, and when a simple choice has the power to make an audience feel included',
      ],
    },
  ],
  'ck-chan': [
    {
      heading: 'CK Chan | A recorder of light, character and time',
      paragraphs: [
        'CK Chan is a photographer and creative director with more than fifteen years of experience. His portraits for the Hong Kong Film Awards and his work with Secret 9 have made him known for images that hold onto personality rather than flatten it into a pose',
        'He treats photography as a meeting between light, weather, place and character. The result is often quiet and documentary in feeling, even when the image is carefully constructed',
      ],
    },
    {
      heading: 'Seeing beyond the official frame',
      paragraphs: [
        'Alongside film and portrait commissions, Chan has led campaigns and visual work for cultural and commercial clients including Baume & Mercier. Across those different contexts, he keeps returning to the same question: what is true about the person in front of the lens',
        'His practice values the honest instant over spectacle. He watches for the moment when a subject stops performing and a more precise image appears',
      ],
    },
    {
      heading: 'A quiet documentary pulse',
      paragraphs: [
        'Chan brings the jury a photographer’s attention to atmosphere and detail. He can read the relationship between a face, its surroundings and the time held inside a frame, making him especially alert to visual choices that carry emotional evidence',
      ],
    },
  ],
  'chen-tai-lee': [
    {
      heading: 'Chan Tai Lee | A local storyteller shaped by screenwriting',
      paragraphs: [
        'Chan Tai Lee is a Hong Kong filmmaker whose two decades of screenwriting include the Ip Man films, The Way We Dance and major Chinese-language productions. His work is rooted in the city’s lived reality and in the pressure that family, history and ambition place on ordinary people',
        'Before directing, he built his voice through scripts. That experience gives him a close understanding of character motivation, scene rhythm and the invisible architecture that allows a story to move',
      ],
    },
    {
      heading: 'From the family room to the city',
      paragraphs: [
        'His directing work includes Tomorrow Is Another Day and other stories centred on family relationships, social change and the complicated tenderness of home. He is interested in what people leave unsaid, and in the small choices through which a character reveals a whole life',
        'The result is a grounded form of Hong Kong storytelling: intimate in scale, but attentive to the larger city around it',
      ],
    },
    {
      heading: 'Protecting the work behind the screen',
      paragraphs: [
        'Beyond directing and writing, Chan continues to advocate for screenwriters and for the value of original local stories. His jury perspective brings together craft, cultural memory and a careful respect for the people whose work makes a scene possible',
      ],
    },
  ],
}

export const getWork = (id: string) => works.find((work) => work.id === id) ?? works[0]

export const getJudge = (id: string) => judges.find((judge) => judge.id === id)
