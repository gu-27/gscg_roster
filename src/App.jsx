import React, { useState, useEffect, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import { nanoid } from 'nanoid'

import { createSeedPeople } from './data/seed.js'
import Header from './components/Header.jsx'
import UnassignedPool from './components/UnassignedPool.jsx'
import RosterGrid from './components/RosterGrid.jsx'
import AddPersonModal from './components/AddPersonModal.jsx'
import { PersonCard } from './components/PersonCard.jsx'

const STORAGE_KEY = 'gscg-roster-people'

const VALID_ROLES = new Set(['director', 'pm', 'consultant', 'associate'])
const VALID_CLASS_YEARS = new Set(['freshman', 'sophomore', 'junior', 'senior', 'abroad', 'ondeck'])

function parseDroppableId(droppableId) {
  if (droppableId === 'unassigned') {
    return { role: null, classYear: null }
  }
  const parts = droppableId.split('-')
  // ondeck has a hyphen so handle multi-part: "director-ondeck" => role=director, classYear=ondeck
  // "pm-study-abroad" won't happen since we use "abroad"
  const role = parts[0]
  const classYear = parts.slice(1).join('-')

  if (VALID_ROLES.has(role) && VALID_CLASS_YEARS.has(classYear)) {
    return { role, classYear }
  }
  return null
}

function loadPeople() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    // ignore parse errors
  }
  return createSeedPeople()
}

function savePeople(people) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people))
  } catch {
    // ignore storage errors
  }
}

export default function App() {
  const [people, setPeople] = useState(() => loadPeople())
  const [activeId, setActiveId] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const activePerson = activeId ? people.find((p) => p.id === activeId) : null

  // Persist to localStorage whenever people changes
  useEffect(() => {
    savePeople(people)
  }, [people])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const destination = parseDroppableId(over.id)
    if (!destination) return

    setPeople((prev) =>
      prev.map((p) => {
        if (p.id !== active.id) return p
        return {
          ...p,
          role: destination.role,
          classYear: destination.classYear,
        }
      })
    )
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  const handleDelete = useCallback((personId) => {
    setPeople((prev) => prev.filter((p) => p.id !== personId))
  }, [])

  function handleAddPerson(name, color) {
    const newPerson = {
      id: nanoid(),
      name,
      role: null,
      classYear: null,
      color,
    }
    setPeople((prev) => [...prev, newPerson])
    setShowAddModal(false)
  }

  function handleReset() {
    const fresh = createSeedPeople()
    setPeople(fresh)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="min-h-screen" style={{ backgroundColor: '#F1F5F9' }}>
        <Header
          onAddPerson={() => setShowAddModal(true)}
          onReset={handleReset}
        />

        <main>
          <UnassignedPool people={people} onDelete={handleDelete} />
          <RosterGrid people={people} onDelete={handleDelete} />
        </main>
      </div>

      <DragOverlay dropAnimation={null}>
        {activePerson ? (
          <div className="drag-overlay">
            <PersonCard person={activePerson} isDragOverlay />
          </div>
        ) : null}
      </DragOverlay>

      {showAddModal && (
        <AddPersonModal
          onAdd={handleAddPerson}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </DndContext>
  )
}
