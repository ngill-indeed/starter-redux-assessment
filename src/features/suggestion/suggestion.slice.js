import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
  createAsyncThunk(
    'suggestion/fetchSuggestion',
    async (_) => {
      const response = await fetch('http://localhost:3004/api/suggestion');
      const { data } = await response.json();
      return data;
    }
  );

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: {    
    [fetchSuggestion.pending]: (state) => {
      state.error = false
      state.loading = true
    },
    [fetchSuggestion.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.error = false
      state.suggestion = payload
    },
    [fetchSuggestion.rejected]: (state) => {
      state.error = true
      state.loading = false
    },
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
