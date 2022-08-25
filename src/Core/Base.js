import React from "react";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "p-4",
  children,
}) => (
  <div>
    <div className="container text-center">
      <div className="jumbotron text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  </div>
);

export default Base;
