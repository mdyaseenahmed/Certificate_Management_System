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
        <h4 className="p-4">
          For any Queries, Please reach to us at{" "}
          <button className="btn btn-primary">contact</button>
        </h4>
      </div>
    </div>
  </div>
);

export default Base;
