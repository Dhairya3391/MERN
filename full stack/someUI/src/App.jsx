import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [currentEntity, setCurrentEntity] = useState('faculty');
  const [formData, setFormData] = useState({});
  const [items, setItems] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const apiBaseUrl = 'http://localhost:3000/api';

  const entityFields = {
    faculty: ['name', 'department', 'email'],
    student: ['name', 'grade', 'email'],
    product: ['name', 'category', 'price'],
  };

  useEffect(() => {
    fetchItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEntity]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/${currentEntity}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleEntityChange = (entity) => {
    setCurrentEntity(entity);
    setFormData({});
  };

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${apiBaseUrl}/${currentEntity}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      fetchItems();
      setFormData({});
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await fetch(`${apiBaseUrl}/${currentEntity}/${id}`, {
          method: 'DELETE',
        });
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setShowEditModal(true);
  };

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const saveEdit = async () => {
    try {
      await fetch(`${apiBaseUrl}/${currentEntity}/${editData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      setShowEditModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">CRUD Management</h2>

      {/* Entity Selection */}
      <ul className="nav nav-pills mb-4 justify-content-center">
        {Object.keys(entityFields).map((entity) => (
          <li className="nav-item" key={entity}>
            <button
              className={`nav-link ${currentEntity === entity ? 'active' : ''}`}
              onClick={() => handleEntityChange(entity)}
            >
              {entity.charAt(0).toUpperCase() + entity.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <div className="row">
        {/* Add Form */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              Add {currentEntity.charAt(0).toUpperCase() + currentEntity.slice(1)}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {entityFields[currentEntity].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      className="form-control"
                      value={formData[field] || ''}
                      onChange={(e) => handleFormChange(field, e.target.value)}
                      required
                    />
                  </div>
                ))}
                <button type="submit" className="btn btn-primary w-100">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* List Table */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              {currentEntity.charAt(0).toUpperCase() + currentEntity.slice(1)} List
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    {entityFields[currentEntity].map((field) => (
                      <th key={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      {entityFields[currentEntity].map((field) => (
                        <td key={field}>{item[field]}</td>
                      ))}
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Item</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {entityFields[currentEntity].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      className="form-control"
                      value={editData[field] || ''}
                      onChange={(e) => handleEditChange(field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
