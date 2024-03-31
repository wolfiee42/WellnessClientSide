const loadServices = () => {
  fetch("https://wellness-oasis-clinic-api.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((err) => console.log(err));
};

const displayService = (services) => {
  console.log(services);
  if (!services || services.length === 0) {
    // Handle no data scenario (show an error message, hide the container, etc.)
    console.error("No services found!");
    return;
  }
  console.log(services);
  services.forEach((service) => {
    const parent = document.getElementById("service-container");
    const li = document.createElement("li");
    li.innerHTML = `
              <img class="min-w-[260px] h-40" src=${service?.image} alt="">
              <h3>${service?.name}</h3>
              <p class="text-xs">${service?.description.slice(0, 100)}.</p>
              <button class=" text-[#42A9D0]">Learn more... </button>
      `;
    parent.appendChild(li);
    li.classList = "flex flex-col max-w-[260px] space-y-3";
  });
};

loadServices();
