import { createContext, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';

export const CommentsContext = createContext();

export function useComments() {
    return useContext(CommentsContext);
  }

export function CommentsProvider({ children, postOwnerId, userId }) {
    const [comments, setComments] = useState([])

    const params = useParams()

    async function getPostComments() {
        const res = await fetch(`/api/posts/${params.postId}/comments`);
        console.log('i ran')
        if (res.ok) {
           const data = await res.json();
           setComments(data.comments)
        } else {
           return "Something went wrong.";
        }
     }
  
     useEffect(() => {
          
        getPostComments();
        // setComments(comments)
  
     }, []);

    return (
      <CommentsContext.Provider value={{ comments, setComments, postOwnerId, getPostComments, userId }}>
        {children}
      </CommentsContext.Provider>
    )
  }
