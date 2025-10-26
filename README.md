# Matrix Exam System - Frontend

A complete React + Vite + TypeScript application with Material-UI for the Matrix Exam Management System.

## 🚀 Features

- ✅ **Authentication** - JWT-based login/logout with auto-redirect
- ✅ **Dashboard** - Statistics and overview cards
- ✅ **Student Management** - Full CRUD operations
- ✅ **Teacher Management** - Full CRUD operations
- ✅ **Exam Management** - Create, edit, delete exams
- ✅ **Responsive Design** - Mobile-friendly with collapsible sidebar
- ✅ **Protected Routes** - Role-based access control
- ✅ **Form Validation** - React Hook Form + Zod
- ✅ **API State Management** - React Query (TanStack Query)
- ✅ **Toast Notifications** - Real-time feedback
- ✅ **Beautiful UI** - Material-UI components

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand (auth) + React Query (API)
- **Routing**: React Router v6
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Material Icons
- **Date Handling**: date-fns
- **Notifications**: React Toastify

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🌐 Environment Setup

The app connects to the backend API at:
```
http://localhost:8080/api
```

Make sure your Spring Boot backend is running on port 8080.

## 📁 Project Structure

```
src/
├── api/                    # API service layer
│   ├── axios.config.ts     # Axios instance with JWT interceptors
│   ├── auth.api.ts         # Authentication endpoints
│   ├── student.api.ts      # Student endpoints
│   ├── teacher.api.ts      # Teacher endpoints
│   ├── exam.api.ts         # Exam endpoints
│   ├── subject.api.ts      # Subject endpoints
│   └── question.api.ts     # Question endpoints
├── components/             # Reusable components
│   └── layout/            # Layout components
│       ├── Header.tsx     # Top navigation bar
│       ├── Sidebar.tsx    # Side navigation menu
│       └── MainLayout.tsx # Main layout wrapper
├── pages/                 # Page components
│   ├── auth/             # Login page
│   ├── dashboard/        # Dashboard with stats
│   ├── students/         # Student management
│   ├── teachers/         # Teacher management
│   └── exams/           # Exam management
├── hooks/                # Custom React hooks
│   ├── useAuth.ts       # Authentication logic
│   ├── useStudents.ts   # Student CRUD hooks
│   ├── useTeachers.ts   # Teacher CRUD hooks
│   └── useExams.ts      # Exam CRUD hooks
├── types/                # TypeScript interfaces
│   ├── api.types.ts     # API DTOs
│   ├── auth.types.ts    # Auth types
│   └── common.types.ts  # Common types
├── store/               # State management
│   └── authStore.ts    # Zustand auth store
├── utils/              # Utility functions
│   ├── formatters.ts   # Date/number formatters
│   └── constants.ts    # App constants
├── routes/             # Route configuration
│   ├── PrivateRoute.tsx # Protected route wrapper
│   └── PublicRoute.tsx  # Public route wrapper
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## 🔑 Authentication Flow

1. User enters email and password on `/login`
2. App sends credentials to `POST /api/auth/login`
3. Backend returns JWT token and user info
4. Token stored in localStorage
5. Axios interceptor adds token to all API requests
6. Protected routes check authentication status
7. Logout clears token and redirects to login

## 🎨 UI Components

### Color Palette
- **Primary**: Blue (#1976d2)
- **Secondary**: Green (#388e3c)
- **Success**: #4caf50
- **Warning**: #ff9800
- **Error**: #f44336
- **Background**: #f5f5f5

### Typography
- Font: Roboto
- Headings: Bold, larger sizes
- Body: Regular, 14-16px

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (temporary sidebar)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (permanent sidebar)

## 🔧 API Integration

All API calls use Axios with:
- Base URL: `http://localhost:8080/api`
- JWT Bearer token in Authorization header
- Automatic 401 redirect to login
- Error handling with toast notifications

### Example API Usage

```typescript
// Using React Query hooks
const { data: students, isLoading } = useStudents();
const createMutation = useCreateStudent();

// Create student
createMutation.mutate({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  status: 'ACTIVE'
});
```

## 🚦 Available Routes

- `/login` - Login page (public)
- `/dashboard` - Main dashboard (protected)
- `/students` - Student list (protected)
- `/teachers` - Teacher list (protected)
- `/exams` - Exam list (protected)
- `/subjects` - Subject management (protected)
- `/questions` - Question bank (protected)
- `/profile` - User profile (protected)

## 📝 Form Validation

Forms use React Hook Form with Zod schema validation:

```typescript
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters')
});
```

## 🔄 State Management

- **Auth State**: Zustand store (`useAuthStore`)
- **API State**: React Query (automatic caching, refetching)
- **Form State**: React Hook Form

## 🧪 Testing Checklist

- [x] Login/Logout works
- [x] JWT token stored and sent
- [x] Protected routes redirect to login
- [x] Student CRUD operations
- [x] Teacher CRUD operations
- [x] Exam CRUD operations
- [x] Toast notifications
- [x] Responsive design
- [x] Form validation

## 🚀 Deployment

```bash
# Build for production
npm run build

# Output will be in dist/ folder
# Deploy dist/ to your hosting service
```

## 📄 License

MIT License

## 👨‍💻 Development

Developed with ❤️ using React + Vite + TypeScript + Material-UI

---

**Note**: Make sure the backend API is running on `http://localhost:8080` before starting the frontend.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
