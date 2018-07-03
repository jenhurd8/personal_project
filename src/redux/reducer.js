import axios from "axios";

const ADD_FAMILY = "ADD_FAMILY";
const GET_FAMILY = "GET_FAMILY";
const REMOVE_FAMILY = "REMOVE_FAMILY";

//const ADD_PROVIDER = "reducer/ADD_PROVIDER";
//const REMOVE_PROVIDER = "reducer/REMOVE_PROVIDER";

export function getFamily() {
  return {
    type: GET_FAMILY,
    payload: axios.get("/api/family/")
  };
}

export function removeFamily(id) {
  return {
    type: REMOVE_FAMILY,
    payload: axios.delete(`/api/family/${id}`)
  };
}

export function addFamily(obj) {
  return {
    type: ADD_FAMILY,
    payload: obj
  };
}

const initialState = {
  family: [],
  providers: [],
  isLoading: false,
  error: ""
};

export default function reducer(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case "GET_FAMILY_PENDING":
      return { ...state, isLoading: true };
    case "GET_FAMILY_FULFILLED":
      return { ...state, isLoading: false, family: action.payload.data };
    case "GET_FAMILY_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "ADD_FAMILY_PENDING":
      return { ...state, isLoading: true };
    case "ADD_FAMILY_FULFILLED":
      return {
        ...state,
        isLoading: false,
        family: [...state.family, action.payload.data]
      };
    case "ADD_FAMILY_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "REMOVE_FAMILY_PENDING":
      return { ...state, isLoading: true };
    case "REMOVE_FAMILY_FULFILLED":
      return { ...state, isLoading: false, family: action.payload.data };
    // case "REMOVE_FAMILY_REJECTED":
    //   return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}
