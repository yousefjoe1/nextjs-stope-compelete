import { getData } from '@/actions/getGroups'
import React from 'react'
import GroupCard from './GroupCard'

const GroupCards = async () => {
    const data = await getData('groups')
    console.log("🚀 ~ GroupCards ~ data:", data)
  return (
    <div>

        {data?.data?.map((group:any) => (
            <GroupCard group={group} key={group._id} />
        ))}
        
    </div>
  )
}

export default GroupCards