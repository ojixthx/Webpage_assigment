// Hide splash screen and show main content after 4 seconds
setTimeout(() => {
    document.querySelector('.splash-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    window.location.href = "home.html";
  }, 4000);
  
  function signUp(activity) {
    alert("Thank you for signing up for " + activity + "!");
    console.log("User signed up for:", activity);
    // You can send this data to a server or store it
    }

  function donate() {
    alert("Thank you for your donation!");
    // You can redirect to a payment gateway here
    }

    function don(){
      alert("Thank You");
    }



// script.js

// ------------------ SPLASH SCREEN ----------------------
document.addEventListener("DOMContentLoaded", function () {
  const splashScreen = document.querySelector(".splash-screen");
  const content = document.querySelectorAll(".main-content");

  // Check if splashScreen and content elements exist
  if (splashScreen && content.length > 0) {
      // If splash screen hasn't been shown yet
      if (!sessionStorage.getItem("splashShown")) {
          splashScreen.style.display = "flex";
          content.forEach(element => element.style.display = "none");

          // Hide splash screen after 4 seconds and show content
          setTimeout(() => {
              splashScreen.style.display = "none";
              content.forEach(element => element.style.display = "block");
              sessionStorage.setItem("splashShown", "true");
          }, 4000);
      } else {
          // If splash screen has already been shown, directly show content
          splashScreen.style.display = "none";
          content.forEach(element => element.style.display = "block");
      }
  } else {
      console.warn("Splash screen or main content elements not found.");
  }
});

  // ------------------ GENERAL FUNCTIONS ----------------------

  // Generic function to show popup message.
  function showPopup(message) {
      document.getElementById('popup-message').innerText = message;
      document.getElementById('overlay').style.display = 'block';
      document.getElementById('popup').style.display = 'block';
  }

  // Generic function to close popup message.
  function closePopup() {
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('popup').style.display = 'none';
  }

  // Generic function to update character count
  function updateCharCount(textarea, counterElementId, maxLength) {
      const currentLength = textarea.value.length;
      const remaining = maxLength - currentLength;
      document.getElementById(counterElementId).textContent = remaining;
  }

  //Generic function to reset error styles.
  function resetErrorStyle(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
          element.style.display = 'none';
      }
  }

  //Generic function to reset feedback comment section
  function resetFeedbackSection(formId, commentId, commentsErrorId, charCountId, defaultCharCount) {
      // Reset the form
      document.getElementById(formId).reset();
      // Hiding errors if they are active
      resetErrorStyle(commentsErrorId);
      // Reseting character count
      document.getElementById(charCountId).innerText = defaultCharCount;
  }

  

  // ------------------ FEEDBACK SECTION FUNCTIONS ----------------------

  console.log("DOMContentLoaded event fired - Feedback section script running.");  // <--- DEBUGGING: Added log

  // Get references to the elements
  const feedbackForm = document.getElementById('feedbackForm');
  const nextButton = document.getElementById('nextButton');
  const resetButton = document.getElementById('resetButton');
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const addressInput = document.getElementById('address');
  const fileInput = document.getElementById('file');
  const satisfactionRadios = document.querySelectorAll('input[name="satisfaction"]');
  const ratingInput = document.getElementById('rating');
  const ratingValueSpan = document.getElementById('ratingValue');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const addressError = document.getElementById('addressError');
  const fileError = document.getElementById('fileError');
  const satisfactionError = document.getElementById('satisfactionError');
  const commentTextarea = document.getElementById('comment');
  const charCountSpan = document.getElementById('charCount');
  const submitButton = document.getElementById('submitButton');
  const resetPageTwoButton = document.getElementById('resetPageTwoButton');
  const messageParagraph = document.getElementById('message');
  const commentsError = document.getElementById('commentsError');
  const starsContainer = document.querySelector('.stars');
  let currentRating = 0;
  const scrollToTopBtn = document.querySelector(".scroll-to-top");


  // Function to show an error message
  function showError(element, message) {
      element.textContent = message;
      element.style.display = 'block';
  }

  // Function to hide an error message
  function hideError(element) {
      element.style.display = 'none';
  }
  //volenteer js 
  // Function to validate the form
  function validateForm() {
      let isValid = true;

      // Reset error messages
      document.querySelectorAll('.error').forEach(hideError);

      // Validate full name
      if (!nameInput.value.trim()) {
          showError(nameError, 'Name is required.');
          isValid = false;
      }

      // Validate email address
      if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
          showError(emailError, 'Enter a valid email.');
          isValid = false;
      }

      // Validate phone number
      if (!phoneInput.value.trim() || !/^\d{10}$/.test(phoneInput.value)) {
          showError(phoneError, 'Enter a 10-digit phone number.');
          isValid = false;
      }

      // Validate address
      if (!addressInput.value.trim()) {
          showError(addressError, 'Address is required.');
          isValid = false;
      }

      // Validate file
      if (fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
          const maxSize = 2 * 1024 * 1024; // 2MB

          if (!allowedTypes.includes(file.type)) {
              showError(fileError, 'Invalid file type. Only JPG, PNG, and PDF are allowed.');
              isValid = false;
          } else if (file.size > maxSize) {
              showError(fileError, 'File size too large. Maximum size is 2MB.');
              isValid = false;
          }
      }

      // Validate satisfaction
      let satisfactionSelected = false;
      satisfactionRadios.forEach(radio => {
          if (radio.checked) {
              satisfactionSelected = true;
          }
      });
      if (!satisfactionSelected) {
          showError(satisfactionError, 'Please select your satisfaction level.');
          isValid = false;
      }

      return isValid;
  }

  // Function to show the second page
  function showNextPage() {
      if (validateForm()) {
          page1.classList.remove('active');
          page2.classList.add('active');
      }
  }

  // Function to reset the first page
  function resetPageOne() {
      feedbackForm.reset();
      ratingInput.value = 5;
      ratingValueSpan.textContent = 5;
      document.querySelectorAll('.error').forEach(hideError);

  }

  // Function to update the rating value
  function updateRating() {
      ratingValueSpan.textContent = ratingInput.value;
  }

  // Function to update the star display based on the current rating
  function updateStarDisplay(rating) {
      const stars = document.querySelectorAll('.star i');
      stars.forEach((star, index) => {
          if (index < rating) {
              star.classList.remove('fa-regular', 'fa-star');
              star.classList.add('fa-solid', 'fa-star');
          } else {
              star.classList.remove('fa-solid', 'fa-star');
              star.classList.add('fa-regular', 'fa-star');
          }
      });
  }

  // Function to rate the feedback
  function rate(rating) {
      console.log("Rating clicked:", rating); // Debugging
      currentRating = rating;
      updateStarDisplay(rating);
  }

  // Function to submit the feedback
  function submitFeedback() {
      const comment = commentTextarea.value.trim();

      if (!comment) {
          showError(commentsError, 'Please provide your comments.');
          return;
      } else {
          hideError(commentsError);
      }

      // Simulate submission (replace with actual submission logic)
      messageParagraph.textContent = 'Feedback submitted successfully!';
      messageParagraph.style.color = '#00c177'; // Make success message green


      // Simulate potential error during submission
      const randomError = Math.random(); // Simulate error with 10% probability
      if (randomError < 0.1) {
          messageParagraph.textContent = 'Submission failed. Please try again.';
          messageParagraph.style.color = 'red'; // Indicate error
          setTimeout(() => {
              messageParagraph.textContent = '';
              messageParagraph.style.color = '';
          }, 3000);
          return; // Stop reset if error occurs
      }

      // Reset AFTER a slight delay to allow the success message to show briefly
      setTimeout(() => {
          resetPageTwoAndGoToOne();
          messageParagraph.textContent = ''; // Clear the message
          messageParagraph.style.color = ''; // Reset the color
      }, 1000); // 1 second delay.  Adjust as needed.
  }

  // Function to reset the second page and go to the first page
  function resetPageTwoAndGoToOne() {
      commentTextarea.value = ''; // Clear comment
      charCountSpan.textContent = '200'; // Reset char count
      resetStars(); // Reset stars
      page2.classList.remove('active'); // Hide Page 2
      page1.classList.add('active'); // Show Page 1
      resetPageOne();
  }

  // Function to reset the stars
  function resetStars() {
      const stars = document.querySelectorAll('.star i');
      stars.forEach(star => {
          star.classList.remove('fa-solid', 'fa-star');
          star.classList.add('fa-regular', 'fa-star');
      });
      currentRating = 0; // Reset the current rating to zero
      updateStarDisplay(0); // Set all stars to inactive state
  }

  // Event listener for the stars container
  starsContainer.addEventListener('click', function (event) {
      if (event.target.closest('.star')) { // Check if the clicked element or its parent has the class 'star'
          const starElement = event.target.closest('.star'); // Get the closest parent element with the class 'star'
          const rating = parseInt(starElement.dataset.rating); // Get the rating from the data-rating attribute
          rate(rating); // Call the rate function with the rating
      }
  });

  // Event listener for the next button
  nextButton.addEventListener('click', showNextPage);

  // Event listener for the reset button
  resetButton.addEventListener('click', resetPageOne);

  // Event listener for the submit button
  submitButton.addEventListener('click', submitFeedback);

  // Event listener for the reset page two button
  resetPageTwoButton.addEventListener('click', resetPageTwoAndGoToOne);

  // Event listener for the comment textarea
  commentTextarea.addEventListener('input', function () {
      const maxLength = 200;
      const currentLength = this.value.length;
      charCountSpan.textContent = maxLength - currentLength;
  });
  // Scroll to top button functionality
  window.onscroll = function () {
      scrollFunction()
  };

  function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          scrollToTopBtn.style.display = "block";
      } else {
          scrollToTopBtn.style.display = "none";
      }
  }

  function scrollToTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  // Call setupVolunteerButton when the DOM is ready
  setupVolunteerButton();
  ratingInput.addEventListener('input', updateRating);

  function rate(rating) {
      console.log("rate() called with rating:", rating);
      currentRating = rating;
      updateEmojiDisplay(rating);
      updateSelectedRatingText(rating);
  }

  function updateEmojiDisplay(rating) {
      console.log("updateEmojiDisplay() called with rating:", rating);
      const emojis = document.querySelectorAll(".emoji");
      console.log("Emojis found:", emojis); // **IMPORTANT**
      emojis.forEach(emoji => {
          console.log("Processing emoji:", emoji);
          const emojiRating = parseInt(emoji.getAttribute("data-rating"));
          console.log("Emoji rating:", emojiRating);
          if (emojiRating <= rating) {
              emoji.classList.add("selected");
          } else {
              emoji.classList.remove("selected");
          }
      });
  }

  function updateSelectedRatingText(rating) {
      const selectedRatingText = document.getElementById("selected-rating");
      selectedRatingText.textContent = `Selected Rating: ${rating}`;
  }


//   //----------------- VOLUNTEER BUTTON ----------------------
// /*   function setupVolunteerButton() {
//       const volunteerButton = document.querySelector(".volunteer-join-btn");
//       const donateButton = document.querySelector(".Donate-btn");
//       console.log("volunteerButton:", volunteerButton); //Debugging

//       if (volunteerButton) {
//           volunteerButton.addEventListener("click", showVolunteerForm);
//           console.log("Volunteer button event listener added."); //Debugging
//       } else {
//           console.warn("Volunteer button not found.");
//       }

//       if (donateButton) {
//           donateButton.addEventListener("click", showDonationForm);
//           console.log("Donate button event listener added."); //Debugging
//       } else {
//           console.warn("Donate button not found.");
//       }
//   }

//   //----------------- POPUP-VOLUNTEER BUTTON ----------------------
//   function showVolunteerForm() {
//       document.getElementById('volunteer-form').style.display = 'block';
//       document.getElementById('overlay').style.display = 'block';
//   }

//   // Function to close Volunteer popup message.
//   function closeVolunteerForm() {
//       document.getElementById('volunteer-form').style.display = 'none';
//       document.getElementById('overlay').style.display = 'none';
//   }

//   function showDonationForm() {
//       document.getElementById('Donation-form').style.display = 'block';
//       document.getElementById('overlay').style.display = 'block';
//   }

//   function closeDonationForm() {
//       document.getElementById('Donation-form').style.display = 'none';
//       document.getElementById('overlay').style.display = 'none';
//   }

//   function submitVolunteerForm(event) {
//       event.preventDefault(); // Prevent the default form submission

//       // Get form values
//       const fullName = document.querySelector("#volunteerForm input[type='text']").value;
//       const email = document.querySelector("#volunteerForm input[type='email']").value;
//       const age = document.getElementById("age").value;
//       const phoneNumber = document.querySelector("#volunteerForm input[type='tel']").value;
//       const gender = document.getElementById("gender").value;
//       const volunteerExperience = document.getElementById("volunteerExperience").value;
//       const previousVolunteering = document.getElementById("previousVolunteering").value;
//       const userEventChoosing = document.getElementById("userEventChoosing").value;

//       // Basic Validation (you can add more robust validation)
//       if (!fullName || !email || !age || !phoneNumber || !gender || !volunteerExperience || !previousVolunteering || !userEventChoosing) {
//           alert("Please fill in all required fields.");
//           return;
//       }

//       // You can now process the form data (e.g., send it to a server)
//       console.log("Volunteer Form Data:", {
//           fullName,
//           email,
//           age,
//           phoneNumber,
//           gender,
//           volunteerExperience,
//           previousVolunteering,
//           userEventChoosing
//       });

//       // Optionally, show a success message
//       alert("Thank you for volunteering!");

//       // Close the form (optional)
//       closeVolunteerForm();
//   }

//   function submitDonationForm(event) {
//       event.preventDefault(); // Prevent the default form submission

//       // Get form values
//       const fullName = document.querySelector("#donationForm input[type='text']").value;
//       const email = document.querySelector("#donationForm input[type='email']").value;
//       const donationAmount = document.querySelector("#donationForm input[type='number']").value;
//       const creditCardNumber = document.querySelector("#donationForm input[type='tel']").value;

//       // Basic Validation (you can add more robust validation)
//       if (!fullName || !email || !donationAmount || !creditCardNumber) {
//           alert("Please fill in all required fields.");
//           return;
//       }

//       // You can now process the form data (e.g., send it to a server)
//       console.log("Donation Form Data:", {
//           fullName,
//           email,
//           donationAmount,
//           creditCardNumber
//       });

//       // Optionally, show a success message
//       alert("Thank you for your donation!");

//       // Close the form (optional)
//       closeDonationForm();
//   }


// });*/