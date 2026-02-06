'use client';

import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import { AttachFile, Close, Person } from '@mui/icons-material';
import { Divider, Drawer, IconButton } from '@mui/material';

interface EditServiceDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function EditServiceDrawer({
  open,
  onClose,
}: EditServiceDrawerProps) {
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
        <h2 className="text-xl font-semibold text-gray-900">Edit Service</h2>
        <IconButton onClick={onClose} className="text-gray-400">
          <Close />
        </IconButton>
      </div>

      <div className="space-y-6">
        {/* Title Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">TITLE</h3>
          <TextField
            fullWidth
            placeholder="Enter service title"
            defaultValue="Register a new company | Private Limited - Sdn Bhd"
          />
        </div>

        {/* Description Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            DESCRIPTION
          </h3>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Describe your service here"
            className="mb-4"
          />
          <div className="text-xs text-gray-400 text-right">200 max</div>
        </div>

        {/* Price Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Price</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">💰 MYR</span>
            <TextField defaultValue="1,800" className="flex-1" />
          </div>
        </div>

        {/* Estimated Completion Time */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Estimated Completion Time (14 Total Days)
          </h3>
          <TextField fullWidth placeholder="1 day" defaultValue="1 day" />
        </div>

        <Divider />

        {/* Additional Offerings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Additional Offerings
          </h3>
          <TextField
            fullWidth
            placeholder="Company Secretary Subscription"
            className="mb-4"
          />

          <div className="space-y-3">
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <Person className="text-gray-400" />
              <div className="flex-1">
                <div className="font-medium text-sm">
                  Company Secretary Subscription
                </div>
                <div className="text-xs text-gray-500">
                  Enjoy 1 month Free Company Secretary Subscription
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <AttachFile className="text-gray-400" />
              <div className="flex-1">
                <div className="font-medium text-sm">
                  Opening of Bank Account
                </div>
                <div className="text-xs text-gray-500">
                  Consultation Support Bank Account Opening
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* File Upload */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Logo as part of a few
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <AttachFile className="mx-auto text-gray-400 mb-2" />
            <div className="text-sm text-gray-600">File</div>
            <div className="text-xs text-gray-400 mt-1">
              Choose Service Set first
              <br />
              Max file size: 1MB
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            variant="outlined"
            fullWidth
            onClick={onClose}
            className="text-gray-600 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            fullWidth
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
