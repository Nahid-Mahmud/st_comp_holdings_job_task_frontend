'use client';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { MailOutline, NotificationsOutlined } from '@mui/icons-material';

export default function Header() {
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
        <Avatar
          alt="User"
          src="/avatar.jpg"
          sx={{ width: 28, height: 28, ml: 1 }}
        />
      </div>
    </header>
  );
}
