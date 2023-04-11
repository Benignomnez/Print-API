import React from 'react';
import ImageGenerator from './components/ImageGenerator';
import Orderform from './components/OrderForm';

const apiKey = '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';

const App: React.FC = () => {
  return (
    <div>
      <h1>Generate Images with OpenAI</h1>
      <ImageGenerator apiKey={apiKey} />
      <Orderform />
    </div>
  );
};

export default App;
