'use client';
import React from 'react';
import { Popover } from '@mui/material';
import Button from '@/components/ui/Button';
import type { Service } from '@/types/service';
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import pencilPlusIcon from '@/assets/icons/pencil_plus.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import Image from 'next/image';

interface ServiceTableProps {
  services: Service[];
  selectedServices: string[];
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (id: string) => void;
  anchorEl: null | HTMLElement;
  menuServiceId: string | null;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  onMenuClose: () => void;
}

export default function ServiceTable({
  services,
  selectedServices,
  onSelectAll,
  onSelectOne,
  anchorEl,
  menuServiceId,
  onMenuOpen,
  onMenuClose,
}: ServiceTableProps) {
  return (
    <TableContainer component={Paper} className="shadow-sm">
      <Table>
        <TableHead>
          <TableRow className="">
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedServices.length === services.length}
                indeterminate={
                  selectedServices.length > 0 &&
                  selectedServices.length < services.length
                }
                onChange={onSelectAll}
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
          {services.map((service) => (
            <TableRow key={service.id} hover className="hover:bg-gray-50">
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedServices.includes(service.id)}
                  onChange={() => onSelectOne(service.id)}
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
                  onClick={(e) => onMenuOpen(e, service.id)}
                >
                  <MoreVert />
                </button>
                <Popover
                  open={Boolean(anchorEl) && menuServiceId === service.id}
                  anchorEl={anchorEl}
                  onClose={onMenuClose}
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
                        onMenuClose();
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
                        onMenuClose();
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
  );
}
