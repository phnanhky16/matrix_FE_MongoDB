# API Usage Guide - Quick Reference

This guide provides common usage patterns for the updated Matrix Exam System API.

---

## 🔐 Authentication

### Login
```typescript
import { authApi } from './api/auth.api';

// Login
try {
  const response = await authApi.login({
    email: 'sarah.wilson@teacher.com',
    password: 'password123'
  });
  
  const { token, role, userId, email, firstName, lastName } = response.data;
  
  // Store token (automatically added to requests by axios interceptor)
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify({
    userId, email, firstName, lastName, role
  }));
  
} catch (error) {
  console.error('Login failed:', error);
}
```

### Register
```typescript
// Register a new teacher
try {
  const response = await authApi.register({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@teacher.com',
    password: 'password123'
  });
  
  // Response is same as login
  const { token, userId, email } = response.data;
  
} catch (error) {
  console.error('Registration failed:', error);
}
```

### Logout
```typescript
// Logout
authApi.logout(); // Clears localStorage
```

---

## 👥 Students Management

### Get All Students
```typescript
import { studentApi } from './api/student.api';

const response = await studentApi.getAll();
const students = response.data; // StudentResponse[]
```

### Search Students
```typescript
const response = await studentApi.search('John');
const students = response.data;
```

### Create Student
```typescript
const response = await studentApi.create({
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@student.com',
  password: 'password123',
  phone: '0987654321'
});
const newStudent = response.data;
```

### Update Student
```typescript
const response = await studentApi.update('507f1f77bcf86cd799439011', {
  phone: '0123456789'
});
const updatedStudent = response.data;
```

### Delete Student
```typescript
await studentApi.delete('507f1f77bcf86cd799439011');
```

---

## 📚 Subjects, Grades & Lessons

### Get Subjects
```typescript
import { subjectApi } from './api/subject.api';

// All subjects
const response = await subjectApi.getAll();

// Search
const response = await subjectApi.search('Toán');
```

### Get Grades by Subject
```typescript
import { gradeApi } from './api/grade.api';

const response = await gradeApi.getBySubject('507f1f77bcf86cd799439013');
const grades = response.data;
```

### Get Lessons by Grade
```typescript
import { lessonApi } from './api/lesson.api';

const response = await lessonApi.getByGrade('507f1f77bcf86cd799439014');
const lessons = response.data;
```

### Search Lessons
```typescript
const response = await lessonApi.search('Hàm số');
const lessons = response.data;
```

---

## ❓ Questions & Options

### Get Questions by Lesson
```typescript
import { questionApi } from './api/question.api';

const response = await questionApi.getByLesson('507f1f77bcf86cd799439015');
const questions = response.data;
```

### Get Questions by Level
```typescript
const response = await questionApi.getByLevel('507f1f77bcf86cd799439017');
const questions = response.data;
```

### Search Questions
```typescript
const response = await questionApi.search('hàm số');
const questions = response.data;
```

### Create Question with Options
```typescript
import { optionApi } from './api/option.api';

// 1. Create question
const questionResponse = await questionApi.create({
  lessonId: '507f1f77bcf86cd799439015',
  questionTypeId: '507f1f77bcf86cd799439016',
  levelId: '507f1f77bcf86cd799439017',
  questionText: 'What is 2 + 2?',
  correctAnswer: 'A',
  marks: 1.0,
  explanation: 'Basic arithmetic'
});

const questionId = questionResponse.data.questionId;

// 2. Create options
await optionApi.create({
  questionId,
  optionText: '4',
  isCorrect: true,
  optionOrder: 1
});

await optionApi.create({
  questionId,
  optionText: '3',
  isCorrect: false,
  optionOrder: 2
});
```

### Get Options for Question
```typescript
const response = await optionApi.getByQuestion('507f1f77bcf86cd799439018');
const options = response.data;
```

---

## 📝 Exams & Matrices

### Create Exam
```typescript
import { examApi } from './api/exam.api';

const response = await examApi.create({
  examName: 'Midterm Exam - Math 10',
  description: 'Semester 1 midterm examination',
  durationMinutes: 45,
  totalMarks: 10.0,
  passingMarks: 5.0,
  examDate: '2025-11-15T08:00:00'
});

const exam = response.data;
```

### Search Exams
```typescript
const response = await examApi.search('Math');
const exams = response.data;
```

### Create Matrix (Manual)
```typescript
import { matrixApi } from './api/matrix.api';

const response = await matrixApi.create({
  examId: '507f1f77bcf86cd799439019',
  matrixName: 'Math 10 Question Matrix',
  description: 'Questions for Math 10 exam',
  totalQuestions: 10
});

const matrix = response.data;
```

### Create Matrix with Auto-Generated Questions
```typescript
const response = await matrixApi.createWithQuestions({
  // Exam info
  examName: 'Auto-Generated Math Exam',
  examDescription: 'Automatically generated from question bank',
  durationMinutes: 45,
  passingMarks: 5.0,
  examDate: '2025-11-25T08:00:00',
  
  // Matrix info
  matrixName: 'Auto Matrix',
  matrixDescription: 'Generated matrix',
  
  // Question filters
  lessonIds: ['507f1f77bcf86cd799439015', '507f1f77bcf86cd799439016'],
  levelIds: ['507f1f77bcf86cd799439017'],
  
  // Question distribution
  questionsPerLesson: 5,
  easyQuestions: 3,
  mediumQuestions: 5,
  hardQuestions: 2
});

const { matrixId, examId, questions } = response.data;
```

---

## 🎓 Exam Taking Flow (Student)

### 1. Start Exam Session
```typescript
import { examSessionApi } from './api/examSession.api';

// Get student email from auth user
const user = JSON.parse(localStorage.getItem('user') || '{}');
const studentEmail = user.email;

// Start exam
const response = await examSessionApi.startExam({
  studentEmail,
  examId: '507f1f77bcf86cd799439019',
  matrixId: '507f1f77bcf86cd79943901a'
});

const session = response.data;
const { sessionId, duration, totalQuestions } = session;
```

### 2. Submit Answer
```typescript
const response = await examSessionApi.submitAnswer({
  sessionId: '507f1f77bcf86cd79943901b',
  questionId: '507f1f77bcf86cd799439018',
  selectedOptionId: '507f1f77bcf86cd799439020',
  textAnswer: null
});

const answer = response.data;
const { isCorrect } = answer; // null until exam is submitted
```

### 3. Get Current Session (Resume)
```typescript
const user = JSON.parse(localStorage.getItem('user') || '{}');

try {
  const response = await examSessionApi.getCurrentSession(user.email);
  const session = response.data;
  
  // Resume exam
  console.log('Resume session:', session.sessionId);
  
} catch (error) {
  console.log('No active session');
}
```

### 4. Get Session Answers
```typescript
const response = await examSessionApi.getSessionAnswers(
  sessionId, 
  studentEmail
);

const answers = response.data;
```

### 5. Submit Exam (Finish)
```typescript
const response = await examSessionApi.submitExam(
  sessionId,
  studentEmail
);

const finishedSession = response.data;
console.log('Status:', finishedSession.status); // 'SUBMITTED'
console.log('Time spent:', finishedSession.timeSpent, 'seconds');
```

### 6. View Results
```typescript
import { examResultApi } from './api/examResult.api';

const response = await examResultApi.getResultBySession(
  sessionId,
  studentEmail
);

const result = response.data;
const { 
  score, 
  percentage, 
  passed, 
  correctAnswers, 
  wrongAnswers,
  questionResults 
} = result;

// Show detailed results
questionResults.forEach(q => {
  console.log(`Q: ${q.questionText}`);
  console.log(`Your answer: ${q.selectedOptionText}`);
  console.log(`Correct: ${q.isCorrect}`);
  console.log(`Correct answer: ${q.correctOptionText}`);
});
```

### 7. View Exam History
```typescript
const response = await examSessionApi.getMySessions(studentEmail);
const sessions = response.data;

sessions.forEach(session => {
  console.log(`Exam: ${session.examName}`);
  console.log(`Status: ${session.status}`);
  console.log(`Date: ${session.startTime}`);
});
```

---

## 🔧 React Hook Examples

### useAuth Hook
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { token, userId, email, firstName, lastName, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        userId, email, firstName, lastName, role
      }));
    }
  });
  
  return { login: loginMutation };
};
```

### useStudents Hook
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student.api';

export const useStudents = () => {
  const queryClient = useQueryClient();
  
  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const response = await studentApi.getAll();
      return response.data;
    }
  });
  
  const createMutation = useMutation({
    mutationFn: studentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => 
      studentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: studentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    }
  });
  
  return {
    students,
    isLoading,
    createStudent: createMutation.mutate,
    updateStudent: updateMutation.mutate,
    deleteStudent: deleteMutation.mutate
  };
};
```

### useExamSession Hook
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { examSessionApi } from '../api/examSession.api';

export const useExamSession = (studentEmail: string) => {
  const startExamMutation = useMutation({
    mutationFn: examSessionApi.startExam
  });
  
  const submitAnswerMutation = useMutation({
    mutationFn: examSessionApi.submitAnswer
  });
  
  const submitExamMutation = useMutation({
    mutationFn: ({ sessionId, email }: { sessionId: string, email: string }) =>
      examSessionApi.submitExam(sessionId, email)
  });
  
  const { data: currentSession } = useQuery({
    queryKey: ['currentSession', studentEmail],
    queryFn: async () => {
      const response = await examSessionApi.getCurrentSession(studentEmail);
      return response.data;
    },
    enabled: !!studentEmail
  });
  
  return {
    startExam: startExamMutation.mutate,
    submitAnswer: submitAnswerMutation.mutate,
    submitExam: submitExamMutation.mutate,
    currentSession
  };
};
```

---

## ⚠️ Common Pitfalls

### 1. Forgetting to pass studentEmail
```typescript
// ❌ Wrong
await examSessionApi.getCurrentSession();

// ✅ Correct
await examSessionApi.getCurrentSession(studentEmail);
```

### 2. Using number instead of string for IDs
```typescript
// ❌ Wrong
await studentApi.getById(123);

// ✅ Correct
await studentApi.getById('507f1f77bcf86cd799439011');
```

### 3. Not handling response.data
```typescript
// ❌ Wrong
const students = await studentApi.getAll();

// ✅ Correct
const response = await studentApi.getAll();
const students = response.data;
```

### 4. Invalid ObjectId format
```typescript
// ❌ Wrong
const id = '123';

// ✅ Correct (24 hex characters)
const id = '507f1f77bcf86cd799439011';
```

---

## 📚 Additional Resources

- Full API Documentation: See API documentation file
- Migration Summary: `API_MIGRATION_SUMMARY.md`
- Type Definitions: `src/types/api.types.ts`
- Axios Config: `src/api/axios.config.ts`

---

**Last Updated**: October 31, 2025
