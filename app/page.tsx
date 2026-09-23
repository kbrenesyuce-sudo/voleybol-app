"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [aiOutput, setAiOutput] = useState<{ title: string; level: string; rawText: string } | null>(null);
  const [formData, setFormData] = useState({
    ageGroup: "14-16 Yaş (Yıldız)",
    gender: "Kız",
    level: "Orta Seviye",
    playerCount: "12",
    duration: "90",
    topic: "Manşet Altyapısı ve Servis Karşılama",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }
      setAiOutput(data);
      setLoading(false);
      setShowPlan(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-orange-400 mb-2">🏐 Voleybol Antrenman Planlayıcı</h1>
          <p className="text-slate-400 text-sm">Gerçek AI Destekli Profesyonel Akış Sistemi (v1.0)</p>
        </header>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 bg-slate-800 p-6 rounded-2xl h-fit border border-slate-700">
            <h2 className="text-lg font-bold mb-4 text-orange-400">📋 Parametreler</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Yaş Grubu</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm" value={formData.ageGroup} onChange={(e) => setFormData({...formData, ageGroup: e.target.value})}>
                  <option>8-10 Yaş (Mini)</option>
                  <option>11-13 Yaş (Küçük)</option>
                  <option>14-16 Yaş (Yıldız)</option>
                  <option>17+ Yaş (A Takım)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Cinsiyet</label>
                  <select className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                    <option>Kız</option>
                    <option>Erkek</option>
                    <option>Karma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Seviye</label>
                  <select className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm" value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})}>
                    <option>Başlangıç</option>
                    <option>Orta Seviye</option>
                    <option>İleri Düzey</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Oyuncu Sayısı</label>
                  <input type="number" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm" value={formData.playerCount} onChange={(e) => setFormData({...formData, playerCount: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Süre (Dk)</label>
                  <input type="number" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Çalışılacak Konu</label>
                <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm" value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})} />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50">
                {loading ? "Yapay Zeka Planı Çıkarıyor..." : "⚡ Gerçek AI Planı Oluştur"}
              </button>
            </form>
          </div>

          <div className="md:col-span-3">
            {!showPlan && !loading && (
              <div className="border-2 border-dashed border-slate-800 rounded-2xl h-64 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                <p className="text-sm">Parametreleri girip butona bastığınızda gerçek, derinlemesine yapay zeka planı burada belirecek.</p>
              </div>
            )}

            {loading && (
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl h-64 flex flex-col items-center justify-center p-6 text-orange-400">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500 mb-4"></div>
                <p className="text-sm font-semibold animate-pulse">OpenAI üzerinden antrenör taktikleri hesaplanıyor...</p>
              </div>
            )}

            {showPlan && !loading && aiOutput && (
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <h3 className="text-lg font-bold text-emerald-400">{aiOutput.title}</h3>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2.5 py-1 rounded-full font-bold">{aiOutput.level}</span>
                </div>
                {/* AI'dan gelen uzun, detaylı metni satır boşluklarını koruyarak basıyoruz */}
                <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 max-h-[500px] overflow-y-auto">
                  {aiOutput.rawText}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
