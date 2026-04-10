import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useAppContext } from '../store/AppContext';
import { Employee } from '../types';

interface TreeNodeProps {
  employee: Employee;
  allEmployees: Employee[];
  depth: number;
}

const EmployeeTreeNode: React.FC<TreeNodeProps> = ({ employee, allEmployees, depth }) => {
  const subordinates = allEmployees.filter(e => e.managerId === employee.id);
  const indent = { marginLeft: `${depth * 1.5}rem` };

  return (
    <div key={employee.id} style={indent} className="my-2 border-start ps-3 border-2 border-primary animate__animated animate__fadeInLeft">
      <div className="d-flex align-items-center py-2 bg-white rounded shadow-sm px-3 mb-2">
        <i className="bi bi-person-badge text-primary me-2"></i>
        <div>
          <strong className="d-block">{employee.name}</strong>
          <small className="text-muted">{employee.jobTitle}</small>
        </div>
        {employee.departmentId && (
          <span className="badge bg-secondary ms-auto px-2 py-1">
            <i className="bi bi-building me-1"></i>
            {useAppContext().departments.find(d => d.id === employee.departmentId)?.name || 'Unknown'}
          </span>
        )}
      </div>
      {subordinates.length > 0 && (
        <div className="subordinates mt-2 d-flex flex-column">
          {subordinates.map(sub => (
            <EmployeeTreeNode key={sub.id} employee={sub} allEmployees={allEmployees} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const EmployeeHierarchy: React.FC = () => {
  const { employees } = useAppContext();
  const rootEmployees = employees.filter(e => !e.managerId);

  return (
    <div className="card shadow-sm mb-4 animate__animated animate__zoomIn animate__delay-1s">
      <div className="card-header bg-info text-white d-flex align-items-center">
        <i className="bi bi-diagram-3 me-2"></i>
        <h5 className="mb-0">Employee Hierarchy</h5>
      </div>
      <div className="card-body bg-light p-4">
        {rootEmployees.length === 0 ? (
          <p className="text-muted text-center py-3 mb-0">No top-level employees found to form a hierarchy.</p>
        ) : (
          rootEmployees.map(rootEmp => (
            <EmployeeTreeNode key={rootEmp.id} employee={rootEmp} allEmployees={employees} depth={0} />
          ))
        )}
      </div>
    </div>
  );
};