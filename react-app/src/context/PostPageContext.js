import { createContext, useState, useEffect } from 'react';

export const PostPageContext = createContext();

export function PostPageProvider(props) {
    const [refreshComments, setRefreshComments] = useState(false)

    return (
      <PostPageContext.Provider value={{ refreshComments, setRefreshComments }}>
        {props.children}
      </PostPageContext.Provider>
    )
  }
