import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Add, Edit, Delete, Search as SearchIcon } from '@mui/icons-material';
import { useQuestions, useDeleteQuestion, useSearchQuestions } from '../../hooks/useQuestions';
import { formatDate } from '../../utils/formatters';
import type { QuestionResponse } from '../../types/api.types';

export const QuestionList = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const { data: allQuestions, isLoading: isLoadingAll } = useQuestions();
  const { data: searchResults, isLoading: isSearching } = useSearchQuestions(debouncedSearch);
  const deleteMutation = useDeleteQuestion();

  const questions = debouncedSearch ? searchResults : allQuestions;
  const isLoading = debouncedSearch ? isSearching : isLoadingAll;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    
    // Debounce search
    const timer = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);
    
    return () => clearTimeout(timer);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Question Bank
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="large"
        >
          Add Question
        </Button>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search questions by text..."
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Question Text</TableCell>
              <TableCell>Lesson</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions && questions.length > 0 ? (
              questions.map((question: QuestionResponse) => (
                <TableRow key={question.questionId} hover>
                  <TableCell>{question.questionId}</TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    {question.questionText.length > 100
                      ? `${question.questionText.substring(0, 100)}...`
                      : question.questionText}
                  </TableCell>
                  <TableCell>{question.lessonTitle}</TableCell>
                  <TableCell>{question.questionTypeName}</TableCell>
                  <TableCell>{question.levelName}</TableCell>
                  <TableCell>{question.marks}</TableCell>
                  <TableCell>{formatDate(question.createdAt)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="info">
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(question.questionId)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="text.secondary" py={3}>
                    {searchText ? 'No questions found for your search' : 'No questions found'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
