<template>
  <div
    class="fixed w-full flex flex-row items-center p-2 justify-between bg-white shadow-xs bg-indigo-500"
  >
    <div class="ml-8 text-lg text-white hidden md:flex">Mela</div>
    <span
      class="w-full md:w-1/3 h-10 cursor-pointer border border-gray-300 text-sm rounded-full flex"
    >
      <input
        type="search"
        name="serch"
        placeholder="Search"
        class="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
      />
    </span>
    <div class="flex flex-row-reverse text-white mr-4 ml-4 md:hidden">
      <button>
        <svg
          width="20"
          height="20"
          fill="currentColor"
          class="h-8 w-8"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="flex-shrink-0">
      <a href="#" class="block relative">
        <img
          alt="profil"
          src="@/assets/459412C0-F0CA-4B3C-AEC7-292375082F5E.jpeg"
          class="mx-auto object-cover rounded-full h-16 w-16"
        />
      </a>
    </div>
  </div>
</template>
