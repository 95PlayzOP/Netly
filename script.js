window.onload = function() {
    // Google Sign-In (replace with your actual client ID)
    google.accounts.id.initialize({
        client_id: "1063504037016-n1eb54cn9kbu6ogostjkssut32f1gq47.apps.googleusercontent.com", 
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
    );
};

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = parseJwt(response.credential);
    alert(`Hello, ${userObject.name}`);
    document.getElementById("emailInitial").innerText = userObject.email.charAt(0).toUpperCase();
    document.getElementById("emailInitial").style.display = "inline-block";
}

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}


function showEmailPopup() {
    const popup = document.getElementById('emailPopup');
    const overlay = document.getElementById('overlay');
    if (popup && overlay) {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        popup.offsetHeight; // Trigger reflow
        overlay.classList.add('active');
        popup.classList.add('active');
    }
}

function closeEmailPopup() {
    const popup = document.getElementById('emailPopup');
    const overlay = document.getElementById('overlay');
    if (popup && overlay) {
        overlay.classList.remove('active');
        popup.classList.remove('active');
        setTimeout(() => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }, 300);
    }
}


function login() {
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
        const emailValue = emailInput.value;
        if (emailValue && emailValue.includes('@')) {
            const emailInitial = emailValue.charAt(0).toUpperCase();
            const emailInitialElement = document.getElementById('emailInitial');
            emailInitialElement.textContent = emailInitial;
            emailInitialElement.style.display = 'inline-block'; 
            document.getElementById('loginButton').style.display = 'none';
            document.getElementById('signUpButton').style.display = 'none'; // Hide signup button too
            emailInput.value = '';
            closeEmailPopup();
        } else {
            showError(emailInput);
        }
    }
}


function showError(input) {
    alert('Please enter a valid email address.');
    input.style.borderColor = 'rgba(255, 0, 0, 0.5)';
    input.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.2)';
    setTimeout(() => {
        input.style.borderColor = 'rgba(138, 43, 226, 0.3)'; // Restore original border color
        input.style.boxShadow = 'none';
    }, 2000);
}


document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo-big');
    let isDesktop = window.matchMedia("(min-width: 769px)").matches;
    let isMobile = !isDesktop;
    let isHovering = false;
    let isAnimating = false;

    if (isDesktop) {
        logo.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        logo.addEventListener('mouseleave', () => {
            isHovering = false;
            logo.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isHovering || isAnimating) return;

            const sensitivity = 0.015;
            const rect = logo.getBoundingClientRect();
            const logoX = rect.left + rect.width / 2;
            const logoY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - logoX) * sensitivity;
            const deltaY = (e.clientY - logoY) * sensitivity;

            const maxRotation = 10;
            const limitedDeltaX = Math.max(Math.min(deltaX, maxRotation), -maxRotation);
            const limitedDeltaY = Math.max(Math.min(deltaY, maxRotation), -maxRotation);

            requestAnimationFrame(() => {
                logo.style.transform = `
                    perspective(1000px)
                    rotateX(${-limitedDeltaY}deg)
                    rotateY(${limitedDeltaX}deg)
                `;
            });
        });
    }


    if (isMobile) {
        logo.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

             logo.style.transform = `
                perspective(1000px)
                rotateX(${Math.random() * 20 - 10}deg)
                rotateY(${Math.random() * 20 - 10}deg)
            `;
            
            setTimeout(() => {
                logo.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                isAnimating = false; // Reset the flag after animation
            }, 300); // Match the transition duration
        });




        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                if (!isAnimating) { // Only apply tilt if not animating from click
                    const tiltSensitivity = 0.3;
                    const beta = e.beta ? e.beta * tiltSensitivity : 0;
                    const gamma = e.gamma ? e.gamma * tiltSensitivity : 0;

                    const maxTilt = 15;
                    const limitedBeta = Math.max(Math.min(beta, maxTilt), -maxTilt);
                    const limitedGamma = Math.max(Math.min(gamma, maxTilt), -maxTilt);


                    logo.style.transform = `
                        perspective(1000px)
                        rotateX(${-limitedBeta}deg)
                        rotateY(${limitedGamma}deg)
                    `;

                }
            });
        }
    }



    // Sidebar toggle
      function toggleSidebar() {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
          sidebar.classList.toggle('active');
      }
  }
     // Close Sidebar
          function closeSidebar() {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
          sidebar.classList.remove('active');
      }
  }

    document.body.addEventListener('click', function(event) {
         if (event.target.classList.contains('hamburger')) {
             toggleSidebar();
         } else if (event.target.closest('.sidebar a')) {
             closeSidebar();
         }
     });


});


window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (header) {
        if (window.scrollY === 0) {
            header.classList.remove("header-no-glow");
        } else {
            header.classList.add("header-no-glow");
        }
    }
});