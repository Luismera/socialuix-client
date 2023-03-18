import React, { useState } from "react";
import Comments from "./Comments";
import UserAvatar from "./UserAvatar";
import moment from "moment";
import { useAuth } from "../hooks/useAuth";

function FeedCard({
  feed: { _id, user, updatedAt, content, comments },
  handlerEditFeed,
  setRefreshData,
  handlerRemoveFeed,
}) {
  const { user: userAuth } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="card o-hidden border-0 shadow-lg my-2">
      <div className="card-body p-0">
        <div className="p-3">
          <div className="d-flex align-items-center">
            <UserAvatar name={user?.name} />
            <div className="flex-fill post-head">
              <h6 className="post-owner">{user?.name}</h6>
              <p className="post-date">{moment(updatedAt).format("ll")}</p>
            </div>
            {user._id === userAuth.userId ? (
              <div className="dropdown">
                <button
                  className="btn btn-round"
                  onClick={() => setDropdown(!dropdown)}
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <ul
                  className={`dropdown-menu ${dropdown ? "show" : ""}`}
                  style={{ left: "auto", right: 0 }}
                >
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setDropdown(false);
                        handlerEditFeed({ _id, content });
                      }}
                    >
                      Editar
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setDropdown(false);
                        handlerRemoveFeed({ _id, content });
                      }}
                    >
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
          <div className="mt-3">
            <p>{content}</p>
          </div>
          <hr />
          <Comments
            feedId={_id}
            comments={comments}
            setRefreshData={setRefreshData}
          />
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
