import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAppContext } from '../store/AppContext';
import { Employee } from '../types';
import { EmployeeSelector, DepartmentSelector } from './Selectors';
import { ConfirmModal } from './ConfirmModal';

export const EmployeeList: React.FC = () => {
  const { employees, departments, addEmployee, updateEmployee, deleteEmployee } = useAppContext();
  
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeptSelector, setShowDeptSelector] = useState(false);
  const [showManagerSelector, setShowManagerSelector] = useState(false);
  
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null);
  const [empToDelete, setEmpToDelete] = useState<Employee | null>(null);
  
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deptId, setDeptId] = useState('');
  const [managerId, setManagerId] = useState('');

  const openModal = (emp?: Employee) => {
    if (emp) {
      setEditingEmp(emp);
      setName(emp.name);
      setJobTitle(emp.jobTitle);
      setEmail(emp.email || '');
      setPhone(emp.phone || '');
      setDeptId(emp.departmentId || '');
      setManagerId(emp.managerId || '');
    } else {
      setEditingEmp(null);
      setName('');
      setJobTitle('');
      setEmail('');
      setPhone('');
      setDeptId('');
      setManagerId('');
    }
    setShowModal(true);
  };

  const openDeleteConfirm = (emp: Employee) => {
    setEmpToDelete(emp);
    setShowConfirm(true);
  };

  const handleSave = () => {
    if (!name.trim() || !jobTitle.trim()) {
      toast.error('The Employee Name and Job Title are mandatory fields.');
      return;
    }
    
    if (editingEmp) {
      updateEmployee(editingEmp.id, {
        name,
        jobTitle,
        email: email || undefined,
        phone: phone || undefined,
        departmentId: deptId || null,
        managerId: managerId || null
      });
      toast.success('Employee record updated successfully!');
    } else {
      addEmployee({
        name,
        jobTitle,
        email: email || undefined,
        phone: phone || undefined,
        departmentId: deptId || null,
        managerId: managerId || null
      });
      toast.success('New employee successfully registered!');
    }
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    if (empToDelete) {
      deleteEmployee(empToDelete.id);
      toast.info(`Employee "${empToDelete.name}" removed from the system.`);
      setEmpToDelete(null);
    }
  };

  const currentDeptObj = departments.find(d => d.id === deptId);
  const currentManagerObj = employees.find(e => e.id === managerId);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0 text-success"><i className="bi bi-people-fill me-2"></i>Employee Roster</h4>
        <Button variant="success" onClick={() => openModal()} className="shadow-sm">
          <i className="bi bi-person-plus-fill me-1"></i> Register Employee
        </Button>
      </div>

      <div className="table-responsive rounded shadow-sm border bg-white mb-4 animate__animated animate__fadeInUp">
        <Table hover className="mb-0">
          <thead className="table-light align-middle text-nowrap">
            <tr>
              <th><i className="bi bi-person-badge-fill me-2 text-success"></i>Full Name</th>
              <th>Designation</th>
              <th>Contact Details</th>
              <th>Department</th>
              <th>Direct Manager</th>
              <th className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {employees.map((emp, idx) => (
              <tr key={emp.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate__animated animate__fadeIn">
                <td className="fw-bold text-dark">
                  <div className="d-flex align-items-center">
                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontSize: '18px' }}>
                      {emp.name.charAt(0).toUpperCase()}
                    </div>
                    {emp.name}
                  </div>
                </td>
                <td className="fw-medium text-secondary">{emp.jobTitle}</td>
                <td>
                  <div className="d-flex flex-column gap-1">
                    {emp.email ? <a href={`mailto:${emp.email}`} className="text-decoration-none small text-primary"><i className="bi bi-envelope-fill me-1 text-muted"></i>{emp.email}</a> : <span className="small text-muted fst-italic"><i className="bi bi-envelope-x me-1"></i>No Email</span>}
                    {emp.phone ? <a href={`tel:${emp.phone}`} className="text-decoration-none small text-primary"><i className="bi bi-telephone-fill me-1 text-muted"></i>{emp.phone}</a> : <span className="small text-muted fst-italic"><i className="bi bi-telephone-x me-1"></i>No Phone</span>}
                  </div>
                </td>
                <td>
                  {emp.departmentId ? (
                    <span className="badge bg-light text-dark border px-2 py-1"><i className="bi bi-building me-1"></i>{departments.find(d => d.id === emp.departmentId)?.name || 'Unknown'}</span>
                  ) : <span className="text-muted fst-italic small">-- Unassigned --</span>}
                </td>
                <td>
                  {emp.managerId ? (
                    <span className="badge bg-info text-dark rounded-pill px-3 py-2 fw-medium"><i className="bi bi-person-fill me-1"></i>{employees.find(e => e.id === emp.managerId)?.name || 'Unknown'}</span>
                  ) : <span className="text-muted fst-italic small">-- None --</span>}
                </td>
                <td className="text-end pe-3">
                  <Button variant="outline-success" size="sm" className="me-2 rounded-circle" onClick={() => openModal(emp)} title="Edit Profile">
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                  <Button variant="outline-danger" size="sm" className="rounded-circle" onClick={() => openDeleteConfirm(emp)} title="Delete Employee">
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {employees.length === 0 && <div className="text-center text-muted p-5 bg-light"><i className="bi bi-people fs-1 d-block mb-3 opacity-25"></i>No employees have been registered yet.</div>}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" size="lg" centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold">
            {editingEmp ? <><i className="bi bi-person-check-fill text-success me-2"></i>Update Employee Profile</> : <><i className="bi bi-person-plus-fill text-success me-2"></i>Register New Employee</>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="row g-4 bg-light p-3 rounded mb-4">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-semibold">Full Name <span className="text-danger">*</span></Form.Label>
                <Form.Control size="lg" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Doe" autoFocus />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-semibold">Job Title <span className="text-danger">*</span></Form.Label>
                <Form.Control size="lg" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. Senior Developer" />
              </Form.Group>
            </div>
          </div>
          
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-semibold"><i className="bi bi-envelope me-2 text-muted"></i>Email Address</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john.doe@company.com" />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-semibold"><i className="bi bi-telephone me-2 text-muted"></i>Phone Number</Form.Label>
                <Form.Control type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" />
              </Form.Group>
            </div>
          </div>

          <hr className="my-4" />

          <div className="row g-4 mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-semibold d-block"><i className="bi bi-building me-2 text-muted"></i>Assigned Department</Form.Label>
                <div className="d-flex align-items-center">
                  <span className={`flex-grow-1 px-3 py-2 border rounded-start bg-light text-truncate ${!deptId ? 'text-muted' : 'fw-medium'}`}>
                    {deptId ? <><i className="bi bi-check-circle-fill text-success me-2"></i>{currentDeptObj?.name || 'Unknown'}</> : '-- Click to assign a department --'}
                  </span>
                  <Button variant="outline-secondary" className="rounded-end border-start-0 bg-white" onClick={() => setShowDeptSelector(true)}>
                    <i className="bi bi-search me-1"></i> Browse
                  </Button>
                </div>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-semibold d-block"><i className="bi bi-person-lines-fill me-2 text-muted"></i>Direct Line Manager</Form.Label>
                <div className="d-flex align-items-center">
                  <span className={`flex-grow-1 px-3 py-2 border rounded-start bg-light text-truncate ${!managerId ? 'text-muted' : 'fw-medium'}`}>
                    {managerId ? <><i className="bi bi-person-check-fill text-success me-2"></i>{currentManagerObj ? `${currentManagerObj.name} (${currentManagerObj.jobTitle})` : 'Unknown'}</> : '-- Click to assign a manager --'}
                  </span>
                  <Button variant="outline-secondary" className="rounded-end border-start-0 bg-white" onClick={() => setShowManagerSelector(true)}>
                    <i className="bi bi-search me-1"></i> Browse
                  </Button>
                </div>
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light p-3 border-top">
          <Button variant="outline-secondary" className="px-4" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" className="px-4 shadow-sm" onClick={handleSave}>
            <i className="bi bi-save me-2"></i>Save Profile
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Selectors */}
      <DepartmentSelector
        show={showDeptSelector}
        onHide={() => setShowDeptSelector(false)}
        departments={departments}
        onSelect={(id) => setDeptId(id)}
      />

      <EmployeeSelector
        show={showManagerSelector}
        onHide={() => setShowManagerSelector(false)}
        // Avoid cyclic generic selection for self
        employees={employees.filter(e => e.id !== editingEmp?.id)}
        onSelect={(id) => setManagerId(id)}
        title="Assign Line Manager"
      />

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Irreversible Deletion"
        message={`Are you completely sure you want to permanently delete the profile of "${empToDelete?.name}"? All assigned subordinate relations and department associations will be unlinked automatically.`}
      />
    </>
  );
};