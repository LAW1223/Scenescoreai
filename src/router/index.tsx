import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import AnimeRanking from '../pages/AnimeRanking'
import ShortRanking from '../pages/ShortRanking'
import MusicRanking from '../pages/MusicRanking'
import ToolsRanking from '../pages/ToolsRanking'
import Rules from '../pages/Rules'
import About from '../pages/About'
import Judges from '../pages/Judges'
import Contact from '../pages/Contact'

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ranking/anime" element={<AnimeRanking />} />
        <Route path="/ranking/short" element={<ShortRanking />} />
        <Route path="/ranking/music" element={<MusicRanking />} />
        <Route path="/ranking/tools" element={<ToolsRanking />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about" element={<About />} />
        <Route path="/judges" element={<Judges />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
