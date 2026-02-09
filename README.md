# ST Comp Holdings - Job Task Frontend

A modern Next.js frontend application for managing specialists and service offerings with Material-UI components and Redux state management.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.7 with React 19
- **UI Library**: Material-UI (MUI) v7.3.7
- **Styling**: TailwindCSS v4 + Emotion for CSS-in-JS
- **State Management**: Redux Toolkit v2.11.2 with RTK Query
- **HTTP Client**: Axios v1.13.4
- **Form Validation**: Zod v4.3.6
- **Notifications**: Sonner v2.0.7
- **Type Safety**: TypeScript v5
- **Build Tool**: Turbopack (Next.js)

## 🏗️ Architecture & Strategies

### Application Structure

- **App Router**: Next.js 15 App Router for modern routing and layouts
- **Server-Side Rendering**: Optimized SSR for better SEO and performance
- **Layout System**:
  - Common layout for authentication pages
  - Dashboard layout for authenticated user pages
  - Shared components in layout folder

### State Management Strategy

- **Redux Toolkit**: Global state management with Redux slices
- **RTK Query**: API caching, data fetching, and synchronization
- **Custom Base Query**: Axios integration with Redux for API calls
- **Typed Hooks**: Pre-typed `useAppDispatch` and `useAppSelector` hooks

### Component Architecture

- **Modular Components**: Organized by feature and purpose
  - `auth/` - Authentication components (Login, Register)
  - `inputs/` - Reusable form input components
  - `layout/` - Layout components (Header, Sidebar, etc.)
  - `ui/` - Generic UI components
  - `all-services/` - Service-related components
  - Feature-specific components (ServiceTable, EditServiceDrawer)

### Styling Strategy

- **TailwindCSS v4**: Utility-first CSS framework
- **Material-UI**: Pre-built React components with theming
- **Emotion**: CSS-in-JS for dynamic styling
- **Custom Theme**: Centralized theme configuration in `theme.ts`
- **Utility Functions**: `clsx` and `tailwind-merge` for className management

### API Integration

- **Axios Base Query**: Custom implementation for RTK Query
- **API Slices**: Feature-based API endpoints using `baseApi`
- **Tag-Based Invalidation**: Automatic cache invalidation with Redux tags
- **Error Handling**: Centralized error handling and toast notifications

### Authentication Strategy

- **Context API**: `AuthContext` for authentication state
- **Cookie-Based**: JWT stored in HTTP-only cookies
- **Protected Routes**: Client-side route protection
- **Token Management**: Automatic token refresh and validation

### Key Features

- User authentication (login/register)
- Specialist management dashboard
- Service offerings CRUD operations
- Photo upload with Cloudinary integration
- Real-time form validation with Zod
- Toast notifications for user feedback
- Responsive design with Material-UI
- Protected admin routes
- Service filtering and search

## ⚠️ Important Limitations

### Vercel Free Tier Limitation

**Photo Upload Failure (4.5 MB Body Size Limit)**

If photo uploads fail when uploading images, it's due to **Vercel's free tier limitation**, not an application issue:

- **Vercel Free Tier**: Request body size limited to **4.5 MB**
- **Impact**: Large images or multiple images may exceed the limit
- **Solution Options**:
  1. **Compress images before upload** (recommended for free tier)
  2. **Resize images** to reduce file size
  3. **Upload images one at a time** instead of multiple
  4. **Upgrade to Vercel Pro** for 100 MB limit

**Note**: This is a Vercel infrastructure limitation, not a frontend or backend issue. The application itself supports larger file uploads when deployed elsewhere.

## 📦 Installation

```bash
cd st_comp_holding_job_task_frontend
pnpm install

# Set up environment variables
cp .env.example .env.local
# Configure API base URL

# Start development server
pnpm dev
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# or your deployed backend URL
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

## 🚀 Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying [app/page.tsx](app/page.tsx). The page auto-updates as you edit the file.

## 📝 Available Scripts

- `pnpm dev` - Start Next.js development server with Turbopack
- `pnpm build` - Build for production with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 🎨 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (common)/            # Common layout routes (auth)
│   ├── (dashboard-layout)/  # Dashboard layout routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── inputs/             # Form input components
│   ├── layout/             # Layout components
│   ├── ui/                 # Reusable UI components
│   └── all-services/       # Service-related components
├── contexts/               # React contexts
│   └── AuthContext.tsx     # Authentication context
├── redux/                  # Redux store setup
│   ├── store.ts            # Store configuration
│   ├── baseApi.ts          # RTK Query base API
│   ├── features/           # Redux slices
│   └── axiosBaseQuery.ts   # Custom Axios base query
├── service/                # Utility services
│   ├── checkCookie.tsx     # Cookie validation
│   ├── SetAccessToken.ts   # Token management
│   └── logoutUser.ts       # Logout functionality
├── types/                  # TypeScript types
├── providers/              # Context providers
│   └── ReduxProvider.tsx   # Redux provider wrapper
├── providers.tsx           # App-level providers
└── theme.ts                # MUI theme configuration
```

## 🔒 Security Features

- HTTP-only cookie authentication
- Client-side route protection
- CSRF token handling
- Secure token storage
- Input validation with Zod
- XSS prevention with React

## 🎯 Key Pages

- `/` - Landing/Home page
- `/login` - User authentication
- `/register` - User registration
- `/dashboard` - Main dashboard (protected)
- `/services` - Service management (protected)
- `/specialists` - Specialist management (protected)

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Material-UI](https://mui.com/) - React component library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Developed for ST Comp Holdings Job Task**
