import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function CoursePage() {
  const router = useRouter()
  const { id } = router.query
  const [course, setCourse] = useState(null)
  const [tests, setTests] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    if (id) {
      const fetchCourseAndTests = async () => {
        try {
          const { data: courseData } = await axios.get(
            `http://localhost:5000/api/courses/${id}`
          )
          setCourse(courseData)

          const { data: testData } = await axios.get(
            `http://localhost:5000/api/tests/${id}`
          )
          setTests(testData)
        } catch (error) {
          console.error('Error fetching course or tests', error)
        }
      }
      fetchCourseAndTests()
    }
  }, [id])
  const handleCreateTest = () => {
    router.push(`/teacher/${id}/create-test`)
  }

  if (!course) return <div>Loading...</div>
  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <Image
        src={`http://localhost:5000/${course.media}`}
        alt={course.title}
        width={300}
        height={250}
      />
      {tests ? (
        <div>
          {tests.map((test) => (
            <div key={test._id}>
              <h3>Test</h3>
              {test.questions.map((question) => (
                <div key={question._id} style={{ marginBottom: '20px' }}>
                  <p>{question.questionText}</p>
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index}>
                        <input
                          type="radio"
                          name={`question-${question._id}`}
                          id={`question-${question._id}-option-${index}`}
                        />
                        <label
                          htmlFor={`question-${question._id}-option-${index}`}
                        >
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>There isnt tests yet</p>
      )}
      {currentUser._id === course.teacher._id && (
        <button onClick={handleCreateTest}>Create Test</button>
      )}
    </div>
  )
}
