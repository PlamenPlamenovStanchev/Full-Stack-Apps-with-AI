export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  category: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

export type EventCategory = 'work' | 'personal' | 'meeting' | 'deadline' | 'other'
