'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
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
  CircularProgress,
} from '@mui/material';

import malaysianFlag from '@/assets/photos/flag-for-flag-malaysia-svgrepo-com 3.svg';
import Image from 'next/image';
import { useGetAllServiceOfferingMasterListsQuery } from '@/redux/features/serviceOfferingsMasterList/serviceOfferingsMasterList.api';

interface EditServiceDrawerProps {
  open: boolean;
  onClose: () => void;
  formData?: {
    title: string;
    description: string;
    base_price: number;
    duration_days: number;
  };
  onFormDataChange?: (data: {
    title: string;
    description: string;
    base_price: number;
    duration_days: number;
  }) => void;
  selectedOfferings?: string[];
  onOfferingsChange?: (offerings: string[]) => void;
  uploadedFiles?: File[];
  onSave?: (
    data: {
      title: string;
      description: string;
      base_price: number;
      duration_days: number;
      service_offerings_master_list_ids?: string[];
    },
    photos: File[]
  ) => Promise<void>;
  isLoading?: boolean;
}

export default function EditServiceDrawer({
  open,
  onClose,
  formData = {
    title: '',
    description: '',
    base_price: 0,
    duration_days: 0,
  },
  onFormDataChange,
  selectedOfferings = [],
  onOfferingsChange,
  uploadedFiles = [],
  onSave,
  isLoading = false,
}: EditServiceDrawerProps) {
  const [localFormData, setLocalFormData] = useState(formData);
  const [selectedOfferingObjects, setSelectedOfferingObjects] = useState<
    { id: string; label: string; icon: React.ReactNode; description: string }[]
  >([]);
  const prevOpenRef = useRef(false);
  const { data: serviceOfferingsResponse } =
    useGetAllServiceOfferingMasterListsQuery(undefined);

  const additionalOfferingOptions = useMemo(
    () =>
      serviceOfferingsResponse?.data?.map(
        (offering: {
          id: string;
          title: string;
          description?: string | null;
          secure_url?: string | null;
        }) => ({
          id: offering.id,
          label: offering.title,
          icon: offering.secure_url ? (
            <Image
              src={offering.secure_url}
              alt={offering.title}
              width={24}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <Person />
          ),
          description: offering.description || 'No description provided',
        })
      ) ?? [],
    [serviceOfferingsResponse?.data]
  );

  // Sync local form data with parent form data only when drawer opens
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      // Only sync when drawer first opens
      setLocalFormData(formData);
      const selected = additionalOfferingOptions.filter(
        (option: {
          id: string;
          label: string;
          icon: React.ReactNode;
          description: string;
        }) => selectedOfferings.includes(option.id)
      );
      setSelectedOfferingObjects(selected);
    }
    prevOpenRef.current = open;
  }, [open, additionalOfferingOptions, formData, selectedOfferings]);

  const handleSave = async () => {
    // Client-side validation
    if (!localFormData.title || localFormData.title.trim() === '') {
      alert('Please enter a service title');
      return;
    }

    if (!localFormData.description || localFormData.description.trim() === '') {
      alert('Please enter a service description');
      return;
    }

    if (!localFormData.base_price || Number(localFormData.base_price) <= 0) {
      alert('Please enter a valid price');
      return;
    }

    if (
      !localFormData.duration_days ||
      Number(localFormData.duration_days) <= 0
    ) {
      alert('Please enter a valid duration');
      return;
    }

    if (uploadedFiles.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    try {
      const submitData = {
        title: String(localFormData.title),
        description: String(localFormData.description),
        base_price: Number(localFormData.base_price),
        duration_days: Number(localFormData.duration_days),
        ...(selectedOfferingObjects.length > 0 && {
          service_offerings_master_list_ids: selectedOfferingObjects.map(
            (o) => o.id
          ),
        }),
      };

      console.log('Submitting data:', submitData);
      console.log('Uploaded files:', uploadedFiles);

      if (onSave) {
        await onSave(submitData, uploadedFiles);
        onClose();
      }
    } catch (err) {
      console.error('Error saving specialist:', err);
    }
  };

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
          <Input
            fullWidth
            placeholder="Enter service title"
            value={localFormData.title}
            onChange={(e) =>
              setLocalFormData({ ...localFormData, title: e.target.value })
            }
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
            value={localFormData.description}
            onChange={(e) =>
              setLocalFormData({
                ...localFormData,
                description: e.target.value,
              })
            }
            maxLength={500}
            className=""
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px 14px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
          <div className="text-xs text-gray-400 text-right">
            ({localFormData.description.length}/500)
          </div>
        </div>

        <div>
          <h3 className="text-base font-medium text-gray-900 mb-1">
            Estimated Completion Time (Days)
          </h3>
          <Input
            fullWidth
            placeholder="Enter number of days"
            value={localFormData.duration_days}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              setLocalFormData({ ...localFormData, duration_days: value });
            }}
            disableUnderline
            type="number"
            inputProps={{ min: 1 }}
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
        <div className="flex flex-col gap-2 max-w-sm max-h-12 mb-14">
          <label className="text-sm">Price</label>

          <div className="flex items-center">
            <div className="flex border-gray-300 border-l border-y h-12 items-center px-3 rounded-l bg-gray-100">
              <Image
                src={malaysianFlag}
                alt="Malaysia Flag"
                width={38}
                height={20}
                style={{
                  width: '60px',
                }}
              />
              <span className="ml-1">MYR</span>
            </div>
            <input
              className="h-12 w-full border-gray-300 border-y border-r rounded-r px-2"
              type="number"
              placeholder="0.00"
              value={localFormData.base_price}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setLocalFormData({ ...localFormData, base_price: value });
              }}
              min="0"
              step="0.01"
            />
          </div>
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
            value={selectedOfferingObjects}
            onChange={(event, newValue) => setSelectedOfferingObjects(newValue)}
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
            onClick={handleSave}
            disabled={isLoading}
            sx={{
              width: '8rem',
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
