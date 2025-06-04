// const BASE_URL = "http://localhost:5000/api/v1";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://docuvault-4qyt.onrender.com/api";


const API_ENDPOINTS={
   dashboardDocs: `${BASE_URL}/documents`,
   loginUser: `${BASE_URL}/auth/login` ,
   deleteDocuments: (id) => `${BASE_URL}/documents/${id}`,
   signupUser : `${BASE_URL}/auth/signup`,
   uploadDocs: `${BASE_URL}/documents/upload`,


}    

export default API_ENDPOINTS;
