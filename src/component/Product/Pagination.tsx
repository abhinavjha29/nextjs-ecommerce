"use client";
import { RootState } from "@/app/lib/store/store";
import React from "react";
import { useSelector } from "react-redux";
import "./Pagination.css";
interface PaginationProps {
  setPage: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ setPage }) => {
  const paginationDetail = useSelector(
    (state: RootState) => state.product.paginationDetail
  );
  console.log(paginationDetail);
  const totalPages = paginationDetail.totalPages;
  const totalPage: number[] = [];
  const currentPage = paginationDetail.currentPage;
  for (let i = 0; i < totalPages; i++) {
    totalPage.push(i + 1);
  }
  const decPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };
  const gotoPage = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
    setPage(page);
  };
  const incPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };
  return (
    <nav aria-label="Page navigation example page-class">
      <ul className="pagination">
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => decPage(e)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {totalPage.map((page) => (
          <li className="page-item " key={page}>
            <button
              className="page-link"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                gotoPage(e, page)
              }
            >
              {page}
            </button>
          </li>
        ))}

        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next" onClick={incPage}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
