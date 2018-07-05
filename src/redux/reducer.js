import axios from "axios";

const GET_FAMILY = "GET_FAMILY";
const ADD_FAMILY = "ADD_FAMILY";
const REMOVE_FAMILY = "REMOVE_FAMILY";

const GET_PROVIDERS = "GET_PROVIDERS";
const ADD_PROVIDER = "ADD_PROVIDER";
const REMOVE_PROVIDER = "REMOVE_PROVIDER";

const GET_VISITS = "GET_VISITS";

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
    payload: axios.post("/api/family/", obj)
  };
}

export function getProviders() {
  return {
    type: GET_PROVIDERS,
    payload: axios.get("/api/providers/")
  };
}

export function removeProvider(id) {
  return {
    type: REMOVE_PROVIDER,
    payload: axios.delete(`/api/providers/${id}`)
  };
}

export function addProvider(obj) {
  return {
    type: ADD_PROVIDER,
    payload: axios.post("/api/providers/", obj)
  };
}

export function getVisits() {
  return {
    type: GET_VISITS,
    payload: axios.get("/api/visits/")
  };
}

const initialState = {
  family: [],
  providers: [],
  visits: [],
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
    case "REMOVE_FAMILY_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "GET_PROVIDERS_PENDING":
      return { ...state, isLoading: true };
    case "GET_PROVIDERS_FULFILLED":
      return { ...state, isLoading: false, providers: action.payload.data };
    case "GET_PROVIDERS_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "ADD_PROVIDER_PENDING":
      return { ...state, isLoading: true };
    case "ADD_PROVIDER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        providers: [...state.providers, action.payload.data]
      };
    case "ADD_PROVIDER_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "REMOVE_PROVIDER_PENDING":
      return { ...state, isLoading: true };
    case "REMOVE_PROVIDER_FULFILLED":
      return { ...state, isLoading: false, provider: action.payload.data };
    case "REMOVE_PROVIDER_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "GET_VISITS_PENDING":
      return { ...state, isLoading: true };
    case "GET_VISITS_FULFILLED":
      return { ...state, isLoading: false, visits: action.payload.data };
    case "GET_VISITS_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}
