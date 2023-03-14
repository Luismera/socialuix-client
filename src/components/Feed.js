import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getFeeds } from "../services/feedService";
import FeedCard from "./FeedCard";
import UserAvatar from "./UserAvatar";

function Feed() {
  const { user } = useAuth();
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const resp = await getFeeds();
        console.log("resp :>> ", resp);
        setFeeds(resp);
      } catch (error) {}
    };

    if (!isCancelled) fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="card o-hidden border-0 shadow-lg">
        <div className="card-body p-0">
          <div className="p-3">
            <div className="d-flex align-items-center">
              <UserAvatar name={user?.name} />
              <button
                type="button"
                className="btn btn-outline-dark btn-block btn-round"
              >
                Crear publicacion
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {feeds.length > 0 ? (
        feeds.map((feed, i) => <FeedCard feed={feed} key={i} />)
      ) : (
        <p className="text-center my-5">No hay ninguna publicacion</p>
      )}
    </div>
  );
}

export default Feed;
