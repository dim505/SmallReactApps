import React, {useEffect, useState} from 'react';
//import VideoCard from './../VideoCard/VideoCard';
//import './RecommendedVideos.css';
import axios from 'axios';
//import { Link } from 'react-router-dom';
//import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@mui/material/Alert';
import VideoCard from "./VideoCard"
import Grid from "@material-ui/core/Grid";


const RecommendedVideos = (props) => {
    const [VideoData, SetVideoData] = useState([])
    //const [videoCards, setVideoCards] = useState([]);
    //const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      axios
        .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=12&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then(response => {
            console.log(response.data.items)
            SetVideoData(response.data.items)
            //createVideoCards(response.data.items);
        })
        .catch(error => {
          console.log(error);
          setIsError(true);
        })
    }, [])
    if(isError) {
      return <Alert severity="error" className='loading'>No Results found!</Alert>
    }

    
    return (

      <>

                 {VideoData.map((SingleVideo) => {
                   return (
                   <Grid item xs={props.BreakPoints.xs} sm={props.BreakPoints.sm} md={props.BreakPoints.md}>
                        <VideoCard SingleVideo={SingleVideo} />
                   </Grid>)
                })}
             
</>
    )
}

export default RecommendedVideos;
