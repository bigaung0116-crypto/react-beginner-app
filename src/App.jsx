import { useState } from 'react';
import Header from "./components/Header";

function App() {
  const [userInput, setUserInput] = useState('');
  const [tone, setTone] = useState("Professional"); 
  const [generatedText, setGeneratedText] = useState("");

  const handleGenerate = () => {
    if (!userInput) return alert("Please type something first");
    
    // Backticks (`) ကို သုံးရပါမယ်
    const mockAIResponse = `AI is processing in a ${tone} tone...
    
Topic: ${userInput}

[DAY 4 ဒီနေရာမှာ တကယ် AI နဲ့ ချိတ်ဆက်သွားမှာပါ]`;
    
    setGeneratedText(mockAIResponse);
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
            cursor: 'pointer', // Spelling ပြင်လိုက်ပါတယ်
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold' // Spelling ပြင်လိုက်ပါတယ်
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
            {/* Tag ရဲ့ style object ကို သေချာပြန်ပိတ်ထားပါတယ် */}
            <p style={{ whiteSpace: 'pre-line', marginTop: '10px' }}>
              {generatedText}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;