import React from 'react'
import ProfileForm from './ProfileForm'
import { useSubmit } from 'react-router'
import TitleForm from './TitleForm'

const ResumeForm = () => {
  const submit = useSubmit()

  const submitTitle = async (data: TitleForm) => {
    await submit(data, { method: 'POST' })
  }

  return (
    <div>
      <div className="flex flex-col gap-5">
        <TitleForm onValid={submitTitle} />
        <div className="rounded-md bg-slate-100 p-5 border shadow-md">
          <h3 className="mt-0">Profile</h3>
          <ProfileForm />
        </div>
      </div>
    </div>
  )
}

export default ResumeForm
