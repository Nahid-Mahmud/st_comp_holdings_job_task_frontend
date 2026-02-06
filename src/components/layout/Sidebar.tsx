'use client';

import {
  AssignmentOutlined,
  EmailOutlined,
  HelpOutline,
  LocalOfferOutlined,
  PeopleAlt,
  SettingsOutlined,
} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import esignatureIcon from '../../assets/icons/esignature.svg';
import invoiceIcon from '../../assets/icons/invoice-svgrepo-com 1.svg';

import profilePhotoForCreateCompanySpecialists from '@/assets/photos/Profile_Picture.svg';

interface NavItem {
  name: string;
  href: string;
  icon: (isActive: boolean) => React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: 'Specialists',
    href: '/specialists',
    icon: () => <LocalOfferOutlined />,
  },
  { name: 'Clients', href: '/clients', icon: () => <PeopleAlt /> },
  {
    name: 'Service Orders',
    href: '/service-orders',
    icon: () => <AssignmentOutlined />,
  },
  {
    name: 'eSignature',
    href: '/esignature',
    icon: (isActive) => (
      <Image
        src={esignatureIcon}
        alt="eSignature"
        width={20}
        height={20}
        className={isActive ? 'invert' : ''}
      />
    ),
  },
  { name: 'Messages', href: '/messages', icon: () => <EmailOutlined /> },
  {
    name: 'Invoices & Receipts',
    href: '/invoices',
    icon: (isActive) => (
      <Image
        src={invoiceIcon}
        alt="Invoices & Receipts"
        width={20}
        height={20}
        className={isActive ? 'invert' : ''}
      />
    ),
  },
];

const bottomNavItems: NavItem[] = [
  { name: 'Help', href: '/help', icon: () => <HelpOutline /> },
  { name: 'Settings', href: '/settings', icon: () => <SettingsOutlined /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Profile</h2>
        <div className="flex items-center gap-3">
          <Avatar
            alt="Gwen Lam"
            src={profilePhotoForCreateCompanySpecialists.src}
            sx={{ width: 40, height: 40 }}
          />
          <div>
            <p className="text-sm font-medium text-gray-900 font-proxima-nova">
              Gwen Lam
            </p>
            <p className="text-xs 600 font-red-hat-display text-primary font-semibold">
              ST Comp Holdings Sdn Bhd
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3 font-proxima-nova">
            Dashboard
          </h3>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <span className="shrink-0">{item.icon(isActive)}</span>
                  <span className="font-proxima-nova">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200">
        <nav className="space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <span className="shrink-0">{item.icon(isActive)}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
