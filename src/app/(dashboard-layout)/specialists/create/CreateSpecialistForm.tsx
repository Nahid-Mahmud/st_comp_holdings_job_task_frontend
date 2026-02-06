'use client';

import EditServiceDrawer from '@/components/EditServiceDrawer';
import Button from '@/components/ui/Button';
import { CheckCircle, Close, CloudUpload } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useRef, useState } from 'react';
import profilePhotoForCreateCompanySpecialists from '@/assets/photos/Profile_Picture.svg';
import IACS_Certification from '@/assets/photos/iacs.svg';
import maicsa_Certification from '@/assets/photos/Maicsa.svg';
import SMM_Certification from '@/assets/photos/SSM.svg';
import Image from 'next/image';

export default function CreateSpecialistForm() {
  const [sidePanel, setSidePanel] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSidePanel = () => {
    setSidePanel(!sidePanel);
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  // Handle click event
  const handleClick = () => {
    inputRef.current?.click();
  };

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  // Process the selected file
  const handleFiles = (file: File) => {
    // Check file type
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      alert('Please upload a PNG, JPG, or JPEG file.');
      return;
    }

    // Check file size (4MB limit)
    if (file.size > 4 * 1024 * 1024) {
      alert('File size must be under 4MB.');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  // Handle remove uploaded image
  const handleRemove = () => {
    setUploadedImage(null);
    setFileName('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="px-6 pt-20  mx-auto min-h-screen">
      {/* Main Content */}
      <div className="rounded-lg  grid grid-cols-3 gap-6">
        {/* Service Images */}
        <div className="col-span-2 font-red-hat-display text-2xl font-semibold text-gray-900 mb-4">
          Register a new company | Private Limited - Sdn Bhd
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 col-span-2 ">
          <div className="grid   items-stretch">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleClick}
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 p-12 ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                onChange={handleChange}
                accept=".png,.jpg,.jpeg"
                className="hidden"
              />

              {!uploadedImage ? (
                <>
                  <CloudUpload className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Upload an image for your service listing in PNG, JPG or JPEG
                    <br />
                    up to 4MB
                  </p>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="relative w-40 h-40 mb-4">
                    <img
                      src={uploadedImage || '/placeholder.svg'}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-gray-700 font-medium text-sm text-center break-all max-w-xs">
                    {fileName}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                    className="mt-4 flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Close className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-around flex-col gap-4">
            <div className="   items-stretch">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleClick}
                className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 p-12 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  onChange={handleChange}
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                />

                {!uploadedImage ? (
                  <>
                    <CloudUpload className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      Upload an image for your service listing in PNG, JPG or
                      JPEG
                      <br />
                      up to 4MB
                    </p>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="relative w-40 h-40 mb-4">
                      <img
                        src={uploadedImage || '/placeholder.svg'}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-gray-700 font-medium text-sm text-center break-all max-w-xs">
                      {fileName}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove();
                      }}
                      className="mt-4 flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Close className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>{' '}
            <div className="   items-stretch">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleClick}
                className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 p-12 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  onChange={handleChange}
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                />

                {!uploadedImage ? (
                  <>
                    <CloudUpload className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      Upload an image for your service listing in PNG, JPG or
                      JPEG
                      <br />
                      up to 4MB
                    </p>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="relative w-40 h-40 mb-4">
                      <img
                        src={uploadedImage || '/placeholder.svg'}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-gray-700 font-medium text-sm text-center break-all max-w-xs">
                      {fileName}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove();
                      }}
                      className="mt-4 flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Close className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* buttons */}
          <div className="flex gap-2">
            <Button
              variant="contained"
              className=" text-white hover:bg-blue-700"
              sx={{
                backgroundColor: 'black',
                width: 'fit-content',
                minWidth: '100px',
              }}
              onClick={toggleSidePanel}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              className="bg-primary text-white hover:bg-blue-700"
              sx={{
                width: 'fit-content',
                minWidth: '100px',
              }}
            >
              Publish
            </Button>
          </div>
          {/* card */}
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Professional Fee
              </h3>
              <p className="text-sm text-gray-500">
                Set a rate for your service
              </p>
            </div>

            {/* Editable Price */}
            <div className="mb-6 text-center">
              <div className="inline-block border-b-2 border-gray-900 pb-2">
                <span className="text-4xl font-semibold font-red-hat-display text-gray-900">
                  RM 1,800
                </span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Base price</span>
                <span className="text-gray-900 font-medium">RM 1,800</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-3">
                <span className="text-gray-600">Service processing fee</span>
                <span className="text-gray-900 font-medium">RM 540</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-3">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="text-gray-900 font-medium">RM 2340</span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-gray-900 font-semibold">
                  Your returns
                </span>
                <span className="text-gray-900 font-semibold">RM 1,800</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Description
        </h2>
        <p className="text-gray-500 text-sm mb-4">Describe your service here</p>
        <div className="border-b border-gray-200"></div>
      </div>

      {/* Additional Offerings Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Additional Offerings
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Enhance your service by adding additional offerings
        </p>
        <div className="border-b border-gray-200"></div>
      </div>

      {/* Company Secretary Section */}
      <div className="mt-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Company Secretary
        </h2>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start justify-between gap-6">
            {/* Left Side - Profile Info */}
            <div className="flex gap-4 flex-1 flex-col">
              <div className="flex flex-1 gap-4">
                <div className="relative w-20 h-20 shrink-0">
                  <Avatar
                    alt="Grace Lam"
                    src={profilePhotoForCreateCompanySpecialists.src}
                    sx={{ width: 80, height: 80 }}
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Grace Lam
                    </h3>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full  text-xs font-medium">
                      <CheckCircle
                        sx={{
                          height: '20px',
                          width: '20px',
                        }}
                      />{' '}
                      <p>Verified</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Corpsec Services Sdn Bhd
                  </p>
                  <button className="inline-block px-4 py-2 bg-[#071331] text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
              {/* Description Text */}
              <div className="rounded-lg ">
                <p className="text-gray-700 text-sm leading-relaxed">
                  A company secretarial service founded by Grace, who believes
                  that every company deserves clarity, confidence, and care in
                  their compliance journey. Inspired by the spirit of
                  entrepreneurship, Aida treats every client's business as if it
                  were her own — attentive to detail, committed to deadlines,
                  and focused on growth. Step into a partnership built on trust,
                  transparency, and professional excellence. Whether you're just
                  starting out or managing a growing company, Aida is here to
                  make your corporate governance smooth, secure, and
                  stress-free. Your company's peace of mind starts here
                </p>
              </div>
            </div>

            {/* Right Side - Certification */}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Certified Company Secretary
              </h4>
              <div className="flex items-center gap-4">
                <Image
                  src={IACS_Certification.src}
                  alt="IACS Certification"
                  height={300}
                  width={300}
                  className="h-20  w-fit"
                />
                <Image
                  src={maicsa_Certification.src}
                  alt="MAICSA Certification"
                  height={300}
                  width={300}
                  className="h-20 w-fit"
                />
                <Image
                  src={SMM_Certification.src}
                  alt="Certification 1"
                  height={300}
                  width={300}
                  className="h-20 w-fit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <EditServiceDrawer open={sidePanel} onClose={toggleSidePanel} />
    </div>
  );
}
