import React from 'react'
import {
  data,
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
} from 'react-router'
import ResumeForm from '~/components/ResumeForm'
import { getTokens } from '~/utils'
import apiCall from '~/utils/api'
import type { Route } from './+types/_app.resumes.($id)'
import Resumes from '~/components/Resumes'

type View = 'NEW' | 'LIST' | 'ID'

export const clientLoader = async ({
  request,
  params,
}: ClientLoaderFunctionArgs) => {
  const { accessToken } = await getTokens(request.headers)

  const { data: outData } = await apiCall.getMyResumes(accessToken)

  let view: View = 'LIST'

  if (params.id && params.id === 'new') view = 'NEW'
  else if (params.id) view = 'ID'

  return data({ ...outData, view })
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const { accessToken } = await getTokens(request.headers)

  const formData = await request.formData()

  const formId: ResumeFormId | null = formData.get('formId') as ResumeFormId

  switch (formId) {
    case 'TITLE_FORM': {
      const data: Partial<TitleInput> = {
        title: formData.get('title')?.toString(),
      }

      const { error } = await apiCall.postTitle(data, accessToken)

      if (error) console.error(error)

      break
    }

    case 'PROFILE_FORM': {
      const data: Partial<ProfileInput> = {
        fullName: formData.get('fullName')?.toString(),
        jobTitle: formData.get('jobTitle')?.toString(),
        address: formData.get('address')?.toString(),
        email: formData.get('email')?.toString(),
        phone: formData.get('phone')?.toString(),
      }

      const { error } = await apiCall.postProfile(data, accessToken)

      if (error) console.error(error)

      break
    }
  }
}

const ResumesIndex = ({ loaderData }: Route.ComponentProps) => {
  const resumes = loaderData?.resumes
  const view = loaderData.view

  return (
    <section className="px-5 flex justify-center">
      <div className="prose container mt-5">
        <h2 className="mt-2">
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
