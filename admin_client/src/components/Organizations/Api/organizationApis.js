import axios from "axios";

export const fetchOrganizations = async (pagination) => {
  return await axios.get(`/api/v1/organizations?page=${pagination.current}`);
};

export const fetchOrganization = async (organization_id) => {
  return await axios.get(
    `/api/v1/organization/?organization_id=${organization_id}`
  );
};

export const createOrganization = async (formObject) => {
  return await axios.post("/api/v1/organizations/create", { ...formObject });
};

export const updateOrganization = async (organization_id, formObject) => {
  return await axios.put(`/api/v1/organization/${organization_id}`, {
    ...formObject,
  });
};
