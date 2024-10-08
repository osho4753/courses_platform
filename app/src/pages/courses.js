import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
export default function Courses() {
  const [courses, setCourses] = useState([])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      router.push('/')
    }
  }, [])
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/courses')
        setCourses(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching courses', error)
      }
    }
    fetchCourses()
  }, [])

  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            {course.media && (
              <Image
                src={`http://localhost:5000/${course.media}`}
                alt={course.title}
                width={300}
                height={250}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
