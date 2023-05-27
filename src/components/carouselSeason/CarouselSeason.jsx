import React, { useRef } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';
import PosterFallback from '../../assets/no-poster.png';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';

import './style.scss';
import classNames from 'classnames';

const CarouselSeason = ({
  setCurrentSeason,
  setSeason,
  seasonsArray,
  currentSeason,
}) => {
  const carouselContainer = useRef();
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth - 40)
        : container.scrollLeft + (container.offsetWidth - 40);

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation('left')}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation('right')}
        />
        {
          <div className="seasonCarosel">
            <div className="caroselContainer" ref={carouselContainer}>
              {seasonsArray.map((season, index) => {
                const classNam = classNames(
                  'seasonItem',
                  index + 1 === currentSeason && 'activeSeason'
                );
                return (
                  <div
                    key={index}
                    className={classNam}
                    onClick={() => {
                      setCurrentSeason(index + 1);
                      setSeason(index + 1);
                    }}
                  >{`Season : ${index + 1}`}</div>
                );
              })}
            </div>
          </div>
        }
      </ContentWrapper>
    </div>
  );
};

export default CarouselSeason;
