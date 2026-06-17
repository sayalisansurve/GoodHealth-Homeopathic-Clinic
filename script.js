function getBlogs() {
  return JSON.parse(localStorage.getItem("blogs")) || [];
}

function setBlogs(data) {
  localStorage.setItem("blogs", JSON.stringify(data));
}

function getServices() {
  return JSON.parse(localStorage.getItem("services")) || [
    {
      id: 1,
      title: "PCOD Treatment",
      description: "Homeopathic care for PCOD and hormonal imbalance."
    },
    {
      id: 2,
      title: "Menstrual Irregularities",
      description: "Natural treatment support for irregular menstrual cycles."
    },
    {
      id: 3,
      title: "Allergies and Asthma",
      description: "Homeopathic treatment for allergies, breathing issues and asthma."
    }
  ];
}

function setServices(data) {
  localStorage.setItem("services", JSON.stringify(data));
}
function doctorLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginMessage = document.getElementById("loginMessage");

  if (username === "doctor" && password === "doctor123") {
    localStorage.setItem("doctorLoggedIn", "true");
    loginMessage.style.color = "green";
    loginMessage.innerText = "Login successful";

    setTimeout(function () {
      window.location.href = "edit-blog.html";
    }, 700);
  } else {
    loginMessage.style.color = "red";
    loginMessage.innerText = "Invalid username or password";
  }
}
// function doctorLogin(event) {
//   event.preventDefault();

//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   const message = document.getElementById("loginMessage");

//   if (username === "doctor" && password === "doctor123") {
//     localStorage.setItem("doctorLoggedIn", "true");
//     message.innerText = "Login successful...";
//     setTimeout(() => {
//       window.location.href = "edit-blog.html";
//     }, 800);
//   } else {
//     message.style.color = "red";
//     message.innerText = "Invalid username or password";
//   }
// }

// function checkDoctorLogin() {
//   if (localStorage.getItem("doctorLoggedIn") !== "true") {
//     alert("Please login first");
//     window.location.href = "login.html";
//   }
// }
function checkDoctorLogin() {
  const isDoctorLoggedIn = localStorage.getItem("doctorLoggedIn") === "true";

  if (!isDoctorLoggedIn) {
    alert("Please login as doctor first");
    window.location.href = "login.html";
  }
}
function logoutDoctor() {
  localStorage.removeItem("doctorLoggedIn");
  window.location.href = "index.html";
}


// function logoutDoctor() {
//   localStorage.removeItem("doctorLoggedIn");
//   window.location.href = "login.html";
// }

function loadBlogsPublic() {
  const blogList = document.getElementById("blogList");
  if (!blogList) return;

  const blogs = getBlogs().filter(blog => blog.visible === true);

  if (blogs.length === 0) {
    blogList.innerHTML = "<div class='card'><p>No blogs available.</p></div>";
    return;
  }

  blogList.innerHTML = blogs.map(blog => `
    <div class="card">
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>
    </div>
  `).join("");
}

function initBlogPage() {
  checkDoctorLogin();
  renderAdminBlogs();
}

function saveBlog(event) {
  event.preventDefault();

  const id = document.getElementById("blogId").value;
  const title = document.getElementById("blogTitle").value;
  const content = document.getElementById("blogContent").value;
  const visible = document.getElementById("blogVisible").checked;
  const message = document.getElementById("blogMessage");

  const blogs = getBlogs();

  if (id) {
    const updatedBlogs = blogs.map(blog =>
      blog.id == id ? { ...blog, title, content, visible } : blog
    );
    setBlogs(updatedBlogs);
    message.innerText = "Blog updated successfully";
  } else {
    blogs.push({
      id: Date.now(),
      title,
      content,
      visible
    });
    setBlogs(blogs);
    message.innerText = "Blog added successfully";
  }

  clearBlogForm();
  renderAdminBlogs();
}

function renderAdminBlogs() {
  const container = document.getElementById("adminBlogList");
  if (!container) return;

  const blogs = getBlogs();

  if (blogs.length === 0) {
    container.innerHTML = "<div class='card'><p>No blogs added yet.</p></div>";
    return;
  }

  container.innerHTML = blogs.map(blog => `
    <div class="admin-card">
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>
      ${blog.visible ? "" : "<span class='hidden-badge'>Hidden</span>"}
      <div class="action-row">
        <button onclick="editBlog(${blog.id})">Edit</button>
        <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
      </div>
    </div>
  `).join("");
}

function editBlog(id) {
  const blog = getBlogs().find(item => item.id == id);
  if (!blog) return;

  document.getElementById("blogId").value = blog.id;
  document.getElementById("blogTitle").value = blog.title;
  document.getElementById("blogContent").value = blog.content;
  document.getElementById("blogVisible").checked = blog.visible;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteBlog(id) {
  const blogs = getBlogs().filter(blog => blog.id != id);
  setBlogs(blogs);
  renderAdminBlogs();
}

function clearBlogForm() {
  document.getElementById("blogId").value = "";
  document.getElementById("blogTitle").value = "";
  document.getElementById("blogContent").value = "";
  document.getElementById("blogVisible").checked = true;
}

function loadServicesPublic() {
  const servicesList = document.getElementById("servicesList");
  if (!servicesList) return;

  const services = getServices();
  setServices(services);

  servicesList.innerHTML = services.map(service => `
    <div class="card">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </div>
  `).join("");
}

function initServicePage() {
  checkDoctorLogin();
  renderAdminServices();
}

function saveService(event) {
  event.preventDefault();

  const id = document.getElementById("serviceId").value;
  const title = document.getElementById("serviceTitle").value;
  const description = document.getElementById("serviceDescription").value;
  const message = document.getElementById("serviceMessage");

  const services = getServices();

  if (id) {
    const updated = services.map(service =>
      service.id == id ? { ...service, title, description } : service
    );
    setServices(updated);
    message.innerText = "Service updated successfully";
  } else {
    services.push({
      id: Date.now(),
      title,
      description
    });
    setServices(services);
    message.innerText = "Service added successfully";
  }

  clearServiceForm();
  renderAdminServices();
}

function renderAdminServices() {
  const container = document.getElementById("adminServiceList");
  if (!container) return;

  const services = getServices();
  setServices(services);

  if (services.length === 0) {
    container.innerHTML = "<div class='card'><p>No services added yet.</p></div>";
    return;
  }

  container.innerHTML = services.map(service => `
    <div class="admin-card">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <div class="action-row">
        <button onclick="editService(${service.id})">Edit</button>
        <button class="delete-btn" onclick="deleteService(${service.id})">Delete</button>
      </div>
    </div>
  `).join("");
}

function editService(id) {
  const service = getServices().find(item => item.id == id);
  if (!service) return;

  document.getElementById("serviceId").value = service.id;
  document.getElementById("serviceTitle").value = service.title;
  document.getElementById("serviceDescription").value = service.description;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteService(id) {
  const services = getServices().filter(service => service.id != id);
  setServices(services);
  renderAdminServices();
}

function clearServiceForm() {
  document.getElementById("serviceId").value = "";
  document.getElementById("serviceTitle").value = "";
  document.getElementById("serviceDescription").value = "";
}

function saveAppointment(event) {
  event.preventDefault();

  const patientName = document.getElementById("patientName").value;
  const phone = document.getElementById("patientPhone").value;
  const date = document.getElementById("appointmentDate").value;
  const time = document.getElementById("appointmentTime").value;
  const message = document.getElementById("appointmentMessage").value;
  const status = document.getElementById("appointmentStatus");

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  appointments.push({
    id: Date.now(),
    patientName,
    phone,
    date,
    time,
    message
  });

  localStorage.setItem("appointments", JSON.stringify(appointments));

  status.innerText = "Appointment request sent successfully";
  event.target.reset();
}
function updateNavbar() {
  const isDoctorLoggedIn = localStorage.getItem("doctorLoggedIn") === "true";

  const loginMenu = document.getElementById("loginMenu");
  const editBlogMenu = document.getElementById("editBlogMenu");
  const editServicesMenu = document.getElementById("editServicesMenu");
  const logoutMenu = document.getElementById("logoutMenu");

  if (isDoctorLoggedIn) {
    if (loginMenu) loginMenu.style.display = "none";
    if (editBlogMenu) editBlogMenu.style.display = "inline-block";
    if (editServicesMenu) editServicesMenu.style.display = "inline-block";
    if (logoutMenu) logoutMenu.style.display = "inline-block";
  } else {
    if (loginMenu) loginMenu.style.display = "inline-block";
    if (editBlogMenu) editBlogMenu.style.display = "none";
    if (editServicesMenu) editServicesMenu.style.display = "none";
    if (logoutMenu) logoutMenu.style.display = "none";
  }
}
function sendToWhatsApp() {
    // 1. Enter the business WhatsApp number (with country code, no '+')
    const phoneNumber = "9665018391"; 

    // 2. Get form values
    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const phone = document.querySelector('input[placeholder="Phone Number"]').value;
    const service = document.querySelector('select').value;
    const message = document.querySelector('textarea').value;
    const isNumeric = /^\d+$/.test(phone);
    if (!isNumeric){
      alert("Invalid phone number: contains non-numeric characters");
    }
    else if(!name||!phone||!service){
      alert ("No Name or phone or Appointment mention.")
    }
    else{
    // 3. Create the encoded message
    const text = `*New Enquiry from Website*%0A%0A` +
                 `*Name:* ${name}%0A` +
                 `*Phone:* ${phone}%0A` +
                 `*Service:* ${service}%0A` +
                 `*Message:* ${message}`;

    // 4. Open WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank');
    }
}
