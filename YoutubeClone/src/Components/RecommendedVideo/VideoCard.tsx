import { useEffect, useState } from "react";
import css from "./RecommendedVideo.module.scss";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

//presents the information in a readable format in the form of a card
import { Link } from "react-router-dom";
const VideoCard = (props) => {
  return (
    <div className={css.VideoCard}>
      <Link to={`/video/:${props.SingleVideo.videoId}`}>
        <img src={props.SingleVideo.image} width="100%" height="100%" />
      </Link>
      <div className={css.VideoCard_Content}>
        {" "}
        <Avatar
          classes={{ root: css.VideoCard_ChannelAvatar }}
          src={props.SingleVideo.channelImage}
        />
        <div>
          <Typography variant="body2" gutterBottom component="div">
            <strong> {props.SingleVideo.title} </strong>
          </Typography>

          <Typography variant="body2" gutterBottom component="div">
            {props.SingleVideo.channel}
          </Typography>

          <Typography variant="body2" gutterBottom component="div">
            {props.SingleVideo.views} {props.SingleVideo.timestamp}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
