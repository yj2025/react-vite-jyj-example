import React, { useState } from 'react'

// state란 리액트가 관리하는 화면 갱신용 변수
const Counter = () => {
  //   let number = 0
  const [number, setNumber] = useState(0)

  const onIncrease = () => {
    // number = number + 1
    setNumber(number + 1)
    // setNumber((number) => number + 1) 이것도 가능

    console.log(number)
  }
  const onDecrease = () => {
    // number = number - 1
    setNumber(number - 1)
  }
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}

export default Counter
