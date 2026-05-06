import React, { useState, useRef, useEffect } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export function PersonCard({ person, onDelete, onRename, isDragOverlay = false }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(person.name)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  function handleDoubleClick(e) {
    if (isDragOverlay) return
    e.stopPropagation()
    setDraft(person.name)
    setEditing(true)
  }

  function commitEdit() {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== person.name && onRename) {
      onRename(person.id, trimmed)
    }
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') setEditing(false)
  }

  function handleDelete(e) {
    e.stopPropagation()
    if (window.confirm(`Remove ${person.name} from the roster?`)) {
      onDelete(person.id)
    }
  }

  return (
    <div
      className="person-card group relative flex items-center rounded-md overflow-hidden select-none"
      style={{
        backgroundColor: 'white',
        border: '1px solid #E2E8F0',
        boxShadow: isDragOverlay
          ? '0 8px 24px rgba(0,0,0,0.15)'
          : '0 1px 3px rgba(0,0,0,0.07)',
        transform: isDragOverlay ? 'rotate(2deg)' : 'none',
        opacity: isDragOverlay ? 0.95 : 1,
        minWidth: '80px',
        maxWidth: '160px',
      }}
    >
      <div
        className="w-1.5 self-stretch flex-shrink-0"
        style={{ backgroundColor: person.color, minHeight: '28px' }}
      />
      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          className="text-slate-700 text-sm font-medium px-2 py-1 flex-1 outline-none border-none bg-blue-50"
          style={{ minWidth: 0, width: '100px' }}
        />
      ) : (
        <span
          className="text-slate-700 text-sm font-medium px-2 py-1.5 truncate flex-1 cursor-text"
          title={`${person.name} — double-click to rename`}
          onDoubleClick={handleDoubleClick}
        >
          {person.name}
        </span>
      )}
      {!isDragOverlay && !editing && onDelete && (
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity pr-1.5 pl-0.5 text-slate-400 hover:text-red-500 flex-shrink-0 text-xs leading-none"
          title="Remove person"
        >
          ×
        </button>
      )}
    </div>
  )
}

export function DraggablePersonCard({ person, onDelete, onRename }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: person.id,
    data: { person },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : 'auto',
    position: 'relative',
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <PersonCard person={person} onDelete={onDelete} onRename={onRename} />
    </div>
  )
}
