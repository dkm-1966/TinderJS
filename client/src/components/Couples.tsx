import { FC, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import ProfileShortCard from "./ProfileShortCard";

const Couples: FC = () => {
  const [couples, setCouples] = useState<IUser[]>();

  useEffect(() => {
    const id = sessionStorage.getItem("userId")
    fetch(`http://localhost:5001/api/v1/matches?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
      console.log("matches in couples component", data);
      setCouples(data);
    });
  }, []);


  return (
    <>
      {couples && couples.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-lime-600 font-extrabold">Hey, don't forget about your matches?</h2>
          <div className="flex flex-col items-center justify-center gap-4 w-216 p-4 bg-lime-600 rounded-3xl">
            {couples.map((couple) => (
              <ProfileShortCard key={couple.name} picture_url={couple.picture_url} name={couple.name} country={couple.country} city={couple.city} interests={null} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Couples;
