import React from "react";

const RatingCard = ({ name, title, avatar, comment, rating }) => {
    const stars = []
    for (let index = 0; index < 5; index++) {
        if(index < rating){
            stars.push(<img src="./images/fullStar.png" className="h-6 w-6"/>)
        }else {
            stars.push(<img src="./images/emptyStar.png" className="h-6 w-6"/>)
        }
    }
  return (
    <div className="flex flex-col items-center rounded-lg bg-[#11009E] bg-opacity-35 min-w-64 h-auto py-5 px-6">
      <div className="font-roboto text-sm text-white mb-2">“{comment}”"</div>
      <div className="flex flex-row mb-2">
        {stars}
      </div>
      <div className="flex flex-col items-center">
        <img src="images/avatar.jpg" className="rounded-full h-16 w-16" />
        <div className="font-roboto text-white font-extrabold">{name}</div>
        <div className="font-roboto text-white font-thin text-sm">{title}</div>
      </div> 
    </div>
  );
};

export default RatingCard;
