import React from 'react'
import NewResumeButton from './NewResumeButton'

type Props = {
  resumes?: Resume[]
}

const Resumes = ({ resumes }: Props) => {
  return (
    <div className="flex flex-wrap gap-5 justify-between">
      <NewResumeButton />
      {resumes?.map((resume) => {
        return (
          <div
            className="border-2 flex flex-col items-center justify-center w-[20%] aspect-[210/297] max-w-full min-w-44"
            key={resume.id}
          >
            {resume.title}
          </div>
        )
      })}
    </div>
  )
}

export default Resumes
