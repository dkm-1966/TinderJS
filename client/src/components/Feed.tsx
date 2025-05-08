import React, { FC, useEffect, useState } from "react";

interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  country: string;
  interests: string[];
}

const Feed: FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const limit = 10;
    const interests: string[] = [];
    const query = new URLSearchParams();
    interests.forEach((i) => query.append("interest", i));

    const id = sessionStorage.getItem("userId");
    console.log(id);

    fetch(
      `http://localhost:5001/api/v1/profiles?limit=${limit}&offset=${offset}&id=${id}&${query.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      const data = await res.json();
      setProfiles(data);
    });
  }, []);

  console.log("profiles", profiles);
  return (
    <div></div>
  );
};

export default Feed;
