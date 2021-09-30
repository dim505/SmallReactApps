import { useEffect, useState } from "react";
import css from "./RecommendedVideo.module.scss";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import { Link } from 'react-router-dom';
const VideoCard = (props) => {
  const [ChannelImage, SetChannelImage] = useState("");
  useEffect(async () => {
    ///        const views = video.statistics.viewCount;
    //const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
    //const channel = snippet.channelTitle;
    const channelId = props.SingleVideo.snippet.channelId;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
    SetChannelImage(channelImage);
    console.log(props);
    console.log();
  }, []);

  return (
    
   <div className={css.VideoCard}>
    <Link to={`/video/:${props.SingleVideo.id}`}>
      <img
        src={props.SingleVideo.snippet.thumbnails.medium.url}
        width="100%"
        height="100%"
      />
     </Link>
      <div className={css.VideoCard_Content}>
        {" "}
        <Avatar
        classes={{root: css.VideoCard_ChannelAvatar}}
        src={ChannelImage} />
        <div>
          <Typography variant="body2" gutterBottom component="div">
            <strong> {props.SingleVideo.snippet.title} </strong>
          </Typography>

          <Typography variant="body2" gutterBottom component="div">
            {props.SingleVideo.snippet.channelTitle}
          </Typography>

          <Typography variant="body2" gutterBottom component="div">
          {numeral(props.SingleVideo.statistics.viewCount).format('0a')} views | {moment(props.SingleVideo.snippet.publishedAt, "YYYY-MM-DD").fromNow()}
          </Typography>
        </div>
      </div>
    </div>
   
  );
};

export default VideoCard;
