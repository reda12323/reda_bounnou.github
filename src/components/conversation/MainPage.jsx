import React, { useState } from "react";
import './MainPage.css';
import useCounter from "../counter/Counter";
import UICounter from "../menu/UICounter";
import UpgradeModal from "../counter/UpgradeModal";

const MainPage = () => {
  const { count, maxCount, incrementCount } = useCounter(); 
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [list, setList] = useState([]);
  const [isRequestPending, setIsRequestPending] = useState(false);

  const summarize = async () => {
    if (isRequestPending || count >= maxCount) return;
    
    setIsRequestPending(true);
    incrementCount();

    const apiUrl = "https://openrouter.ai/api/v1/chat/completions";
    const apiKey = "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"; // Store securely

    const headers = {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const data = {
      model: "deepseek/deepseek-chat:free",
      messages: [
        { role: "user", content },
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.choices && result.choices.length > 0) {
        const summary = result.choices[0].message.content;
        setSummary(summary);
        setList([...list, { content, summary }]);
        setContent('');
        setError('');
      } else {
        throw new Error("No summary available");
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      setError(`Error: ${err.message}`);
    } finally {
      setIsRequestPending(false);
    }
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
            <button disabled className="button-text">
              {isRequestPending ? 'Generating...' : 'Max Reached'}
            </button>
          ) : (
            <button onClick={summarize} className="button-text" disabled={isRequestPending}>
              {isRequestPending ? 'Generating...' : `Generate ${count + 1}`}
            </button>
          )}
          <UpgradeModal count={count} maxCount={maxCount} />
        </div>
      </div>
      <section>
        <div>
          {list.reduceRight((acc, ele, index) => (
            acc.concat(
              <div key={index}>
                <div className="div-answer-message v1" style={{ border: '1px solid #ddd', marginBottom: '20px', borderRadius: '5px' }}>
                  <p className="P1">C:</p>
                  <div className="P2">{ele.content}</div>
                </div>
                <div className="div-answer-message v2" style={{ border: '1px solid #ddd', marginBottom: '20px', borderRadius: '5px' }}>
                  <p className="P1">S:</p>
                  <div className="P2">{ele.summary}</div>
                </div>
              </div>
            )
          ), [])}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </section>
      <UICounter count={count} maxCount={maxCount} />
    </div>
  );
};

export default MainPage;
