import { useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resource, setResource] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResource(response.data)
  }

  const createNew = async (newResource) => {
    const response = await axios.post(baseUrl, newResource)
    setResource(resource.concat(response.data))
  }

  return {
    resource,
    getAll,
    createNew
  }
}