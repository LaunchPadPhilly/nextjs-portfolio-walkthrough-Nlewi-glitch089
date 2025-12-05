"use client"

import React, { useState, useEffect } from 'react'
import TechnologyInput from './TechnologyInput'

export default function ProjectForm({ isOpen, onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [technologies, setTechnologies] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setDescription('')
      setImageUrl('')
      setProjectUrl('')
      setGithubUrl('')
      setTechnologies([])
      setErrors({})
      setSubmitting(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  function validate() {
    const e = {}
    if (!title.trim()) e.title = 'Title is required'
    if (!description.trim()) e.description = 'Description is required'
    if (!Array.isArray(technologies) || technologies.length === 0) e.technologies = 'At least one technology is required'

    const urlRegex = /^(https?:\/\/).+/i
    if (imageUrl && !urlRegex.test(imageUrl)) e.imageUrl = 'Please enter a valid URL'
    if (projectUrl && !urlRegex.test(projectUrl)) e.projectUrl = 'Please enter a valid URL'
    if (githubUrl && !urlRegex.test(githubUrl)) e.githubUrl = 'Please enter a valid URL'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e && e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const payload = {
      title,
      description,
      imageUrl,
      projectUrl,
      githubUrl,
      technologies
    }
    try {
      await onSubmit && onSubmit(payload)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#05010a] border border-[rgba(255,255,255,0.03)] rounded-lg p-8 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-extrabold text-foreground mb-6">Add New Project</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-foreground font-semibold mb-2">Project Title</label>
            <input
              aria-label="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border text-foreground placeholder-[#b6b6c8] focus:outline-none focus:border-[#00f0ff] transition-colors ${
                errors.title ? 'border-red-500' : 'border-[rgba(255,255,255,0.03)]'
              }`}
            />
            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
          </div>

          <div>
            <label className="block text-foreground font-semibold mb-2">Description</label>
            <textarea
              aria-label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border text-foreground placeholder-[#b6b6c8] focus:outline-none focus:border-[#00f0ff] transition-colors resize-none ${
                errors.description ? 'border-red-500' : 'border-[rgba(255,255,255,0.03)]'
              }`}
              rows="4"
            />
            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
          </div>

          <div>
            <label className="block text-foreground font-semibold mb-2">Image URL</label>
            <input
              aria-label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border text-foreground placeholder-[#b6b6c8] focus:outline-none focus:border-[#00f0ff] transition-colors ${
                errors.imageUrl ? 'border-red-500' : 'border-[rgba(255,255,255,0.03)]'
              }`}
            />
            {errors.imageUrl && <div className="text-red-500 text-sm mt-1">{errors.imageUrl}</div>}
          </div>

          <div>
            <label className="block text-foreground font-semibold mb-2">Project URL</label>
            <input
              aria-label="Project URL"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              className={`w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border text-foreground placeholder-[#b6b6c8] focus:outline-none focus:border-[#00f0ff] transition-colors ${
                errors.projectUrl ? 'border-red-500' : 'border-[rgba(255,255,255,0.03)]'
              }`}
            />
            {errors.projectUrl && <div className="text-red-500 text-sm mt-1">{errors.projectUrl}</div>}
          </div>

          <div>
            <label className="block text-foreground font-semibold mb-2">GitHub URL</label>
            <input
              aria-label="GitHub URL"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className={`w-full px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border text-foreground placeholder-[#b6b6c8] focus:outline-none focus:border-[#00f0ff] transition-colors ${
                errors.githubUrl ? 'border-red-500' : 'border-[rgba(255,255,255,0.03)]'
              }`}
            />
            {errors.githubUrl && <div className="text-red-500 text-sm mt-1">{errors.githubUrl}</div>}
          </div>

          <div>
            <label className="block text-foreground font-semibold mb-2">Technologies</label>
            <TechnologyInput technologies={technologies} onChange={setTechnologies} />
            {errors.technologies && <div className="text-red-500 text-sm mt-1">{errors.technologies}</div>}
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-md border border-[rgba(255,255,255,0.03)] text-[#b6b6c8] hover:text-foreground hover:bg-[rgba(255,255,255,0.02)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[#00f0ff] to-[#ff3bd6] text-[#0b0b0b] font-extrabold hover:scale-[1.02] disabled:opacity-50 transition-all"
            >
              {submitting ? 'Submitting...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
