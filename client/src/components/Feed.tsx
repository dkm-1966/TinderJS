import React, { FC, useEffect, useState } from "react";
import ProfileShortCard from "./ProfileShortCard";

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
    const interests: string[] = ["Football"];
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
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl text-lime-600 font-extrabold">Here is your possible love</h2>
      <div className="flex flex-col items-center justify-center gap-4 w-216 p-4 bg-lime-600 rounded-3xl">
      {profiles?.map((profile) => (
        <ProfileShortCard key={profile.name} picture_url={null} name={profile.name} country={profile.country} city={profile.city} interests={profile.interests}/>
      ))}
      </div>
    </div>
  )
};

export default Feed;
