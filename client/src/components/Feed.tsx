import React, { FC, useEffect, useState } from "react";

const Feed: FC = () => {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    const limit = 10;
    const interests: string[] = [];
    const query = new URLSearchParams();
    interests.forEach(i => query.append('interest', i));

    fetch(`http://localhost:5000/api/v1/profiles?limit=${limit}&offset=${offset}&${query.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
        const data = await res.json()
        console.log("hellnaaah", data)
    })
  }, []);
  return <div>Feed</div>;
};

export default Feed;
