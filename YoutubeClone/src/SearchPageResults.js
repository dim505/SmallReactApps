import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";
import CSS from "./SearchPageResults.module.scss"
import moment from "moment";
import numeral from "numeral";
import { Link } from 'react-router-dom';
const SearchPageResults = () => {
    var SearchQuery = useParams()
    console.log(SearchQuery)
    const [VideoRows, setVideoRows] = useState([]);
    useEffect(() => {
        axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&type=video&q=${SearchQuery.searchQuery}&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then(response => {
          createVideoRows(response.data['items']);
          //setIsError(false);
        })
        .catch(error => {
          console.log(error);
          //setIsError(true);
          //setIsLoading(false);
        })

    }, [SearchQuery])
    

    async function createVideoRows(videos) {
        let newVideoRows = [];
        for (const video of videos) {
          const videoId = video.id.videoId;
          const response = await axios
                                  .get(`https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
          const views = response.data.items[0].statistics.viewCount;
          const snippet = video.snippet;
          const title = snippet.title;
          const timestamp = snippet.publishedAt;
          const channel = snippet.channelTitle;
          const description = snippet.description;
          const image = snippet.thumbnails.medium.url;
                              
          newVideoRows.push({
            videoId,
            title,
            image,
            views,
            timestamp,
            channel, 
            description
          });
        };
        setVideoRows(newVideoRows);
        //setIsLoading(false);
      }

    return ( 
      <>

<Grid 
  justifyContent="center"
  container>
           {VideoRows.map((video) => {

return (
  <>
  <Grid item xs={2}/> 
  <Grid item xs={8}> 
  
  <Grid 
    classes={{root: CSS.SearchPageResults_VideoContainer}}
  container> 
    <Grid item xs={4}>
        <Link to={`/video/:${video.videoId}`} >
        <img src={video.image} width="100%" height="100%"/>
        </Link>
      </Grid>
      <Grid item xs={8}>
    <div className={CSS.SearchPageResults_VideoContent}>
      <Typography variant="body1" gutterBottom component="div">
          <strong> {video.title} </strong>
          </Typography>


          <Typography variant="body2" gutterBottom component="div">
          {video.channel} | {numeral(video.views).format('0a')} | {moment(video.timestamp, "YYYY-MM-DD").fromNow()}
          </Typography>


          <Typography variant="body2" gutterBottom component="div">
          {video.description}
          </Typography>
      </div>    

   
      </Grid>
  </Grid>
  
  
  </Grid>
  <Grid item xs={2}/> 
  </>
  )
})}
</Grid>

    </>
    )

}

export default SearchPageResults;