import React from 'react';
import { Link } from 'react-router-dom';
import "../style/Category.css";

const Category = () => {
  return (
    <div className="flex justify-center w-full mt-4">
            <div className="w-full">
              <div className="bg-gray-200 p-1 flex justify-center">
                <Link className="category__link relative mr-10 px-4 py-2" to="/home">
                  Home
                </Link>
                <Link
                  className="category__link relative mr-10 px-4 py-2"
                  to="/women"
                >
                  Women's
                </Link>
                <Link
                  className="category__link relative mr-10 px-4 py-2"
                  to="/men"
                >
                  Men's
                </Link>
              </div>
            </div>
          </div>
  )
}

export default Category