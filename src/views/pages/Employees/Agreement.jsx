import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { Card, Select } from 'antd';
import Inputform from '../../../components/ui/Inputform';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import toast from 'react-hot-toast';
import countryList from 'country-list';
import countries from 'i18n-iso-countries';
import arLocale from 'i18n-iso-countries/langs/ar.json';

function Agreement() {
    const [isloading, setIsloading] = useState()
    const [preview, setPreview] = useState();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const countriess = countryList.getNames();
    const [translatedCountriesAr, setTranslatedCountriesAr] = useState([]);
    const [translatedCountriesEn, setTranslatedCountriesEn] = useState([]);
    const [selectedNationality, setSelectedNationality] = useState("");
    const onSubmitt = async (data) => {
        setIsloading(true);
        try {
            const formData = new FormData();
            for (const key of Object.keys(data)) {
                formData.append(key, data[key]); // Append each form field to FormData
            }

            const response = await axios.post(
                "https://hr.tanaghomtech.com/portal/public/api/generateWord",
                formData,
                {
                    responseType: 'blob', // To handle binary data (Word document)
                }
            );

            // Create a URL for the file and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Set the download file name (optional)
            link.setAttribute('download', 'agreement.docx');

            // Append to the DOM and trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up the link after downloading
            document.body.removeChild(link);

            toast.success("Agreement added and downloaded successfully");
            console.log("Agreement added successfully:", response.data);

            reset(); // Reset form after successful submission
            setPreview(null); // Reset preview
            const modalElement = document.getElementById("add_employee");
            modalElement.hide(); // Close the modal
        } catch (error) {
            console.error("Error adding agreement:", error.response?.data || error);
            toast.error(error.message);
        }
        setIsloading(false);
    };
    const schema = yup.object({
        license: yup
            .number()
            .required("license is required")
            .typeError("license must be a number"),
        docname: yup
            .string()
            .required("company name is required"),
        num: yup
            .string()
            .required("Register at real estate  is required")
            .test(
                "isValidSelection",
                "Please select a valid department",
                (value) => value !== "" // Ensure it is not an empty string
            ),
        postmailnum: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("p.o.box department is required"),
        mobile: yup.string().required("mobile hire is required"),
        phone: yup.string().required("phone job is required"),
        managername: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("manager namber ID is required")
        ,
        email: yup
            .string() // Ensure this is a string type
            .required("Email is required")
            .matches(emailPattern, "Enter a valid email address"),
        address: yup.string().required("address is required"),
        nationality: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("nationality  is required"),
        uaeid: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("Emarite namber ID is required"),
        emailmanager: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("email manager  is required"),
        addressen: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("address is required"),
        managernameen: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("manager name is required"),
        nationalityen: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("nationality is required"),
        companynameen: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("company name is required"),
        companyname: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("company name is required"),
        job: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("job is required"),
        joben: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("job is required"),

        city: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("city is required"),
        cityen: yup
            .string() // Ensure this is a string if it's supposed to be
            .required("city is required"),
    });
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        // Register Arabic locale for i18n-iso-countries
        countries.registerLocale(arLocale);

        // Populate Arabic and English countries lists
        const countriesAr = countries.getNames("ar", { select: "official" });
        const countryOptionsAr = Object.keys(countriesAr).map((code) => ({
            value: code,
            label: countriesAr[code],
        }));
        setTranslatedCountriesAr(countryOptionsAr);

        const countriesEn = countries.getNames("en");
        const countryOptionsEn = Object.keys(countriesEn).map((code) => ({
            value: code,
            label: countriesEn[code],
        }));
        setTranslatedCountriesEn(countryOptionsEn);
    }, []);

    return (
        <div>
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="row align-items-center">
                            <div className="col">
                                <Breadcrumbs
                                    maintitle="Agreement"
                                    title="Dashboard"
                                    subtitle="Agreement"
                                />
                                <Card
                                    title={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" color="#4D5154" fill="currentColor" className="bi bi-patch-exclamation-fill" viewBox="0 0 16 16">
                                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                        </svg>
                                    }
                                    bordered
                                    style={{ width: '75rem', marginTop: '30px' }}
                                >
                                    <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}><p style={{ fontSize: '28px' }}>
                                        Please select a greement company file</p>
                                        <div class="dropdown">
                                            <div className={`col-lg-6`}>

                                                <select class="btn btn-secondary dropdown-toggle" {...register("docname")} >
                                                    <option value="">
                                                        <p>company</p>
                                                    </option>
                                                    <option value="ezdan" >
                                                        <p>Ezdan </p>
                                                    </option>
                                                    <option value="mayas" >
                                                        <p>Mayas</p>
                                                    </option>
                                                </select>

                                            </div>
                                            {errors.docname && <div className="text-danger" style={{ opacity: "0.5", fontSize: "12px" }}>{errors.docname.message}</div>}

                                        </div></div>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="modal-body" style={{ marginTop: "50px" }}>
                        <form onSubmit={handleSubmit(onSubmitt)}>
                            <div className="row">
                                <Inputform
                                    actualName="License number"
                                    colSize={6}
                                    name="license"
                                    register={register}
                                    errors={errors}
                                />

                                <Inputform
                                    actualName="Register at real estate"
                                    colSize={6}
                                    name="num"
                                    register={register}
                                    errors={errors}
                                />

                                <Inputform
                                    colSize={6}
                                    name="postmailnum"
                                    actualName="P.O.Box"
                                    register={register}
                                    errors={errors}
                                />
                                <Inputform
                                    colSize={6}
                                    actualName="Mobile"
                                    name="mobile"
                                    register={register}
                                    errors={errors}
                                />

                                <Inputform
                                    colSize={6}
                                    actualName="Phone"
                                    name="phone"
                                    register={register}
                                    errors={errors}
                                />
                                <Inputform
                                    colSize={6}
                                    name="email"
                                    actualName="Email"
                                    register={register}
                                    errors={errors}
                                />
                                <Inputform
                                    colSize={6}
                                    name="uaeid"
                                    actualName="Emirates ID Number"
                                    register={register}
                                    errors={errors}
                                />
                                <Inputform
                                    colSize={6}
                                    name="emailmanager"
                                    actualName="Email Manager"
                                    register={register}
                                    errors={errors}
                                />

                                <Inputform
                                    colSize={6}
                                    name="addressen"
                                    actualName="Address (en)"
                                    register={register}
                                    errors={errors}
                                />
                                <Inputform
                                    colSize={6}
                                    name="address"
                                    actualName="Address (ar)"
                                    register={register}
                                    errors={errors}
                                />


                                <Inputform
                                    colSize={6}
                                    actualName="Manager name (en)"
                                    name="managernameen"
                                    register={register}
                                    errors={errors}
                                />
                                <Inputform
                                    colSize={6}
                                    name="managername"
                                    actualName="Manager Name (ar)"
                                    register={register}
                                    errors={errors}
                                />



                                {/* Nationality in English */}
                                <div className="col-lg-6">
                                    <label htmlFor="country">nationality (en):</label>
                                    <select id="country" className="form-control" {...register("nationalityen")}>
                                        <option className="form-control" value="">Select a Country </option>
                                        {countriess.map((country, index) => (
                                            <option key={index} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div className="col-lg-6">
                                    <label htmlFor="nationality">nationality (ar):</label>
                                    <select id="country" className="form-control" {...register("nationality")}>
                                        <option className="form-control" value="">Select a Country</option>
                                        {translatedCountriesAr.map((country, index) => (
                                            <option key={index} value={country.label}>
                                                {country.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.nationality && <p className="text-danger">{errors.nationality.message}</p>}
                                </div>


                                <Inputform
                                    colSize={6}
                                    actualName="Company name (en)"
                                    name="companynameen"
                                    register={register}
                                    errors={errors}
                                />
                                <Inputform
                                    colSize={6}
                                    actualName="Company name(ar)"
                                    name="companyname"
                                    register={register}
                                    errors={errors}
                                />

                                <Inputform
                                    colSize={6}
                                    actualName="job (en)"
                                    name="joben"
                                    register={register}
                                    errors={errors}
                                />
                                <Inputform
                                    colSize={6}
                                    actualName="job(ar)"
                                    name="job"
                                    register={register}
                                    errors={errors}
                                />

                                <Inputform
                                    colSize={6}
                                    actualName="city (en)"
                                    name="cityen"
                                    register={register}
                                    errors={errors}
                                />
                                <Inputform
                                    colSize={6}
                                    actualName="city (ar)"
                                    name="city"
                                    register={register}
                                    errors={errors}
                                />


                                <div className="col-lg-12 text-end form-wizard-button">
                                    <button
                                        className="button btn-lights reset-btn"
                                        type="reset"
                                    >
                                        Reset
                                    </button>
                                    {isloading == true ? (
                                        <button
                                            class="btn btn-primary wizard-next-btn"
                                            type="submit"
                                        >
                                            submit...{" "}
                                            <span
                                                class="spinner-border spinner-border-sm"
                                                role="status"
                                            ></span>
                                        </button>
                                    ) : (
                                        <button
                                            class="btn btn-primary wizard-next-btn"
                                            type="submit"
                                        >
                                            submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Agreement;
