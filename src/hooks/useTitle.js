import { TitleContext } from "../contexts/TitleContext"
import { useContext, useEffect } from "react"

const useTitle = text => {
  const { title, setTitle } = useContext(TitleContext)
  
  useEffect(() => setTitle(text), [text, setTitle])
  // console.log(text)
  // console.log(title)
  return title
}

export default useTitle
