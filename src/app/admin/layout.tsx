'use client';

import AdminSidebar from './components/AdminSidebar';
import { AdminProvider } from './context/AdminContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-900">
        <div className="flex">
          {/* Sidebar */}
          <AdminSidebar />
          
          {/* Main Content */}
          <div className="flex-1 ml-64">
            <div className="p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AdminProvider>
  );
}
