'use client';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { HomeRounded } from '@mui/icons-material';
import ServiceCardItem from '@/components/all-services/ServiceCardItem';
import { useGetAllSpecialistsQuery } from '@/redux/features/specialists/specialists.api';
import { useMemo, useState } from 'react';
import { Specialist } from '@/types/service';
import CircularProgress from '@mui/material/CircularProgress';

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
};

export default function AllServicesPage() {
  const [priceFilter, setPriceFilter] = useState('price');
  const [sortFilter, setSortFilter] = useState('sort');

  // Fetch all specialists
  const { data, isLoading, isError } = useGetAllSpecialistsQuery({
    is_draft: false,
    limit: 100,
  });

  const handlePriceFilterChange = (event: SelectChangeEvent) => {
    setPriceFilter(event.target.value);
  };

  const handleSortFilterChange = (event: SelectChangeEvent) => {
    setSortFilter(event.target.value);
  };

  // Transform specialists data to match ServiceCard format
  const services: ServiceCard[] = useMemo(() => {
    if (!data?.data) return [];

    let specialists = Array.isArray(data.data)
      ? [...data.data]
      : [...(data.data.data || [])];

    // Apply sorting
    if (sortFilter === 'popular') {
      specialists = specialists.sort(
        (a, b) => Number(b.average_rating) - Number(a.average_rating)
      );
    } else if (sortFilter === 'new') {
      specialists = specialists.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    // Apply price filtering
    if (priceFilter === 'low') {
      specialists = specialists.sort(
        (a, b) => Number(a.final_price) - Number(b.final_price)
      );
    } else if (priceFilter === 'high') {
      specialists = specialists.sort(
        (a, b) => Number(b.final_price) - Number(a.final_price)
      );
    }

    return specialists.map((specialist: Specialist) => ({
      id: specialist.id,
      title: specialist.title,
      description: specialist.description,
      price: `RM ${Number(specialist.final_price).toFixed(2)}`,
      image:
        specialist.media && specialist.media.length > 0
          ? specialist.media[0].file_name
          : 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop',
      author: {
        name: 'Specialist',
        role: 'Service Provider',
        avatar: 'https://i.pravatar.cc/60?img=11',
      },
    }));
  }, [data, priceFilter, sortFilter]);

  return (
    <main className="mx-auto w-full container px-4 pb-16 pt-10">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#454545]">
        <HomeRounded fontSize="inherit" />
        <span>/</span>
        <span>Specialists</span>
        <span>/</span>
        <span className="">All Services</span>
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-semibold text-gray-900 font-red-hat-display">
          All Services
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse all available services from trusted specialists
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Select
          size="small"
          value={priceFilter}
          onChange={handlePriceFilterChange}
          className="h-9 bg-white text-sm"
        >
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="low">Low to High</MenuItem>
          <MenuItem value="high">High to Low</MenuItem>
        </Select>
        <Select
          size="small"
          value={sortFilter}
          onChange={handleSortFilterChange}
          className="h-9 bg-white text-sm"
        >
          <MenuItem value="sort">Sort by</MenuItem>
          <MenuItem value="popular">Most Popular</MenuItem>
          <MenuItem value="new">Newest</MenuItem>
        </Select>
      </div>

      {isLoading && (
        <div className="mt-12 flex justify-center">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="mt-12 text-center text-red-500">
          Failed to load services. Please try again later.
        </div>
      )}

      {!isLoading && !isError && services.length === 0 && (
        <div className="mt-12 text-center text-gray-500">
          No services available at the moment.
        </div>
      )}

      {!isLoading && !isError && services.length > 0 && (
        <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCardItem key={service.id} service={service} />
          ))}
        </section>
      )}
    </main>
  );
}
