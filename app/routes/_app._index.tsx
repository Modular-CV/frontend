import React from 'react'
import NewResumeButton from '~/components/NewResumeButton'
import FavoriteSvg from '~/static/images/FavoriteSvg'

const Dashboard = () => {
  return (
    <section className="px-5 flex justify-center">
      <div className="mt-5 flex flex-col prose container">
        <h2 className="flex items-center gap-2">
          <a href="/resumes">Resumes</a>
          <div className="size-4">
            <FavoriteSvg />
          </div>
        </h2>
        <div className="flex gap-5 overflow-auto">
          <NewResumeButton />
        </div>
      </div>
    </section>
  )
}

export default Dashboard
