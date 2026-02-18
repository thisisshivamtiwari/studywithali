export type PaperLink = {
  pdfUrl?: string
  pdfDataUrl?: string
  solutionVideoUrl?: string
  solutionDataUrl?: string
}

export type ExamBoardRow = {
  id: string
  examBoard: string
  papers: PaperLink[]
}

export type PaperSection = {
  id: string
  title: string
  sortOrder: number
  columnLabels: string[]
  rows: ExamBoardRow[]
}

export const createEmptyPaperLink = (): PaperLink => ({
  pdfUrl: '',
  solutionVideoUrl: '',
})

export const createEmptyRow = (columnCount: number): ExamBoardRow => ({
  id: crypto.randomUUID(),
  examBoard: '',
  papers: Array.from({ length: columnCount }, createEmptyPaperLink),
})

export const createEmptySection = (): PaperSection => ({
  id: crypto.randomUUID(),
  title: '',
  sortOrder: 0,
  columnLabels: ['Paper 1', 'Paper 2', 'Paper 3'],
  rows: [],
})
