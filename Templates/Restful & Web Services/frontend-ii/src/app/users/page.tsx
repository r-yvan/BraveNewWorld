'use client';

import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import Table from '@/components/ui/Table';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/shared/EmptyState';
import { Users as UsersIcon } from 'lucide-react';
import { User } from '@/types';

export default function UsersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  const columns = [
    { header: 'Name', accessor: 'name' as keyof User },
    { header: 'Email', accessor: 'email' as keyof User },
    {
      header: 'Created At',
      accessor: (row: User) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="mt-2 text-gray-600">Manage all users in the system</p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="py-12">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-600">
            Failed to load users. Please try again.
          </div>
        ) : !data?.data || data.data.length === 0 ? (
          <EmptyState
            icon={UsersIcon}
            title="No users found"
            description="There are no users in the system yet."
          />
        ) : (
          <Table data={data.data} columns={columns} />
        )}
      </div>
    </div>
  );
}
