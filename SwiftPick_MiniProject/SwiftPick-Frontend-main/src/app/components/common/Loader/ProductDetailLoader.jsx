import React from "react";

const ProductDetailLoader = () => {
  return (
    <div className="flex flex-wrap -mx-4">
      {/* Product Image Skeleton */}
      <div className="w-full md:w-1/2 px-4 mb-8">
        <div className="w-10/12 h-80 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
        <div className="flex gap-4 py-4 justify-center overflow-x-auto">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-20 h-20 bg-gray-200 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Product Details Skeleton */}
      <div className="w-full md:w-1/2 px-4">
        <div className="h-6 bg-gray-200 rounded-full max-w-xs mb-2 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded-full max-w-lg mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded-full max-w-sm mb-4 animate-pulse"></div>
        <div className="h-16 bg-gray-200 rounded mb-6 animate-pulse"></div>

        {/* Rating Skeleton */}
        <div className="flex items-center mb-4">
          <div className="w-28 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Price Skeleton */}
        <div className="mb-4 py-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
        </div>

        {/* Quantity and Add to Cart Skeleton */}
        <div className="mt-5 mb-16 flex flex-col mg:items-center  mg:flex-row gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-l-full animate-pulse"></div>
            <div className="w-16 h-10 bg-gray-200 animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-r-full animate-pulse"></div>
          </div>
          <div className="w-36 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailLoader;
