

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    let cname = name + "=";
    let decoded = decodeURIComponent(document.cookie);
    let ca = decoded.split(';');
    for(let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
    }
    return "";
}

function clearCookies() {
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

/* ================= LOGIN ================= */

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const remember = document.getElementById("rememberMe").checked;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/;

        let valid = true;

        if(!emailRegex.test(email)){
            document.getElementById("emailError").textContent = "Invalid email format.";
            valid = false;
        } else {
            document.getElementById("emailError").textContent = "";
        }

        if(!passRegex.test(password)){
            document.getElementById("passwordError").textContent =
            "Min 8 chars, uppercase, lowercase, number & special char required.";
            valid = false;
        } else {
            document.getElementById("passwordError").textContent = "";
        }

        if(valid){
            setCookie("sportedu_session","active", remember ? 7 : 1);
            window.location.href = "/";;
        }
    });
}

/* Session Check */
if (!window.location.pathname.includes("index.html")) {
    if (getCookie("sportedu_session") !== "active") {
        window.location.href = "index.html";
    }
}

/* Logout */
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function(){
        clearCookies();
        window.location.href = "index.html";
    });
}

/* ================= COOKIE CONSENT ================= */

const cookiePopup = document.getElementById("cookieConsent");
if (cookiePopup && !getCookie("cookie_choice")) {
    cookiePopup.classList.remove("hidden");
}

const acceptBtn = document.getElementById("acceptCookies");
if (acceptBtn) {
    acceptBtn.onclick = function(){
        setCookie("cookie_choice","accepted",30);
        cookiePopup.classList.add("hidden");
    };
}

const rejectBtn = document.getElementById("rejectCookies");
if (rejectBtn) {
    rejectBtn.onclick = function(){
        setCookie("cookie_choice","rejected",30);
        cookiePopup.classList.add("hidden");
    };
}

/* ================= SCROLL UNLOCK ================= */

const enterBtn = document.getElementById("enterAcademyBtn");
if (enterBtn) {
    window.addEventListener("scroll", function(){
        let scrollPercent = (window.scrollY / 
        (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        if(scrollPercent >= 70){
            enterBtn.classList.remove("hidden");
        }
    });

    enterBtn.addEventListener("click", function(){
        window.location.href = "/external/academy.html";
    });
}

const rulesSection = document.getElementById("rulesSection");
const assessmentBtn = document.getElementById("assessmentBtn");

if (rulesSection && assessmentBtn) {
    window.addEventListener("scroll", function(){
        const rect = rulesSection.getBoundingClientRect();
        if(rect.bottom <= window.innerHeight){
            assessmentBtn.classList.remove("hidden");
        }
    });

    assessmentBtn.addEventListener("click", function(){
        window.location.href = "/interact";
    });
}

/* ================= REGISTRATION ================= */

const dobInput = document.getElementById("dob");
if(dobInput){
    dobInput.addEventListener("change", function(){
        const dob = new Date(this.value);
        const diff = Date.now() - dob.getTime();
        const ageDate = new Date(diff);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        document.getElementById("age").value = age;
    });
}

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        const requiredFields = [
            "fullName",
            "dob",
            "gender",
            "regEmail",
            "phone",
            "experience",
            "position",
            "address",
            "city",
            "state",
            "country",
            "emergencyName",
            "emergencyPhone",
            "medical"
        ];

        // 🔎 CHECK EMPTY FIELDS
        requiredFields.forEach(id => {
            const field = document.getElementById(id);
            const errorElement = document.getElementById(id + "Error");

            if (!field.value.trim()) {
                if (errorElement) {
                    errorElement.textContent = "This field is required.";
                }
                valid = false;
            } else {
                if (errorElement) {
                    errorElement.textContent = "";
                }
            }
        });

        // 🔎 AGE VALIDATION
        const age = parseInt(document.getElementById("age").value);
        if (isNaN(age) || age < 6 || age > 40) {
            document.getElementById("dobError").textContent =
                "Age must be between 6 and 40.";
            valid = false;
        }

        // 🔎 EMAIL VALIDATION
        const email = document.getElementById("regEmail").value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            document.getElementById("regEmailError").textContent =
                "Enter a valid email.";
            valid = false;
        }

        // 🔎 PHONE VALIDATION
        const phoneRegex = /^\d{10}$/;
        const phone = document.getElementById("phone").value.trim();

        if (!phoneRegex.test(phone)) {
            document.getElementById("phoneError").textContent =
                "Phone must be exactly 10 digits.";
            valid = false;
        }

        // 🔎 EMERGENCY PHONE VALIDATION
        const emergencyPhone =
            document.getElementById("emergencyPhone").value.trim();

        if (!phoneRegex.test(emergencyPhone)) {
            document.getElementById("emergencyPhoneError").textContent =
                "Emergency phone must be exactly 10 digits.";
            valid = false;
        }

        if (!valid) return;

        // ✅ SAVE DATA
        const formData = {};
        requiredFields.forEach(id => {
            formData[id] = document.getElementById(id).value.trim();
        });

        localStorage.setItem(
            "sportedu_registration",
            JSON.stringify(formData)
        );

        document.getElementById("registrationSuccess").textContent =
            "Registration successful. Welcome to SPORTEdu.";
        document.getElementById("registrationSuccess").classList.remove("hidden");

        registrationForm.reset();
    });
}

/* ================= FEEDBACK ================= */

let selectedRating = 0;
const stars = document.querySelectorAll("#ratingStars span");

stars.forEach(star => {
    star.addEventListener("click", function(){
        selectedRating = this.getAttribute("data-value");
        stars.forEach(s => s.style.color = "#fff");
        for(let i=0;i<selectedRating;i++){
            stars[i].style.color = "#c8a24c";
        }
    });
});

const feedbackForm = document.getElementById("feedbackForm");
if(feedbackForm){
    feedbackForm.addEventListener("submit", function(e){
        e.preventDefault();
        const name = document.getElementById("feedbackName").value.trim();
        const comment = document.getElementById("feedbackComment").value.trim();

        if(!name || !comment || selectedRating == 0){
            alert("Complete all feedback fields.");
            return;
        }

        const feedback = {name, comment, rating:selectedRating};
        let feedbacks = JSON.parse(localStorage.getItem("sportedu_feedback")) || [];
        feedbacks.push(feedback);
        localStorage.setItem("sportedu_feedback", JSON.stringify(feedbacks));
        renderFeedback();
        feedbackForm.reset();
        selectedRating = 0;
        stars.forEach(star => {
        star.style.color = "#fff";
});
    });
}

function renderFeedback(){
    const container = document.getElementById("feedbackContainer");
    if(!container) return;

    container.innerHTML = "";
    let feedbacks = JSON.parse(localStorage.getItem("sportedu_feedback")) || [];

    feedbacks.forEach((f, index) => {
        const div = document.createElement("div");
        div.className = "feedback-card glass-elite";

        div.innerHTML = `
            <span class="delete-x" onclick="deleteFeedback(${index})">×</span>
            <h4>${f.name}</h4>
            <p>Rating: ${"★".repeat(f.rating)}</p>
            <p>${f.comment}</p>
        `;

        container.appendChild(div);
    });
}

function deleteFeedback(index){
    let feedbacks = JSON.parse(localStorage.getItem("sportedu_feedback")) || [];
    feedbacks.splice(index, 1);
    localStorage.setItem("sportedu_feedback", JSON.stringify(feedbacks));
    renderFeedback();
}

function deleteFeedback(index){
    let feedbacks = JSON.parse(localStorage.getItem("sportedu_feedback")) || [];
    feedbacks.splice(index, 1);
    localStorage.setItem("sportedu_feedback", JSON.stringify(feedbacks));
    renderFeedback();
}

/* ================= QUIZ ================= */

const quizForm = document.getElementById("quizForm");

if(quizForm){

const questions = [
{q:"How long is a standard football match?", options:["60 minutes","90 minutes","120 minutes","80 minutes"], answer:1},
{q:"How many players per team on field?", options:["9","10","11","12"], answer:2},
{q:"Offside is determined relative to?", options:["Goalkeeper only","Second-last defender","Midfield line","Referee"], answer:1},
{q:"A red card results in?", options:["Warning","Temporary suspension","Player sent off","Free kick only"], answer:2},
{q:"Penalty kicks are taken from?", options:["Goal line","Midfield","Penalty spot","Corner arc"], answer:2},
{q:"Corner kick awarded when?", options:["Ball over sideline","Goal scored","Defender last touches over goal line","Foul committed"], answer:2},
{q:"Max players in defensive wall?", options:["No limit","5","3","4"], answer:0},
{q:"Throw-in requires?", options:["One hand","Both hands overhead","Foot kick","Bounce throw"], answer:1},
{q:"Yellow card means?", options:["Send off","Caution","Goal awarded","Match end"], answer:1},
{q:"4-3-3 formation has?", options:["4 defenders 3 midfield 3 forwards","4 forwards","3 defenders","5 forwards"], answer:0}
];

questions.forEach((item,index)=>{
    const div = document.createElement("div");
    div.className = "quiz-question";
    div.innerHTML = `<h3>${index+1}. ${item.q}</h3>
    <div class="quiz-options">
    ${item.options.map((opt,i)=>`
    <label><input type="radio" name="q${index}" value="${i}"> ${opt}</label>
    `).join("")}
    </div>`;
    quizForm.appendChild(div);
});

document.getElementById("submitQuiz").onclick = function(){

    let score = 0;
    let allAnswered = true;

    questions.forEach((item,index)=>{
        const selected = document.querySelector(`input[name="q${index}"]:checked`);

        if(!selected){
            allAnswered = false;
        }
    });

    if(!allAnswered){
        alert("Please answer all 10 questions before submitting.");
        return;
    }

    questions.forEach((item,index)=>{
        const selected = document.querySelector(`input[name="q${index}"]:checked`);

        if(parseInt(selected.value) === item.answer){
            score++;
            selected.parentElement.classList.add("correct");
        } else {
            selected.parentElement.classList.add("incorrect");

            // highlight correct answer
            const correctOption = document.querySelector(
                `input[name="q${index}"][value="${item.answer}"]`
            );
            correctOption.parentElement.classList.add("correct");
        }
    });

    document.getElementById("scoreDisplay").textContent =
        "Your Score: " + score + " / 10";

    this.disabled = true;
};

document.getElementById("resetQuiz").onclick = function(){
    location.reload();
};

}

/* ================= CHAT ================= */

const sendChat = document.getElementById("sendChat");
if(sendChat){
    sendChat.addEventListener("click", function(){
        const input = document.getElementById("chatInput");
        const message = input.value.trim();
        if(!message) return;

        appendChat(message,"chat-user");
        input.value = "";

        setTimeout(()=>{
            let response = "Stay disciplined and focus on tactical awareness.";
            if(message.toLowerCase().includes("training"))
                response = "Consistency and structured drills build elite performance.";
            if(message.toLowerCase().includes("offside"))
                response = "Time your run with the second-last defender to avoid offside.";
            appendChat(response,"chat-bot");
        },800);
    });
}

function appendChat(msg,className){
    const chatWindow = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "chat-message " + className;
    div.textContent = msg;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* ================= CUSTOMER CARE VALIDATION ================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // NAME
        if (!name) {
            document.getElementById("contactNameError").textContent =
                "Name is required.";
            valid = false;
        } else {
            document.getElementById("contactNameError").textContent = "";
        }

        // EMAIL
        if (!email) {
            document.getElementById("contactEmailError").textContent =
                "Email is required.";
            valid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById("contactEmailError").textContent =
                "Enter a valid email address.";
            valid = false;
        } else {
            document.getElementById("contactEmailError").textContent = "";
        }

        // SUBJECT
        if (!subject) {
            document.getElementById("contactSubjectError").textContent =
                "Subject is required.";
            valid = false;
        } else {
            document.getElementById("contactSubjectError").textContent = "";
        }

        // MESSAGE
        if (!message) {
            document.getElementById("contactMessageError").textContent =
                "Message cannot be empty.";
            valid = false;
        } else if (message.length < 10) {
            document.getElementById("contactMessageError").textContent =
                "Message must be at least 10 characters.";
            valid = false;
        } else {
            document.getElementById("contactMessageError").textContent = "";
        }

        if (!valid) return;

        // ✅ SUCCESS
        alert("Your message has been successfully sent to SPORTEdu. We will get back to you ASAP");

        contactForm.reset();
    });
}

/* ================= SCROLL REVEAL ANIMATION ================= */
const revealElements = document.querySelectorAll('.feature-block, .glass-elite, .video-module');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('scrolled-in');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    // Hide them initially
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "all 0.8s ease-out";
    revealOnScroll.observe(el);
});

// Add the class that triggers the reveal
document.head.insertAdjacentHTML("beforeend", `<style>
  .scrolled-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
  }
</style>`);