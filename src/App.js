import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Square,
  Trophy,
  Flame,
  Coins,
  Calendar,
  Clock,
  Settings,
  MessageSquare,
  Star,
  Gift,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Zap,
  Globe,
  Sparkles,
  ShieldAlert,
  Dices,
  Coffee,
  ListTodo,
  Bot,
  Crown,
  ArrowUp,
  Skull,
  ChevronDown,
  Activity,
  TrendingUp,
  Key,
  X,
  Save,
  Lightbulb,
  Target,
} from "lucide-react";

// --- STYLES TỐI ƯU HÓA CHO ANDROID WEBVIEW / MOBILE APP ---
const customStyles = `
  :root {
    --safe-area-inset-top: env(safe-area-inset-top, 0px);
    --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
  }
  
  body {
    overscroll-behavior-y: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: pan-x pan-y;
    background-color: #020617;
  }

  input, textarea {
    -webkit-user-select: auto;
    user-select: auto;
  }

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  @keyframes floatUp {
    0% { opacity: 0; transform: translateY(20px) scale(0.8); }
    20% { opacity: 1; transform: translateY(0) scale(1.2); }
    80% { opacity: 1; transform: translateY(-40px) scale(1); }
    100% { opacity: 0; transform: translateY(-60px) scale(0.8); }
  }
  .animate-float { animation: floatUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
  
  @keyframes holoShine {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .holo-card { background-size: 200% 200%; animation: holoShine 3s ease infinite; }
  
  @keyframes screenShake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
  .animate-shake { animation: screenShake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
  
  .progress-bar-fill { transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
  
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 15px rgba(249, 115, 22, 0.4); }
    50% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.8); }
  }
  .combo-fire { animation: pulseGlow 1.5s infinite; }
`;

const i18n = {
  vi: {
    appTitle: "KỶ LUẬT THÉP",
    points: "Điểm",
    level: "Cấp",
    streak: "Chuỗi",
    day: "Ngày",
    tasks: "Nhiệm Vụ",
    rewards: "Gacha",
    ai: "AI Hub",
    drawNormal: "Rút Thường",
    drawExtreme: "Thử Thách Khó",
    emptyTasks: "Sạch bóng nhiệm vụ!",
    drawTip: "Rút nhiệm vụ hằng ngày để duy trì kỷ luật.",
    start: "LÀM NGAY",
    giveUp: "BỎ CUỘC",
    completeEarly: "HOÀN THÀNH SỚM",
    gachaTitle: "KHO BÁU GIẢI TRÍ",
    gachaSub: "Đổi điểm kỷ luật lấy những phút giây giải trí xả láng.",
    rollBtn: "RÚT THẺ",
    rolling: "ĐANG QUAY THƯỞNG...",
    inventory: "TÚI ĐỒ XẢ HƠI",
    useCard: "DÙNG THẺ",
    aiHubTitle: "Trung Tâm Chỉ Huy AI",
    timePrompt: "Bạn rảnh bao nhiêu giờ?",
    generate: "Tạo Lịch Trình",
    analyzeProgress: "Phân Tích Tiến Độ",
    aiThinking: "Hệ thống đang nạp dữ liệu...",
    settings: "Cài Đặt API",
    apiKeyStr: "Google Gemini API Key",
    save: "Lưu Cài Đặt",
    close: "Đóng",
    apiHelp:
      "Tự động nhận diện mô hình mạnh nhất. Dùng Key cá nhân để AI thông minh hơn.",
    askAiTip: "✨ Gợi ý cách làm",
    loadingTip: "Đang nhờ AI tư vấn...",
    aiAdvisor: "AI Cố Vấn",
    askPepTalk: "✨ AI TRUYỀN LỬA (CHỐNG TRÌ HOÃN)",
    pepTalkTitle: "HUẤN LUYỆN VIÊN THÉP",
    goalPrompt: "VD: Đọc xong 1 cuốn sách, dọn phòng...",
    breakdownBtn: "✨ Phân Rã Mục Tiêu",
    langName: "Tiếng Việt",
  },
  en: {
    appTitle: "IRON DISCIPLINE",
    points: "Pts",
    level: "Lvl",
    streak: "Streak",
    day: "Days",
    tasks: "Tasks",
    rewards: "Gacha",
    ai: "AI Hub",
    drawNormal: "Normal Draw",
    drawExtreme: "Extreme Challenge",
    emptyTasks: "No active tasks!",
    drawTip: "Draw a daily task to keep the discipline.",
    start: "START NOW",
    giveUp: "GIVE UP",
    completeEarly: "COMPLETE EARLY",
    gachaTitle: "LEISURE TREASURE",
    gachaSub: "Burn discipline points for proper rest & leisure time.",
    rollBtn: "ROLL NOW",
    rolling: "SPINNING...",
    inventory: "LEISURE STASH",
    useCard: "USE CARD",
    aiHubTitle: "AI Command Center",
    timePrompt: "How many hours free?",
    generate: "Generate Schedule",
    analyzeProgress: "Analyze Progress",
    aiThinking: "System loading data...",
    settings: "API Settings",
    apiKeyStr: "Google Gemini API Key",
    save: "Save Settings",
    close: "Close",
    apiHelp: "Enter Key for custom model access without errors.",
    askAiTip: "✨ AI Action Plan",
    loadingTip: "Consulting AI...",
    aiAdvisor: "AI Advisor",
    askPepTalk: "✨ AI PEP TALK",
    pepTalkTitle: "IRON DRILL SERGEANT",
    goalPrompt: "E.g., Clean room, Read a chapter...",
    breakdownBtn: "✨ Break Down Goal",
    langName: "English",
  },
};
Object.keys(i18n).forEach((l) => {
  if (l !== "vi" && l !== "en") i18n[l] = { ...i18n.vi, ...i18n[l] };
});

// Phần thưởng được quy định độ hiếm theo thời gian nghỉ ngơi
const REWARD_TIERS = {
  COMMON: {
    name: "Thường",
    color: "text-slate-300",
    bg: "bg-slate-800/80",
    border: "border-slate-600",
    chance: 50,
    durations: [5, 10, 15],
  },
  UNCOMMON: {
    name: "Khá",
    color: "text-emerald-400",
    bg: "bg-emerald-950/80",
    border: "border-emerald-600",
    chance: 30,
    durations: [20, 30],
  },
  RARE: {
    name: "Hiếm",
    color: "text-blue-400",
    bg: "bg-blue-950/80",
    border: "border-blue-500",
    chance: 12,
    durations: [45, 60],
  },
  EPIC: {
    name: "Cực Hiếm",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-950/80",
    border: "border-fuchsia-500",
    chance: 6,
    durations: [90],
  },
  LEGENDARY: {
    name: "Huyền Thoại",
    color: "text-yellow-300",
    bg: "bg-gradient-to-br from-yellow-700/80 to-amber-900/80",
    border: "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]",
    chance: 1.8,
    durations: [120],
  },
  MYTHIC: {
    name: "Thần Thoại",
    color: "text-red-100",
    bg: "bg-gradient-to-br from-red-600 via-purple-700 to-rose-900 holo-card",
    border: "border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.7)]",
    chance: 0.2,
    durations: [240],
  },
};

const RANKS = [
  { maxLevel: 5, name: "Tân Binh", icon: Trophy, color: "text-slate-400" },
  { maxLevel: 10, name: "Kẻ Đuổi Bắt", icon: Star, color: "text-emerald-400" },
  { maxLevel: 20, name: "Chiến Binh", icon: Zap, color: "text-blue-400" },
  { maxLevel: 50, name: "Chiến Thần", icon: Crown, color: "text-yellow-400" },
  { maxLevel: 999, name: "Kẻ Hủy Diệt", icon: Flame, color: "text-red-500" },
];

const FALLBACK_TASKS = [
  {
    n: "Dọn dẹp bàn làm việc/học tập",
    d: "Giữ không gian gọn gàng giúp tâm trí tập trung hơn.",
    diff: 1,
    dur: 10,
  },
  {
    n: "Đọc 10 trang sách",
    d: "Nuôi dưỡng thói quen thu nạp kiến thức mỗi ngày.",
    diff: 2,
    dur: 15,
  },
  {
    n: "Uống 1 cốc nước đầy",
    d: "Cấp nước ngay lập tức cho cơ thể và não bộ.",
    diff: 1,
    dur: 2,
  },
  {
    n: "Vận động nhẹ: 20 cái hít đất / Squat",
    d: "Đánh thức cơ bắp, tăng tuần hoàn máu.",
    diff: 3,
    dur: 5,
  },
  {
    n: "Học 5 từ vựng mới",
    d: "Tích tiểu thành đại, mở rộng vốn từ.",
    diff: 2,
    dur: 10,
  },
  {
    n: "Không chạm điện thoại trong 30 phút",
    d: "Cai nghiện Dopamine, tập trung hoàn toàn vào hiện tại.",
    diff: 4,
    dur: 30,
  },
];

// ====================================================================================
// ĐIỀN API KEY VÀO ĐÂY
// ====================================================================================
const HARDCODED_API_KEY = "AIzaSyBApskOVCUe4gvsl_lQPppkX9ZP-etqTH8";

export default function App() {
  const [lang, setLang] = useState("vi");
  const t = i18n[lang];
  const [langOpen, setLangOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");
  const [savedApiKey, setSavedApiKey] = useState(
    () => localStorage.getItem("klt_api_key") || ""
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempKey, setTempKey] = useState(savedApiKey);

  const [points, setPoints] = useState(100);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [isShaking, setIsShaking] = useState(false);

  const [freeTime, setFreeTime] = useState(2);
  const [bigGoal, setBigGoal] = useState("");
  const [tasks, setTasks] = useState([]);
  const [aiMessage, setAiMessage] = useState("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const [activeTask, setActiveTask] = useState(null);
  const [taskTimerRemaining, setTaskTimerRemaining] = useState(0);
  const taskTimerRef = useRef(null);

  const [activeTaskTip, setActiveTaskTip] = useState("");
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [pepTalkMsg, setPepTalkMsg] = useState("");
  const [isLoadingPepTalk, setIsLoadingPepTalk] = useState(false);

  const [gachaState, setGachaState] = useState("idle");
  const [gachaResult, setGachaResult] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [activeReward, setActiveReward] = useState(null);
  const [rewardTimerRemaining, setRewardTimerRemaining] = useState(0);
  const rewardTimerRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (activeTask && taskTimerRemaining > 0) {
      taskTimerRef.current = setInterval(
        () => setTaskTimerRemaining((prev) => prev - 1),
        1000
      );
    } else if (activeTask && taskTimerRemaining <= 0) handleTaskComplete();
    return () => clearInterval(taskTimerRef.current);
  }, [activeTask, taskTimerRemaining]);

  // Bộ đếm thời gian cho phần thưởng
  useEffect(() => {
    if (activeReward && rewardTimerRemaining > 0) {
      rewardTimerRef.current = setInterval(
        () => setRewardTimerRemaining((prev) => prev - 1),
        1000
      );
    } else if (activeReward && rewardTimerRemaining <= 0)
      handleRewardComplete();
    return () => clearInterval(rewardTimerRef.current);
  }, [activeReward, rewardTimerRemaining]);

  const playSound = (type) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === "complete") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === "fail") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === "charge") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.5);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.5);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const getCurrentRank = () =>
    RANKS.find((r) => level <= r.maxLevel) || RANKS[RANKS.length - 1];
  const getComboMultiplier = () => 1 + combo * 0.1;
  const getExpProgress = () =>
    Math.max(0, Math.min(100, (points / (level * 1000)) * 100));

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const spawnFloatingText = (text, type = "success") => {
    const id = Date.now() + Math.random();
    setFloatingTexts((prev) => [...prev, { id, text, type }]);
    setTimeout(
      () => setFloatingTexts((prev) => prev.filter((t) => t.id !== id)),
      1500
    );
  };

  const calculatePoints = (duration, difficulty, success = true) => {
    const diffMultiplier = [1, 1.5, 2.5, 4, 6][difficulty - 1];
    const base = duration * diffMultiplier * 2;
    if (success) return Math.floor(base * getComboMultiplier());
    return Math.floor(-(base * 1.5));
  };

  const handleSaveSettings = () => {
    const key = tempKey.trim();
    setSavedApiKey(key);
    localStorage.setItem("klt_api_key", key);
    setIsSettingsOpen(false);
    spawnFloatingText("ĐÃ LƯU!", "success");
  };

  // =========================================================================
  // API GEMINI ENGINE
  // =========================================================================
  const callGeminiAPI = async (prompt, silent = false, isJson = false) => {
    if (!silent) setIsLoadingAi(true);
    const activeKey = HARDCODED_API_KEY || savedApiKey.trim();
    const modelsToTry = activeKey
      ? ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"]
      : ["gemini-2.5-flash-preview-09-2025"];

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8 },
    };

    let resultText = null;
    let finalErrorMsg = "";

    for (let i = 0; i < modelsToTry.length; i++) {
      const model = modelsToTry[i];
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 404) {
            finalErrorMsg = `Model ${model} bị 404`;
            continue;
          }
          throw new Error(`Lỗi ${response.status}`);
        }

        const data = await response.json();
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        if (isJson && text) {
          const startArr = text.indexOf("[");
          const endArr = text.lastIndexOf("]");
          if (startArr !== -1 && endArr !== -1) {
            text = text.substring(startArr, endArr + 1);
          } else {
            const startObj = text.indexOf("{");
            const endObj = text.lastIndexOf("}");
            if (startObj !== -1 && endObj !== -1) {
              text = text.substring(startObj, endObj + 1);
            }
          }
        }

        resultText = text;
        break;
      } catch (e) {
        console.error(`API Error tại ${model}:`, e);
        finalErrorMsg = e.message;
        if (e.message.includes("API_KEY_INVALID")) break;
      }
    }

    if (!silent) setIsLoadingAi(false);
    if (resultText) return resultText;
    else {
      if (!silent) setAiMessage(`❌ Lỗi API: ${finalErrorMsg}`);
      return null;
    }
  };

  const getFallbackTask = (diff, isExtreme) => {
    const pool = FALLBACK_TASKS.filter((t) =>
      isExtreme ? t.diff >= 3 : t.diff <= 2
    );
    const chosen =
      pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : FALLBACK_TASKS[0];
    return {
      id: `fb_${Date.now()}`,
      name: chosen.n,
      duration: chosen.dur,
      difficulty: chosen.diff,
      description: chosen.d + " (Dự phòng)",
    };
  };

  const loadFallbackSchedule = () => {
    const fallbackTasks = [
      getFallbackTask(1, false),
      getFallbackTask(2, false),
      getFallbackTask(3, false),
    ];
    setTasks(fallbackTasks);
    setActiveTab("tasks");
  };

  const handlePepTalk = async () => {
    setIsLoadingPepTalk(true);
    const randomSeed = Math.floor(Math.random() * 999999);
    const prompt = `[Seed: ${randomSeed}] Đóng vai một người lính huấn luyện kỷ luật thép. Hãy viết 1 CÂU NGẮN (dưới 20 chữ) cực kỳ đanh thép để đánh thức tôi khỏi sự lười biếng. Ngôn ngữ: ${i18n[lang].langName}.`;
    const res = await callGeminiAPI(prompt, true, false);
    if (res) {
      setPepTalkMsg(res.replace(/["'*]/g, "").trim());
      triggerShake();
      playSound("fail");
      setTimeout(() => setPepTalkMsg(""), 6000);
    }
    setIsLoadingPepTalk(false);
  };

  const handleBreakdownGoal = async () => {
    if (!bigGoal.trim()) return;
    setIsLoadingAi(true);
    setAiMessage("Đang phân rã mục tiêu...");
    const randomSeed = Math.floor(Math.random() * 999999);
    const prompt = `[Seed: ${randomSeed}] Mục tiêu của tôi: "${bigGoal}". Hãy chia thành 3 nhiệm vụ nhỏ HẰNG NGÀY có thể làm ngay. Trả về mảng JSON: [{"id": "g_${Date.now()}_1", "name": "Tên ngắn", "duration": số_phút_10_đến_30, "difficulty": số_1_đến_4, "description": "Lý do"}].`;

    const res = await callGeminiAPI(prompt, false, true);
    if (res) {
      try {
        const parsedData = JSON.parse(res);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setTasks((prev) => [...parsedData, ...prev]);
          setActiveTab("tasks");
          setAiMessage("Đã phân rã mục tiêu thành công!");
          setBigGoal("");
        } else throw new Error("Empty array");
      } catch (e) {
        setAiMessage("Lỗi xử lý dữ liệu. Thử lại sau.");
      }
    }
    setIsLoadingAi(false);
  };

  const drawRandomTask = async (isExtreme = false) => {
    setIsLoadingAi(true);
    setAiMessage(
      isExtreme
        ? "🔥 Đang tìm kiếm thử thách..."
        : "🎲 Đang chọn một nhiệm vụ nhỏ hằng ngày..."
    );

    let diff = isExtreme
      ? Math.random() > 0.5
        ? 4
        : 5
      : Math.random() > 0.6
      ? 3
      : Math.random() > 0.3
      ? 2
      : 1;
    const randomSeed = Math.floor(Math.random() * 999999);

    const prompt = `[Seed: ${randomSeed}] Tạo 1 nhiệm vụ rèn luyện HẰNG NGÀY thực tế và quen thuộc (VD: Đọc sách, học bài, dọn dẹp, rửa bát, tập thể dục nhẹ, uống nước, giãn cơ...). 
    Độ khó ${diff}/5. ${
      isExtreme
        ? "Hãy chọn một nhiệm vụ có chút tốn sức mồ hôi hoặc cần tập trung cao."
        : "Nhiệm vụ nhẹ nhàng, dễ bắt đầu ngay."
    } 
    Trả về DUY NHẤT một mảng JSON: [{"id": "t_${Date.now()}", "name": "Tên nhiệm vụ cụ thể", "duration": số_phút_từ_5_đến_45, "difficulty": ${diff}, "description": "Tại sao việc nhỏ này lại có ích?"}]`;

    let aiText = await callGeminiAPI(prompt, true, true);
    let newTask;
    if (aiText) {
      try {
        newTask = JSON.parse(aiText)[0];
        if (typeof newTask.duration !== "number") newTask.duration = 15;
      } catch (e) {
        newTask = getFallbackTask(diff, isExtreme);
      }
    } else {
      newTask = getFallbackTask(diff, isExtreme);
    }

    setTimeout(() => {
      setTasks((prev) => [newTask, ...prev]);
      if (!newTask.description.includes("Dự phòng"))
        setAiMessage(
          isExtreme ? `💀 THỬ THÁCH ĐÃ ĐẾN!` : `✨ Nhiệm vụ ${diff}⭐ mới!`
        );
      setIsLoadingAi(false);
      setActiveTab("tasks");
    }, 500);
  };

  const analyzeProgress = async () => {
    setIsLoadingAi(true);
    setAiMessage(t.aiThinking || "Đang phân tích dữ liệu...");
    const prompt = `Tôi là người dùng Kỷ Luật Thép. Cấp độ ${level}, Điểm ${points}, Chuỗi duy trì ${streak} ngày, Combo ${combo}. Hãy nhận xét ngắn gọn như một HLV. Dùng emoji, tiếng Việt.`;
    const res = await callGeminiAPI(prompt, false, false);
    if (res) setAiMessage(res);
    setIsLoadingAi(false);
  };

  const handleGenerateSchedule = async () => {
    setIsLoadingAi(true);
    setAiMessage("Đang tính toán lịch trình...");
    const randomSeed = Math.floor(Math.random() * 999999);
    const prompt = `[Seed: ${randomSeed}] Tôi rảnh ${freeTime} giờ. Tạo danh sách 3-4 thói quen tốt bình dị HẰNG NGÀY (học, đọc, dọn, tập). Tổng thời gian khoảng ${
      freeTime * 60
    } phút. Trả về JSON mảng: [{"id": "r_${Date.now()}", "name": "Tên", "duration": số_phút_hợp_lý, "difficulty": số_1_đến_5, "description": "Lý do"}].`;
    const res = await callGeminiAPI(prompt, false, true);
    if (res) {
      try {
        const parsedData = JSON.parse(res);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setTasks(parsedData);
          setActiveTab("tasks");
          setAiMessage("Tạo lịch trình thành công!");
        } else throw new Error("Empty array");
      } catch (e) {
        setAiMessage(`Lỗi dữ liệu. Nạp lịch trình mẫu...`);
        setTimeout(loadFallbackSchedule, 2000);
      }
    } else {
      setTimeout(loadFallbackSchedule, 2000);
    }
  };

  const getTaskTip = async () => {
    if (!activeTask) return;
    setIsLoadingTip(true);
    const prompt = `Nhiệm vụ của tôi: "${activeTask.name}". Cho tôi 3 bước cực ngắn để bắt tay vào làm ngay. Ngôn ngữ: ${i18n[lang].langName}.`;
    const tip = await callGeminiAPI(prompt, true, false);
    if (tip) setActiveTaskTip(tip);
    setIsLoadingTip(false);
  };

  const startTask = (task) => {
    if (activeReward) return spawnFloatingText("ĐANG NGHỈ NGƠI!", "fail");
    setActiveTask(task);
    setActiveTaskTip("");
    setTaskTimerRemaining(task.duration * 60);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CẬP NHẬT: HÀM BẮT ĐẦU SỬ DỤNG PHẦN THƯỞNG VÀ CHẠY TIMER
  const startReward = (item) => {
    if (activeTask) return spawnFloatingText("ĐANG LÀM NHIỆM VỤ!", "fail");
    setActiveReward(item);
    setRewardTimerRemaining(item.duration * 60); // Set timer cho phần thưởng
    setInventory((prev) => prev.filter((r) => r.id !== item.id));
    setGachaState("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTaskComplete = () => {
    playSound("complete");
    clearInterval(taskTimerRef.current);
    const earned = calculatePoints(
      activeTask.duration,
      activeTask.difficulty,
      true
    );
    setPoints((prev) => prev + earned);
    setCombo((prev) => prev + 1);
    spawnFloatingText(`+${earned} ĐIỂM!`, "success");
    if (combo > 0)
      setTimeout(
        () => spawnFloatingText(`COMBO x${combo + 1} 🔥`, "combo"),
        400
      );
    if (points + earned >= level * 1000) {
      setLevel((prev) => prev + 1);
      setTimeout(
        () => spawnFloatingText(`THĂNG CẤP ${level + 1}!`, "level"),
        800
      );
    }
    setTasks((prev) => prev.filter((t) => t.id !== activeTask.id));
    setActiveTask(null);
    setActiveTaskTip("");
  };

  const handleTaskGiveUp = () => {
    playSound("fail");
    triggerShake();
    clearInterval(taskTimerRef.current);
    const penalty = calculatePoints(
      activeTask.duration,
      activeTask.difficulty,
      false
    );
    setPoints((prev) => prev + penalty);
    setCombo(0);
    spawnFloatingText(`${penalty} ĐIỂM!`, "fail");
    setTimeout(() => spawnFloatingText(`GÃY COMBO! 💀`, "fail"), 400);
    setTasks((prev) => prev.filter((t) => t.id !== activeTask.id));
    setActiveTask(null);
    setActiveTaskTip("");
  };

  const handleRewardComplete = () => {
    playSound("complete");
    clearInterval(rewardTimerRef.current);
    setActiveReward(null);
    spawnFloatingText("HẾT GIỜ XẢ HƠI!", "level");
  };

  const handleRewardGacha = async () => {
    const cost = 250 * Math.max(1, Math.floor(level / 2));
    if (points < cost) return spawnFloatingText(`CẦN ${cost} ĐIỂM!`, "fail");
    setPoints((prev) => prev - cost);
    setGachaState("charging");
    playSound("charge");

    setTimeout(async () => {
      setGachaState("spinning");
      const rand = Math.random() * 100;
      let tierKey = "COMMON";
      let cum = 0;
      for (const [k, v] of Object.entries(REWARD_TIERS)) {
        cum += v.chance;
        if (rand <= cum) {
          tierKey = k;
          break;
        }
      }
      const info = REWARD_TIERS[tierKey];
      const duration =
        info.durations[Math.floor(Math.random() * info.durations.length)];

      const randomSeed = Math.floor(Math.random() * 99999);
      const prompt = `[Seed: ${randomSeed}] Tạo 1 phần thưởng NGHỈ NGƠI/GIẢI TRÍ cụ thể trong ĐÚNG ${duration} phút. 
      Độ hiếm: ${info.name}. (Ví dụ: "Nghỉ ngơi lướt mạng xã hội", "Chơi 1 ván game", "Xem YouTube", "Ngủ ngắn", "Nhâm nhi 1 ly trà"). 
      DUY NHẤT 1 CÂU NGẮN (dưới 10 chữ). Ngôn ngữ: ${i18n[lang].langName}.`;

      let resultItem = await callGeminiAPI(prompt, true, false);

      if (!resultItem || resultItem.length > 50) {
        const fallbacks = [
          `Lướt điện thoại giải trí`,
          `Chơi game xả stress`,
          `Nghe nhạc Chill nhắm mắt`,
          `Xem video Youtube`,
          `Nằm lười trên giường`,
        ];
        resultItem = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      } else {
        resultItem = resultItem.replace(/["'*]/g, "").trim();
      }

      const result = {
        id: `rew_${Date.now()}`,
        tier: tierKey,
        info,
        item: resultItem,
        duration,
      };

      setTimeout(() => {
        setGachaResult(result);
        setInventory((prev) => [result, ...prev]);
        setGachaState("revealed");
        if (tierKey === "MYTHIC" || tierKey === "LEGENDARY") triggerShake();
        playSound("complete");
      }, 1500);
    }, 1500);
  };

  const formatTime = (sec) =>
    `${Math.floor(sec / 60)
      .toString()
      .padStart(2, "0")}:${(sec % 60).toString().padStart(2, "0")}`;
  const RankIcon = getCurrentRank().icon;
  const isFireCombo = combo >= 3;

  return (
    <div
      className={`min-h-[100dvh] w-full bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 pb-24 overflow-x-hidden relative ${
        isShaking ? "animate-shake" : ""
      }`}
    >
      <style>{customStyles}</style>

      {isSettingsOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-3xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-2"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-500/20 p-3 rounded-2xl text-indigo-400">
                <Settings size={28} />
              </div>
              <h2 className="text-2xl font-black text-white">{t.settings}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
                  <Key size={16} /> {t.apiKeyStr}
                </label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder={
                    HARDCODED_API_KEY
                      ? "Đã gán API Key cố định"
                      : "Nhập chuỗi AIzaSy..."
                  }
                  disabled={!!HARDCODED_API_KEY}
                  className="w-full bg-slate-800 border border-slate-600 focus:border-indigo-500 rounded-xl px-4 py-3 text-white font-mono focus:outline-none transition disabled:opacity-50"
                />
                <p className="text-xs text-yellow-500 mt-2 font-medium">
                  {t.apiHelp}
                </p>
              </div>
              <button
                onClick={handleSaveSettings}
                className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} /> {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {pepTalkMsg && (
        <div className="fixed inset-x-4 top-24 z-[120] bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(239,68,68,0.5)] border-2 border-white/20 animate-in slide-in-from-top-10 fade-in duration-300">
          <h4 className="font-black text-sm uppercase tracking-widest text-red-200 mb-2 flex items-center gap-2">
            <ShieldAlert size={16} /> {t.pepTalkTitle}
          </h4>
          <p className="text-2xl md:text-3xl font-black leading-tight drop-shadow-md">
            "{pepTalkMsg}"
          </p>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
        {floatingTexts.map((t) => (
          <div
            key={t.id}
            className={`absolute animate-float font-black uppercase tracking-widest drop-shadow-[0_0_20px_rgba(0,0,0,1)] 
            ${
              t.type === "success"
                ? "text-green-400 text-5xl"
                : t.type === "fail"
                ? "text-red-500 text-6xl"
                : t.type === "combo"
                ? "text-orange-500 text-6xl"
                : "text-yellow-400 text-7xl holo-card bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-yellow-300"
            }`}
          >
            {t.text}
          </div>
        ))}
      </div>

      <header className="bg-slate-900/60 backdrop-blur-xl border-b border-white/5 p-3 sticky top-0 z-40 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 w-1/2">
            <div
              className={`relative w-14 h-14 rounded-xl bg-slate-800 border-2 flex items-center justify-center shrink-0 shadow-lg ${
                combo >= 3
                  ? "border-orange-500 combo-fire"
                  : "border-indigo-500 shadow-indigo-500/20"
              }`}
            >
              {React.createElement(getCurrentRank().icon, {
                size: 28,
                className: `${getCurrentRank().color} ${
                  combo >= 3 ? "animate-bounce" : ""
                }`,
              })}
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 border border-indigo-400 text-[10px] font-black px-1.5 py-0.5 rounded text-white shadow-md">
                Lv.{level}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-1">
                <h1 className="text-sm font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 uppercase tracking-widest leading-none">
                  {getCurrentRank().name}
                </h1>
                <span className="text-[10px] text-slate-500 font-bold">
                  {points} / {level * 1000}
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5 relative">
                <div className="absolute inset-0 bg-indigo-500/20"></div>
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 progress-bar-fill"
                  style={{ width: `${getExpProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <div
                className={`text-2xl font-black italic leading-none ${
                  combo >= 3 ? "text-orange-500" : "text-slate-400"
                }`}
              >
                {combo > 0 ? `x${getComboMultiplier().toFixed(1)}` : "---"}
              </div>
              <span className="text-[9px] uppercase text-slate-500 font-black tracking-widest">
                COMBO
              </span>
            </div>
            <div className="h-6 w-[1px] bg-slate-700/50 mx-1"></div>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95 rounded-xl transition relative"
            >
              <Settings size={20} />
              {!HARDCODED_API_KEY && !savedApiKey && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 bg-slate-800/80 hover:bg-slate-700 border border-white/10 px-2 py-1.5 rounded-lg transition-colors active:scale-95"
              >
                <Globe size={16} className="text-slate-400" />
                <span className="text-xs font-bold uppercase text-slate-300">
                  {lang}
                </span>
                <ChevronDown size={12} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50">
                  <button
                    onClick={() => {
                      setLang("vi");
                      setLangOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-300 hover:bg-indigo-500 hover:text-white transition-colors"
                  >
                    Tiếng Việt
                  </button>
                  <button
                    onClick={() => {
                      setLang("en");
                      setLangOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-300 hover:bg-indigo-500 hover:text-white transition-colors"
                  >
                    English
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 pt-6 space-y-6">
        {activeTask && (
          <section className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.2)] text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 px-5 py-2 rounded-full font-black text-sm mb-6 uppercase tracking-widest">
                FOCUS MODE
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight drop-shadow-md">
                {activeTask.name}
              </h3>
              <p className="text-slate-400 font-medium mb-4 max-w-lg mx-auto">
                {activeTask.description}
              </p>

              <div className="mb-8 max-w-lg mx-auto min-h-[40px]">
                {!activeTaskTip && !isLoadingTip && (
                  <button
                    onClick={getTaskTip}
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-bold flex items-center justify-center gap-1.5 mx-auto bg-indigo-500/10 px-4 py-2 rounded-full transition-all hover:bg-indigo-500/20 active:scale-95 border border-indigo-500/20"
                  >
                    <Sparkles size={16} className="text-yellow-400" />{" "}
                    {t.askAiTip}
                  </button>
                )}
                {isLoadingTip && (
                  <div className="text-indigo-400 text-sm animate-pulse flex items-center justify-center gap-2">
                    <Lightbulb size={16} /> {t.loadingTip}
                  </div>
                )}
                {activeTaskTip && (
                  <div className="bg-slate-950/60 border border-indigo-500/30 p-4 rounded-2xl text-left text-sm text-indigo-200 mt-2 leading-relaxed whitespace-pre-wrap animate-in fade-in slide-in-from-top-2">
                    <div className="font-bold text-indigo-400 mb-2 flex items-center gap-2">
                      <Bot size={16} /> {t.aiAdvisor}:
                    </div>
                    {activeTaskTip}
                  </div>
                )}
              </div>

              <div className="text-[6rem] md:text-[8rem] font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-400 my-4 leading-none tracking-tighter">
                {formatTime(taskTimerRemaining)}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <button
                  onClick={handleTaskGiveUp}
                  className="bg-slate-950/50 text-red-500 border border-red-900/50 px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-red-950/50 hover:border-red-500 transition-all active:scale-95"
                >
                  <Skull size={24} /> {t.giveUp}
                </button>
                <button
                  onClick={handleTaskComplete}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={28} /> {t.completeEarly}
                </button>
              </div>
            </div>
          </section>
        )}

        {activeReward && (
          <section className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-fuchsia-500 shadow-[0_0_50px_rgba(217,70,239,0.2)] text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/50 px-5 py-2 rounded-full font-black text-sm mb-6 uppercase tracking-widest">
                <Coffee size={16} /> THƯ GIÃN
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight drop-shadow-md">
                {activeReward.item}
              </h3>
              <div className="text-[6rem] md:text-[8rem] font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-fuchsia-400 my-4 leading-none tracking-tighter">
                {formatTime(rewardTimerRemaining)}
              </div>
              <button
                onClick={handleRewardComplete}
                className="mt-8 bg-slate-800 text-slate-300 border border-slate-600 px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 mx-auto hover:bg-slate-700 active:scale-95 transition"
              >
                <Square size={20} /> KẾT THÚC XẢ HƠI
              </button>
            </div>
          </section>
        )}

        {!activeTask && !activeReward && (
          <>
            <div className="flex bg-slate-900/90 backdrop-blur-xl rounded-2xl p-1.5 border border-white/5 shadow-2xl sticky top-20 z-30 mb-8">
              <button
                onClick={() => setActiveTab("tasks")}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black tracking-wide transition-all ${
                  activeTab === "tasks"
                    ? "text-white bg-indigo-600 shadow-lg scale-[1.02]"
                    : "text-slate-500 hover:text-slate-300 active:scale-95"
                }`}
              >
                <ListTodo size={20} />{" "}
                <span className="hidden sm:inline">{t.tasks}</span>{" "}
                {tasks.length > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white ml-1">
                    {tasks.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("rewards")}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black tracking-wide transition-all ${
                  activeTab === "rewards"
                    ? "text-white bg-emerald-600 shadow-lg scale-[1.02]"
                    : "text-slate-500 hover:text-slate-300 active:scale-95"
                }`}
              >
                <Gift size={20} />{" "}
                <span className="hidden sm:inline">{t.rewards}</span>
              </button>
              <button
                onClick={() => setActiveTab("ai")}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black tracking-wide transition-all ${
                  activeTab === "ai"
                    ? "text-white bg-purple-600 shadow-lg scale-[1.02]"
                    : "text-slate-500 hover:text-slate-300 active:scale-95"
                }`}
              >
                <Bot size={20} />{" "}
                <span className="hidden sm:inline">{t.ai}</span>
              </button>
            </div>

            {activeTab === "tasks" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => drawRandomTask(false)}
                    disabled={isLoadingAi}
                    className="relative overflow-hidden bg-slate-900 border border-indigo-500/30 hover:border-indigo-500 p-5 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all active:scale-95 group shadow-lg disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent"></div>
                    <div className="bg-indigo-500 p-4 rounded-2xl text-white shadow-[0_10px_20px_rgba(99,102,241,0.4)] group-hover:-rotate-12 transition-all z-10">
                      <Dices size={32} />
                    </div>
                    <span className="font-black text-indigo-100 text-lg relative z-10">
                      {t.drawNormal}
                    </span>
                  </button>
                  <button
                    onClick={() => drawRandomTask(true)}
                    disabled={isLoadingAi}
                    className="relative overflow-hidden bg-slate-900 border border-red-500/30 hover:border-red-500 p-5 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all active:scale-95 group shadow-lg disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-bl from-red-600/10 to-orange-500/10"></div>
                    <div className="bg-gradient-to-br from-red-500 to-orange-600 p-4 rounded-2xl text-white shadow-[0_10px_20px_rgba(239,68,68,0.4)] transition-all z-10">
                      <Flame size={32} />
                    </div>
                    <span className="font-black text-red-100 text-lg relative z-10">
                      {t.drawExtreme}
                    </span>
                  </button>
                </div>

                <button
                  onClick={handlePepTalk}
                  disabled={isLoadingPepTalk}
                  className="w-full bg-red-950/40 border border-red-500/50 hover:bg-red-900/60 text-red-400 p-4 rounded-2xl font-black transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)] disabled:opacity-50"
                >
                  <Flame
                    size={20}
                    className={isLoadingPepTalk ? "animate-bounce" : ""}
                  />
                  {t.askPepTalk}
                </button>

                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-slate-900 rounded-[2rem] border border-white/5 p-6 relative overflow-hidden group transition-all"
                    >
                      <div className="flex justify-between items-start mb-3 relative z-10">
                        <h3 className="font-black text-2xl text-white pr-4 leading-tight">
                          {task.name}
                        </h3>
                        <div className="flex bg-black/30 px-2 py-1 rounded-full border border-white/5">
                          {[...Array(task.difficulty)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-400 font-medium mb-6 relative z-10">
                        {task.description}
                      </p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                        <div className="flex flex-wrap gap-2">
                          <span className="flex items-center gap-1.5 text-slate-300 bg-white/5 px-4 py-2 rounded-xl text-sm font-black tracking-wide">
                            <Clock size={16} className="text-cyan-400" />{" "}
                            {task.duration}m
                          </span>
                          <span className="flex items-center gap-1.5 text-yellow-400 bg-yellow-900/20 border border-yellow-700/50 px-4 py-2 rounded-xl text-sm font-black tracking-wide">
                            +{calculatePoints(task.duration, task.difficulty)}{" "}
                            <Coins size={16} />
                          </span>
                        </div>
                        <button
                          onClick={() => startTask(task)}
                          className="w-full sm:w-auto bg-white text-slate-950 px-8 py-3 rounded-xl font-black active:scale-95 transition-all"
                        >
                          {t.start}
                        </button>
                      </div>
                    </div>
                  ))}
                  {tasks.length === 0 && !isLoadingAi && (
                    <div className="text-center py-20 bg-slate-900/50 rounded-[2rem] border border-white/5 border-dashed">
                      <h3 className="text-2xl font-black text-slate-300 mb-2">
                        {t.emptyTasks}
                      </h3>
                      <p className="text-slate-500 font-medium">{t.drawTip}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "rewards" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-900 rounded-[2.5rem] p-1.5 border border-white/10 shadow-2xl relative">
                  <div className="bg-slate-950 rounded-[2.2rem] p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                    {gachaState === "idle" && (
                      <div className="text-center z-10">
                        <Gift
                          size={100}
                          className="mx-auto text-emerald-500 mb-6 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                        />
                        <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
                          {t.gachaTitle}
                        </h2>
                        <p className="text-slate-400 font-medium max-w-sm mx-auto">
                          {t.gachaSub}
                        </p>
                      </div>
                    )}
                    {gachaState === "charging" && (
                      <div className="text-center z-10">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin"></div>
                        <h2 className="text-2xl font-black text-yellow-500 tracking-widest uppercase animate-pulse">
                          CHARGING...
                        </h2>
                      </div>
                    )}
                    {gachaState === "spinning" && (
                      <div className="text-center z-10 w-full">
                        <Activity
                          size={64}
                          className="text-indigo-400 animate-bounce mx-auto"
                        />
                        <p className="text-indigo-400 font-black tracking-widest uppercase mt-6 animate-pulse">
                          {t.rolling}
                        </p>
                      </div>
                    )}
                    {gachaState === "revealed" && gachaResult && (
                      <div
                        className={`w-full max-w-md mx-auto text-center p-8 rounded-3xl border-2 relative overflow-hidden shadow-2xl ${gachaResult.info.bg} ${gachaResult.info.border}`}
                      >
                        <span
                          className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase mb-6 bg-black/60 ${gachaResult.info.color}`}
                        >
                          {gachaResult.info.name}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-white">
                          {gachaResult.item}
                        </h3>
                        <div className="inline-flex items-center gap-2 bg-black/50 px-6 py-3 rounded-2xl text-cyan-400 font-black text-xl border border-cyan-500/30">
                          <Clock size={24} /> {gachaResult.duration} PHÚT
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-slate-900 rounded-b-[2.2rem] flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/5 mt-2">
                    <div className="text-yellow-400 font-black text-2xl flex items-center gap-2 bg-yellow-900/20 px-6 py-3 rounded-xl border border-yellow-700/50">
                      250 <Coins size={24} />
                    </div>
                    <button
                      onClick={handleRewardGacha}
                      disabled={
                        gachaState === "charging" || gachaState === "spinning"
                      }
                      className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-xl font-black text-xl active:scale-95 disabled:opacity-50 transition-all"
                    >
                      {t.rollBtn}
                    </button>
                  </div>
                </div>

                {inventory.length > 0 && (
                  <div>
                    <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2 uppercase px-2">
                      <Trophy className="text-yellow-400" /> {t.inventory}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {inventory.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => startReward(item)}
                          className={`cursor-pointer p-5 rounded-[1.5rem] border-2 flex flex-col h-40 relative overflow-hidden group active:scale-95 ${item.info.bg} ${item.info.border}`}
                        >
                          <div className="relative z-10 flex flex-col h-full">
                            <span
                              className={`text-[10px] font-black uppercase mb-2 ${item.info.color}`}
                            >
                              {item.info.name}
                            </span>
                            <h4 className="font-black text-white text-lg leading-tight line-clamp-2">
                              {item.item}
                            </h4>
                            <span className="mt-auto inline-flex items-center gap-1.5 text-cyan-400 font-black bg-black/50 px-3 py-1.5 rounded-lg text-sm border border-white/10">
                              <Clock size={14} /> {item.duration}p
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "ai" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.4)]">
                        <Bot size={36} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                          {t.aiHubTitle}
                        </h2>
                        <p className="text-slate-400 font-medium">
                          Gemini AI Engine
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={analyzeProgress}
                      disabled={isLoadingAi}
                      className="w-full sm:w-auto bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 px-6 py-3 rounded-xl font-bold active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <TrendingUp size={20} /> {t.analyzeProgress}
                    </button>
                  </div>

                  <div className="bg-slate-950/80 p-6 rounded-2xl font-mono text-sm text-green-400 mb-8 min-h-[120px] max-h-[400px] overflow-y-auto border border-white/5 shadow-inner relative z-10 leading-relaxed whitespace-pre-wrap">
                    <span className="text-purple-400 mr-2">{">"}</span>
                    {aiMessage ||
                      "Hệ thống AI đã kết nối. Trợ lý đắc lực cho những thói quen hằng ngày."}
                    {isLoadingAi && (
                      <span className="animate-pulse inline-block ml-1 w-2 h-4 bg-green-400"></span>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 relative z-10 bg-slate-950/50 p-6 rounded-2xl border border-indigo-500/20 mt-4 mb-4">
                    <div className="flex-1">
                      <label className="text-xs font-black uppercase text-indigo-400 tracking-widest block mb-2 flex items-center gap-2">
                        <Target size={16} /> {t.breakdownBtn}
                      </label>
                      <input
                        type="text"
                        value={bigGoal}
                        onChange={(e) => setBigGoal(e.target.value)}
                        placeholder={t.goalPrompt}
                        className="bg-slate-800 border-2 border-indigo-900/50 hover:border-indigo-500 focus:border-indigo-500 rounded-xl px-4 py-3 w-full focus:outline-none text-white font-medium transition-colors"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleBreakdownGoal}
                        disabled={isLoadingAi || !bigGoal.trim()}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white py-3 rounded-xl font-black transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <Sparkles size={18} /> {t.breakdownBtn}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 relative z-10 pt-4 border-t border-white/5">
                    <div className="flex-1">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-widest block mb-2">
                        {t.timePrompt}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0.5"
                          max="16"
                          step="0.5"
                          value={freeTime}
                          onChange={(e) => setFreeTime(e.target.value)}
                          className="bg-slate-800 border-2 border-slate-700 hover:border-purple-500 focus:border-purple-500 rounded-xl pl-6 pr-12 py-3 w-full focus:outline-none text-white font-black text-xl transition-colors"
                        />
                        <span className="absolute right-6 top-4 text-slate-500 font-black">
                          H
                        </span>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleGenerateSchedule}
                        disabled={isLoadingAi}
                        className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-xl font-black hover:bg-purple-500 hover:text-white active:scale-95 flex items-center justify-center disabled:opacity-50 h-[52px]"
                      >
                        {t.generate}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
