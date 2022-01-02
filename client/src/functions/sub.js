import axios from 'axios';

// for getting category list from backend with axios
export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

// for getting single category
export const getSub = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

// for removing a category
export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

// Update a category
export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

// Create a category
export const createSub = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: { authtoken },
  });
