import { useState } from "react";
import * as Yup from "yup";
import axiosClient from "../axiosClient";
import UseForm from "./UseForm";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";

export default function AddItem() {

    const { user } = useStateContext();
    const { id } = user;
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const initialValues = {
        name: "",
        description: "",
    };      

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        // image: Yup.mixed().required("Required"),
    });

    const onSubmit = async (values) => {
        console.log("Values", values);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("image", image);
        formData.append("user_id", id);

        console.log("Form Data", formData);

        const response = await axiosClient.post(`/add-item/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Response", response);
        navigate("/");
    };

    const fields = [
        {
            type: "text",
            label: "Name",
            name: "name",
            placeholder: "Name",
        },
        {
            type: "text",
            label: "Description",
            name: "description",
            placeholder: "Description",
        },
        {
            type: "file",
            label: "Image",
            name: "image",
            onChange: (event) => setImage(event.target.files[0]),
        },
    ];

    return (
        <UseForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitButtonText="Submit"
            formName="Add Item"
            fields={fields}
        />
    );
}