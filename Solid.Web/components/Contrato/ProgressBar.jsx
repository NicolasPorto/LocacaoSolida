const ProgressBar = ({ valor }) => {
    return (
        <div className="w-full bg-gray-500">
            <div
                className="bg-person-500 p-0.5 text-center text-xs font-medium leading-none text-white-300"
                style={{ width: `${valor}%` }}
            >
                {valor}%
            </div>
        </div>
    )
}

export default ProgressBar;