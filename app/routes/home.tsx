import React from 'react'

export const meta = () => {
  return [
    { title: import.meta.env.VITE_PROJECT_NAME },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

const Home = () => {
  return <section>Home</section>
}

export default Home
