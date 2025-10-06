import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../layout/DashboardPannel";
import { toast } from "react-toastify";
import { api } from "../../../utils/api";
import ProductForm from "../../components/admin/ProductForm";

const CreateProduct = () => {
  const [Product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    pricediscount: "",
    thumbnail: "",
    brand: "",
    category: "",
    rating: "",
    stock: "",
  });
  const [id, setid] = useState();
  const [products, setproducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState([]);

  const itemsPerPage = 14;

  const handleEdit = (product) => {
    setid(product._id);
    setProduct(product);
  };

  //pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the items to display based on the current page
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleinput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setProduct({ ...Product, [name]: value });
  };

  const handlefile = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array

    setFiles(selectedFiles);
    // console.log(files);
    // const file = e.target.files[0];
    // console.log(file);
    // setProduct({ ...Product, thumbnail: file });
  };

  //get all products
  const getProducts = async () => {
    try {
      const response = await fetch(`${api}/api/v1/products`);
      const data = await response.json();
      setproducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  // create Product
  const createproduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(files);
    files.forEach((file) => {
      formData.append("thumbnail", file); 
    });
    formData.append("name", Product.name);
    formData.append("description", Product.description);
    formData.append("price", Product.price);
    formData.append("pricediscount", Product.pricediscount);
    formData.append("brand", Product.brand);
    formData.append("category", Product.category);
    formData.append("rating", Product.rating);
    formData.append("stock", Product.stock);
    const token = JSON.parse(localStorage.getItem("auth")).token;

    if (id) {
      const res = await fetch(`${api}/api/v1/update-product/${id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Product Updated Successfully");
        setProduct("");
        setid("");
        getProducts();
      } else {
        toast.error("Failed to Update Product");
      }
    } else {
      try {
        const response = await fetch(`${api}/api/v1/create-product`, {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
        });
        const data = await response.json();

        if (data.success) {
          toast.success("Product Created Successfully");
          // setFiles([]);
          // getProducts();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //delete product
  const deleteProduct = async (product) => {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    const res = await fetch(`${api}/api/v1/delete-product/${product._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Product deleted Successfully");
      getProducts();
    } else {
      toast.error("Failed to delete Product");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout description="Dashboard-Create Product">
      <div className="py-10 px-6">
        <div>
          <AdminMenu />
        </div>
        <div className="grid mg:grid-cols-2 grid-cols-1 gap-5 py-8">
          <div className="bg-white py-4 w-full px-8 h-full rounded-lg shadow-xl">
            <ProductForm
              data={Product}
              handleinput={handleinput}
              createproduct={createproduct}
              handlefile={handlefile}
              id={id}
            />
          </div>

          <div className="bg-white rounded-lg shadow-xl mg:my-0 my-4">
            <div className="sticky top-0 bg-gray-200 z-0">
              <table className="min-w-full overflow-auto border border-gray-300">
                <thead className="text-gray-600 uppercase text-sm leading-normal">
                  <tr className="bg-gray-200">
                    <th scope="col" className="py-3 px-6 text-left">
                      Product ID
                    </th>
                    <th scope="col" className="py-3 px-6 text-left">
                      Product Name
                    </th>
                    <th scope="col" className="py-3 px-6 text-left">
                      Action Buttons
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className=" overflow-y-auto">
              <table className="min-w-full border border-gray-300">
                <tbody className="text-gray-600 text-sm font-light">
                  {displayedProducts.map((product, id) => (
                    <tr
                      key={id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <th scope="row" className="py-3 px-6 text-left">
                        {product._id}
                      </th>
                      <td className="py-3 px-6 text-left text-gray-600 font-medium">
                        {product.name}
                      </td>
                      <td className="py-3 px-6 flex gap-4">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-8 mb-4">
              <nav className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`py-2 px-4 rounded ${
                      currentPage === index + 1
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    } hover:bg-indigo-400`}
                  >
                    {index + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
