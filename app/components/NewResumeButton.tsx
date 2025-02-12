import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router'

const NewResumeButton = () => {
  const navigator = useNavigate()

  const handleClick = async () => {
    await navigator('/resumes/new')
  }

  return (
    <Button
      className="border-2 border-dashed flex flex-col items-center justify-center w-[20%] aspect-[210/297] max-w-full min-w-44"
      onClick={handleClick}
    >
      <span className="text-4xl">+</span>
      <span className="text-lg">Add Resume</span>
    </Button>
  )
}

export default NewResumeButton
