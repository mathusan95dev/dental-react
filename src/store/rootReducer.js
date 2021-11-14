import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import adminReducer from '../services/admin/reducer';
import commonReducer from '../services/common/reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['adminReducer']
};

const appReducer = combineReducers({
  adminReducer,
  commonReducer
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = initialState;
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export default persistedReducer;
