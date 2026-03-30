import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import AnimeRanking from '../pages/AnimeRanking'
import ShortRanking from '../pages/ShortRanking'
import Rules from '../pages/Rules'
import About from '../pages/About'
import Contact from '../pages/Contact'

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ranking/anime" element={<AnimeRanking />} />
        <Route path="/ranking/short" element={<ShortRanking />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
