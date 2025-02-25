import React from 'react'

// (props) = {name, age, color}
const Hello = (props) => {
  return (
    // prettier-ignore
    <div style={{ color: props.color}}>
      안녕하세요{props.name} <br/>
      색상:{props.color}<br/>
      나이:{props.age}<br/>
    </div>
  )
}

export default Hello
