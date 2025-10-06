import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { FaMinus } from "react-icons/fa";
import Token from "../../../utils/Token";
import StarRatings from "react-star-ratings";
import { api } from "../../../utils/api";
import Layout from "../../layout/Layout";
import ProductCard from "../../components/common/ProductCard";
import ProductCardLoader from "../../components/common/Loader/ProductCardLoader";
import ProductDetailLoader from "../../components/common/Loader/ProductDetailLoader";

const ProductDetail = () => {
  const token = Token();
  const [Product, setProduct] = useState({});
  const { id } = useParams();
  const [SimilarProducts, setSimilarProducts] = useState([]);
  const [plus, setplus] = useState(1);
  const [similarproduct, setSimilaProductLoader] = useState(true);
  const [productloader, setProductLoader] = useState(true);

  const handleplus = () => {
    if (plus < 5) setplus(plus + 1);
  };

  const handleminus = () => {
    if (plus > 1) setplus(plus - 1);
  };

  const getsingleProduct = async () => {
    setProductLoader(true);
    try {
      const res = await fetch(`${api}/api/v1/singleProducts/${id}`);
      const data = await res.json();
      if (data.Success) {
        setProductLoader(false);
      }
      setProduct(data.product);
      getsimilarProduct(data?.product._id, data?.product.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getsimilarProduct = async (pid, cid) => {
    setSimilaProductLoader(true);
    try {
      const res = await fetch(`${api}/api/v1/similar-products/${pid}/${cid}`);
      const data = await res.json();
      if (data.success) {
        setSimilarProducts(data.products);
        setSimilaProductLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getsingleProduct();
    // eslint-disable-next-line
  }, [id]);

  //add to cart
  const Addcart = async () => {
    try {
      const response = await fetch(`${api}/api/v1/cart/AddProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
        body: JSON.stringify({ productId: Product._id, quantity: plus }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Product added cart successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [mainImage, setMainImage] = useState();

  const changeImage = (src) => {
    setMainImage(src);
  };

  useEffect(() => {
    if (Product?.thumbnail?.length) {
      setMainImage(Product?.thumbnail[0]);
    }
  }, [Product]);

  return (
    <>
      <Layout title="ProductDetail-SwiftPick">
        <div className="bg-white ">
          <div className="container mx-auto px-4 py-8">
            {productloader ? (
              <ProductDetailLoader />
            ) : (
              <div className="flex flex-wrap -mx-4">
                {/* Product Images */}
                <div className="w-full md:w-1/2 px-4 mb-8">
                  <img
                    src={mainImage}
                    alt="Product"
                    className="w-10/12  object-contain mx-auto rounded-lg  mb-4"
                  />
                  <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                    {Product?.thumbnail?.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-20 h-20 object-contain rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                        onClick={() => changeImage(src)}
                      />
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 px-4">
                  <p className="text-indigo-600 mb-1 font-bold ">
                    SP PRODUCTION
                  </p>
                  <h2 className="text-3xl font-semibold mb-2">
                    {Product?.name}
                  </h2>
                  <p className="text-white mb-4 bg-indigo-600 font-medium w-fit px-3 rounded ">
                    {Product?.category}
                  </p>

                  <p className="text-gray-700 mb-6">{Product?.description}</p>

                  <div className="flex items-center mb-4 text-center">
                    <div className="flex items-center">
                      <StarRatings
                        rating={Product.rating}
                        starDimension="20px"
                        starRatedColor="#6366f1"
                        starSpacing="3px"
                      />
                    </div>
                  </div>
                  <div className="mb-4 py-2">
                    <div className="text-2xl flex items-center gap-3 mr-2">
                      <p className="text-2xl font-semibold">
                        ${Product?.pricediscount}
                      </p>
                      <p className="text-sm block py-0.5 px-1.5 rounded-sm bg-indigo-200 font-semibold text-indigo-600">
                        {`${(
                          (1 - Product?.pricediscount / Product?.price) *
                          100
                        ).toFixed(2)}% off`}
                      </p>
                    </div>
                    <span className="text-md block font-medium  line-through text-gray-400">
                      ${Product?.price}
                    </span>
                  </div>

                  <div className="mt-5 mb-16 flex flex-col mg:items-center  mg:flex-row  gap-4 ">
                    <div>
                      <h3 className="text-xl py-2 font-medium text-gray-900">
                        Quantity:
                      </h3>
                      <div className="flex ">
                        <button
                          className="px-5 py-3 bg-gray-100 rounded-l-md text-indigo-600"
                          onClick={handleminus}
                        >
                          <FaMinus />
                        </button>
                        <h2 className=" px-5 py-3  bg-gray-100 font-extrabold text-base text-gray-900">
                          {plus}
                        </h2>

                        <button
                          className="px-5 py-3 rounded-r-md bg-gray-100 text-indigo-600"
                          onClick={handleplus}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <Link
                        to="/cart"
                        onClick={Addcart}
                        className="bg-indigo-600 absolute flex  gap-2 items-center w-fit justify-center  text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none font-medium focus:ring-2 shadow-indigo-400 shadow-sm focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <PiShoppingCartDuotone className="text-xl" />
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!similarproduct && SimilarProducts?.length <= 0 ? null : (
              <div className="lg:col-span-3 mt-4 text-2xl font-semibold">
                <h6 className="text-left">Similar Products</h6>
                {/*This is Product List Page*/}
                <div className="md:mx-auto">
                  <div className="text-4xl py-2  pb-2 mt-2">
                    <div className="mt-6 py-2 grid grid-cols-1 gap-x-8  gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-4   lg:gap-x-8 xl:gap-x-8  ">
                      {SimilarProducts?.map((product, id) => {
                        return similarproduct ? (
                          <ProductCardLoader key={id} />
                        ) : (
                          <ProductCard product={product} key={id} />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetail;
