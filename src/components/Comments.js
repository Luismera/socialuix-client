import React, { useState } from "react";
import { postCommentFeed } from "../services/feedService";
import CommentForm from "./CommentForm";
import UserAvatar from "./UserAvatar";
import moment from "moment";

function Comments({ feedId, comments, setRefreshData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [toogleComment, setToogleComment] = useState(false);
  const [responseComment, setResponseComment] = useState([]);

  const saveComment = async (data) => {
    setIsLoading(true);
    setRefreshData(true);
    try {
      const body = {
        ...data,
        feedId,
        parent: responseComment[0] ? responseComment[0] : "0",
      };
      await postCommentFeed(body);
      setResponseComment([]);
      setIsLoading(false);
      setRefreshData(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-light mb-3"
        onClick={() => setToogleComment(true)}
      >
        <i className="fa-regular fa-comment-dots"></i> Comentar
      </button>
      {toogleComment && (
        <CommentForm
          isLoading={isLoading}
          saveComment={saveComment}
          cancelCallback={() => setToogleComment(false)}
        />
      )}
      <Tree
        data={comments}
        saveComment={saveComment}
        responseComment={responseComment}
        setResponseComment={setResponseComment}
        isLoading={isLoading}
      />
    </div>
  );
}

const Tree = ({ data = [], ...props }) => {
  return (
    <div>
      {data.map((comment, i) => (
        <TreeNode key={i} node={comment} {...props} />
      ))}
    </div>
  );
};

const TreeNode = ({ node, ...props }) => {
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = node.children && node.children.length > 0 ? true : false;
  return (
    <div className="d-flex mb-3">
      <UserAvatar name={node.user.name} size={38} />
      <div className="flex-fill">
        <p className="p-3 bg-light m-0">
          <div className="fw-bold mb-1">
            {node.user.name} | {moment(node.createdAt).format("ll")}
          </div>
          {node.content}
        </p>
        <button
          type="button"
          className="link"
          onClick={() => props.setResponseComment([node._id])}
        >
          Responder
        </button>
        {hasChild && (
          <button
            onClick={(e) => setChildVisiblity((v) => !v)}
            type="button"
            className={`link mx-3 d-inline d-tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >
            {childVisible ? "Ocultar respuestas" : "Ver respuestas"}
          </button>
        )}

        {props.responseComment.includes(node._id) && (
          <CommentForm
            saveComment={props.saveComment}
            isLoading={props.isLoading}
            cancelCallback={() => props.setResponseComment([])}
          />
        )}

        {childVisible && hasChild && (
          <div className="d-tree-content">
            <Tree data={node.children} {...props} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
