'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, GraduationCap, ChevronDown, ChevronUp, BookMarked, Check, Clock, List } from 'lucide-react'
import { cn } from '@/lib/utils'
import { books, courses, getReadingStats, getReadingProgress, type Book, type Course } from '@/content/books-courses'
import { useTranslation } from '@/hooks/use-translation'
import { useProgressBookmark } from '@/hooks/use-progress-bookmark'

type TabType = 'books' | 'courses' | 'all'

export function ProgressBookmark() {
  const { t, locale } = useTranslation()
  const { isExpanded, expand, collapse } = useProgressBookmark()
  const [activeTab, setActiveTab] = useState<TabType>('all')

  const stats = getReadingStats()
  const progress = getReadingProgress()

  const StatusIcon = ({ status }: { status: Book['status'] | Course['status'] }) => {
    switch (status) {
      case 'read':
      case 'finished':
        return <Check className="h-4 w-4 text-success" />
      case 'reading':
      case 'doing':
        return <Clock className="h-4 w-4 text-primary" />
      case 'wantToRead':
      case 'planned':
        return <List className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusLabel = (status: Book['status'] | Course['status']) => {
    const labels = {
      read: { en: 'Read', 'pt-BR': 'Lido' },
      finished: { en: 'Completed', 'pt-BR': 'Concluído' },
      reading: { en: 'Reading', 'pt-BR': 'Lendo' },
      doing: { en: 'In progress', 'pt-BR': 'Em progresso' },
      wantToRead: { en: 'Want to read', 'pt-BR': 'Quero ler' },
      planned: { en: 'Planned', 'pt-BR': 'Planejado' }
    }
    return labels[status][locale]
  }

  const getLocalizedText = (obj: { en: string; 'pt-BR': string }) => obj[locale]

  const renderBook = (book: Book) => (
    <motion.div
      key={book.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
    >
      <div className="mt-1">
        <StatusIcon status={book.status} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{getLocalizedText(book.title)}</p>
        <p className="text-xs text-muted-foreground truncate">{getLocalizedText(book.author)}</p>
        <p className="text-xs text-muted-foreground mt-1">{getStatusLabel(book.status)}</p>
      </div>
      {book.rating && (
        <div className="flex gap-0.5">
          {[...Array(book.rating)].map((_, i) => (
            <span key={i} className="text-primary text-xs">☕</span>
          ))}
        </div>
      )}
    </motion.div>
  )

  const renderCourse = (course: Course) => (
    <motion.div
      key={course.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
    >
      <div className="mt-1">
        <StatusIcon status={course.status} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{getLocalizedText(course.title)}</p>
        <p className="text-xs text-muted-foreground truncate">{course.platform}</p>
        {course.instructor && (
          <p className="text-xs text-muted-foreground">{course.instructor ? getLocalizedText(course.instructor) : ''}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{getStatusLabel(course.status)}</p>
        {course.duration && (
          <p className="text-xs text-primary/80 font-medium">{getLocalizedText(course.duration)}</p>
        )}
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40"
    >
      <div
        className={cn(
          "bg-background/95 backdrop-blur-sm border border-primary/20 rounded-2xl shadow-lg overflow-hidden transition-all duration-300",
          isExpanded ? "w-80" : "w-12"
        )}
      >
        {/* Collapsed State - Bookmark ribbon */}
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.button
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={expand}
              className="w-full py-4 flex flex-col items-center gap-2 hover:bg-accent/50 transition-colors lofi-glow"
              aria-label="Open reading progress"
            >
              {/* Bookmark ribbon visual */}
              <div className="relative">
                <BookMarked className="h-6 w-6 text-primary" />
              </div>
            </motion.button>
          ) : (
            /* Expanded State - Full content */
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-sm">
                    {locale === 'en' ? 'Reading Progress' : 'Progresso de Leitura'}
                  </h3>
                </div>
                <button
                  onClick={collapse}
                  className="p-1 hover:bg-accent rounded transition-colors"
                  aria-label="Close"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              {/* Overall progress */}
              <div className="mb-4 p-3 bg-accent/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {locale === 'en' ? 'Overall' : 'Geral'}
                  </span>
                  <span className="text-sm font-bold text-primary">{progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className={cn(
                    "flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                    activeTab === 'all' ? "bg-primary text-primary-foreground" : "bg-accent/30 hover:bg-accent/50"
                  )}
                >
                  {locale === 'en' ? 'All' : 'Tudo'}
                </button>
                <button
                  onClick={() => setActiveTab('books')}
                  className={cn(
                    "flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1",
                    activeTab === 'books' ? "bg-primary text-primary-foreground" : "bg-accent/30 hover:bg-accent/50"
                  )}
                >
                  <BookOpen className="h-3 w-3" />
                  {locale === 'en' ? 'Books' : 'Livros'}
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={cn(
                    "flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1",
                    activeTab === 'courses' ? "bg-primary text-primary-foreground" : "bg-accent/30 hover:bg-accent/50"
                  )}
                >
                  <GraduationCap className="h-3 w-3" />
                  {locale === 'en' ? 'Courses' : 'Cursos'}
                </button>
              </div>

              {/* Content */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {activeTab === 'all' || activeTab === 'books' ? (
                  <>
                    {(activeTab === 'all' || activeTab === 'books') && books.length > 0 && (
                      <div className="space-y-2">
                        {activeTab === 'all' && (
                          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {locale === 'en' ? 'Books' : 'Livros'} ({stats.books.read}/{books.length})
                          </p>
                        )}
                        {books.map(renderBook)}
                      </div>
                    )}
                  </>
                ) : null}

                {activeTab === 'all' || activeTab === 'courses' ? (
                  <>
                    {(activeTab === 'all' || activeTab === 'courses') && courses.length > 0 && (
                      <div className={cn("space-y-2", activeTab === 'all' && "mt-4")}>
                        {activeTab === 'all' && (
                          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {locale === 'en' ? 'Courses' : 'Cursos'} ({stats.courses.completed}/{courses.length})
                          </p>
                        )}
                        {courses.map(renderCourse)}
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
