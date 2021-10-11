import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Alert from "@mui/material/Alert";
import VideoCard from "./VideoCard";
import Grid from "@material-ui/core/Grid";
 
import moment from "moment";
import numeral from "numeral";
import CSS from "./RecommendedVideo.module.scss";
//parents that will display recommended videos for related youtube video that the user is watching
const RecommendedVideos = (props) => {
  //holds the video data for the recommeded video
  const [VideoData, SetVideoData] = useState<Array>([]);
  //displays loader
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //shows error when it errors out
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    //shows loader 
    setIsLoading(true);
    var url = "";
    //changes URL depending on where its being used 
    if (props.Location === "home") {
      url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=12&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    } else {
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${props.VideoID}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    }
    //makes API call
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        //SetVideoData(response.data.items)
        //builds out information from response 
        createVideoCards(response.data.items);
      })
      .catch((error) => {
        //turns off loader
        setIsLoading(false);
        //shows error message
        setIsError(true);
      });
  }, [props.Location, props.VideoID]);

  //extracts information from API response 
  async function createVideoCards(videoItems) {
    let newVideoCards = [];
    for (const video of videoItems) {
      //sometimes the API returns bad data, this skips that 
      if (video.snippet === undefined) {
        continue;
      }
      var videoId = "";
      //diff in data format for sidebar and home page data
      if (props.Location === "sidebar") {
        videoId = video.id.videoId;
      } else {
        videoId = video.id;
      }
      const snippet = video.snippet;
      const channelId = snippet.channelId;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      const channelImage = response.data.items[0].snippet.thumbnails.medium.url;

      const title = snippet.title;
      const image = snippet.thumbnails.medium.url;
      var views = "";
      if (props.Location === "home") {
        views = numeral(video.statistics.viewCount).format("0a") + " views | ";
      }

      const timestamp = moment(snippet.publishedAt, "YYYY-MM-DD").fromNow();
      const channel = snippet.channelTitle;

      newVideoCards.push({
        videoId,
        image,
        title,
        channel,
        views,
        timestamp,
        channelImage,
      });
    }
    SetVideoData(newVideoCards);
    setIsLoading(false);
  }
//returns error is error flag is set
  if (isError) {
    return (
      <Alert severity="error" className="loading">
        No Results found!
      </Alert>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className={CSS.Loader}>
          <CircularProgress size="200px" />
        </div>
      ) : (
        <div />
      )}

      {VideoData.map((SingleVideo) => {
        return (
          
            <Grid
              item
              xs={props.BreakPoints.xs}
              sm={props.BreakPoints.sm}
              md={props.BreakPoints.md}
            >
            
              <VideoCard SingleVideo={SingleVideo} />
            
            </Grid>
          
        );
      })}
    </>
  );
};

export default RecommendedVideos;
