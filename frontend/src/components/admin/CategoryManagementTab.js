import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/api';

const CategoryManagementTab = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAll();
      setCategories(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name.trim()) {
        setError('Category name is required');
        return;
      }

      if (editingId) {
        await categoryService.update(editingId, formData.name);
      } else {
        await categoryService.create(formData.name);
      }

      setFormData({ name: '' });
      setEditingId(null);
      setShowForm(false);
      setError('');
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await categoryService.delete(id);
        fetchCategories();
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete category');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>📂 Categories Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add New Category'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Category' : 'Add New Category'}</h3>
          
          <div className="form-group">
            <label>Category Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Starters, Main Course"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-success">
              {editingId ? 'Update Category' : 'Add Category'}
            </button>
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <div className="loading">Loading categories...</div>}

      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <h4>{category.name}</h4>
            <div className="card-actions">
              <button 
                className="btn-edit"
                onClick={() => handleEdit(category)}
              >
                Edit
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDelete(category.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && !loading && (
        <div className="empty-state">
          <p>No categories found. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default CategoryManagementTab;
