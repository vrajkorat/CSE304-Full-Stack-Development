import React from "react";
import { useSearch } from "../../../context/SearchContext";
import Layout from "../../layout/Layout";
import NotFound from "../../components/common/ItemNotFound";
import ProductCard from "../../components/common/ProductCard";

const Search = () => {
  const { values } = useSearch();
  return (
    <>
      <Layout title="search-item-SwiftPick">
        {values?.results.length === 0 ? (
          <>
            <div className="bg-white px-4 py-16 mt-12  flex justify-center ">
              <NotFound
                empty="No Search Product Found"
                redirect=" Continue Shopping "
              />
            </div>
          </>
        ) : (
          <div className="bg-gray-50 min-h-screen py-8 ">
            <div className="text-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
                {values.results?.map((product, index) => {
                  return <ProductCard product={product} key={index} />;
                })}
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Search;
