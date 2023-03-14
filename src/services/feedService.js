import { api } from "../config/ApiConfig";
import { getToken } from "../helpers/auth";

export const getFeeds = async () => {
  try {
    const { data } = await api.get("/feed", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postCommentFeed = async ({ feedId, content, parent }) => {
  try {
    const { data } = await api.post(
      `/feed/${feedId}/comment`,
      {
        content,
        parent,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
