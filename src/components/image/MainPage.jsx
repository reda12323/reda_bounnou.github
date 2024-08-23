import React, { useState } from "react";
import './MainPage.css';

const MainPage = () => {
  const [description, setDescription] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [resolution, setResolution] = useState('1024x1024');
  const [images, setImages] = useState([]);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [error, setError] = useState('');

  // const generateImages = async () => {
  //   if (isRequestPending) {
  //     return; // Prevent multiple simultaneous requests
  //   }

  //   setIsRequestPending(true);
  //   const apiUrl = 'https://api.openai.com/v1/images/generations';
  //   const apiKey = 'YOUR_API_KEY_HERE';

  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${apiKey}`,
  //   };

  //   const data = {
  //     prompt: description,
  //     n: numImages,
  //     size: resolution,
  //   };

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers,
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     setImages(result.data.map((img) => img.url));

  //     setError(''); // Clear any previous error
  //   } catch (err) {
  //     console.error(`Error: ${err.message}`);
  //     setError(`Error: ${err.message}`);
  //   } finally {
  //     setIsRequestPending(false);
  //   }
  // };

  const generateImages = async () => {
    const dummyImages = Array.from({ length: numImages }, (_, i) => `https://via.placeholder.com/${resolution}?text=Image+${i+1}`);
    setImages(dummyImages);
    setDescription('');
  };

  return (
    <div className="AI-Image-Generator-I">
      <div className="border-text-I">
        <textarea
          placeholder="Describe the image you want..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description-text-I"
          name="description"
        ></textarea>

        <div className="dropdown-container-I">
          <label htmlFor="num-images-I">Number of Images:</label>
          <select id="num-images-I" value={numImages} onChange={(e) => setNumImages(e.target.value)}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>

          <label htmlFor="resolution-I">Resolution:</label>
          <select id="resolution-I" value={resolution} onChange={(e) => setResolution(e.target.value)}>
            <option value="512x512">512x512</option>
            <option value="1024x1024">1024x1024</option>
            <option value="1280x720">1280x720</option>
            <option value="1920x1080">1920x1080</option>
          </select>
        </div>

        <div className="p-2-I w-full-I">
          <button onClick={generateImages} className="button-text-I" disabled={isRequestPending}>
            {isRequestPending ? 'Generating...' : 'Generate Images'}
          </button>
        </div>
      </div>

      <section>
        <div className="images-container-I">
          {images.map((img, index) => (
            <div key={index} className="image-card-I">
              <img src={img} alt={`Generated ${index + 1}`} />
              <a href={img} download={`generated_image_${index + 1}.png`} className="download-link-I">Download</a>
            </div>
          ))}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </section>
    </div>
  );
};

export default MainPage;
