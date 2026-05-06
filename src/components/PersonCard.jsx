import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export function PersonCard({ person, onDelete, isDragOverlay = false }) {
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
        maxWidth: '140px',
      }}
    >
      <div
        className="w-1.5 self-stretch flex-shrink-0"
        style={{ backgroundColor: person.color, minHeight: '28px' }}
      />
      <span
        className="text-slate-700 text-sm font-medium px-2 py-1.5 truncate flex-1"
        title={person.name}
      >
        {person.name}
      </span>
      {!isDragOverlay && onDelete && (
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

export function DraggablePersonCard({ person, onDelete }) {
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
      <PersonCard person={person} onDelete={onDelete} />
    </div>
  )
}
