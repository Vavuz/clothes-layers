import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const clothing = {
  head: {
    label: 'Head & neck',
    options: [
      { id: 'wool-beanie', slot: 'hat', label: 'Wool beanie', detail: 'Dense, less breathable knit', warmth: 1.1 },
      { id: 'merino-beanie', slot: 'hat', label: 'Merino wool beanie', detail: 'Soft, breathable natural knit', warmth: 0.8 },
      { id: 'cashmere-beanie', slot: 'hat', label: 'Cashmere beanie', detail: 'Fine, insulating knit', warmth: 1 },
      { id: 'fleece-beanie', slot: 'hat', label: 'Fleece beanie', detail: 'Light synthetic warmth', warmth: 0.9 },
      { id: 'acrylic-beanie', slot: 'hat', label: 'Acrylic knit beanie', detail: 'Easy-care everyday warmth', warmth: 0.9 },
      { id: 'cotton-cap', slot: 'hat', label: 'Cotton cap', detail: 'Light sun cover', warmth: 0.2 },
      { id: 'waxed-cap', slot: 'hat', label: 'Waxed cotton cap', detail: 'Wind- and water-resistant', warmth: 0.4 },
      { id: 'linen-hat', slot: 'hat', label: 'Linen bucket hat', detail: 'Airy shade for sunny days', warmth: 0.2 },
      { id: 'straw-hat', slot: 'hat', label: 'Straw sun hat', detail: 'Breathable shade with a wide brim', warmth: 0.1 },
      { id: 'rain-hat', slot: 'hat', label: 'Nylon rain hat', detail: 'Water-resistant coverage', warmth: 0.3 },
      { id: 'earmuffs', slot: 'hat', label: 'Fleece earmuffs', detail: 'Warm ears, open top', warmth: 0.5 },
      { id: 'wool-scarf', slot: 'scarf', label: 'Wool scarf', detail: 'Classic warm neck layer', warmth: 1 },
      { id: 'chunky-wool-scarf', slot: 'scarf', label: 'Chunky wool scarf', detail: 'Thick, cozy neck coverage', warmth: 1.4 },
      { id: 'cashmere-scarf', slot: 'scarf', label: 'Cashmere scarf', detail: 'Soft, lightweight warmth', warmth: 0.9 },
      { id: 'cotton-scarf', slot: 'scarf', label: 'Cotton scarf', detail: 'Light everyday coverage', warmth: 0.4 },
      { id: 'linen-scarf', slot: 'scarf', label: 'Linen scarf', detail: 'Airy cover for mild weather', warmth: 0.3 },
      { id: 'silk-scarf', slot: 'scarf', label: 'Silk scarf', detail: 'Smooth, featherlight layer', warmth: 0.2 },
      { id: 'fleece-neck-warmer', slot: 'scarf', label: 'Fleece neck warmer', detail: 'Soft synthetic neck insulation', warmth: 1.1 },
      { id: 'merino-balaclava', slot: 'balaclava', label: 'Merino wool balaclava', detail: 'Warm face and head coverage', warmth: 1.5 },
      { id: 'fleece-balaclava', slot: 'balaclava', label: 'Fleece balaclava', detail: 'Cozy full-face coverage', warmth: 1.6 },
      { id: 'synthetic-balaclava', slot: 'balaclava', label: 'Synthetic thermal balaclava', detail: 'Quick-drying cold-weather cover', warmth: 1.4 },
    ],
  },
  upperbody: {
    label: 'Upper body & hands',
    options: [
      { id: 'cotton-tee', slot: 'tee', label: 'Cotton T-shirt', detail: 'Breathable everyday layer', warmth: 1 },
      { id: 'linen-shirt', slot: 'tee', label: 'Linen shirt', detail: 'Cool, airy natural fiber', warmth: 0.8 },
      { id: 'viscose-top', slot: 'tee', label: 'Viscose top', detail: 'Soft, lightweight drape', warmth: 0.8 },
      { id: 'silk-blouse', slot: 'tee', label: 'Silk blouse', detail: 'Light, smooth base layer', warmth: 0.9 },
      { id: 'cotton-long-sleeve', slot: 'tee', label: 'Cotton long-sleeve shirt', detail: 'Extra arm coverage for mild days', warmth: 1.4 },
      { id: 'merino-tee', slot: 'tee', label: 'Merino wool T-shirt', detail: 'Light, naturally warm wool', warmth: 1.5 },
      { id: 'thermal-tee', slot: 'tee', label: 'Polyester thermal top', detail: 'Warm, quick-drying base layer', warmth: 1.8 },
      { id: 'wool-turtleneck', slot: 'tee', label: 'Wool turtleneck', detail: 'Warm neck and torso coverage', warmth: 2.2 },
      { id: 'cotton-sweatshirt', slot: 'knit', label: 'Cotton sweatshirt', detail: 'Soft, midweight layer', warmth: 2 },
      { id: 'wool-jumper', slot: 'knit', label: 'Wool jumper', detail: 'Warm natural insulation', warmth: 2.8 },
      { id: 'cashmere-jumper', slot: 'knit', label: 'Cashmere jumper', detail: 'Lightweight, luxurious warmth', warmth: 2.6 },
      { id: 'poly-fleece', slot: 'knit', label: 'Polyester fleece', detail: 'Light synthetic warmth', warmth: 2.4 },
      { id: 'acrylic-jumper', slot: 'knit', label: 'Acrylic jumper', detail: 'Easy-care midweight knit', warmth: 2.2 },
      { id: 'fleece-hoodie', slot: 'knit', label: 'Fleece hoodie', detail: 'Cozy hooded synthetic layer', warmth: 2.7 },
      { id: 'chunky-knit', slot: 'knit', label: 'Chunky alpaca knit', detail: 'A very warm natural layer', warmth: 3.3 },
      { id: 'denim-jacket', slot: 'jacket', label: 'Denim jacket', detail: 'Light everyday outer layer', warmth: 1.6 },
      { id: 'windbreaker', slot: 'jacket', label: 'Nylon windbreaker', detail: 'Light wind protection', warmth: 1.4 },
      { id: 'raincoat', slot: 'jacket', label: 'Waterproof raincoat', detail: 'Sealed shell for wet weather', warmth: 1.8 },
      { id: 'leather-jacket', slot: 'jacket', label: 'Leather jacket', detail: 'Wind-blocking outer layer', warmth: 2 },
      { id: 'softshell-jacket', slot: 'jacket', label: 'Polyester softshell jacket', detail: 'Stretchy wind-resistant layer', warmth: 2.1 },
      { id: 'wool-coat', slot: 'jacket', label: 'Wool coat', detail: 'Warm structured layer', warmth: 2.8 },
      { id: 'synthetic-puffer', slot: 'jacket', label: 'Synthetic insulated jacket', detail: 'Warm, quick-drying fill', warmth: 3.1 },
      { id: 'puffer-jacket', slot: 'jacket', label: 'Down puffer jacket', detail: 'High-warmth insulated layer', warmth: 3.5 },
      { id: 'winter-parka', slot: 'jacket', label: 'Insulated winter parka', detail: 'Long, high-coverage cold-weather coat', warmth: 4 },
      { id: 'cotton-gloves', slot: 'gloves', label: 'Cotton gloves', detail: 'Light everyday hand cover', warmth: 0.4 },
      { id: 'wool-gloves', slot: 'gloves', label: 'Merino wool gloves', detail: 'Soft natural hand warmth', warmth: 0.8 },
      { id: 'fleece-gloves', slot: 'gloves', label: 'Fleece gloves', detail: 'Cozy synthetic insulation', warmth: 1 },
      { id: 'wool-mittens', slot: 'gloves', label: 'Wool mittens', detail: 'Extra-warm shared-finger design', warmth: 1.3 },
      { id: 'leather-gloves', slot: 'gloves', label: 'Leather gloves', detail: 'Wind-resistant outer layer', warmth: 0.7 },
      { id: 'neoprene-gloves', slot: 'gloves', label: 'Neoprene gloves', detail: 'Water-resistant coverage', warmth: 1.2 },
      { id: 'ski-gloves', slot: 'gloves', label: 'Insulated ski gloves', detail: 'Water-resistant winter hand cover', warmth: 1.5 },
    ],
  },
  lowerbody: {
    label: 'Lower body',
    options: [
      { id: 'cotton-trousers', slot: 'trousers', label: 'Cotton trousers', detail: 'Light everyday coverage', warmth: 1.4 },
      { id: 'linen-trousers', slot: 'trousers', label: 'Linen trousers', detail: 'Cool, breathable weave', warmth: 1 },
      { id: 'polyester-trousers', slot: 'trousers', label: 'Synthetic polyester trousers', detail: 'Quick-drying everyday coverage', warmth: 1.3 },
      { id: 'nylon-hiking-trousers', slot: 'trousers', label: 'Nylon hiking trousers', detail: 'Light wind-resistant outdoor layer', warmth: 1.4 },
      { id: 'denim-jeans', slot: 'trousers', label: 'Denim jeans', detail: 'Midweight cotton denim', warmth: 1.8 },
      { id: 'cargo-trousers', slot: 'trousers', label: 'Cotton cargo trousers', detail: 'Durable, roomy everyday style', warmth: 1.7 },
      { id: 'wool-trousers', slot: 'trousers', label: 'Wool trousers', detail: 'Warm natural-fiber layer', warmth: 2.2 },
      { id: 'shorts', slot: 'trousers', label: 'Cotton shorts', detail: 'Cool, lightweight coverage', warmth: 0.2 },
      { id: 'leggings', slot: 'trousers', label: 'Polyester leggings', detail: 'Light stretch layer', warmth: 1.1 },
      { id: 'bamboo-leggings', slot: 'trousers', label: 'Bamboo leggings', detail: 'Soft, breathable stretch', warmth: 1.2 },
      { id: 'thermal-leggings', slot: 'trousers', label: 'Fleece-lined leggings', detail: 'Extra warmth underneath', warmth: 2 },
      { id: 'softshell-trousers', slot: 'trousers', label: 'Softshell trousers', detail: 'Stretchy, wind-resistant layer', warmth: 2 },
      { id: 'waterproof-trousers', slot: 'trousers', label: 'Waterproof overtrousers', detail: 'Light shell for wet weather', warmth: 1.5 },
      { id: 'fleece-joggers', slot: 'trousers', label: 'Polyester fleece joggers', detail: 'Soft, warm casual layer', warmth: 2.1 },
      { id: 'corduroy-trousers', slot: 'trousers', label: 'Corduroy trousers', detail: 'Textured cotton warmth', warmth: 1.9 },
    ],
  },
  feet: {
    label: 'Feet',
    options: [
      { id: 'cotton-socks', slot: 'socks', label: 'Cotton socks', detail: 'Light everyday pair', warmth: 0.6 },
      { id: 'bamboo-socks', slot: 'socks', label: 'Bamboo socks', detail: 'Light, breathable pair', warmth: 0.5 },
      { id: 'synthetic-socks', slot: 'socks', label: 'Synthetic sport socks', detail: 'Moisture-wicking activewear', warmth: 0.6 },
      { id: 'silk-socks', slot: 'socks', label: 'Silk socks', detail: 'Fine, lightweight layer', warmth: 0.4 },
      { id: 'wool-socks', slot: 'socks', label: 'Merino wool socks', detail: 'Warm natural fiber', warmth: 1 },
      { id: 'hiking-socks', slot: 'socks', label: 'Thick hiking socks', detail: 'Cushioned wool-blend warmth', warmth: 1.2 },
      { id: 'cashmere-socks', slot: 'socks', label: 'Cashmere socks', detail: 'Soft, insulating comfort', warmth: 1.2 },
      { id: 'thermal-socks', slot: 'socks', label: 'Thermal fleece socks', detail: 'Extra-cozy cold-weather pair', warmth: 1.5 },
      { id: 'waterproof-socks', slot: 'socks', label: 'Waterproof membrane socks', detail: 'Helps keep feet dry outdoors', warmth: 1.1 },
      { id: 'sneakers', slot: 'shoes', label: 'Canvas sneakers', detail: 'Everyday lightweight shoes', warmth: 0.5 },
      { id: 'trail-runners', slot: 'shoes', label: 'Synthetic trail runners', detail: 'Light grip for outdoor walks', warmth: 0.5 },
      { id: 'leather-shoes', slot: 'shoes', label: 'Leather shoes', detail: 'Classic closed footwear', warmth: 0.7 },
      { id: 'walking-shoes', slot: 'shoes', label: 'Synthetic walking shoes', detail: 'Light, supportive everyday pair', warmth: 0.6 },
      { id: 'flip-flops', slot: 'shoes', label: 'Flip-flops', detail: 'Open, minimal footwear', warmth: 0.1 },
      { id: 'sandals', slot: 'shoes', label: 'Leather sandals', detail: 'Open summer footwear', warmth: 0.1 },
      { id: 'rain-boots', slot: 'shoes', label: 'Rubber rain boots', detail: 'Waterproof coverage', warmth: 1 },
      { id: 'synthetic-boots', slot: 'shoes', label: 'Synthetic hiking boots', detail: 'Durable outdoor coverage', warmth: 1.4 },
      { id: 'heavy-boots', slot: 'shoes', label: 'Leather boots', detail: 'Sturdy, warm footwear', warmth: 1.8 },
      { id: 'shearling-boots', slot: 'shoes', label: 'Shearling-lined boots', detail: 'Very warm lined boots', warmth: 2.2 },
      { id: 'winter-boots', slot: 'shoes', label: 'Insulated winter boots', detail: 'Warm lining and weather cover', warmth: 2.4 },
    ],
  },
}

const hairstyles = [
  { id: 'bald', label: 'Bald', warmth: 0 },
  { id: 'normal', label: 'Normal', warmth: 0.2 },
  { id: 'long', label: 'Long', warmth: 0.3 },
]

const clothingSelectionLimits = {
  head: 5,
  upperbody: 8,
  lowerbody: 6,
  feet: 5,
}

const MAX_WARMTH_EFFECT = 40
const WARMTH_DECAY = 0.07

function makeDefaultOutfit() {
  return {
    head: ['wool-beanie'],
    upperbody: ['cotton-tee'],
    lowerbody: ['cotton-trousers'],
    feet: ['sneakers'],
  }
}

function GarmentPicker({ type, selectedIds, onToggle, maxItems }) {
  const category = clothing[type]
  const selectedItems = category.options.filter((item) => selectedIds.includes(item.id))
  const isAtLimit = selectedIds.length >= maxItems
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef(null)
  const matchingItems = category.options.filter((item) => (
    `${item.label} ${item.detail}`.toLowerCase().includes(search.trim().toLowerCase())
  ))
  const searchResults = [
    ...matchingItems.filter((item) => selectedIds.includes(item.id)),
    ...matchingItems.filter((item) => !selectedIds.includes(item.id)),
  ]

  useEffect(() => {
    if (!isOpen) return undefined

    function closeOnOutsideClick(event) {
      if (!pickerRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [isOpen])

  return (
    <details
      ref={pickerRef}
      className={`clothing-option${selectedItems.length ? ' is-selected' : ''}`}
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary aria-label={`${category.label}, ${category.options.length} available items, ${selectedItems.length} of ${maxItems} allowed selected`}>
        <span className="item-mark" aria-hidden="true">{type === 'head' ? '⌒' : type === 'upperbody' ? '↟' : type === 'lowerbody' ? 'Ⅱ' : '◡'}</span>
        <span className="option-copy">
          <span className="option-name-row">
            <span className="option-name">{category.label}</span>
            <span className="item-count" aria-hidden="true">{category.options.length}</span>
          </span>
          <span className="option-detail">{selectedItems.length ? `${selectedItems.length}/${maxItems} selected · ${selectedItems.map((item) => item.label).join(', ')}` : `Choose up to ${maxItems} items`}</span>
        </span>
        <span className="picker-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div className="picker-list">
        <div className="picker-search-wrap">
          <input
            className="picker-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search ${category.label.toLowerCase()}...`}
            aria-label={`Search ${category.label}`}
          />
        </div>
        {isAtLimit && <p className="picker-limit-note" role="status">Limit reached ({maxItems} items). Remove one to choose another.</p>}
        {searchResults.length ? searchResults.map((item) => {
          const isSelected = selectedIds.includes(item.id)
          return (
            <label className={`picker-item${isSelected ? ' is-checked' : ''}${isAtLimit && !isSelected ? ' is-disabled' : ''}`} key={item.id}>
              <input
                type="checkbox"
                checked={isSelected}
                disabled={isAtLimit && !isSelected}
                onChange={() => onToggle(type, item.id)}
              />
              <span className="picker-item-copy">
                <span className="picker-item-name">{item.label}</span>
                <span className="picker-item-detail">{item.detail}</span>
              </span>
              <span className="warmth-rating" aria-label={`${item.warmth} warmth`}>+{item.warmth.toFixed(1)}</span>
            </label>
          )
        }) : <p className="picker-empty">No items match “{search}”.</p>}
      </div>
    </details>
  )
}

function Avatar({ age, gender, height, hairstyle, outfit, weight }) {
  const isWoman = gender === 'woman'
  const widthScale = weight <= 75
    ? 0.8 + ((weight - 45) / 30) * 0.2
    : 1 + ((weight - 75) / 65) * 0.35
  const heightScale = 0.94 + ((height - 145) / 55) * 0.1
  const ageLineOpacity = Math.max(0, Math.min(0.55, ((age - 25) / 65) * 0.55))
  const teeFill = outfit.tee === 'merino-tee' ? 'url(#knit)' : outfit.tee === 'thermal-tee' ? '#6e6c83' : outfit.tee === 'linen-shirt' ? '#9a876b' : outfit.tee === 'silk-blouse' ? '#987d95' : outfit.tee === 'viscose-top' ? '#9a7182' : outfit.tee === 'wool-turtleneck' ? '#647969' : outfit.tee === 'cotton-long-sleeve' ? '#a85649' : 'url(#tee)'
  const knitFill = outfit.knit === 'cotton-sweatshirt' ? '#7d9284' : outfit.knit === 'poly-fleece' || outfit.knit === 'fleece-hoodie' ? '#596f9b' : outfit.knit === 'chunky-knit' ? '#96724d' : outfit.knit === 'cashmere-jumper' ? '#936f72' : outfit.knit === 'acrylic-jumper' ? '#947d5c' : 'url(#knit)'
  const jacketFill = outfit.jacket === 'denim-jacket' ? '#4f6e8d' : outfit.jacket === 'windbreaker' || outfit.jacket === 'softshell-jacket' ? '#51908b' : outfit.jacket === 'raincoat' ? '#637d76' : outfit.jacket === 'leather-jacket' ? '#755343' : outfit.jacket === 'wool-coat' ? '#8c6854' : outfit.jacket === 'synthetic-puffer' ? '#63769a' : outfit.jacket === 'winter-parka' ? '#526c54' : outfit.jacket === 'puffer-jacket' ? '#a98746' : 'url(#jacket)'
  const trousersFill = outfit.trousers === 'leggings' || outfit.trousers === 'bamboo-leggings' ? '#6a6579' : outfit.trousers === 'thermal-leggings' ? '#4e5263' : outfit.trousers === 'denim-jeans' ? '#405d72' : outfit.trousers === 'wool-trousers' ? '#786656' : outfit.trousers === 'linen-trousers' ? '#92866d' : outfit.trousers === 'corduroy-trousers' ? '#805c48' : outfit.trousers === 'polyester-trousers' || outfit.trousers === 'fleece-joggers' ? '#586d83' : outfit.trousers === 'nylon-hiking-trousers' || outfit.trousers === 'softshell-trousers' || outfit.trousers === 'waterproof-trousers' ? '#536f68' : outfit.trousers === 'cargo-trousers' ? '#71805b' : 'url(#pants)'
  const socksFill = outfit.socks === 'thermal-socks' || outfit.socks === 'hiking-socks' ? '#d9d4c2' : outfit.socks === 'wool-socks' || outfit.socks === 'cashmere-socks' ? '#e5ddd0' : outfit.socks === 'bamboo-socks' ? '#e7eee1' : outfit.socks === 'silk-socks' ? '#e8dce4' : outfit.socks === 'synthetic-socks' || outfit.socks === 'waterproof-socks' ? '#d5e0e7' : '#f1eee1'
  const bootFill = outfit.shoes === 'rain-boots' ? '#b78d49' : outfit.shoes === 'heavy-boots' ? '#5c4b3b' : outfit.shoes === 'shearling-boots' ? '#8b6852' : outfit.shoes === 'synthetic-boots' ? '#596d67' : outfit.shoes === 'winter-boots' ? '#6b5b4b' : '#bd8b6a'
  const hatFill = outfit.hat === 'rain-hat' ? '#708d83' : outfit.hat === 'merino-beanie' ? '#748878' : outfit.hat === 'cashmere-beanie' ? '#8c6b7b' : outfit.hat === 'fleece-beanie' ? '#647d9a' : outfit.hat === 'acrylic-beanie' ? '#907b62' : outfit.hat === 'waxed-cap' ? '#596b55' : outfit.hat === 'linen-hat' ? '#b29a6c' : outfit.hat === 'straw-hat' ? '#c3a45e' : '#d8775b'
  const scarfFill = outfit.scarf === 'cashmere-scarf' ? '#96748d' : outfit.scarf === 'cotton-scarf' ? '#6c8c7c' : outfit.scarf === 'silk-scarf' ? '#b98b78' : outfit.scarf === 'chunky-wool-scarf' ? '#815c49' : outfit.scarf === 'linen-scarf' ? '#b29a6c' : outfit.scarf === 'fleece-neck-warmer' ? '#596f9b' : '#bd765e'

  return (
    <svg className="avatar-art" viewBox="0 0 300 470" role="img" aria-label={`${gender} avatar, age ${age}, height ${height} centimeters, with ${hairstyle} hair, wearing the selected outfit`}>
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
        <mask id="balaclava-eye-window" maskUnits="userSpaceOnUse">
          <rect width="300" height="470" fill="white" />
          <rect x="116" y="101" width="68" height="27" rx="12" fill="black" />
        </mask>
        <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="#475750" floodOpacity=".13" />
        </filter>
      </defs>
      <ellipse cx="151" cy="452" rx="91" ry="12" fill="#d9e2d9" />
      <g filter="url(#soft-shadow)" transform={`translate(150 440) scale(${widthScale} ${heightScale}) translate(-150 -440)`}>
        <path d={isWoman ? 'M116 153h68l16 116H100z' : 'M100 153h100l-16 116h-68z'} fill="#f2c5a2" />
        {hairstyle === 'long' && <path d="M92 75c-5-29 12-55 44-57 32-2 57 16 59 49l-6 68-18-8-7-58-58 2-5 65-19-6z" fill="#49372f" />}
        <path d={isWoman ? 'M126 104h47v44c-9 12-37 12-47 0z' : 'M126 105h47v43c-9 12-37 12-47 0z'} fill="url(#skin)" />
        {!isWoman && <path d="M101 90c0-33 19-53 50-53 32 0 50 21 49 55l-8 39c-7 17-22 28-42 28-21 0-35-11-43-28z" fill="url(#skin)" transform="translate(150 0) scale(.94 1) translate(-150 0)" />}
        {isWoman && <path d="M103 89c1-32 19-51 48-51 29 0 48 20 48 52l-6 41c-7 18-21 29-42 29-21 0-35-11-42-29z" fill="url(#skin)" transform="translate(150 0) scale(.94 1) translate(-150 0)" />}
        {hairstyle !== 'bald' && <path d={isWoman ? 'M102 91c-4-31 13-57 43-59 32-2 52 19 51 51-12-5-19-15-23-27-13 18-37 24-67 23z' : 'M101 93c-2-34 19-56 49-56 31 0 51 22 49 56-10-12-16-18-20-32-14 16-40 23-78 20z'} fill="#49372f" />}
        <path d="M126 108c5-4 12-4 17 0M159 108c5-4 12-4 17 0" fill="none" stroke="#6b4738" strokeLinecap="round" strokeWidth="2.5" />
        <ellipse cx="135" cy="119" rx="2.2" ry="3" fill="#41312b" />
        <ellipse cx="168" cy="119" rx="2.2" ry="3" fill="#41312b" />
        <path d="M143 137c5 4 11 4 16 0" fill="none" stroke="#a95e53" strokeLinecap="round" strokeWidth="2.5" />
        <g fill="none" stroke="#9e6758" strokeLinecap="round" strokeWidth="1.1" opacity={ageLineOpacity}>
          <path d="M129 98c3-2 7-2 10-1M161 97c4-1 7-1 10 1" />
          <path d="M126 117l-7-2M125 122l-7 2M174 117l7-2M175 122l7 2" />
        </g>
        <circle cx="119" cy="131" r="7" fill="#e99f85" opacity=".38" />
        <circle cx="183" cy="131" r="7" fill="#e99f85" opacity=".38" />
        {outfit.hat === 'earmuffs' && <g fill="#647d9a">
          <path d="M111 79c11-18 25-27 39-27s28 9 39 27l-5 5c-10-15-21-22-34-22s-24 7-34 22z" />
          <ellipse cx="106" cy="106" rx="8" ry="13" />
          <ellipse cx="194" cy="106" rx="8" ry="13" />
        </g>}
        {outfit.hat && outfit.hat !== 'earmuffs' && <g>
          <path d="M105 87c1-28 18-44 45-44s44 16 45 44z" fill={hatFill} />
          {['wool-beanie', 'merino-beanie', 'cashmere-beanie', 'fleece-beanie', 'acrylic-beanie'].includes(outfit.hat)
            ? <path d="M103 82h94v16h-94z" rx="8" fill="#bd5c47" />
            : <path d="M92 83h116l8 10c-39 11-91 11-132 0z" fill={outfit.hat === 'rain-hat' ? '#5f786f' : '#bd5c47'} />}
          {outfit.hat === 'wool-beanie' && <circle cx="150" cy="41" r="6" fill="#e9a47e" />}
        </g>}
        <path d="M88 166c-12 4-20 14-24 29l-20 91c-2 10 3 17 11 18 7 1 11-4 14-12l28-78z" fill="url(#skin)" />
        <path d="M212 166c12 4 20 14 24 29l20 91c2 10-3 17-11 18-7 1-11-4-14-12l-28-78z" fill="url(#skin)" />
        <path d="M103 276h42l4 39-9 85h-34l-3-91zM155 315l4-39h38l-4 38-3 86h-34z" fill="url(#skin)" />
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
          <path d={outfit.socks === 'thermal-socks' || outfit.socks === 'hiking-socks' || outfit.socks === 'waterproof-socks' ? 'M102 378h37v33h-37z' : 'M102 391h37v20h-37z'} />
          <path d={outfit.socks === 'thermal-socks' || outfit.socks === 'hiking-socks' || outfit.socks === 'waterproof-socks' ? 'M160 378h37v33h-37z' : 'M160 391h37v20h-37z'} />
        </g>}
        <path d="M105 401h32v12c0 6 8 9 16 15l3 3c3 4 1 8-5 8H96c-6 0-9-5-6-10z" fill="url(#skin)" />
        <path d="M163 401h32v12c0 6 9 9 17 15l4 3c3 4 1 8-5 8h-53c-6 0-9-5-6-10z" fill="url(#skin)" />
        {['sneakers', 'leather-shoes', 'trail-runners', 'walking-shoes'].includes(outfit.shoes) && <g>
          <path d="M104 401h34v12c0 6 8 9 16 15l3 3c3 4 1 8-5 8H96c-6 0-9-5-6-10z" fill="#f5f0e5" />
          <path d="M162 401h34v12c0 6 9 9 17 15l4 3c3 4 1 8-5 8h-53c-6 0-9-5-6-10z" fill="#f5f0e5" />
          <path d="M96 436h61M163 436h60M112 418l10 7M171 418l10 7" fill="none" stroke={outfit.shoes === 'leather-shoes' ? '#8d6448' : outfit.shoes === 'trail-runners' ? '#5b7c6c' : '#d4cfc2'} strokeLinecap="round" strokeWidth="2" />
        </g>}
        {(outfit.shoes === 'flip-flops' || outfit.shoes === 'sandals') && <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M96 438h61M163 438h60" stroke="#9e7957" strokeWidth="4" />
          {outfit.shoes === 'flip-flops'
            ? <path d="M108 409l15 18 11-18M167 409l15 18 11-18" stroke="#755d48" strokeWidth="3" />
            : <path d="M103 414h38M109 410l14 20 14-20M164 414h38M170 410l14 20 14-20" stroke="#b38360" strokeWidth="4" />}
        </g>}
        {['rain-boots', 'synthetic-boots', 'heavy-boots', 'shearling-boots', 'winter-boots'].includes(outfit.shoes) && <g>
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
        {outfit.scarf && <g>
          <path d="M126 143c8 7 39 7 48 0l6 19c-13 12-47 12-60 0z" fill={scarfFill} />
          <path d="M165 157l14 3-2 36-14-2z" fill={scarfFill} />
        </g>}
        {outfit.gloves && <g fill={outfit.gloves === 'leather-gloves' ? '#7b5745' : outfit.gloves === 'neoprene-gloves' ? '#4b6578' : '#687f70'}>
          <path d="M45 283c-6-2-9 3-7 9l4 13c2 6 12 7 16 2l6-11c3-6-3-11-8-8l-3 3-1-5c0-5-5-7-7-3z" />
          <path d="M255 283c6-2 9 3 7 9l-4 13c-2 6-12 7-16 2l-6-11c-3-6 3-11 8-8l3 3 1-5c0-5 5-7 7-3z" />
        </g>}
        {outfit.balaclava && <g>
          <path d="M107 91c5-22 20-34 43-34s39 12 43 34l-7 42c-6 18-19 27-36 27s-31-9-36-27z" fill={outfit.balaclava === 'fleece-balaclava' ? '#526c86' : '#7b7569'} mask="url(#balaclava-eye-window)" />
        </g>}
      </g>
    </svg>
  )
}

function App() {
  const [gender, setGender] = useState('woman')
  const [hairstyle, setHairstyle] = useState('normal')
  const [weight, setWeight] = useState(75)
  const [age, setAge] = useState(35)
  const [height, setHeight] = useState(170)
  const [temperatureUnit, setTemperatureUnit] = useState('C')
  const [theme, setTheme] = useState(() => (
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  ))
  const [outfit, setOutfit] = useState(makeDefaultOutfit)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const temperature = useMemo(() => {
    const clothingWarmth = Object.entries(outfit).reduce((total, [type, selectedId]) => {
      return total + selectedId.reduce((regionWarmth, id) => {
        const selectedItem = clothing[type].options.find((item) => item.id === id)
        return regionWarmth + (selectedItem?.warmth ?? 0)
      }, 0)
    }, 0)
    const hairWarmth = hairstyles.find((style) => style.id === hairstyle)?.warmth ?? 0
    const warmth = clothingWarmth + hairWarmth
    const effectiveWarmth = MAX_WARMTH_EFFECT * (1 - Math.exp(-WARMTH_DECAY * warmth))
    const ageAdjustment = -Math.max(0, age - 65) * 0.02
    const heightAdjustment = (Math.pow(height / 170, 0.725) - 1) * 1.5
    const bodyAdjustment = (75 - weight) * 0.04 + (gender === 'woman' ? 1 : -1) + ageAdjustment + heightAdjustment
    const low = Math.round(26 - effectiveWarmth + bodyAdjustment)
    const high = low + 8
    const effectiveLayers = effectiveWarmth / 2.2
    const position = Math.min(78, Math.max(22, Math.round(52 - (effectiveLayers - 2.9) * 6 + bodyAdjustment * 2)))
    const feels = Math.round((low + high) / 2)
    const hue = Math.round(Math.max(0, Math.min(220, 220 - (feels - 5) * 7)))
    return { low, high, min: low - 10, max: high + 8, feels, position, hue }
  }, [age, gender, height, hairstyle, outfit, weight])

  const displayTemperature = (celsius) => Math.round(
    temperatureUnit === 'C' ? celsius : celsius * 9 / 5 + 32,
  )

  const selectedItems = Object.entries(outfit).flatMap(([type, selectedIds]) => {
    return selectedIds.flatMap((id) => {
      const selectedItem = clothing[type].options.find((item) => item.id === id)
      return selectedItem ? [selectedItem] : []
    })
  })

  const avatarOutfit = selectedItems.reduce((itemsBySlot, item) => ({
    ...itemsBySlot,
    [item.slot]: item.id,
  }), {})

  function toggleClothing(type, selectedId) {
    setOutfit((current) => {
      const currentSelection = current[type]
      const isSelected = currentSelection.includes(selectedId)
      if (!isSelected && currentSelection.length >= clothingSelectionLimits[type]) return current

      return {
        ...current,
        [type]: isSelected
          ? currentSelection.filter((id) => id !== selectedId)
          : [...currentSelection, selectedId],
      }
    })
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
          <button className="reset-button" type="button" onClick={() => setOutfit(makeDefaultOutfit())}>
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
            <div className="metric-heading">
              <span className="metric-label">FEELS COMFIEST AT</span>
              <div className="temperature-unit-switch" role="group" aria-label="Temperature unit">
                {['C', 'F'].map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    className={temperatureUnit === unit ? 'active' : ''}
                    aria-label={unit === 'C' ? 'Celsius' : 'Fahrenheit'}
                    aria-pressed={temperatureUnit === unit}
                    onClick={() => setTemperatureUnit(unit)}
                  >
                    °{unit}
                  </button>
                ))}
              </div>
            </div>
            <span className="big-temp" style={{ '--temperature-hue': temperature.hue }}>{displayTemperature(temperature.feels)}<small>°{temperatureUnit}</small></span>
          </div>
          <div className="temp-range">
            <div className="range-top"><span>Comfort zone</span><strong>{displayTemperature(temperature.low)}° — {displayTemperature(temperature.high)}°{temperatureUnit}</strong></div>
            <div className="range-track" style={{ '--comfort-position': `${temperature.position}%` }}><span className="range-fill" /><i className="range-dot" /></div>
            <div className="range-ends"><span>Could go as low as <b>{displayTemperature(temperature.min)}°{temperatureUnit}</b></span><span>as high as <b>{displayTemperature(temperature.max)}°{temperatureUnit}</b></span></div>
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
            <p>Illustrative avatar proportions.</p>
          </div>
          <div className="weight-control">
            <div className="weight-heading">
              <label htmlFor="avatar-age">Age</label>
              <output htmlFor="avatar-age">{age} years</output>
            </div>
            <input
              id="avatar-age"
              type="range"
              min="18"
              max="90"
              step="1"
              value={age}
              onChange={(event) => setAge(Number(event.target.value))}
            />
            <div className="weight-range"><span>18 years</span><span>90 years</span></div>
          </div>
          <div className="weight-control">
            <div className="weight-heading">
              <label htmlFor="avatar-height">Height</label>
              <output htmlFor="avatar-height">{height} cm</output>
            </div>
            <input
              id="avatar-height"
              type="range"
              min="145"
              max="200"
              step="1"
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
            />
            <div className="weight-range"><span>145 cm</span><span>200 cm</span></div>
          </div>
          <div className="hair-style-control">
            <label id="hair-style-label">Hair style</label>
            <div className="hair-switch" role="group" aria-labelledby="hair-style-label">
              {hairstyles.map((style) => (
                <button key={style.id} type="button" className={hairstyle === style.id ? 'active' : ''} aria-pressed={hairstyle === style.id} onClick={() => setHairstyle(style.id)}>
                  <span>{style.label}</span>
                  <small>+{style.warmth.toFixed(1)}</small>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="avatar-stage">
          <div className="stage-note"><span className="live-dot" /> LIVE PREVIEW</div>
          <div className="avatar-halo" />
          <Avatar age={age} gender={gender} height={height} hairstyle={hairstyle} outfit={avatarOutfit} weight={weight} />
          <div className="avatar-caption"><span>{gender === 'woman' ? 'Maya' : 'Alex'}</span><small>ready for the day</small></div>
          <div className="outfit-chips" aria-label="Selected clothing">
            {selectedItems.map((item) => (
              <span className="outfit-chip" key={item.id}>{item.label}</span>
            ))}
          </div>
        </div>

        <aside className="control-panel right-panel">
          <div className="panel-heading">
            <span className="eyebrow">02 — BUILD YOUR OUTFIT</span>
            <h2>Choose your layers</h2>
          </div>
          <div className="option-stack">
            <GarmentPicker type="head" selectedIds={outfit.head} onToggle={toggleClothing} maxItems={clothingSelectionLimits.head} />
            <GarmentPicker type="upperbody" selectedIds={outfit.upperbody} onToggle={toggleClothing} maxItems={clothingSelectionLimits.upperbody} />
            <GarmentPicker type="lowerbody" selectedIds={outfit.lowerbody} onToggle={toggleClothing} maxItems={clothingSelectionLimits.lowerbody} />
            <GarmentPicker type="feet" selectedIds={outfit.feet} onToggle={toggleClothing} maxItems={clothingSelectionLimits.feet} />
          </div>
          <p className="layer-tip"><span aria-hidden="true">✳</span> Choose every layer you want; each item adds to your warmth estimate.</p>

          <div className="weather-note">
            <div className="note-icon" aria-hidden="true">☀</div>
            <div><strong>A tiny forecast note</strong><p>This playful estimate includes age, height, weight, hair, and clothing. It is not medical guidance; health, activity, humidity, and acclimation also affect comfort.</p></div>
          </div>

          <div className="quick-stats">
            <div><span className="stat-icon">♧</span><span>Items on</span><strong>{selectedItems.length}</strong></div>
            <div><span className="stat-icon warm-stat">⌁</span><span>Warmth level</span><strong>{temperature.feels > 25 ? 'Toasty' : temperature.feels < 16 ? 'Light' : 'Just right'}</strong></div>
          </div>
        </aside>
      </section>

      <footer className="page-footer">
        <span>Made for everyday comfort</span>
        <span>Just a guide — dress how you feel.</span>
        <span>© {new Date().getFullYear()} layer. · Developed by <a href="https://cricketdev.github.io/cricket-dev-website/" target="_blank" rel="noreferrer">CricketDev</a></span>
      </footer>
    </main>
  )
}

export default App
