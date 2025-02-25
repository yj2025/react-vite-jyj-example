import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import BoardPage from '../pages/BoardPage'
import HelloPage from '../pages/HelloPage'
import JSXPage from '../pages/JSXPage'
import ConditionalPage from '../pages/ConditionalPage'

// React Routes, Route 사용시 배열로 관리하기
const routes = [
  {
    path: '/',
    element: <HomePage />,
    title: 'Home',
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    title: 'profile',
  },
  {
    path: '/board',
    element: <BoardPage />,
    title: 'board',
  },
  {
    path: '/hello',
    element: <HelloPage />,
    title: 'hello',
  },
  {
    path: '/jsx',
    element: <JSXPage />,
    title: 'jsx문법',
  },
  {
    path: '/conditionalPage',
    element: <ConditionalPage />,
    title: '조건부랜더링',
  },
]
export default routes
