# Frontend Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Input, Card, etc.)
│   ├── forms/           # Form-specific components
│   ├── charts/          # Chart and visualization components
│   ├── tables/          # Data table components
│   ├── modals/          # Modal dialog components
│   └── layout/          # Layout components (Header, Sidebar, Footer)
│
├── pages/               # Page-level components (route components)
│   ├── dashboard/       # Dashboard page and sub-components
│   ├── attendance/      # Attendance management pages
│   ├── classes/         # Class management pages
│   ├── reports/         # Reports and analytics pages
│   ├── leaderboard/     # Gamification and leaderboard pages
│   ├── settings/        # System settings pages
│   └── auth/            # Authentication pages (login, register)
│
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication hook
│   ├── useApi.ts        # API data fetching hooks
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
│
├── services/            # API services and external integrations
│   ├── api.ts           # Main API service class
│   ├── auth.ts          # Authentication service
│   ├── attendance.ts    # Attendance-related API calls
│   └── analytics.ts     # Analytics and reporting APIs
│
├── store/               # State management (Zustand/Redux)
│   ├── authStore.ts     # Authentication state
│   ├── attendanceStore.ts
│   └── uiStore.ts       # UI state (modals, notifications)
│
├── utils/               # Utility functions
│   ├── index.ts         # Common utilities
│   ├── formatters.ts    # Data formatting functions
│   ├── validators.ts    # Form validation helpers
│   └── constants.ts     # App-wide constants
│
├── types/               # TypeScript type definitions
│   ├── index.ts         # Global types
│   ├── api.ts           # API response types
│   └── components.ts    # Component prop types
│
├── constants/           # Application constants
│   ├── index.ts         # General constants
│   ├── routes.ts        # Route definitions
│   └── api.ts           # API endpoints
│
├── assets/              # Static assets
│   ├── images/          # Image files
│   ├── icons/           # Icon files (SVG, PNG)
│   └── fonts/           # Custom fonts
│
├── styles/              # Global styles and themes
│   ├── globals.css      # Global CSS styles
│   ├── components.css   # Component-specific styles
│   └── tailwind.css     # Tailwind CSS imports
│
├── lib/                 # Third-party library configurations
│   ├── axios.ts         # Axios configuration
│   ├── queryClient.ts   # React Query configuration
│   └── auth.ts          # Auth library setup
│
└── __tests__/           # Test files
    ├── components/      # Component tests
    ├── pages/           # Page tests
    ├── hooks/           # Hook tests
    └── utils/           # Utility function tests
```

## Key Principles

### 1. **Feature-Based Organization**
- Pages are organized by feature/domain
- Related components are grouped together
- Easy to locate and maintain code

### 2. **Separation of Concerns**
- UI components are separate from business logic
- Services handle API communication
- Hooks manage reusable stateful logic
- Utils contain pure functions

### 3. **Scalability**
- Structure supports growth
- Easy to add new features
- Clear boundaries between modules

### 4. **Developer Experience**
- Consistent naming conventions
- Barrel exports for clean imports
- TypeScript for type safety
- Clear folder purposes

### 5. **Testing Strategy**
- Tests mirror source structure
- Easy to find related tests
- Supports different testing levels

## Import Examples

```typescript
// Clean imports using barrel exports
import { Button, Card, Input } from '@/components/ui';
import { useAuth, useApi } from '@/hooks';
import { apiService } from '@/services';
import { User, AttendanceRecord } from '@/types';
import { ROUTES, API_ENDPOINTS } from '@/constants';
```

## Benefits

- **Maintainable**: Clear structure makes code easy to maintain
- **Scalable**: Can grow with the application
- **Testable**: Easy to write and organize tests
- **Collaborative**: Team members can easily navigate
- **Professional**: Industry-standard organization