'use client';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { HomeRounded } from '@mui/icons-material';
import ServiceCardItem from '@/components/all-services/ServiceCardItem';

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

const SERVICES: ServiceCard[] = [
  {
    id: 'service-1',
    title: 'Register a New Company',
    description: 'Register your company with the best Company Secretary in KL',
    price: 'RM 1,600',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop',
    author: {
      name: 'Adam Low',
      role: 'Company Secretary',
      avatar: 'https://i.pravatar.cc/60?img=11',
    },
  },
  {
    id: 'service-2',
    title: 'Brand Strategy Development',
    description: 'Register your company with the best Company Secretary in KL',
    price: 'RM 1,600',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop',
    author: {
      name: 'Jessica Law',
      role: 'Company Secretary',
      avatar: 'https://i.pravatar.cc/60?img=32',
    },
  },
  {
    id: 'service-3',
    title: 'Strategic Digital Consulting',
    description: 'Register your company with the best Company Secretary in KL',
    price: 'RM 1,600',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1400&auto=format&fit=crop',
    author: {
      name: 'Stacey Lim',
      role: 'Company Secretary',
      avatar: 'https://i.pravatar.cc/60?img=47',
    },
  },
  {
    id: 'service-4',
    title: 'LinkedIn Posts',
    description: 'Register your company with the best Company Secretary in KL',
    price: 'RM 1,600',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop',
    author: {
      name: 'Stacey Lim',
      role: 'Company Secretary',
      avatar: 'https://i.pravatar.cc/60?img=20',
    },
  },
];

export default function AllServicesPage() {
  const handleFilterChange = (_event: SelectChangeEvent) => {};

  return (
    <main className="mx-auto w-full container px-4 pb-16 pt-10">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#454545]">
        <HomeRounded fontSize="inherit" />
        <span>/</span>
        <span>Specialists</span>
        <span>/</span>
        <span className="">Register a New Company</span>
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-semibold text-gray-900 font-red-hat-display">
          Register a New Company
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Get Your Company Registered with a Trusted Specialists
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Select
          size="small"
          value="price"
          onChange={handleFilterChange}
          className="h-9 bg-white text-sm"
        >
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="low">Low to High</MenuItem>
          <MenuItem value="high">High to Low</MenuItem>
        </Select>
        <Select
          size="small"
          value="sort"
          onChange={handleFilterChange}
          className="h-9 bg-white text-sm"
        >
          <MenuItem value="sort">Sort by</MenuItem>
          <MenuItem value="popular">Most Popular</MenuItem>
          <MenuItem value="new">Newest</MenuItem>
        </Select>
      </div>

      <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <ServiceCardItem key={service.id} service={service} />
        ))}
      </section>
    </main>
  );
}
