import React from 'react'
import {
  data,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router'
import ResumeForm from '~/components/ResumeForm'
import { getTokens } from '~/utils'
import apiCall from '~/utils/api'
import type { Route } from './+types/_app.resumes.($id)'
import Resumes from '~/components/Resumes'

type View = 'NEW' | 'LIST' | 'ID'

export const action = async ({ request }: ActionFunctionArgs) => {
  const { accessToken } = await getTokens(request.headers)

  const formData = await request.formData()

  const formId: ResumeFormId | null = formData.get('formId') as ResumeFormId

  switch (formId) {
    case 'TITLE_FORM': {
      const data = {
        title: formData.get('title')?.toString(),
      }

      const { error } = await apiCall.postTitle(data, accessToken)

      if (error) console.error(error)

      break
    }
  }
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { accessToken } = await getTokens(request.headers)

  const { data: outData } = await apiCall.getMyResumes(accessToken)

  let view: View = 'LIST'

  if (params.id && params.id === 'new') view = 'NEW'
  else if (params.id) view = 'ID'

  return data({ ...outData, view })
}

const ResumesIndex = ({ loaderData }: Route.ComponentProps) => {
  const resumes = loaderData?.resumes
  const view = loaderData.view

  return (
    <section className="px-5 flex justify-center">
      <div className="prose container mt-5">
        <h2>
          {view === 'LIST' && 'Resumes'}
          {view === 'ID' && `Resume Title`}
          {view === 'NEW' && `New Resume`}
        </h2>
        <div>
          {view === 'LIST' ? <Resumes resumes={resumes} /> : <ResumeForm />}
        </div>
      </div>
    </section>
  )
}

export default ResumesIndex
