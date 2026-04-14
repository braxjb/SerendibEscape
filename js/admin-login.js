const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

async function redirectIfLoggedIn() {
  const { data, error } = await window.supabaseClient.auth.getSession();

  if (error) {
    console.error(error);
    return;
  }

  if (data.session) {
    window.location.href = "admin-itineraries.html";
  }
}

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  loginMessage.textContent = "";
  loginBtn.disabled = true;
  loginBtn.textContent = "Signing in...";

  const formData = new FormData(loginForm);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const { error } = await window.supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    loginMessage.textContent = error.message;
    loginBtn.disabled = false;
    loginBtn.textContent = "Sign In";
    return;
  }

  window.location.href = "admin-itineraries.html";
});

window.supabaseClient.auth.onAuthStateChange((event, session) => {
  if (session && event === "SIGNED_IN") {
    window.location.href = "admin-itineraries.html";
  }
});

redirectIfLoggedIn();