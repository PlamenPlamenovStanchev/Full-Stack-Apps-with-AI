import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAppContext } from '../store/AppContext';
import { Department } from '../types';
import { EmployeeSelector } from './Selectors';
import { ConfirmModal } from './ConfirmModal';

export const DepartmentList: React.FC = () => {
  const { departments, employees, addDepartment, updateDepartment, deleteDepartment } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEmpSelector, setShowEmpSelector] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deptToDelete, setDeptToDelete] = useState<Department | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [managerId, setManagerId] = useState('');

  const openModal = (dept?: Department) => {
    if (dept) {
      setEditingDept(dept);
      setName(dept.name);
      setDescription(dept.description || '');
      setManagerId(dept.managerId || '');
    } else {
      setEditingDept(null);
      setName('');
      setDescription('');
      setManagerId('');
    }
    setShowModal(true);
  };

  const openDeleteConfirm = (dept: Department) => {
    setDeptToDelete(dept);
    setShowConfirm(true);
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('The Department name is required');
      return;
    }

    if (editingDept) {
      updateDepartment(editingDept.id, {
        name,
        description: description || undefined,
        managerId: managerId || null
      });
      toast.success('Department updated!');
    } else {
      addDepartment({
        name,
        description: description || undefined,
        managerId: managerId || null
      });
      toast.success('Department added!');
    }
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    if (deptToDelete) {
      deleteDepartment(deptToDelete.id);
      toast.info(`Department "${deptToDelete.name}" deleted`);
      setDeptToDelete(null);
    }
  };

  const managerObj = employees.find(e => e.id === managerId);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0 text-primary"><i className="bi bi-building me-2"></i>Department Directory</h4>
        <Button variant="primary" onClick={() => openModal()} className="shadow-sm">
          <i className="bi bi-plus-lg me-1"></i> Add Department
        </Button>
      </div>

      <div className="table-responsive rounded shadow-sm border bg-white mb-4 animate__animated animate__fadeIn">
        <Table hover className="mb-0">
          <thead className="table-light align-middle text-nowrap">
            <tr>
              <th><i className="bi bi-geo-alt-fill me-2 text-muted"></i>Department Name</th>
              <th>Description</th>
              <th>Manager</th>
              <th className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {departments.map((dept, index) => (
              <tr key={dept.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate__animated animate__fadeIn">
                <td className="fw-semibold text-primary">{dept.name}</td>
                <td>{dept.description ? <span className="text-secondary">{dept.description}</span> : <span className="text-muted fst-italic">--</span>}</td>
                <td>
                  {dept.managerId ? (
                    <span className="badge bg-info text-dark rounded-pill px-3 py-2 fw-medium">
                      <i className="bi bi-person-fill me-1"></i>
                      {employees.find(e => e.id === dept.managerId)?.name || 'Unknown'}
                    </span>
                  ) : (
                    <span className="text-muted fst-italic small">-- None --</span>
                  )}
                </td>
                <td className="text-end pe-3">
                  <Button variant="outline-secondary" size="sm" className="me-2 rounded-circle" onClick={() => openModal(dept)} title="Edit">
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                  <Button variant="outline-danger" size="sm" className="rounded-circle" onClick={() => openDeleteConfirm(dept)} title="Delete">
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {departments.length === 0 && <div className="text-center text-muted p-5 bg-light"><i className="bi bi-building fs-1 d-block mb-3 opacity-25"></i>No departments have been added yet.</div>}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold">
            {editingDept ? <><i className="bi bi-pencil-square text-primary me-2"></i>Edit Department</> : <><i className="bi bi-plus-square text-success me-2"></i>New Department</>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Department Name <span className="text-danger">*</span></Form.Label>
            <Form.Control size="lg" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sales, Marketing, IT..." autoFocus />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Provide optional details about this department's function..." />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold d-block">Department Manager</Form.Label>
            <div className="d-flex align-items-center">
              <span className={`flex-grow-1 px-3 py-2 border rounded-start bg-light text-truncate ${!managerId ? 'text-muted' : 'fw-medium'}`}>
                {managerId ? <><i className="bi bi-person-check-fill text-success me-2"></i>{managerObj ? `${managerObj.name} (${managerObj.jobTitle})` : 'Unknown User'}</> : '-- Click to assign a manager --'}
              </span>
              <Button variant="outline-primary" className="rounded-end border-start-0" onClick={() => setShowEmpSelector(true)}>
                <i className="bi bi-search me-1"></i> Browse
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-light p-3 border-top">
          <Button variant="outline-secondary" className="px-4" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" className="px-4 shadow-sm" onClick={handleSave}>
            <i className="bi bi-save me-2"></i>Save Department
          </Button>
        </Modal.Footer>
      </Modal>

      <EmployeeSelector
        show={showEmpSelector}
        onHide={() => setShowEmpSelector(false)}
        employees={employees}
        onSelect={(empId) => setManagerId(empId)}
        title="Select Manager"
      />

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to permanently delete the "${deptToDelete?.name}" department?`}
      />
    </>
  );
};