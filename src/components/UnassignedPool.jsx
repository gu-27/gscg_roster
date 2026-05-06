import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { DraggablePersonCard } from './PersonCard.jsx'

export default function UnassignedPool({ people, onDelete, onRename }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'unassigned' })

  const unassigned = people.filter((p) => p.role === null || p.classYear === null)

  return (
    <div className="px-4 pt-4 pb-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
          Unassigned
        </span>
        <span
          className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: '#64748B' }}
        >
          {unassigned.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className="flex flex-wrap gap-2 p-3 rounded-xl min-h-[56px] transition-colors"
        style={{
          backgroundColor: isOver ? '#EFF6FF' : '#F8FAFC',
          border: isOver ? '2px dashed #3B82F6' : '2px dashed #CBD5E1',
        }}
      >
        {unassigned.length === 0 ? (
          <span className="text-slate-400 text-sm self-center">
            All team members are assigned
          </span>
        ) : (
          unassigned.map((person) => (
            <DraggablePersonCard key={person.id} person={person} onDelete={onDelete} onRename={onRename} />
          ))
        )}
      </div>
    </div>
  )
}
