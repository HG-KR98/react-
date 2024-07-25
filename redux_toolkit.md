## configureStore

`configureStore`는 Redux 스토어를 생성하는 함수이다. 기존의 `createStore` 함수보다 설정이 간단하고, Redux DevTools와 Redux Thunk 미들웨어를 기본적으로 포함하고 있다.

```jsx
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // 여기에 여러 개의 리듀서를 추가할 수 있습니다.
    counter: counterReducer,
  },
});
```

## Slice

Slice는 Redux Toolkit의 핵심 개념 중 하나로, 상태와 리듀서를 함께 정의할 수 있다. `createSlice` 함수는 slice를 생성하는데 사용된다.

```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

## Action Creators

Action creators는 특정 액션 객체를 생성하는 함수이다. `createSlice`를 사용하면, 자동으로 액션 생성 함수도 만들어진다.

```jsx
const incrementAction = counterSlice.actions.increment();
const decrementAction = counterSlice.actions.decrement();
```

## Reducers

Reducer는 상태와 액션을 받아서 새로운 상태를 반환하는 함수이다. Redux Toolkit의 `createSlice`를 사용하면, 리듀서를 정의하는 과정이 더 간단해진다. 리듀서 함수는 상태를 직접 변경할 수 있다.

```jsx
const counterReducer = counterSlice.reducer;
```

```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1; // Immer를 사용하여 불변성을 유지하면서 상태를 직접 변경할 수 있습니다.
    },
    decrement: (state) => {
      state.count -= 1;
    },
    add: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, add } = counterSlice.actions;
export default counterSlice.reducer;
```

애플리케이션이 커짐에 따라 여러 리듀서를 결합하여 사용해야 할 필요가 있다. Redux에서는 `combineReducers` 함수를 사용하여 여러 리듀서를 하나로 결합할 수 있다.

```jsx
import { combineReducers } from "redux";
import counterReducer from "./counterSlice";
import anotherReducer from "./anotherSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  another: anotherReducer,
});

export default rootReducer;
```

비동기 리듀서 예시

```jsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (userId, thunkAPI) => {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
```

## Thunk Middleware

Thunk는 비동기 로직을 처리하는 데 사용되는 미들웨어이다. Redux Toolkit은 Thunk 미들웨어를 기본적으로 포함하고 있다. 그래서 별도의 설정 없이 사용할 수 있다.

Thunk는 액션 생성자가 일반적인 액션 객체를 반환하는 대신, 함수를 반환할 수 있도록 한다. 이러한 함수는 `dispatch`와 `getState`를 인자로 받아 필요한 비동기 작업을 수행한 후, 결과에 따라 다른 액션을 dispatch할 수 있다.

```jsx
import { createAsyncThunk } from "@reduxjs/toolkit";

// 비동기 액션 생성 함수
const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (userId, thunkAPI) => {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
  }
);

// 리듀서에서 처리 방법
const userSlice = createSlice({
  name: "user",
  initialState: { user: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});
```

```jsx
const thunkActionCreator = (params) => {
  return (dispatch, getState) => {
    // 비동기 로직 또는 사이드 이펙트를 처리합니다.
  };
};
```

### Redux Toolkit에서 Thunk 사용하기

비동기 작업을 처리하기 위해 Redux Toolkit에서 `createAsyncThunk`를 사용할 수 있다.

```jsx
import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";

// 비동기 작업 정의
export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, thunkAPI) => {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
  }
);

// 슬라이스 정의
const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: {},
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;

// 스토어 구성
const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});
```

### Thunk의 세부 구조

1. pending: 비동기 작업이 시작될 때 디스패치된다.
2. fulfilled: 비동기 작업이 성공적으로 완료되었을 때 디스패치된다.
3. rejected: 비동기 작업이 실패했을 때 디스패치된다.

### 비동기 액션 생성

`createAsyncThunk`는 비동기 액션 생성 시, 두 개의 인자를 받는다.

- `type` : 액션 타입의 접두사.
- `payloadCreator`: 비동기 작업을 수행하는 함수.

```jsx
const fetchSomething = createAsyncThunk(
  "something/fetch",
  async (id, thunkAPI) => {
    const response = await fetch(`/api/something/${id}`);
    return response.json();
  }
);
```

### 상태 관리

비동기 작업의 상태를 `extraReducers`를 통해 관리한다.

```jsx
const somethingSlice = createSlice({
  name: "something",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSomething.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSomething.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSomething.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default somethingSlice.reducer;
```

### Thunk를 활용한 API 호출 예시

```jsx
import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";

// API 호출을 처리하는 Thunk 생성
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
});

// 포스트 슬라이스 생성
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

// 스토어 설정
const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

// 컴포넌트에서 Thunk 액션을 디스패치
store.dispatch(fetchPosts());
```

## createEntityAdapter

## createSelector

## Immer
