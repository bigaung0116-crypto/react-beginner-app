import { useState } from 'react';
import Header from "./components/Header";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [tone, setTone] = useState("Professional"); 
  const [generatedText, setGeneratedText] = useState("");

  const handleGenerate = async () => {
    // စာရိုက်ထားခြင်း မရှိရင် Alert ပြပြီး ဒီအတိုင်း ရပ်လိုက်မယ်
    if (!userInput.trim()) {
      alert("Please type something!");
      return;
    }

    setGeneratedText("AI is thinking… ");

    try {
      // API Key နှင့် Model ကို စနစ်တကျ ပြန်ပြင်ထားပါတယ်
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      // အရင်က "gemini-1.5-flash" သို့မဟုတ် "gemini-1.5-flash-001" နေရာမှာ ဒါကို ပြောင်းရေးပါ
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      // single quote မဟုတ်ဘဲ Backtick ( ` ) ကို သုံးထားပါတယ်
      const prompt = `Write a ${tone} content about: ${userInput}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setGeneratedText(text); // () အပိုကို ဖြုတ်လိုက်ပါတယ်
    } catch (error) {
      console.error("Error:", error);
      setGeneratedText("Something went wrong. Please check your API key!");
    } // catch block ရဲ့ တွန့်ကွင်းအပိတ် ထည့်ပေးထားပါတယ်
  };

  return (
    <div>
      <Header />
      <main className="app-container">
        <h2 className="app-title">Day6: Premium AI Content Generator</h2>
        
        <textarea
          className="input-textarea"
          placeholder='ဒီနေရာမှာတစ်ခုခုရေးပါ'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <div className="tone-selector">
          <label>Choose Tone: </label>
          <select className="tone-select" value={tone} onChange={(e) => setTonw(e.target.value)}></select>
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="Professional">Professional</option>
            <option value="Funny">Funny</option>
            <option value="Romantic">Romantic</option>
          </select>
        </div>
        <button className="generate-button" onClick={handleGenerate}>Generate Content</button>
        {userInput && (
          <div className="preview-box">
            <strong>Live Input Preview:</strong> ({tone})
            <p style={{ margin: '5px 0 0 0' }}>{userInput}</p>
          </div>
        )}
        {generatedText && (
          <div className="response-container">
            <strong> AI Response Preview:</strong>
            <div style={{ marginTop: '15px', lineHeight: '1.7', textAlign: 'left' }}>
              <ReactMarkdown>{generatedText}</ReactMarkdown>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;