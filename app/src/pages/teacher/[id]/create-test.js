import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const CreateTest = () => {
  const router = useRouter()
  const { id: courseId } = router.query
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctOption: 0 },
  ])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctOption: 0 },
    ])
  }

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/tests', {
        courseId,
        questions,
      })
      alert('Test done')
    } catch (error) {
      console.error('Error test making', error)
    }
  }

  return (
    <div>
      <h1>Create test for this course</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            value={question.questionText}
            onChange={(e) =>
              setQuestions(
                questions.map((q, i) =>
                  i === index ? { ...q, questionText: e.target.value } : q
                )
              )
            }
            placeholder="Question"
          />
          {question.options.map((option, optIndex) => (
            <input
              key={optIndex}
              type="text"
              value={option}
              onChange={(e) =>
                setQuestions(
                  questions.map((q, i) =>
                    i === index
                      ? {
                          ...q,
                          options: q.options.map((opt, oIndex) =>
                            oIndex === optIndex ? e.target.value : opt
                          ),
                        }
                      : q
                  )
                )
              }
              placeholder={`Option ${optIndex + 1}`}
            />
          ))}
          <select
            value={question.correctOption}
            onChange={(e) =>
              setQuestions(
                questions.map((q, i) =>
                  i === index
                    ? { ...q, correctOption: parseInt(e.target.value) }
                    : q
                )
              )
            }
          >
            {question.options.map((option, optIndex) => (
              <option key={optIndex} value={optIndex}>
                Right answer {optIndex + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={addQuestion}>Add question</button>
      <button onClick={handleSubmit}>Add test now</button>
    </div>
  )
}

export default CreateTest
