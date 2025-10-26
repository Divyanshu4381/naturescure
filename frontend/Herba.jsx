import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

const Herba = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [scale, setScale] = useState(1.2);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Play bot message with Murf voice
  useEffect(() => {
    if (isAudioEnabled && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === "bot") {
        speakWithMurf(lastMessage.text);
      }
    }
  }, [messages, isAudioEnabled]);

  // Adjust scale for screen sizes
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 640) setScale(1);
      else if (width < 1024) setScale(1.1);
      else setScale(1.2);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const formatResponse = (text) => {
    const cleanText = text.replace(/\*+/g, "").trim();
    return cleanText.split("\n").map((line, i) => (
      <p key={i} className="mb-2 break-words whitespace-pre-wrap">
        {line}
      </p>
    ));
  };

  // Murf.ai TTS function
  const speakWithMurf = async (text) => {
  if (!text || !isAudioEnabled) return;

  // Split long text into 200-char chunks
  const chunks = text.match(/.{1,200}/g);

  // Play chunks sequentially
  for (const chunk of chunks) {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: chunk }),
      });

      const data = await res.json();

      if (data.audioFile) {
        await new Promise((resolve) => {
          const audio = new Audio(data.audioFile);
          audio.onended = resolve; // Wait for this chunk to finish
          audio.play();
        });
      } else {
        console.error("❌ Murf response error:", data);
      }

      if (data.warning) console.warn("⚠️ Murf warning:", data.warning);
    } catch (err) {
      console.error("❌ Murf API error:", err);
    }
  }
};





  // Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMessage = {
        text: data.reply
          ? data.reply.length > 800
            ? data.reply.slice(0, 800) + "..."
            : data.reply
          : "Koi response nahi mila!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("❌ Error fetching chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "❌ Error! Try again.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);
  };

  // Infinite scroll: load dummy older messages
  const loadOlderMessages = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const oldMessages = Array(3)
          .fill(0)
          .map((_, i) => ({
            text: `📜 Old message ${i + 1}`,
            sender: "bot",
          }));
        setMessages((prev) => [...oldMessages, ...prev]);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl 
                   bg-white rounded-2xl shadow-xl flex flex-col h-[85vh] overflow-hidden"
        initial={{ opacity: 0, y: 50, scale: 1 }}
        animate={{ opacity: 1, y: 0, scale: scale }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-3 sm:p-4 rounded-t-2xl flex justify-between items-center shadow-md shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">🌱 Herba</h2>
            <p className="text-xs sm:text-sm opacity-80">Your AI Plant Guide</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className="p-2 text-white hover:bg-green-700 rounded-full transition-colors"
            >
              {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div
          id="scrollableDiv"
          className="flex-grow bg-gray-50 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100 p-4 sm:p-6 space-y-6 scroll-smooth"
        >
          <InfiniteScroll
            dataLength={messages.length}
            next={loadOlderMessages}
            hasMore={true}
            inverse={true}
            scrollableTarget="scrollableDiv"
          >
            {messages.length === 0 && (
              <p className="text-center text-gray-500 text-sm sm:text-base md:text-lg font-medium">
                Ask me anything about plants!
              </p>
            )}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`p-4 sm:p-5 rounded-xl max-w-[85%] sm:max-w-[80%] 
                           font-medium text-sm sm:text-base md:text-lg shadow-md 
                           break-words whitespace-pre-wrap overflow-hidden
                           ${msg.sender === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "mr-auto bg-green-200 text-black"
                  }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <strong className="block mb-2">
                  {msg.sender === "user" ? "You:" : "Herba:"}
                </strong>
                {formatResponse(msg.text)}
              </motion.div>
            ))}
            {loading && (
              <motion.div
                className="mr-auto p-4 sm:p-5 bg-green-200 text-black rounded-xl max-w-[85%] sm:max-w-[80%] font-medium text-sm sm:text-base md:text-lg shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <strong className="block mb-2">Herba:</strong>
                <span className="animate-pulse">Typing...</span>
              </motion.div>
            )}
            <div ref={chatEndRef}></div>
          </InfiniteScroll>
        </div>

        {/* Input Area */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-200 shrink-0">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about plants..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="w-full sm:flex-1 px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base md:text-lg text-black bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm disabled:bg-gray-200"
              disabled={loading}
            />
            <motion.button
              onClick={sendMessage}
              className={`w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-medium rounded-full shadow-md transition-all duration-200 ${loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
                }`}
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 text-gray-600 text-center text-xs sm:text-sm py-2 shrink-0">
          🌿 Powered by <span className="font-semibold">Nature’s Cure</span> | Learn about herbal plants anytime 🌱
        </div>
      </motion.div>
    </div>
  );
};

export default Herba;
