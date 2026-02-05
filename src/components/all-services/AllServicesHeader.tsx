'use client';

import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import {
  ExpandMore,
  MailOutline,
  NotificationsOutlined,
  Search,
} from '@mui/icons-material';
import TextField from '@/components/ui/TextField';
import anyCompLogo from '@/assets/icons/anyCompLogo.svg';
import Image from 'next/image';
import { InputBase, Paper } from '@mui/material';

type NavLink = {
  id: string;
  label: string;
  href: string;
  hasMenu?: boolean;
};

const navLinks: NavLink[] = [
  {
    id: 'register',
    label: 'Register a company',
    href: '/',
  },
  {
    id: 'appoint',
    label: 'Appoint a Company Secretary',
    href: '/',
  },
  {
    id: 'secretarial',
    label: 'Company Secretarial Services',
    href: '/',
    hasMenu: true,
  },
  {
    id: 'how',
    label: 'How Anycomp Works',
    href: '/',
  },
];

export default function AllServicesHeader() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex w-full container items-center gap-6 px-4 py-4">
        <Image src={anyCompLogo} alt="ANYCOMP" height={80} width={130} />

        <nav className="hidden items-center gap-6 text-sm text-gray-700 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="flex items-center gap-1  font-semibold text-gray-700 hover:text-gray-900"
            >
              {link.label}
              {link.hasMenu ? <ExpandMore fontSize="small" /> : null}
            </Link>
          ))}
        </nav>

        <div className="flex-1 flex justify-center">
          <Paper
            component="form"
            elevation={0}
            className="flex items-center w-full max-w-xl border border-gray-400 rounded-md overflow-hidden"
            sx={{ borderRadius: '6px', width: '100%', maxWidth: 300 }}
          >
            <InputBase
              className="ml-4 flex-1 font-sans text-gray-500"
              placeholder="Search for any services"
              inputProps={{ 'aria-label': 'search for any services' }}
            />

            <div className="bg-[#003371] h-full flex items-center justify-center transition-colors hover:bg-[#002654]">
              <IconButton
                type="submit"
                className="text-white px-5 py-3 rounded-none"
                aria-label="search"
                // icon white
                sx={{
                  '& .MuiSvgIcon-root': { color: '#FFFFFF' },
                }}
              >
                <Search fontSize="medium" />
              </IconButton>
            </div>
          </Paper>
        </div>

        <div className="flex items-center gap-2">
          <IconButton size="small">
            <MailOutline fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <Badge variant="dot" color="error">
              <NotificationsOutlined fontSize="small" />
            </Badge>
          </IconButton>
          <Avatar
            alt="User"
            src="https://i.pravatar.cc/60?img=5"
            sx={{ width: 28, height: 28, ml: 1 }}
          />
        </div>
      </div>
    </header>
  );
}
