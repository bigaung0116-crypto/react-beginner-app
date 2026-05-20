import { useState } from 'react';
import Header from "./components/Header";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

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
      <main style={{ padding: '20px' }}>
        <h2> Day 3 AI APP logic</h2>
        
        <textarea
          placeholder='ဒီနေရာမှာတစ်ခုခုရေးပါ'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ width: '100%', height: '100px', padding: '10px' }}
        />

        <div style={{ marginTop: '10px' }}>
          <label>Choose Tone: </label>
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="Professional">Professional</option>
            <option value="Funny">Funny</option>
            <option value="Romantic">Romantic</option>
          </select>
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#f4f4f4', 
          borderRadius: '8px' 
        }}>
          <strong>သင်ရိုက်နေတဲ့စာသား:</strong>
          <p>{userInput}</p>
          <p><strong>Selected Tone: </strong>{tone}</p>
        </div>

        <button 
          onClick={handleGenerate}
          style={{
            marginTop: '10px',
            padding: '7px 20px',
            cursor: 'pointer',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Generate
        </button>

        {generatedText && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#e3f2fd',
            borderLeft: '5px solid #2196f3',
            borderRadius: '4px'
          }}>
            <strong>AI Response Preview:</strong>
            <div style={{ marginTop: '15px', lineHeight: '1.6', textAlign: 'left' }}>
              <ReactMarkdown>{generatedText}</ReactMarkdown>
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}

export default App;