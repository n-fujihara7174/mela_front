<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div class="flex flex-col md:flex-row -mx-4">
        <div class="md:flex-1 px-4">
          <div x-data="{ image: 1 }" x-cloak>
            <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
              <div
                x-show="image === 1"
                class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
              >
                <span class="text-5xl">1</span>
              </div>
            </div>
          </div>
        </div>
        <div class="md:flex-1 px-4">
          <h2
            class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl"
          >
            Lorem ipsum dolor, sit amet consectetur, adipisicing elit.
          </h2>
          <p class="text-gray-500 text-sm">
            By
            <a href="#" class="text-indigo-600 hover:underline">ABC Company</a>
          </p>
          <p class="text-gray-500">
            Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae
            exercitationem porro saepe ea harum corrupti vero id laudantium
            enim, libero blanditiis expedita cupiditate a est.
          </p>

          <div class="flex py-4 space-x-4">
            <button
              type="button"
              class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
