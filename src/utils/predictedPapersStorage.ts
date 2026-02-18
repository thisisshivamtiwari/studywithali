import type { PaperSection, ExamBoardRow } from '../types/predictedPapers'

const STORAGE_KEY = 'studywithali-predicted-papers'

type LegacyRow = ExamBoardRow & { paper1?: unknown; paper2?: unknown; paper3?: unknown }

const migrateSection = (s: PaperSection & { columnLabels?: string[] }): PaperSection => {
  if (s.columnLabels && Array.isArray(s.columnLabels) && s.rows.every((r) => Array.isArray((r as { papers?: unknown }).papers))) {
    return s as PaperSection
  }
  const labels = s.columnLabels ?? ['Paper 1', 'Paper 2', 'Paper 3']
  const rows = s.rows.map((r) => {
    const leg = r as LegacyRow
    if (Array.isArray(leg.papers)) return { id: r.id, examBoard: r.examBoard, papers: leg.papers } as ExamBoardRow
    const papers = [
      leg.paper1 ?? {},
      leg.paper2 ?? {},
      leg.paper3 ?? {},
    ].map((p) => ({ pdfUrl: '', solutionVideoUrl: '', ...p }))
    return { id: r.id, examBoard: r.examBoard, papers } as ExamBoardRow
  })
  return { ...s, columnLabels: labels, rows }
}

export const loadSections = (): PaperSection[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as (PaperSection & { columnLabels?: string[] })[]
    if (!Array.isArray(parsed)) return []
    return parsed.map(migrateSection)
  } catch {
    return []
  }
}

export const saveSections = (sections: PaperSection[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sections))
}
