'use client';

import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import {
  MailOutline,
  NotificationsOutlined,
  Logout,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { logout, isLogoutLoading } = useAuth();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    // Use window.location for a full page reload to ensure clean state
    window.location.href = '/auth';
  };

  return (
    <header className="bg-white border-b border-gray-200 h-12 flex items-center justify-end px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <IconButton size="small">
          <MailOutline
            sx={{
              height: '24px',
              width: '24px',
              padding: 0,
            }}
          />
        </IconButton>
        <IconButton size="small">
          <Badge
            sx={{
              height: 20,
              width: 20,
              padding: 0,
            }}
            badgeContent={3}
            color="error"
          >
            <NotificationsOutlined
              sx={{
                height: '24px',
                width: '24px',
              }}
            />
          </Badge>
        </IconButton>
        <IconButton onClick={handleAvatarClick} size="small">
          <Avatar alt="User" src="/avatar.jpg" sx={{ width: 28, height: 28 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: 150,
              },
            },
          }}
        >
          <MenuItem onClick={handleLogout} disabled={isLogoutLoading}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {isLogoutLoading ? 'Logging out...' : 'Logout'}
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}
