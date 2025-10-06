import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/common/Navbar";

const Layout = ({ title, description, keyword, author, children }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keyword" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar>{children}</Navbar>
    </>
  );
};

export default Layout;
