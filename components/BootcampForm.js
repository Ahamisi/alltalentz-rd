import React from 'react'

const BootcampForm = () => {
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" method="post" className="text-[#A6A6A6]">
    <h2 className="text-lg font-normal text-center mb-8 text-[#939393]">Kindly fill this form and upload your CV to keep yourself in the loop</h2>

        <div className="mb-8">
        <input
            type="text"
            className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                errors.fullName ? "border-red-500" : ""
              }`}
            placeholder="Enter your full name"
            onChange={handleInputChange}
            name="fullName"
            value={formData.fullName}
        />
        {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
        )}
        </div>
        <div className="mb-8">
        {/* <label className="block text-gray-700 font-semibold mb-1">Email</label> */}
        <input
            type="email"
            className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                errors.email ? "border-red-500" : ""
              }`}
            placeholder="Enter your email"
            onChange={handleInputChange}
            name="email"
            value={formData.email}
        />
        {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
        )}
        </div>
        <div className="mb-8">
        {/* <label className="block text-gray-700 font-semibold mb-1">Phone</label> */}
        <input
            type="tel"
            className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                errors.phone ? "border-red-500" : ""
              }`}
            placeholder="Enter your phone number"
            onChange={handleInputChange}
            name="phone"
            value={formData.phone}
        />
        {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
        )}
        </div>

        <div className="mb-8">
        {/* <label className="block text-gray-700 font-semibold mb-1">yoe</label> */}
        <input
            type="number"
            className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                errors.yoe ? "border-red-500" : ""
              }`}
            placeholder="Years of Experience"
            onChange={handleInputChange}
            name="yoe"
            value={formData.yoe}
        />
        {errors.yoe && (
            <p className="text-red-500 text-sm">{errors.yoe}</p>
        )}
        </div>

        <div className="mb-8">
        {/* <label className="block text-gray-700 font-semibold mb-1">yoe</label> */}
        <input
            type="text"
            className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
                errors.career ? "border-red-500" : ""
              }`}
            placeholder="Career Field"
            onChange={handleInputChange}
            name="career"
            value={formData.career}
        />
        {errors.career && (
            <p className="text-red-500 text-sm">{errors.career}</p>
        )}
        </div>



        <div className="mb-8">
        <label className="block text-gray-700 mb-1">Upload CV</label>

        <input
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChangeNysc}
          className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
            errors.cv ? "border-red-500" : ""
          }`}
        />
       
        {errors.cv && (
            <p className="text-red-500 text-sm">{errors.cv}</p>
        )}

          
        </div>



        <div className="mb-8">
        <label className="block text-gray-700 mb-1">Upload NYSC Cert.</label>

        <input
          type="file"
          name="nysc"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className={`w-full border rounded-md p-2 focus:outline-none focus:border-secondary ${
            errors.cv ? "border-red-500" : ""
          }`}
        />
       
        {errors.nysc && (
            <p className="text-red-500 text-sm">{errors.nysc}</p>
        )}

          <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mt-3" role="alert">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
            <p>Hey there, once you click submit, you would be redirected to take a compulsory test as the final stage.</p>
          </div>
        </div>

    <button
    type="submit"
    className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold hover:bg-opacity-90"
    disabled={isLoading}
    >
    {isLoading ? (
        <svg
        className="animate-spin h-5 w-5 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.018 7.97l2.018-2.68z"
        />
        </svg>
    ) : (
        "Submit"
    )}
    </button>

        {/* <button type="submit" className="request-button bg-secondary text-black px-[43px] py-[13px] mt-[10px] font-bold hover:bg-opacity-90">Submit</button> */}
    </form>
  )
}

export default BootcampForm