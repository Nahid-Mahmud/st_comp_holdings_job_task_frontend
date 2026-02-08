/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import IACS_Certification from '@/assets/photos/iacs.svg';
import maicsa_Certification from '@/assets/photos/Maicsa.svg';
import photoUpload from '@/assets/photos/photo-scan 1.svg';
import profilePhotoForCreateCompanySpecialists from '@/assets/photos/Profile_Picture.svg';
import SMM_Certification from '@/assets/photos/SSM.svg';
import Button from '@/components/ui/Button';
import { useGetAllServiceOfferingMasterListsQuery } from '@/redux/features/serviceOfferingsMasterList/serviceOfferingsMasterList.api';
import {
  useGetSpecialistByIdQuery,
  useUpdateSpecialistMutation,
} from '@/redux/features/specialists/specialists.api';
import { CheckCircle } from '@mui/icons-material';
import { Avatar, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import UpdateServiceDrawer from './UpdateServiceDrawer';

export default function UpdateSpecialistForm() {
  const params = useParams();
  const specialistId = params?.id as string;

  const [sidePanel, setSidePanel] = useState(false);
  const { data: serviceOfferingsResponse } =
    useGetAllServiceOfferingMasterListsQuery(undefined);

  const { data: specialistData, isLoading: isLoadingSpecialist } =
    useGetSpecialistByIdQuery(specialistId, {
      skip: !specialistId,
    });

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    base_price: 0,
    duration_days: 0,
  });

  const [selectedOfferings, setSelectedOfferings] = useState<string[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);

  // Separate state for each image (order 0, 1, 2)
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  const [image3, setImage3] = useState<string | null>(null);

  const [serviceId, setServiceId] = useState<string>('');

  const [updateSpecialistFn, { isLoading: isPublishLoading }] =
    useUpdateSpecialistMutation();

  const router = useRouter();
  const isInitializedRef = useRef(false);

  // Populate form with existing specialist data
  useEffect(() => {
    if (specialistData?.data && !isInitializedRef.current) {
      const specialist = specialistData.data;
      isInitializedRef.current = true;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: specialist.title || '',
        description: specialist.description || '',
        base_price: Number(specialist.base_price) || 0,
        duration_days: specialist.duration_days || 0,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setServiceId(specialist.id);

      // Set selected offerings
      if (
        specialist.service_offerings &&
        specialist.service_offerings.length > 0
      ) {
        const offeringIds = specialist.service_offerings.map(
          (offering: any) => offering.service_offerings_master_list_id
        );
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedOfferings(offeringIds);
      }

      // Set existing photos from media array based on display_order
      if (specialist.media && specialist.media.length > 0) {
        const sortedMedia = [...specialist.media].sort(
          (a: any, b: any) => a.display_order - b.display_order
        );

        sortedMedia.forEach((mediaItem: any) => {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          if (mediaItem.display_order === 0) setImage1(mediaItem.file_name);
          // eslint-disable-next-line react-hooks/set-state-in-effect
          if (mediaItem.display_order === 1) setImage2(mediaItem.file_name);
          // eslint-disable-next-line react-hooks/set-state-in-effect
          if (mediaItem.display_order === 2) setImage3(mediaItem.file_name);
        });

        const photoUrls = sortedMedia.map((media: any) => media.file_name);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExistingPhotos(photoUrls);
      }
    }
  }, [specialistData]);

  // Create a map of offering IDs to titles for display
  const offeringsMap = useMemo(() => {
    if (!serviceOfferingsResponse?.data) return new Map();
    return new Map(
      serviceOfferingsResponse.data.map(
        (offering: { id: string; title: string }) => [
          offering.id,
          offering.title,
        ]
      )
    );
  }, [serviceOfferingsResponse.data]);

  const toggleSidePanel = () => {
    setSidePanel(!sidePanel);
  };

  // Handle updating specialist from drawer
  const handleUpdateSpecialist = async (data: {
    title: string;
    description: string;
    base_price: number;
    duration_days: number;
    service_offerings_master_list_ids?: string[];
  }) => {
    try {
      await updateSpecialistFn({
        id: specialistId,
        data,
      }).unwrap();

      toast.success('Specialist service updated successfully!');
    } catch (err) {
      console.error('Error updating specialist:', err);
      toast.error('Failed to update specialist. Please try again.');
      throw err;
    }
  };

  // Handle form submission
  const handlePublish = async () => {
    // Validate required fields
    try {
      await updateSpecialistFn({
        id: specialistId,
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

  if (isLoadingSpecialist) {
    return (
      <div className="px-6 pt-20 mx-auto min-h-screen flex items-center justify-center">
        <CircularProgress size={40} />
      </div>
    );
  }

  if (!specialistData?.data) {
    return (
      <div className="px-6 pt-20 mx-auto min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Specialist not found</p>
      </div>
    );
  }

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
          {/* Left image - Display Order 0 */}
          <div className="grid items-stretch">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-white overflow-hidden">
              {image1 ? (
                <img
                  src={image1}
                  alt="Service image 1"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-12">
                  <Image
                    src={photoUpload}
                    alt="No image"
                    className="w-16 h-16 text-gray-400 mb-4"
                  />
                  <p className="text-gray-500 text-center text-sm">
                    No image available
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Right column with two images */}
          <div className="flex justify-around flex-col gap-4">
            {/* Right top image - Display Order 1 */}
            <div className="items-stretch">
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-white overflow-hidden">
                {image2 ? (
                  <img
                    src={image2}
                    alt="Service image 2"
                    className="w-full h-full object-cover rounded-lg max-h-52"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12">
                    <Image
                      src={photoUpload}
                      alt="No image"
                      className="w-16 h-16 text-gray-400 mb-4"
                    />
                    <p className="text-gray-500 text-center text-sm">
                      No image available
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Right bottom image - Display Order 2 */}
            <div className="items-stretch">
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-white overflow-hidden">
                {image3 ? (
                  <img
                    src={image3}
                    alt="Service image 3"
                    className="w-full h-full object-cover rounded-lg max-h-52"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12">
                    <Image
                      src={photoUpload}
                      alt="No image"
                      className="w-16 h-16 text-gray-400 mb-4"
                    />
                    <p className="text-gray-500 text-center text-sm">
                      No image available
                    </p>
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

      {/* Description Section */}
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Description
        </h2>
        {formData.description ? (
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            {formData.description}
          </p>
        ) : (
          <p className="text-gray-500 text-sm mb-4">
            Describe your service here
          </p>
        )}
        <div className="border-b border-gray-200"></div>
      </div>

      {/* Additional Offerings Section */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Additional Offerings
        </h2>
        {selectedOfferings.length > 0 ? (
          <div className="space-y-2 mb-4">
            {selectedOfferings.map((offeringId, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle sx={{ width: 20, height: 20, color: '#10b981' }} />
                <span className="text-gray-700 text-base">
                  {offeringsMap.get(offeringId) || offeringId}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm mb-4">
            Enhance your service by adding additional offerings
          </p>
        )}
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
                  entrepreneurship, Aida treats every client&apos;s business as
                  if it were her own — attentive to detail, committed to
                  deadlines, and focused on growth. Step into a partnership
                  built on trust, transparency, and professional excellence.
                  Whether you&apos;re just starting out or managing a growing
                  company, Aida is here to make your corporate governance
                  smooth, secure, and stress-free. Your company&apos;s peace of
                  mind starts here
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
      <UpdateServiceDrawer
        open={sidePanel}
        onClose={toggleSidePanel}
        formData={formData}
        onFormDataChange={setFormData}
        selectedOfferings={selectedOfferings}
        onOfferingsChange={setSelectedOfferings}
        onSave={handleUpdateSpecialist}
        isLoading={isPublishLoading}
      />
    </div>
  );
}
