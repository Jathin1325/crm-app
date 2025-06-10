import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ProductManagement from './ProductManagement';

const data = [
  { name: 'Jan', users: 30, sales: 2400 },
  { name: 'Feb', users: 20, sales: 2210 },
  { name: 'Mar', users: 27, sales: 2290 },
  { name: 'Apr', users: 18, sales: 2000 },
  { name: 'May', users: 23, sales: 2181 },
  { name: 'Jun', users: 34, sales: 2500 },
];

const Dashboard = () => (
  <div className="dashboard-container">
    <h2>Dashboard</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="users" fill="#8884d8" />
        <Bar dataKey="sales" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
    <div style={{ margin: '32px 0' }}>
      <h3>Product Management</h3>
      {/* You can also use <Link to="/products">Go to Product Management</Link> if you want a separate page */}
      <ProductManagement />
    </div>
  </div>
);

export default Dashboard; 