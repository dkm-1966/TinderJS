import { FC } from "react";

interface PaginationButtonProps {
    children: string;
    callback: () => void;
    isDisabled: boolean
}

const PaginationButton: FC<PaginationButtonProps> = ({callback, children, isDisabled}) => {
    return (
        <button onClick={callback} className="bg-lime-200 px-2 py-1 border-2 rounded-lg border-lime-600 text-lime-600 disabled:bg-slate-50" disabled={isDisabled}>{children}</button>
    )
}

export default PaginationButton