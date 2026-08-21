import { ArrowUpRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { judges, works } from '../data/sceneScore'

gsap.registerPlugin(ScrollTrigger)

const juryStackOrder = ['paco-wong', 'chen-tai-lee', 'bennett-pang', 'edmond-wong', 'ck-chan']
const juryPortraits = juryStackOrder
  .map((id) => judges.find((judge) => judge.id === id))
  .filter((judge): judge is (typeof judges)[number] => Boolean(judge))

const homeWorkScores = [
  { score: '89.7', change: '↓1', trend: 'down' },
  { score: '87.8', change: '↓1', trend: 'down' },
  { score: '84.9', change: '↑1', trend: 'up' },
  { score: '82.6', change: '↓1', trend: 'down' },
] as const

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

    let isIntersecting = false

    const syncPlayback = () => {
      if (isIntersecting && document.visibilityState === 'visible') {
        // Keep below-the-fold videos out of the initial network critical path.
        video.preload = 'metadata'
        void video.play().catch(() => {})
      } else {
        video.pause()
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting
      syncPlayback()
    }, { rootMargin: '160px' })

    observer.observe(video)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
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
  const featuredCopy = isTraditional
    ? {
        rank: '名次 / 01',
        summary: '把一個清晰可讀的示意結果放回影像、創作者與作品語境之中',
        note: '第一個公開排名項目的預覽資料，等待正式評分規程確認',
        change: '變化',
        details: '查看作品詳情',
      }
    : {
        rank: 'RANK / 01',
        summary: 'Return a clear, readable sample result to the context of the image, its maker and the work.',
        note: 'Preview data for the first public ranking entry, pending confirmation of the formal scoring protocol.',
        change: 'CHANGE',
        details: 'VIEW WORK DETAILS',
      }

  const sectionCopy = isTraditional
    ? {
        worksEyebrow: '橫向作品瀏覽 / WORKS',
        worksTitle: 'TOP 2—05',
        worksDescription: '四個同源的預覽項目，保留名次、標題、分數與變化',
        worksHint: '← 左右滑動 →',
        worksAria: 'Scene Score 第二至第五名作品',
        viewWork: '查看作品',
        howTitle: '透明始於設計',
        howSoul: '具體落實於實踐',
        howDescription: 'Scene Score 將在正式排名發布前公開評分維度、權重與異常處理方式',
        readMethod: '閱讀評分方式',
        howItems: ['評分維度', '權重配置', '評審規程'],
        pending: '待確認',
        juryTitle: '好的判斷',
        jurySoul: '需要觀看的角度',
        meetJury: '認識評審',
        juryAria: 'Scene Score 評審照片',
      }
    : {
        worksEyebrow: 'HORIZONTAL WORKS / 02—05',
        worksTitle: 'TOP 2—05',
        worksDescription: 'Four preview entries retain their rank, title, score and movement.',
        worksHint: '← DRAG TO BROWSE →',
        worksAria: 'Scene Score works ranked second through fifth',
        viewWork: 'VIEW WORK',
        howTitle: 'Transparent by design.',
        howSoul: 'Specific by practice.',
        howDescription: 'Scene Score will publish its scoring dimensions, weights and anomaly handling before formal rankings go live.',
        readMethod: 'READ THE METHOD',
        howItems: ['Dimensions', 'Weighting', 'Jury protocol'],
        pending: 'Pending confirmation',
        juryTitle: 'Good judgment',
        jurySoul: 'needs a point of view.',
        meetJury: 'MEET THE JURY',
        juryAria: 'Scene Score jury portraits',
      }

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
      const header = document.querySelector<HTMLElement>('.site-header')

      if (!hero || !curtain) return
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
          <span className="hero-curtain__rec"><i /> REC</span>
        </div>

        <div className="home-hero__copy home-rank-card">
          <strong className="home-rank-card__top">TOP 1</strong>
          <span className="home-rank-card__eyebrow">{featuredCopy.rank}</span>
          <h1>SAMPLE<br />FILM A</h1>
          <p className="home-rank-card__summary">{featuredCopy.summary}</p>
          <p className="home-rank-card__note">{featuredCopy.note}</p>
          <div className="home-rank-card__metrics">
            <span>
              <small>SCENE SCORE</small>
              <strong>9.8</strong>
            </span>
            <span>
              <small>{featuredCopy.change}</small>
              <strong className="home-rank-card__change">↑2</strong>
            </span>
          </div>
          <Link className="home-rank-card__link" to={'/series/' + works[0].id}>
            <span>{featuredCopy.details}</span><ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <button
          className="home-next-cue"
          type="button"
          aria-label={isTraditional ? '前往下一段內容' : 'Scroll to next section'}
          onClick={() => {
            const nextSection = pageRef.current?.querySelector<HTMLElement>('#home-highlight')
            nextSection?.scrollIntoView({
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
              block: 'start',
            })
          }}
        >
          <span className="home-next-cue__chevron" aria-hidden="true" />
          <span className="home-next-cue__chevron" aria-hidden="true" />
        </button>

      </section>

      <section id="home-highlight" className="home-section home-section--works">
        <div className="home-works__heading">
          <div>
            <span className="home-works__eyebrow">{sectionCopy.worksEyebrow}</span>
            <h2>{sectionCopy.worksTitle}</h2>
          </div>
          <div className="home-works__intro">
            <p>{sectionCopy.worksDescription}</p>
            <span>{sectionCopy.worksHint}</span>
          </div>
        </div>

        <div className="home-works__track" aria-label={sectionCopy.worksAria}>
          {works.slice(1, 5).map((work, index) => {
            const score = homeWorkScores[index]

            return (
              <Reveal className="home-work-card-shell" key={work.id}>
                <Link
                  to={'/series/' + work.id}
                  className="home-work-card"
                  aria-label={`${sectionCopy.viewWork}: ${work.title}`}
                >
                  <span className="home-work-card__media">
                    <AmbientVideo src={work.video} className="home-work-card__video" />
                    <span className="home-work-card__index">{work.index}</span>
                  </span>
                  <span className="home-work-card__info">
                    <strong>{work.title}</strong>
                    <span className="home-work-card__score">
                      <small>SCENE SCORE</small>
                      <b>{score.score}</b>
                    </span>
                    <span className={`home-work-card__trend is-${score.trend}`}>{score.change}</span>
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="home-section home-section--how">
        <Reveal className="how-intro">
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

    </div>
  )
}
