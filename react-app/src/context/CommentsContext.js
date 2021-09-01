import { createContext, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';

export const CommentsContext = createContext();

export function useComments() {
    return useContext(CommentsContext);
  }

export function CommentsProvider({ children, postOwnerId, userId, postId }) {
    const [comments, setComments] = useState([])

    const params = useParams()

    async function getPostComments(id) {
        const res = await fetch(`/api/posts/${id}/comments`);
        if (res.ok) {
           const data = await res.json();
           setComments(data.comments)
        } else {
           return "Something went wrong.";
        }
     }
  // Comments for a post are retrieved on first render
     useEffect(() => {
          
        getPostComments(params.postId);
  
     }, [params.postId]);

    return (
      <CommentsContext.Provider value={{ comments, setComments, postOwnerId, getPostComments, userId, postId }}>
        {children}
      </CommentsContext.Provider>
    )
  }
