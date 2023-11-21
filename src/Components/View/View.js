import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { useHistory } from "react-router-dom";
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';

function View() {
  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext)
  const history = useHistory();//if user click the refresh of the page then PostContext data will be erased so it will throws an error so that time we want redirect this page to home page

 
  useEffect(() => {
    if (postDetails && postDetails.userId) {
     

        firebase.firestore()
          .collection("users")
          .where('id', '==',  postDetails.userId)
          .get()
          .then((res) => {
            res.forEach((doc) => {
              setUserDetails(doc.data());
            });
          })
        }
  }, [postDetails]);
  
  return (
         

    <div className="viewParentDiv">

   
      <div className="imageShowDiv">
      {postDetails && postDetails.url ? (
        <img
          src={postDetails.url}
          alt=""
        />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className="rightSection">
      <div className="productDetails">
          {postDetails && postDetails.price ? (
            <>
              <p>&#x20B9; {postDetails.price} </p>
              <span>{postDetails.category}</span>
              <p>{postDetails.name}</p>
            </>
          ) : (
            <p>Product details not available</p>
          )}
        </div>

           {userDetails && (
           <div className="contactDetails">
          <p>Seller details</p>
          <p>Name:{userDetails.username}</p>
          <p>Phone Number:{userDetails.phone}</p>
        </div>)}
      </div>
    </div>
  );
}
export default View;
