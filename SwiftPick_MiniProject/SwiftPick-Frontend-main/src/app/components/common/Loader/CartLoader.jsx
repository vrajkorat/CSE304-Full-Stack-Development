import React from "react";

const CartLoader = () => {
  return (
    <div className="flow-root">
      <ul className="-my- divide-y  divide-gray-200">
        {[...Array(2)].map((_, id) => (
          <li key={id} className="flex py-6 animate-pulse">
            {/* Product Image Skeleton */}
            <div className="h-24 w-24 flex-shrink-0 bg-gray-200 rounded-md border border-gray-300"></div>

            {/* Product Details Skeleton */}
            <div className="ml-4 flex flex-1 flex-col">
              <div className="flex justify-between text-base font-medium text-gray-900">
                {/* Product Name Skeleton */}
                <div className="h-4 bg-gray-200 rounded-full w-32 mb-2"></div>

                {/* Price Skeleton */}
                <div className="h-4 bg-gray-200 rounded-full w-12"></div>
              </div>

              {/* Quantity and Remove Button Skeleton */}
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className="flex items-center gap-2">
                  {/* Quantity Label Skeleton */}
                  <div className="h-4 bg-gray-200 rounded-full w-10"></div>

                  {/* Quantity Select Skeleton */}
                  <div className="w-12 h-8 bg-gray-200 rounded-md"></div>
                </div>

                {/* Remove Button Skeleton */}
                <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartLoader;
