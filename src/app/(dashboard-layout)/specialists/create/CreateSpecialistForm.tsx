'use client';

import IACS_Certification from '@/assets/photos/iacs.svg';
import maicsa_Certification from '@/assets/photos/Maicsa.svg';
import photoUpload from '@/assets/photos/photo-scan 1.svg';
import profilePhotoForCreateCompanySpecialists from '@/assets/photos/Profile_Picture.svg';
import SMM_Certification from '@/assets/photos/SSM.svg';
import EditServiceDrawer from '@/components/EditServiceDrawer';
import Button from '@/components/ui/Button';
import {
  useCreateSpecialistMutation,
  useUpdateSpecialistMutation,
} from '@/redux/features/specialists/specialists.api';
import { CheckCircle } from '@mui/icons-material';
import { Avatar, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function CreateSpecialistForm() {
  const [sidePanel, setSidePanel] = useState(false);
  const [createSpecialist, { isLoading, error }] =
    useCreateSpecialistMutation();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    base_price: 0,
    duration_days: 0,
  });

  const [selectedOfferings, setSelectedOfferings] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  // Separate state for each image (order 1, 2, 3)
  const [dragActive1, setDragActive1] = useState(false);
  const [uploadedImage1, setUploadedImage1] = useState<string | null>(null);
  const [fileName1, setFileName1] = useState<string>('');
  const [fileObj1, setFileObj1] = useState<File | null>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);

  const [dragActive2, setDragActive2] = useState(false);
  const [uploadedImage2, setUploadedImage2] = useState<string | null>(null);
  const [fileName2, setFileName2] = useState<string>('');
  const [fileObj2, setFileObj2] = useState<File | null>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const [dragActive3, setDragActive3] = useState(false);
  const [uploadedImage3, setUploadedImage3] = useState<string | null>(null);
  const [fileName3, setFileName3] = useState<string>('');
  const [fileObj3, setFileObj3] = useState<File | null>(null);
  const [fileSize1, setFileSize1] = useState<number>(0);
  const [fileSize2, setFileSize2] = useState<number>(0);
  const [fileSize3, setFileSize3] = useState<number>(0);
  const inputRef3 = useRef<HTMLInputElement>(null);

  const [serviceId, setServiceId] = useState<string>('');

  const [updateSpecialistFn, { isLoading: isPublishLoading }] =
    useUpdateSpecialistMutation();

  const router = useRouter();

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const toggleSidePanel = () => {
    setSidePanel(!sidePanel);
  };

  // Handle drag events for each upload area
  const handleDrag = (e: React.DragEvent, order: number) => {
    e.preventDefault();
    e.stopPropagation();
    const isActive = e.type === 'dragenter' || e.type === 'dragover';

    if (order === 1) setDragActive1(isActive);
    else if (order === 2) setDragActive2(isActive);
    else if (order === 3) setDragActive3(isActive);
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent, order: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (order === 1) setDragActive1(false);
    else if (order === 2) setDragActive2(false);
    else if (order === 3) setDragActive3(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0], order);
    }
  };

  // Handle click event
  const handleClick = (order: number) => {
    if (order === 1) inputRef1.current?.click();
    else if (order === 2) inputRef2.current?.click();
    else if (order === 3) inputRef3.current?.click();
  };

  // Handle file input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    order: number
  ) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0], order);
    }
  };

  // Process the selected file
  const handleFiles = (file: File, order: number) => {
    // Check file type
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      toast.error('Please upload a PNG, JPG, or JPEG file.');
      return;
    }

    // Check file size (4MB limit)
    if (file.size > 4 * 1024 * 1024) {
      toast.error('File size must be under 4MB.');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (order === 1) {
        setUploadedImage1(result);
        setFileName1(file.name);
        setFileSize1(file.size);
        setFileObj1(file);
      } else if (order === 2) {
        setUploadedImage2(result);
        setFileName2(file.name);
        setFileSize2(file.size);
        setFileObj2(file);
      } else if (order === 3) {
        setUploadedImage3(result);
        setFileName3(file.name);
        setFileSize3(file.size);
        setFileObj3(file);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle remove uploaded image
  const handleRemove = (order: number) => {
    if (order === 1) {
      setUploadedImage1(null);
      setFileName1('');
      setFileSize1(0);
      setFileObj1(null);
      if (inputRef1.current) inputRef1.current.value = '';
    } else if (order === 2) {
      setUploadedImage2(null);
      setFileName2('');
      setFileSize2(0);
      setFileObj2(null);
      if (inputRef2.current) inputRef2.current.value = '';
    } else if (order === 3) {
      setUploadedImage3(null);
      setFileName3('');
      setFileSize3(0);
      setFileObj3(null);
      if (inputRef3.current) inputRef3.current.value = '';
    }
  };

  // Handle adding specialist from drawer
  const handleAddSpecialist = async (
    data: {
      title: string;
      description: string;
      base_price: number;
      duration_days: number;
      service_offerings_master_list_ids?: string[];
    },
    photos: File[]
  ) => {
    try {
      const res = await createSpecialist({
        data,
        photos,
      }).unwrap();

      setServiceId(res.data.id);
      toast.success('Specialist service created successfully!');
      console.log(res.data.id);
    } catch (err) {
      console.error('Error creating specialist:', err);
      toast.error('Failed to create specialist. Please try again.');
      throw err;
    }
  };

  // Handle form submission
  const handlePublish = async () => {
    // Validate required fields
    try {
      if (!serviceId) {
        toast.error('Please create a specialist service first.');
        return;
      }
      const res = await updateSpecialistFn({
        id: serviceId,
        data: {
          is_draft: false,
        },
      }).unwrap();
      toast.success('Specialist service published successfully!');
      router.push('/all-services');
    } catch (err) {
      console.error('Error publishing specialist:', err);
      toast.error('Failed to publish specialist. Please try again.');
    }
  };

  return (
    <div className="px-6 pt-20  mx-auto min-h-screen">
      {/* Main Content */}
      <div className="rounded-lg  grid grid-cols-3 gap-6">
        {/* Service Images */}
        <div className="col-span-2 font-red-hat-display text-2xl font-semibold text-gray-900 mb-4">
          {formData.title ||
            'Register a new company | Private Limited - Sdn Bhd'}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 col-span-2 ">
          {/* Left upload area - Order 1 */}
          <div className="grid   items-stretch">
            <div
              onDragEnter={(e) => handleDrag(e, 1)}
              onDragLeave={(e) => handleDrag(e, 1)}
              onDragOver={(e) => handleDrag(e, 1)}
              onDrop={(e) => handleDrop(e, 1)}
              onClick={() => handleClick(1)}
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 p-12 ${
                dragActive1
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <input
                ref={inputRef1}
                type="file"
                onChange={(e) => handleChange(e, 1)}
                accept=".png,.jpg,.jpeg"
                className="hidden"
              />

              {!uploadedImage1 ? (
                <>
                  <Image
                    src={photoUpload}
                    alt="Upload"
                    className="w-16 h-16 text-gray-400 mb-4"
                  />
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Upload an image for your service listing in PNG, JPG or JPEG
                    <br />
                    up to 4MB
                  </p>
                </>
              ) : (
                <div className="w-full h-full max-h-96 flex flex-col items-center justify-center">
                  <img
                    src={uploadedImage1 || '/placeholder.svg'}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
          {/* Right column with two upload areas */}
          <div className="flex justify-around flex-col gap-4">
            {/* Right top upload area - Order 2 */}
            <div className="   items-stretch">
              <div
                onDragEnter={(e) => handleDrag(e, 2)}
                onDragLeave={(e) => handleDrag(e, 2)}
                onDragOver={(e) => handleDrag(e, 2)}
                onDrop={(e) => handleDrop(e, 2)}
                onClick={() => handleClick(2)}
                className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 p-12 ${
                  dragActive2
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <input
                  ref={inputRef2}
                  type="file"
                  onChange={(e) => handleChange(e, 2)}
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                />

                {!uploadedImage2 ? (
                  <>
                    <Image
                      src={photoUpload}
                      alt="Upload"
                      className="w-16 h-16 text-gray-400 mb-4"
                    />
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      Upload an image for your service listing in PNG, JPG or
                      JPEG
                      <br />
                      up to 4MB
                    </p>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={uploadedImage2 || '/placeholder.svg'}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover rounded-lg max-h-52"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Right bottom upload area - Order 3 */}
            <div className="   items-stretch">
              <div
                onDragEnter={(e) => handleDrag(e, 3)}
                onDragLeave={(e) => handleDrag(e, 3)}
                onDragOver={(e) => handleDrag(e, 3)}
                onDrop={(e) => handleDrop(e, 3)}
                onClick={() => handleClick(3)}
                className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 p-12 ${
                  dragActive3
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <input
                  ref={inputRef3}
                  type="file"
                  onChange={(e) => handleChange(e, 3)}
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                />

                {!uploadedImage3 ? (
                  <>
                    <Image
                      src={photoUpload}
                      alt="Upload"
                      className="w-16 h-16 text-gray-400 mb-4"
                    />
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      Upload an image for your service listing in PNG, JPG or
                      JPEG
                      <br />
                      up to 4MB
                    </p>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={uploadedImage3 || '/placeholder.svg'}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover rounded-lg max-h-52"
                    />
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
              onClick={handlePublish}
              disabled={isPublishLoading}
            >
              {isPublishLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Publish'
              )}
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
                  RM{' '}
                  {formData.base_price.toLocaleString('en-MY', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Base price</span>
                <span className="text-gray-900 font-medium">
                  RM{' '}
                  {formData.base_price.toLocaleString('en-MY', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm border-b pb-3">
                <span className="text-gray-600">Service processing fee</span>
                <span className="text-gray-900 font-medium">
                  RM{' '}
                  {(formData.base_price * 0.3).toLocaleString('en-MY', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm border-b pb-3">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="text-gray-900 font-medium">
                  RM{' '}
                  {(formData.base_price * 1.3).toLocaleString('en-MY', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-gray-900 font-semibold">
                  Your returns
                </span>
                <span className="text-gray-900 font-semibold">
                  RM{' '}
                  {formData.base_price.toLocaleString('en-MY', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List of images to remove */}
      {(uploadedImage1 || uploadedImage2 || uploadedImage3) && (
        <div className="mt-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Uploaded Images
          </h2>
          <div className="space-y-4">
            {uploadedImage1 && (
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex items-center gap-4">
                <img
                  src={uploadedImage1}
                  alt="Upload 1"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-gray-900 font-medium text-base mb-1">
                    {fileName1}
                  </h3>
                  <div className=" gap-4 text-sm text-gray-600">
                    <p>Size: {formatFileSize(fileSize1)}</p>
                    <p>
                      File type: {fileName1.split('.').pop()?.toUpperCase()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Remove image"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}
            {uploadedImage2 && (
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex items-center gap-4">
                <img
                  src={uploadedImage2}
                  alt="Upload 2"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-gray-900 font-medium text-base mb-1">
                    {fileName2}
                  </h3>
                  <div className=" gap-4 text-sm text-gray-600">
                    <p>Size: {formatFileSize(fileSize2)}</p>
                    <p>
                      File type: {fileName2.split('.').pop()?.toUpperCase()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(2)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Remove image"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}
            {uploadedImage3 && (
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex items-center gap-4">
                <img
                  src={uploadedImage3}
                  alt="Upload 3"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-gray-900 font-medium text-base mb-1">
                    {fileName3}
                  </h3>
                  <div className=" gap-4 text-sm text-gray-600">
                    <p>Size: {formatFileSize(fileSize3)}</p>
                    <p>
                      File type: {fileName3.split('.').pop()?.toUpperCase()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(3)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Remove image"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
                <p className="text-gray-700 text-sm font-semibold leading-relaxed">
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
              <h4 className="text-3xl font-semibold text-gray-900 mb-4">
                Certified Company Secretary
              </h4>
              <div className="flex items-center gap-4">
                <Image
                  src={IACS_Certification.src}
                  alt="IACS Certification"
                  height={300}
                  width={300}
                  className="h-16  w-fit"
                />
                <Image
                  src={maicsa_Certification.src}
                  alt="MAICSA Certification"
                  height={300}
                  width={300}
                  className="h-16 w-fit"
                />
                <Image
                  src={SMM_Certification.src}
                  alt="Certification 1"
                  height={300}
                  width={300}
                  className="h-16 w-fit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <EditServiceDrawer
        open={sidePanel}
        onClose={toggleSidePanel}
        formData={formData}
        onFormDataChange={setFormData}
        selectedOfferings={selectedOfferings}
        onOfferingsChange={setSelectedOfferings}
        uploadedFiles={[
          ...(fileObj1 ? [fileObj1] : []),
          ...(fileObj2 ? [fileObj2] : []),
          ...(fileObj3 ? [fileObj3] : []),
        ]}
        onSave={handleAddSpecialist}
        isLoading={isLoading}
      />
    </div>
  );
}
