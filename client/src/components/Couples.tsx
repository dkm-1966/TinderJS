import { FC, useEffect, useState } from 'react'
import { IUser } from '../interfaces/IUser';

const Couples: FC = () => {
    const [couples, setCouples] = useState<IUser[]>();

    useEffect(() => {
      const id = 1;
        fetch(`http://localhost:5000/api/v1/matches?id=${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        }).then(async (res) => {
            const data = await res.json()
            console.log("hellnaaah", data)
            setCouples(data)
        })
    }, [])
  return (
    <div>
      Couples
    </div>
  )
}

export default Couples