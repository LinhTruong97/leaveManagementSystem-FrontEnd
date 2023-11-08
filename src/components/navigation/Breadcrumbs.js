import { Breadcrumbs as Bread, Card, Link } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { toPascalCase } from "../../utils/stringFormat";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((item) => item);
  // split path name into arrays -> filter to ensure no empty string
  const filteredPathnames = pathnames.filter(
    (part) => !/^[0-9a-f]{24}$/.test(part)
  );

  return (
    <Card sx={{ mb: 5, p: 2 }}>
      <Bread separator="›" aria-label="breadcrumb">
        <Link
          sx={{ textDecoration: "none", fontWeight: 600 }}
          color="primary.dark"
          key="home"
          href="/"
        >
          Home
        </Link>
        {filteredPathnames.map((part, index) => {
          const routeTo = `/${filteredPathnames.slice(0, index + 1).join("/")}`;

          return (
            <Link
              sx={{ textDecoration: "none", fontWeight: 600 }}
              color="primary.dark"
              key={routeTo}
              href={routeTo}
            >
              {toPascalCase(part.replace(/-/g, " "))}
            </Link>
          );
        })}
      </Bread>
    </Card>
  );
}

export default Breadcrumbs;
