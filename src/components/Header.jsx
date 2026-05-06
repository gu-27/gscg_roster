import React from 'react'

export default function Header({ onAddPerson, onReset }) {
  function handleReset() {
    if (window.confirm('Reset roster to seed state? All current assignments will be lost.')) {
      onReset()
    }
  }

  return (
    <header
      style={{ backgroundColor: '#0F172A' }}
      className="flex items-center justify-between px-6 py-4 shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div
          style={{ backgroundColor: '#2563EB' }}
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        >
          <span className="text-white font-bold text-xl leading-none">G</span>
        </div>
        <div>
          <h1 className="text-white font-bold text-xl leading-tight">GSCG Roster</h1>
          <p className="text-slate-400 text-sm leading-tight">Team Planning Board</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 border border-slate-600 hover:border-slate-400 hover:text-white transition-colors"
        >
          Reset
        </button>
        <button
          onClick={onAddPerson}
          style={{ backgroundColor: '#2563EB' }}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span>
          Add Person
        </button>
      </div>
    </header>
  )
}
