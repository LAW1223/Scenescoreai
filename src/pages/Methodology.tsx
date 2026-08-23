import { ArrowUpRight, Check, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Methodology() {
  const { i18n } = useTranslation()
  const isTraditional = i18n.resolvedLanguage === 'zh-TW'
  const copy = isTraditional
    ? {
        eligibility: {
          kicker: '收錄條件',
          title: '先確認作品，再談排名',
          description: '符合以下條件的作品，才會進入 Scene Score 公開索引',
          points: [
            '包含超過 50% 的 AI 生成畫面（Midjourney、Stable Diffusion、Runway、Pika 等）',
            '故事主線清晰，人物與邏輯具備連貫性',
            '成片已發布於公開串流或社交平台（B站、抖音、紅果短劇、YouTube、TikTok、Drama Wave 等）',
            '無低俗、侵權或嚴重違規內容',
          ],
        },
        scoring: {
          kicker: '評分邏輯',
          title: '滿分 10 分',
          description: '最終得分由以下四個維度加權得出',
          dimensions: [
            { number: '01', title: '視聽質量', weight: '30%', description: '畫面的連貫性、人物一致性、光影審美，以及聲音與畫面的契合度' },
            { number: '02', title: '劇本敘事', weight: '30%', description: '故事節奏、懸念設置、邏輯自洽，以及台詞水準' },
            { number: '03', title: '觀眾反響', weight: '20%', description: '全網播放量、點讚率、評論互動率及好評比例' },
            { number: '04', title: '技術突破', weight: '20%', description: '是否運用了新的 AI 流程，突破常規生成限制或實現高難度動態效果' },
          ],
        },
        updates: {
          kicker: '更新頻率',
          title: '榜單保持新鮮',
          points: [
            'AI 漫劇：每季度更新，呈現本季度最優質的 AI 漫劇作品',
            'AI 短劇：每季度更新，精選本季度最具焦點與影響力的 AI 短劇',
          ],
        },
        return: '返回流行榜',
      }
    : {
        eligibility: {
          kicker: 'ELIGIBILITY',
          title: 'A clear frame comes before a rank.',
          description: 'A work can enter the public index when it meets these conditions.',
          points: [
            'More than 50% of the finished image is AI-generated, using tools such as Midjourney, Stable Diffusion, Runway or Pika',
            'The story line is clear, with coherent characters and internal logic',
            'The finished work is publicly released on a streaming or social platform such as Bilibili, YouTube, TikTok or Drama Wave',
            'No vulgar, infringing or seriously non-compliant content',
          ],
        },
        scoring: {
          kicker: 'SCORING LOGIC',
          title: 'A 10-point reading frame.',
          description: 'The final score is weighted across four dimensions.',
          dimensions: [
            { number: '01', title: 'AUDIOVISUAL QUALITY', weight: '30%', description: 'Visual continuity, character consistency, lighting, aesthetics and the fit between sound and image' },
            { number: '02', title: 'SCRIPT & STORY', weight: '30%', description: 'Pacing, suspense, internal logic and the quality of the dialogue' },
            { number: '03', title: 'AUDIENCE RESPONSE', weight: '20%', description: 'Reach, like rate, comment activity and the proportion of positive response' },
            { number: '04', title: 'TECHNICAL BREAKTHROUGH', weight: '20%', description: 'New AI workflows, lifted generation limits or difficult dynamic effects' },
          ],
        },
        updates: {
          kicker: 'UPDATE FREQUENCY',
          title: 'The ranking keeps moving.',
          points: [
            'AI animation: refreshed quarterly with the strongest AI animated works of the season',
            'AI short drama: refreshed quarterly with the season’s most focused and influential short dramas',
          ],
        },
        return: 'RETURN TO RANKING',
      }

  return (
    <div className="rules-page page-pad" lang={isTraditional ? 'zh-Hant' : 'en'}>
      <section className="rules-board" aria-label={isTraditional ? '榜單規則' : 'Ranking rules'}>
        <div className="rules-board__header">
          <span className="rules-board__mark">SCENE SCORE / {isTraditional ? '公開索引' : 'PUBLIC INDEX'}</span>
          <span className="rules-board__scale">{isTraditional ? '滿分 10 分' : '10 POINT SCALE'}</span>
        </div>

        <section className="rules-section rules-section--eligibility">
          <div className="rules-section__heading">
            <span className="rules-section__number">01</span>
            <div>
              <span className="rules-kicker">{copy.eligibility.kicker}</span>
              <h2>{copy.eligibility.title}</h2>
              <p>{copy.eligibility.description}</p>
            </div>
          </div>
          <ul className="rules-checklist">
            {copy.eligibility.points.map((point) => (
              <li key={point}><Check aria-hidden="true" /><span>{point}</span></li>
            ))}
          </ul>
        </section>

        <section className="rules-section rules-section--scoring">
          <div className="rules-section__heading">
            <span className="rules-section__number">02</span>
            <div>
              <span className="rules-kicker">{copy.scoring.kicker}</span>
              <h2>{copy.scoring.title}</h2>
              <p>{copy.scoring.description}</p>
            </div>
          </div>
          <div className="rules-dimensions">
            {copy.scoring.dimensions.map((dimension) => (
              <article className="rules-dimension" key={dimension.number}>
                <div className="rules-dimension__topline">
                  <span>{dimension.number}</span>
                  <strong>{dimension.weight}</strong>
                </div>
                <h3>{dimension.title}</h3>
                <p>{dimension.description}</p>
                <ChevronRight aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="rules-section rules-section--updates">
          <div className="rules-section__heading">
            <span className="rules-section__number">03</span>
            <div>
              <span className="rules-kicker">{copy.updates.kicker}</span>
              <h2>{copy.updates.title}</h2>
            </div>
          </div>
          <ul className="rules-update-list">
            {copy.updates.points.map((point, index) => (
              <li key={point}><span>0{index + 1}</span><p>{point}</p></li>
            ))}
          </ul>
        </section>
      </section>

      <section className="rules-cta">
        <p>{isTraditional ? '評分規則會隨正式評審協議確認後持續更新，公開排名將同步標示版本與狀態' : 'The rules will continue to evolve with the formal jury protocol. Published rankings will carry the current version and status.'}</p>
        <Link className="round-arrow-link" to="/explore"><span>{copy.return}</span><ArrowUpRight aria-hidden="true" /></Link>
      </section>
    </div>
  )
}
