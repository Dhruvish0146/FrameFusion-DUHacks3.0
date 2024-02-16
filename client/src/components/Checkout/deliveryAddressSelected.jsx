import React from "react"


const DeliveryAddressSelected = ({user,edit,address,onChangeDeliverHere,onChangeEdit,onChangeChange}) => {
  return (
    <>
    <div className="">
      <h3 className="text-xl font-bold mb-2 text-gray-50 bg-blue-500 py-2 px-6 ">
        DELIVERY ADDRESS
      </h3>
    </div>

    <div className="flex flex-col px-4">
      <div className="mb-2 flex justify-between">
        <div className="flex justify-between">
          <div className="text-gray-900 font-bold">{user.name}</div>
          <div className="ml-10 text-gray-900 font-bold">
            {user.phoneNumber}
          </div>
        </div>
        <button
          className="text-blue-500 hover:text-blue-700 hover:underline"
          onClick={onChangeEdit}
        >
          Edit
        </button>
      </div>

      {!edit && (
        <>
          <div className="mb-4 flex justify-nomarl">
            <div className="text-gray-900">{user.address}</div>
          </div>
          <div className="mb-4">
            <button
              className="bg-orange-500 shadow-lg rounded text-white font-medium py-2 px-8  focus:outline-none focus:shadow-outline"
              onClick={onChangeDeliverHere} 
            >
              DELIVER HERE
            </button>
          </div>
        </>
      )}
      {edit && (
        <>
          <hr className="h-px  bg-gray-100 border-0 dark:bg-gray-300"></hr>
          <div className="my-3">
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              name="address"
              required
              value={address}
              onChange={onChangeChange}
            />
            <div className="my-4">
              <button
                className="bg-orange-500 shadow-lg rounded text-white font-medium py-2 px-8  focus:outline-none focus:shadow-outline"
                onClick={onChangeDeliverHere}
              >
                SAVE AND DELIVER HERE
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  </>
  )
};

export default DeliveryAddressSelected;
