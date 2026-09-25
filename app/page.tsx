"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  const [aiOutput, setAiOutput] = useState<{
    title: string;
    level: string;
    rawText: string;
  } | null>(null);

  // V2.0 - İlk temel veri yapısı
  const [formData, setFormData] = useState({
    lane: "Performans",
    ageGroup: "Yıldız",
    gender: "Kız",
    level: "Orta Seviye",
    playerCount: "12",
    duration: "90",
    topic: "Manşet Altyapısı ve Servis Karşılama",
  });

  const [customDuration, setCustomDuration] = useState("");

  const handleLaneChange = (lane: string) => {
    setFormData({
      ...formData,
      lane,
      ageGroup: lane === "Performans" ? "Yıldız" : "10-12 Yaş",
    });
  };

  const handleDurationChange = (value: string) => {
    if (value === "custom") {
      setFormData({
        ...formData,
        duration: customDuration || "90",
      });
    } else {
      setFormData({
        ...formData,
        duration: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      /*
        Backend'i henüz değiştirmiyoruz.

        Mevcut API'nin kullandığı alanları göndermeye devam ediyoruz.
        "lane" şimdilik sadece V2.0 arayüzünde tutuluyor.
      */
      const apiData = {
        ageGroup: formData.ageGroup,
        gender: formData.gender,
        level: formData.level,
        playerCount: formData.playerCount,
        duration: formData.duration,
        topic: formData.topic,
      };

      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
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

  const durationOptions = ["60", "75", "90", "120"];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">

        {/* HEADER */}
        <header className="mb-8 border-b border-slate-800 pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            <div>
              <h1 className="text-3xl font-extrabold text-orange-400">
                🏐 Voleybol Antrenman Planlayıcı
              </h1>

              <p className="text-slate-400 text-sm mt-2">
                AI Destekli Profesyonel Antrenman Planlama Sistemi
              </p>
            </div>

            <span className="w-fit bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full">
              V2.0
            </span>

          </div>
        </header>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* SOL PANEL */}
          <div className="lg:col-span-2">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">
                  Yeni Antrenman
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Antrenman temel bilgilerini belirleyin.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* KULVAR */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    Kulvar
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={() => handleLaneChange("Spor Okulu")}
                      className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                        formData.lane === "Spor Okulu"
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      Spor Okulu
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLaneChange("Performans")}
                      className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                        formData.lane === "Performans"
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      Performans
                    </button>

                  </div>
                </div>

                {/* KATEGORİ / YAŞ GRUBU */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    {formData.lane === "Performans"
                      ? "Kategori"
                      : "Yaş Grubu"}
                  </label>

                  {formData.lane === "Performans" ? (
                    <select
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-orange-500"
                      value={formData.ageGroup}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ageGroup: e.target.value,
                        })
                      }
                    >
                      <option>Mini</option>
                      <option>Midi</option>
                      <option>Küçük</option>
                      <option>Yıldız</option>
                      <option>Genç</option>
                      <option>A Takım</option>
                    </select>
                  ) : (
                    <select
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-orange-500"
                      value={formData.ageGroup}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ageGroup: e.target.value,
                        })
                      }
                    >
                      <option>7-9 Yaş</option>
                      <option>10-12 Yaş</option>
                      <option>13-15 Yaş</option>
                      <option>16-18 Yaş</option>
                    </select>
                  )}
                </div>

                {/* CİNSİYET + SEVİYE */}
                <div className="grid grid-cols-2 gap-3">

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">
                      Cinsiyet
                    </label>

                    <select
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-orange-500"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option>Kız</option>
                      <option>Erkek</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">
                      Seviye
                    </label>

                    <select
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-orange-500"
                      value={formData.level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          level: e.target.value,
                        })
                      }
                    >
                      <option>Başlangıç</option>
                      <option>Orta Seviye</option>
                      <option>İleri Seviye</option>
                    </select>
                  </div>

                </div>

                {/* OYUNCU SAYISI */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    Sporcu Sayısı
                  </label>

                  <input
                    type="number"
                    min="1"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-orange-500"
                    value={formData.playerCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        playerCount: e.target.value,
                      })
                    }
                  />
                </div>

                {/* TOPLAM SÜRE */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    Toplam Antrenman Süresi
                  </label>

                  <div className="grid grid-cols-5 gap-2">

                    {durationOptions.map((duration) => (
                      <button
                        key={duration}
                        type="button"
                        onClick={() => handleDurationChange(duration)}
                        className={`py-2.5 rounded-lg border text-xs font-semibold ${
                          formData.duration === duration
                            ? "bg-orange-500 border-orange-500 text-white"
                            : "bg-slate-950 border-slate-700 text-slate-400"
                        }`}
                      >
                        {duration}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleDurationChange("custom")}
                      className={`py-2.5 rounded-lg border text-xs font-semibold ${
                        !durationOptions.includes(formData.duration)
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-slate-950 border-slate-700 text-slate-400"
                      }`}
                    >
                      Özel
                    </button>

                  </div>

                  <div className="mt-3">
                    <input
                      type="number"
                      min="1"
                      placeholder="Özel süre (dk)"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-orange-500"
                      value={customDuration}
                      onChange={(e) => {
                        setCustomDuration(e.target.value);

                        if (e.target.value) {
                          setFormData({
                            ...formData,
                            duration: e.target.value,
                          });
                        }
                      }}
                    />
                  </div>
                </div>

                {/* KONU - GEÇİCİ OLARAK MEVCUT API İÇİN */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    Çalışılacak Konu
                  </label>

                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-orange-500"
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        topic: e.target.value,
                      })
                    }
                  />

                  <p className="text-[11px] text-slate-500 mt-2">
                    Konu sistemi sonraki adımda V2.0 yapısına dönüştürülecek.
                  </p>
                </div>

                {/* BUTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
                >
                  {loading
                    ? "Yapay Zeka Planı Hazırlıyor..."
                    : "⚡ Antrenman Planı Oluştur"}
                </button>

              </form>
            </div>
          </div>

          {/* SAĞ PANEL */}
          <div className="lg:col-span-3">

            {!showPlan && !loading && (
              <div className="border-2 border-dashed border-slate-800 rounded-2xl min-h-[500px] flex flex-col items-center justify-center text-slate-500 p-8 text-center">

                <div className="text-5xl mb-5">
                  🏐
                </div>

                <h3 className="text-lg font-bold text-slate-300 mb-2">
                  Yeni Antrenman Planı
                </h3>

                <p className="text-sm max-w-md leading-relaxed">
                  Sol taraftaki antrenman bilgilerini belirleyin.
                  Yapay zeka tarafından oluşturulan profesyonel antrenman
                  planı burada görüntülenecek.
                </p>

              </div>
            )}

            {loading && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl min-h-[500px] flex flex-col items-center justify-center p-8 text-orange-400">

                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 mb-5"></div>

                <p className="text-sm font-semibold animate-pulse">
                  Antrenman planı hazırlanıyor...
                </p>

              </div>
            )}

            {showPlan && !loading && aiOutput && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 border-b border-slate-800 pb-4">

                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      OLUŞTURULAN PLAN
                    </p>

                    <h3 className="text-xl font-bold text-emerald-400">
                      {aiOutput.title}
                    </h3>
                  </div>

                  <span className="w-fit bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs px-3 py-1.5 rounded-full font-bold">
                    {aiOutput.level}
                  </span>

                </div>

                {/* Şimdilik mevcut AI çıktısını koruyoruz */}
                <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed bg-slate-950 p-5 rounded-xl border border-slate-800 max-h-[600px] overflow-y-auto">
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