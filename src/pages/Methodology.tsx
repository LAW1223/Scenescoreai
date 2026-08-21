import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const framework = [
  ['Scoring dimensions', 'Story, image, performance and context form the reading frame for every entry.'],
  ['Weighting logic', 'The published release will show how each dimension contributes to a result.'],
  ['Jury protocol', 'Every entry is read through a documented multi-judge process.'],
  ['Exceptions & conflicts', 'Outliers, conflicts and later changes are disclosed with the ranking.'],
]

export default function Methodology() {
  const { i18n } = useTranslation()
  const isTraditional = i18n.resolvedLanguage === 'zh-TW'
  const copy = isTraditional
    ? {
        kicker: '/ 評分方法',
        title: <>公開<br /><em>方法</em></>,
        hero: '先說清楚，再讓數字成為訊號。公開預覽會展示已準備好的框架，並標示仍待正式確認的部分',
        ranking: '/ 全時段排名',
        introTitle: '數字成為訊號之前，方法必須先被看見',
        intro: 'Scene Score 是一個公開瀏覽體驗，現階段展示評分框架，不虛構分數、留言系統、社交互動或付費牆',
        cta: '正式權重、評審人數與異常處理規則確認後，這個頁面會成為每項公開排名的參考基準',
        return: '返回探索',
        status: '框架 / 公開預覽',
        panels: [
          ['評分維度', '以故事、影像、表演與語境建立每項作品的閱讀框架'],
          ['權重邏輯', '正式發布時公開各項維度如何共同形成結果'],
          ['評審規程', '每項作品都會經過已記錄的多位評審閱讀'],
          ['異常與衝突', '離群值、利益衝突與修訂會隨排名一併說明'],
        ],
      }
    : {
        kicker: '/ BEHIND THE SCORE',
        title: <>THE<br /><em>METHOD</em></>,
        hero: 'Explainable by default. The public preview makes the framework visible while clearly labelling what still needs a final decision.',
        ranking: '/ ALL-TIME RANKING',
        introTitle: 'Before a number becomes a signal, the method has to be visible.',
        intro: 'Scene Score is a public browsing experience. This preview shows the reading framework without inventing scores, comments, social actions or a paywall.',
        cta: 'When the formal weights, jury count and exception rules are confirmed, this page becomes the reference point for every published rank.',
        return: 'RETURN TO EXPLORE',
        status: 'FRAMEWORK / PUBLIC PREVIEW',
        panels: framework.map(([, title, description]) => [title, description]),
      }

  return (
    <div className="methodology-page page-pad" lang={isTraditional ? 'zh-Hant' : 'en'}>
      <section className="page-hero page-hero--method">
        <span className="section-kicker">{copy.kicker}</span>
        <h1>{copy.title}</h1>
        <p>{copy.hero}</p>
      </section>
      <section className="method-intro">
        <span className="section-kicker">{copy.ranking}</span>
        <h2>{copy.introTitle}</h2>
        <p>{copy.intro}</p>
      </section>
      <section className="method-grid">
        {copy.panels.map(([title, description], index) => <article className="method-panel" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p><i>{copy.status}</i></article>)}
      </section>
      <section className="method-cta"><p>{copy.cta}</p><Link className="round-arrow-link" to="/explore"><span>{copy.return}</span><ArrowUpRight aria-hidden="true" /></Link></section>
    </div>
  )
}
