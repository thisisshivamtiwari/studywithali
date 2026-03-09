import { useEffect, useMemo, useState } from 'react'
import { FaFilePdf } from 'react-icons/fa'
import { supabase } from '../lib/supabaseClient'

const STORAGE_BUCKET = 'exam-resources'

type SubjectRow = {
  id: string
  name: string
  slug: string
  level: string
}

type BoardRow = {
  id: string
  name: string
  slug: string
}

type ResourceRow = {
  id: string
  subject_id: string | null
  board_id: string | null
  exam_year: number | null
  exam_session: string | null
  series_label: string | null
  tier: string | null
  resource_category: string
  label: string
  source_label: string | null
  media_type: string
  url: string
  order_index: number | null
}

type GroupedTable = {
  key: string
  heading: string
  subtitle?: string | null
  resources: ResourceRow[]
}

type SubjectSection = {
  subject: SubjectRow
  groups: GroupedTable[]
}

const ExamPapers = () => {
  const [subjects, setSubjects] = useState<SubjectRow[]>([])
  const [boards, setBoards] = useState<BoardRow[]>([])
  const [resources, setResources] = useState<ResourceRow[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadAll = async () => {
      setIsLoading(true)
      setErrorMessage(null)
      try {
        const [subjectsResult, boardsResult, resourcesResult] = await Promise.all([
          supabase.from('subjects').select('id, name, slug, level'),
          supabase.from('exam_boards').select('id, name, slug'),
          supabase
            .from('exam_resources')
            .select(
              'id, subject_id, board_id, exam_year, exam_session, series_label, tier, resource_category, label, source_label, media_type, url, order_index',
            )
            .order('exam_year', { ascending: false })
            .order('order_index', { ascending: true }),
        ])

        if (subjectsResult.error) {
          throw subjectsResult.error
        }
        if (boardsResult.error) {
          throw boardsResult.error
        }
        if (resourcesResult.error) {
          throw resourcesResult.error
        }

        setSubjects((subjectsResult.data ?? []) as SubjectRow[])
        setBoards((boardsResult.data ?? []) as BoardRow[])
        setResources((resourcesResult.data ?? []) as ResourceRow[])
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to load exam resources.'
        setErrorMessage(message)
      } finally {
        setIsLoading(false)
      }
    }

    void loadAll()
  }, [])

  const boardById = (id: string | null) => boards.find((board) => board.id === id) || null

  const subjectSections: SubjectSection[] = useMemo(() => {
    const sections: SubjectSection[] = []

    subjects.forEach((subject) => {
      const subjectResources = resources.filter(
        (resource) => resource.subject_id === subject.id && resource.resource_category === 'PAST_PAPER',
      )
      if (!subjectResources.length) {
        return
      }

      const tablesMap = new Map<string, GroupedTable>()
      subjectResources.forEach((resource) => {
        const seriesKeyParts: string[] = []
        if (resource.series_label) {
          seriesKeyParts.push(resource.series_label)
        } else {
          if (resource.exam_session) {
            seriesKeyParts.push(resource.exam_session)
          }
          if (resource.exam_year) {
            seriesKeyParts.push(String(resource.exam_year))
          }
        }
        const heading =
          seriesKeyParts.length > 0
            ? seriesKeyParts.join(' ')
            : `${subject.level ? `${subject.level} ` : ''}${subject.name} practice papers`
        const key = `${subject.id}-${heading.toLowerCase().replace(/\s+/g, '-')}`
        if (!tablesMap.has(key)) {
          tablesMap.set(key, { key, heading, subtitle: resource.source_label, resources: [] })
        }
        const group = tablesMap.get(key)
        if (!group) {
          return
        }
        group.resources.push(resource)
        if (!group.subtitle && resource.source_label) {
          group.subtitle = resource.source_label
        }
      })

      const groups = Array.from(tablesMap.values()).sort((a, b) => {
        const yearA = a.resources[0]?.exam_year ?? 0
        const yearB = b.resources[0]?.exam_year ?? 0
        if (yearA === yearB) {
          return a.heading.localeCompare(b.heading)
        }
        return yearB - yearA
      })

      if (groups.length) {
        sections.push({ subject, groups })
      }
    })

    sections.sort((a, b) => {
      const nameA = `${a.subject.level ?? ''} ${a.subject.name}`.trim().toLowerCase()
      const nameB = `${b.subject.level ?? ''} ${b.subject.name}`.trim().toLowerCase()
      return nameA.localeCompare(nameB)
    })

    return sections
  }, [subjects, resources])

  const buildPublicUrl = (path: string | null | undefined) => {
    if (!path) {
      return null
    }
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
    return data.publicUrl || null
  }

  const renderTableForGroup = (group: GroupedTable) => {
    const labelsSet = new Map<string, number>()
    group.resources.forEach((resource) => {
      const key = resource.label
      if (!labelsSet.has(key)) {
        labelsSet.set(key, resource.order_index ?? labelsSet.size)
      }
    })
    const labels = Array.from(labelsSet.entries())
      .sort((a, b) => a[1] - b[1])
      .map(([label]) => label)

    const rowsMap = new Map<string, { boardName: string; tier: string | null; resources: ResourceRow[] }>()
    group.resources.forEach((resource) => {
      const board = boardById(resource.board_id)
      if (!board) {
        return
      }
      const rowKey = `${board.id}|${resource.tier ?? ''}`
      if (!rowsMap.has(rowKey)) {
        rowsMap.set(rowKey, { boardName: board.name, tier: resource.tier, resources: [] })
      }
      rowsMap.get(rowKey)?.resources.push(resource)
    })
    const rows = Array.from(rowsMap.values()).sort((a, b) => a.boardName.localeCompare(b.boardName))

    return (
      <div key={group.key} className="mb-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-indigo-600 text-white px-4 py-3">
          <h2 className="text-lg md:text-xl font-semibold">{group.heading}</h2>
          {group.subtitle && <p className="text-xs md:text-sm mt-1 opacity-90">{group.subtitle}</p>}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs md:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-900">Exam Board</th>
                {labels.map((label) => (
                  <th key={label} className="px-3 py-2 text-center font-semibold text-gray-900">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.boardName}-${row.tier ?? 'all'}`} className="border-t border-gray-100">
                  <td className="px-3 py-2 font-semibold text-gray-900">
                    {row.boardName}
                    {row.tier ? <span className="ml-1 text-xs text-sky-700">({row.tier})</span> : null}
                  </td>
                  {labels.map((label) => {
                    const matching = row.resources.filter((resource) => resource.label === label)
                    if (!matching.length) {
                      return (
                        <td key={label} className="px-3 py-2 text-center text-gray-300">
                          —
                        </td>
                      )
                    }
                    return (
                      <td key={label} className="px-3 py-2 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {matching.map((resource) => {
                            const url = buildPublicUrl(resource.url)
                            if (!url) {
                              return null
                            }
                            return (
                              <a
                                key={resource.id}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-[11px] font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                                aria-label={`${label} for ${row.boardName}${row.tier ? ` (${row.tier})` : ''}`}
                              >
                                <FaFilePdf className="h-3 w-3" aria-hidden="true" />
                                <span className="hidden sm:inline">PDF</span>
                              </a>
                            )
                          })}
                        </div>
                      </td>
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-10 md:py-14 shadow-md relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide mb-2">
            Exam Papers &amp; Revision Notes
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            Browse GCSE and A‑Level resources by exam board. All PDFs are uploaded directly to our system so links stay
            up to date.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {errorMessage && <p className="text-sm text-red-600 mb-4">{errorMessage}</p>}
        {isLoading && <p className="text-sm text-gray-600 mb-4">Loading exam resources…</p>}

        {!isLoading && !errorMessage && subjectSections.length === 0 && (
          <p className="text-sm text-gray-600 mb-4">No exam papers have been uploaded yet.</p>
        )}

        {subjectSections.map((section) => {
          const subjectLabel = section.subject.level
            ? `${section.subject.level.toUpperCase()} ${section.subject.name}`
            : section.subject.name

          const gradeBoundaryResources = resources.filter((resource) => {
            if (
              resource.subject_id !== section.subject.id ||
              resource.resource_category !== 'PAST_PAPER' ||
              !resource.label
            ) {
              return false
            }
            return resource.label.toLowerCase().includes('grade')
          })

          return (
            <section key={section.subject.id} className="mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-indigo-900 text-center mb-2">
                {subjectLabel} – Exam papers
              </h2>
              <p className="text-xs md:text-sm text-gray-700 text-center mb-4">
                Download practice papers and solutions for {subjectLabel} by exam board.
              </p>

              {section.groups.map((group) => renderTableForGroup(group))}

              {gradeBoundaryResources.length > 0 && (
                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="rounded-full border border-yellow-400 bg-yellow-300 px-5 py-2 text-xs md:text-sm font-semibold text-yellow-900 shadow-sm hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
                    aria-label={`${subjectLabel} grade boundaries`}
                    onClick={() => {
                      const latest = [...gradeBoundaryResources].sort(
                        (a, b) => (b.exam_year ?? 0) - (a.exam_year ?? 0),
                      )[0]
                      const url = latest ? buildPublicUrl(latest.url) : null
                      if (url) {
                        window.open(url, '_blank', 'noopener,noreferrer')
                      }
                    }}
                  >
                    Grade boundaries
                  </button>
                </div>
              )}
            </section>
          )
        })}
      </main>
    </div>
  )
}

export default ExamPapers

