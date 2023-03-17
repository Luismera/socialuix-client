import { api } from "../config/ApiConfig";

export const getFeeds = async () => {
  try {
    const { data } = await api.get("/feed");
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postFeed = async (feed) => {
  try {
    const { data } = await api.post("/feed", feed);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const putFeed = async (id, feed) => {
  try {
    const { data } = await api.put(`/feed/${id}`, feed);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteFeed = async (id) => {
  try {
    const { data } = await api.delete(`/feed/${id}`);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postCommentFeed = async ({ feedId, content, parent }) => {
  try {
    const { data } = await api.post(`/feed/${feedId}/comment`, {
      content,
      parent,
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
