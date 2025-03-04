import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

import img1 from '../pages/images/1.jpg'
import img2 from '../pages/images/2.jpg'
import img3 from '../pages/images/3.jpg'

const ImageSlider = () => {
  const images = [img1, img2, img3]

  return (
    <Swiper pagination={{ clickable: true }} modules={[Pagination]} loop={true}>
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img src={src} alt={`Slide ${index + 1}`} style={{ width: '100%', borderRadius: '10px' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSlider
