import React, { useState } from 'react';
import OpenAI from 'openai-api';



interface ImageGeneratorProps {
  apiKey: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ apiKey }) => {
  const openai = new OpenAI(apiKey);
  const [text, setText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [savedImages, setSavedImages] = useState<string[]>([]);

  const generateImage = async () => {
    const prompt = `${text.trim()} to image`;
    const model = 'image-alpha-001';
    const res = await openai.complete({
      engine: 'davinci',
      prompt,
      maxTokens: 2048,
      n: 1,
      stop: '\n',
      temperature: 0.7,
    });
    setImageURL(res.data.choices[0].text.trim());
    setText('');
  };

  const handleSaveImage = () => {
    setSavedImages([...savedImages, imageURL]);
    setImageURL('');
  };

  return (
    <div>
      <div className='container'>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={generateImage}>Generate Image</button>
      </div>
      <div>
        {imageURL && <img src={imageURL} alt="Generated Image" />}
        {imageURL && <button onClick={handleSaveImage}>Save Image</button>}
      </div>
      <div>
        {savedImages.map((image) => (
          <img key={image} src={image} alt="Saved Image" />
        ))}
      </div>
    </div>
  );
};

export default ImageGenerator;
