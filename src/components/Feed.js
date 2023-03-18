import React, { useEffect, useState } from "react";
import launchToast from "../helpers/toastHelper";
import { useAuth } from "../hooks/useAuth";
import { deleteFeed, getFeeds } from "../services/feedService";
import FeedCard from "./FeedCard";
import FeedForm from "./FeedForm";
import UserAvatar from "./UserAvatar";

function Feed() {
  const { user } = useAuth();
  const [feeds, setFeeds] = useState([]);
  const [openFeedForm, setOpenFeedForm] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState();

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const resp = await getFeeds();
        setFeeds(resp);
        setSelectedFeed();
      } catch (error) {}
    };

    if (!isCancelled && !openFeedForm && !refreshData) fetchData();
    return () => {
      isCancelled = true;
    };
  }, [openFeedForm, refreshData]);

  const handlerEditFeed = (currentFeed) => {
    setSelectedFeed(currentFeed);
    setOpenFeedForm(true);
  };

  const handlerRemoveFeed = async (currentFeed) => {
    setRefreshData(true);
    try {
      await deleteFeed(currentFeed._id);
      launchToast("Publicacion eliminada exitosamente", "success");
      setRefreshData(false);
    } catch (error) {
      launchToast("Error al eliminar la publicacion", "error");
      setRefreshData(false);
    }
  };

  return (
    <div>
      {/* {openFeedForm && } */}
      <div className="card o-hidden border-0 shadow-lg">
        <div className="card-body p-0">
          <div className="p-3">
            <div className="d-flex align-items-center">
              <UserAvatar name={user?.name} />
              <button
                type="button"
                className="btn btn-outline-dark btn-block btn-round"
                onClick={() => setOpenFeedForm(true)}
              >
                Crear publicacion
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {feeds.length > 0 ? (
        feeds.map((feed, i) => (
          <FeedCard
            feed={feed}
            key={i}
            handlerEditFeed={handlerEditFeed}
            setRefreshData={setRefreshData}
            handlerRemoveFeed={handlerRemoveFeed}
          />
        ))
      ) : (
        <p className="text-center my-5">No hay ninguna publicacion</p>
      )}
      <FeedForm
        isOpen={openFeedForm}
        handlerClose={() => setOpenFeedForm(false)}
        defaultData={selectedFeed}
      />
    </div>
  );
}

export default Feed;
