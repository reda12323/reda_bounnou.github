import React, { useState } from "react";
import './MainPage.css'
import useCounter from "../counter/Counter";
import UICounter from "../menu/UICounter";
import UpgradeModal from "../counter/UpgradeModal";
const MainPage = () => {
  const { count, maxCount, incrementCount } = useCounter(); 
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [qteBefore, setQteBefore] = useState([]);
  const [smrBefore, setSmrBefore] = useState([]);
  const [list, setList] = useState([]);
  const [isRequestPending, setIsRequestPending] = useState(false);

  // const summarize = async () => {
  //   if (isRequestPending) {
  //     return; // Prevent multiple simultaneous requests
  //   }

  //   setIsRequestPending(true);
  //   const apiUrl = 'https://api.openai.com/v1/chat/completions';
  //   const apiKey = 'API HERE';

  //   if (!apiKey) {
  //     setError('API key is missing');
  //     setIsRequestPending(false);
  //     return;
  //   }

  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${apiKey}`,
  //   };

  //   const data = {
  //     model: 'gpt-3.5-turbo',
  //     messages: [
  //       { role: 'system', content: 'You are a helpful assistant. You have to summarize the text provided by the user.' },
  //       { role: 'user', content },
  //     ],
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
  //     if (result.choices && result.choices.length > 0) {
  //       const summary = result.choices[0].message.content;
  //       setSummary(summary);

  //       const newQteBefore = { content };
  //       const newSmrBefore = { summary };

  //       setQteBefore([...qteBefore, newQteBefore]);
  //       setSmrBefore([...smrBefore, newSmrBefore]);
  //       setList([...list, { qteBefore: newQteBefore, smrBefore: newSmrBefore }]);

  //       setError(''); // Clear any previous error
  //       setContent(''); // Clear input after successful submission
  //     } else {
  //       throw new Error('No summary available');
  //     }
  //   } catch (err) {
  //     console.error(`Error: ${err.message}`);
  //     setError(`Error: ${err.message}`);
  //   } finally {
  //     setIsRequestPending(false);
  //   }
  // };

  const summarize = async () => {
    if (isRequestPending) return; 
    if (count >= maxCount) return; 

    setIsRequestPending(true);
    incrementCount(); 

   
    setTimeout(() => {
      const newQteBefore = { content };
      const newSmrBefore = { summary };

      setQteBefore([...qteBefore, newQteBefore]);
      setSmrBefore([...smrBefore, newSmrBefore]);
      setList([...list, { qteBefore: newQteBefore, smrBefore: newSmrBefore }]);
      setContent('');

      setIsRequestPending(false);
    }, 1000); 
  };

  return (
    <div className="AI-Conversation">
      <div className="border-text">
        <textarea placeholder="Type Here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="message-text"
          name="message"
        ></textarea>
        <div className="p-2 w-full">
        {count >= maxCount ? (
            <button
              disabled
              className="button-text"
            >
              {isRequestPending ? 'Generating...' : 'Max Reached'}
            </button>
          ) : (
            <button
              onClick={summarize}
              className="button-text"
              disabled={isRequestPending}
            >
              {isRequestPending ? 'Generating...' : `Generate ${count + 1}`}
            </button>
          )}
          <UpgradeModal count={count} maxCount={maxCount} />
        </div>
      </div>
      <section>
      <div>
        {list.reduceRight((acc, ele, index) => {
          acc.push(
            <div key={index}>
              <div
                className="div-answer-message v1"
                style={{
                  border: '1px solid #ddd',
                  marginBottom: '20px',
                  borderRadius: '5px',
                }}
              >
                <p className="P1">C:</p>
                <div  className="P2">
                  {ele.qteBefore.content}
                </div>
              </div>

              <div
                className="div-answer-message v2"
                style={{
                  border: '1px solid #ddd',
                  marginBottom: '20px',
                  borderRadius: '5px',
                }}
              >
                <p className="P1">S:</p>
                <div  className="P2">
                  {ele.smrBefore.summary}
                </div>
              </div>
            </div>
          );
          return acc;
        }, [])}
      </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </section>
      <UICounter count={count} maxCount={maxCount} />
    </div>
  );
};

export default MainPage;
