import { ArrowUpRight, Grid2X2, List, RotateCcw, ArrowUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { works } from '../data/sceneScore'

type ViewMode = 'grid' | 'list'

export default function Explore() {
  const [view, setView] = useState<ViewMode>('grid')
  const [filter, setFilter] = useState('All')
  const [hovered, setHovered] = useState<string | null>(null)
  const { i18n } = useTranslation()
  const isTraditional = i18n.resolvedLanguage === 'zh-TW'
  const copy = isTraditional
    ? {
        kicker: '/ 探索',
        title: <>公開<br /><em>索引</em></>,
        description: <>全時段公開排名預覽<br />不設社交互動，不隱藏分數</>,
        filters: { All: '全部', Featured: '精選', 'Short Film': '短片', Series: '系列' },
        reset: '重設',
        top: '頂部',
        viewMode: '檢視模式',
        grid: '網格',
        list: '列表',
        type: '類型',
        director: '導演',
        detail: '查看作品資料',
        footnote: '分數／狀態會在評分方法確認後公開',
      }
    : {
        kicker: '/ EXPLORE',
        title: <>THE<br /><em>INDEX</em></>,
        description: <>All-time public ranking preview<br />No social actions. No hidden scores.</>,
        filters: { All: 'All', Featured: 'Featured', 'Short Film': 'Short Film', Series: 'Series' },
        reset: 'RESET',
        top: 'TOP',
        viewMode: 'View mode',
        grid: 'GRID',
        list: 'LIST',
        type: 'Type',
        director: 'Director',
        detail: 'VIEW CASE STUDY',
        footnote: 'SCORE / STATUS remains unpublished while methodology is being finalized.',
      }
  const filters = ['All', 'Featured', 'Short Film', 'Series']
  const filteredWorks = useMemo(() => filter === 'All' ? works : works.filter((work) => work.type === filter), [filter])

  const reset = () => { setView('grid'); setFilter('All'); setHovered(null) }

  return (
    <div className="explore-page page-pad" lang={isTraditional ? 'zh-Hant' : 'en'}>
      <section className="page-hero page-hero--explore">
        <div><span className="section-kicker">{copy.kicker}</span><h1>{copy.title}</h1></div>
        <p>{copy.description}</p>
      </section>

      <div className="explore-toolbar">
        <div className="explore-filters">
          {filters.map((item) => <button className={filter === item ? 'is-active' : ''} key={item} type="button" onClick={() => setFilter(item)}>{copy.filters[item as keyof typeof copy.filters]} <span>[{item === 'All' ? works.length : works.filter((work) => work.type === item).length}]</span></button>)}
        </div>
        <div className="explore-actions">
          <button type="button" onClick={reset}><RotateCcw aria-hidden="true" /> {copy.reset}</button>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp aria-hidden="true" /> {copy.top}</button>
          <div className="view-toggle" aria-label={copy.viewMode}>
            <button type="button" className={view === 'grid' ? 'is-active' : ''} aria-label={copy.grid} onClick={() => setView('grid')}><Grid2X2 aria-hidden="true" /> {copy.grid}</button>
            <button type="button" className={view === 'list' ? 'is-active' : ''} aria-label={copy.list} onClick={() => setView('list')}><List aria-hidden="true" /> {copy.list}</button>
          </div>
        </div>
      </div>

      <section className={`work-collection work-collection--${view}`} aria-live="polite">
        {filteredWorks.map((work) => {
          const isFocused = hovered === work.id
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
              <div className="work-entry__meta"><span>{copy.type} <em>/</em> {isTraditional && work.type === 'Featured' ? '精選' : isTraditional && work.type === 'Short Film' ? '短片' : isTraditional && work.type === 'Series' ? '系列' : work.type}</span><span>{copy.director} <em>/</em> {work.director}</span></div>
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
                  aria-hidden="true"
                  onMouseEnter={(event) => void event.currentTarget.play()}
                  onMouseLeave={(event) => event.currentTarget.pause()}
                />
                <span className="poster-index">{work.index} <em>/</em> {work.year.slice(2)}</span>
                <span className="poster-title">{work.title}</span>
                <span className="poster-rec"><i /> REC</span>
                <span className="poster-hover-label">{copy.detail} <ArrowUpRight aria-hidden="true" /></span>
              </div>
              <div className="work-entry__info"><span>{work.index}</span><strong>{work.title}</strong><span>{work.year} <em>/</em> {isTraditional && work.type === 'Featured' ? '精選' : isTraditional && work.type === 'Short Film' ? '短片' : isTraditional && work.type === 'Series' ? '系列' : work.type}</span><span className="status-label">{isTraditional ? '待發布' : work.status}</span><ArrowUpRight aria-hidden="true" /></div>
            </Link>
          )
        })}
      </section>

      <div className="explore-footnote"><span>—</span> {copy.footnote}</div>
    </div>
  )
}
