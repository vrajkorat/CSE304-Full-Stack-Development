import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../layout/DashboardPannel";
import { toast } from "react-toastify";
import { api,  } from "../../../utils/api";
import CategoryForm from "../../components/admin/CategoryForm";

const CreateCategory = () => {
  const [categories, setcategory] = useState();
  const [Name, setName] = useState("");
  const [id, setid] = useState("");

  //create category
  const handleinput = (e) => {
    setName(e.target.value);
  };

  const handleEdit = (category) => {
    setName(category.name);
    setid(category._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("auth")).token;
    if (id) {
      const res = await fetch(
        `${api}/api/v1/category/update-category/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ name: Name }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Category updated successfully");
        getAllCategory();
        setName("");
        setid("");
      } else {
        toast.error(data.message);
      }
    } else {
      try {
        const res = await fetch(
          `${api}/api/v1/category/create-category`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({ name: Name }),
          }
        );
        const data = await res.json();
        if (res.ok) {
          toast.success(`${data.category.name} Category created`);
          getAllCategory();
        }
      } catch (error) {
        console.log(error);
        toast.error("Category Aleready Exist ");
      }
    }
  };

  //Delete category
  const DeleteCategory = async (category) => {
    const token = JSON.parse(localStorage.getItem("auth")).token;

    try {
      const res = await fetch(
        `${api}/api/v1/category/delete-category/${category._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = res.json();
      if (data.ok) {
        toast.success(" deleteCategory Successfully");
      }
      getAllCategory();
    } catch (error) {
      toast.error(error);
    }
  };

  //get the category
  const getAllCategory = async () => {
    try {
      const res = await fetch(
         `${api}/api/v1/category/categories`
      );
      const data = await res.json();
      setcategory(data.category);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title="Dashboard-Create Category">
      <div className="py-10 px-6">
        <div>
          <AdminMenu />
        </div>
        <div className="w-full max-w-xl flex flex-col gap-4 mx-auto bg-white shadow-lg rounded-lg px-6 py-10 my-10">
          {/* Form to Create Category */}

          <CategoryForm
            value={Name}
            handleinput={handleinput}
            handleSubmit={handleSubmit}
            id={id}
          />

          {/* Spacer between the form and the category list */}

          {/* Display the List of Categories */}
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th scope="col" className="py-3 px-6 text-left">
                  Name
                </th>
                <th scope="col" className="py-3 px-6 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-normal">
              {categories?.map((category, id) => (
                <tr
                  key={id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{category.name}</td>
                  <td className="py-3 px-6 flex gap-4">
                    <button
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => DeleteCategory(category)}
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
      </div>
    </Layout>
  );
};

export default CreateCategory;
