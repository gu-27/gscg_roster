import { nanoid } from 'nanoid'

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

const NAMES = [
  'Mateo', 'Noah', 'Dylan', 'Emily', 'Allie', 'Mia', 'Marcus', 'Eamon',
  'Jake', 'Rachel', 'Sam', 'Lauren', 'Owen', 'Ben', 'Kevin', 'Kenzie',
  'Leah', 'Cameron', 'Will', 'Sophia', 'Michael', 'Emma', 'Kate', 'Jake',
]

export function createSeedPeople() {
  return NAMES.map((name, index) => ({
    id: nanoid(),
    name,
    role: null,
    classYear: null,
    color: COLORS[index % COLORS.length],
  }))
}
