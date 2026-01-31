// Récupération des éléments
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionCard = document.getElementById('questionCard');
const celebration = document.getElementById('celebration');
const buttonsContainer = document.querySelector('.buttons');

// Variables pour le mouvement du bouton "Non"
let noHoverCount = 0;
let yesBtnScale = 1;

// Détection du type d'appareil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Position initiale du bouton "Non"
function setInitialNoButtonPosition() {
    const rect = noBtn.getBoundingClientRect();
    noBtn.dataset.originalX = rect.left;
    noBtn.dataset.originalY = rect.top;
}

// Appeler après un court délai pour s'assurer que le layout est prêt
setTimeout(setInitialNoButtonPosition, 100);

// Fonction pour faire fuir le bouton "Non" et grossir le "Oui"
function moveNoButton() {
    noHoverCount++;
    
    // Faire grossir le bouton "Oui"
    yesBtnScale += 0.15;
    yesBtn.style.transform = `scale(${yesBtnScale})`;
    yesBtn.style.transition = 'transform 0.3s ease';
    
    // Calculer une nouvelle position pour le bouton "Non"
    const card = questionCard;
    const cardRect = card.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();
    
    // Marges de sécurité
    const margin = 20;
    const minX = cardRect.left + margin;
    const maxX = cardRect.right - noBtnRect.width - margin;
    const minY = cardRect.top + margin + 200; // Après le titre et le texte
    const maxY = cardRect.bottom - noBtnRect.height - margin;
    
    // Générer une position aléatoire dans les limites de la carte
    let newX = minX + Math.random() * (maxX - minX);
    let newY = minY + Math.random() * (maxY - minY);
    
    // Appliquer la nouvelle position
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.zIndex = '100';
}

// Gestion du survol sur desktop
if (!isMobile) {
    noBtn.addEventListener('mouseenter', moveNoButton);
} else {
    // Sur mobile, bouger le bouton au toucher
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveNoButton();
    });
}

// Fonction quand on clique sur "OUI"
yesBtn.addEventListener('click', function() {
    // Cacher la carte de question
    questionCard.style.animation = 'fadeOut 0.5s ease forwards';
    
    setTimeout(() => {
        questionCard.style.display = 'none';
        celebration.classList.add('active');
        
        // Créer des confettis
        createConfetti();
        
        // Ajouter des feux d'artifice de cœurs
        createHeartFireworks();
    }, 500);
});

// Empêcher le clic sur "Non" (juste au cas où quelqu'un arrive à cliquer dessus)
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    moveNoButton();
});

// Fonction pour créer des confettis
function createConfetti() {
    const colors = ['#ff1744', '#ff6b9d', '#ffc3dd', '#fff', '#ff4081'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            celebration.appendChild(confetti);
            
            // Supprimer le confetti après l'animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

// Fonction pour créer des feux d'artifice de cœurs
function createHeartFireworks() {
    const hearts = ['💕', '💖', '💗', '❤️', '💝', '💘'];
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.pointerEvents = 'none';
            
            const angle = (Math.PI * 2 * i) / heartCount;
            const velocity = Math.random() * 200 + 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            heart.style.animation = 'none';
            celebration.appendChild(heart);
            
            // Animation du cœur
            let opacity = 1;
            let scale = 1;
            let x = 0;
            let y = 0;
            
            const animate = () => {
                opacity -= 0.01;
                scale += 0.02;
                x += tx * 0.01;
                y += ty * 0.01;
                
                heart.style.opacity = opacity;
                heart.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            };
            
            animate();
        }, i * 50);
    }
}

// Animation de fadeOut pour le CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
`;
document.head.appendChild(style);
