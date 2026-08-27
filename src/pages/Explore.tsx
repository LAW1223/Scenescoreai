import { ArrowUpRight, Grid2X2, List } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  selectionTypeKeys,
  selectionWorks,
  formatSelectionTitle,
  type LocalizedSelectionField,
  type SelectionTypeKey,
  type SelectionWork,
} from '../data/selectionWorks'

type ViewMode = 'grid' | 'list'

export default function Explore() {
  const [view, setView] = useState<ViewMode>('list')
  const [filter, setFilter] = useState<SelectionTypeKey>('All')
  const [hovered, setHovered] = useState<string | null>(null)
  const [playingPreview, setPlayingPreview] = useState<string | null>(null)
  const { i18n } = useTranslation()
  const isTraditional = i18n.resolvedLanguage === 'zh-TW'
  const copy = isTraditional
    ? {
        filters: {
          All: '全部',
          'AI仿真人': 'AI 仿真人',
          '3D动画': '3D 動畫',
          '音乐动画': '音樂動畫',
        },
        viewMode: '檢視模式',
        grid: '網格',
        list: '列表',
        preview: '預覽',
        title: '片名',
        applicant: '申報公司／導演',
        type: '類型',
        subject: '題材',
        notice: '排名不分先後',
        play: '播放預覽',
        detail: '查看作品資料',
      }
    : {
        filters: {
          All: 'All',
          'AI仿真人': 'AI Photorealistic',
          '3D动画': '3D Animation',
          '音乐动画': 'Music Animation',
        },
        viewMode: 'View mode',
        grid: 'GRID',
        list: 'LIST',
        preview: 'PREVIEW',
        title: 'TITLE',
        applicant: 'SUBMITTING COMPANY / DIRECTOR',
        type: 'TYPE',
        subject: 'SUBJECT',
        notice: 'Listed in no particular order',
        play: 'PLAY PREVIEW',
        detail: 'VIEW WORK DETAILS',
      }

  const filteredWorks = useMemo(
    () => filter === 'All' ? selectionWorks : selectionWorks.filter((work) => work.type.source === filter),
    [filter],
  )
  const localizedField = (field: LocalizedSelectionField) => isTraditional ? field.zhHant : field.en
  const filterCount = (type: SelectionTypeKey) => type === 'All'
    ? selectionWorks.length
    : selectionWorks.filter((work) => work.type.source === type).length

  const renderGridFields = (work: SelectionWork) => (
    <div className="work-entry__fields selection-fields">
      <div className="selection-field selection-field--title">
        <span className="selection-field__label">{copy.title}</span>
        <strong className={`selection-field__value selection-title ${formatSelectionTitle(work.title).length > 10 ? 'selection-title--long' : ''}`}>{formatSelectionTitle(work.title)}</strong>
      </div>
      <div className="selection-field selection-field--applicant">
        <span className="selection-field__label">{copy.applicant}</span>
        <span className="selection-field__value">{work.applicant}</span>
      </div>
      <div className="selection-field selection-field--type">
        <span className="selection-field__label">{copy.type}</span>
        <span className="selection-field__value">{localizedField(work.type)}</span>
      </div>
      <div className="selection-field selection-field--subject">
        <span className="selection-field__label">{copy.subject}</span>
        <span className="selection-field__value">{localizedField(work.subject)}</span>
        <ArrowUpRight aria-hidden="true" />
      </div>
    </div>
  )

  const renderRankingRow = (work: SelectionWork) => {
    const isFocused = hovered === work.id
    const title = formatSelectionTitle(work.title)

    return (
      <Link
        key={work.id}
        to={`/series/${work.id}`}
        className={`ranking-row ranking-row--${work.accent} ${isFocused ? 'is-hovered' : ''}`}
        onMouseEnter={() => setHovered(work.id)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(work.id)}
        onBlur={() => setHovered(null)}
      >
        <div className={`ranking-row__media scene-poster scene-poster--${work.accent} ${playingPreview === work.id ? 'is-playing' : ''}`}>
          <img className="scene-poster__image" src={work.image} alt="" loading="lazy" decoding="async" />
          <video
            className="scene-poster__video"
            src={work.video}
            poster={work.image}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${title} ${copy.play}`}
            onMouseEnter={(event) => {
              setPlayingPreview(work.id)
              void event.currentTarget.play().catch(() => setPlayingPreview(null))
            }}
            onMouseLeave={(event) => {
              setPlayingPreview((current) => current === work.id ? null : current)
              event.currentTarget.pause()
              event.currentTarget.currentTime = 0
            }}
          />
          <span className="ranking-row__media-label">{copy.play} <ArrowUpRight aria-hidden="true" /></span>
        </div>
        <div className="ranking-row__body">
          <div className="ranking-row__topline">
            <strong className={`selection-title ${title.length > 10 ? 'selection-title--long' : ''}`}>{title}</strong>
            <div className="ranking-row__chips">
              <span>{localizedField(work.type)}</span>
              <span>{localizedField(work.subject)}</span>
            </div>
          </div>
          <div className="ranking-row__summary-slot" aria-hidden="true" />
          <p className="ranking-row__applicant"><span>{copy.applicant}</span>{work.applicant}</p>
          <div className="ranking-row__footer">
            <span className="ranking-row__detail">{copy.detail} <ArrowUpRight aria-hidden="true" /></span>
          </div>
        </div>
      </Link>
    )
  }

  const renderGridEntry = (work: SelectionWork) => {
    const isFocused = hovered === work.id
    const title = formatSelectionTitle(work.title)

    return (
      <Link
        key={work.id}
        to={`/series/${work.id}`}
        className={`work-entry work-entry--${work.accent} ${isFocused ? 'is-hovered' : ''}`}
        onMouseEnter={() => setHovered(work.id)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(work.id)}
        onBlur={() => setHovered(null)}
      >
        <div className={`work-entry__visual scene-poster scene-poster--${work.accent}`}>
          <img className="scene-poster__image" src={work.image} alt="" loading="lazy" decoding="async" />
          <video
            className="scene-poster__video"
            src={work.video}
            poster={work.image}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${title} ${copy.play}`}
            onMouseEnter={(event) => void event.currentTarget.play()}
            onMouseLeave={(event) => {
              event.currentTarget.pause()
              event.currentTarget.currentTime = 0
            }}
          />
          <span className="poster-rec"><i /> REC</span>
          <span className="poster-hover-label">{copy.detail} <ArrowUpRight aria-hidden="true" /></span>
        </div>
        {renderGridFields(work)}
      </Link>
    )
  }

  return (
    <div className="explore-page page-pad" lang={isTraditional ? 'zh-Hant' : 'en'}>
      <div className="explore-toolbar">
        <div className="explore-filters">
          {selectionTypeKeys.map((item) => (
            <button
              className={filter === item ? 'is-active' : ''}
              key={item}
              type="button"
              onClick={() => setFilter(item)}
            >
              {copy.filters[item]} <span>[{filterCount(item)}]</span>
            </button>
          ))}
        </div>
        <div className="explore-actions">
          <div className="view-toggle" aria-label={copy.viewMode}>
            <button type="button" className={view === 'grid' ? 'is-active' : ''} aria-label={copy.grid} onClick={() => setView('grid')}><Grid2X2 aria-hidden="true" /> {copy.grid}</button>
            <button type="button" className={view === 'list' ? 'is-active' : ''} aria-label={copy.list} onClick={() => setView('list')}><List aria-hidden="true" /> {copy.list}</button>
          </div>
        </div>
      </div>

      <p className="explore-order-notice">{copy.notice}</p>

      <section className={view === 'list' ? 'ranking-table' : 'work-collection work-collection--grid'} aria-live="polite">
        {view === 'list' ? (
          <>
            <div className="ranking-table__head" aria-hidden="true">
              <span>{copy.preview}</span>
              <span>{copy.title} · {copy.applicant} · {copy.type} · {copy.subject}</span>
            </div>
            {filteredWorks.map(renderRankingRow)}
          </>
        ) : filteredWorks.map(renderGridEntry)}
      </section>
    </div>
  )
}
