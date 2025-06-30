import React from 'react'
import General from '../_common/Group/General'
import Religin from '../_common/Group/Religin'
import GroupLink from '../_common/Buttons-Links/GroupLink';
// import { Button } from '@/components/ui/button'

const page = async ({ searchParams }: { searchParams: Promise<{ t?: string, g: string }> }) => {
  const params = await searchParams; // Await the Promise
  const type = params.t;
  const id = params.g;

  return (
    <section dir='rtl' className='my-container px-10'>
      {/* <Button
        // onClick={() => handleCopy(`https://stop-complete-g.vercel.app/religin?g=${grRef}`)}
      >
        اضغط لنسخ اللينك و ترسلة لاصدقائك
      </Button> */}
      <GroupLink grRef={id} />
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