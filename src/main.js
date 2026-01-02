import './style.css'

const cardsData = [
  {
    title: "PolicyOnboarding Agent",
    desc: "Manages customer onboarding and policy creation",
    icon: "🛡️",
    image: "/aml.png",
    url: "#"
  },
  {
    title: "RiskAssessment Agent",
    desc: "Evaluates risk for underwriting",
    icon: "🛡️",
    image: "/aml.png",
    url: "#"
  },
  {
    title: "PremiumCalculator Agent",
    desc: "Calculates insurance premiums",
    icon: "📄",
    image: "/policy.png",
    url: "#"
  },
  {
    title: "ClaimIntake Agent",
    desc: "Handles claim submission",
    icon: "💰",
    image: "/disbursement.png",
    url: "#"
  },
  {
    title: "FraudDetection Agent",
    desc: "Detects fraudulent claims",
    icon: "🔁",
    image: "/duplicate.png",
    url: "#"
  },
  {
    title: "ClaimProcessing Agent",
    desc: "Processes valid claims",
    icon: "🔗",
    image: "/integration.png",
    url: "#"
  },
  {
    title: "ComplianceReporter Agent",
    desc: "Ensures regulatory compliance",
    icon: "⚖️",
    image: "/osce.png",
    url: "#"
  },
  {
    title: "CustomerSupport Agent",
    desc: "Provides customer assistance",
    icon: "�",
    image: "/summary.png",
    url: "#"
  },
  {
    title: "RenewalManager Agent",
    desc: "Manages policy renewals",
    icon: "🕵️",
    image: "/fraud.png",
    url: "#"
  },
  {
    title: "FeedbackLoop Agent",
    desc: "Improves system accuracy",
    icon: "🎧",
    image: "/bot.png",
    url: "#"
  },
];

// Re-injecting HTML removed. We directly manipulate the existing DOM structure.

// Re-injecting HTML messes up if not careful with VITE structure, 
// usually we just manipulate DOM or let index.html be static.
// Since index.html has the structure, we just need to render cards.

const renderCards = () => {
  const container = document.getElementById('cards-container');
  if (!container) return;

  container.innerHTML = cardsData.map((card, index) => `
        <div class="card fade-in-on-scroll" style="transition-delay: ${index * 100}ms">
            <div class="card-image-placeholder">
                <img src="${card.image}" alt="${card.title}" class="card-img" />
            </div>
            <div class="card-content">
                <div class="card-icon">${card.icon}</div>
                <h3 class="card-title">${card.title}</h3>
                <p class="card-desc">${card.desc}</p>
                <a href="${card.url}" class="card-link">Dummy URL</a>
            </div>
        </div>
    `).join('');

  // Add Tilt Listeners after rendering
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', handleCardTilt);
    card.addEventListener('mouseleave', resetCardTilt);
  });
};

// 3D Tilt Logic
const handleCardTilt = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Calculate rotation between -15 and 15 degrees
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -10; // Invert Y
  const rotateY = ((x - centerX) / centerX) * 10;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
};

const resetCardTilt = (e) => {
  const card = e.currentTarget;
  card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
};

// Hero Parallax Logic
const handleHeroParallax = (e) => {
  const agentImage = document.querySelector('.agent-image');
  if (!agentImage) return;

  const x = (window.innerWidth - e.pageX * 2) / 90;
  const y = (window.innerHeight - e.pageY * 2) / 90;

  agentImage.style.transform = `translate(${x}px, ${y}px) rotateY(${x}deg)`;
};

const setupIntersectionObserver = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, options);

  const elements = document.querySelectorAll('.fade-in-on-scroll, .fade-in-left, .fade-in-right, .zoom-in, .fade-in-up');
  elements.forEach(el => observer.observe(el));
};

const handleNavbarScroll = () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  setupIntersectionObserver();
  document.addEventListener('mousemove', handleHeroParallax);
  renderCards();
  setupIntersectionObserver();
  document.addEventListener('mousemove', handleHeroParallax);
  window.addEventListener('scroll', handleNavbarScroll);
});

// Since we are using type="module", the code runs immediately, but DOMContentLoaded is safer.
// Also, the previous document.querySelector('#app').innerHTML replacement was unnecessary and incorrect
// because index.html already has the content. I'll remove that part in production code,
// but for now, the renderCards logic will run.
