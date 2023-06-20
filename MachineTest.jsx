import React from "react";
import { Field, useFormik, FieldArray } from "formik";
import YupSchema from "./YupSchema";
import { useState } from "react";

const MachineTest = () => {
	const [data, setData] = useState([]);
	const validate = (values) => {
		const errors = {};

		if (!values.file) {
			errors.file = "File is required";
		} else {
			if (
				values.fileType === "image" &&
				!values.file.type.startsWith("image/")
			) {
				errors.file = "Please select an image file";
			}

			if (values.fileType === "pdf" && values.file.type !== "application/pdf") {
				errors.file = "Please select a PDF file";
			}
		}

		return errors;
	};

	const handleSubmit = (values, { resetForm }, data) => {
		const { checkbox, field1, field2, field3, field4 } = values;
		// console.log(values);
		setData(values);

		// Perform any necessary actions with the selected fields

		console.log("Selected Fields:", {
			field1,
			field2,
			field3,
			field4,
		});
		data.push(values);

		// setData([...data]);
		resetForm();
	};

	const handleCheckboxChange = (e) => {
		const { checked } = e.target;

		if (checked) {
			formik.setFieldValue("field3", formik.values.field1);
			formik.setFieldValue("field4", formik.values.field2);
		} else {
			formik.setFieldValue("field3", "");
			formik.setFieldValue("field4", "");
		}
	};
	const handleFileTypeChange = (e) => {
		const selectedFileType = e.target.value;
		formik.setFieldValue("fileType", selectedFileType);
		formik.setFieldValue("file", null);
	};
	const handleFileChange = (e) => {
		formik.setFieldValue("file", e.target.files[0]);
	};

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			Birthday: "",
			field1: "",
			field2: "",
			field3: "",
			field4: "",
			checkbox: false,
			fileType: "",
			filename: "",
			file: null,
			data: [],
		},
		validate,

		validationSchema: YupSchema,

		onSubmit: handleSubmit,
		// names: [],
	});
	console.log(formik.values);
	console.log("asbdajhsja", formik.values.data.values);
	return (
		<form onSubmit={formik.handleSubmit} className="text-dark-black">
			<div className="bg-warning">
				<div className="container bg-light  rounded">
					<div className="row  px-4 py-4 mb-auto p-2">
						<h1 className="text-primary py-3 px-4  rounded">
							{" "}
							React Machine Test
						</h1>
						<div className="col ">
							<p>FirstName*</p>
							<input
								type="text"
								name="firstName"
								className="form-control py-3 px-4"
								placeholder="First name.."
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.firstName}
							/>
							{formik.touched.firstName && formik.errors.firstName ? (
								<div className="text-danger">{formik.errors.firstName}</div>
							) : null}
						</div>
						<div className="col">
							<p>LastName*</p>

							<input
								type="text"
								name="lastName"
								className="form-control py-3 px-4"
								placeholder="Last name.."
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.lastName}
							/>
							{formik.touched.lastName && formik.errors.lastName ? (
								<div className="text-danger">{formik.errors.lastName}</div>
							) : null}
						</div>
					</div>
					<div className="row mt-4 px-4 py-4">
						<div className="col">
							<p>E-mail*</p>

							<input
								name="email"
								type="text"
								className="form-control py-3 px-4"
								placeholder="ex-example@.gmail.com"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
							/>
							{formik.touched.email && formik.errors.email ? (
								<div className="text-danger">{formik.errors.email}</div>
							) : null}
						</div>
						<div className="col">
							<p>Date of Birhtday*</p>

							<input
								name="Birthday"
								type="date"
								className="form-control py-3 px-4"
								placeholder="happy Birthday"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.Birthday}
							/>
							{formik.touched.Birthday && formik.errors.Birthday ? (
								<div className="text-danger">{formik.errors.Birthday}</div>
							) : null}
						</div>
					</div>
					<h4>Residential Address*</h4>

					<div className="row mt-4 px-4 py-4">
						<div className="col">
							<label htmlFor="field1">Street1*</label>
							<input
								className="form-control py-3 px-4"
								type="text"
								id="field1"
								name="field1"
								value={formik.values.field1}
								onChange={formik.handleChange}
								placeholder="street1*"
							/>
							{formik.errors.field1 && (
								<div className="text-danger">{formik.errors.field1}</div>
							)}
						</div>
						<div className="col">
							<label htmlFor="field1">Street2*</label>
							<input
								type="text"
								className="form-control py-3 px-4"
								id="field2"
								name="field2"
								value={formik.values.field2}
								onChange={formik.handleChange}
								placeholder="street1*"
							/>
							{formik.errors.field2 && (
								<div className="text-danger">{formik.errors.field2}</div>
							)}
						</div>
					</div>
					<div className="row mt-4 px-4 py-4">
						<div className="">
							<label htmlFor="checkbox"></label>
							<h4>Same as residential Address* </h4>

							<input
								className=" py-4 px-4"
								type="checkbox"
								id="checkbox"
								name="checkbox"
								checked={formik.values.checkbox}
								onChange={(e) => {
									formik.handleChange(e);
									handleCheckboxChange(e);
								}}
							/>
							{formik.errors.checkbox && (
								<div className="text-danger">{formik.errors.checkbox}</div>
							)}
						</div>

						<div className="col">
							<label htmlFor="3">Street1*</label>
							<input
								type="text"
								className="form-control py-3 px-4"
								id="field3"
								name="field3"
								value={formik.values.field3}
								onChange={formik.handleChange}
								placeholder="street1*"
							/>
							{formik.errors.field3 && (
								<div className="text-danger">{formik.errors.field3}</div>
							)}
						</div>
						<div className="col">
							<label htmlFor="field4">Street2*</label>
							<input
								type="text"
								className="form-control py-3 px-4"
								id="field4"
								name="field4"
								value={formik.values.field4}
								onChange={formik.handleChange}
								placeholder="street1*"
							/>
							{formik.errors.field4 && (
								<div className="text-danger">{formik.errors.field4}</div>
							)}
						</div>
					</div>
					<div className="d-flex  justify-content-between px-4 py-4">
						<div className=" col-md-2 ">
							<label htmlFor="filename" className="form-label">
								FileName*
							</label>
							<input
								type="text"
								className="form-control  py-3 px-3"
								name="filename"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.filename}
							/>
							{formik.touched.filename && formik.errors.filename ? (
								<div className="text-danger">{formik.errors.filename}</div>
							) : null}
						</div>
						<div className="col-md-2 ">
							<label htmlFor="inputState" className="form-label">
								FileType*
							</label>
							<select
								id="inputState"
								className="form-select  py-3 px-3"
								onChange={handleFileTypeChange}
								value={formik.values.fileType}
							>
								<option selected></option>
								<option value="image">Image</option>
								<option value="pdf">pdf</option>
							</select>
							{formik.touched.Filetype && formik.errors.Filetype ? (
								<div className="text-danger">{formik.errors.Filetype}</div>
							) : null}
						</div>
						<div className=" mt-2 px-4 py-4">
							<input
								className="form-control  py-3 px-3 "
								type="file"
								id="file"
								name="file"
								onChange={handleFileChange}
								accept={formik.values.fileType === "image" ? "image/*" : ".pdf"}
							/>
							{formik.errors.file && (
								<div className="text-danger">{formik.errors.file}</div>
							)}
						</div>

						<div className="col-md-2 mt-2 px-2 py-4">
							<button className="btn btn-dark  py-3 px-3">Add</button>
						</div>
					</div>
					<button type="submit" className="btn btn-primary btn-lg">
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};

export default MachineTest;
