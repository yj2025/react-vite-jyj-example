import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import BoardPage from '../pages/BoardPage'
import HelloPage from '../pages/HelloPage'
import JSXPage from '../pages/JSXPage'
import ConditionalPage from '../pages/ConditionalPage'
import BootStrapPage from '../pages/BootStrapPage'
import CounterPage from '../pages/CounterPage'
import UseEffectPage from '../pages/UseEffectPage'
import UseRef1Page from '../pages/UseRef1Page'
import UseRef2Page from '../pages/UseRef2Page'

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
  {
    path: '/bootStrap',
    element: <BootStrapPage />,
    title: '부트스트랩적용',
  },
  {
    path: '/usestate',
    element: <CounterPage />,
    title: 'useState-연습',
  },
  {
    path: '/useeffect',
    element: <UseEffectPage />,
    title: 'useEffect-연습',
  },
  {
    path: '/useref',
    element: <UseRef1Page />,
    title: 'useRef-1',
  },
  {
    path: '/useref2',
    element: <UseRef2Page />,
    title: 'useRef-2',
  },
]
export default routes
