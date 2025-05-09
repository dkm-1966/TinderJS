import { FC } from "react";

interface TagProps {
    children: string
}

const Tag: FC<TagProps> = ({children}) => {
    return (
        <span className="bg-lime-200 p-1 border-1 border-lime-600 rounded-md text-sm text-lime-700">{children}</span>
    )
}

export default Tag