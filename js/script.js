document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  
  menuToggle.addEventListener("click", () => {
  
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  
  const sections = document.querySelectorAll("main section[id]");
  const links = navLinks.querySelectorAll("a");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));

  
  const filterButtons = document.querySelectorAll(".filter");
  
  const achievementCards = document.querySelectorAll(".achievement-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      achievementCards.forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const fields = [
      { input: name, error: document.getElementById("name-error"), message: "Please enter your name." },
      { input: email, error: document.getElementById("email-error"), message: "Please enter a valid email." },
      { input: message, error: document.getElementById("message-error"), message: "Please enter a message." }
    ];

    let valid = true;

    fields.forEach(field => {
      field.error.textContent = "";
      field.input.removeAttribute("aria-invalid");
    });

    if (!name.value.trim()) {
      document.getElementById("name-error").textContent = "Please enter your name.";
      name.setAttribute("aria-invalid", "true");
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      document.getElementById("email-error").textContent = "Please enter a valid email.";
      email.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!message.value.trim()) {
      document.getElementById("message-error").textContent = "Please enter a message.";
      message.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (valid) {
      status.textContent = "Message submitted successfully!";
      form.reset();
    } else {
      status.textContent = "";
    }
  });

  
  document.getElementById("year").textContent = new Date().getFullYear();
});
