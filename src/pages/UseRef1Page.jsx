import React, { useRef, useState } from 'react'

const UseRef1Page = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  console.log(countRef)
  console.log('호출되고 있음')

  const increaseCountState = () => {
    setCount(count + 1)
  }

  const increaseCountRef = () => {
    countRef.current = countRef.current + 1
  }

  //prettier-ignore
  return (
    <div className='text-center mt-5'>
        <p>State :{count}</p>
        <p>Ref :{countRef.current}</p>
        <button onClick={increaseCountState}>State 값 올리라</button>
        <button onClick={increaseCountRef}>Ref 값 올리라</button>
    </div>
  )
}

export default UseRef1Page
