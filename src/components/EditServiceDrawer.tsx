'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import { CustomAutocomplete } from '@/components/inputs/Autocomplete';
import { AttachFile, Close, Person } from '@mui/icons-material';
import {
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  TextareaAutosize,
} from '@mui/material';

import malaysianFlag from '@/assets/photos/flag-for-flag-malaysia-svgrepo-com 3.svg';
import Image from 'next/image';

interface EditServiceDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function EditServiceDrawer({
  open,
  onClose,
}: EditServiceDrawerProps) {
  const [selectedOfferings, setSelectedOfferings] = useState<
    { id: string; label: string; icon: React.ReactNode; description: string }[]
  >([]);

  const additionalOfferingOptions = [
    {
      id: '1',
      label: 'Document Verification',
      icon: <Person />,
      description: 'This is a document verification service',
    },
    {
      id: '2',
      label: 'Legal Review',
      icon: <Person />,
      description: 'This is a legal review service',
    },
    {
      id: '3',
      label: 'Expert Consultation',
      icon: <Person />,
      description: 'This is an expert consultation service',
    },
    {
      id: '4',
      label: 'Priority Processing',
      icon: <Person />,
      description: 'This is a priority processing service',
    },
    {
      id: '5',
      label: 'Notarization Service',
      icon: <Person />,
      description: 'This is a notarization service',
    },
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        className: 'w-96 p-6',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 font-red-hat-display">
          Edit Service
        </h2>
        <IconButton onClick={onClose} className="text-gray-400">
          <Close />
        </IconButton>
      </div>

      <div className="space-y-6">
        {/* Title Section */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-1">Title</h3>
          {/* <TextField
            fullWidth
            placeholder="Enter service title"
            defaultValue="Register a new company | Private Limited - Sdn Bhd"
          /> */}
          <Input
            fullWidth
            placeholder="Enter service title"
            defaultValue=""
            disableUnderline
            sx={{
              '& .MuiInputBase-input': {
                padding: '12px 14px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                fontSize: '14px',
              },
              '& .MuiInputBase-root': {
                '&:before, &:after': {
                  display: 'none',
                },
              },
            }}
          />
        </div>

        {/* Description Section */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-1">
            Description
          </h3>
          <TextareaAutosize
            placeholder="Describe your service here"
            className=""
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px 14px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
          <div className="text-xs text-gray-400 text-right">(500 max)</div>
        </div>

        <div>
          <h3 className="text-base font-medium text-gray-900 mb-1">
            Estimated Completion Time (Days)
          </h3>
          {/* <TextField
            fullWidth
            placeholder="Enter service title"
            defaultValue="Register a new company | Private Limited - Sdn Bhd"
          /> */}
          <Input
            fullWidth
            placeholder="Enter service title"
            defaultValue=""
            disableUnderline
            type="number"
            sx={{
              '& .MuiInputBase-input': {
                padding: '12px 14px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                fontSize: '14px',
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '&[type=number]': {
                  MozAppearance: 'textfield',
                },
              },
              '& .MuiInputBase-root': {
                '&:before, &:after': {
                  display: 'none',
                },
              },
            }}
          />
        </div>
        {/* Price Section */}
        <div className="flex flex-col gap-2  max-w-sm max-h-12 mb-14">
          <label className="text-sm ">Price</label>

          <div className="flex items-center ">
            <div className="flex border-gray-300 border-l border-y h-12 items-center px-3 rounded-l  bg-gray-100">
              <Image
                src={malaysianFlag}
                alt="Malaysia Flag"
                width={38}
                height={20}
                style={{
                  width: '60px',
                }}
              />{' '}
              <span className="ml-1">MYR</span>
            </div>
            <input
              className="h-12 w-full border-gray-300 border-y border-r rounded-r px-2"
              type="text"
            />
          </div>
        </div>

        {/* Estimated Completion Time */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Estimated Completion Time (14 Total Days)
          </h3>
          <TextField fullWidth placeholder="1 day" defaultValue="1 day" />
        </div>

        {/* Additional Offerings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Additional Offerings
          </h3>
          <CustomAutocomplete<{
            id: string;
            label: string;
            icon: React.ReactNode;
            description: string;
          }>
            options={additionalOfferingOptions}
            getOptionLabel={(option) => option.label}
            value={selectedOfferings}
            onChange={(event, newValue) => setSelectedOfferings(newValue)}
            width="100%"
            minHeight="3.5rem"
            renderOption={(option) => (
              <>
                <div className="option-icon">{option.icon}</div>
                <div className="option-text">
                  <div className="option-label">{option.label}</div>
                  <div className="option-description">{option.description}</div>
                </div>
              </>
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outlined"
            onClick={onClose}
            className="text-gray-600 border-gray-300"
            sx={{
              width: '8rem',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="bg-blue-600 text-white hover:bg-blue-700"
            sx={{
              width: '8rem',
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
