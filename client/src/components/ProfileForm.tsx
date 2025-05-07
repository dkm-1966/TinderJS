import Input from "./Input";
import { IInterest, IUser } from "../interfaces/IUser";
import { FC, useEffect, useState } from "react";
import img from "../assets/default-ui-image-placeholder-wireframes-600nw-1037719192.webp";
import { interests } from "../consts/interests";
import Button from "../UI/Button";
import Dropdown from "../UI/Dropdown";

const ProfileForm: FC = () => {
  const [userInfo, setUserInfo] = useState<IUser>({
    name: null,
    age: null,
    info: null,
    country: null,
    city: null,
    picture_url: null,
    interests: [],
  });
  const [interestsCatalog, setInterestsCatalog] =
    useState<IInterest[]>(interests);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    console.log("SessionUserID", id);
    fetch(`http://localhost:5000/api/v1/profile?id=${id}`, {
      method: "GET",
    }).then(async (result) => {
      const data = await result.json();
      console.log("ewkhfkljhekljh", data);
      setUserInfo(data.profile);
    });
  }, []);

  function handleChange<T>(type: string, value: T): void {
    const newUserInfo = { ...userInfo, [type]: value };
    setUserInfo(newUserInfo);
  }

  function handleAddInterest(interest: IInterest) {
    const newUserInfo = { ...userInfo };
    console.log("before push", newUserInfo);
    newUserInfo.interests.push(interest);

    const tempInterestsCatalog = [...interestsCatalog];
    const newInterestsCattallog = tempInterestsCatalog.filter(
      (item) => item !== interest
    );
    console.log("newUserInfo", newUserInfo);
    setInterestsCatalog(newInterestsCattallog);

    setUserInfo(newUserInfo);
  }

  function handleRemoveInterest(interest: IInterest) {
    const newInterestsCatalog = [...interestsCatalog];
    newInterestsCatalog.push(interest);
    setInterestsCatalog(newInterestsCatalog);

    const newInterests = (userInfo.interests ?? []).filter(
      (item) => item !== interest
    );
    const newUserInfo = { ...userInfo, interests: newInterests };
    setUserInfo(newUserInfo);
  }

  function handleSave() {
    const id = sessionStorage.getItem("userId");
    fetch(`http://localhost:5000/api/v1/profile?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  }

  function handleSelectCategory(value: string) {
    const categorizedInterestsCatalog = interests.filter(
      (item) => item.category === value
    );
    setInterestsCatalog(categorizedInterestsCatalog);
    setCategory(value);
  }

  return (
    <div className="w-full h-full items-center justify-center flex flex-col pb-4 pt-8">
      <div className="w-[600px] flex flex-col justify-center">
        <div
          className={`w-full ${
            userInfo.picture_url ? "bg-black flex" : ""
          } justify-center`}
        >
          {userInfo.picture_url ? (
            <img
              src={userInfo.picture_url}
              className="w-[400px] h-full object-cover rounded-t-md"
            />
          ) : (
            <img src={img} className="rounded-t-md" />
          )}
        </div>
        <form className="flex flex-col gap-4 bg-lime-600 w-full p-4 rounded-b-xl">
          <Input
            placeholder={"name"}
            type="text"
            id="name"
            changeHandler={(value) => handleChange("name" as string, value)}
            value={userInfo.name ?? ""}
          />
          <Input
            placeholder="Your country"
            type="text"
            id="country"
            changeHandler={(value) => handleChange("country", value)}
            value={userInfo.country ?? ""}
          />
          <Input
            placeholder="Your city"
            type="text"
            id="city"
            changeHandler={(value) => handleChange("city", value)}
            value={userInfo.city ?? ""}
          />
          <Input
            placeholder="Your age"
            type="number"
            id="age"
            changeHandler={(value) => handleChange("age", value)}
            value={userInfo.age ?? ""}
          />
          <Input
            placeholder="Your bio(Only matches can see this)"
            type="text"
            id="info"
            changeHandler={(value) => handleChange("info", value)}
            value={userInfo.info ?? ""}
          />
          <Input
            placeholder="Your photo(url)"
            type="text"
            id="picture_url"
            changeHandler={(value) => handleChange("picture_url", value)}
            value={userInfo.picture_url ?? ""}
          />
        </form>
        <div className=" mt-3 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <h1>Chose some intersts</h1>
            <Dropdown
              title={"Category"}
              params={["Sports", "Music", "Learning"]}
              selector={handleSelectCategory}
            />
          </div>

          <div className="flex flex-wrap bg-lime-300 w-[600px] min-h-[72px] p-2 rounded-md justify-center gap-2">
            {userInfo.interests?.map((value) => (
              <div
                key={value.interest + value.category}
                className="flex items-center justify-center bg-gray-100 w-40 h-14 p-2 rounded-md hover:bg-blue-100 duration-200 cursor-pointer select-none"
                onClick={() => handleRemoveInterest(value)}
              >
                <p>{value.interest}</p>
              </div>
            ))}
          </div>
          {interestsCatalog.length > 0 && (
            <div className="flex items-center h-44 bg-white rounded-md p-4">
              <div className="flex flex-wrap gap-2 overflow-y-scroll h-32 justify-center">
                {interestsCatalog.map((value) => (
                  <div
                    key={value.interest + value.category}
                    className="flex items-center justify-center bg-gray-100 w-40 h-14 p-2 rounded-md hover:bg-blue-100 duration-200 cursor-pointer select-none"
                    onClick={() => handleAddInterest(value)}
                  >
                    <p>{value.interest}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-4">
          <Button callback={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
