import React, { useState } from 'react'

// state란 리액트가 관리하는 화면 갱신용 변수
const Counter2 = () => {
  //   let number = 0
  const [number, setNumber] = useState(0)

  const onIncrease = () => {
    // number = number + 2
    setNumber(number + 2)
    // setNumber((number) => number + 2) 이것도 가능

    console.log(number)
  }
  const onDecrease = () => {
    // number = number - 2
    setNumber(number - 2)
  }
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+2</button>
      <button onClick={onDecrease}>-2</button>
    </div>
  )
}

export default Counter2
