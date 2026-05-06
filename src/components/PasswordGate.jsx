import React, { useState } from 'react'

const SESSION_KEY = 'gscg_roster_auth'
const PASSWORD = 'gonzaga2026'

export default function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  if (authed) return children

  function handleSubmit(e) {
    e.preventDefault()
    if (value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0f172a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'white', borderRadius: '16px', padding: '48px 40px',
        maxWidth: '380px', width: '90%', textAlign: 'center',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏟️</div>
        <h2 style={{
          fontFamily: 'system-ui, sans-serif', fontSize: '20px',
          fontWeight: 700, color: '#0f172a', margin: '0 0 6px',
        }}>
          GSCG Roster
        </h2>
        <p style={{
          fontFamily: 'system-ui, sans-serif', fontSize: '14px',
          color: '#64748b', margin: '0 0 28px',
        }}>
          Enter the access code to continue.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false) }}
            placeholder="Access code"
            autoFocus
            style={{
              width: '100%', boxSizing: 'border-box',
              border: `2px solid ${error ? '#cc0000' : '#e2e8f0'}`,
              borderRadius: '8px', padding: '12px 14px',
              fontSize: '15px', outline: 'none', marginBottom: '10px',
            }}
          />
          {error && (
            <div style={{ color: '#cc0000', fontSize: '13px', marginBottom: '10px' }}>
              Incorrect code. Try again.
            </div>
          )}
          <button type="submit" style={{
            width: '100%', background: '#1e3a5f', color: 'white',
            border: 'none', borderRadius: '8px', padding: '12px',
            fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          }}>
            Enter →
          </button>
        </form>
      </div>
    </div>
  )
}
