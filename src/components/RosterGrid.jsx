import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { DraggablePersonCard } from './PersonCard.jsx'

const ROLES = [
  { key: 'director',  label: 'Directors',       color: '#3B82F6', bg: '#EFF6FF' },
  { key: 'pm',        label: 'Project Managers', color: '#14B8A6', bg: '#F0FDFA' },
  { key: 'consultant',label: 'Consultants',      color: '#6366F1', bg: '#EEF2FF' },
  { key: 'associate', label: 'Associates',       color: '#A855F7', bg: '#FAF5FF' },
  { key: 'abroad',    label: 'Study Abroad',     color: '#F59E0B', bg: '#FFFBEB' },
  { key: 'ondeck',    label: 'On Deck',          color: '#64748B', bg: '#F8FAFC' },
]

const CLASS_YEARS = [
  { key: 'freshman',  label: 'Freshman'  },
  { key: 'sophomore', label: 'Sophomore' },
  { key: 'junior',    label: 'Junior'    },
  { key: 'senior',    label: 'Senior'    },
]

function GridCell({ droppableId, people, onDelete, onRename }) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId })

  return (
    <td
      ref={setNodeRef}
      className="align-top p-0"
      style={{
        minWidth: '110px',
        border: '1px solid #E2E8F0',
      }}
    >
      <div
        className="flex flex-wrap gap-1 p-2 transition-colors"
        style={{
          minHeight: '80px',
          backgroundColor: isOver ? '#EFF6FF' : 'transparent',
          outline: isOver ? '2px dashed #3B82F6' : people.length === 0 ? '1px dashed #CBD5E1' : 'none',
          outlineOffset: '-4px',
        }}
      >
        {people.map((person) => (
          <DraggablePersonCard key={person.id} person={person} onDelete={onDelete} onRename={onRename} />
        ))}
      </div>
    </td>
  )
}

export default function RosterGrid({ people, onDelete, onRename }) {
  return (
    <div className="px-4 pb-6 overflow-x-auto">
      <div
        className="rounded-xl overflow-hidden shadow-sm"
        style={{ backgroundColor: 'white', border: '1px solid #E2E8F0' }}
      >
        <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '150px' }} />
            {CLASS_YEARS.map((cy) => (
              <col key={cy.key} style={{ width: '1fr', minWidth: '110px' }} />
            ))}
          </colgroup>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              <th
                className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3"
                style={{ border: '1px solid #E2E8F0' }}
              >
                Role
              </th>
              {CLASS_YEARS.map((cy) => (
                <th
                  key={cy.key}
                  className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-3"
                  style={{ border: '1px solid #E2E8F0' }}
                >
                  {cy.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROLES.map((role) => (
              <tr key={role.key}>
                <td
                  className="px-3 py-3 align-middle"
                  style={{
                    border: '1px solid #E2E8F0',
                    borderLeft: `4px solid ${role.color}`,
                    backgroundColor: role.bg,
                  }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: role.color }}
                  >
                    {role.label}
                  </span>
                </td>
                {CLASS_YEARS.map((cy) => {
                  const cellPeople = people.filter(
                    (p) => p.role === role.key && p.classYear === cy.key
                  )
                  const droppableId = `${role.key}-${cy.key}`
                  return (
                    <GridCell
                      key={droppableId}
                      droppableId={droppableId}
                      people={cellPeople}
                      onDelete={onDelete}
                      onRename={onRename}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
