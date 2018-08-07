import axios from "axios";

const GET_FAMILY = "GET_FAMILY";
const ADD_FAMILY = "ADD_FAMILY";
const REMOVE_FAMILY = "REMOVE_FAMILY";
const UPDATE_FAMILY_NAME = "UPDATE_FAMILY_NAME";
const UPDATE_FAMILY_IMAGE = "UPDATE_FAMILY_IMAGE";
const UPDATE_FAMILY_DOB = "UPDATE_FAMILY_DOB";

const GET_PROVIDERS = "GET_PROVIDERS";
const ADD_PROVIDER = "ADD_PROVIDER";
const REMOVE_PROVIDER = "REMOVE_PROVIDER";
const UPDATE_PROVIDER = "UPDATE_PROVIDER";
const UPDATE_PROVIDER_NAME = "UPDATE_PROVIDER_NAME";
const UPDATE_PROVIDER_PRACTICE_NAME = "UPDATE_PROVIDER_PRACTICE_NAME";
const UPDATE_PROVIDER_ADDRESS = "UPDATE_PROVIDER_ADDRESS";
const UPDATE_PROVIDER_PHOTO = "UPDATE_PROVIDER_PHOTO";
const UPDATE_PROVIDER_PHONE = "UPDATE_PROVIDER_PHONE";

const GET_VISITS = "GET_VISITS";
const REMOVE_VISIT = "REMOVE_VISIT";
const ADD_VISIT = "ADD_VISIT";
const UPDATE_VISIT_DATE = "UPDATE_VISIT_DATE";
const UPDATE_VISIT_DETAILS = "UPDATE_VISIT_DETAILS";
const UPDATE_VISIT_RX = "UPDATE_VISIT_RX";
const UPDATE_VISIT_BALANCE = "UPDATE_VISIT_BALANCE";

const GET_USER = "GET_USER";
const GET_USERS_ID = "GET_USERS_ID";
const GET_USERS_EMAIL = "GET_USERS_EMAIL";
const GET_USERS_DISPLAYNAME = "GET_USERS_DISPLAYNAME";
const GET_USERS_PICTURE = "GET_USERS_PICTURE";
const DELETE_USER = "DELETE_USER";

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

export function updateFamilyName(id, name) {
  return {
    type: UPDATE_FAMILY_NAME,
    payload: axios.put(`/api/familyName/${id}`, name)
  };
}

export function updateFamilyImage(id, image) {
  return {
    type: UPDATE_FAMILY_IMAGE,
    payload: axios.put(`/api/familyImage/${id}`, image)
  };
}

export function updateFamilyDob(id, dob) {
  return {
    type: UPDATE_FAMILY_DOB,
    payload: axios.put(`/api/familyDob/${id}`, dob)
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

export function updateProvider(id, obj) {
  return {
    type: UPDATE_PROVIDER,
    payload: axios.put(`/api/providers/${id}`, obj)
  };
}

export function updateProviderName(id, name) {
  return {
    type: UPDATE_PROVIDER_NAME,
    payload: axios.put(`/api/providerName/${id}`, name)
  };
}

export function updateProviderPracticeName(id, specialty) {
  return {
    type: UPDATE_PROVIDER_PRACTICE_NAME,
    payload: axios.put(`/api/providerPracticeName/${id}`, specialty)
  };
}

export function updateProviderAddress(id, address) {
  return {
    type: UPDATE_PROVIDER_ADDRESS,
    payload: axios.put(`/api/providerAddress/${id}`, address)
  };
}

export function updateProviderPhoto(id, photo) {
  return {
    type: UPDATE_PROVIDER_PHOTO,
    payload: axios.put(`/api/providerPhoto/${id}`, photo)
  };
}

export function updateProviderPhone(id, phone) {
  return {
    type: UPDATE_PROVIDER_PHONE,
    payload: axios.put(`/api/providerPhone/${id}`, phone)
  };
}

export function getVisits() {
  return {
    type: GET_VISITS,
    payload: axios.get("/api/visits/")
  };
}

export function removeVisit(id) {
  return {
    type: REMOVE_VISIT,
    payload: axios.delete(`/api/visits/${id}`)
  };
}

export function addVisit(obj) {
  return {
    type: ADD_VISIT,
    payload: axios.post("/api/visits/", obj)
  };
}

export function updateVisitDate(id, date) {
  return {
    type: UPDATE_VISIT_DATE,
    payload: axios.put(`/api/visitDate/${id}`, date)
  };
}

export function updateVisitDetails(id, details) {
  return {
    type: UPDATE_VISIT_DETAILS,
    payload: axios.put(`/api/visitDetails/${id}`, details)
  };
}

export function updateVisitRx(id, rx) {
  return {
    type: UPDATE_VISIT_RX,
    payload: axios.put(`/api/visitRx/${id}`, rx)
  };
}

export function updateVisitBalance(id, balance) {
  return {
    type: UPDATE_VISIT_BALANCE,
    payload: axios.put(`/api/visitBalance/${id}`, balance)
  };
}

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/user/")
  };
}

export function getUsersId(id) {
  return {
    type: GET_USERS_ID,
    payload: id
  };
}

export function getUsersEmail(email) {
  return {
    type: GET_USERS_EMAIL,
    payload: email
  };
}

export function getUsersDisplayName(displayname) {
  return {
    type: GET_USERS_DISPLAYNAME,
    payload: displayname
  };
}

export function getUsersPicture(picture) {
  return {
    type: GET_USERS_PICTURE,
    payload: picture
  };
}

export function deleteUser() {
  return {
    type: DELETE_USER,
    payload: axios.delete(`/api/user/0`)
  };
}

const initialState = {
  family: [],
  providers: [],
  visits: [],
  users: [],
  isLoading: false,
  error: ""
};

export default function reducer(state = initialState, action) {
  // toggle to see what passes through reducer:
  //console.log(action.payload);
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
      return { ...state, isLoading: false, family: action.payload.data };
    case "ADD_FAMILY_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "REMOVE_FAMILY_PENDING":
      return { ...state, isLoading: true };
    case "REMOVE_FAMILY_FULFILLED":
      return { ...state, isLoading: false, family: action.payload.data };
    case "REMOVE_FAMILY_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "UPDATE_FAMILY_NAME_REJECTED":
      return { ...state, isLoading: true, error: action.payload };
    case "UPDATE_FAMILY_NAME_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_FAMILY_NAME_FULFILLED":
      return { ...state, isLoading: false, family: action.payload.data };

    case "UPDATE_FAMILY_IMAGE_REJECTED":
      return { ...state, isLoading: true, error: action.payload };
    case "UPDATE_FAMILY_IMAGE_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_FAMILY_IMAGE_FULFILLED":
      return { ...state, isLoading: false, family: action.payload.data };

    case "UPDATE_FAMILY_DOB_REJECTED":
      return { ...state, isLoading: true, error: action.payload };
    case "UPDATE_FAMILY_DOB_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_FAMILY_DOB_FULFILLED":
      return { ...state, isLoading: false, family: action.payload.data };

    case "GET_PROVIDERS_PENDING":
      return { ...state, isLoading: true };
    case "GET_PROVIDERS_FULFILLED":
      return { ...state, isLoading: false, providers: action.payload.data };
    case "GET_PROVIDERS_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "ADD_PROVIDER_PENDING":
      return { ...state, isLoading: true };
    case "ADD_PROVIDER_FULFILLED":
      return { ...state, isLoading: false, providers: action.payload.data };

    case "UPDATE_PROVIDER_REJECTED":
      return { ...state, isLoading: true, error: action.payload };
    case "UPDATE_PROVIDER_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_PROVIDER_FULFILLED":
      return { ...state, isLoading: false, providers: action.payload.data };

    case "UPDATE_PROVIDER_NAME_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_PROVIDER_NAME_FULFILLED":
      return { ...state, isLoading: false, providers: action.payload.data };
    case "UPDATE_PROVIDER_NAME_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "UPDATE_PROVIDER_PRACTICE_NAME_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "UPDATE_PROVIDER_PRACTICE_NAME_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_PROVIDER_PRACTICE_NAME_FULFILLED":
      return { ...state, isLoading: false, providers: action.payload.data };

    case "UPDATE_PROVIDER_ADDRESS_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "UPDATE_PROVIDER_ADDRESS_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_PROVIDER_ADDRESS_FULFILLED":
      return { ...state, isLoading: false, providers: action.payload.data };

    case "UPDATE_PROVIDER_PHOTO_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "UPDATE_PROVIDER_PHOTO_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_PROVIDER_PHOTO_FULFILLED":
      return { ...state, isLoading: false, providers: action.payload.data };

    case "UPDATE_PROVIDER_PHONE_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "UPDATE_PROVIDER_PHONE_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_PROVIDER_PHONE_FULFILLED":
      return { ...state, isLoading: false, providers: action.payload.data };

    case "ADD_PROVIDER_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "REMOVE_PROVIDER_PENDING":
      return { ...state, isLoading: true };
    case "REMOVE_PROVIDER_FULFILLED":
      return { ...state, isLoading: false, providers: action.payload.data };
    case "REMOVE_PROVIDER_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "GET_VISITS_PENDING":
      return { ...state, isLoading: true };
    case "GET_VISITS_FULFILLED":
      return { ...state, isLoading: false, visits: action.payload.data };
    case "GET_VISITS_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "REMOVE_VISIT_PENDING":
      return { ...state, isLoading: true };
    case "REMOVE_VISIT_FULFILLED":
      return { ...state, isLoading: false, visits: action.payload.data };
    case "REMOVE_VISIT_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "ADD_VISIT_PENDING":
      return { ...state, isLoading: true };
    case "ADD_VISIT_FULFILLED":
      return { ...state, isLoading: false, visits: action.payload.data };
    case "ADD_VISIT_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "UPDATE_VISIT_DATE_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_VISIT_DATE_FULFILLED":
      return { ...state, isLoading: false, visits: action.payload.data };
    case "UPDATE_VISIT_DATE_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "UPDATE_VISIT_DETAILS_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "UPDATE_VISIT_DETAILS_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_VISIT_DETAILS_FULFILLED":
      return { ...state, isLoading: false, visits: action.payload.data };

    case "UPDATE_VISIT_RX_REJECTED":
      return { ...state, isLoading: true, error: action.payload };

    case "UPDATE_VISIT_RX_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_VISIT_RX_FULFILLED":
      return { ...state, isLoading: false, visits: action.payload.data };

    case "UPDATE_VISIT_BALANCE_REJECTED":
      return { ...state, isLoading: true, error: action.payload };
    case "UPDATE_VISIT_BALANCE_PENDING":
      return { ...state, isLoading: true };
    case "UPDATE_VISIT_BALANCE_FULFILLED":
      return { ...state, isLoading: false, visits: action.payload.data };

    case "GET_USER_PENDING":
      return { ...state, isLoading: true };
    case "GET_USER_FULFILLED":
      return { ...state, isLoading: false, users: action.payload.data };
    case "GET_USER_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "GET_USERS_ID_PENDING":
      return { ...state, isLoading: true };
    case "GET_USERS_ID_FULFILLED":
      return { ...state, isLoading: false, users: action.payload.data };
    case "GET_USERS_ID_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "GET_USERS_EMAIL_PENDING":
      return { ...state, isLoading: true };
    case "GET_USERS_EMAIL_FULFILLED":
      return { ...state, isLoading: false, users: action.payload.data };
    case "GET_USERS_EMAIL_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "GET_USERS_DISPLAYNAME_PENDING":
      return { ...state, isLoading: true };
    case "GET_USERS_DISPLAYNAME_FULFILLED":
      return { ...state, isLoading: false, users: action.payload.data };
    case "GET_USERS_DISPLAYNAME_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "GET_USERS_PICTURE_PENDING":
      return { ...state, isLoading: true };
    case "GET_USERS_PICTURE_FULFILLED":
      return { ...state, isLoading: false, users: action.payload.data };
    case "GET_USERS_PICTURE_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    case "REMOVE_USER_PENDING":
      return { ...state, isLoading: true };
    case "REMOVE_USER_FULFILLED":
      return { ...state, isLoading: false, user: action.payload.data };
    case "REMOVE_USER_REJECTED":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}
