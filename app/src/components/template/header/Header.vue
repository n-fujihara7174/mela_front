<template>
  <div
    class="fixed w-full flex flex-row items-center p-2 justify-between bg-white shadow-xs bg-darkseagreen"
  >
    <div class="ml-8 text-lg text-white hidden md:flex">Tail-kit</div>
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
    <div class="flex items-center mr-8 hidden md:flex">
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
  </div>
</template>
