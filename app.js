const loadServices = () => {
  fetch("https://wellness-oasis-clinic-api.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((err) => console.log(err));
};

const displayService = (services) => {
  if (!services || services.length === 0) {
    // Handle no data scenario (show an error message, hide the container, etc.)
    console.error("No services found!");
    return;
  }

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

const loadDoctors = (search) => {
  document.getElementById("doctors").innerHTML = "";
  // document.getElementById("spinner").style.display = "block";
  // console.log(search);
  fetch(
    `https://wellness-oasis-clinic-api.onrender.com/doctors/list/?search=${
      search ? search : ""
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayDoctors(data);
    });
};
const displayDoctors = (doctors) => {
  doctors?.forEach((doctor) => {
    console.log(doctor);
    const parent = document.getElementById("doctors");
    const div = document.createElement("div");
    div.classList.add("doc-card");
    div.innerHTML = `
        <img class="doc-img" src=${doctor.image} alt="" />
              <h4>${doctor?.user}</h4>
              <h6>${doctor?.designation[0]}</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
                numquam!
              </p>
             
              <p>
              
              ${doctor?.specialization?.map((item) => {
                return `<button>${item}</button>`;
              })}
              </p>

              <button > <a target="_blank" href="docdetails.html?doctorId=${
                doctor.id
              }">Details</a> </button>
        `;

    parent.appendChild(div);
  });
};

loadServices();
loadDoctors();
