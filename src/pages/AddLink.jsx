import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthProvider";
import UseAxiosSecure from "../hooks/useAxiosSecure";

const AddLink = () => {
  const { user } = useContext(AuthContext);
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const [fileurl, setfileUrl] = useState(null);
  const [loading, setloading] = useState(false);
  const [Error, setError] = useState("");
  const [shareLink, setshareLink] = useState(null);
  const [fetch, setfetch] = useState(false);
  const [generateError, setgenerateError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [Error]);
  const onSubmit = (data) => {
    setloading(true);
    const formData = new FormData();
    formData.append("file", data.file[0]);

    axiosSecure
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("File uploaded successfully");
        setUploaded(true);
        setfileUrl(res.data.fileUrl);
        setloading(false);
        reset();
      })
      .catch((error) => {
        console.log("Error uploading file", error);
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong with the file upload!",
        });
        setloading(false);
      });
  };

  const handleGenerateLink = (e) => {
    e.preventDefault();
    const form = e.target;
    const access = form.access.value;
    const expirationDate = form.expirationDate.value;
    setfetch(true);
    const generateData = {
      owner: user?.email,
      fileURL: fileurl,
      access: access,
      expirationDate: expirationDate,
      views: 0,
    };
    console.log(generateData);
    axiosSecure
      .post("/generate-link", generateData)
      .then((res) => {
        setshareLink(res?.data?.link);
        setfetch(false);
      })
      .catch((error) => {
        console.log("error", error);
        setfetch(false);
        setgenerateError(error.message);
      });
  };
  document.title = "Add Link";
  const handleDoubleClick = () => {
    const input = document.createElement("input");
    input.value = shareLink;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex justify-center mt-20 min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Upload and Share Link
          </h2>
          <form
            className="mt-6 px-4 md:px-8 lg:px-16"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Upload File Max 10 MB <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                {...register("file", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8AA4] focus:outline-none"
                placeholder="upload file"
              />
              {errors.file && (
                <p className="text-red-500 text-sm mt-2">
                  This field is required
                </p>
              )}
            </div>
            {Error && <p className="text-red-500 text-sm mt-2">{Error}</p>}
            <div className="mb-4">
              <div className="mt-6 flex justify-center gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2A8AA4] text-white font-semibold rounded-lg shadow hover:bg-[#3b626d] transition"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : fileurl ? "Uploaded" : "Upload"}
                </button>
              </div>
            </div>
          </form>

          {uploaded && (
            <div>
              <form
                onSubmit={handleGenerateLink}
                className="mt-6 px-4 md:px-8 lg:px-16"
              >
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Select File Access
                  </label>
                  <select
                    name="access"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8AA4] focus:outline-none"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Expire Date
                  </label>
                  <input
                    type="date"
                    name="expirationDate"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8AA4] focus:outline-none"
                  />
                </div>

                <div className="mb-4">
                  <div className="mt-6 flex justify-center gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
                    >
                      {fetch
                        ? "Generating..."
                        : shareLink
                        ? "Generated"
                        : "Generate Share Link"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {generateError && (
            <p className="text-red-500 text-sm mt-2">{generateError}</p>
          )}
          {/* { fileurl && <p> Content Link: {fileurl}</p>} */}
          {shareLink && (
            <div>
              <p>Share Link: </p>
              <span
                onDoubleClick={handleDoubleClick}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#2A8AA4",
                }}
              >
                <a
                  href={shareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {shareLink}
                </a>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLink;
