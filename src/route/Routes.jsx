import HomePage from '../pages/HomePage'
import ImageSlider from '../pages/ImageSlider'
import NaverMap from '../pages/NaverMap'

// React Routes, Route 사용시 배열로 관리하기
const routes = [
  {
    path: '/',
    element: <HomePage />,
    title: 'Home',
  },
  
  {
    path: '/ImageSlider',
    element: <ImageSlider />,
    title: '이미지 슬라이더',
  },
  {
    path: '/NaverMap',
    element: <NaverMap />,
    title: '네이버 맵',
  },
]
export default routes
