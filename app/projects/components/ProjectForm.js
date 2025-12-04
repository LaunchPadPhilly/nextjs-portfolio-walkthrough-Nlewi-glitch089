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
    <div>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Title</label>
          <input
            aria-label="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <div>{errors.title}</div>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            aria-label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && <div>{errors.description}</div>}
        </div>

        <div>
          <label>Image URL</label>
          <input aria-label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          {errors.imageUrl && <div>{errors.imageUrl}</div>}
        </div>

        <div>
          <label>Project URL</label>
          <input aria-label="Project URL" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} />
          {errors.projectUrl && <div>{errors.projectUrl}</div>}
        </div>

        <div>
          <label>GitHub URL</label>
          <input aria-label="GitHub URL" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
          {errors.githubUrl && <div>{errors.githubUrl}</div>}
        </div>

        <div>
          <label>Technologies</label>
          <TechnologyInput technologies={technologies} onChange={setTechnologies} />
          {errors.technologies && <div>{errors.technologies}</div>}
        </div>

        <div>
          <button type="submit" disabled={submitting}>{submitting ? 'Creating Project...' : 'Create Project'}</button>
          <button type="button" onClick={() => onCancel && onCancel()}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
