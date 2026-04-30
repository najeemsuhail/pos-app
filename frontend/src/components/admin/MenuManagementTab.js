import React, { useEffect, useMemo, useState } from 'react';
import { menuItemService, categoryService, ingredientService } from '../../services/api';

const createDefaultFormData = () => ({
  name: '',
  price: '',
  category_id: '',
  is_available: true,
  image_url: '',
});

const createRecipeRow = () => ({
  ingredient_id: '',
  quantity: '',
});

const MenuManagementTab = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipeItems, setRecipeItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState(createDefaultFormData());

  useEffect(() => {
    fetchItems();
    fetchCategories();
    fetchIngredients();
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

  const fetchIngredients = async () => {
    try {
      const response = await ingredientService.getAll();
      setIngredients(response.data);
    } catch (err) {
      console.error('Failed to fetch ingredients');
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

      let savedItem;
      if (editingId) {
        const response = await menuItemService.update(editingId, formDataToSend);
        savedItem = response.data;
      } else {
        const response = await menuItemService.create(formDataToSend);
        savedItem = response.data;
      }

      if (savedItem?.id) {
        const normalizedRecipe = recipeItems
          .filter((item) => item.ingredient_id && Number(item.quantity) > 0)
          .map((item) => ({
            ingredient_id: Number(item.ingredient_id),
            quantity: Number(item.quantity),
          }));
        await menuItemService.updateIngredients(savedItem.id, normalizedRecipe);
      }

      setFormData(createDefaultFormData());
      setRecipeItems([]);
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

  const handleEdit = async (item) => {
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
    try {
      const response = await menuItemService.getIngredients(item.id);
      setRecipeItems(
        response.data.length > 0
          ? response.data.map((recipeItem) => ({
              ingredient_id: recipeItem.ingredient_id,
              quantity: recipeItem.quantity,
            }))
          : []
      );
    } catch (err) {
      setRecipeItems([]);
      setError(err.response?.data?.error || 'Failed to load item ingredients');
    }
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
    setFormData(createDefaultFormData());
    setEditingId(null);
    setShowForm(false);
    setImagePreview(null);
    setSelectedImage(null);
    setRecipeItems([]);
  };

  const updateRecipeItem = (index, field, value) => {
    setRecipeItems((current) => current.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [field]: value } : item
    ));
  };

  const addRecipeItem = () => {
    setRecipeItems((current) => [...current, createRecipeRow()]);
  };

  const removeRecipeItem = (index) => {
    setRecipeItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return items;
    }

    return items.filter((item) => {
      const categoryName = (categories.find((category) => category.id === item.category_id)?.name || 'Unknown').toLowerCase();
      const priceText = String(item.price ?? '').toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        categoryName.includes(query) ||
        priceText.includes(query)
      );
    });
  }, [items, searchTerm, categories]);

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>🍽️ Menu Items Management</h2>
        <button 
          className="btn-primary"
          onClick={() => {
            if (showForm) {
              handleCancel();
            } else {
              setFormData(createDefaultFormData());
              setRecipeItems([]);
              setEditingId(null);
              setShowForm(true);
            }
          }}
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

              <div className="form-group">
                <label>Recipe Ingredients</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {recipeItems.map((recipeItem, index) => {
                    const selectedIngredient = ingredients.find((ingredient) => Number(ingredient.id) === Number(recipeItem.ingredient_id));
                    return (
                      <div key={index} style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr auto', gap: '8px', alignItems: 'center' }}>
                        <select
                          value={recipeItem.ingredient_id}
                          onChange={(event) => updateRecipeItem(index, 'ingredient_id', event.target.value)}
                        >
                          <option value="">Select ingredient</option>
                          {ingredients.map((ingredient) => (
                            <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="0.001"
                          step="0.001"
                          value={recipeItem.quantity}
                          onChange={(event) => updateRecipeItem(index, 'quantity', event.target.value)}
                          placeholder={selectedIngredient?.unit ? `Qty ${selectedIngredient.unit}` : 'Qty'}
                        />
                        <button type="button" className="btn-secondary" onClick={() => removeRecipeItem(index)}>Remove</button>
                      </div>
                    );
                  })}
                  <button type="button" className="btn-secondary" onClick={addRecipeItem}>
                    + Add Ingredient
                  </button>
                </div>
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

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '18px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 280px', maxWidth: '420px' }}>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by item, category, or price"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: '2px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '14px'
            }}
          />
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
          Showing {filteredItems.length} of {items.length} items
        </div>
      </div>

      <div className="items-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
        gap: '16px',
        marginTop: '20px'
      }}>
        {filteredItems.map(item => (
          <div 
            key={item.id}
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              background: 'var(--card-bg)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {item.image_url ? (
              <img 
                src={item.image_url}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '128px',
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
              height: item.image_url ? '0px' : '128px',
              backgroundColor: 'var(--bg-tertiary)',
              display: item.image_url ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px'
            }}>
              🍔
            </div>
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <h4 style={{ margin: '0', fontSize: '16px', lineHeight: '1.3' }}>{item.name}</h4>
              <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '13px' }}>
                {getCategoryName(item.category_id)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
                <span style={{ fontSize: '17px', fontWeight: 'bold', color: 'var(--success-color)' }}>
                  ₹{parseFloat(item.price).toFixed(2)}
                </span>
                <span className={`status ${item.is_available ? 'available' : 'unavailable'}`} style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                  {item.is_available ? '✓ Available' : '✗ Unavailable'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
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

      {filteredItems.length === 0 && !loading && (
        <div className="empty-state">
          <p>{items.length === 0 ? 'No menu items found. Add one to get started!' : 'No menu items match your search.'}</p>
        </div>
      )}
    </div>
  );
};

export default MenuManagementTab;
