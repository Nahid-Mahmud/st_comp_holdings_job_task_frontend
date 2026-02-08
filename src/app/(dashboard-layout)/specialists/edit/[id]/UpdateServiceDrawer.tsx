'use client';

import { CustomAutocomplete } from '@/components/inputs/Autocomplete';
import Button from '@/components/ui/Button';
import { Close, Person } from '@mui/icons-material';
import {
  CircularProgress,
  Drawer,
  IconButton,
  Input,
  TextareaAutosize,
} from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';

import malaysianFlag from '@/assets/photos/flag-for-flag-malaysia-svgrepo-com 3.svg';
import { useGetAllServiceOfferingMasterListsQuery } from '@/redux/features/serviceOfferingsMasterList/serviceOfferingsMasterList.api';
import Image from 'next/image';

// Zod validation schema
const serviceSchema = z.object({
  title: z.string().min(1, 'Service title is required').trim(),
  description: z.string().min(1, 'Service description is required').trim(),
  base_price: z.number().positive('Price must be greater than 0'),
  duration_days: z.number().int().positive('Duration must be at least 1 day'),
});

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
  onSave?: (data: {
    title: string;
    description: string;
    base_price: number;
    duration_days: number;
    service_offerings_master_list_ids?: string[];
  }) => Promise<void>;
  isLoading?: boolean;
}

export default function UpdateServiceDrawer({
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
  onSave,
  isLoading = false,
}: EditServiceDrawerProps) {
  const [localFormData, setLocalFormData] = useState(formData);
  const [selectedOfferingObjects, setSelectedOfferingObjects] = useState<
    { id: string; label: string; icon: React.ReactNode; description: string }[]
  >([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
      setErrors({}); // Clear errors when drawer opens
    }
    prevOpenRef.current = open;
  }, [open, additionalOfferingOptions, formData, selectedOfferings]);

  const handleSave = async () => {
    // Clear previous errors
    setErrors({});

    // Collect all validation errors
    const fieldErrors: Record<string, string> = {};

    // Validate form data with Zod
    const validationResult = serviceSchema.safeParse({
      title: localFormData.title,
      description: localFormData.description,
      base_price: Number(localFormData.base_price),
      duration_days: Number(localFormData.duration_days),
    });

    if (!validationResult.success) {
      // Map Zod errors to our error state
      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
    }

    // Check for service offerings
    if (selectedOfferingObjects.length === 0) {
      fieldErrors.offerings = 'Please select at least one service offering';
    }

    // If there are any errors, set them and return
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    // TypeScript guard - validationResult must be successful at this point
    if (!validationResult.success) {
      return;
    }

    try {
      const submitData = {
        title: validationResult.data.title,
        description: validationResult.data.description,
        base_price: validationResult.data.base_price,
        duration_days: validationResult.data.duration_days,
        ...(selectedOfferingObjects.length > 0 && {
          service_offerings_master_list_ids: selectedOfferingObjects.map(
            (o) => o.id
          ),
        }),
      };

      console.log('Submitting data:', submitData);

      if (onSave) {
        await onSave(submitData);
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
            onChange={(e) => {
              const newData = { ...localFormData, title: e.target.value };
              setLocalFormData(newData);
              onFormDataChange?.(newData);
              if (errors.title) {
                setErrors({ ...errors, title: '' });
              }
            }}
            disableUnderline
            error={!!errors.title}
            sx={{
              '& .MuiInputBase-input': {
                padding: '12px 14px',
                border: `1px solid ${errors.title ? '#EF4444' : '#D1D5DB'}`,
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
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description Section */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-1">
            Description
          </h3>
          <TextareaAutosize
            placeholder="Describe your service here"
            value={localFormData.description}
            onChange={(e) => {
              const newData = {
                ...localFormData,
                description: e.target.value,
              };
              setLocalFormData(newData);
              onFormDataChange?.(newData);
              if (errors.description) {
                setErrors({ ...errors, description: '' });
              }
            }}
            maxLength={500}
            className=""
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px 14px',
              border: `1px solid ${errors.description ? '#EF4444' : '#D1D5DB'}`,
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
          <div className="flex justify-between items-center">
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
            <div className="text-xs text-gray-400 text-right ml-auto">
              ({localFormData.description.length}/500)
            </div>
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
              const newData = { ...localFormData, duration_days: value };
              setLocalFormData(newData);
              onFormDataChange?.(newData);
              if (errors.duration_days) {
                setErrors({ ...errors, duration_days: '' });
              }
            }}
            disableUnderline
            type="number"
            inputProps={{ min: 1 }}
            error={!!errors.duration_days}
            sx={{
              '& .MuiInputBase-input': {
                padding: '12px 14px',
                border: `1px solid ${errors.duration_days ? '#EF4444' : '#D1D5DB'}`,
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
          {errors.duration_days && (
            <p className="text-red-500 text-xs mt-1">{errors.duration_days}</p>
          )}
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
              className={`h-12 w-full border-y border-r rounded-r px-2 ${
                errors.base_price ? 'border-red-500' : 'border-gray-300'
              }`}
              type="number"
              placeholder="0.00"
              value={localFormData.base_price}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                const newData = { ...localFormData, base_price: value };
                setLocalFormData(newData);
                onFormDataChange?.(newData);
                if (errors.base_price) {
                  setErrors({ ...errors, base_price: '' });
                }
              }}
              min="0"
              step="0.01"
            />
          </div>
          {errors.base_price && (
            <p className="text-red-500 text-xs mt-1">{errors.base_price}</p>
          )}
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
            onChange={(event, newValue) => {
              setSelectedOfferingObjects(newValue);
              onOfferingsChange?.(newValue.map((o) => o.id));
              if (errors.offerings) {
                setErrors({ ...errors, offerings: '' });
              }
            }}
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
          {errors.offerings && (
            <p className="text-red-500 text-xs mt-2">{errors.offerings}</p>
          )}
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
