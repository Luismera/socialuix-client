import React from "react";
import Comments from "./Comments";
import UserAvatar from "./UserAvatar";

function FeedCard({ feed: { _id, user, updatedAt, content, comments } }) {
  return (
    <div className="card o-hidden border-0 shadow-lg my-2">
      <div className="card-body p-0">
        <div className="p-3">
          <div className="d-flex align-items-center">
            <UserAvatar name={user?.name} />
            <div className="flex-fill post-head">
              <h6 className="post-owner">{user?.name}</h6>
              <p className="post-date">{updatedAt}</p>
            </div>
            <button className="btn btn-round">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
          <div>
            <p>{content}</p>
          </div>
          <hr />
          <Comments feedId={_id} comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
