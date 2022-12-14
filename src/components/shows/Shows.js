import React, { useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import styles from "./styles/showsStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import useShows from "./hooks/useShows";
import { HEADER_DATE_FORMAT, INR_SYMBOL, QUERY_DATE_FORMAT } from "../../Constants";
import {
  dateFromSearchString,
  nextDateLocation,
  previousDateLocation,
} from "./services/dateService";
import ShowsRevenue from "./ShowsRevenue";
import useShowsRevenue from "./hooks/useShowsRevenue";
import SeatSelectionDialog from "./SeatSelectionDialog";
import PosterDialog from "./PosterDialog";
import FormikButton from "../formik/FormikButton";
import ScheduleMovieDialog from "./ScheduleMovies/ScheduleMovieDialog";
import { FeatureToggle } from "react-feature-toggles/lib";
import useTogggles from '../toggles/hooks/useToggles'
import useUser from "../user/hooks/useUser";

export default ({ location, history}) => {
  const classes = styles();

  const showsDate = dateFromSearchString(location.search);

  const { user } = useUser();
  const { shows, showsLoading } = useShows(showsDate);
  const { showsRevenue, updateShowsRevenue, showsRevenueLoading } =
    useShowsRevenue(showsDate);
  const [showSelectSeatDialog, setShowSelectSeatDialog] = useState(false);
  const [showPosterDialog, setShowPosterDialog] = useState(false);
  const [showScheduleMovieDialog, setShowScheduleMovieDialog] = useState(false);
  const { toggles, toggleNames } = useTogggles();
  const [scheduleMovieBtnDisable, setScheduleMovieBtnDisable] = useState(true);


  const emptyShow = {
    id: "",
    date: "",
    cost: "",
    movie: {
      id: "",
      name: "",
      duration: "",
      plot: "",
      posterLink: "",
    },
    slot: {
      id: "",
      name: "",
      startTime: "",
      endTime: "",
    },
  };
  const [selectedShow, setSelectedShow] = useState(emptyShow);
  const [selectedMoviePoster, setSelectedMoviePoster] = useState();
  const [selectedMovieName, setSelectedMovieName] = useState();

  return (
    <>
      <div className={classes.cardHeader}>
        <Typography variant="h4" className={classes.showsHeader}>
          Shows ({showsDate.format(HEADER_DATE_FORMAT)})
        </Typography>
        <div className={classes.adminUtils}>
          {user.role === "ADMIN" ?
            <>
              <FeatureToggle featureName={toggleNames.MOVIE_SCHEDULE}>
                <FormikButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={scheduleMovieBtnDisable}
                  className={classes.scheduleMovieButton}
                  name="SCHEDULE MOVIE"
                  onClick={() => {
                    setShowScheduleMovieDialog(true);
                  }}
                />
              </FeatureToggle>
              <ShowsRevenue
                showsRevenue={showsRevenue}
                showsRevenueLoading={showsRevenueLoading}
              />
            </>
            : null
          }
        </div>
      </div>
      <List className={classes.listRoot} >
        {shows.map((show) => (
          <div key={show.id} className={classes.showContainer}>
            <ListItem style={{ cursor: "pointer", padding: "2px"}}>
              <ListItemAvatar >
                <img data-testid = "poster"
                  className={classes.moviePoster}
                  src={show.movie.posterLink}
                  alt={show.movie.name + " Poster"}
                  onClick={() => {
                    setShowPosterDialog(true);
                    setSelectedMoviePoster(show.movie.posterLink);
                    setSelectedMovieName(show.movie.name);
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                onClick={() => {
                  setSelectedShow(show);
                  setShowSelectSeatDialog(true);
                } }
                primary={show.movie.name}
                secondary={
                  <>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.slotTime}
                        color="textPrimary"
                      >
                        {show.slot.startTime}
                      </Typography>
                    </ListItemText>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="subtitle2"
                        className={classes.imdbRating}
                      >
                        IMDb Rating: &thinsp;
                        {show.movie.imdbRating}
                      </Typography>
                    </ListItemText>
                  </>
                }
              />
              <ListItemText
                primary={`${INR_SYMBOL}${show.cost}`}
                className={classes.price}
                primaryTypographyProps={{ variant: "h6", color: "secondary" }}
              />
            </ListItem>
          </div>
        ))}
      </List>

      <SeatSelectionDialog
        selectedShow={selectedShow}
        updateShowsRevenue={updateShowsRevenue}
        open={showSelectSeatDialog}
        onClose={() => setShowSelectSeatDialog(false)}
      />
      <PosterDialog
        posterLink={selectedMoviePoster}
        name={selectedMovieName}
        open={showPosterDialog}
        onClose={() => setShowPosterDialog(false)}
        style={{ zIndex: 1 }}
      />

      <div className={classes.buttons}>
          <Button
            onClick={() => {
              history.push(previousDateLocation(location, showsDate));
            }}
            startIcon={<ArrowBackIcon />}
            color="primary"
            className={classes.navigationButton}
          >
            Previous Day
          </Button>
        <Button
          onClick={() => {
            history.push(nextDateLocation(location, showsDate));
          }}
          endIcon={<ArrowForwardIcon />}
          color="primary"
          className={classes.navigationButton}
        >
          Next Day
        </Button>
      </div>
      <Backdrop className={classes.backdrop} open={showsLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ScheduleMovieDialog
        date={showsDate.format(QUERY_DATE_FORMAT)}
        open={showScheduleMovieDialog}
        onClose={() => { setShowScheduleMovieDialog(false) }}
        setScheduleMovieBtnDisable={setScheduleMovieBtnDisable}
      />
    </>
  );
};
