import React from 'react'
import General from '../_common/Group/General'
import Religin from '../_common/Group/Religin'

const page = async ({ searchParams }: { searchParams: { t?: string,g: string } }) => {
  const type = searchParams.t
  const id = searchParams.g

  return (
    <section dir='rtl' className='my-container px-10'>

      {
        type == 'religin' ? <h3 className='lg:mb-10 mb-5 text-center font-bold lg:text-2xl'>المجموعة الدينية</h3> : <h3>المجموعة العامة</h3> 
      }

      {
        type == 'religin' ? <Religin group={id} /> : <General />
      }

    </section>
  )
}

export default page