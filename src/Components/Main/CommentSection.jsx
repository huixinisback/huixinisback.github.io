import React, { useContext, useRef, useReducer, useEffect } from "react";
import { AuthContext } from "../AppContext/AppContext";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg"
import {
  setDoc,
  collection,
  doc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { PostsReducer, postActions, postsStates } from "../AppContext/PostReducer";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const comment = useRef("");
  const { user, userData } = useContext(AuthContext); // get the current user

  const commentRef = doc(collection(db, "posts", postId, "comments"));
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { ADD_COMMENT, HANDLE_ERROR } = postActions;

  // your comment
  const addComment = async (e) => {
    e.preventDefault();
    if (comment.current.value !== "") {
      try {
        await setDoc(commentRef, {
          id: commentRef.id,
          comment: comment.current.value,
          image: user?.photoURL,
          name: userData?.name?.charAt(0)?.toUpperCase() + userData?.name?.slice(1) || user?.displayName?.split(" ")[0],
          timestamp: serverTimestamp(),
          uid: user?.uid,
        });
        comment.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message); // Consider a more user-friendly error handling approach
      }
    }
  };

  // comment section
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, `posts/${postId}/comments`), orderBy("timestamp", "desc")),
      (snapshot) => {
        dispatch({
          type: ADD_COMMENT,
          comments: snapshot.docs.map((doc) => doc.data()),
        });
      },
      (err) => {
        dispatch({ type: HANDLE_ERROR });
        console.error(err.message); // Consider a more user-friendly error handling approach
      }
    );

    // Cleanup the subscription to prevent memory leaks
    return () => unsubscribe();
  }, [postId, ADD_COMMENT, HANDLE_ERROR, dispatch]);

  return (
    <div className="flex flex-col bg-white w-full py-2 rounded-b-3xl">
      <div className="flex items-center">
        <div className="mx-2">
          <Avatar size="sm" variant="circular" src={user?.photoURL || avatar}></Avatar>
        </div>
        <div className="w-full pr-2">
          <form className="flex items-center w-full" onSubmit={addComment}>
            <input
              name="comment"
              type="text"
              placeholder="Write a comment..."
              className="w-full rounded-2xl outline-none border-0 p-2 bg-gray-100"
              ref={comment}
            ></input>
            <button className="hidden" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      {state?.comments?.map((comment, index) => (
        <Comment
          key={index}
          image={comment?.image}
          name={comment?.name}
          comment={comment?.comment}
          uid={comment?.uid}
          cid={comment?.id}
          pid={postId}
        ></Comment>
      ))}
    </div>
  );
};

export default CommentSection;
