import { useMemo, useState } from 'react'
import './App.css'

const clothing = {
  hat: { label: 'Beanie', detail: 'A little extra warmth', warmth: 0.7, group: 'head' },
  tee: { label: 'T-shirt', detail: 'Light cotton layer', warmth: 1, group: 'upper' },
  knit: { label: 'Knit sweater', detail: 'A cozy middle layer', warmth: 2.2, group: 'upper' },
  jacket: { label: 'Light jacket', detail: 'A protective outer layer', warmth: 2.6, group: 'upper' },
  trousers: { label: 'Trousers', detail: 'Everyday cotton', warmth: 1.4, group: 'lower' },
  socks: { label: 'Socks', detail: 'Warm feet, happy day', warmth: 0.6, group: 'lower' },
  shoes: { label: 'Sneakers', detail: 'Easy everyday shoes', warmth: 0.5, group: 'lower' },
}

function ToggleItem({ id, selected, onToggle, compact = false }) {
  const item = clothing[id]
  return (
    <button
      className={`clothing-option${selected ? ' is-selected' : ''}${compact ? ' is-compact' : ''}`}
      type="button"
      aria-pressed={selected}
      onClick={() => onToggle(id)}
    >
      <span className={`item-mark mark-${id}`} aria-hidden="true">
        {id === 'hat' ? '⌒' : id === 'tee' ? 'T' : id === 'knit' ? '≋' : id === 'jacket' ? '⌁' : id === 'trousers' ? 'Ⅱ' : id === 'socks' ? '◡' : '↗'}
      </span>
      <span className="option-copy">
        <span className="option-name">{item.label}</span>
        {!compact && <span className="option-detail">{item.detail}</span>}
      </span>
      <span className="option-check" aria-hidden="true">{selected ? '✓' : '+'}</span>
    </button>
  )
}

function Avatar({ gender, outfit }) {
  const isWoman = gender === 'woman'
  return (
    <svg className="avatar-art" viewBox="0 0 300 470" role="img" aria-label={`${gender} avatar wearing the selected outfit`}>
      <defs>
        <linearGradient id="skin" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f4c9a8" />
          <stop offset="1" stopColor="#dc9b76" />
        </linearGradient>
        <linearGradient id="tee" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#eb7356" />
          <stop offset="1" stopColor="#c94e39" />
        </linearGradient>
        <linearGradient id="knit" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#6b8c81" />
          <stop offset="1" stopColor="#46675f" />
        </linearGradient>
        <linearGradient id="jacket" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#daa947" />
          <stop offset="1" stopColor="#bd8530" />
        </linearGradient>
        <linearGradient id="pants" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#526b79" />
          <stop offset="1" stopColor="#344c5a" />
        </linearGradient>
        <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="#475750" floodOpacity=".13" />
        </filter>
      </defs>
      <ellipse cx="151" cy="452" rx="91" ry="12" fill="#d9e2d9" />
      <g filter="url(#soft-shadow)">
        {isWoman && <path d="M92 75c-5-29 12-55 44-57 32-2 57 16 59 49l-6 68-18-8-7-58-58 2-5 65-19-6z" fill="#49372f" />}
        <path d={isWoman ? 'M126 104h47v44c-9 12-37 12-47 0z' : 'M126 105h47v43c-9 12-37 12-47 0z'} fill="url(#skin)" />
        <path d="M104 158c12-12 29-18 46-18s34 6 46 18l21 131H82z" fill="#f2c5a2" />
        {!isWoman && <path d="M101 90c0-33 19-53 50-53 32 0 50 21 49 55l-8 39c-7 17-22 28-42 28-21 0-35-11-43-28z" fill="url(#skin)" />}
        {isWoman && <path d="M103 89c1-32 19-51 48-51 29 0 48 20 48 52l-6 41c-7 18-21 29-42 29-21 0-35-11-42-29z" fill="url(#skin)" />}
        <path d={isWoman ? 'M102 91c-4-31 13-57 43-59 32-2 52 19 51 51-12-5-19-15-23-27-13 18-37 24-67 23z' : 'M101 93c-2-34 19-56 49-56 31 0 51 22 49 56-10-12-16-18-20-32-14 16-40 23-78 20z'} fill="#49372f" />
        <path d="M126 108c5-4 12-4 17 0M159 108c5-4 12-4 17 0" fill="none" stroke="#6b4738" strokeLinecap="round" strokeWidth="2.5" />
        <ellipse cx="135" cy="119" rx="2.2" ry="3" fill="#41312b" />
        <ellipse cx="168" cy="119" rx="2.2" ry="3" fill="#41312b" />
        <path d="M143 137c5 4 11 4 16 0" fill="none" stroke="#a95e53" strokeLinecap="round" strokeWidth="2.5" />
        <circle cx="119" cy="131" r="7" fill="#e99f85" opacity=".38" />
        <circle cx="183" cy="131" r="7" fill="#e99f85" opacity=".38" />
        {outfit.hat && <g>
          <path d="M105 87c1-28 18-44 45-44s44 16 45 44z" fill="#d8775b" />
          <path d="M103 82h94v16h-94z" rx="8" fill="#bd5c47" />
          <circle cx="150" cy="41" r="6" fill="#e9a47e" />
        </g>}
        <path d="M88 166c-12 4-20 14-24 29l-20 91c-2 10 3 17 11 18 7 1 11-4 14-12l28-78z" fill="url(#skin)" />
        <path d="M212 166c12 4 20 14 24 29l20 91c2 10-3 17-11 18-7 1-11-4-14-12l-28-78z" fill="url(#skin)" />
        <path d="M99 276h102l-7 38-3 91h-39l-7-82-7 82h-39l-3-91z" fill="url(#skin)" />
        {isWoman && !outfit.tee && !outfit.knit && !outfit.jacket && <g>
          <path d="M121 177l-9 23M179 177l9 23" fill="none" stroke="#b86c5d" strokeLinecap="round" strokeWidth="5" />
          <path d="M112 198c12-10 27-9 38 2 11-11 26-12 38-2l-3 24h-70z" fill="#d58a77" />
          <path d="M115 221h70v7h-70z" fill="#b96f61" />
          <path d="M114 205c9-7 20-7 29 1M157 206c9-8 20-8 29-1" fill="none" stroke="#e7ad9c" strokeLinecap="round" strokeWidth="2" />
        </g>}
        {!outfit.trousers && <g>
          <path d="M99 274h102l-6 39h-36l-9-13-9 13h-36z" fill={isWoman ? '#b9796b' : '#718995'} />
          <path d="M104 279h92" fill="none" stroke={isWoman ? '#d9a094' : '#9aabb3'} strokeLinecap="round" strokeWidth="2" />
        </g>}
        {outfit.trousers && <g>
          <path d="M89 273h122l-6 35-8 97h-41l-7-82-7 82h-41l-8-97z" fill="url(#pants)" />
          <path d="M98 282h104M150 313v19M110 391l2 11M190 391l-2 11" fill="none" stroke="#78909b" strokeLinecap="round" strokeWidth="2" opacity=".7" />
        </g>}
        {outfit.socks && <g fill="#f1eee1">
          <path d="M102 391h37v20h-37z" /><path d="M160 391h37v20h-37z" />
        </g>}
        <path d="M105 401h32v12c0 6 8 9 16 15l3 3c3 4 1 8-5 8H96c-6 0-9-5-6-10z" fill="url(#skin)" />
        <path d="M163 401h32v12c0 6 9 9 17 15l4 3c3 4 1 8-5 8h-53c-6 0-9-5-6-10z" fill="url(#skin)" />
        {outfit.shoes && <g>
          <path d="M104 401h34v12c0 6 8 9 16 15l3 3c3 4 1 8-5 8H96c-6 0-9-5-6-10z" fill="#f5f0e5" />
          <path d="M162 401h34v12c0 6 9 9 17 15l4 3c3 4 1 8-5 8h-53c-6 0-9-5-6-10z" fill="#f5f0e5" />
          <path d="M96 436h61M163 436h60M112 418l10 7M171 418l10 7" fill="none" stroke="#d4cfc2" strokeLinecap="round" strokeWidth="2" />
        </g>}
        {(outfit.tee || outfit.knit || outfit.jacket) && <path d="M85 162c15-12 31-18 65-18s50 6 65 18l-3 127H87z" fill={outfit.tee ? 'url(#tee)' : outfit.knit ? 'url(#knit)' : 'url(#jacket)'} />}
        {outfit.tee && <g>
          <path d="M112 149l-30 11-25 43 27 16 14-24zM188 149l30 11 25 43-27 16-14-24z" fill="url(#tee)" />
          <path d="M134 146c4 11 28 11 32 0" fill="none" stroke="#b94d3b" strokeWidth="4" />
        </g>}
        {outfit.knit && <g>
          <path d="M108 148l-25 12-27 44 29 18 14-22zM192 148l25 12 27 44-29 18-14-22z" fill="url(#knit)" />
          <path d="M88 165l-10 33M212 165l10 33M99 270h102" fill="none" stroke="#78998e" strokeLinecap="round" strokeWidth="3" opacity=".8" />
          <path d="M133 146c4 11 30 11 34 0" fill="none" stroke="#3f625a" strokeWidth="4" />
        </g>}
        {outfit.jacket && <g>
          <path d="M105 148l-27 14-27 46 32 18 13-23zM195 148l27 14 27 46-32 18-13-23z" fill="url(#jacket)" />
          <path d="M119 148l31 24 31-24 15 140H104z" fill="url(#jacket)" />
          <path d="M150 173v107M121 190l15 12M179 190l-15 12" fill="none" stroke="#a9762d" strokeWidth="2" />
        </g>}
        {outfit.jacket && outfit.tee && <path d="M85 162l-29 46 28 17 14-22M215 162l29 46-28 17-14-22" fill="url(#jacket)" />}
      </g>
    </svg>
  )
}

function App() {
  const [gender, setGender] = useState('woman')
  const [outfit, setOutfit] = useState({ hat: false, tee: true, knit: false, jacket: false, trousers: true, socks: false, shoes: true })

  const temperature = useMemo(() => {
    const warmth = Object.entries(outfit).reduce((total, [id, active]) => total + (active ? clothing[id].warmth : 0), 0)
    const low = Math.round(26 - warmth * 2.2)
    const high = low + 8
    const position = Math.min(78, Math.max(22, Math.round(52 - (warmth - 2.9) * 6)))
    return { low, high, min: low - 10, max: high + 8, feels: Math.round((low + high) / 2), position }
  }, [outfit])

  function toggleClothing(id) {
    setOutfit((current) => ({ ...current, [id]: !current[id] }))
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Layer home">
          <span className="brand-mark"><span /><span /><span /></span>
          <span>layer<span className="brand-period">.</span></span>
        </a>
        <span className="topbar-note">A little more comfortable, everywhere.</span>
        <button className="reset-button" type="button" onClick={() => setOutfit({ hat: false, tee: true, knit: false, jacket: false, trousers: true, socks: false, shoes: true })}>
          <span aria-hidden="true">↺</span> Reset outfit
        </button>
      </header>

      <section className="temperature-card" aria-label="Estimated temperature range">
        <div className="temperature-intro">
          <span className="eyebrow"><span className="sun-icon" aria-hidden="true">☼</span> YOUR COMFORT FORECAST</span>
          <h1>Dress for your <em>day.</em></h1>
          <p>Estimated for your outfit, not the weather.</p>
        </div>
        <div className="temperature-summary">
          <div className="feels-like">
            <span className="metric-label">FEELS COMFIEST AT</span>
            <span className="big-temp">{temperature.feels}<small>°C</small></span>
          </div>
          <div className="temp-range">
            <div className="range-top"><span>Comfort zone</span><strong>{temperature.low}° — {temperature.high}°</strong></div>
            <div className="range-track" style={{ '--comfort-position': `${temperature.position}%` }}><span className="range-fill" /><i className="range-dot" /></div>
            <div className="range-ends"><span>Could go as low as <b>{temperature.min}°</b></span><span>as high as <b>{temperature.max}°</b></span></div>
          </div>
        </div>
        <div className="weather-stamp" aria-hidden="true"><span>°</span><i /></div>
      </section>

      <section className="builder" aria-label="Outfit builder">
        <aside className="control-panel left-panel">
          <div className="panel-heading">
            <span className="eyebrow">01 — YOUR PERSON</span>
            <h2>Make it yours</h2>
          </div>
          <div className="gender-switch" role="group" aria-label="Choose avatar">
            {['woman', 'man'].map((option) => (
              <button key={option} type="button" className={gender === option ? 'active' : ''} aria-pressed={gender === option} onClick={() => setGender(option)}>
                <span className={`person-icon ${option}`} aria-hidden="true">{option === 'woman' ? '♀' : '♂'}</span>
                {option === 'woman' ? 'Woman' : 'Man'}
              </button>
            ))}
          </div>

          <div className="section-rule" />
          <div className="category-heading"><span className="category-icon hat-icon" aria-hidden="true">⌒</span><div><h3>On your head</h3><span>One easy extra</span></div></div>
          <ToggleItem id="hat" selected={outfit.hat} onToggle={toggleClothing} />

          <div className="section-rule" />
          <div className="category-heading"><span className="category-icon top-icon" aria-hidden="true">↟</span><div><h3>Top layers</h3><span>Mix and match</span></div></div>
          <div className="option-stack">
            {['tee', 'knit', 'jacket'].map((id) => <ToggleItem key={id} id={id} selected={outfit[id]} onToggle={toggleClothing} />)}
          </div>
          <p className="layer-tip"><span aria-hidden="true">✳</span> Layers trap warmth. Add one at a time.</p>
        </aside>

        <div className="avatar-stage">
          <div className="stage-note"><span className="live-dot" /> LIVE PREVIEW</div>
          <div className="avatar-halo" />
          <Avatar gender={gender} outfit={outfit} />
          <div className="avatar-caption"><span>{gender === 'woman' ? 'Maya' : 'Alex'}</span><small>ready for the day</small></div>
          <div className="outfit-chips" aria-label="Selected clothing">
            {Object.entries(outfit).filter(([, selected]) => selected).map(([id]) => (
              <span className="outfit-chip" key={id}>{clothing[id].label}</span>
            ))}
          </div>
        </div>

        <aside className="control-panel right-panel">
          <div className="panel-heading">
            <span className="eyebrow">02 — THE FINISHING TOUCHES</span>
            <h2>From the ground up</h2>
          </div>
          <div className="category-heading"><span className="category-icon trouser-icon" aria-hidden="true">Ⅱ</span><div><h3>Bottom layers</h3><span>Stay cozy down there</span></div></div>
          <div className="option-stack">
            {['trousers', 'socks', 'shoes'].map((id) => <ToggleItem key={id} id={id} selected={outfit[id]} onToggle={toggleClothing} />)}
          </div>

          <div className="weather-note">
            <div className="note-icon" aria-hidden="true">☀</div>
            <div><strong>A tiny forecast note</strong><p>This is a starting point. Wind, sunshine, and your own comfort can change the feeling.</p></div>
          </div>

          <div className="quick-stats">
            <div><span className="stat-icon">♧</span><span>Layers on</span><strong>{Object.values(outfit).filter(Boolean).length}</strong></div>
            <div><span className="stat-icon warm-stat">⌁</span><span>Warmth level</span><strong>{temperature.feels > 25 ? 'Toasty' : temperature.feels < 16 ? 'Light' : 'Just right'}</strong></div>
          </div>
        </aside>
      </section>

      <footer className="page-footer"><span>Made for everyday comfort</span><span>Just a guide — dress how you feel.</span></footer>
    </main>
  )
}

export default App
