import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FaChevronRight, FaFilePdf, FaVideo, FaExternalLinkAlt } from 'react-icons/fa'
import type { PaperSection, PaperLink } from '../types/predictedPapers'
import { loadSections } from '../utils/predictedPapersStorage'

const PredictedPapers = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2)
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.15)
  const [sections] = useState<PaperSection[]>(() => loadSections())

  const sortedSections = [...sections].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <>
      <section
        ref={heroRef}
        id="papers"
        className={`py-12 md:py-16 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden transition-all duration-300 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm mb-5" aria-label="Breadcrumb">
            <Link to="/" className="text-white/90 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/60 rounded px-1 py-0.5" aria-label="Home">
              Home
            </Link>
            <FaChevronRight className="text-white/70 w-3 h-3" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">Predicted papers</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            Predicted papers
          </h1>
          <p className="text-lg md:text-xl font-semibold text-white/95 mb-2">
            Practice papers
          </p>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
            Buy and Download papers and watch video solutions, organised by section.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-linear-to-b from-gray-50 to-white">
        <div
          ref={contentRef}
          className={`container mx-auto px-4 max-w-5xl transition-all duration-300 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {sortedSections.length === 0 ? (
            <div className="card-material overflow-hidden p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <FaFilePdf className="w-8 h-8 text-indigo-600" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">No papers yet</h2>
                <p className="text-gray-600">Practice papers and video solutions will appear here once they are added. Check back soon.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-14">
              <p className="text-center text-gray-600 text-base max-w-xl mx-auto">
                Select a section below to open papers (PDF) and solution videos.
              </p>
              {sortedSections.map((section) => {
                const columnLabels = section.columnLabels ?? ['Paper 1', 'Paper 2', 'Paper 3']
                return (
                  <div key={section.id} className="card-material overflow-hidden shadow-lg shadow-gray-200/50">
                    <div className="flex">
                      <div className="w-1.5 min-h-full bg-linear-to-b from-indigo-500 to-purple-500 shrink-0" aria-hidden="true" />
                      <div className="flex-1 p-6 md:p-8 min-w-0">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 gradient-text">
                          {section.title || 'Practice papers'}
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">Exam board · Papers · Video solutions</p>
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left py-4 px-4 font-semibold text-gray-700 w-40">Exam board</th>
                                {columnLabels.flatMap((label, colIndex) => [
                                  <th key={`p-${colIndex}`} className="text-left py-4 px-4 font-semibold text-gray-700 whitespace-nowrap">{label}</th>,
                                  <th key={`s-${colIndex}`} className="text-left py-4 px-4 font-semibold text-gray-700 whitespace-nowrap">Solution</th>,
                                ])}
                              </tr>
                            </thead>
                            <tbody>
                              {section.rows.map((row, rowIndex) => {
                                const papers = row.papers ?? []
                                const isEven = rowIndex % 2 === 0
                                return (
                                  <tr
                                    key={row.id}
                                    className={`border-b border-gray-100 last:border-b-0 ${isEven ? 'bg-white' : 'bg-gray-50/50'} hover:bg-indigo-50/30 transition-colors`}
                                  >
                                    <td className="py-4 px-4 font-medium text-gray-900">{row.examBoard || '—'}</td>
                                    {columnLabels.map((label, colIndex) => {
                                      const link: PaperLink = papers[colIndex] ?? {}
                                      const hasPdf = !!(link.pdfDataUrl || link.pdfUrl)
                                      const hasVideo = !!(link.solutionDataUrl || link.solutionVideoUrl)
                                      return (
                                        <React.Fragment key={colIndex}>
                                          <td className="py-4 px-4">
                                            {hasPdf ? (
                                              <a
                                                href={link.pdfDataUrl || link.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                                                aria-label={`${row.examBoard} ${label} PDF`}
                                              >
                                                <FaFilePdf className="w-4 h-4 shrink-0" aria-hidden="true" />
                                                PDF
                                                <FaExternalLinkAlt className="w-3 h-3 opacity-70" aria-hidden="true" />
                                              </a>
                                            ) : (
                                              <span className="text-gray-300">—</span>
                                            )}
                                          </td>
                                          <td className="py-4 px-4">
                                            {hasVideo ? (
                                              <a
                                                href={link.solutionDataUrl || link.solutionVideoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                                                aria-label={`${row.examBoard} ${label} solution video`}
                                              >
                                                <FaVideo className="w-4 h-4 shrink-0" aria-hidden="true" />
                                                Video
                                                <FaExternalLinkAlt className="w-3 h-3 opacity-70" aria-hidden="true" />
                                              </a>
                                            ) : (
                                              <span className="text-gray-300">—</span>
                                            )}
                                          </td>
                                        </React.Fragment>
                                      )
                                    })}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default PredictedPapers
