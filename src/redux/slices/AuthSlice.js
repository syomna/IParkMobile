import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  signupAndCreateUser,
} from '../../services/authServices';
export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}) => {
    console.log(`login ${email} ${password}`);
    try {
      const res = await signInWithEmailAndPassword({email, password});
      await AsyncStorage.setItem('uid', res.uid);
      console.log(`uid ${res.uid}`);
      return res.uid;
    } catch (error) {
      console.log(error);
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({name, email, password, phone, plate}) => {
    try {
      await signupAndCreateUser({
        name,
        email,
        password,
        phone,
        plate,
      });
      const id = await AsyncStorage.getItem('uid');
      return id;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getId = createAsyncThunk('auth/getId', async () => {
  try {
    const id = await AsyncStorage.getItem('uid');
    return id;
  } catch (error) {
    console.log('Error loading ID from AsyncStorage:', error);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await AsyncStorage.removeItem('uid');
  } catch (error) {
    console.log(error);
  }
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    error: false,
    id: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload === undefined) {
          state.error = true;
        } else {
          state.id = action.payload;
          state.error = false;
        }
        console.log(`login ${state.id}`);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.id = null;
        state.error = true;
      })

      .addCase(signup.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload === undefined) {
          state.error = true;
        } else {
          state.id = action.payload;
          state.error = false;
        }
        console.log(`signup ${state.id}`);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.id = null;
        state.error = true;
      })
      .addCase(getId.fulfilled, (state, action) => {
        state.id = action.payload;
        console.log(`getId ${state.id}`);
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.id = null;
      });
  },
});

export default AuthSlice.reducer;
