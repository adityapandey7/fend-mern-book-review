import React from "react";
import Button from "../../common/Component/FormElement/Button";
import Card from "../../common/Component/UIElements/Card";
import ReviewItem from "./ReviewItem";

import "./ReviewList.css";

function ReviewList(props) {
  if (props.list.length === 0) {
    return (
      <div className="review-list center">
        <Card>
          <h2>No Review Found. Please Create one?</h2>
          <Button to="/review/new">Share Review</Button>
        </Card>
      </div>
    );
  }
  return (
    <>
      <ul className="review-list">
        {props.list.map((list, index) => (
          <ReviewItem
            key={index}
            id={list.id}
            title={list.title}
            description={list.description}
            image={list.image}
            creator={list.creator}
            recommend={list.recommend}
          />
        ))}
      </ul>
    </>
  );
}

export default ReviewList;
