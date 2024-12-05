import { createSlice } from '@reduxjs/toolkit'
import { roleService } from '../services/apiServiceFactory'

const rolesSlice = createSlice({
  name: 'roles',
  initialState: [],
  reducers: {
    appendRole(state, action) {
      state.push(action.payload)
    },
    setRoles(state, action) {
      return action.payload
    },
  },
})

export const initializeRoles = () => {
  return async (dispatch) => {
    const roles = await roleService.getAll()
      dispatch(setRoles(roles))
  }
}

export const createRole = (roleObject) => {
  return async (dispatch) => {
    const newRole = await roleService.create(roleObject)
    dispatch(appendRole(newRole))
  }
}


export const { appendRole, setRoles } = rolesSlice.actions
export default rolesSlice.reducer