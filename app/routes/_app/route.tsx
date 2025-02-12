import React, { Fragment } from 'react'
import { Outlet } from 'react-router'
import type { Route } from './+types/route'
import Header from '~/components/Header'
import loader from './loader'

export const meta = () => {
  const title = import.meta.env.VITE_PROJECT_NAME

  return [{ title }, { name: 'description', content: `Welcome to ${title}` }]
}

const App = ({ loaderData }: Route.ComponentProps) => {
  const { userEmail } = loaderData

  return (
    <Fragment>
      <Header userEmail={userEmail} />
      <main className="flex flex-col grow">
        <Outlet />
      </main>
    </Fragment>
  )
}

export default App

export { loader }
