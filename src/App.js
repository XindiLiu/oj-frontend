import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddProblem from './pages/AddProblem';
import EditProblem from './pages/EditProblem';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Navbar from './components/Navbar';
import Problems from './pages/Problems';
import ProblemDescription from './pages/ProblemDescription';
import Submission from './pages/Submission';
import { AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';
import UserPage from './pages/User';
import AddTestCases from './components/AddTestCases';
import ProblemStats from './pages/ProblemStats';
import RankList from './pages/RankList';
function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/add" element={<AddProblem />} />
        <Route path="/problem/update/:problemId" element={<EditProblem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problem/:id" element={<ProblemDescription />} />
        <Route path="/submission/:id" element={<Submission />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/add-test-cases" element={<AddTestCases />} />
        <Route path="/problem/stats/:id" element={<ProblemStats />} />
        <Route path="/rank-list" element={<RankList />} />
      </Routes>
    </Router>
  );
}

export default App;