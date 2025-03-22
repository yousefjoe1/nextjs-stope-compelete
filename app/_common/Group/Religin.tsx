import React from 'react'
import ReliginForm from '../ReligenQuestions/components/ReliginForm'

const Religin = ({group}:{group: string}) => {
  return (
    <section>

      <ReliginForm grRef={group} />
        <div className="overflow-x-auto">
          <h5>جدول الاجابات</h5>
          {/* <AnswersTable data={serverResponse} /> */}
        </div>
    </section>
  )
}

export default Religin