import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaPlus, FaTrash, FaFilePdf, FaVideo, FaExternalLinkAlt } from 'react-icons/fa'
import type { PaperSection, ExamBoardRow, PaperLink } from '../types/predictedPapers'
import { createEmptySection, createEmptyRow, createEmptyPaperLink } from '../types/predictedPapers'
import { loadSections, saveSections } from '../utils/predictedPapersStorage'

const MAX_FILE_SIZE_BYTES = 1.5 * 1024 * 1024 // 1.5MB for localStorage

const AdminPredictedPapers = () => {
  const [sections, setSections] = useState<PaperSection[]>(() => loadSections())

  const persist = useCallback((next: PaperSection[]) => {
    setSections(next)
    saveSections(next)
  }, [])

  const updateSection = useCallback(
    (id: string, patch: Partial<PaperSection>) => {
      persist(
        sections.map((s) => (s.id === id ? { ...s, ...patch } : s))
      )
    },
    [sections, persist]
  )

  const addSection = useCallback(() => {
    const newSection = createEmptySection()
    newSection.sortOrder = sections.length
    persist([...sections, newSection])
  }, [sections, persist])

  const deleteSection = useCallback(
    (id: string) => {
      if (!confirm('Delete this section and all its rows?')) return
      persist(sections.filter((s) => s.id !== id))
    },
    [sections, persist]
  )

  const addRow = useCallback(
    (sectionId: string) => {
      const section = sections.find((s) => s.id === sectionId)
      if (!section) return
      const columnCount = section.columnLabels?.length ?? 3
      persist(
        sections.map((s) =>
          s.id === sectionId ? { ...s, rows: [...s.rows, createEmptyRow(columnCount)] } : s
        )
      )
    },
    [sections, persist]
  )

  const addColumn = useCallback(
    (sectionId: string) => {
      persist(
        sections.map((s) => {
          if (s.id !== sectionId) return s
          const labels = [...(s.columnLabels ?? ['Paper 1', 'Paper 2', 'Paper 3']), `Paper ${(s.columnLabels?.length ?? 3) + 1}`]
          const rows = s.rows.map((r) => ({ ...r, papers: [...(r.papers ?? []), createEmptyPaperLink()] }))
          return { ...s, columnLabels: labels, rows }
        })
      )
    },
    [sections, persist]
  )

  const removeColumn = useCallback(
    (sectionId: string, columnIndex: number) => {
      const section = sections.find((s) => s.id === sectionId)
      const labels = section?.columnLabels ?? ['Paper 1', 'Paper 2', 'Paper 3']
      if (labels.length <= 1) return
      persist(
        sections.map((s) => {
          if (s.id !== sectionId) return s
          const newLabels = labels.filter((_, i) => i !== columnIndex)
          const rows = s.rows.map((r) => ({ ...r, papers: (r.papers ?? []).filter((_, i) => i !== columnIndex) }))
          return { ...s, columnLabels: newLabels, rows }
        })
      )
    },
    [sections, persist]
  )

  const updateColumnLabel = useCallback(
    (sectionId: string, columnIndex: number, label: string) => {
      persist(
        sections.map((s) => {
          if (s.id !== sectionId) return s
          const labels = [...(s.columnLabels ?? ['Paper 1', 'Paper 2', 'Paper 3'])]
          labels[columnIndex] = label
          return { ...s, columnLabels: labels }
        })
      )
    },
    [sections, persist]
  )

  const updateRow = useCallback(
    (sectionId: string, row: ExamBoardRow) => {
      persist(
        sections.map((s) =>
          s.id === sectionId ? { ...s, rows: s.rows.map((r) => (r.id === row.id ? row : r)) } : s
        )
      )
    },
    [sections, persist]
  )

  const deleteRow = useCallback(
    (sectionId: string, rowId: string) => {
      persist(
        sections.map((s) =>
          s.id === sectionId ? { ...s, rows: s.rows.filter((r) => r.id !== rowId) } : s
        )
      )
    },
    [sections, persist]
  )

  const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <>
      <section className="py-10 md:py-12 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-4" aria-label="Breadcrumb">
            <Link to="/" className="text-white/90 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/60 rounded px-1 py-0.5" aria-label="Home">
              Home
            </Link>
            <FaChevronRight className="text-white/70 w-3 h-3" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">Admin – Predicted papers</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Predicted papers</h1>
          <p className="text-white/90 mt-2 text-base max-w-2xl">
            Add sections (e.g. June 2025 GCSE Practice Papers), then add exam boards and upload PDFs or paste links for papers and video solutions. Changes save automatically.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              to="/papers"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              aria-label="View public papers page"
            >
              <FaExternalLinkAlt className="w-4 h-4" aria-hidden="true" />
              View public page
            </Link>
            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all cursor-pointer"
              aria-label="Add section"
            >
              <FaPlus className="w-4 h-4" aria-hidden="true" />
              Add section
            </button>
          </div>

          {sortedSections.length === 0 ? (
            <div className="card-material overflow-hidden p-10 text-center">
              <p className="text-gray-600 mb-4">No sections yet.</p>
              <p className="text-sm text-gray-500 mb-6">Click &quot;Add section&quot; to create one (e.g. June 2025 GCSE Practice Papers).</p>
              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/50 cursor-pointer"
              >
                <FaPlus className="w-4 h-4" aria-hidden="true" />
                Add first section
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedSections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  onUpdate={(patch) => updateSection(section.id, patch)}
                  onDelete={() => deleteSection(section.id)}
                  onAddRow={() => addRow(section.id)}
                  onUpdateRow={(row) => updateRow(section.id, row)}
                  onDeleteRow={(rowId) => deleteRow(section.id, rowId)}
                  onAddColumn={() => addColumn(section.id)}
                  onRemoveColumn={(colIndex) => removeColumn(section.id, colIndex)}
                  onUpdateColumnLabel={(colIndex, label) => updateColumnLabel(section.id, colIndex, label)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

type SectionCardProps = {
  section: PaperSection
  onUpdate: (patch: Partial<PaperSection>) => void
  onDelete: () => void
  onAddRow: () => void
  onUpdateRow: (row: ExamBoardRow) => void
  onDeleteRow: (rowId: string) => void
  onAddColumn: () => void
  onRemoveColumn: (columnIndex: number) => void
  onUpdateColumnLabel: (columnIndex: number, label: string) => void
}

const SectionCard = ({
  section,
  onUpdate,
  onDelete,
  onAddRow,
  onUpdateRow,
  onDeleteRow,
  onAddColumn,
  onRemoveColumn,
  onUpdateColumnLabel,
}: SectionCardProps) => {
  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all'
  const columnLabels = section.columnLabels ?? ['Paper 1', 'Paper 2', 'Paper 3']

  const getRowPapers = (row: ExamBoardRow): PaperLink[] => {
    const papers = row.papers ?? []
    const need = columnLabels.length
    if (papers.length >= need) return papers
    return [...papers, ...Array.from({ length: need - papers.length }, createEmptyPaperLink)]
  }

  const setRowPaper = (row: ExamBoardRow, colIndex: number, link: PaperLink) => {
    const papers = getRowPapers(row)
    papers[colIndex] = link
    onUpdateRow({ ...row, papers })
  }

  return (
    <div className="card-material overflow-hidden">
      <div className="flex">
        <div className="w-1.5 min-h-full bg-linear-to-b from-indigo-500 to-purple-500 shrink-0" aria-hidden="true" />
        <div className="flex-1 p-6 md:p-8 min-w-0">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Section title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="e.g. June 2025 GCSE Practice Papers"
                className={inputClass}
                aria-label="Section title"
              />
            </div>
            <div className="w-20">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Order</label>
              <input
                type="number"
                min={0}
                value={section.sortOrder}
                onChange={(e) => onUpdate({ sortOrder: Number(e.target.value) || 0 })}
                className={inputClass}
                aria-label="Sort order"
              />
            </div>
            <div className="flex items-end pb-2">
              <button
                type="button"
                onClick={onDelete}
                className="text-red-600 hover:text-red-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Delete section"
              >
                <FaTrash className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Columns (paper names)</label>
            <div className="flex flex-wrap items-center gap-2">
              {columnLabels.map((label, colIndex) => (
                <div key={colIndex} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => onUpdateColumnLabel(colIndex, e.target.value)}
                    className={inputClass + ' w-24'}
                    aria-label={`Column ${colIndex + 1} label`}
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveColumn(colIndex)}
                    className="text-red-600 hover:text-red-700 p-1.5 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label={`Remove column ${label}`}
                  >
                    <FaTrash className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={onAddColumn}
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium text-sm py-2 px-3 rounded-lg border border-dashed border-gray-300 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Add column"
              >
                <FaPlus className="w-4 h-4" aria-hidden="true" />
                Add column
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Exam boards & papers</span>
            <button
              type="button"
              onClick={onAddRow}
              className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium text-sm py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Add exam board row"
            >
              <FaPlus className="w-4 h-4" aria-hidden="true" />
              Add row
            </button>
          </div>

          {section.rows.length === 0 ? (
            <p className="text-gray-500 text-sm py-4">No exam board rows. Click &quot;Add row&quot; to add one.</p>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full border-collapse text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 font-semibold text-gray-700 w-36">Exam board</th>
                    {columnLabels.flatMap((label, colIndex) => [
                      <th key={`p-${colIndex}`} className="text-left py-3 px-2 font-semibold text-gray-700">{label}</th>,
                      <th key={`s-${colIndex}`} className="text-left py-3 px-2 font-semibold text-gray-700">Solution</th>,
                    ])}
                    <th className="w-12" aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row) => (
                    <tr key={row.id} className="border-b border-gray-100 align-top">
                      <td className="py-2 px-2">
                        <input
                          type="text"
                          value={row.examBoard}
                          onChange={(e) => onUpdateRow({ ...row, examBoard: e.target.value })}
                          placeholder="e.g. Edexcel (H)"
                          className={inputClass}
                          aria-label="Exam board"
                        />
                      </td>
                      {columnLabels.map((_, colIndex) => {
                        const link = getRowPapers(row)[colIndex] ?? createEmptyPaperLink()
                        return (
                          <React.Fragment key={colIndex}>
                            <td className="py-2 px-2">
                              <UploadOrLinkCell
                                type="pdf"
                                link={link}
                                onChange={(pdfUrl, pdfDataUrl) =>
                                  setRowPaper(row, colIndex, { ...link, pdfUrl: pdfUrl || undefined, pdfDataUrl: pdfDataUrl || undefined })
                                }
                                inputClass={inputClass}
                              />
                            </td>
                            <td className="py-2 px-2">
                              <UploadOrLinkCell
                                type="video"
                                link={link}
                                onChange={(solutionVideoUrl, solutionDataUrl) =>
                                  setRowPaper(row, colIndex, {
                                    ...link,
                                    solutionVideoUrl: solutionVideoUrl || undefined,
                                    solutionDataUrl: solutionDataUrl || undefined,
                                  })
                                }
                                inputClass={inputClass}
                              />
                            </td>
                          </React.Fragment>
                        )
                      })}
                      <td className="py-2 px-2">
                        <button
                          type="button"
                          onClick={() => onDeleteRow(row.id)}
                          className="text-red-600 hover:text-red-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                          aria-label="Delete row"
                        >
                          <FaTrash className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type UploadOrLinkCellProps = {
  type: 'pdf' | 'video'
  link: PaperLink
  onChange: (url: string, dataUrl: string) => void
  inputClass: string
}

const UploadOrLinkCell = ({ type, link, onChange, inputClass }: UploadOrLinkCellProps) => {
  const accept = type === 'pdf' ? '.pdf,application/pdf' : 'video/*,.mp4,.webm'
  const hasValue = type === 'pdf' ? link.pdfDataUrl || link.pdfUrl : link.solutionDataUrl || link.solutionVideoUrl

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_FILE_SIZE_BYTES) {
      alert(`File is too large (max ${Math.round(MAX_FILE_SIZE_BYTES / 1024)}KB). Use "Or paste link" for larger files.`)
      e.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      onChange('', dataUrl)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const clear = () => onChange('', '')

  return (
    <div className="space-y-2 min-w-[140px]">
      <div className="flex items-center gap-1.5 flex-wrap">
        <label className="cursor-pointer">
          <input
            type="file"
            accept={accept}
            onChange={handleFile}
            className="sr-only"
            aria-label={type === 'pdf' ? 'Upload PDF' : 'Upload video'}
          />
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-xs font-medium hover:bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500">
            {type === 'pdf' ? <FaFilePdf className="w-3.5 h-3.5" aria-hidden="true" /> : <FaVideo className="w-3.5 h-3.5" aria-hidden="true" />}
            Upload
          </span>
        </label>
        {hasValue && (
          <button
            type="button"
            onClick={clear}
            className="text-xs text-red-600 hover:text-red-700 font-medium"
            aria-label="Clear"
          >
            Clear
          </button>
        )}
      </div>
      <div>
        <input
          type="url"
          value={type === 'pdf' ? link.pdfUrl ?? '' : link.solutionVideoUrl ?? ''}
          onChange={(e) => {
            const v = e.target.value
            if (type === 'pdf') {
              onChange(v, link.pdfDataUrl ?? '')
            } else {
              onChange(v, link.solutionDataUrl ?? '')
            }
          }}
          placeholder="Or paste link"
          className={inputClass + ' text-xs'}
          aria-label={type === 'pdf' ? 'Or paste PDF link' : 'Or paste video link'}
        />
      </div>
      {hasValue && (
        <p className="text-xs text-green-600 font-medium">
          {(type === 'pdf' ? link.pdfDataUrl : link.solutionDataUrl) ? '✓ File uploaded' : '✓ Link'}
        </p>
      )}
    </div>
  )
}

export default AdminPredictedPapers
