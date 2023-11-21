import React, { createContext, useState } from 'react'


export const AllPostContext = createContext(null);

function ContextAllPost({ children }) {
    const [allPosts, setAllPost] = useState([])
    return (
        <AllPostContext.Provider value={{ allPosts, setAllPost }}>
            {children}
        </AllPostContext.Provider>
    )
}

export default ContextAllPost