import selectionWorksData from './selectionWorks.json'
import { selectionVideoUrls } from './selectionVideoUrls'

export const selectionTypeKeys = ['All', 'AI仿真人', '3D动画', '音乐动画'] as const

export type SelectionTypeKey = typeof selectionTypeKeys[number]
export type SelectionAccent = 'red' | 'blue' | 'gold' | 'green' | 'violet'

export type LocalizedSelectionField = {
  source: string
  zhHant: string
  en: string
}

export type SelectionWork = {
  id: string
  title: string
  applicant: string
  type: LocalizedSelectionField
  subject: LocalizedSelectionField
  accent: SelectionAccent
  image: string
  video: string
  detailImages?: readonly string[]
}

export const selectionWorks = selectionWorksData.map((work) => ({
  ...work,
  video: selectionVideoUrls[work.id] ?? work.video,
})) as SelectionWork[]

export const getSelectionWork = (id: string) => selectionWorks.find((work) => work.id === id)

export const formatSelectionTitle = (title: string) => title.replace(/^《|》$/g, '')
