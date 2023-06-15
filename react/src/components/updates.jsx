import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axiosClient from "../axiosClient";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import UseForm from "./UseForm";

export default function Update({ id }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [file, setFile] = useState(null);

    const initialValues = {
        name: "",
        description: "",
    };

    const validationSchema = Yup.object({
       name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        price: Yup.number().required("Required"),
        image: Yup.mixed().required("Required"),
    });

    const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("image", file);
        await axiosClient.post(`/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        setOpen(false);
        navigate("/dashboard/items");
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
            onChange: (e) => setFile(e.target.files[0]),
        },
    ];

    return (
        <>
            <Button onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    style={{
                        backgroundColor: "#fff",
                        padding: 20,
                        margin: "auto",
                        width: 600,
                    }}
                >
                    
                    <UseForm
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        submitButtonText="Submit"
                        formName="Edit Item"
                        fields={fields}
                    />
                </Box>
            </Modal>
        </>
    );
}