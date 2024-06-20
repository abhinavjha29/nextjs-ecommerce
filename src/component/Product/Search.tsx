"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./Search.css";

const Search: React.FC = () => {
  const searchParams = useSearchParams();
  const [term, setTerm] = useState<string>("");

  const { replace } = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (term && term.length > 2) {
      params.set("query", term);
    }
    if (!term) {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <header className="py-3 mb-4 border-bottom">
      <div className="container d-flex flex-wrap justify-content-center">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-4">Double header</span>
          {/* {authentication === "true" && (
            <button onClick={handleLogOut}>Logout</button>
          )} */}
        </a>
        <form
          className="col-12 col-lg-auto mb-3 mb-lg-0 search-form"
          role="search"
        >
          <div className="input-container">
            <input
              type="search"
              className="form-control"
              placeholder="Search... Min 2 character"
              aria-label="Search"
              defaultValue={searchParams.get("query")?.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchChange(e)
              }
            />
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleSearch(e)
              }
              className="search-button"
            >
              <FiSearch />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Search;
