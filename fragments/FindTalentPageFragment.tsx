"use client"
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation';


const FindTalent = () => {
    const route = useRouter()

    useEffect(() => {
        route.push('/request-talent');
    }, [])
    
  return (
    <div>Find Talent....</div>
  )
}

export default FindTalent