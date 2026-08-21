import { ArrowUpRight, Play } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { judges, works } from '../data/sceneScore'

gsap.registerPlugin(ScrollTrigger)

const juryStackOrder = ['paco-wong', 'edmond-wong', 'bennett-pang', 'ck-chan', 'chen-tai-lee']
const juryPortraits = juryStackOrder
  .map((id) => judges.find((judge) => judge.id === id))
  .filter((judge): judge is (typeof judges)[number] => Boolean(judge))

const HOME_VIDEO_TIME_KEY = 'scene-score-home-video-time'
type HomeVideoStore = { time: number }

const homeVideoStore = ((globalThis as typeof globalThis & {
  __sceneScoreHomeVideoStore?: HomeVideoStore
}).__sceneScoreHomeVideoStore ??= { time: 0 })

const readHomeVideoTime = () => {
  if (homeVideoStore.time > 0) return homeVideoStore.time

  let storedTime = 0
  try {
    storedTime = Number(window.sessionStorage?.getItem(HOME_VIDEO_TIME_KEY))
  } catch {
    storedTime = 0
  }
  return Number.isFinite(storedTime) && storedTime > 0 ? storedTime : homeVideoStore.time
}

const writeHomeVideoTime = (time: number) => {
  homeVideoStore.time = time
  try {
    window.sessionStorage?.setItem(HOME_VIDEO_TIME_KEY, String(time))
  } catch {
    // The module-level value still covers normal SPA route changes if storage is unavailable.
  }
}

const Reveal = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

const AmbientVideo = ({ src, className }: { src: string; className: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Keep below-the-fold videos out of the initial network critical path.
        video.preload = 'metadata'
        void video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { rootMargin: '160px' })

    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  )
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [heroVideoReady, setHeroVideoReady] = useState(false)
  const { i18n } = useTranslation()
  const isTraditional = i18n.resolvedLanguage === 'zh-TW'
  const homeCopy = isTraditional
    ? {
        meta: '場景評分 AI',
        caption: '下一幕的場域指南',
        kicker: '/ 公開索引',
        title: '計算之力塑造形式',
        soul: '人性賦予靈魂',
        description: '聚焦銀幕故事的透明索引，由專業眼光與創作者共同塑造',
        explore: '探索排行榜',
      }
    : {
        meta: 'SCENE SCORE AI',
        caption: 'A FIELD GUIDE TO THE NEXT SCENE',
        kicker: '/ PUBLIC INDEX',
        title: 'Computational power gives form',
        soul: 'Humanity gives soul',
        description: 'A transparent index for screen stories, shaped by professional eyes and the people who make them.',
        explore: 'EXPLORE THE RANKING',
      }

  const sectionCopy = isTraditional
    ? {
        highlightKicker: '/ 精選',
        highlightTitle: '讓第一格畫面留下印記',
        highlightLink: '探索',
        featuredKicker: '/ 精選項目',
        featuredDescription: '公開排名資料將於評分維度與評審規程確認後完整呈現',
        openEntry: '開啟項目',
        rankingKicker: '/ 前五名',
        rankingTitle: '每個項目都保留其脈絡',
        rankingLink: '查看完整排名',
        howKicker: '/ 評分方式',
        howTitle: '透明始於設計',
        howSoul: '具體落實於實踐',
        howDescription: 'Scene Score 將在正式排名發布前公開評分維度、權重與異常處理方式',
        readMethod: '閱讀評分方式',
        howItems: ['評分維度', '權重配置', '評審規程'],
        pending: '待確認',
        juryKicker: '/ 評審聚焦',
        juryTitle: '好的判斷',
        jurySoul: '需要觀看的角度',
        meetJury: '認識評審',
        localNote: '公開索引 / 無需登入 / 公開瀏覽',
        juryAria: 'Scene Score 評審照片',
      }
    : {
        highlightKicker: '/ HIGHLIGHT',
        highlightTitle: 'Make the first frame count.',
        highlightLink: 'EXPLORE',
        featuredKicker: '/ FEATURED ENTRY',
        featuredDescription: 'Public ranking data is intentionally left open until the scoring dimensions and jury protocol are confirmed.',
        openEntry: 'OPEN ENTRY',
        rankingKicker: '/ TOP 05',
        rankingTitle: 'Every entry keeps its context.',
        rankingLink: 'VIEW FULL RANKING',
        howKicker: '/ HOW SCORING WORKS',
        howTitle: 'Transparent by design.',
        howSoul: 'Specific by practice.',
        howDescription: 'Scene Score will publish its scoring dimensions, weights and anomaly handling before formal rankings go live.',
        readMethod: 'READ THE METHOD',
        howItems: ['Dimensions', 'Weighting', 'Jury protocol'],
        pending: 'Pending confirmation',
        juryKicker: '/ JURY SPOTLIGHT',
        juryTitle: 'Good judgment',
        jurySoul: 'needs a point of view.',
        meetJury: 'MEET THE JURY',
        localNote: 'PUBLIC INDEX / NO LOGIN / OPEN BROWSING',
        juryAria: 'Scene Score jury portraits',
      }
  const workTypeLabel = (type: string) => isTraditional
    ? ({ Featured: '精選', 'Short Film': '短片', Series: '系列' }[type] ?? type)
    : type

  useLayoutEffect(() => {
    const video = videoRef.current
    const routeStage = pageRef.current?.closest<HTMLElement>('.route-transition-stage')

    if (!video || !routeStage) return

    let lastPersistedTime = -1
    const markVideoReady = () => setHeroVideoReady(true)

    if (video.readyState >= 2) markVideoReady()
    video.addEventListener('loadeddata', markVideoReady)

    const restoreVideoTime = () => {
      const savedTime = readHomeVideoTime()
      if (!Number.isFinite(savedTime) || savedTime <= 0) return
      const safeTime = Number.isFinite(video.duration) && video.duration > 0
        ? Math.min(savedTime, Math.max(0, video.duration - 0.05))
        : savedTime
      video.currentTime = safeTime
    }

    const saveAndPauseVideo = () => {
      persistVideoTime(true)
      video.pause()
    }

    const persistVideoTime = (force = false) => {
      if (!Number.isFinite(video.currentTime) || video.currentTime <= 0) return
      if (!force && Math.abs(video.currentTime - lastPersistedTime) < 0.25) return
      lastPersistedTime = video.currentTime
      writeHomeVideoTime(video.currentTime)
    }

    const persistVideoTimeOnEvent = () => persistVideoTime()

    const handleRouteChange = (event: Event) => {
      const pathname = (event as CustomEvent<{ pathname?: string }>).detail?.pathname
      if (pathname && pathname !== '/') saveAndPauseVideo()
    }

    window.addEventListener('scene-score-route-change', handleRouteChange)
    video.addEventListener('timeupdate', persistVideoTimeOnEvent)
    video.addEventListener('pause', persistVideoTimeOnEvent)

    const startVideo = () => {
      restoreVideoTime()
      void video.play().catch(() => {
        // Autoplay can still be blocked by a browser policy. The hero remains
        // usable with its fallback background in that case.
      })
    }

    const playVideo = () => {
      if (video.readyState >= 1) startVideo()
      else video.addEventListener('loadedmetadata', startVideo, { once: true })
    }

    if (routeStage.dataset.routeReady === 'false') {
      // Wait until the paper transition is complete before starting the large
      // hero video. This prevents a hitch when returning to Home.
      video.pause()
      const handleRouteReady = () => requestAnimationFrame(playVideo)
      routeStage.addEventListener('route-transition-complete', handleRouteReady, { once: true })

      return () => {
        routeStage.removeEventListener('route-transition-complete', handleRouteReady)
        video.removeEventListener('loadedmetadata', startVideo)
        video.removeEventListener('loadeddata', markVideoReady)
        video.removeEventListener('timeupdate', persistVideoTimeOnEvent)
        video.removeEventListener('pause', persistVideoTimeOnEvent)
        window.removeEventListener('scene-score-route-change', handleRouteChange)
        saveAndPauseVideo()
      }
    }

    playVideo()
    return () => {
      video.removeEventListener('loadedmetadata', startVideo)
      video.removeEventListener('loadeddata', markVideoReady)
      video.removeEventListener('timeupdate', persistVideoTimeOnEvent)
      video.removeEventListener('pause', persistVideoTimeOnEvent)
      window.removeEventListener('scene-score-route-change', handleRouteChange)
      saveAndPauseVideo()
    }
  }, [])

  useGSAP((_, contextSafe) => {
    let initialized = false
    let removeLoadListener: (() => void) | undefined

    const initializeHomeScroll = () => {
      if (initialized) return

      const hero = pageRef.current?.querySelector<HTMLElement>('.home-hero--immersive')
      const curtain = hero?.querySelector<HTMLElement>('.hero-curtain')
      const heroMeta = hero?.querySelector<HTMLElement>('.home-hero__meta')
      const header = document.querySelector<HTMLElement>('.site-header')

      if (!hero || !curtain || !heroMeta) return
      initialized = true

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) {
        gsap.set(curtain, { autoAlpha: 0.86 })
        return
      }

      const isMobile = window.matchMedia('(max-width: 780px)').matches
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: () => '+=' + (isMobile ? Math.round(window.innerHeight * 0.78) : Math.round(window.innerHeight * 0.96)),
          scrub: true,
          pin: true,
          // The route sheet's completed transform is removed before this
          // trigger starts, so the hero can stay fixed to the viewport.
          pinType: 'fixed',
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (header) header.classList.toggle('site-header--on-dark', self.progress < 0.94)
          },
        },
      })

      // Keep the opening sheet in control first. The video remains untouched
      // while the orange sheet exits, then continues with the page's natural
      // scroll after the pinned hero releases.
      heroTimeline
        .to(curtain, { duration: 1, xPercent: -108, yPercent: -108, rotation: -4, autoAlpha: 0, ease: 'none' }, 0)
        .to(heroMeta, { duration: 1, y: -34, autoAlpha: 0, ease: 'none' }, 0)

      pageRef.current?.querySelectorAll<HTMLElement>('.home-section').forEach((section) => {
        gsap.fromTo(
          section,
          { y: 16, scale: 0.998, opacity: 0.96 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh, { once: true })
      removeLoadListener = () => window.removeEventListener('load', refresh)
    }
    const safeInitializeHomeScroll = contextSafe ? contextSafe(initializeHomeScroll) : initializeHomeScroll

    const routeStage = pageRef.current?.closest<HTMLElement>('.route-transition-stage')
    if (routeStage?.dataset.routeReady === 'false') {
      const handleRouteReady = () => safeInitializeHomeScroll()
      routeStage.addEventListener('route-transition-complete', handleRouteReady, { once: true })
      return () => {
        routeStage.removeEventListener('route-transition-complete', handleRouteReady)
        removeLoadListener?.()
        if (initialized) document.querySelector<HTMLElement>('.site-header')?.classList.remove('site-header--on-dark')
      }
    }

    safeInitializeHomeScroll()
    return () => {
      removeLoadListener?.()
      if (initialized) document.querySelector<HTMLElement>('.site-header')?.classList.remove('site-header--on-dark')
    }
  }, { scope: pageRef })

  return (
    <div className="home-page home-page--immersive" ref={pageRef} lang={isTraditional ? 'zh-Hant' : 'en'}>
      <section className="home-hero home-hero--immersive">
        <div className="home-hero__media">
          <div className="home-hero__media-fallback" aria-hidden="true" />
          <video
            ref={videoRef}
            className={`home-hero__video${heroVideoReady ? ' is-ready' : ''}`}
            src="/media/scene-score-home.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Abstract art motion background"
          />
          <div className="hero-media-vignette" aria-hidden="true" />
        </div>

        <div className="hero-curtain" aria-hidden="true">
          <div className="hero-curtain__texture" />
          <div className="hero-title-lockup">
            <div className="hero-wordmark" aria-label="Scene Score">
              <span className="hero-wordmark__scene">SCENE</span>
              <span className="hero-score-lockup">
                <span className="hero-wordmark__score">SCORE</span>
                <sup>®</sup>
                <span className="hero-leaderboard" aria-label="Leaderboard">
                  {'LEADERBOARD'.split('').map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
                </span>
              </span>
            </div>
          </div>
          <div className="hero-curtain__caption">{homeCopy.caption}</div>
          <span className="hero-curtain__rec"><i /> REC</span>
        </div>

        <div className="home-hero__meta">
          <span><span className="status-dot" /> {homeCopy.meta}</span>
        </div>

        <div className="home-hero__copy">
          <p className="section-kicker">{homeCopy.kicker}</p>
          <h1>{homeCopy.title}<br /><em>{homeCopy.soul}</em></h1>
          <p className="home-hero__description">{homeCopy.description}</p>
          <Link className="round-arrow-link" to="/explore" aria-label="Explore the all-time ranking">
            <span>{homeCopy.explore}</span><ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

      </section>

      <section className="home-section home-section--highlight">
        <div className="section-heading">
          <div><span className="section-kicker">{sectionCopy.highlightKicker}</span><h2>{sectionCopy.highlightTitle}</h2></div>
          <Link className="text-link" to="/explore">{sectionCopy.highlightLink} <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <Reveal className="highlight-layout">
          <Link to={'/series/' + works[0].id} className="highlight-card scene-poster scene-poster--red">
            <AmbientVideo src={works[0].video} className="scene-poster__video" />
            <span className="poster-index">01 / 26</span>
            <span className="poster-title">{works[0].title}</span>
            <span className="poster-bottom">{workTypeLabel(works[0].type)} <em>/</em> {isTraditional ? '導演姓名' : works[0].director}</span>
            <span className="poster-hover-label">VIEW DETAIL <ArrowUpRight aria-hidden="true" /></span>
          </Link>
          <div className="highlight-copy">
            <span className="display-number">01</span>
            <p className="section-kicker">{sectionCopy.featuredKicker}</p>
            <h3>SAMPLE FILM A</h3>
            <p>{sectionCopy.featuredDescription}</p>
            <Link className="text-link" to={'/series/' + works[0].id}>{sectionCopy.openEntry} <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </Reveal>
      </section>

      <section className="home-section home-section--ranking">
        <div className="section-heading">
          <div><span className="section-kicker">{sectionCopy.rankingKicker}</span><h2>{sectionCopy.rankingTitle}</h2></div>
          <Link className="text-link" to="/explore">{sectionCopy.rankingLink} <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="home-ranking-list">
          {works.slice(0, 5).map((work) => (
            <Link to={'/series/' + work.id} className="home-ranking-row" key={work.id}>
              <span className="home-ranking-row__index">{work.index}</span>
              <span className="home-ranking-row__title">{work.title}</span>
              <span>{work.director}</span>
              <span>{workTypeLabel(work.type)}</span>
              <span className="score-placeholder">—</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-section--how">
        <Reveal className="how-intro">
          <span className="section-kicker">{sectionCopy.howKicker}</span>
          <h2>{sectionCopy.howTitle}<br /><em>{sectionCopy.howSoul}</em></h2>
          <p>{sectionCopy.howDescription}</p>
          <Link className="round-arrow-link" to="/methodology"><span>{sectionCopy.readMethod}</span><ArrowUpRight aria-hidden="true" /></Link>
        </Reveal>
        <div className="how-grid">
          {sectionCopy.howItems.map((item, index) => (
            <Reveal className="method-card" key={item}>
              <AmbientVideo src={works[index + 1].video} className="method-card__video" />
              <span>0{index + 1}</span><h3>{item}</h3><p>{sectionCopy.pending}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-section home-section--jury">
        <div className="jury-teaser-copy">
          <span className="section-kicker">{sectionCopy.juryKicker}</span>
          <h2>{sectionCopy.juryTitle}<br /><em>{sectionCopy.jurySoul}</em></h2>
          <Link className="round-arrow-link" to="/judges"><span>{sectionCopy.meetJury}</span><ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="jury-stack" aria-label={sectionCopy.juryAria}>
          {juryPortraits.map((judge) => (
            <Link
              key={judge.id}
              to={`/judges/${judge.id}`}
              className="jury-stack__link"
              aria-label={`${isTraditional ? judge.name : judge.romanized} — ${isTraditional ? '查看評委資料' : 'View profile'}`}
            >
              <img
                src={judge.image}
                alt={judge.romanized}
                loading="lazy"
                decoding="async"
              />
              <span className="jury-stack__label">
                {isTraditional ? '查看資料' : 'VIEW PROFILE'} <ArrowUpRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-note">
        <Play aria-hidden="true" fill="currentColor" /><span>{sectionCopy.localNote}</span>
      </section>
    </div>
  )
}
