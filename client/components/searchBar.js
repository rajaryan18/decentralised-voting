import React, { useState } from 'react';











function SearchBar(props) {




  return (<div class=" w-[45%] h-10">
    <form class="shadow-2xl" >
      <label
        for="default-search"
        class=" text-sm font-medium text-gray-900 sr-only  shadow-xl"
      >Search</label
      >
      <div class="relative">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-2 pr-1 "
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 "
          placeholder="Enter the Election Id . . . ."
          required=""
          onChange={props.on1}
        />
        <div onClick={props.on}

          class=" cursor-pointer text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </div  >
      </div>
    </form>
  </div>
  )
}

export default SearchBar;
