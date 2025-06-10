import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../features/productSlice';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', price: '' });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpenModal = (product) => {
    if (product) {
      setEditId(product.id);
      setForm({ title: product.title, price: product.price });
    } else {
      setEditId(null);
      setForm({ title: '', price: '' });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm({ title: '', price: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateProduct({ id: editId, product: form }));
    } else {
      dispatch(addProduct(form));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ProductManagement">
      <div className="pm-header">
        <h3>Products</h3>
        <button className="pm-add-btn" onClick={() => handleOpenModal()}>+ Add Product</button>
      </div>
      <input
        className="pm-search"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {status === 'loading' && <div className="pm-loading">Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className="pm-table-wrapper">
        <table className="pm-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <button className="pm-edit-btn" onClick={() => handleOpenModal(product)}>Edit</button>
                  <button className="pm-delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className="pm-modal-overlay" onClick={handleCloseModal}>
          <div className="pm-modal" onClick={e => e.stopPropagation()}>
            <h4>{editId ? 'Edit Product' : 'Add Product'}</h4>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title:</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
              <div className="pm-modal-actions">
                <button type="submit" className="pm-save-btn">{editId ? 'Save' : 'Add'}</button>
                <button type="button" className="pm-cancel-btn" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement; 