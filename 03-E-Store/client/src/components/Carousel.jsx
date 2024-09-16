import { hero_images } from '../assets/images'

const Carousel = () => {
  return (
    <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
      {hero_images.map((image, index) => {
        return (
          <div key={index} className="carousel-item">
            <img src={image} className="rounded-box h-full w-80 object-cover" />
          </div>
        )
      })}
    </div>
  )
}
export default Carousel
