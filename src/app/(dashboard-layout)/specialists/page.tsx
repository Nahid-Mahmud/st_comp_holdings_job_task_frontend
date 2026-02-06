'use client';
import React from 'react';

import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import TextField from '@/components/ui/TextField';
import ServiceTable from '@/components/ServiceTable';
import type { Service } from '@/types/service';
import {
  AddCircleOutline,
  ChevronLeft,
  ChevronRight,
  FileDownloadOutlined,
} from '@mui/icons-material';
import { Pagination, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';

// Mock data
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 20,
    duration: '3 Days',
    approvalStatus: 'Approved',
    publishStatus: 'Published',
  },
  {
    id: '2',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 0,
    duration: '1 Day',
    approvalStatus: 'Under-Review',
    publishStatus: 'Published',
  },
  {
    id: '3',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 431,
    duration: '14 Days',
    approvalStatus: 'Approved',
    publishStatus: 'Not Published',
  },
  {
    id: '4',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 0,
    duration: '7 Days',
    approvalStatus: 'Under-Review',
    publishStatus: 'Published',
  },
  {
    id: '5',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 1283,
    duration: '4 Days',
    approvalStatus: 'Rejected',
    publishStatus: 'Not Published',
  },
  {
    id: '6',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 9180,
    duration: '5 Days',
    approvalStatus: 'Rejected',
    publishStatus: 'Not Published',
  },
];

export default function SpecialistsPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuServiceId, setMenuServiceId] = useState<string | null>(null);
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
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedServices(mockServices.map((s) => s.id));
    } else {
      setSelectedServices([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const getApprovalStatusColor = (status: Service['approvalStatus']) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Under-Review':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPublishStatusColor = (status: Service['publishStatus']) => {
    return status === 'Published' ? 'success' : 'error';
  };

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
            placeholder="Search Services"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                Create
              </Button>
            </Link>
            <Button
              variant="outlined"
              startIcon={<FileDownloadOutlined />}
              // className="border-gray-300 text-gray-700 normal-case"
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

        {/* Table */}
        <ServiceTable
          services={mockServices}
          selectedServices={selectedServices}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          anchorEl={anchorEl}
          menuServiceId={menuServiceId}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
        />

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center">
          <Pagination
            count={10}
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
      </div>
    </div>
  );
}
