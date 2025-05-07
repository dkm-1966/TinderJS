import { FC } from "react";
import { Link } from "react-router";

interface CardProps {
    icon: string,
    title: string,
    routeName: string
}

const Card: FC<CardProps> = ({icon, title, routeName}) => {
    return (
        <div className="flex flex-col justify-end items-center bg-slate-50 rounded-2xl h-48 w-48 p-12 gap-8 shadow-lg hover:shadow-lime-700/30 transition duration-500 hover:scale-105">
            <i className={`${icon} text-4xl text-lime-500 transition duration-500 hover:text-rose-500`}></i>
            <Link to={routeName} className="text-lime-600 text-xl hover:text-lime-700 transition duration-400">{title}</Link>
        </div>
    )
}

export default Card;