import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useContext } from 'react';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { Link } from 'react-router-dom';
import { AllPostContext } from '../../store/AllPostContext';
import { PostContext } from '../../store/PostContext';
function Header() {

  const { allPost } = useContext(AllPostContext)
  const {setPostDetails} =useContext(PostContext)
  const history = useHistory()
  // const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)


  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("")

  const handlefilter = (e) => {
    const searchWord = e.target.value
    console.log(searchWord);
    setWordEntered(searchWord)
    const newFilter = allPost?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
     });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleSelectedSearch=(value)=>{
       setPostDetails(value)
       history.push("/view")

  }
  const handleEmptyClick=()=>{
     alert("No items found.., please search by product name");
  }
  const { user } = useContext(AuthContext);

  const logoutHandler = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        history.push("/login");
      });
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
        <input type="text" 
          placeholder="Search specific product..."
          value={wordEntered}
          onChange={handlefilter}
        />




      <div>
         {filteredData? (
            <div onClick={handleEmptyClick}> <i class="fa-solid fa-magnifying-glass"></i></div>
           ) : (
             <div id="clearBtn"  onClick={clearInput} ><i class="fa-solid fa-multiply"></i></div>
           )}
           {filteredData.length !== 0 && (
          <div className="dataResult-header">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <div key={key} className="dataItem-header" onClick={()=>handleSelectedSearch(value)}>
                  <p>{value.name} </p>
                </div>
              );
            })}
          </div>
        )}
      </div>


        </div>




        <div className="productSearch">
        
        <Search></Search> </div>
    
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ?(  user.displayName) : ( <Link to="/login">
              <span>Login</span>
            </Link>)}
       
          <hr />

        </div>


        {user &&( <span onClick={logoutHandler}>Logout</span>)}

        
          <Link to={'/create'}>
            {" "}
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
            </div>
          </Link>
       

      </div>
    </div>
  );
}

export default Header;
