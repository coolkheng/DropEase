import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/product/${id}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Failed to fetch product:', response.status, errorMessage);
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error('Failed to update product');
      }
      alert('Product updated successfully');
    } catch (err) {
      console.error('Error:', err.message);
      alert('Error updating product');
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={product.name} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input type="text" name="desc" value={product.desc} onChange={handleInputChange} />
        </label>
        {/* Add other fields as needed */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProduct;
