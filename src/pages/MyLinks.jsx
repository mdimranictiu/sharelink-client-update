import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";
import UseAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form

const MyLinks = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [links, setMyLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentUpdate, setCurrentUpdate] = useState(null);
  const [fetch,refetch]=useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm(); // Initialize react-hook-form

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/my-links`)
      .then((res) => {
        setMyLinks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Failed to fetch links");
        setLoading(false);
      });
  }, [axiosSecure,fetch]);

  const handleUpdate = (id) => {
    const linkToEdit = links.find((link) => link._id === id);
    if (linkToEdit) {
      setCurrentUpdate(linkToEdit);
      setValue("access", linkToEdit.access); // Set the initial value of access
      document.getElementById("my_modal_5").showModal();
    }
  };

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/delete/link/${id}`)
      .then(() => {
        setMyLinks(links.filter((link) => link._id !== id));
      })
      .catch((error) => {
        console.log("Error deleting link", error.message);
      });
  };

  const onSubmit = (data) => {
    setLoading(true);
    const updateInfo = {
      access: data.access,
      linkId: currentUpdate?._id,
    };
   refetch(true)
    axiosSecure
      .patch("/update-link", updateInfo)
      .then(() => {
        setSuccess("Update Successful");
        setLoading(false);
        refetch(false)
        document.getElementById("my_modal_5").close();
      })
      .catch((error) => {
        setError("Error: " + (error.response?.data?.message || error.message || "Unknown error"));
        setLoading(false);
        refetch(false)
      });
  };

  const handleModalClose = () => {
    setCurrentUpdate(null);
    document.getElementById("my_modal_5").close();
  };

  return (
    <div className="flex justify-center mt-20 min-h-screen bg-gray-100">
      <div className="w-full shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            My Links
          </h2>

          {loading ? (
            <>
            <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-ring loading-lg text-primary"></span>
            <span className="loading loading-ring loading-lg text-secondary"></span>
            <span className="loading loading-ring loading-lg text-accent"></span>
            <span className="loading loading-ring loading-lg text-neutral"></span>
            <span className="loading loading-ring loading-lg text-info"></span>
            <span className="loading loading-ring loading-lg text-success"></span>
            <span className="loading loading-ring loading-lg text-warning"></span>
            <span className="loading loading-ring loading-lg text-error"></span>
          </div>
        </>
  
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : links.length === 0 ? (
            <p className="text-center text-gray-600">No Links Available</p>
          ) : (
            <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5 px-10">
              {links.map((link) => (
                <div key={link._id} className="card card-border shadow-2xl w-96 mb-4">
                  <div className="card-body">
                    <h2 className="card-title">Access: {link?.access}</h2>
                    <p>
                      Unique URL:{" "}
                      <a
                        href={link.uniqueURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {link?.uniqueURL}
                      </a>
                    </p>
                    <p>
                      Expire Date: <span className="text-red-500">{link?.expirationDate}</span>
                    </p>
                    <p>Views: {link?.views || "0"}</p>
                    <div className="card-actions">
                      <button
                        onClick={() => handleUpdate(link._id)}
                        className="btn btn-outline btn-info"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(link._id)}
                        className="btn btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {success && (
            <div className="text-center text-green-500 mt-4">
              {success}
            </div>
          )}
        </div>
      </div>

      <dialog id="my_modal_5" className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-center text-lg">Update Accessibility</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Select File Access
              </label>
              <select
                {...register("access", { required: "Access is required" })} // Register with validation
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8AA4] focus:outline-none"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              {errors.access && (
                <span className="text-red-500 text-sm">{errors.access.message}</span>
              )}
            </div>
            <div className="mt-20">
              <button type="submit" className="btn w-[60%] bg-[#2A8AA4] mx-[20%]">
                Update
              </button>
            </div>
          </form>
          {error && (
            <div className="text-center text-red-500 mt-4">
              {error}
            </div>
          )}
          <div className="mt-5">
            <button
              onClick={handleModalClose}
              className="btn w-[40%] bg-[#9ab8c0] mx-[30%]"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyLinks;
