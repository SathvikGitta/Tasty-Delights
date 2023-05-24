import {HiArrowTrendingUp} from "react-icons/hi2"
import TrendingCard from "./TrendingCard"
import axios from "axios";
import { useEffect,useState } from "react";

function Trendingsection() {
    const[trendData,setTrendData] = useState([]);

    // Fetch Data 
      {useEffect(()=>{
        fetchTrending();
        },[])}

        const fetchTrending = async () =>{
          try {
            const response  = await axios.get("http://localhost:3001/recipes");
            setTrendData(response.data);
          }
          catch(error){
            console.log(error);
          }
        };


  return (
    <>
    <main className="trending-container">
        <h3 className='trending-title'><HiArrowTrendingUp className="arrow" size={20}/> Trending on Tasty Delights</h3>
        <section className="trending-grid-layout">  
        {/* Layout for grid items */}


        {/* Mapping the request */}
        {
          trendData.slice(0,6).map((item,key)=>{
            return (
              <>
              <div key={key}>
                <TrendingCard userName = {item.userName} Title = {item.title} Description = {item.titleDescription} Date= {item.date} Category = {item.category}/>
              </div>
              </>
            )
          })
        } 
        {/* End of Grid  */}
        </section>  
    </main>
    </>
  )
}

export default Trendingsection