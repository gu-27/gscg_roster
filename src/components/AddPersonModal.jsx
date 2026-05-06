import React, { useState, useEffect, useRef } from 'react'

const COLORS = [
  '#DBEAFE',
  '#D1FAE5',
  '#FEF3C7',
  '#FCE7F3',
  '#EDE9FE',
  '#FFEDD5',
  '#E0F2FE',
  '#F0FDF4',
]

const COLOR_BORDERS = {
  '#DBEAFE': '#93C5FD',
  '#D1FAE5': '#6EE7B7',
  '#FEF3C7': '#FCD34D',
  '#FCE7F3': '#F9A8D4',
  '#EDE9FE': '#C4B5FD',
  '#FFEDD5': '#FED7AA',
  '#E0F2FE': '#7DD3FC',
  '#F0FDF4': '#86EFAC',
}

export default function AddPersonModal({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd(trimmed, selectedColor)
    setName('')
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(15,23,42,0.5)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
        style={{ backgroundColor: 'white' }}
      >
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid #E2E8F0' }}
        >
          <h2 className="text-lg font-semibold text-slate-800">Add Person</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-600">Name</label>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name..."
              className="w-full px-3 py-2.5 rounded-lg text-sm text-slate-800 outline-none transition-shadow"
              style={{
                border: '1px solid #CBD5E1',
                boxShadow: 'none',
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid #3B82F6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)'
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid #CBD5E1'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">Card Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className="w-8 h-8 rounded-lg transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color
                      ? `2px solid ${COLOR_BORDERS[color] || '#94A3B8'}`
                      : '2px solid transparent',
                    outline: selectedColor === color ? `2px solid ${COLOR_BORDERS[color] || '#94A3B8'}` : 'none',
                    outlineOffset: '1px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div
            className="flex items-center gap-2 p-3 rounded-lg"
            style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}
          >
            <div
              className="w-1.5 rounded self-stretch flex-shrink-0"
              style={{ backgroundColor: selectedColor, minHeight: '28px' }}
            />
            <span className="text-sm text-slate-600 font-medium">
              {name.trim() || 'Preview Name'}
            </span>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 transition-colors"
              style={{ border: '1px solid #CBD5E1' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#F8FAFC' }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-40"
              style={{ backgroundColor: '#2563EB' }}
            >
              Add to Roster
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
