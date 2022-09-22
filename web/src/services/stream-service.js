import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/api/v1/streams",
});

export function getStreams() {
  return http.get().then(res => res.data)
}

export function getStream(id) {
  // TODO
}
