import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type RouteTransitionStageProps = {
  pathname: string
  shouldAnimateRoute: boolean
  children: ReactNode
}

const RouteTransitionStage = ({ pathname, shouldAnimateRoute, children }: RouteTransitionStageProps) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const [routeReady, setRouteReady] = useState(!shouldAnimateRoute)

  return (
    <motion.div
      ref={stageRef}
      data-route-ready={routeReady ? 'true' : 'false'}
      className={`route-transition-stage ${pathname === '/' ? 'route-transition-stage--home' : 'route-transition-stage--paper'}`}
      initial={shouldAnimateRoute ? {
        x: '-96vw',
        y: '96vh',
        rotate: -1.2,
        scale: 1.02,
        borderRadius: '30px 30px 0 0',
      } : false}
      animate={{ x: '0vw', y: '0vh', rotate: 0, scale: 1, borderRadius: '0px' }}
      exit={{
        x: '104vw',
        y: '0vh',
        rotate: 1,
        scale: .985,
        borderRadius: '0px',
      }}
      onAnimationComplete={() => {
        // Remove the completed paper transform so fixed scroll pinning is
        // relative to the viewport instead of a transformed route wrapper.
        stageRef.current?.style.removeProperty('transform')
        stageRef.current?.style.removeProperty('will-change')
        setRouteReady(true)
        stageRef.current?.dispatchEvent(new Event('route-transition-complete'))
        window.dispatchEvent(new CustomEvent('scene-score-route-transition-complete', { detail: { pathname } }))
      }}
      transition={{
        duration: 1.25,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export const Layout = () => {
  const location = useLocation()
  const { pathname } = location
  const shouldAnimateRoute = location.key !== 'default'

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  useLayoutEffect(() => {
    if (!shouldAnimateRoute) return

    const root = document.documentElement
    const unlockScroll = (event?: Event) => {
      const completedPathname = (event as CustomEvent<{ pathname?: string }> | undefined)?.detail?.pathname
      if (completedPathname && completedPathname !== pathname) return
      root.classList.remove('route-scroll-locked')
    }

    root.classList.add('route-scroll-locked')
    window.addEventListener('scene-score-route-transition-complete', unlockScroll)
    const unlockFallback = window.setTimeout(() => unlockScroll(), 1600)

    return () => {
      window.removeEventListener('scene-score-route-transition-complete', unlockScroll)
      window.clearTimeout(unlockFallback)
      root.classList.remove('route-scroll-locked')
    }
  }, [pathname, shouldAnimateRoute])

  useLayoutEffect(() => {
    // Reset once at route start. The transition-complete handler only unlocks
    // input; it must not reset scroll again after an early wheel gesture.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    window.dispatchEvent(new CustomEvent('scene-score-route-change', { detail: { pathname } }))
  }, [pathname])

  return (
    <div className="site-shell">
      <Header />
      <div className="route-transition-frame">
        <AnimatePresence mode="sync">
          <RouteTransitionStage
            key={location.pathname}
            pathname={pathname}
            shouldAnimateRoute={shouldAnimateRoute}
          >
            <main className="site-main"><Outlet /></main>
          </RouteTransitionStage>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
