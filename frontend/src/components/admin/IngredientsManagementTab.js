import React, { useEffect, useMemo, useState } from 'react';
import { ingredientService } from '../../services/api';

const createForm = () => ({
  name: '',
  unit: '',
  current_stock: '',
  min_stock_level: '',
});

const stockStatus = (ingredient) => {
  if (ingredient.is_negative_stock) return 'Negative';
  if (ingredient.is_out_of_stock) return 'Out';
  if (ingredient.is_low_stock) return 'Low';
  return 'OK';
};

const IngredientsManagementTab = () => {
  const [ingredients, setIngredients] = useState([]);
  const [movements, setMovements] = useState([]);
  const [form, setForm] = useState(createForm());
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ingredientsResponse, movementsResponse] = await Promise.all([
        ingredientService.getAll(),
        ingredientService.getMovements({ limit: 50 }),
      ]);
      setIngredients(ingredientsResponse.data);
      setMovements(movementsResponse.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load ingredients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const alertCount = ingredients.filter((ingredient) => ingredient.is_out_of_stock || ingredient.is_low_stock).length;

  const filteredIngredients = useMemo(() => {
    if (filter === 'low') {
      return ingredients.filter((ingredient) => ingredient.is_low_stock);
    }
    if (filter === 'out') {
      return ingredients.filter((ingredient) => ingredient.is_out_of_stock);
    }
    if (filter === 'negative') {
      return ingredients.filter((ingredient) => ingredient.is_negative_stock);
    }
    return ingredients;
  }, [filter, ingredients]);

  const resetForm = () => {
    setForm(createForm());
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await ingredientService.update(editingId, form);
        setSuccess('Ingredient updated');
      } else {
        await ingredientService.create(form);
        setSuccess('Ingredient added');
      }
      resetForm();
      setTimeout(() => setSuccess(''), 2500);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save ingredient');
    }
  };

  const handleEdit = (ingredient) => {
    setForm({
      name: ingredient.name,
      unit: ingredient.unit,
      current_stock: ingredient.current_stock,
      min_stock_level: ingredient.min_stock_level,
    });
    setEditingId(ingredient.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this ingredient?')) return;

    try {
      await ingredientService.delete(id);
      setSuccess('Ingredient deleted');
      setTimeout(() => setSuccess(''), 2500);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete ingredient');
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h2>Ingredients</h2>
          <p className="compact-muted">{alertCount} stock alert{alertCount === 1 ? '' : 's'}</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm((current) => !current)}>
          {showForm ? 'Cancel' : '+ Add Ingredient'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Ingredient' : 'Add Ingredient'}</h3>
          <div className="compact-grid-3">
            <div className="form-group">
              <label>Name *</label>
              <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Unit *</label>
              <input value={form.unit} onChange={(event) => setForm((current) => ({ ...current, unit: event.target.value }))} placeholder="kg / ltr / pcs" required />
            </div>
            <div className="form-group">
              <label>Current Stock</label>
              <input type="number" step="0.001" value={form.current_stock} onChange={(event) => setForm((current) => ({ ...current, current_stock: event.target.value }))} />
            </div>
            <div className="form-group">
              <label>Low Alert At</label>
              <input type="number" min="0" step="0.001" value={form.min_stock_level} onChange={(event) => setForm((current) => ({ ...current, min_stock_level: event.target.value }))} />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" type="submit">{editingId ? 'Update' : 'Save'}</button>
            <button className="btn-secondary" type="button" onClick={resetForm}>Cancel</button>
          </div>
        </form>
      )}

      <div className="report-filters" style={{ marginBottom: '14px' }}>
        <button className={filter === 'all' ? 'btn-primary' : 'btn-secondary'} type="button" onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'low' ? 'btn-primary' : 'btn-secondary'} type="button" onClick={() => setFilter('low')}>Low</button>
        <button className={filter === 'out' ? 'btn-primary' : 'btn-secondary'} type="button" onClick={() => setFilter('out')}>Out</button>
        <button className={filter === 'negative' ? 'btn-primary' : 'btn-secondary'} type="button" onClick={() => setFilter('negative')}>Negative</button>
      </div>

      <div className="items-table compact-table" style={{ marginBottom: '16px' }}>
        {loading ? (
          <div className="loading">Loading ingredients...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Stock</th>
                <th>Unit</th>
                <th>Low Alert</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIngredients.map((ingredient) => (
                <tr key={ingredient.id}>
                  <td>{ingredient.name}</td>
                  <td>{Number(ingredient.current_stock || 0).toFixed(3)}</td>
                  <td>{ingredient.unit}</td>
                  <td>{Number(ingredient.min_stock_level || 0).toFixed(3)}</td>
                  <td>{stockStatus(ingredient)}</td>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-secondary" type="button" onClick={() => handleEdit(ingredient)}>Edit</button>
                    <button className="btn-delete" type="button" onClick={() => handleDelete(ingredient.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filteredIngredients.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No ingredients found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="items-table compact-table">
        <h3>Recent Stock Movements</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Ingredient</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td>{new Date(movement.created_at).toLocaleString()}</td>
                <td>{movement.ingredient?.name || '-'}</td>
                <td>{movement.type}</td>
                <td>{Number(movement.quantity || 0).toFixed(3)}</td>
                <td>{movement.note || '-'}</td>
              </tr>
            ))}
            {movements.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No stock movements yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientsManagementTab;
