import React from "react";

const HelloMessage = (props) => {
    return (
        <div className="flex items-center bg-white  overflow-x-auto p-4 rounded-lg m-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[70px] w-[70px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="ml-4">
                <div className="_2QZ3Er">Hello,</div>
                <div className="_1ruvv2">{props.user.name}</div>
            </div>
        </div>
    );
};

export default HelloMessage;
