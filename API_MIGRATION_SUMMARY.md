# API Migration Summary - MongoDB Integration

**Date**: October 31, 2025  
**Status**: ✅ Complete

## Overview

Successfully migrated all API integration files from MySQL (integer IDs) to MongoDB (string ObjectId). All endpoints have been updated to match the backend API documentation.

---

## 🔧 Changes Made

### 1. Type Definitions Updated

#### `src/types/api.types.ts`
- ✅ Changed all ID fields from `number` to `string` (MongoDB ObjectId)
- ✅ Updated `StartExamRequest` to include `studentEmail` field
- ✅ Made `explanation` field optional in `QuestionRequest` and `QuestionResponse`
- ✅ Removed `status` field from `StudentResponse`
- ✅ Removed `updatedAt` from `QuestionTypeResponse`

#### `src/types/auth.types.ts`
- ✅ Changed `userId` from `number` to `string`
- ✅ Updated `LoginResponse` to include `userId`, `firstName`, `lastName`, `message`
- ✅ Removed `type` field (Bearer is handled by interceptor)
- ✅ Unified registration types into single `RegisterRequest`

---

### 2. API Endpoints Updated

#### **Authentication** (`src/api/auth.api.ts`)
- ✅ Consolidated to single `/api/auth/register` endpoint
- ✅ Updated return types to match new `LoginResponse`
- ✅ Removed separate student/teacher registration endpoints

#### **Students** (`src/api/student.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Added `search(name: string)` endpoint
- ✅ Removed `/me` and `/updateMe` endpoints (not in API)

#### **Teachers** (`src/api/teacher.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Added `search(name: string)` endpoint
- ✅ Removed `/me` and `/updateMe` endpoints

#### **Subjects** (`src/api/subject.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Added `search(name: string)` endpoint

#### **Grades** (`src/api/grade.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Updated `getBySubject(subjectId: string)` parameter

#### **Lessons** (`src/api/lesson.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Added `search(title: string)` endpoint
- ✅ Updated `getByGrade(gradeId: string)` parameter

#### **Question Types** (`src/api/questionType.api.ts`)
- ✅ Changed ID parameters from `number` to `string`

#### **Levels** (`src/api/level.api.ts`)
- ✅ Changed ID parameters from `number` to `string`

#### **Questions** (`src/api/question.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Updated `getByLesson(lessonId: string)` parameter
- ✅ Updated `getByLevel(levelId: string)` parameter
- ✅ Removed `getByType` endpoint (not in API documentation)
- ✅ Kept `search(text: string)` endpoint

#### **Options** (`src/api/option.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Updated `getByQuestion(questionId: string)` parameter

#### **Exams** (`src/api/exam.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Added `search(name: string)` endpoint
- ✅ Removed `getByStatus` endpoint (not in API documentation)
- ✅ Removed unused `ExamStatus` import

#### **Matrices** (`src/api/matrix.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Updated endpoint from `/create-with-questions` to `/with-questions`
- ✅ Updated `getByExam(examId: string)` parameter

#### **Exam Sessions** (`src/api/examSession.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Updated `startExam` to accept `StartExamRequest` with `studentEmail`
- ✅ Renamed `getActiveSession` to `getCurrentSession` with `studentEmail` param
- ✅ Added `getSessionById(sessionId, studentEmail)` method
- ✅ Updated `submitAnswer` endpoint to `/submit-answer`
- ✅ Updated all methods to include `studentEmail` query parameter
- ✅ Changed return type handling (removed `.then(res => res.data)`)
- ✅ Removed `getMatrixQuestions` (not a session endpoint)

#### **Exam Results** (`src/api/examResult.api.ts`)
- ✅ Changed ID parameters from `number` to `string`
- ✅ Updated `getResultBySession` to include `studentEmail` parameter
- ✅ Added `calculateResult` method (may need backend implementation)
- ✅ Removed `getMyResults` and `getResultById` (not in API documentation)

#### **App Settings** (`src/api/appSetting.api.ts`)
- ✅ Changed ID parameters from `number` to `string`

---

## 🔑 Key Changes Summary

### MongoDB String IDs
**Before:**
```typescript
studentId: number
```

**After:**
```typescript
studentId: string  // MongoDB ObjectId
```

### Authentication Response
**Before:**
```typescript
{
  token: string;
  type: string;
  email: string;
  role: 'STUDENT' | 'TEACHER';
}
```

**After:**
```typescript
{
  token: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
}
```

### Exam Session Start
**Before:**
```typescript
{
  examId: number;
  matrixId: number;
}
```

**After:**
```typescript
{
  studentEmail: string;
  examId: string;
  matrixId: string;
}
```

### Search Endpoints Added
- `/api/students/search?name={name}`
- `/api/teachers/search?name={name}`
- `/api/subjects/search?name={name}`
- `/api/lessons/search?title={title}`
- `/api/questions/search?text={text}`
- `/api/exams/search?name={name}`

---

## ⚠️ Breaking Changes

### For Frontend Components

1. **Update ID handling**: All ID props and state must use `string` instead of `number`
2. **Authentication**: Update login/register handlers to use new response structure
3. **Exam Sessions**: Pass `studentEmail` to all exam session API calls
4. **Exam Results**: Pass `studentEmail` when fetching results
5. **Remove legacy endpoints**: Components using `/me` endpoints need refactoring

### Example Component Updates Needed

#### Before:
```typescript
const { data: student } = useQuery(['student', 123], () => 
  studentApi.getById(123)
);
```

#### After:
```typescript
const { data: student } = useQuery(['student', '507f1f77bcf86cd799439011'], () => 
  studentApi.getById('507f1f77bcf86cd799439011')
);
```

---

## 📋 Testing Checklist

- [ ] Test login with new response structure
- [ ] Test registration endpoint
- [ ] Test all CRUD operations with string IDs
- [ ] Test search endpoints
- [ ] Test exam session flow with studentEmail
- [ ] Test exam result retrieval with studentEmail
- [ ] Verify error handling for 404s with invalid ObjectIds
- [ ] Test matrix creation with auto-generation
- [ ] Verify JWT token in Authorization header

---

## 🔗 API Endpoints Reference

### Base URL
```
http://localhost:8080/api
```

### Authentication Header
```
Authorization: Bearer {token}
```

### Common Query Parameters
- `studentEmail`: Required for exam sessions and results
- `name`: For search endpoints (students, teachers, subjects, exams)
- `title`: For lesson search
- `text`: For question search

---

## 📝 Notes for Developers

1. **MongoDB ObjectIds** are 24-character hexadecimal strings (e.g., `507f1f77bcf86cd799439011`)
2. **All dates** use ISO 8601 format (e.g., `2025-10-31T15:00:00`)
3. **Student email** is now required for exam session operations (authentication)
4. **Search endpoints** use query parameters with URL encoding
5. **Error responses** follow standard HTTP status codes (400, 401, 404, 500)

---

## 🚀 Next Steps

1. Update React hooks (`useAuth`, `useStudents`, etc.) to handle new types
2. Update form components to work with string IDs
3. Update route parameters to accept string IDs
4. Test authentication flow end-to-end
5. Test exam taking flow with new session API
6. Update any hardcoded test IDs to use MongoDB ObjectId format
7. Consider adding ID validation utilities for ObjectId format

---

## 📚 Related Files

- Type definitions: `src/types/api.types.ts`, `src/types/auth.types.ts`
- API clients: `src/api/*.api.ts`
- Axios config: `src/api/axios.config.ts`
- Hooks: `src/hooks/*.ts`
- Components: `src/components/**/*.tsx`
- Pages: `src/pages/**/*.tsx`

---

**Migration Status**: ✅ Complete  
**Last Updated**: October 31, 2025  
**Version**: 2.0.0 (MongoDB)
