import { FC } from "react";
import { routes } from "../router/routes";
import Card from './Card';

const Header: FC = () => {
  return (
    <>
    <section className="flex flex-row justify-center items-center gap-8">
      <Card icon="fa-solid fa-user" title="Profile" routeName={routes.USER_PROFILE}/>
      <Card icon="fa-solid fa-heart" title="LoveFinder" routeName={routes.FEEDS}/>
      <Card icon="fa-solid fa-users" title="MyCouples" routeName={routes.MATCHES} />
    </section>
    </>
  );
};

export default Header;
