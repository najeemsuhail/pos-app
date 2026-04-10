import React, { useState, useEffect } from 'react';
import { menuItemService, categoryService } from '../../services/api';

const MenuManagementTab = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    is_available: true,
    image_url: '',
  });

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await menuItemService.getAll();
      setItems(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxFileSize = 5 * 1024 * 1024;
      if (file.size > maxFileSize) {
        setError('Image file is too large. Maximum size is 5MB.');
        e.target.value = '';
        return;
      }

      setSelectedImage(file);
      setError('');
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.price || !formData.category_id) {
        setError('Please fill all required fields');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('is_available', formData.is_available);
      formDataToSend.append('image_url', formData.image_url || '');
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      if (editingId) {
        await menuItemService.update(editingId, formDataToSend);
      } else {
        await menuItemService.create(formDataToSend);
      }

      setFormData({ name: '', price: '', category_id: '', is_available: true, image_url: '' });
      setEditingId(null);
      setShowForm(false);
      setImagePreview(null);
      setSelectedImage(null);
      setError('');
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save menu item');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      price: item.price,
      category_id: item.category_id,
      is_available: item.is_available,
      image_url: item.image_url || '',
    });
    setImagePreview(item.image_url);
    setSelectedImage(null);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await menuItemService.delete(id);
        fetchItems();
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete menu item');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', price: '', category_id: '', is_available: true, image_url: '' });
    setEditingId(null);
    setShowForm(false);
    setImagePreview(null);
    setSelectedImage(null);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  // Add cache-busting to image URLs to prevent browser caching
  const getCacheBustedImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}t=${Date.now()}`;
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>🍽️ Menu Items Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add New Item'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <h3>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div className="form-group">
                <label>Item Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Butter Chicken"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 300"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleInputChange}
                  />
                  Available
                </label>
              </div>
            </div>

            <div>
              <div className="form-group">
                <label>Item Image</label>
                <div style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: 'var(--bg-secondary)',
                  minHeight: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {imagePreview ? (
                    <>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{
                          maxWidth: '100%',
                          maxHeight: '150px',
                          marginBottom: '10px',
                          borderRadius: '4px'
                        }}
                      />
                      <p style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>Change image?</p>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: '24px', marginBottom: '10px' }}>📷</p>
                      <p style={{ marginBottom: '5px' }}>Click to upload image</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>PNG, JPG, GIF or WebP</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      opacity: 0,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-success">
              {editingId ? 'Update Item' : 'Add Item'}
            </button>
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <div className="loading">Loading menu items...</div>}

      <div className="items-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {items.map(item => (
          <div 
            key={item.id}
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              ':hover': { transform: 'translateY(-4px)' }
            }}
          >
            {item.image_url ? (
              <img 
                src={getCacheBustedImageUrl(item.image_url)}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'contain',
                  backgroundColor: 'var(--surface-muted)'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div style={{
              width: '100%',
              height: item.image_url ? '0px' : '180px',
              backgroundColor: 'var(--bg-tertiary)',
              display: item.image_url ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px'
            }}>
              🍔
            </div>
            <div style={{ padding: '15px' }}>
              <h4 style={{ marginBottom: '8px', marginTop: '0' }}>{item.name}</h4>
              <p style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                {getCategoryName(item.category_id)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--success-color)' }}>
                  ₹{parseFloat(item.price).toFixed(2)}
                </span>
                <span className={`status ${item.is_available ? 'available' : 'unavailable'}`} style={{ fontSize: '12px' }}>
                  {item.is_available ? '✓ Available' : '✗ Unavailable'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn-edit"
                  onClick={() => handleEdit(item)}
                  style={{ flex: 1 }}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(item.id)}
                  style={{ flex: 1 }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && !loading && (
        <div className="empty-state">
          <p>No menu items found. Add one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default MenuManagementTab;
