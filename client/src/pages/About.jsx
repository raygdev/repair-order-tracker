import React, { useEffect } from 'react'
import chart from '@assets/chart.png'
import diagnostics from '@assets/diagnostics.png'
import watch from '@assets/watch.png'

export default function About(){
  useEffect(() => {
    document.title = 'About'
  }, [])
  return (
    <div className='flex py-48 px-4'>
      <main className='my-9 mx-auto'>
        <h1 className='text-4xl text-center uppercase'>The Tool You Didn't Know you needed</h1>
        <section className='flex flex-col justify-center mt-32 px-4 md:flex-row md:gap-10 md: max-w-3xl'>
          <img src={diagnostics} alt="two men diagnosing a vehicle" />
          <p className='text-lg text-center mt-5'>Keep track of the vehicles you diagnose and repair</p>
        </section>
        <section className='flex flex-col justify-center mt-32 px-4 md:flex-row md:gap-10 md: max-w-3xl'>
          <img src={watch} alt="a person checking thier watch" />
          <p className='text-lg text-center mt-5'>
            Time is money, so we keep track of it for you to make
            sure you are getting your max paycheck
          </p>
        </section>
        <section className='flex flex-col justify-center mt-32 px-4 md:flex-row md:gap-10 md: max-w-3xl'>
          <img src={chart} alt="a chart for tracking metrics" />
          <p className='text-lg text-center mt-5'>
            See where you stand throughout the year in sales
            and hours to have a metric for raises.
          </p>
        </section>
      </main>
    </div>
  )
}
