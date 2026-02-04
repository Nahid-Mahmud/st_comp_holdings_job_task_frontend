'use client';
import React from 'react';
import { Popover } from '@mui/material';

import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import TextField from '@/components/ui/TextField';
import type { Service } from '@/types/service';
import {
  AddCircleOutline,
  ChevronLeft,
  ChevronRight,
  FileDownloadOutlined,
  MoreVert,
} from '@mui/icons-material';
import {
  Checkbox,
  Pagination,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material';
import { useState } from 'react';

import pencilPlusIcon from '@/assets/icons/pencil_plus.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import Image from 'next/image';

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
            <Button
              variant="contained"
              startIcon={<AddCircleOutline />}
              sx={{
                bgcolor: 'primary.main',
              }}
            >
              Create
            </Button>
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
        <TableContainer component={Paper} className="shadow-sm">
          <Table>
            <TableHead>
              <TableRow className="">
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedServices.length === mockServices.length}
                    indeterminate={
                      selectedServices.length > 0 &&
                      selectedServices.length < mockServices.length
                    }
                    onChange={handleSelectAll}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        borderRadius: '4px',
                      },
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                      '&.MuiCheckbox-indeterminate': {
                        color: 'primary.main',
                      },
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#888888',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                >
                  Service
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#888888',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#888888',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                >
                  Purchases
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#888888',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                >
                  Duration
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#888888',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                >
                  Approval Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#888888',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                >
                  Publish Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: '#888888',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockServices.map((service) => (
                <TableRow key={service.id} hover className="hover:bg-gray-50">
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleSelectOne(service.id)}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          borderRadius: '4px',
                        },
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">
                    {service.name}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">
                    RM {service.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">
                    {service.purchases}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">
                    {service.duration}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      className="w-32"
                      sx={{
                        bgcolor:
                          service.approvalStatus === 'Approved'
                            ? '#a3e9c1'
                            : service.approvalStatus === 'Under-Review'
                              ? '#c0f5f0'
                              : '#e69a9b',
                        color:
                          service.approvalStatus === 'Approved'
                            ? '#18c964'
                            : service.approvalStatus === 'Under-Review'
                              ? '#06B6D4'
                              : '#DC2626',
                        '&:hover': {
                          bgcolor:
                            service.approvalStatus === 'Approved'
                              ? '#A3E6C8'
                              : service.approvalStatus === 'Under-Review'
                                ? '#A3E6E6'
                                : '#E8A8A8',
                        },
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      {service.approvalStatus}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor:
                          service.publishStatus === 'Published'
                            ? '#18c964'
                            : '#c00306',
                        color: 'white',
                        '&:hover': {
                          bgcolor:
                            service.publishStatus === 'Published'
                              ? '#059669'
                              : '#B91C1C',
                        },
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      {service.publishStatus}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <button
                      className="px-2 cursor-pointer"
                      onClick={(e) => handleMenuOpen(e, service.id)}
                    >
                      <MoreVert />
                    </button>
                    <Popover
                      open={Boolean(anchorEl) && menuServiceId === service.id}
                      anchorEl={anchorEl}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      PaperProps={{
                        style: {
                          minWidth: 128,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        },
                      }}
                    >
                      <div className="py-2">
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => {
                            // handle edit
                            handleMenuClose();
                          }}
                        >
                          <span className="mr-2">
                            <Image
                              src={pencilPlusIcon}
                              alt="Edit"
                              width={16}
                              height={16}
                            />
                          </span>{' '}
                          Edit
                        </button>
                        <hr className="my-1 border-gray-200" />
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => {
                            // handle delete
                            handleMenuClose();
                          }}
                        >
                          <span className="mr-2">
                            <Image
                              src={deleteIcon}
                              alt="Delete"
                              width={16}
                              height={16}
                            />
                          </span>{' '}
                          Delete
                        </button>
                      </div>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center">
          <Pagination
            count={10}
            page={page}
            onChange={(_event, value) => setPage(value)}
            shape="rounded"
            showFirstButton
            showLastButton
            renderItem={(item) => (
              <div className="mx-0.5">
                {item.type === 'previous' ? (
                  <button
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft fontSize="small" />
                    Previous
                  </button>
                ) : item.type === 'next' ? (
                  <button
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    Next
                    <ChevronRight fontSize="small" />
                  </button>
                ) : item.type === 'page' ? (
                  <button
                    onClick={item.onClick}
                    className={`px-3 py-1 text-sm font-medium rounded ${
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
