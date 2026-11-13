import { useEffect, useMemo, useState } from 'react'
import './App.css'

const clothing = {
  hat: {
    label: 'Headwear',
    options: [
      { id: 'wool-beanie', label: 'Wool beanie', detail: 'Warm knit', warmth: 0.8 },
      { id: 'cotton-cap', label: 'Cotton cap', detail: 'Light sun cover', warmth: 0.2 },
      { id: 'bucket-hat', label: 'Cotton bucket hat', detail: 'Light shade', warmth: 0.2 },
      { id: 'rain-hat', label: 'Waterproof rain hat', detail: 'Keeps off the rain', warmth: 0.3 },
    ],
  },
  tee: {
    label: 'T-shirt',
    options: [
      { id: 'cotton-tee', label: 'Cotton T-shirt', detail: 'Breathable everyday layer', warmth: 1 },
      { id: 'merino-tee', label: 'Merino wool T-shirt', detail: 'Light, naturally warm wool', warmth: 1.5 },
      { id: 'polyester-tee', label: 'Polyester T-shirt', detail: 'Light performance fabric', warmth: 0.8 },
      { id: 'thermal-tee', label: 'Thermal long-sleeve tee', detail: 'A warmer base layer', warmth: 1.8 },
    ],
  },
  knit: {
    label: 'Jumper',
    options: [
      { id: 'cotton-sweatshirt', label: 'Cotton sweatshirt', detail: 'Soft, midweight layer', warmth: 2 },
      { id: 'wool-jumper', label: 'Wool jumper', detail: 'Warm natural insulation', warmth: 2.8 },
      { id: 'poly-fleece', label: 'Polyester fleece', detail: 'Light synthetic warmth', warmth: 2.4 },
      { id: 'chunky-knit', label: 'Chunky wool knit', detail: 'A very warm knit layer', warmth: 3.3 },
    ],
  },
  jacket: {
    label: 'Jacket',
    options: [
      { id: 'denim-jacket', label: 'Denim jacket', detail: 'Light everyday outer layer', warmth: 1.6 },
      { id: 'windbreaker', label: 'Polyester windbreaker', detail: 'Light wind protection', warmth: 1.4 },
      { id: 'wool-coat', label: 'Wool coat', detail: 'Warm structured layer', warmth: 2.8 },
      { id: 'puffer-jacket', label: 'Insulated puffer jacket', detail: 'High warmth outer layer', warmth: 3.5 },
    ],
  },
  trousers: {
    label: 'Bottoms',
    options: [
      { id: 'cotton-trousers', label: 'Cotton trousers', detail: 'Light everyday coverage', warmth: 1.4 },
      { id: 'denim-jeans', label: 'Denim jeans', detail: 'Midweight cotton denim', warmth: 1.8 },
      { id: 'shorts', label: 'Shorts', detail: 'Cool, lightweight coverage', warmth: 0.2 },
      { id: 'leggings', label: 'Polyester leggings', detail: 'Light stretch layer', warmth: 1.1 },
      { id: 'thermal-leggings', label: 'Thermal leggings', detail: 'Extra warmth underneath', warmth: 2 },
    ],
  },
  socks: {
    label: 'Socks',
    options: [
      { id: 'cotton-socks', label: 'Cotton socks', detail: 'Light everyday pair', warmth: 0.6 },
      { id: 'bamboo-socks', label: 'Bamboo socks', detail: 'Light, breathable pair', warmth: 0.5 },
      { id: 'wool-socks', label: 'Merino wool socks', detail: 'Warm natural fiber', warmth: 1 },
      { id: 'thermal-socks', label: 'Thermal socks', detail: 'Extra-cozy cold-weather pair', warmth: 1.5 },
    ],
  },
  shoes: {
    label: 'Footwear',
    options: [
      { id: 'sneakers', label: 'Sneakers', detail: 'Everyday closed shoes', warmth: 0.5 },
      { id: 'flip-flops', label: 'Flip-flops', detail: 'Open, minimal footwear', warmth: 0.1 },
      { id: 'sandals', label: 'Sandals', detail: 'Open summer footwear', warmth: 0.1 },
      { id: 'rain-boots', label: 'Rain boots', detail: 'Waterproof coverage', warmth: 1 },
      { id: 'heavy-boots', label: 'Heavy boots', detail: 'Sturdy, warm footwear', warmth: 1.8 },
      { id: 'shearling-boots', label: 'Shearling-lined boots', detail: 'Very warm lined boots', warmth: 2.2 },
    ],
  },
}

const defaultOutfit = {
  hat: '',
  tee: 'cotton-tee',
  knit: '',
  jacket: '',
  trousers: 'cotton-trousers',
  socks: '',
  shoes: 'sneakers',
}

function GarmentPicker({ type, selectedId, onSelect }) {
  const category = clothing[type]
  const selectedItem = category.options.find((item) => item.id === selectedId)

  return (
    <div className={`clothing-option${selectedItem ? ' is-selected' : ''}`}>
      <span className={`item-mark mark-${type}`} aria-hidden="true">
        {type === 'hat' ? '⌒' : type === 'tee' ? 'T' : type === 'knit' ? '≋' : type === 'jacket' ? '⌁' : type === 'trousers' ? 'Ⅱ' : type === 'socks' ? '◡' : '↗'}
      </span>
      <span className="option-copy">
        <span className="option-name">{category.label}</span>
        <span className="option-detail">{selectedItem?.detail ?? 'Choose a style and fabric'}</span>
        <select
          aria-label={`Choose ${category.label}`}
          value={selectedId}
          onChange={(event) => onSelect(type, event.target.value)}
        >
          <option value="">None</option>
          {category.options.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
      </span>
    </div>
  )
}

function Avatar({ gender, outfit, weight }) {
  const isWoman = gender === 'woman'
  const widthScale = weight <= 75
    ? 0.8 + ((weight - 45) / 30) * 0.2
    : 1 + ((weight - 75) / 65) * 0.35
  const teeFill = outfit.tee === 'merino-tee' ? 'url(#knit)' : outfit.tee === 'polyester-tee' ? '#557f99' : outfit.tee === 'thermal-tee' ? '#6e6c83' : 'url(#tee)'
  const knitFill = outfit.knit === 'cotton-sweatshirt' ? '#7d9284' : outfit.knit === 'poly-fleece' ? '#596f9b' : outfit.knit === 'chunky-knit' ? '#96724d' : 'url(#knit)'
  const jacketFill = outfit.jacket === 'denim-jacket' ? '#4f6e8d' : outfit.jacket === 'windbreaker' ? '#51908b' : outfit.jacket === 'wool-coat' ? '#8c6854' : outfit.jacket === 'puffer-jacket' ? '#a98746' : 'url(#jacket)'
  const trousersFill = outfit.trousers === 'leggings' ? '#6a6579' : outfit.trousers === 'thermal-leggings' ? '#4e5263' : outfit.trousers === 'denim-jeans' ? '#405d72' : 'url(#pants)'
  const socksFill = outfit.socks === 'thermal-socks' ? '#d9d4c2' : outfit.socks === 'wool-socks' ? '#e5ddd0' : outfit.socks === 'bamboo-socks' ? '#e7eee1' : '#f1eee1'
  const bootFill = outfit.shoes === 'rain-boots' ? '#b78d49' : outfit.shoes === 'heavy-boots' ? '#5c4b3b' : '#bd8b6a'

  return (
    <svg className="avatar-art" viewBox="0 0 300 470" role="img" aria-label={`${gender} avatar at ${weight} kilograms wearing the selected outfit`}>
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
      <g filter="url(#soft-shadow)" transform={`translate(150 0) scale(${widthScale} 1) translate(-150 0)`}>
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
        {outfit.hat === 'wool-beanie' && <g>
          <path d="M105 87c1-28 18-44 45-44s44 16 45 44z" fill="#d8775b" />
          <path d="M103 82h94v16h-94z" rx="8" fill="#bd5c47" />
          <circle cx="150" cy="41" r="6" fill="#e9a47e" />
        </g>}
        {(outfit.hat === 'cotton-cap' || outfit.hat === 'bucket-hat' || outfit.hat === 'rain-hat') && <g>
          <path d="M105 88c2-28 18-43 45-43s43 15 45 43z" fill={outfit.hat === 'rain-hat' ? '#708d83' : '#d8775b'} />
          {outfit.hat === 'cotton-cap' && <path d="M105 84c-16 0-26 5-31 13 14 5 27 4 38-1z" fill="#bd5c47" />}
          {outfit.hat === 'bucket-hat' && <path d="M99 81h102l9 13c-36 11-84 11-120 0z" fill="#bd5c47" />}
          {outfit.hat === 'rain-hat' && <path d="M88 83h124l9 8c-42 12-100 12-142 0z" fill="#5f786f" />}
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
        {outfit.trousers === 'shorts' && <g>
          <path d="M89 273h122l-6 35-5 37h-35l-15-22-15 22h-35l-5-37z" fill="#526b79" />
          <path d="M98 282h104M150 313v13" fill="none" stroke="#78909b" strokeLinecap="round" strokeWidth="2" opacity=".7" />
        </g>}
        {outfit.trousers && outfit.trousers !== 'shorts' && <g>
          <path d="M89 273h122l-6 35-8 97h-41l-7-82-7 82h-41l-8-97z" fill={trousersFill} />
          <path d="M98 282h104M150 313v19M110 391l2 11M190 391l-2 11" fill="none" stroke="#78909b" strokeLinecap="round" strokeWidth="2" opacity=".7" />
        </g>}
        {outfit.socks && <g fill={socksFill}>
          <path d={outfit.socks === 'thermal-socks' ? 'M102 378h37v33h-37z' : 'M102 391h37v20h-37z'} />
          <path d={outfit.socks === 'thermal-socks' ? 'M160 378h37v33h-37z' : 'M160 391h37v20h-37z'} />
        </g>}
        <path d="M105 401h32v12c0 6 8 9 16 15l3 3c3 4 1 8-5 8H96c-6 0-9-5-6-10z" fill="url(#skin)" />
        <path d="M163 401h32v12c0 6 9 9 17 15l4 3c3 4 1 8-5 8h-53c-6 0-9-5-6-10z" fill="url(#skin)" />
        {outfit.shoes === 'sneakers' && <g>
          <path d="M104 401h34v12c0 6 8 9 16 15l3 3c3 4 1 8-5 8H96c-6 0-9-5-6-10z" fill="#f5f0e5" />
          <path d="M162 401h34v12c0 6 9 9 17 15l4 3c3 4 1 8-5 8h-53c-6 0-9-5-6-10z" fill="#f5f0e5" />
          <path d="M96 436h61M163 436h60M112 418l10 7M171 418l10 7" fill="none" stroke="#d4cfc2" strokeLinecap="round" strokeWidth="2" />
        </g>}
        {(outfit.shoes === 'flip-flops' || outfit.shoes === 'sandals') && <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M96 438h61M163 438h60" stroke="#9e7957" strokeWidth="4" />
          {outfit.shoes === 'flip-flops'
            ? <path d="M108 409l15 18 11-18M167 409l15 18 11-18" stroke="#755d48" strokeWidth="3" />
            : <path d="M103 414h38M109 410l14 20 14-20M164 414h38M170 410l14 20 14-20" stroke="#b38360" strokeWidth="4" />}
        </g>}
        {['rain-boots', 'heavy-boots', 'shearling-boots'].includes(outfit.shoes) && <g>
          <path d="M101 360h38v42c0 6 8 10 16 16l5 4c4 4 2 9-5 9H96c-6 0-9-5-6-10l11-22z" fill={bootFill} />
          <path d="M162 360h34v42c0 6 9 10 17 16l5 4c4 4 2 9-5 9h-53c-6 0-9-5-6-10l14-22z" fill={bootFill} />
          <path d="M95 436h67M162 436h61M102 363h36M163 363h32" fill="none" stroke={outfit.shoes === 'shearling-boots' ? '#e5c7ab' : '#3f4038'} strokeLinecap="round" strokeWidth="3" />
        </g>}
        {(outfit.tee || outfit.knit || outfit.jacket) && <path d="M85 162c15-12 31-18 65-18s50 6 65 18l-3 127H87z" fill={outfit.jacket ? jacketFill : outfit.knit ? knitFill : teeFill} />}
        {outfit.tee && <g>
          <path d="M112 149l-30 11-25 43 27 16 14-24zM188 149l30 11 25 43-27 16-14-24z" fill={teeFill} />
          <path d="M134 146c4 11 28 11 32 0" fill="none" stroke="#b94d3b" strokeWidth="4" />
        </g>}
        {outfit.knit && <g>
          <path d="M85 162c15-12 31-18 65-18s50 6 65 18l-3 127H87z" fill={knitFill} />
          <path d="M108 148l-25 12-27 44 29 18 14-22zM192 148l25 12 27 44-29 18-14-22z" fill={knitFill} />
          <path d="M88 165l-10 33M212 165l10 33M99 270h102" fill="none" stroke="#78998e" strokeLinecap="round" strokeWidth="3" opacity=".8" />
          <path d="M133 146c4 11 30 11 34 0" fill="none" stroke="#3f625a" strokeWidth="4" />
        </g>}
        {outfit.jacket && <g>
          <path d="M105 148l-27 14-27 46 32 18 13-23zM195 148l27 14 27 46-32 18-13-23z" fill={jacketFill} />
          <path d="M119 148l31 24 31-24 15 140H104z" fill={jacketFill} />
          <path d="M150 173v107M121 190l15 12M179 190l-15 12" fill="none" stroke="#a9762d" strokeWidth="2" />
        </g>}
        {outfit.jacket && outfit.tee && <path d="M85 162l-29 46 28 17 14-22M215 162l29 46-28 17-14-22" fill={jacketFill} />}
      </g>
    </svg>
  )
}

function App() {
  const [gender, setGender] = useState('woman')
  const [weight, setWeight] = useState(75)
  const [theme, setTheme] = useState(() => (
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  ))
  const [outfit, setOutfit] = useState(defaultOutfit)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const temperature = useMemo(() => {
    const warmth = Object.entries(outfit).reduce((total, [type, selectedId]) => {
      const selectedItem = clothing[type].options.find((item) => item.id === selectedId)
      return total + (selectedItem?.warmth ?? 0)
    }, 0)
    const bodyAdjustment = (75 - weight) * 0.04 + (gender === 'woman' ? 1 : -1)
    const low = Math.round(26 - warmth * 2.2 + bodyAdjustment)
    const high = low + 8
    const position = Math.min(78, Math.max(22, Math.round(52 - (warmth - 2.9) * 6 + bodyAdjustment * 2)))
    return { low, high, min: low - 10, max: high + 8, feels: Math.round((low + high) / 2), position }
  }, [gender, outfit, weight])

  const selectedItems = Object.entries(outfit).flatMap(([type, selectedId]) => {
    const selectedItem = clothing[type].options.find((item) => item.id === selectedId)
    return selectedItem ? [selectedItem] : []
  })

  function chooseClothing(type, selectedId) {
    setOutfit((current) => ({ ...current, [type]: selectedId }))
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Layer home">
          <span className="brand-mark"><span /><span /><span /></span>
          <span>layer<span className="brand-period">.</span></span>
        </a>
        <span className="topbar-note">A little more comfortable, everywhere.</span>
        <div className="topbar-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          >
            <span className="theme-toggle-icon" aria-hidden="true">{theme === 'dark' ? '☼' : '☾'}</span>
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <button className="reset-button" type="button" onClick={() => setOutfit({ ...defaultOutfit })}>
            <span aria-hidden="true">↺</span> Reset outfit
          </button>
        </div>
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
          <div className="weight-control">
            <div className="weight-heading">
              <label htmlFor="avatar-weight">Avatar weight</label>
              <output htmlFor="avatar-weight">{weight} kg</output>
            </div>
            <input
              id="avatar-weight"
              type="range"
              min="45"
              max="140"
              step="1"
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value))}
            />
            <div className="weight-range"><span>45 kg</span><span>140 kg</span></div>
            <p>Illustrative body shape at a fixed height.</p>
          </div>

          <div className="section-rule" />
          <div className="category-heading"><span className="category-icon hat-icon" aria-hidden="true">⌒</span><div><h3>On your head</h3><span>One easy extra</span></div></div>
          <GarmentPicker type="hat" selectedId={outfit.hat} onSelect={chooseClothing} />

          <div className="section-rule" />
          <div className="category-heading"><span className="category-icon top-icon" aria-hidden="true">↟</span><div><h3>Top layers</h3><span>Mix and match</span></div></div>
          <div className="option-stack">
            {['tee', 'knit', 'jacket'].map((type) => <GarmentPicker key={type} type={type} selectedId={outfit[type]} onSelect={chooseClothing} />)}
          </div>
          <p className="layer-tip"><span aria-hidden="true">✳</span> Layers trap warmth. Add one at a time.</p>
        </aside>

        <div className="avatar-stage">
          <div className="stage-note"><span className="live-dot" /> LIVE PREVIEW</div>
          <div className="avatar-halo" />
          <Avatar gender={gender} outfit={outfit} weight={weight} />
          <div className="avatar-caption"><span>{gender === 'woman' ? 'Maya' : 'Alex'}</span><small>ready for the day</small></div>
          <div className="outfit-chips" aria-label="Selected clothing">
            {selectedItems.map((item) => (
              <span className="outfit-chip" key={item.id}>{item.label}</span>
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
            {['trousers', 'socks', 'shoes'].map((type) => <GarmentPicker key={type} type={type} selectedId={outfit[type]} onSelect={chooseClothing} />)}
          </div>

          <div className="weather-note">
            <div className="note-icon" aria-hidden="true">☀</div>
            <div><strong>A tiny forecast note</strong><p>This rough estimate includes your clothing, avatar selection, and weight (at the same height). Wind, sun, and personal comfort still matter.</p></div>
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
