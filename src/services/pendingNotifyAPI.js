import api from "./axiosInstance.js";

const PendingAPI = {
  createPending: (data) => {
    const url = "/pendingNotify";
    return api.post(url, data);
  },

  getPending: (id) => {
    const url = `/pendingNotify/${id}`;
    return api.get(url);
  },

  deletePending: (id) => {
    const url = `/pendingNotify/${id}`;
    return api.delete(url);
  },

  deleteByIdRoom: (id) => {
    const url = `/pendingNotify/delete-id-room/${id}`;
    return api.delete(url);
  },
};

export default PendingAPI;
