import { combineReducers } from 'redux'
import breadcrumbReducer from './BreadcrumbReducer'
import userReducer from './UserReducer'
import loaddingReducer from './LoaddingReducer'
export * from './BreadcrumbReducer'
export * from './UserReducer'
export * from './LoaddingReducer'

export const rootReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
  user: userReducer,
  loadding: loaddingReducer,
})