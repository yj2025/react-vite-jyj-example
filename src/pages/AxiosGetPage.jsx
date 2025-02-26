import React from 'react'

const AxiosGetPage = () => {
  const [data, setData] = useState(null)

  const getUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      // 통신 성공
      console.log(response)
    })
  }

  return <div></div>
}

export default AxiosGetPage
