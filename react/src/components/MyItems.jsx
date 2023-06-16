import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
import UpdateItem from "./UpdateItem";

export default function MyItems() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    axiosClient.get("/user-items").then(({ data }) => {
      console.log("User Items", data);
      setItems(data);
    });
  }, []);

  const toggleEdit = (id) => (e) => {
    e.preventDefault();
    setEdit((prev) => !prev);
    setId(id);
    console.log("ID", id);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      <h1 className="col-span-full">My Items</h1>
      {items.length > 0 &&
        edit &&
        items.map((item) => (
          <div
            className="col-span-1 bg-white rounded-3xl shadow-xl overflow-hidden"
            key={item.id}
          >
            <div>
              <div
                className="h-[236px]"
                style={{
                  backgroundImage: `url('${item.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="p-4 sm:p-6">
                <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                  {item.name}
                </p>
                <div className="flex flex-row">
                  <p className="text-[#3C3C4399] text-[17px] mr-2 line-through">
                    MVR 700
                  </p>
                  <p className="text-[17px] font-bold text-[#0FB478]">
                    MVR 700
                  </p>
                </div>
                <p className="text-[#7C7C80] font-[15px] mt-6">
                  {item.description}
                </p>

                <button
                  onClick={toggleEdit(item.id)}
                  className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                >
                  Edit
                </button>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    const response = await axiosClient.delete(`/delete/${item.id}`);
                    console.log("Delete Response", response);
                    setItems((prev) => prev.filter((item) => item.id !== id));
                    navigate("/");
                  }}
                  className="block mt-1.5 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      {!edit && <UpdateItem id={id} />}
    </div>
  );
}
