import React from "react";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "container p-4",
  children,
}) => (
  <div>
    <div className="text-center">
      <div className="jumbotron text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
      <div className="mt-4 mb-0 footer text-center">
        <p className="mt-4 p-4">
          <span className="mt-4 p-4 text" style={{ fontSize: "24px" }}>Designed & Developed By</span>
          <ul style={{ listStyle: "none", fontSize: "18px", paddingInlineStart: "0px !important"}} className="footerUL">
            <p><i className="fa fa-flash"></i> Himanshu Dangre <i className="fa fa-flash"></i> Md Yaseen Ahmed <i className="fa fa-flash"></i> Pranitha Gujjeti <i className="fa fa-flash"></i> Rohan Joseph <i className="fa fa-flash"></i> Tejasvi Srivastava</p> 
          </ul>
        </p>
      </div>
    </div>
  </div>
);

export default Base;
