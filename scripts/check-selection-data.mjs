import assert from 'node:assert/strict'
import fs from 'node:fs'

const dataPath = new URL('../src/data/selectionWorks.json', import.meta.url)
const raw = fs.readFileSync(dataPath, 'utf8')
const entries = JSON.parse(raw)

const expectedFirstFive = [
  '《大唐噬魂令》',
  '《槐灯》',
  '《怪诞小镇》',
  '《白狼》',
  '《红靴子乐队》',
]
const expectedKeys = ['accent', 'applicant', 'id', 'image', 'subject', 'title', 'type', 'video']
const forbiddenSourceFields = ['发行渠道', '是否入圍', '是否入围', '網盤', '网盘', '提取码']

assert.equal(entries.length, 20, 'The official selection must contain exactly 20 works')
assert.equal(new Set(entries.map((entry) => entry.id)).size, 20, 'Selection IDs must be unique')
assert.equal(new Set(entries.map((entry) => entry.title)).size, 20, 'Selection titles must be unique')
assert.deepEqual(entries.slice(0, 5).map((entry) => entry.title), expectedFirstFive)

for (const [index, entry] of entries.entries()) {
  assert.deepEqual(Object.keys(entry).sort(), expectedKeys, `Unexpected fields on entry ${index + 1}`)
  assert.deepEqual(Object.keys(entry.type).sort(), ['en', 'source', 'zhHant'])
  assert.deepEqual(Object.keys(entry.subject).sort(), ['en', 'source', 'zhHant'])
  const mediaIndex = (index % 5) + 1
  const padded = String(mediaIndex).padStart(2, '0')
  assert.equal(entry.image, `/images/works/work-${padded}.png`)
  assert.equal(entry.video, `/media/ranking/work-${padded}.webm`)
}

const typeCounts = Object.groupBy(entries, (entry) => entry.type.source)
assert.equal(typeCounts['AI仿真人']?.length, 18)
assert.equal(typeCounts['3D动画']?.length, 1)
assert.equal(typeCounts['音乐动画']?.length, 1)
assert.equal(new Set(entries.slice(0, 5).map((entry) => entry.video)).size, 5)

for (const field of forbiddenSourceFields) {
  assert.equal(raw.includes(field), false, `Private workbook field leaked into selection data: ${field}`)
}

console.log('Selection data verified: 20 works, 18/1/1 types, five placeholder media pairs')
