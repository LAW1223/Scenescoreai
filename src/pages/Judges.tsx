import { ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { judges } from '../data/sceneScore'

const RevealLine = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <span className={`judge-feature__line ${className}`}>
    <motion.span
      initial={{ y: '110%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-110%', opacity: 0 }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
)

export default function Judges() {
  const [activeId, setActiveId] = useState(judges[0].id)
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const active = judges.find((judge) => judge.id === activeId) ?? judges[0]
  const isTraditional = i18n.resolvedLanguage === 'zh-TW'
  const localeKey = isTraditional ? 'zh-Hant' : 'en'
  const pageCopy = isTraditional
    ? {
        kicker: '/ 特邀評審',
        title: <>評審<br /><em>聚焦</em></>,
        description: '五種來自電影、音樂、攝影與文化產業的專業視角，移入名字可預覽，點擊即可固定目前畫面',
        listLabel: '評審名單',
        frame: '/ 當前人物',
      }
    : {
        kicker: '/ SCENE SCORE AI',
        title: <>JURY<br /><em>SPOTLIGHT</em></>,
        description: 'Five perspectives from film, music, photography and culture. Hover a name to preview the frame; select it to keep that voice in focus.',
        listLabel: 'Jury list',
        frame: '/ CURRENT FRAME',
      }

  return (
    <div className="judges-page page-pad" lang={localeKey}>
      <section className="page-hero page-hero--split">
        <span className="section-kicker">{pageCopy.kicker}</span>
        <h1>{pageCopy.title}</h1>
        <p>{pageCopy.description}</p>
      </section>

      <section className="judges-showcase">
        <div className="judge-list" aria-label={pageCopy.listLabel}>
          {judges.map((judge, index) => (
            <button
              className={`judge-list__item ${judge.id === activeId ? 'is-active' : ''}`}
              key={judge.id}
              type="button"
              onMouseEnter={() => setActiveId(judge.id)}
              onFocus={() => setActiveId(judge.id)}
              onClick={() => navigate(`/judges/${judge.id}`)}
            >
              <span>0{index + 1}</span><strong>{isTraditional ? judge.name : judge.romanized}</strong><i>↗</i>
            </button>
          ))}
        </div>
        <div className="judge-feature">
          <AnimatePresence mode="wait">
            <Link
              key={`image-${active.id}`}
              to={`/judges/${active.id}`}
              className="judge-feature__image-link"
              aria-label={`${isTraditional ? active.name : active.romanized} — ${isTraditional ? '查看完整資料' : 'View full profile'}`}
            >
              <motion.img
                src={active.image}
                alt={active.romanized}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.42 }}
              />
            </Link>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              className="judge-feature__overlay"
              key={`${active.id}-${localeKey}`}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <RevealLine className="judge-feature__kicker" delay={0.04}>{pageCopy.frame}</RevealLine>
              <RevealLine className="judge-feature__name" delay={0.1}>{isTraditional ? active.name : active.romanized}</RevealLine>
              <RevealLine className="judge-feature__headline" delay={0.15}>{isTraditional ? active.headlineZhHant : active.headline}</RevealLine>
              <RevealLine className="judge-feature__role" delay={0.2}>{isTraditional ? active.roleZhHant : active.role}</RevealLine>
              {(isTraditional ? active.bioZhHant : active.bio).map((line, index) => (
                <RevealLine className="judge-feature__bio" delay={0.27 + index * 0.07} key={line}>{line}</RevealLine>
              ))}
              <Link className="text-link judge-feature__profile-link" to={`/judges/${active.id}`}>
                {isTraditional ? '查看完整資料' : 'VIEW FULL PROFILE'} <ArrowUpRight aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
