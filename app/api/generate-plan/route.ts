import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ageGroup, gender, level, playerCount, duration, topic } = body;

    // Vercel panelinden güvenli bir şekilde okuyacağımız gizli şifre anahtarı
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Sistemde API anahtarı yapılandırılmamış!" }, { status: 500 });
    }

    // OpenAI sunucularına doğrudan bulut üzerinden talep gönderiyoruz
    const response = await fetch("https://openai.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // SaaS dünyasının en hızlı ve akıllı fiyat/performans modeli
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: "Sen FIVB (Uluslararası Voleybol Federasyonu) seviyesinde kıdemli bir voleybol başantrenörüsün. Görevin, gelen parametrelere göre dünyanın en detaylı, pedagojik, taktik tahtası netliğinde antrenman planlarını hazırlamaktır. Çıktıyı tamamen Türkçe, samimi ama profesyonel bir dille yaz."
          },
          {
            role: "user",
            content: `Lütfen şu parametrelere göre kılcal damarlarına kadar detaylandırılmış profesyonel bir voleybol antrenman planı hazırla:
            - Yaş Kategorisi: ${ageGroup}
            - Takım Cinsiyeti: ${gender}
            - Sporcuların Seviyesi: ${level}
            - Sahadaki Oyuncu Sayısı: ${playerCount} Sporcu
            - Toplam Antrenman Süresi: ${duration} Dakika
            - Günün Ana Odak Teması / Çalışılacak Konu: ${topic}

            İstediğim Çıktı Formatı ve Kuralları:
            1. Matematiksel olarak verilen ${duration} dakikayı bölümlere (Isınma, Ana Tema, Taktik/Maç, Soğuma) mantıklı oranlarda paylaştır ve dakikaları başlığa yaz.
            2. Yüzeysel ifadeler (örneğin 'smaç çalışması yapın') ASLA kullanma.
            3. Her drilin altında: 'Saha Dizilimi (Oyuncular nerede duracak?)', 'Drilin Akışı (Top nereden nereye, nasıl atılacak?)' ve 'Antrenörün Odaklanacağı Teknik Detay/Hata Düzeltme' maddelerini çok derinlemesine, uzun uzun anlat.
            4. Seçilen yaş grubunun (${ageGroup}) pedagojisine ve seviyesine (${level}) %100 sadık kal.`
          }
        ]
      })
    });

    const aiData = await response.json();
    
    if (aiData.error) {
      return NextResponse.json({ error: `OpenAI Bulut Hatası: ${aiData.error.message}` }, { status: 400 });
    }

    return NextResponse.json({
      title: `✨ AI Akıllı Programı (${duration} Dakika)`,
      level: level,
      rawText: aiData.choices[0].message.content
    });

  } catch (error) {
    return NextResponse.json({ error: "Bulut sunucusu işleme esnasında hata verdi." }, { status: 500 });
  }
}
