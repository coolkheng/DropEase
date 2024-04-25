import React from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
  return (
    <div className="flex justify-center w-full mt-4">
            <div className="w-full">
              <div className="bg-gray-200 p-1 flex justify-center">
                <Link className="navbar__link relative mr-10 px-4 py-2" to="/">
                  Home
                </Link>
                <Link
                  className="navbar__link relative mr-10 px-4 py-2"
                  to="/women"
                >
                  Women's
                </Link>
                <Link
                  className="navbar__link relative mr-10 px-4 py-2"
                  to="/men"
                >
                  Men's
                </Link>
                <Link className="navbar__link relative px-4 py-2" to="/kids">
                  Kids'
                </Link>
              </div>
            </div>
          </div>
  )
}

export default Category