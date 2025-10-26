import { Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute } from './routes/PrivateRoute'
import { PublicRoute } from './routes/PublicRoute'
import { MainLayout } from './components/layout/MainLayout'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Dashboard } from './pages/dashboard/Dashboard'
import { StudentList } from './pages/students/StudentList'
import { TeacherList } from './pages/teachers/TeacherList'
import { ExamList } from './pages/exams/ExamList'
import { SubjectList } from './pages/subjects/SubjectList'
import { GradeList } from './pages/grades/GradeList'
import { LessonList } from './pages/lessons/LessonList'
import { QuestionList } from './pages/questions/QuestionList'
import { QuestionTypeList } from './pages/question-types/QuestionTypeList'
import { LevelList } from './pages/levels/LevelList'
import { OptionList } from './pages/options/OptionList'
import { MatrixList } from './pages/matrices/MatrixList'
import { Profile } from './pages/profile/Profile'
import { AppSettingList } from './pages/settings/AppSettingList'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/students"
        element={
          <PrivateRoute>
            <MainLayout>
              <StudentList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/teachers"
        element={
          <PrivateRoute>
            <MainLayout>
              <TeacherList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/subjects"
        element={
          <PrivateRoute>
            <MainLayout>
              <SubjectList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/grades"
        element={
          <PrivateRoute>
            <MainLayout>
              <GradeList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/lessons"
        element={
          <PrivateRoute>
            <MainLayout>
              <LessonList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/exams"
        element={
          <PrivateRoute>
            <MainLayout>
              <ExamList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/questions"
        element={
          <PrivateRoute>
            <MainLayout>
              <QuestionList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/question-types"
        element={
          <PrivateRoute>
            <MainLayout>
              <QuestionTypeList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/levels"
        element={
          <PrivateRoute>
            <MainLayout>
              <LevelList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/options"
        element={
          <PrivateRoute>
            <MainLayout>
              <OptionList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/matrices"
        element={
          <PrivateRoute>
            <MainLayout>
              <MatrixList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <MainLayout>
              <AppSettingList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
