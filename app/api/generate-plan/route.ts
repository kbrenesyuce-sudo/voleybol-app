import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ageGroup, gender, level, playerCount, duration, topic } = body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Kritik Hata: Vercel kasasında OPENAI_API_KEY bulunamadı!" }, { status: 500 });
    }

    const response = await fetch("https://openai.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: "Sen profesyonel bir voleybol antrenörüsün. Gelen parametrelere göre detaylı antrenman planı hazırla."
          },
          {
            role: "user",
            content: `Yaş: ${ageGroup}, Seviye: ${level}, Konu: ${topic}, Süre: ${duration}dk. Detaylı plan hazırla.`
          }
        ]
      })
    });

    const aiData = await response.json();
    
    // EĞER OPENAI BİR HATA DÖNDÜRDÜYSE, HATAYI GİZLEME VE DOĞRUDAN EKRANA GÖNDER
    if (aiData.error) {
      return NextResponse.json({ error: `OpenAI Sunucu Mesajı: ${aiData.error.message} (Kod: ${aiData.error.code})` }, { status: 400 });
    }

    return NextResponse.json({
      title: `✨ AI Akıllı Programı (${duration} Dakika)`,
      level: level,
      rawText: aiData.choices.message.content
    });

  } catch (error: any) {
    // SİSTEMSEL BİR ÇÖKME VARSA ONUN DA DETAYINI EKRANA BAS
    return NextResponse.json({ error: `Sistemsel Çökme Detayı: ${error.message}` }, { status: 500 });
  }
}
