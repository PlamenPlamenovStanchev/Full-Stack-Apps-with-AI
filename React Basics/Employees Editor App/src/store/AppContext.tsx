import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Department, Employee } from '../types';

interface AppState {
  departments: Department[];
  employees: Employee[];
  addDepartment: (dept: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, dept: Omit<Department, 'id'>) => void;
  deleteDepartment: (id: string) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Omit<Employee, 'id'>) => void;
  deleteEmployee: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const savedDepts = localStorage.getItem('app_departments');
    const savedEmps = localStorage.getItem('app_employees');

    if (savedDepts && savedEmps) {
      setDepartments(JSON.parse(savedDepts));
      setEmployees(JSON.parse(savedEmps));
    } else {
      // Generate sample data
      const dept1: Department = { id: uuidv4(), name: 'Engineering', description: 'Software Development' };
      const dept2: Department = { id: uuidv4(), name: 'HR', description: 'Human Resources' };
      
      const emp1: Employee = { 
        id: uuidv4(), name: 'Alice Smith', jobTitle: 'Engineering Manager', 
        departmentId: dept1.id, email: 'alice@company.com', phone: '555-0100', managerId: null 
      };
      const emp2: Employee = { 
        id: uuidv4(), name: 'Bob Johnson', jobTitle: 'Software Engineer', 
        departmentId: dept1.id, email: 'bob@company.com', phone: '555-0101', managerId: emp1.id 
      };
      
      dept1.managerId = emp1.id; // Set manager

      const newDepts = [dept1, dept2];
      const newEmps = [emp1, emp2];
      
      setDepartments(newDepts);
      setEmployees(newEmps);
      localStorage.setItem('app_departments', JSON.stringify(newDepts));
      localStorage.setItem('app_employees', JSON.stringify(newEmps));
    }
  }, []);

  // Save to local storage whenever data changes
  useEffect(() => {
    if (departments.length > 0) {
      localStorage.setItem('app_departments', JSON.stringify(departments));
    }
  }, [departments]);

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('app_employees', JSON.stringify(employees));
    }
  }, [employees]);

  const addDepartment = (dept: Omit<Department, 'id'>) => {
    setDepartments(prev => {
      const updated = [...prev, { ...dept, id: uuidv4() }];
      localStorage.setItem('app_departments', JSON.stringify(updated));
      return updated;
    });
  };

  const updateDepartment = (id: string, updatedDept: Omit<Department, 'id'>) => {
    setDepartments(prev => {
      const updated = prev.map(d => d.id === id ? { ...d, ...updatedDept } : d);
      localStorage.setItem('app_departments', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteDepartment = (id: string) => {
    setDepartments(prev => {
      const updated = prev.filter(d => d.id !== id);
      localStorage.setItem('app_departments', JSON.stringify(updated));
      return updated;
    });
    setEmployees(prev => {
      const updated = prev.map(e => e.departmentId === id ? { ...e, departmentId: null } : e);
      localStorage.setItem('app_employees', JSON.stringify(updated));
      return updated;
    });
  };

  const addEmployee = (e: Omit<Employee, 'id'>) => {
    setEmployees(prev => {
      const updated = [...prev, { ...e, id: uuidv4() }];
      localStorage.setItem('app_employees', JSON.stringify(updated));
      return updated;
    });
  };

  const updateEmployee = (id: string, updatedEmp: Omit<Employee, 'id'>) => {
    setEmployees(prev => {
      const updated = prev.map(e => e.id === id ? { ...e, ...updatedEmp } : e);
      localStorage.setItem('app_employees', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => {
      const updated = prev.filter(e => e.id !== id).map(e => e.managerId === id ? { ...e, managerId: null } : e);
      localStorage.setItem('app_employees', JSON.stringify(updated));
      return updated;
    });
    setDepartments(prev => {
      const updated = prev.map(d => d.managerId === id ? { ...d, managerId: null } : d);
      localStorage.setItem('app_departments', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{
      departments, employees,
      addDepartment, updateDepartment, deleteDepartment,
      addEmployee, updateEmployee, deleteEmployee
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};