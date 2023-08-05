import { useRouter } from 'next/router'
import React from 'react'

const FolderDetails = () => {

    const router = useRouter();

    const {name, id} = router.query;

  return (
    <div>FolderDetails: {name} {id}</div>
  )
}

export default FolderDetails