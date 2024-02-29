import React from 'react'
import RatingCard from './RatingCard'
const Testimonials = () => {
  return (
    <div className='flex flex-col mx-4 my-5'>
      <div className='font-roboto text-xl text-white font-bold'>Read What Others Have To Say</div>
      <div className='flex flex-row overflow-x-scroll mt-4 space-x-3 no-scrollbar'>
        <RatingCard comment="Brilliant, I’ve been using Notd for a year and I have never been this happy" avatar="" rating={3} name="Sara Hutchinson" title="Software Engineer"/>
        <RatingCard comment="Brilliant, I’ve been using Notd for a year and I have never been this happy" avatar="" rating={3} name="Sara Hutchinson" title="Software Engineer"/>
        <RatingCard comment="Brilliant, I’ve been using Notd for a year and I have never been this happy" avatar="" rating={3} name="Sara Hutchinson" title="Software Engineer"/>
      </div>
    </div>
  )
}

export default Testimonials 
