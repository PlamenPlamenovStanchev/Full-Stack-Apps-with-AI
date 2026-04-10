import React, { useState } from 'react';
import { Modal, Form, ListGroup, InputGroup } from 'react-bootstrap';
import { Employee, Department } from '../types';

interface EmployeeSelectorProps {
  show: boolean;
  onHide: () => void;
  employees: Employee[];
  onSelect: (id: string) => void;
  title?: string;
}

export const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({ show, onHide, employees, onSelect, title = "Choose an Employee" }) => {
  const [search, setSearch] = useState('');

  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.jobTitle.toLowerCase().includes(search.toLowerCase()));

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="h6 mb-0"><i className="bi bi-person-lines-fill me-2"></i>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3 shadow-sm">
          <InputGroup.Text className="bg-white"><i className="bi bi-search text-muted"></i></InputGroup.Text>
          <Form.Control placeholder="Search by name or job title..." value={search} onChange={e => setSearch(e.target.value)} autoFocus />
        </InputGroup>
        <ListGroup style={{ maxHeight: '300px', overflowY: 'auto' }} className="shadow-sm">
          <ListGroup.Item action onClick={() => { onSelect(''); onHide(); }} className="text-secondary bg-light">
            <em><i className="bi bi-x-circle me-2"></i>-- None -- (Clear selection)</em>
          </ListGroup.Item>
          {filtered.map(emp => (
            <ListGroup.Item key={emp.id} action onClick={() => { onSelect(emp.id); onHide(); }}>
              <strong>{emp.name}</strong> <span className="text-muted ms-2 small">{emp.jobTitle}</span>
            </ListGroup.Item>
          ))}
          {filtered.length === 0 && <div className="text-muted text-center p-4">No employees found.</div>}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

interface DepartmentSelectorProps {
  show: boolean;
  onHide: () => void;
  departments: Department[];
  onSelect: (id: string) => void;
}

export const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({ show, onHide, departments, onSelect }) => {
  const [search, setSearch] = useState('');

  const filtered = departments.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="h6 mb-0"><i className="bi bi-building me-2"></i>Choose a Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3 shadow-sm">
          <InputGroup.Text className="bg-white"><i className="bi bi-search text-muted"></i></InputGroup.Text>
          <Form.Control placeholder="Search by department name..." value={search} onChange={e => setSearch(e.target.value)} autoFocus />
        </InputGroup>
        <ListGroup style={{ maxHeight: '300px', overflowY: 'auto' }} className="shadow-sm">
          <ListGroup.Item action onClick={() => { onSelect(''); onHide(); }} className="text-secondary bg-light">
            <em><i className="bi bi-x-circle me-2"></i>-- None -- (Clear selection)</em>
          </ListGroup.Item>
          {filtered.map(d => (
            <ListGroup.Item key={d.id} action onClick={() => { onSelect(d.id); onHide(); }}>
              <strong>{d.name}</strong>
            </ListGroup.Item>
          ))}
          {filtered.length === 0 && <div className="text-muted text-center p-4">No departments found.</div>}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}