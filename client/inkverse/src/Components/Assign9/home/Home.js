import React from 'react'
// import { Link } from 'react-router-dom'
import './Home.css'
import homebackground from '../../../Images/homebackground.jpg'
import home1bg from '../../../Images/home1bg.jpg'
import  firststory from '../../../Images/firststory.png'
import { Link,NavLink } from 'react-router-dom'
import story2 from '../../../Images/story2.jpg'
import story4 from '../../../Images/story4.jpg'


function Home() {
  
  return (
    <div>
      <div className='background' >
        <img src={homebackground} ></img>
      </div>
      <div class="card mb-3 w-75 rounded-2"  id="myCard">
  <div class="row g-0 d-flex  rounded-2 fullcard2 ">
    <div class="col-md-4 stimg">
      <img src={firststory} class="img-fluid rounded-start" alt="Placeholder"/>
    </div>
    <div class="col-lg-8">
      <div class="card-body bodytext ">
        <h5 class="card-title titletext "  >Stopping By Woods On a Snow Evening</h5>
        <p class="card-text">Whose woods these are I think I know.</p>
        <p class="card-text">His house is in the village though;</p>
        <p class="card-text">He will not see me stopping here.</p>
        <p class="card-text">To watch his woods fill up with snow.</p>
        <p class="card-text">My little horse must think it queer</p>
        <p class="card-text">To stop without a farmhouse near</p>
        <p class="card-text">Between the woods and frozen lake</p>
        <p class="card-text">The darkest evening of the year.......</p>
        <Link to={"/signin"} ><button className='btn btn-outline-success btn-primary text-light ' > ReadMore..</button></Link>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
    </div>


    
    <div class="card mb-3 w-75 rounded-2"  id="myCard">
  <div class="row g-0 d-flex  rounded-2 fullcard2 ">
    <div class="col-md-4 stimg">
      <img src={story2} class="img-fluid rounded-start" alt="Placeholder"/>
    </div>
    <div class="col-lg-8">
      <div class="card-body bodytext ">
        <h5 class="card-title titletext "  >The Gift Of Magi</h5>
        <div className='w-50' >
        <p class="card-text spacing ">A poor couple, Della and Jim, desperately want to buy each other perfect Christmas gifts. Della sells her beautiful hair to buy a platinum fob chain for Jim's watch. Jim pawns his watch to buy combs for Della's long hair. Though the gifts are useless without their sacrifices, they realize the true value lies in the love behind them. They are the wisest gift-givers, proving love is the greatest treasure.</p>
        </div>
        <Link to={"/signin"} ><button className='btn btn-outline-success btn-primary text-light ' > ReadMore..</button></Link>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
    </div>


    <div class="card mb-3 w-75 rounded-2"  id="myCard">
  <div class="row g-0 d-flex  rounded-2 fullcard2 ">
    <div class="col-md-4 stimg">
      <img src={story4} class="img-fluid rounded-start" alt="Placeholder"/>
    </div>
    <div class="col-lg-8">
      <div class="card-body bodytext ">
        <h5 class="card-title titletext "  >I have a Dream</h5>
        <div className='w-50' >
        <p class="card-text spacing ">"I Have a Dream" by Martin Luther King, Jr. (1963):
In his iconic "I Have a Dream" speech, Martin Luther King Jr. powerfully calls for racial equality. He criticizes the ongoing struggle despite past advancements, urging America to embrace a future where people are judged by character, not skin color. Through vivid dreams of a unified nation and appeals to America's ideals, King inspires peaceful resistance in the pursuit of justice.</p>
        </div>
        <Link to={"/signin"} ><button className='btn btn-outline-success btn-primary text-light ' > ReadMore..</button></Link>
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
    </div>


    </div>
    // <div></div>

    

  )
}

export default Home



{/* <div className='abc' >
      <div style={{minHeight:'78vh'}} className='background' >
      <center><div >
        <h1 className='fw-bolder fs-1 text-dark ' >Explore Boundless Creativity: Welcome to InkVerse</h1>
        <h3 className=''>
        InkVerse is an innovative and vibrant platform designed for writers and literature enthusiasts to share their creativity and immerse themselves in a world of literary exploration. With a user-friendly interface and a wide range of features, InkVerse offers a seamless experience for both aspiring and seasoned writers.
        </h3>
        </div></center>
    </div>
    </div> */}