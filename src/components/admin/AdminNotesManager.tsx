import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

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

type NewSubjectForm = {
  name: string
  level: string
}

type NewBoardForm = {
  name: string
}

type NewResourceForm = {
  subjectId: string
  boardId: string
  resourceCategory: 'NOTES' | 'PAST_PAPER'
  examYear: string
  examSession: string
  seriesLabel: string
  tier: string
  label: string
  sourceLabel: string
  orderIndex: string
}

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item'

const AdminNotesManager = () => {
  const [subjects, setSubjects] = useState<SubjectRow[]>([])
  const [boards, setBoards] = useState<BoardRow[]>([])
  const [resources, setResources] = useState<ResourceRow[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [newSubject, setNewSubject] = useState<NewSubjectForm>({ name: '', level: '' })
  const [newBoard, setNewBoard] = useState<NewBoardForm>({ name: '' })
  const [newResource, setNewResource] = useState<NewResourceForm>({
    subjectId: '',
    boardId: '',
    resourceCategory: 'PAST_PAPER',
    examYear: '',
    examSession: '',
    seriesLabel: '',
    tier: '',
    label: '',
    sourceLabel: '',
    orderIndex: '',
  })
  const [newResourceFile, setNewResourceFile] = useState<File | null>(null)
  const [isSavingSubject, setIsSavingSubject] = useState(false)
  const [isSavingBoard, setIsSavingBoard] = useState(false)
  const [isSavingResource, setIsSavingResource] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      setIsLoading(true)
      setErrorMessage(null)
      try {
        const [subjectsResult, boardsResult, resourcesResult] = await Promise.all([
          supabase.from('subjects').select('id, name, slug, level').order('name', { ascending: true }),
          supabase.from('exam_boards').select('id, name, slug').order('name', { ascending: true }),
          supabase
            .from('exam_resources')
            .select(
              'id, subject_id, board_id, exam_year, exam_session, series_label, tier, resource_category, label, source_label, media_type, url, order_index',
            )
            .order('created_at', { ascending: false }),
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
        const message = error instanceof Error ? error.message : 'Unable to load notes data.'
        setErrorMessage(message)
      } finally {
        setIsLoading(false)
      }
    }

    void loadAll()
  }, [])

  const handleCreateSubject = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!newSubject.name.trim() || !newSubject.level.trim()) {
      return
    }

    setIsSavingSubject(true)
    setErrorMessage(null)
    try {
      const slug = slugify(`${newSubject.level}-${newSubject.name}`)
      const { data, error } = await supabase
        .from('subjects')
        .insert({ name: newSubject.name.trim(), level: newSubject.level.trim(), slug })
        .select('id, name, slug, level')
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setSubjects((prev) => [...prev, data as SubjectRow].sort((a, b) => a.name.localeCompare(b.name)))
      }
      setNewSubject({ name: '', level: '' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create subject.'
      setErrorMessage(message)
    } finally {
      setIsSavingSubject(false)
    }
  }

  const handleCreateBoard = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!newBoard.name.trim()) {
      return
    }

    setIsSavingBoard(true)
    setErrorMessage(null)
    try {
      const slug = slugify(newBoard.name)
      const { data, error } = await supabase
        .from('exam_boards')
        .insert({ name: newBoard.name.trim(), slug })
        .select('id, name, slug')
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setBoards((prev) => [...prev, data as BoardRow].sort((a, b) => a.name.localeCompare(b.name)))
      }
      setNewBoard({ name: '' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create exam board.'
      setErrorMessage(message)
    } finally {
      setIsSavingBoard(false)
    }
  }

  const handleCreateResource = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!newResource.subjectId || !newResource.boardId || !newResource.label.trim() || !newResourceFile) {
      setErrorMessage('Please select a subject, board, label and PDF file before uploading.')
      return
    }

    const subject = subjects.find((item) => item.id === newResource.subjectId)
    const board = boards.find((item) => item.id === newResource.boardId)
    if (!subject || !board) {
      setErrorMessage('Selected subject or board could not be found. Please refresh the page and try again.')
      return
    }

    setIsSavingResource(true)
    setErrorMessage(null)
    try {
      const yearSegment = newResource.examYear.trim() || 'no-year'
      const sessionSegment = newResource.examSession.trim() || 'general'
      const safeFileName = newResourceFile.name.replace(/[^a-zA-Z0-9_.-]/g, '_')
      const path = `${subject.slug}/${subject.level || 'level'}/${board.slug}/${yearSegment}-${sessionSegment}-${Date.now()}-${safeFileName}`

      const uploadResult = await supabase.storage.from(STORAGE_BUCKET).upload(path, newResourceFile, {
        upsert: false,
      })
      if (uploadResult.error) {
        throw uploadResult.error
      }

      const examYearNumber = newResource.examYear.trim() ? Number.parseInt(newResource.examYear.trim(), 10) : null
      const orderIndexNumber = newResource.orderIndex.trim()
        ? Number.parseInt(newResource.orderIndex.trim(), 10)
        : null

      const insertPayload = {
        subject_id: newResource.subjectId,
        board_id: newResource.boardId,
        exam_year: examYearNumber,
        exam_session: newResource.examSession.trim() || null,
        series_label: newResource.seriesLabel.trim() || null,
        tier: newResource.tier.trim() || null,
        resource_category: newResource.resourceCategory,
        label: newResource.label.trim(),
        source_label: newResource.sourceLabel.trim() || null,
        media_type: 'PDF',
        url: path,
        order_index: orderIndexNumber,
      }

      const { data, error } = await supabase
        .from('exam_resources')
        .insert(insertPayload)
        .select(
          'id, subject_id, board_id, exam_year, exam_session, series_label, tier, resource_category, label, source_label, media_type, url, order_index',
        )
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setResources((prev) => [data as ResourceRow, ...prev])
      }

      setNewResource((prev) => ({
        ...prev,
        examYear: '',
        examSession: '',
        seriesLabel: '',
        tier: '',
        label: '',
        sourceLabel: '',
        orderIndex: '',
      }))
      setNewResourceFile(null)
    } catch (error) {
      let message = error instanceof Error ? error.message : 'Unable to create resource.'
      const lowered = message.toLowerCase()
      if (lowered.includes('storage') && lowered.includes('bucket')) {
        message =
          'Storage bucket "exam-resources" is missing or not accessible. In Supabase, create a public bucket named "exam-resources" and allow authenticated users to upload.'
      }
      setErrorMessage(message)
    } finally {
      setIsSavingResource(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      setNewResourceFile(null)
      return
    }
    if (file.type !== 'application/pdf') {
      setErrorMessage('Please upload a PDF file.')
      setNewResourceFile(null)
      return
    }
    setNewResourceFile(file)
  }

  const subjectById = (id: string | null) => subjects.find((item) => item.id === id) || null
  const boardById = (id: string | null) => boards.find((item) => item.id === id) || null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">Notes & exam resources</h1>
        <p className="text-sm text-gray-500">
          Manage subjects, boards and upload PDF notes or past papers into Supabase storage.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Make sure you have a public storage bucket named <span className="font-mono">{STORAGE_BUCKET}</span> in
          Supabase.
        </p>
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      {isLoading && <p className="text-sm text-gray-500">Loading notes data…</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Subjects & levels</h2>
          <form className="space-y-3 mb-4" onSubmit={handleCreateSubject}>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="subject-name">
                Subject name
              </label>
              <input
                id="subject-name"
                type="text"
                value={newSubject.name}
                onChange={(event) => setNewSubject((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Maths, Biology"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="subject-level">
                Level
              </label>
              <input
                id="subject-level"
                type="text"
                value={newSubject.level}
                onChange={(event) => setNewSubject((prev) => ({ ...prev, level: event.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. GCSE, A-Level, AS"
              />
            </div>
            <button
              type="submit"
              disabled={isSavingSubject}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 cursor-pointer"
            >
              {isSavingSubject ? 'Saving…' : 'Add subject'}
            </button>
          </form>
          <div className="max-h-64 overflow-y-auto border-t border-gray-100 pt-3">
            {subjects.length === 0 ? (
              <p className="text-sm text-gray-500">No subjects yet.</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {subjects.map((subject) => (
                  <li key={subject.id} className="flex items-center justify-between">
                    <span className="text-gray-900">
                      {subject.name}{' '}
                      <span className="text-xs text-gray-500 font-medium">({subject.level || 'Level not set'})</span>
                    </span>
                    <span className="text-[11px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                      {subject.slug}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Exam boards</h2>
          <form className="space-y-3 mb-4" onSubmit={handleCreateBoard}>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="board-name">
                Board name
              </label>
              <input
                id="board-name"
                type="text"
                value={newBoard.name}
                onChange={(event) => setNewBoard({ name: event.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Edexcel, AQA, OCR, OCR (MEI)"
              />
            </div>
            <button
              type="submit"
              disabled={isSavingBoard}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 cursor-pointer"
            >
              {isSavingBoard ? 'Saving…' : 'Add board'}
            </button>
          </form>
          <div className="max-h-64 overflow-y-auto border-t border-gray-100 pt-3">
            {boards.length === 0 ? (
              <p className="text-sm text-gray-500">No exam boards yet.</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {boards.map((board) => (
                  <li key={board.id} className="flex items-center justify-between">
                    <span className="text-gray-900">{board.name}</span>
                    <span className="text-[11px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                      {board.slug}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Upload PDF resource</h2>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" onSubmit={handleCreateResource}>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="resource-subject">
              Subject
            </label>
            <select
              id="resource-subject"
              value={newResource.subjectId}
              onChange={(event) => setNewResource((prev) => ({ ...prev, subjectId: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.level ? `${subject.level} – ${subject.name}` : subject.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="resource-board">
              Board
            </label>
            <select
              id="resource-board"
              value={newResource.boardId}
              onChange={(event) => setNewResource((prev) => ({ ...prev, boardId: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select board</option>
              {boards.map((board) => (
                <option key={board.id} value={board.id}>
                  {board.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="resource-category">
              Category
            </label>
            <select
              id="resource-category"
              value={newResource.resourceCategory}
              onChange={(event) =>
                setNewResource((prev) => ({
                  ...prev,
                  resourceCategory: event.target.value as NewResourceForm['resourceCategory'],
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="PAST_PAPER">Past paper</option>
              <option value="NOTES">Notes</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="resource-year">
              Exam year
            </label>
            <input
              id="resource-year"
              type="number"
              value={newResource.examYear}
              onChange={(event) => setNewResource((prev) => ({ ...prev, examYear: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. 2025"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="resource-session">
              Exam session
            </label>
            <input
              id="resource-session"
              type="text"
              value={newResource.examSession}
              onChange={(event) => setNewResource((prev) => ({ ...prev, examSession: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. June, Nov, Practice"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="resource-series">
              Series label (heading)
            </label>
            <input
              id="resource-series"
              type="text"
              value={newResource.seriesLabel}
              onChange={(event) => setNewResource((prev) => ({ ...prev, seriesLabel: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. June 2025 GCSE Practice Papers"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="resource-tier">
              Tier (optional)
            </label>
            <input
              id="resource-tier"
              type="text"
              value={newResource.tier}
              onChange={(event) => setNewResource((prev) => ({ ...prev, tier: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. Higher, Foundation"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="resource-label">
              Label
            </label>
            <input
              id="resource-label"
              type="text"
              value={newResource.label}
              onChange={(event) => setNewResource((prev) => ({ ...prev, label: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. Paper 1, Solutions, Grade boundaries"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-semibold text-gray-600 uppercase tracking-wide"
              htmlFor="resource-source-label"
            >
              Source (optional)
            </label>
            <input
              id="resource-source-label"
              type="text"
              value={newResource.sourceLabel}
              onChange={(event) => setNewResource((prev) => ({ ...prev, sourceLabel: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. By Hannah Kettle Maths"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="resource-order">
              Order index
            </label>
            <input
              id="resource-order"
              type="number"
              value={newResource.orderIndex}
              onChange={(event) => setNewResource((prev) => ({ ...prev, orderIndex: event.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0, 1, 2… (optional)"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="resource-file">
              PDF file
            </label>
            <input
              id="resource-file"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-900 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
            <p className="text-[11px] text-gray-400">Upload the PDF for this note or past paper.</p>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isSavingResource}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 cursor-pointer w-full md:w-auto"
            >
              {isSavingResource ? 'Uploading…' : 'Add resource'}
            </button>
          </div>
        </form>

        <div className="overflow-x-auto border-t border-gray-100 pt-4">
          {resources.length === 0 ? (
            <p className="text-sm text-gray-500">No resources uploaded yet.</p>
          ) : (
            <table className="min-w-full text-xs md:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Subject</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Board</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Year</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Session</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Tier</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Category</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Label</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">File</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => {
                  const subject = subjectById(resource.subject_id)
                  const board = boardById(resource.board_id)
                  const publicUrl =
                    resource.url &&
                    supabase.storage.from(STORAGE_BUCKET).getPublicUrl(resource.url).data.publicUrl

                  return (
                    <tr key={resource.id} className="border-t border-gray-100">
                      <td className="px-3 py-2 text-gray-900">
                        {subject
                          ? subject.level
                            ? `${subject.level} – ${subject.name}`
                            : subject.name
                          : '—'}
                      </td>
                      <td className="px-3 py-2 text-gray-900">{board ? board.name : '—'}</td>
                      <td className="px-3 py-2 text-gray-700">{resource.exam_year ?? '—'}</td>
                      <td className="px-3 py-2 text-gray-700">{resource.exam_session ?? '—'}</td>
                      <td className="px-3 py-2 text-gray-700">{resource.tier ?? '—'}</td>
                      <td className="px-3 py-2 text-gray-700">{resource.resource_category}</td>
                      <td className="px-3 py-2 text-gray-900">{resource.label}</td>
                      <td className="px-3 py-2 text-indigo-600">
                        {publicUrl ? (
                          <a
                            href={publicUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-2 hover:text-indigo-800"
                          >
                            Open
                          </a>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}

export default AdminNotesManager

