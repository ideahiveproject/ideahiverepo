

import React, { useState, useEffect } from "react";
import "../../App.css";
import data from "../../TemplateData.json";
import ProfileInvestorWrapper from "./ProfileInvestorWrapper";
import "./post.css";

const PostInvestor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentlyClicked, setRecentlyClicked] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Load recently clicked images from local storage on component mount
  useEffect(() => {
    const clicked = JSON.parse(localStorage.getItem("clicked")) || [];
    setRecentlyClicked(clicked);
  }, []);

  // Handler function for when an image is clicked
  function handleClick(val) {
    // Save clicked image to local storage
    const clicked = JSON.parse(localStorage.getItem("clicked")) || [];
    if (!clicked.some(image => image.id === val.id)) {
      clicked.unshift(val);

      localStorage.setItem("clicked", JSON.stringify(clicked.slice(0, 5)));
      setRecentlyClicked(clicked.slice(0, 5));
    }

// Clear recently clicked history when the "Clear" button is clicked
if (val === "clear") {
  localStorage.removeItem("clicked");
  setRecentlyClicked([]);
}

    // Perform any other actions (e.g. navigate to a new page)
  }

  // Handler function for selecting a category
  function handleCategorySelect(event) {
    setSelectedCategory(event.target.value);
  }



  
  // Function to filter images based on selected category
  function filterImages() {
    if (selectedCategory === "") {
      return data.filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (
          val.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        }
      });
    } else {
      const filtered = data.filter((val) => val.category === selectedCategory);
      if (searchTerm === "") {
        return filtered;
      } else {
        return filtered.filter((val) =>
          val.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
  }

  useEffect(() => {
    setFilteredData(filterImages());
  }, [selectedCategory, searchTerm]);

  // Handler function for when the save button is clicked
  function handleSaveClick(val) {

    // Add clicked image to cart page or perform any other actions
    console.log(`Image "${val.title}" added to cart`);
  }

  // Handler function for when the like button is clicked
  function handleLikeClick(val) {
    // Update the number of likes for the clicked image
    console.log(`Image "${val.title}" liked`);
    // Perform any other actions (e.g. sort the images based on the number of likes)

    {
      // Update the number of likes for the clicked image
      val.likes += 1;
      // Create a new array that is sorted based on the number of likes
      const sortedData = [...filteredData].sort((a, b) => b.likes - a.likes);
      // Update the state with the sorted array
      setFilteredData(sortedData);
    }


  }

  return (
    <div>
        <ProfileInvestorWrapper/>
      {recentlyClicked.length > 0 && (

        <div className="recentlyViewed">
      <h2>Recently Viewed</h2>

        <div className="recentlyClicked">
          
          <button onClick={() => handleClick("clear")}>Clear</button>
          {recentlyClicked.map((val) => (
            <div
              className="template"
              key={val.id}
              onClick={() => handleClick(val)}
            >
              <img src={val.image} alt="" />
              <h3>{val.title}</h3>
              <p className="Category">{val.category}</p>
            </div>

          ))}
        </div>
    </div>
        
        )}  

       
    
       {/* <div className="templateContainer"> */}

       <div className="temContainer">
       <h3>We bring together enterpreneurs,bussiness,
          and private investors to bring ideas to life
        </h3>
        
<div class="container">
  <div class="row mt-3">

    <div class="col-md-6">
      <div class="input-group rounded">
        <input type="text" class="form-control rounded" placeholder="Search here..." aria-label="Search"
          aria-describedby="search-addon" onChange={(event) => {
            setSearchTerm(event.target.value);
          }}/>
        <span class="input-group-text border-0" id="search-addon">
          <i class="bi bi-search"></i>
        </span>
      </div>
    </div>

  

    <div class="col-md-6">
      <div class="category">
        <select class="form-select" value={selectedCategory} onChange={handleCategorySelect}>
          <option value="">All</option>
          <option value="Tech">Tech</option>
          <option value="Agriculture">Agriculture</option>
        </select>
      </div>
    </div>

  </div>
</div>

</div>





        {/* <div className="template_Container"> */}
        <div className="templateContainer">

          {filteredData.map((val) => {
            return (
              <div className="template" key={val.id}>
                {/* Profile button */}
                <button className="profileButton" onClick={() => handleClick(val)}>
                  <img src={val.profileImage} alt="" /> 
                </button>
                {/* Image */} 
                <div className="imagetop">
                  <img src={val.image} alt="" />
                  </div>
                  <br></br>

 {/* Title and category */}
 <div className="detailsContainer">
                  <div className="title">
                  <h3>{val.title}</h3>

                </div>

                  <div className="category">
                    <button className="categorybutton"><p className="Category">{val.category}</p></button>
                  
                  </div>
                  </div>
                <div className="imageContainer">
                  {/* <img src={val.image} alt="" /> */}
                  <h3>{val.discription}</h3>

                 

                  <div className="overlay">
                    {/* Save button */}
                    <button className="saveButton" onClick={() => handleSaveClick(val)}>
                      Save
                    </button>
                    {/* Like button */}
                    <button className="likeButton" onClick={() => handleLikeClick(val)}>
                      Like <span>{val.likes}</span>
                    </button>
                  </div>
                </div>
               
              </div>
            );
          })}
        </div>
       </div>

    // </div>
  );
 };

 export default PostInvestor;