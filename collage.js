// script.js

// Function to handle the reset button click
function handleReset() {
    // Clear the image previews and collage container
    const collageContainer = document.getElementById('collageContainer');
    collageContainer.innerHTML = '';
    
    // Reset the file input
    const imageInput = document.getElementById('imageInput');
    imageInput.value = '';
  }
  
  // Attach the handleReset function to the reset button
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', handleReset);
  

// Function to handle the file selection
function handleFileSelect(event) {
    const files = event.target.files; // Get the selected files
    
    // Read each selected file and display the preview
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Create a FileReader object to read the file
      const reader = new FileReader();
      
      // Set up the FileReader event handlers
      reader.onload = function(event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        
        // Append the image preview to the collage container
        const collageContainer = document.getElementById('collageContainer');
        collageContainer.appendChild(img);
      };
      
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }
  
  // Attach the handleFileSelect function to the file input
  const imageInput = document.getElementById('imageInput');
  imageInput.addEventListener('change', handleFileSelect);
  
  // Function to generate the collage
  function generateCollage() {
    const imagePreviews = document.querySelectorAll('#collageContainer img');
    
    if (imagePreviews.length === 0) {
      alert('Please select images first.');
      return;
    }
    
    const collageWidth = 800;
    const collageHeight = 600;
    
    // Create a new canvas element
    const canvas = document.createElement('canvas');
    canvas.width = collageWidth;
    canvas.height = collageHeight;
    
    // Get the 2D drawing context of the canvas
    const context = canvas.getContext('2d');
    
    // Calculate the position to place each image
    const imageWidth = collageWidth / 2;
    const imageHeight = collageHeight / 2;
    const positions = [
      { x: 0, y: 0 },
      { x: imageWidth, y: 0 },
      { x: 0, y: imageHeight },
      { x: imageWidth, y: imageHeight },
    ];
    
    // Load and draw each image on the canvas
    let loadedImages = 0;
    imagePreviews.forEach(function(imagePreview, index) {
      const image = new Image();
      image.onload = function() {
        context.drawImage(image, positions[index].x, positions[index].y, imageWidth, imageHeight);
        loadedImages++;
        if (loadedImages === imagePreviews.length) {
          const collageContainer = document.getElementById('collageContainer');
          collageContainer.innerHTML = '';
          collageContainer.appendChild(canvas);
        }
      };
      image.src = imagePreview.src;
    });
  }
  

  const generateButton = document.getElementById('generateButton');
  generateButton.addEventListener('click', generateCollage);