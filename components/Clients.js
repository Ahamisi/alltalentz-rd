// @ts-ignore
// import Slider from 'react-slick';

const clientImages = [
    '/clients/client-1.png',
    '/clients/client-1.png',
    '/clients/client-1.png',
    '/clients/client-1.png',
    // Add more client images here
  ];

  


const Clients = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };



  return (
    <>
    </>
    // <Slider {...settings}>
    //   {clientImages.map((image, index) => (
    //     <div key={index} className="flex items-center justify-center">
    //       <img src={image} alt={`Client ${index + 1}`} className="max-w-full h-auto" />
    //     </div>
    //   ))}
    // </Slider>
  )
}

export default Clients
