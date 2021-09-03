import { useDispatch } from "react-redux";

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const SET_SHOWNAV = 'session/SHOW_NAV'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

export const setShowNav = () => ({
    type: SET_SHOWNAV,
})

export const useSetShowNav = (showNav) => {
    const dispatch = useDispatch()
        return async function () {
            await dispatch(setShowNav())
            try {
                localStorage.setItem('bb-showNav', showNav)
            } catch {
                //do nothing
            }
    }

}


export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    dispatch(setShowNav())
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data) {
      return data;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, confirmPassword) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      confirm: confirmPassword
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    dispatch(setShowNav())
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data) {
      return data;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

const initialState = { user: null, showNav: false };

export default function reducer(state = initialState, action) {
    let newState = {...state}
  switch (action.type) {
    case SET_USER:
        newState['user'] = action.payload
      return newState
    case REMOVE_USER:
      return initialState
    case SET_SHOWNAV:
        if (newState['showNav'] === true) {
            newState['showNav'] = false
        } else {
            newState['showNav'] = true
        }
        return newState
    default:
      return state;
  }
}
