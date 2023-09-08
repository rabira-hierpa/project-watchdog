import React from "react";

const PageHeader = (props) => {
  return (
    <div>
      <h3 className="mt-5 mb-0 ml-5 primary-darker-hover">
        <strong>{props.title}</strong>
      </h3>
    </div>
  );
};

export default PageHeader;
