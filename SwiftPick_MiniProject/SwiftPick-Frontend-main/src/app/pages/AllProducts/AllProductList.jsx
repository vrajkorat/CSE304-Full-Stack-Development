import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Drawer from "@mui/material/Drawer";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/common/ProductCard";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { api } from "../../../utils/api";
import { Prices } from "../../data/PricesFilterData";
import Layout from "../../layout/Layout";
import ProductCardLoader from "../../components/common/Loader/ProductCardLoader";

const AllProductList = () => {
  const [products, setproducts] = useState([]);
  const [category, setcategory] = useState();
  const [pricefilter, setPriceFilter] = useState([]);
  const [categoryfilter, setCategoryFilter] = useState([]);
  const [sortValue, setSortValue] = useState("Select...");
  const [priceischecked, setPriceIsCheked] = useState("");
  const [producttotal, setProductTotal] = useState(0);
  const [page, setpage] = useState(1);
  const [perpage] = useState(20);
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [productloader, setProductLoader] = useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleCategoryFilter = (ischecked, name) => {
    let selectedCategory = [...categoryfilter];

    if (ischecked) {
      selectedCategory.push(name);
    } else {
      selectedCategory = selectedCategory.filter((c) => c !== name);
    }

    setCategoryFilter(selectedCategory);
    filterProducts(selectedCategory, pricefilter);
  };

  useEffect(() => {
    if (slug !== "all") {
      handleCategoryFilter(true, slug);
    }

    // eslint-disable-next-line
  }, []);

  // prices by category
  const handlePricesFilter = (ischecked, name) => {
    setPriceIsCheked(name);
    if (priceischecked === name) {
      setPriceIsCheked(null);
    } else {
      setPriceIsCheked(name);
    }

    let selectedPrice = [...pricefilter];

    if (ischecked) {
      selectedPrice.push(name);
    } else {
      selectedPrice = selectedPrice.filter((c) => c !== name);
    }

    setPriceFilter(selectedPrice);
    filterProducts(categoryfilter, selectedPrice);
  };

  //get all category
  const Categories = async () => {
    try {
      const res = await fetch(`${api}/api/v1/category/categories`);
      const data = await res.json();
      setcategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Categories();
  }, []);

  const handlePreviousPage = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < Math.ceil(producttotal / perpage)) {
      setpage(page + 1);
    }
  };

  const handlePageClick = (pageNum) => {
    setpage(pageNum);
  };

  const getRange = () => {
    const start = (page - 1) * perpage + 1;

    const end = Math.min(page * perpage, producttotal);
    return { start, end };
  };

  const { start, end } = getRange();

  const filterProducts = async (
    selectedCategories = categoryfilter,
    selectedPrices = pricefilter
  ) => {
    setProductLoader(true);
    try {
      const res = await fetch(
        `${api}/api/v1/products?checked=${selectedCategories}&filters=${selectedPrices}&perpage=${perpage}&page=${page}`
      );

      const data = await res.json();
      console.log(data.products);

      if (data.success) {
        setProductLoader(false);
      }
      setproducts(data.products);
      setProductTotal(data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filterProducts(categoryfilter, pricefilter);
    // eslint-disable-next-line
  }, [categoryfilter, pricefilter, page]);

  const sorting = (e) => {
    const sortType = e.target.value;
    setSortValue(sortType);
    let sortedProducts = [...products];

    if (sortType === "priceHighToLow") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortType === "priceLowToHigh") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "nameAToZ") {
      sortedProducts = sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortType === "nameZToA") {
      sortedProducts = sortedProducts.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    setproducts(sortedProducts);
  };

  return (
    <Layout title="All-Products SwiftPick">
      <div>
        <div>
          <div className="bg-white  ">
            <div>
              {/* Mobile filter dialog */}

              <main className="  px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-10">
                  {/* mobile screen */}
                  <div className="block md:hidden cursor-pointer">
                    <button
                      onClick={toggleDrawer(true)}
                      className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
                    >
                      <FilterAltIcon fontSize="small" sx={{ fontSize: 30 }} />
                      <span className="text-sm font-medium">Filters</span>
                    </button>
                  </div>
                  <Drawer open={open} onClose={toggleDrawer(false)}>
                    {
                      <>
                        <div className="p-3">
                          <h1 className="text-xl font-bold text-indigo-500">
                            Filter Products
                          </h1>
                          <form className="p-6  w-72 font-medium text-gray-900">
                            <div className="font-bold">Price</div>

                            <div className="mt-2 w-full ring-opacity-5 focus:outline-none">
                              <div className="py-1 px-4">
                                {Prices.map((option, id) => {
                                  return (
                                    <div
                                      key={option.name}
                                      className="flex items-center py-2 cursor-pointer"
                                    >
                                      <label
                                        htmlFor={id}
                                        className="flex items-center cursor-pointer"
                                      >
                                        <input
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          checked={
                                            option.value === priceischecked
                                          }
                                          onChange={(e) => {
                                            handlePricesFilter(
                                              e.target.checked,
                                              option.value
                                            );
                                          }}
                                          id={id}
                                        />
                                        <label
                                          htmlFor={id}
                                          className="ml-2 cursor-pointer text-gray-500 text-md hover:text-gray-800 transition-colors duration-300"
                                        >
                                          {option.name}
                                        </label>
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div
                              as="div"
                              className="border-b border-gray-200 py-6"
                            >
                              <h1 className="font-bold text-black">
                                {" "}
                                Category
                              </h1>

                              <div className="pt-6">
                                <div className="space-y-4">
                                  {category?.map((option, id) => {
                                    return (
                                      <div
                                        key={id}
                                        className="flex items-center"
                                      >
                                        <input
                                          defaultValue={option.name}
                                          defaultChecked={option.name === slug}
                                          onChange={(e) =>
                                            handleCategoryFilter(
                                              e.target.checked,
                                              option.name
                                            )
                                          }
                                          id={`filter-${category.id}-${id}`}
                                          name={`${category.id}[]`}
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                          htmlFor={`filter-${category.id}-${id}`}
                                          className="ml-3 text-sm text-gray-600 cursor-pointer"
                                        >
                                          {option.name}
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </>
                    }
                  </Drawer>
                  {/* mobile screen */}

                  <div className="flex items-center justify-end w-full ">
                    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                      <InputLabel>Sort By:</InputLabel>
                      <Select
                        label="Sort By:"
                        id="Sort"
                        value={sortValue}
                        onChange={(e) => sorting(e)}
                      >
                        <MenuItem value="Select...">Select...</MenuItem>
                        <MenuItem value="priceHighToLow">
                          Price: High to Low
                        </MenuItem>
                        <MenuItem value="priceLowToHigh">
                          Price: Low to High
                        </MenuItem>
                        <MenuItem value="nameAToZ">Name: A to Z</MenuItem>
                        <MenuItem value="nameZToA">Name: Z to A</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {/* laptop screen */}

                <section
                  aria-labelledby="products-heading"
                  className="pb-24 pt-6"
                >
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  <div className="flex gap-10">
                    {/* Filters (Price and Category) */}
                    <form className="w-1/2 md:block hidden xl:w-1/4 lg:w-1/3 sm:w-1/3 font-medium text-gray-900">
                      <div className="font-bold">Price</div>

                      <div className="mt-2 w-full ring-opacity-5 focus:outline-none">
                        <div className="py-1 px-4">
                          {Prices.map((option, id) => {
                            return (
                              <div
                                key={option.name}
                                className="flex items-center py-2 cursor-pointer"
                              >
                                <label
                                  htmlFor={id}
                                  className="flex items-center cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    name={option.name}
                                    checked={option.value === priceischecked}
                                    onChange={(e) => {
                                      handlePricesFilter(
                                        e.target.checked,
                                        option.value
                                      );
                                    }}
                                    id={id}
                                  />
                                  <label
                                    htmlFor={id}
                                    className="ml-2 cursor-pointer text-gray-500 text-md hover:text-gray-800 transition-colors duration-300"
                                  >
                                    {option.name}
                                  </label>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div as="div" className="border-b border-gray-200 py-6">
                        <h1 className="font-bold text-black"> Category</h1>

                        <div className="pt-6">
                          <div className="space-y-4">
                            {category?.map((option, id) => {
                              return (
                                <div key={id} className="flex items-center">
                                  <input
                                    defaultValue={option.name}
                                    defaultChecked={option.name === slug}
                                    onChange={(e) =>
                                      handleCategoryFilter(
                                        e.target.checked,
                                        option.name
                                      )
                                    }
                                    id={`filter-${category.id}-${id}`}
                                    name={`${category.id}[]`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${category.id}-${id}`}
                                    className="ml-3 text-sm text-gray-600 cursor-pointer"
                                  >
                                    {option.name}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* laptop screen  */}

                    {/* Product Grid */}
                    <div
                      className={
                        products.length === 0
                          ? `flex justify-center items-center w-screen`
                          : `mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 m-auto `
                      }
                    >
                      {products.length === 0 && productloader === false ? (
                        <div className="text-center ">
                          <h2 className="text-2xl font-semibold mt-4">
                            Product Not Found
                          </h2>
                          <p className="text-gray-600 mt-2">
                            Sorry, the product you're looking for doesn't exist.
                            Please try adjusting the filter settings.
                          </p>
                        </div>
                      ) : (
                        <>
                          {products?.map((product, id) => {
                            return productloader ? (
                              <ProductCardLoader key={id} />
                            ) : (
                              <ProductCard product={product} id={id} key={id} />
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>
                </section>
                {/* section of Product and filter end */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <p className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Previous
                    </p>
                    <p className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Next
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{start}</span> to{" "}
                        <span className="font-medium">{end}</span> of{" "}
                        <span className="font-medium">{producttotal}</span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        aria-label="Pagination"
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      >
                        <button
                          onClick={handlePreviousPage}
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon
                            aria-hidden="true"
                            className="h-5 w-5"
                          />
                        </button>
                        {[
                          ...Array(Math.ceil(producttotal / perpage)).keys(),
                        ].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => handlePageClick(index + 1)}
                            aria-current={
                              page === index + 1 ? "page" : undefined
                            }
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                              page === index + 1
                                ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            } cursor-pointer`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          onClick={handleNextPage}
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon
                            aria-hidden="true"
                            className="h-5 w-5"
                          />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProductList;
