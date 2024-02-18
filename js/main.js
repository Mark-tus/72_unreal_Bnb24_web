
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Back to top button
   */
   let backtotop = select('.back-to-top')
   if (backtotop) {
     const toggleBacktotop = () => {
       if (window.scrollY > 100) {
         backtotop.classList.add('active')
       } else {
         backtotop.classList.remove('active')
       }
     }
     window.addEventListener('load', toggleBacktotop)
     onscroll(document, toggleBacktotop)
   }

})()
// Existing JavaScript code remains unchanged

// Chat Button
const chatButton = document.getElementById('chatButton');
// Chat Popup
const chatPopup = document.getElementById('chatPopup');
// Chat Input
const chatInput = document.getElementById('chatInput');
// Send Button
const sendButton = document.getElementById('sendButton');
// Chat Messages Container
const chatMessages = document.getElementById('chatMessages');
const closeButton = document.getElementById('closeButton');

// Event Listener for Chat Button Click
chatButton.addEventListener('click', () => {
    chatPopup.style.display = 'block';
});

// Event Listener for Send Button Click
sendButton.addEventListener('click', () => {
    const message = chatInput.value;
    if (message.trim() !== '') {
        // Create a new message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;

        // Append the message to the chat messages container
        chatMessages.appendChild(messageElement);

        // Clear the chat input
        chatInput.value = '';
    }
});

// Function to open the chat popup
function openChat() {
    document.getElementById("chatPopup").style.display = "block";
}

// Function to close the chat popup
function closeChat() {
    document.getElementById("chatPopup").style.display = "none";
}
// Close Button

// Event Listener for Close Button Click
closeButton.addEventListener('click', () => {
    chatPopup.style.display = 'none';
});
/*
// Function to change the language to English
function switchToEnglish() {
  document.documentElement.lang = "en";
  document.getElementById("header").textContent = "My Website";
  // Update other elements as needed
}

// Function to change the language to Spanish
function switchToSpanish() {
  document.documentElement.lang = "es";
  document.getElementById("header").textContent = "Mi Sitio Web";
  // Update other elements as needed
}
function switchToHindi() {
  document.documentElement.lang = "hi";
  document.getElementById("header").textContent = "मेरी वेबसाइट";
  document.getElementById("about").textContent = "मेरे बारे में";
  document.getElementById("resume").textContent = "शोध";
  document.getElementById("portfolio").textContent = "पोर्टफोलियो";
  document.getElementById("services").textContent = "सेवाएं";
  document.getElementById("contact").textContent = "संपर्क";
  // Update other elements as needed
}

document.getElementById("hindiButton").addEventListener("click", switchToHindi);

// Example usage: Call these functions when a language switch button is clicked
document.getElementById("englishButton").addEventListener("click", switchToEnglish);
document.getElementById("spanishButton").addEventListener("click", switchToSpanish);

*/