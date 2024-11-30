import React from "react";

// p: pattern, h: height, req: required
function Inputform({ name, colSize, type = "text",actualName, register, errors  }) {
  return (
    <div className={`col-lg-${colSize}`}>
<label className="col-form-label">
  {actualName}
  {["Email", "First name","companyName", "Last name", "Department hire", "Department current", "job hire", "job current", "company id"].includes(actualName) ? (
    <span style={{ color: "red" }}> *</span>
  ) : (
    " "
  )}
</label>
      <input
        {...register(name)}
        type={type}
        className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
        name={name }
      />
      {errors[name] && <div className="text-danger" style={{opacity:"0.5",fontSize:"12px"}}>{errors[name].message}</div>}
    </div>
  );
}

export default Inputform;
