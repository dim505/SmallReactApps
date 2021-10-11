import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import RecommendedVideos from "../RecommendedVideo/RecommendedVideos";
import axios from "axios";
import { useParams } from "react-router";
import ThumbDownOffAltIcon from "@material-ui/icons/ThumbDown";
import ThumbUpOffAltIcon from "@material-ui/icons/ThumbUp";
import Typography from "@mui/material/Typography";
import moment from "moment";
import numeral from "numeral";
import Hidden from '@mui/material/Hidden';
import Avatar from "@mui/material/Avatar";
import CSS from "./VideoPlayer.module.scss";
import Fade from "@mui/material/Fade";
import Divider from "@material-ui/core/Divider";
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';

interface Isnippet {
  title: string,
  description: string,
  channelTitle: string,
  viewCount: string,
  likeCount: string,
  dislikeCount: string
  channelId: string,
  publishedAt: string
}

interface Istats {
	viewCount: string,
	likeCount: string,
	dislikeCount: string
}


interface Ivideo {
  title: string,
  description: string,
  publishedDate: string,
  channelTitle: string,
  channelImage: string,
  viewCount: string,
  likeCount: string,
  dislikeCount: string,
  subs: string,


}

//displays the video to be played 
const VideoPlayer = () => {
  //gets the video ID
  let { videoId } = useParams();
  //shows the video info
  const [videoInfo, setVideoInfo] = useState<Ivideo>([]);
  const [ShowFullDesc, SetShowFullDesc] = useState<boolean>(false)
  //gets info related to the playing video 
  useEffect(() => {
    setVideoInfo([]);
 
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId.replace(
          ":",
          ""
        )}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      )
      .then((response) => {
        //formats the response data
        createVideoInfo(response.data["items"][0]);
 
      })
      .catch((error) => {
       console.log(error)
      });
  }, [videoId]);
  //formats the response data
  async function createVideoInfo(video) {
    const snippet : Isnippet = video.snippet;
    const stats : Istats = video.statistics;
    const channelId : string = snippet.channelId;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );

    const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
    const subs = response.data.items[0].statistics.subscriberCount;
    const publishedDate = new Date(snippet.publishedAt).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
    const title : string = snippet.title;
    const description : string= snippet.description;
    const channelTitle : string= snippet.channelTitle;
    const viewCount : string = stats.viewCount;
    const likeCount : string = stats.likeCount;
    const dislikeCount : string = stats.dislikeCount;

    setVideoInfo({
      title,
      description,
      publishedDate,
      channelTitle,
      channelImage,
      viewCount,
      likeCount,
      dislikeCount,
      subs,
    });
 
  }

  return (
    <Grid container>
      <Hidden only={["xs", "sm"]}>
      <Grid item  md={1}/>
      </Hidden>

      <Fade timeout={1000} in={true}>
        <Grid item   sm={12} md={7}>
        
          <div className={CSS.VideoContainer}>
            <iframe
              title="Youtube player"
              src={`https://www.youtube.com/embed/${videoId.replace(":", "")}`}
              allowFullScreen
            />
          </div>
          
          <Typography  variant="body1" gutterBottom>
          <strong> {videoInfo.title} </strong>
          </Typography>
          
          <Typography
            classes={{ root: CSS.VideoStatContainer }}
            variant="body2"
            gutterBottom
          >
            {numeral(videoInfo.viewCount).format("0,0")} Views |{" "}
            {moment(videoInfo.publishedDate).format("MMM Do YYYY")} |{" "}
            <div className={CSS.TextSpace}>
              {" "}
              <ThumbUpOffAltIcon classes={{root: CSS.like}} /> {numeral(videoInfo.likeCount).format(
                "0a"
              )}{" "}
            </div>
            |{" "}
            <div className={CSS.TextSpace}>
              {" "}
              <ThumbDownOffAltIcon classes={{root: CSS.dislike}} />{" "}
              {numeral(videoInfo.dislikeCount).format("0a")}
            </div>
          </Typography>


          <Divider  />
          <div className={CSS.VideoStatContainer}>
            <Avatar src={videoInfo.channelImage} />

            <div className={CSS.ChannelInfo}>
              <Typography variant="body2" gutterBottom>
                <strong> {videoInfo.channelTitle} </strong>
              </Typography>

              <Typography variant="body2" gutterBottom>
                {numeral(videoInfo.subs).format("0a")} Subscribers
              </Typography>
            </div>
          </div>

          <Typography variant="body2" gutterBottom>
          <Collapse in={ShowFullDesc} collapsedSize={40}>
            {videoInfo.description}
          </Collapse>        
            <Button onClick={() => {SetShowFullDesc(!ShowFullDesc) } }variant="text"> {ShowFullDesc ? "Show Less": "Show More"} </Button>
          </Typography>
        
        
        </Grid>
      </Fade>
      <Grid item   md={3} sm={12}>
        
      <Grid container>
        <RecommendedVideos
          VideoID={videoId.replace(":", "")}
          Location="sidebar"
          BreakPoints={{ xs: 12, sm: 6, md: 12 }}
        />
        </Grid>
      </Grid>
      <Hidden only={["xs", "sm"]}>
      <Grid item   md={1}/>
      </Hidden>
    </Grid>
  );
};

export default VideoPlayer;
