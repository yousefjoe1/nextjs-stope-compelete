import RegisterForm from '@/app/_common/Auth/Register'
import React from 'react'

const page = () => {
  return (
    <section className='min-h-screen bg-gray-100'>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <RegisterForm />
        </div>
      </div>
    </section>
  )
}

export default page