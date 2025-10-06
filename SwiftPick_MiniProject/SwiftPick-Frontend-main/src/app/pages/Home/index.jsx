import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import ProductCard from "../../components/common/ProductCard";
import { api } from "../../../utils/api";
import Layout from "../../layout/Layout";
import { slides } from "../../data/HomePageData";
import { categoryphotos } from "../../data/HomePageData";
import ProductCardLoader from "../../components/common/Loader/ProductCardLoader";

const Home = () => {
  const [products, setproducts] = useState([]);
  const [filters] = useState([]);
  const [checked] = useState([]);
  const [page] = useState(1);
  const [perpage] = useState(14);
  const [productloader, setProductLoader] = useState(true);

  const filterProducts = async () => {
    setProductLoader(true);
    try {
      const res = await fetch(
        `${api}/api/v1/products?checked=${checked}&filters=${filters}&perpage=${perpage}&page=${page}`
      );
      const data = await res.json();
      if (data.success) {
        setProductLoader(false);
      }
      setproducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line
  }, [checked, filters, page]);

  return (
    <Layout title="Home - SwiftPick">
      <div id="carouselExampleCaptions" className="relative w-full">
        {/* Carousel items */}
        <div className="relative w-full overflow-hidden after:clear-both  after:block after:content-['']">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper flex-shrink"
          >
            {slides?.map((slide, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-center  text-xl">
                    <img
                      src={slide?.image}
                      alt={slide.label}
                      className="w-full"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className=" py-8 grid grid-cols-3 lg:grid-cols-6 sm:grid-cols-4 gap-4">
        {categoryphotos?.map((photos, index) => {
          return (
            <Link to={`/products/${photos.label}`} key={index}>
              <div className=" flex flex-col items-center justify-center  ">
                <img
                  src={photos?.image}
                  alt={photos.label}
                  className="w-3/5 h-3/4 object-contain rounded-full"
                />
                <h1 className="text-indigo-500 text-sm sm:text-md font-medium text-center">
                  {photos.label}
                </h1>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Product List Section - Limited to 6 Products */}
      <div className=" py-2 px-4 mx-auto  ">
        <div className="flex justify-between items-center uppercase">
          <h1 className="text-lg font-bold sm:font-bold sm:text-xl text-indigo-500  ">
            featured Products
          </h1>
          <Link
            to="/products/all"
            className="flex items-center gap-2 hover:underline py-3 font-medium text-indigo-500 font px-4"
          >
            see all products
            <FaLongArrowAltRight className="text-xl" />
          </Link>
        </div>
        <div className="mt-6 py-2 grid grid-cols-1 gap-x-8  gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4   lg:gap-x-8 xl:gap-x-8  ">
          {products?.map((product, id) => {
            return productloader ? (
              <ProductCardLoader />
            ) : (
              <ProductCard product={product} key={id} />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
