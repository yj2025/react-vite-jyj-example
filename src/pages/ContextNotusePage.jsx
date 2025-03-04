import React from 'react'

const ContextNotusePage = () => {
  return <div>12</div>
}

function GrandParent({ value }) {
  return <Parent value={value} />
}

function Parent({ value }) {
  return <Child value={value} />
}

function Child({ value }) {
  return <div>Received: {value}</div>
}

export default ContextNotusePage
