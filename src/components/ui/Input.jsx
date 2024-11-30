import React from "react";
//p:pattern ,h:height, req: required
function Input({ name,value="", onChange,type,errors}) {
  return (
    <div className={`col-lg-6`}>
    <label className="col-form-label">{name}{["companyName"].includes(name) ? (
    <span style={{ color: "red" }}> *</span>
  ) : (
    " "
  )}</label>
    <input
      type={type||"text"}
      name={name}
      value={value}
      onChange={onChange}
      className="form-control"
    />
   
 </div>
  );
}

export default Input;
