const selectionVideoOssBaseUrl = 'https://scenescore-ai.oss-cn-hongkong.aliyuncs.com/20260826'

const selectionVideoObjectNames: Readonly<Record<string, string>> = {
  'official-selection-01': '《大唐噬魂令》-视频-01.mp4',
  'official-selection-02': '《槐灯》.mp4',
  'official-selection-03': '怪诞小镇.mp4',
  'official-selection-04': '《白狼》-视频-01.mp4',
  'official-selection-05': '《红靴子乐队》.mp4',
  'official-selection-06': '望归.mp4',
  'official-selection-07': '《青灯妖师》.mp4',
  'official-selection-08': '告密者.mp4',
  'official-selection-09': '气运系统：搬空全家去替嫁.mp4',
  'official-selection-10': '（乡村小术士）.mp4',
  'official-selection-11': '（真明珠闪耀，自带好运上上签）.mp4',
  'official-selection-12': '《全球求生——开局一座避难所》.mp4',
  'official-selection-13': '《雾港遗血》.mp4',
  'official-selection-14': '《天仙配前傳》.mp4',
  'official-selection-15': '（山野玫瑰终逢春）.mp4',
  'official-selection-16': '（重回校园，我带丑小鸭变身黑天鹅）.mp4',
  'official-selection-17': '（单身要罚款，我靠野甘蔗富可敌国）.mp4',
  'official-selection-18': '（天门智尊：冰山前妻悔不当初）.mp4',
  'official-selection-19': '《怪異錄-妒火》-视频-01.mp4',
  'official-selection-20': '最后的一颗子弹.mp4',
  'official-selection-21': '《无限流之恐怖航班1》.mp4',
  'official-selection-22': '《姐姐，别想甩掉我》.mp4',
  'official-selection-23': '《我的隐藏大佬男友》.mp4',
  'official-selection-24': '玄幻：我将宗门打造成堡垒.mp4',
  'official-selection-25': '年代1960：穿越南锣鼓巷.mp4',
  'official-selection-26': '十日不回家的理由.mp4',
}

export const selectionVideoUrls: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(selectionVideoObjectNames).map(([id, objectName]) => [
    id,
    `${selectionVideoOssBaseUrl}/${encodeURIComponent(objectName)}`,
  ]),
)
