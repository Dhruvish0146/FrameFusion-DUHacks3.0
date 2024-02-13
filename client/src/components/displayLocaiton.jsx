// import React from "react";
// import { useLocation, Link } from "react-router-dom";

// const DisplayLocation = () => {
//   const location = useLocation();

//   // Helper function to capitalize the first letter of a string
//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   // Split the current path to get the individual segments
//   const pathSegments = location.pathname.split("/").filter((segment) => segment !== "");

//   // Generate the breadcrumb navigation links
//   const breadcrumbLinks = pathSegments.map((segment, index) => {
//     const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
//     const text = capitalizeFirstLetter(segment);
//     return (
//       <li key={index} className="text-left">
//         <div className="flex items-center">
//           <span className="mx-2 text-gray-400">/</span>
//           <Link to={path} className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
//             {text}
//           </Link>
//         </div>
//       </li>
//     );
//   });

//   return (
//     // <div>
//     //   <nav className="flex">
//     //     <ol role="list" className="flex items-center">
//     //       <li className="text-left">
//     //         <div className="-m-1">
//     //           <Link to="/" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
//     //             Home
//     //           </Link>
//     //         </div>
//     //       </li>
//     //       {breadcrumbLinks}
//     //     </ol>
//     //   </nav>
//     // </div>
//   );
// };

// export default DisplayLocation;
