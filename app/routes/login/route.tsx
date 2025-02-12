import React, { Fragment, useEffect } from 'react'
import Button from '~/components/Button'
import { useTranslation } from 'react-i18next'
import { toast, ToastContainer } from 'react-toastify'
import Toast from '~/components/Toast'
import LoginForm from '~/components/LoginForm'
import LanguagePicker from '~/components/LanguagePicker'
import {
  redirect,
  useSubmit,
  type ClientActionFunctionArgs,
} from 'react-router'
import apiCall from '~/utils/api'
import { errorHandler, sleep } from '~/utils'
import type { Route } from './+types/route'
import loader from './loader'

export const action = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()

  const data = {
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  }

  const { response, error } = await apiCall.login(data)

  if (error) return { error }

  const setCookie = response.headers['set-cookie']!

  return redirect('/', {
    headers: setCookie.map((cookie) => ['set-cookie', cookie]),
  })
}

const Login = ({ actionData }: Route.ComponentProps) => {
  const { t } = useTranslation()
  const submit = useSubmit()

  const onValid = async (data: LoginForm) => {
    await sleep(1000)
    await submit(data, { method: 'POST' })
  }

  const handleError = async () => {
    if (!actionData) return
    const message = await errorHandler(actionData.error)
    notify({ message, error: true })
  }

  const notify = ({ message, error }: { message: string; error?: boolean }) => {
    if (error) {
      toast.error(Toast, {
        data: message,
      })
      return
    }
  }

  useEffect(() => {
    handleError()
  }, [actionData])

  return (
    <Fragment>
      <ToastContainer />
      <header className="flex fixed w-full justify-center p-2">
        <LanguagePicker />
      </header>
      <main className="flex flex-col grow">
        <section className="flex flex-col grow px-5 justify-center items-center">
          <div className="container prose prose-h2:m-0 flex flex-col justify-evenly grow">
            <div className="flex flex-col">
              <h2 className="text-center">{t('login.welcome')}</h2>
            </div>
            <div className="flex flex-col">
              <LoginForm onValid={onValid} />
            </div>
            <div className="flex flex-col justify-end">
              <Button buttonStyle="secondary">
                {t('login.createAccount')}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  )
}

export { loader }

export default Login
