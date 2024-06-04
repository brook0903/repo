import { GoogleGenerativeAI } from "@google/generative-ai";

    // Fetch your API_KEY
    const API_KEY = window.prompt("請輸入你的api key");

    // Access your API key (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(API_KEY);

    // ...
    
      // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
      const chat = model.startChat({
        history: [
      
        ],
        generationConfig: {
          maxOutputTokens: 100,
        },
      });
      const messageInput = document.getElementById('message-input');
      const sendButton = document.getElementById('send-button');
      const chatMessages = document.querySelector('.chat-messages');
      
      messageInput.addEventListener("input", (e) => {
        messageInput.style.height = "50px"; // 設定初始高度
        messageInput.style.height = e.target.scrollHeight + "px"; // 根據內容調整高度
      });
      
      async function run() {
      const msg = messageInput.value.trim();
      document.getElementById('message-input').value="";
      displayMessage(msg, 'user-message');
      const result = await chat.sendMessage(msg);
      const response = await result.response;
      const text = response.text();
      
      displayMessage(text, 'bot-message');
    }


      function displayMessage(message, messageType) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', messageType);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
      
      
      sendButton.addEventListener('click', run);
      messageInput.addEventListener('keydown', function(event) {
        
        if (event.keyCode == 13 && !event.shiftKey) {
          run();
          
        }
        
        
      });