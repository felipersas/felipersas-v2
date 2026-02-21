/**
 * Books and Courses Data
 * Track what you've read, currently reading, and want to read
 */

export type ReadStatus = 'read' | 'reading' | 'wantToRead'
export type CourseStatus = 'finished' | 'doing' | 'planned'

export interface Book {
  id: string
  title: { en: string; 'pt-BR': string }
  author: { en: string; 'pt-BR': string }
  cover?: string
  status: ReadStatus
  rating?: number // 1-5
  category: 'technical' | 'fiction' | 'biography' | 'selfHelp' | 'other'
  startDate?: string
  finishDate?: string
}

export interface Course {
  id: string
  title: { en: string; 'pt-BR': string }
  platform: string
  instructor?: { en: string; 'pt-BR': string }
  url?: string
  status: CourseStatus
  category: string
  duration: { en: string; 'pt-BR': string }
  startDate?: string
  finishDate?: string
}

export const books: Book[] = [
  {
    id: 'book-1',
    title: { en: 'Grokking Algorithms: An Illustrated Guide for Programmers and Other Curious People', 'pt-BR': 'Entendendo Algoritmos: Um Guia Ilustrado Para Programadores e Outros Curiosos' },
    author: { en: 'Aditya Bhargava', 'pt-BR': 'Aditya Bhargava' },
    status: 'read',
    category: 'technical',
    startDate: '2023-06-01',
    finishDate: '2023-07-15'
  },
  {
    id: 'book-2',
    title: { en: 'Fundamentals of Software Architecture: An Engineering Approach', 'pt-BR': 'Fundamentos da arquitetura de software: uma abordagem de engenharia' },
    author: { en: 'Mark Richards, Neal Ford', 'pt-BR': 'Mark Richards, Neal Ford' },
    status: 'read',
    category: 'technical',
    startDate: '2023-08-01',
    finishDate: '2023-09-10'
  },
  {
    id: 'book-3',
    title: { en: 'Black Hat Python: Python Programming for Hackers and Pentesters', 'pt-BR': 'Black Hat Python – 2ª Edição: Programação Python para hackers e pentesters' },
    author: { en: 'Tim Arnold', 'pt-BR': 'Tim Arnold' },
    status: 'read',
    category: 'technical',
    startDate: '2024-01-15',
    finishDate: '2024-04-23'
  },
]

export const courses: Course[] = [
  {
    id: 'course-1',
    title: { en: 'Supervised Machine Learning: Regression and Classification', 'pt-BR': 'Supervised Machine Learning: Regression and Classification' },
    platform: 'Coursera - DeepLearning.AI',
    instructor: { en: 'Andrew Ng', 'pt-BR': 'Andrew Ng' },
    status: 'finished',
    category: 'Machine Learning',
    duration: { en: '33 hours (approx)', 'pt-BR': '33 horas (aprox.)' },
    startDate: '2026-01-01',
    finishDate: '2024-01-26'
  },
  {
    id: 'course-2',
    title: { en: 'Advanced Learning Algorithms', 'pt-BR': 'Advanced Learning Algorithms' },
    platform: 'Coursera - DeepLearning.AI',
    instructor: { en: 'Andrew Ng', 'pt-BR': 'Andrew Ng' },
    status: 'doing',
    category: 'Machine Learning',
    duration: { en: '40 hours (approx)', 'pt-BR': '40 horas (aprox.)' },
    startDate: '2026-01-26',
  },
]

/**
 * Get stats for progress bookmark
 */
export function getReadingStats() {
  const readBooks = books.filter(b => b.status === 'read').length
  const readingBooks = books.filter(b => b.status === 'reading').length
  const wantToReadBooks = books.filter(b => b.status === 'wantToRead').length

  const completedCourses = courses.filter(c => c.status === 'finished').length
  const inProgressCourses = courses.filter(c => c.status === 'doing').length
  const plannedCourses = courses.filter(c => c.status === 'planned').length

  return {
    books: {
      read: readBooks,
      reading: readingBooks,
      wantToRead: wantToReadBooks,
      total: books.length
    },
    courses: {
      completed: completedCourses,
      inProgress: inProgressCourses,
      planned: plannedCourses,
      total: courses.length
    }
  }
}

/**
 * Get reading progress percentage
 */
export function getReadingProgress() {
  const stats = getReadingStats()
  const totalItems = stats.books.total + stats.courses.total
  const completedItems = stats.books.read + stats.courses.completed
  return Math.round((completedItems / totalItems) * 100)
}
