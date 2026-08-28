import { AnimatePresence, MotionConfig, motion, usePresence } from 'framer-motion'
import { useLocation, useNavigationType, useOutlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const routeScrollPositions = new Map<string, number>()

type RouteTransitionStageProps = {
  locationKey: string
  pathname: string
  shouldAnimateRoute: boolean
  deferContentUntilReady: boolean
  children: ReactNode
}

const RouteTransitionStage = ({ locationKey, pathname, shouldAnimateRoute, deferContentUntilReady, children }: RouteTransitionStageProps) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const [isPresent, safeToRemove] = usePresence()
  const hasEnteredRef = useRef(!shouldAnimateRoute)
  const [routeReady, setRouteReady] = useState(!shouldAnimateRoute)
  const exitScrollY = isPresent
    ? 0
    : (routeScrollPositions.get(locationKey) ?? window.scrollY)
  const initialRouteMotion = deferContentUntilReady
    ? {
        x: '0vw',
        y: '0vh',
        rotate: 0,
        scale: 1.006,
        opacity: 0,
        borderRadius: '0px',
      }
    : {
        x: '-96vw',
        y: '96vh',
        rotate: -1.2,
        scale: 1.02,
        opacity: 1,
        borderRadius: '30px 30px 0 0',
      }

  return (
    <motion.div
      ref={stageRef}
      data-route-present={isPresent ? 'true' : 'false'}
      data-route-ready={routeReady ? 'true' : 'false'}
      className={`route-transition-stage ${pathname === '/' ? 'route-transition-stage--home' : 'route-transition-stage--paper'}${deferContentUntilReady ? ' route-transition-stage--defer-content' : ''}`}
      style={{ '--route-exit-scroll-y': `${exitScrollY}px` } as CSSProperties}
      initial={shouldAnimateRoute ? initialRouteMotion : false}
      animate={{ x: '0vw', y: '0vh', rotate: 0, scale: 1, opacity: 1, borderRadius: '0px' }}
      exit={{
        // Keep the outgoing page fully painted behind the incoming page.
        // This prevents the frame background from flashing between sheets.
        x: '0vw',
        y: '0vh',
        rotate: 0,
        scale: 1,
        opacity: .999,
        borderRadius: '0px',
      }}
      onAnimationComplete={() => {
        // Framer Motion calls this callback for both enter and exit. Keep the
        // outgoing sheet mounted until the incoming sheet covers it.
        if (!isPresent) {
          safeToRemove()
          return
        }
        if (hasEnteredRef.current) return
        hasEnteredRef.current = true
        // Remove the completed paper transform so fixed scroll pinning is
        // relative to the viewport instead of a transformed route wrapper.
        stageRef.current?.style.removeProperty('transform')
        stageRef.current?.style.removeProperty('will-change')
        setRouteReady(true)
        stageRef.current?.dispatchEvent(new Event('route-transition-complete'))
        window.dispatchEvent(new CustomEvent('scene-score-route-transition-complete', { detail: { pathname } }))
      }}
      transition={{
        duration: deferContentUntilReady ? 0.32 : 1.25,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export const Layout = () => {
  const location = useLocation()
  const navigationType = useNavigationType()
  const outlet = useOutlet()
  const { pathname } = location
  const previousLocationRef = useRef(location)
  const [initialLocation] = useState(location)
  const shouldAnimateRouteTransition = location !== initialLocation
  const shouldDeferHomeContent = pathname === '/'
    && Boolean((location.state as { homeReturnState?: unknown } | null)?.homeReturnState)

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  useLayoutEffect(() => {
    if (!shouldAnimateRouteTransition) return

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
  }, [pathname, shouldAnimateRouteTransition])

  useLayoutEffect(() => {
    const locationKey = location.key
    const saveScrollPosition = () => {
      routeScrollPositions.set(locationKey, window.scrollY)
    }

    document.addEventListener('pointerdown', saveScrollPosition, true)
    document.addEventListener('keydown', saveScrollPosition, true)
    window.addEventListener('popstate', saveScrollPosition)
    return () => {
      document.removeEventListener('pointerdown', saveScrollPosition, true)
      document.removeEventListener('keydown', saveScrollPosition, true)
      window.removeEventListener('popstate', saveScrollPosition)
    }
  }, [location.key])

  useLayoutEffect(() => {
    const previousLocation = previousLocationRef.current
    if (previousLocation.key !== location.key) {
      if (!routeScrollPositions.has(previousLocation.key)) {
        routeScrollPositions.set(previousLocation.key, window.scrollY)
      }
      previousLocationRef.current = location
    }

    if (shouldDeferHomeContent) {
      window.dispatchEvent(new CustomEvent('scene-score-route-change', { detail: { pathname } }))
      return
    }

    const savedScrollY = navigationType === 'POP'
      ? routeScrollPositions.get(location.key)
      : undefined
    const restoreScroll = () => {
      window.scrollTo({ top: savedScrollY ?? 0, left: 0, behavior: 'auto' })
    }

    restoreScroll()
    window.dispatchEvent(new CustomEvent('scene-score-route-change', { detail: { pathname } }))

    let restoreFrame = window.requestAnimationFrame(restoreScroll)
    const handleTransitionComplete = (event: Event) => {
      const completedPathname = (event as CustomEvent<{ pathname?: string }>).detail?.pathname
      if (completedPathname && completedPathname !== pathname) return
      window.cancelAnimationFrame(restoreFrame)
      restoreFrame = window.requestAnimationFrame(restoreScroll)
    }

    window.addEventListener('scene-score-route-transition-complete', handleTransitionComplete)
    const restoreFallback = window.setTimeout(restoreScroll, 1650)

    return () => {
      window.removeEventListener('scene-score-route-transition-complete', handleTransitionComplete)
      window.cancelAnimationFrame(restoreFrame)
      window.clearTimeout(restoreFallback)
    }
  }, [location, navigationType, pathname, shouldDeferHomeContent])

  return (
    <div className="site-shell">
      <Header />
      <div className="route-transition-frame">
        <MotionConfig reducedMotion="never">
          <AnimatePresence mode="sync">
            <RouteTransitionStage
              key={location.pathname}
              locationKey={location.key}
              pathname={pathname}
              shouldAnimateRoute={shouldAnimateRouteTransition}
              deferContentUntilReady={shouldDeferHomeContent}
            >
              <main className="site-main">{outlet}</main>
            </RouteTransitionStage>
          </AnimatePresence>
        </MotionConfig>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
