'use client';
import React from 'react';

import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import TextField from '@/components/ui/TextField';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import ServiceTable from '@/components/ServiceTable';
import type { Service, Specialist } from '@/types/service';
import {
  AddCircleOutline,
  ChevronLeft,
  ChevronRight,
  FileDownloadOutlined,
} from '@mui/icons-material';
import { Pagination, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import {
  useGetAllSpecialistsQuery,
  useDeleteSpecialistMutation,
} from '@/redux/features/specialists/specialists.api';
import { useDebounce } from '@/lib/hooks';

export default function SpecialistsPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuServiceId, setMenuServiceId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [specialistToDelete, setSpecialistToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  // Debounce search query to reduce API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Delete specialist mutation
  const [deleteSpecialist, { isLoading: isDeleting }] =
    useDeleteSpecialistMutation();

  // Determine is_draft filter based on selected tab
  const getDraftFilter = () => {
    if (selectedTab === 1) return true; // Drafts tab
    if (selectedTab === 2) return false; // Published tab
    return undefined; // All tab - no filter
  };

  // Fetch specialists using Redux API
  const {
    data: specialistsResponse,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetAllSpecialistsQuery({
    page,
    limit: 10,
    search: debouncedSearchQuery || undefined,
    is_draft: getDraftFilter(),
  });

  const specialists = specialistsResponse?.data || [];
  const totalPages = specialistsResponse?.meta?.totalPages || 1;
  const totalCount = specialistsResponse?.meta?.total || 0;

  // Transform specialists data to match Service interface for the table
  const transformedServices: Service[] = specialists.map(
    (specialist: Specialist) => ({
      id: specialist.id,
      name: specialist.title,
      price: Number(specialist.base_price),
      purchases: 0, // This would need to come from actual purchase data
      duration: `${specialist.duration_days} Days`,
      approvalStatus:
        specialist.verification_status === 'APPROVED'
          ? 'Approved'
          : specialist.verification_status === 'PENDING'
            ? 'Under-Review'
            : 'Rejected',
      publishStatus: specialist.is_draft ? 'Not Published' : 'Published',
    })
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setMenuServiceId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuServiceId(null);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setPage(1); // Reset to first page when changing tabs
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedServices(transformedServices.map((s) => s.id));
    } else {
      setSelectedServices([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Handle search with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Handle delete specialist - opens confirmation modal
  const handleDelete = (id: string) => {
    const specialist = specialists.find((s: Specialist) => s.id === id);
    if (specialist) {
      setSpecialistToDelete({ id: specialist.id, title: specialist.title });
      setDeleteModalOpen(true);
    }
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (!specialistToDelete) return;

    try {
      await deleteSpecialist(specialistToDelete.id).unwrap();
      // Remove from selected services if it was selected
      setSelectedServices((prev) =>
        prev.filter((sid) => sid !== specialistToDelete.id)
      );
      setDeleteModalOpen(false);
      setSpecialistToDelete(null);
    } catch (error) {
      console.error('Failed to delete specialist:', error);
      alert('Failed to delete specialist. Please try again.');
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSpecialistToDelete(null);
  };

  if (isError) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">
            Error loading specialists. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      <Header />
      {/* Breadcrumb */}
      <div className="my-6">
        <div className=" text-gray-600">
          <p className="text-xs font-semibold font-proxima-nova">Dashboard</p>
          <p className="font-bold text-xl text-gray-900 font-proxima-nova">
            Services
          </p>
        </div>
      </div>

      <div className="bg-white p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-red-hat-display">
            Specialists
          </h1>
          <p className="text-sm text-gray-600 font-proxima-nova">
            Create and publish your services for Clients & Companies
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 font-proxima-nova">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#999',
              },
              '& .MuiTab-root.Mui-selected': {
                color: 'primary.main',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              },
            }}
          >
            <Tab label="All" />
            <Tab label="Drafts" />
            <Tab label="Published" />
          </Tabs>
        </div>

        {/* Search and Actions */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <TextField
            placeholder="Search Specialists"
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            className="bg-[#f1f1f1] placeholder:font-semibold"
          />
          <div className="flex gap-3">
            <Link href="/specialists/create">
              <Button
                variant="contained"
                startIcon={<AddCircleOutline />}
                sx={{
                  bgcolor: 'primary.main',
                }}
              >
                Create Specialist
              </Button>
            </Link>
            <Button
              variant="outlined"
              startIcon={<FileDownloadOutlined />}
              className="font-proxima-nova"
              sx={{
                bgcolor: 'secondary.main',
                color: 'white',
              }}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Loading and Error States */}
        {isLoading || isFetching ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-2"></div>
              <p className="text-gray-600">Loading specialists...</p>
            </div>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-2">
                Error loading specialists
              </p>
              <p className="text-gray-600 text-sm">Please try again later</p>
            </div>
          </div>
        ) : transformedServices.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-gray-600 font-semibold mb-2">
                No specialists found
              </p>
              <p className="text-gray-500 text-sm">
                {searchQuery
                  ? 'Try adjusting your search'
                  : selectedTab === 1
                    ? 'No draft specialists yet'
                    : selectedTab === 2
                      ? 'No published specialists yet'
                      : 'Create your first specialist to get started'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Table */}
            <ServiceTable
              services={transformedServices}
              selectedServices={selectedServices}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              anchorEl={anchorEl}
              menuServiceId={menuServiceId}
              onMenuOpen={handleMenuOpen}
              onMenuClose={handleMenuClose}
              onDelete={handleDelete}
            />

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_event, value) => setPage(value)}
                shape="rounded"
                renderItem={(item) => (
                  <div className="mx-0.5">
                    {item.type === 'previous' ? (
                      <button
                        onClick={item.onClick}
                        disabled={item.disabled}
                        className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft fontSize="small" />
                        Previous
                      </button>
                    ) : item.type === 'next' ? (
                      <button
                        onClick={item.onClick}
                        disabled={item.disabled}
                        className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                      >
                        Next
                        <ChevronRight fontSize="small" />
                      </button>
                    ) : item.type === 'page' ? (
                      <button
                        onClick={item.onClick}
                        className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer ${
                          item.selected
                            ? 'bg-blue-900 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.page}
                      </button>
                    ) : (
                      <span className="px-2 py-1 text-gray-400">...</span>
                    )}
                  </div>
                )}
              />
            </div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          open={deleteModalOpen}
          title="Delete Specialist"
          message={`Are you sure you want to delete "${specialistToDelete?.title}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
}
