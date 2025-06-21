import {createContext, useContext, useState} from 'react'

const SummaryContext = createContext()

export const SummaryProvider = ({children}) => {
    const [summary, setSummary] = useState("")
    const [videos, setVideos] = useState([])
    const [formData, setFormData] = useState({title: "", author:""})
  return (
   <SummaryContext.Provider
   value={{
    summary, 
    setSummary, 
    videos, 
    setVideos, 
    formData, 
    setFormData
   }}
   >
    {children}
   </SummaryContext.Provider>
  )
}

export const useSummary = () => useContext(SummaryContext)