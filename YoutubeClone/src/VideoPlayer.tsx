import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect, useContext } from "react";
import RecommendedVideos from "./RecommendedVideos"
import axios from 'axios';
import {useParams} from 'react-router';
import ThumbDownOffAltIcon from '@material-ui/icons/ThumbDown';
import ThumbUpOffAltIcon from '@material-ui/icons/ThumbUp';
import Typography from '@mui/material/Typography';
import moment from "moment";
import numeral from "numeral";
import Avatar from '@mui/material/Avatar';
import CSS from "./VideoPlayer.module.scss"
const VideoPlayer = () => {

    let { videoId } = useParams();

    const [videoInfo, setVideoInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
         
        
        setVideoInfo([]);
        setIsLoading(true);
        axios
          .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId.replace(":","")}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
          .then(response => {
            console.log(response)  
            createVideoInfo(response.data['items'][0]);
              setIsError(false);
          })
          .catch(error => {
              console.log(error);
              setIsError(true);
          })
          
    }, [videoId])

    async function createVideoInfo (video) {
        const snippet = video.snippet;
        const stats = video.statistics;
        const channelId = snippet.channelId;
        const response = await axios
                              .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        
        const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
        const subs = response.data.items[0].statistics.subscriberCount;
        const publishedDate = new Date(snippet.publishedAt).toLocaleDateString('en-GB', {  
                                                                day : 'numeric',
                                                                month : 'short',
                                                                year : 'numeric'
                                                            });
        const title = snippet.title;
        const description = snippet.description;
        const channelTitle = snippet.channelTitle;
        const viewCount = stats.viewCount;
        const likeCount = stats.likeCount;
        const dislikeCount = stats.dislikeCount;

        setVideoInfo({
            title,
            description,
            publishedDate,
            channelTitle,
            channelImage,
            viewCount,
            likeCount,
            dislikeCount,
            subs
        });
        setIsLoading(false);
    }


    return (<Grid container>
        
        <Grid item xs={1} />
        <Grid item xs={7}>
<div className={CSS.VideoContainer}>
<iframe src={`https://www.youtube.com/embed/${videoId}`}  allowFullScreen/>
</div>        
        <Typography classes={{root: CSS.VideoStatContainer}} variant="body2" gutterBottom>    
            {numeral(videoInfo.viewCount).format('0,0')} Views | {moment(videoInfo.publishedDate).format('MMM Do YYYY') } | <div className={CSS.TextSpace}> <ThumbUpOffAltIcon />  {numeral(videoInfo.likeCount).format('0a') } </div>|  <div className={CSS.TextSpace}> <ThumbDownOffAltIcon /> {numeral(videoInfo.dislikeCount).format('0a') }</div>
            </Typography>
            
            <div className={CSS.VideoStatContainer}>

                <Avatar src={videoInfo.channelImage} />




                <div className={CSS.ChannelInfo}>
                <Typography  variant="body2" gutterBottom>    
                      <strong>  {videoInfo.channelTitle} </strong>
                </Typography>

                <Typography  variant="body2" gutterBottom>    
                        {numeral(videoInfo.subs).format('0a') } Subscribers
                </Typography>

                </div>
            </div>
 

            <Typography  variant="body2" gutterBottom>    
            {videoInfo.description}
            </Typography>
 
            </Grid>
        <Grid item xs={3}>
            <RecommendedVideos BreakPoints={{"xs":12,"sm": 12, "md": 12}}/>
                    
             </Grid>
             <Grid item xs={1} />
        </Grid>)

}

export default VideoPlayer