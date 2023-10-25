import {useQuery} from "react-query";
import {Wrapper} from "../style/theme";
import {IGetMovieResult, getMovies} from "../api";
import styled from "styled-components";
import {makeImagePath} from "../util/utiliy";
import {motion, AnimatePresence, useScroll} from "framer-motion";
import {useState} from "react";
import {useMatch, useNavigate} from "react-router-dom";

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

const Banner = styled.div<{$bgphoto: string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  width: 50%;
  font-size: 30px;
`;
const Slider = styled.div`
  position: relative;
  top: -300px;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{$bgphoto: string}>`
  position: relative;
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.$bgphoto});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  cursor: pointer;
`;
const Info = styled(motion.div)`
  padding: 20px 0;
  background-color: ${(props) => props.theme.light.bgColor};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 20px;
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;
const SelectedMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  margin: 0 auto;
  left: 0;
  right: 0;
  background-color: black;
  border-radius: 15px;
  overflow: hidden;
`;
const SelectMovieCover = styled.div`
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 400px;
`;
const SelectMovieTitle = styled.h2`
  position: relative;
  top: -100px;
  padding: 30px;
  font-size: 30px;
  color: ${(props) => props.theme.dark.color};
`;
const SelectMovieDesc = styled.p`
  position: relative;
  top: -100px;
  padding: 30px;
  width: 80%;
  line-height: 23px;
`;
const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 80,
    scale: 1.3,
    transition: {
      delay: 0.5,
      // type: "tween",
    },
  },
};

const infoVariants = {
  hover: {opacity: 1},
};
const offset = 6;

export default function Home() {
  const navigate = useNavigate();
  const movieMatch = useMatch("movies/:movieID");
  const {scrollY} = useScroll();
  const {data, isLoading} = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovie = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxClick = (movieID: number) => {
    navigate(`movies/${movieID}`);
  };
  const overLayClick = () => {
    navigate("/");
  };
  const showMovie =
    movieMatch?.params.movieID &&
    data?.results.find((movie) => movie.id + "" === movieMatch.params.movieID);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            $bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
            onClick={increaseIndex}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{tyep: "tween", duration: 1}}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      $bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClick(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {movieMatch ? (
              <>
                <Overlay
                  onClick={overLayClick}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                ></Overlay>
                <SelectedMovie
                  layoutId={movieMatch.params.movieID}
                  style={{top: scrollY.get() + 100}}
                >
                  {showMovie && (
                    <>
                      <SelectMovieCover
                        style={{
                          backgroundImage: `linear-gradient( transparent,black ), url(${makeImagePath(
                            showMovie.backdrop_path,
                            "original"
                          )})`,
                        }}
                      />
                      <SelectMovieTitle>{showMovie.title}</SelectMovieTitle>
                      <SelectMovieDesc>{showMovie.overview}</SelectMovieDesc>
                    </>
                  )}
                </SelectedMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
