import React from 'react'

const ContextNotusePage = () => {
  return (
    <div>
      <GrandParent style='color:red' value='안녕하세요'></GrandParent>
    </div>
  )
}

function GrandParent(props) {
  return <Parent value={props.value} />
}

function Parent({ value }) {
  return <Child value={value} />
}

function Child({ value }) {
  return <div>Received: {value}</div>
}

export default ContextNotusePage
