import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      console.error("unauthenticated, redirect to login");
      localStorage.clear();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function getProfile() {
  return http.get("/profile");
}

export function getStreams() {
  return http.get("/streams");
}

export function getStream(id) {
  return http.get(`/streams/${id}`);
}

export function createStream(stream) {
  return http.post("/streams", stream);
}

export function likeStream(id) {
  return http.post(`/streams/${id}/like`);
}

export function commentStream(id, text) {
  return http.post(`/streams/${id}/comments`, { text });
}

export function authenticate(data) {
  return http.post("/authenticate", data);
}
