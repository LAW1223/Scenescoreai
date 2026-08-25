import selectionWorksData from './selectionWorks.json'

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
}

export const selectionWorks = selectionWorksData as SelectionWork[]

export const getSelectionWork = (id: string) => selectionWorks.find((work) => work.id === id)

export const formatSelectionTitle = (title: string) => title.replace(/^《|》$/g, '')
