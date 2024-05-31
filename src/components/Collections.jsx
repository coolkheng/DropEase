import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getCollections = async () => {
  
  return [
    { _id: "1", image: "https://via.placeholder.com/350x200", title: "Collection 1" },
    { _id: "2", image: "https://via.placeholder.com/350x200", title: "Collection 2" },
    { _id: "3", image: "https://via.placeholder.com/350x200", title: "Collection 3" },
    { _id: "4", image: "https://via.placeholder.com/350x200", title: "Collection 4" },
    { _id: "5", image: "https://via.placeholder.com/350x200", title: "Collection 5" },
    { _id: "6", image: "https://via.placeholder.com/350x200", title: "Collection 6" },
    { _id: "7", image: "https://via.placeholder.com/350x200", title: "Collection 7" },
    { _id: "8", image: "https://via.placeholder.com/350x200", title: "Collection 8" },
    { _id: "9", image: "https://via.placeholder.com/350x200", title: "Collection 9" },
    { _id: "10", image: "https://via.placeholder.com/350x200", title: "Collection 10" },
    { _id: "11", image: "https://via.placeholder.com/350x200", title: "Collection 11" },
    { _id: "12", image: "https://via.placeholder.com/350x200", title: "Collection 12" },
  ];
};

const Collections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await getCollections();
      setCollections(data);
    };

    fetchCollections();
  }, []);

  return (
    <div className="collections-container">
      <div className="flex flex-col items-center gap-10 py-8 px-5">
        {!collections || collections.length === 0 ? (
          <p className="text-body-bold">No collections found</p>
        ) : (
          <div className="collections-wrapper">
            {collections.map((collection) => (
              <Link to={`/collections/${collection._id}`} key={collection._id}>
                <div className="card">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="rounded-lg cursor-pointer"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <p>{collection.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
