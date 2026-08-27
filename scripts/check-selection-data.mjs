import assert from 'node:assert/strict'
import fs from 'node:fs'

const dataPath = new URL('../src/data/selectionWorks.json', import.meta.url)
const raw = fs.readFileSync(dataPath, 'utf8')
const entries = JSON.parse(raw)
const homeSource = fs.readFileSync(new URL('../src/pages/Home.tsx', import.meta.url), 'utf8')
const ossBaseUrl = 'https://scenescore-ai.oss-cn-hongkong.aliyuncs.com/20260826/'
const showreelUrl = `${ossBaseUrl}%E5%85%A5%E5%9B%B4%E4%BD%9C%E5%93%81%E9%9B%86%E9%94%A6.mp4`
const homeVideoUrl = `${ossBaseUrl}%E9%A6%96%E9%A1%B5%E5%A4%A7%E5%B1%8F%E8%A7%86%E9%A2%91.mp4`

const expectedFirstFive = [
  '《大唐噬魂令》',
  '《槐燈》',
  '《怪誕小鎮》',
  '《白狼》',
  '《紅靴子樂隊》',
]
const expectedAddedTitles = [
  '《無限流之恐怖航班1》',
  '《姐姐，別想甩掉我》',
  '《我的隱藏大佬男友》',
  '《玄幻：我將宗門打造成堡壘》',
  '《年代1960：穿越南鑼鼓巷》',
  '《十日不回家的理由》',
]
const tianxianCover = 'https://scenescore-ai.oss-cn-hongkong.aliyuncs.com/20260826/%E5%A4%A9%E4%BB%99%E9%85%8D%E5%89%8D%E4%BC%A0%E5%B0%81%E9%9D%A2.png'
const expectedKeys = ['accent', 'applicant', 'detailImages', 'id', 'image', 'subject', 'title', 'type', 'video']
const forbiddenSourceFields = ['发行渠道', '是否入圍', '是否入围', '網盤', '网盘', '提取码']

assert.equal(entries.length, 26, 'The official selection must contain exactly 26 works')
assert.equal(new Set(entries.map((entry) => entry.id)).size, 26, 'Selection IDs must be unique')
assert.equal(new Set(entries.map((entry) => entry.title)).size, 26, 'Selection titles must be unique')
assert.deepEqual(entries.slice(0, 5).map((entry) => entry.title), expectedFirstFive)
assert.deepEqual(entries.slice(-6).map((entry) => entry.title), expectedAddedTitles)
assert.equal(entries[5].title, '《望歸》')
assert.equal(entries[13].applicant, '智靈動力')
assert.equal(entries[13].image, tianxianCover)
assert.equal(entries[25].applicant, '涂霆駿')

for (const [index, entry] of entries.entries()) {
  assert.deepEqual(Object.keys(entry).sort(), expectedKeys, `Unexpected fields on entry ${index + 1}`)
  assert.deepEqual(Object.keys(entry.type).sort(), ['en', 'source', 'zhHant'])
  assert.deepEqual(Object.keys(entry.subject).sort(), ['en', 'source', 'zhHant'])

  assert.equal(entry.detailImages.length, 2, `Entry ${entry.id} must have two detail images`)
  for (const assetUrl of [entry.image, entry.video, ...entry.detailImages]) {
    assert.ok(assetUrl.startsWith(ossBaseUrl), `Selection media must use OSS: ${assetUrl}`)
    assert.doesNotThrow(() => new URL(assetUrl), `Invalid media URL: ${assetUrl}`)
  }
}

assert.equal(new Set(entries.map((entry) => entry.image)).size, 26)
assert.equal(new Set(entries.map((entry) => entry.video)).size, 26)
assert.equal(new Set(entries.flatMap((entry) => entry.detailImages)).size, 52)
assert.ok(homeSource.includes(showreelUrl), 'Official selection showreel must resolve through OSS')
assert.ok(homeSource.includes(homeVideoUrl), 'Home hero video must resolve through OSS')

const typeCounts = Object.groupBy(entries, (entry) => entry.type.source)
assert.equal(typeCounts['AI仿真人']?.length, 24)
assert.equal(typeCounts['3D动画']?.length, 1)
assert.equal(typeCounts['音乐动画']?.length, 1)
assert.equal(new Set(entries.slice(0, 5).map((entry) => entry.video)).size, 5)

for (const field of forbiddenSourceFields) {
  assert.equal(raw.includes(field), false, `Private workbook field leaked into selection data: ${field}`)
}

console.log('Selection data verified: 26 complete OSS media sets and both home videos')
