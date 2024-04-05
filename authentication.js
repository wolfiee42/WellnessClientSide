const handleRegistration = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };
  if (password == confirm_password) {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      fetch(
        "https://wellness-oasis-clinic-api.onrender.com/patients/register/",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert("Check your email for verification.!");
        });
    } else {
      document.getElementById("error").innerText =
        "pass must contain eight characters, at least one letter, one number and one special character:";
    }
  } else {
    document.getElementById("error").innerText =
      "password and confirm password do not match";
    alert("password and confirm password do not match");
  }
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};

const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("login-username");
  const password = getValue("login-password");

  if ((username, password)) {
    fetch("https://wellness-oasis-clinic-api.onrender.com/patients/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          window.location.href = "index.html";
        }
      });
  }
};

const DisplayloginOrLogout = () => {
  const user = true;
  const parent = document.getElementById("LoginOrLogout");
  //   login
  const a = document.createElement("a");
  const span1 = document.createElement("span");
  a.classList =
    "flex items-center gap-2 py-4 transition-colors duration-300 hover:text-cyan-500 focus:text-cyan-600 focus:outline-none focus-visible:outline-none lg:px-4";
  a.href = "./login.html";
  span1.classList = "bg-[#42A9D0] px-4 py-2 rounded text-white";
  span1.innerHTML = "Login";
  a.appendChild(span1);

  // logout
  const p = document.createElement("p");
  const span = document.createElement("span");
  p.classList =
    "flex items-center gap-2 py-4 transition-colors duration-300 hover:text-cyan-500 focus:text-cyan-600 focus:outline-none focus-visible:outline-none lg:px-4";

  span.classList = "bg-[#42A9D0] px-4 py-2 rounded text-white";
  span.innerHTML = "Logout";
  p.appendChild(span);

  {
    user ? parent.appendChild(p) : parent.appendChild(a);
  }

  //     const span = document.createElement("span");
  //     span.classList = "bg-[#42A9D0] px-4 py-2 rounded text-white";
  //   span.innerHTML = `
  // ${!!user ? "Logout" : "Login"}
  //   `;
  //   parent.appendChild(span);
};

DisplayloginOrLogout();
