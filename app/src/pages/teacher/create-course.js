import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const CreateCourse = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const router = useRouter()

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      router.push('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('content', content)
    if (file) {
      formData.append('file', file)
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/courses',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      router.push(`/courses/${response.data.course._id}`)
    } catch (error) {
      console.error('Error creating course', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label>Media:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Create Course</button>
    </form>
  )
}

export default CreateCourse
