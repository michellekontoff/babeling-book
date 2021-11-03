import { useDispatch } from "react-redux";

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const TOGGLE_SHOWNAV = 'session/TOGGLE_SHOWNAV'
const SET_SHOWNAV = 'session/SET_SHOWNAV'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

export const toggleShowNav = () => ({
    type: TOGGLE_SHOWNAV,
})

export const setShowNav = (showNav) => ({
    type: SET_SHOWNAV,
    showNav
})

export const toggleNavBar = (showNav) => {
        return async function (dispatch) {
            await dispatch(toggleShowNav());
            try {
                localStorage.setItem('bb-showNav', showNav);
            } catch {
                //do nothing
            }
    }

}

function showNavOnLogin () {
    localStorage.setItem('bb-showNav', true)
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
    dispatch(setShowNav(true))
    showNavOnLogin()
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
    dispatch(setShowNav(true))
    showNavOnLogin()
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

const initialState = { user: null, showNav: true };

export default function reducer(state = initialState, action) {
    let newState = {...state}
  switch (action.type) {
    case SET_USER:
        newState['user'] = action.payload
      return newState
    case REMOVE_USER:
      return initialState
    case TOGGLE_SHOWNAV:
        if (newState['showNav'] === true) {
            newState['showNav'] = false
        } else {
            newState['showNav'] = true
        }
        return newState
    case SET_SHOWNAV:
        newState['showNav'] = action.showNav
        return newState
    default:
      return state;
  }
}
