import React from "react";
import { Link } from "react-router-dom";
import Card from "../../common/Component/UIElements/Card";

import "./ReviewItem.css";

function ReviewItem(props) {
  const { description } = props;
  return (
    <>
      <li className="review-item">
        <Link to={`/review/${props.id}`}>
          <Card className="review-item_content">
            <div className="review-item_image">
              <img
                src={`http://localhost:5000/${props.image}`}
                alt={props.title}
              />
            </div>
            <div className="review-item_info">
              <h2>{props.title}</h2>
              <p>{description}</p>
            </div>
          </Card>
        </Link>
      </li>
    </>
  );
}

export default ReviewItem;
