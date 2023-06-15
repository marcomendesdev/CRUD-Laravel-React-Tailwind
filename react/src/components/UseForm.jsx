import { Formik, Form, useField } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label htmlFor={props.id || props.name} className="label">
                {label}
            </label>
            <input
                className="input-field"
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className="error-message">{meta.error}</div>
            ) : null}
        </div>
    );
};

const Password = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label htmlFor={props.id || props.name} className="label">
                {label}
            </label>
            <input
                className="input-field"
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className="error-message">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default function UseForm({
    initialValues,
    validationSchema,
    onSubmit,
    submitButtonText,
    additionalText,
    additionalLink,
    fields,
    formName,
    linkName,
}) {
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    return (
        <div className="form-container">
            <h1>{formName}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const { user, token } = await onSubmit(values);
                        setUser(user);
                        setToken(token);
                        navigate("/dashboard/items");
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                <Form>
                    {fields.map((field, index) => {
                        const { type, label, name, placeholder, ...props } =
                            field;
                        if (type === "text" || type === "email") {
                            return (
                                <MyTextInput
                                    key={index}
                                    label={label}
                                    {...props}
                                    name={name}
                                    placeholder={placeholder}
                                    type={type}
                                />
                            );
                        } else if (type === "password") {
                            return (
                                <Password
                                    key={index}
                                    label={label}
                                    {...props}
                                    name={name}
                                    placeholder={placeholder}
                                    type={type}
                                />
                            );
                        } else if (type === "file") {
                            return (
                                <MyTextInput
                                    key={index}
                                    label={label}
                                    {...props}
                                    name={name}
                                    type={type}
                                />
                            );
                        }
                        return null; // Ignore unsupported field types
                    })}
                    <br />
                    {additionalText ? (
                        <button type="submit" className="submit-button">
                            {submitButtonText}
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="submit-button"
                            style={{
                                backgroundColor: "#1976d2",
                                color: "#fff",
                            }}
                        >
                            {submitButtonText}
                        </button>
                    )}

                    <br />
                    {additionalText && (
                        <p className="additional-text">
                            {additionalText}&nbsp;
                            {additionalLink && (
                                <Link to={additionalLink} className="additional-link">
                                    {linkName}
                                </Link>
                            )}
                        </p>
                    )}
                </Form>
            </Formik>
        </div>
    );
}
