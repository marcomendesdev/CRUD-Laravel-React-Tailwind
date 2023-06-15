import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export default function Items() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axiosClient.get("/items").then(({ data }) => {
            console.log("Items", data);
            setItems(data);
        });
    }, []);

    return (
        <div>
            <h1>Items</h1>
            {items.length > 0 &&
                items.map((item) => (
                    <div
                        className="flex items-center justify-center min-h-screen from-[#dae2e6] via-[#dae2e6] to-[#dae2e6] bg-gradient-to-br px-2"
                        key={item.id}
                    >
                        <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="max-w-md mx-auto">
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
                                        {item.title}
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

                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
