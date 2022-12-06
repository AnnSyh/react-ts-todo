import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AboutPage: React.FC = () => {
  const history = useNavigate()
  return (
    <>
      <h1>About page</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis molestiae laudantium culpa quae dolorem, minus similique, rerum tempora omnis fugit beatae perferendis sed sequi debitis, enim a mollitia ducimus quaerat.</p>
      <button
        className='btn'
        onClick={() => history('/')}
      >Обратно к списку дел</button>
    </>
  )
}