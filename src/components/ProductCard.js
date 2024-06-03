import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ img, name, desc, rating, price, product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const generateRating = (rating) => {
    switch (rating) {
      case 1:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
        );
      case 2:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
        );
      case 3:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <AiOutlineStar />
          </div>
        );
      case 4:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
        );
      case 5:
        return (
          <div className="flex gap-1 text-[20px] text-[#FF9529]">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative px-5 border border-gray-200 rounded-xl w-[200px] h-[350px]" onClick={handleProductClick}>
      <div>
        <img className="mt-4 w-[200px] h-[150px] rounded-md" src={img} alt={name} />
      </div>
      <h2 className="text-accent font-medium uppercase">{name}</h2>
      <p className="text-gray-500 max-w-[150px]">{desc}</p>
      <div>{generateRating(rating)}</div>
      <div className="font-bold flex gap-4">
        RM{price}
        <del className="text-gray-500 font-normal">RM{parseInt(price) + 50}.00</del>
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        <MdAddShoppingCart className="text-accent text-xl" onClick={handleProductClick} />
      </div>
    </div>
  );
};

export default ProductCard;
