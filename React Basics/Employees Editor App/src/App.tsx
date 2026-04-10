import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './store/AppContext';
import { DepartmentList } from './components/DepartmentList';
import { EmployeeList } from './components/EmployeeList';
import { EmployeeHierarchy } from './components/EmployeeHierarchy';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function App() {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <AppProvider>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-0 shadow-sm animate__animated animate__fadeInDown">
          <Container>
            <Navbar.Brand className="fw-bold d-flex align-items-center">
              <i className="bi bi-people-fill me-2 fs-3 text-warning"></i>
              Company Directory Manager
            </Navbar.Brand>
          </Container>
        </Navbar>

        <main className="flex-grow-1 py-4">
          <Container>
            <div className="bg-white p-4 rounded shadow-sm border animate__animated animate__fadeIn">
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || 'employees')}
                id="main-tabs"
                className="mb-4 sticky-tabs"
                fill
              >
                <Tab 
                  eventKey="departments" 
                  title={<span className="fs-6 fw-semibold"><i className="bi bi-building me-2"></i>Departments</span>}
                >
                  <div className="pt-3">
                    <DepartmentList />
                  </div>
                </Tab>
                <Tab 
                  eventKey="employees" 
                  title={<span className="fs-6 fw-semibold"><i className="bi bi-person-vcard me-2"></i>Employees</span>}
                >
                  <div className="pt-3">
                    <EmployeeList />
                    <hr className="my-5" />
                    <EmployeeHierarchy />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Container>
        </main>

        <footer className="bg-white text-center text-muted py-3 mt-auto border-top">
          <Container>
            <small>&copy; {new Date().getFullYear()} Employees Editor App. Powered by React & Bootstrap.</small>
          </Container>
        </footer>
      </div>
      
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
    </AppProvider>
  );
}

export default App;