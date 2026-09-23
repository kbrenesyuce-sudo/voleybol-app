import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ageGroup, gender, level, playerCount, duration, topic } = body;
    const konu = (topic || "Temel Teknik").toUpperCase();

    const toplam = parseInt(duration) || 90;
    const isinma = Math.round(toplam * 0.16);
    const taktik = Math.round(toplam * 0.22);
    const soguma = Math.round(toplam * 0.11);
    const anaTema = toplam - (isinma + taktik + soguma);

    // 1. BULUTTAKİ GİZLİ KASADAN ŞİFRENİ ÇEK
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && apiKey.startsWith("sk-")) {
      try {
        // AMERİKA'DAKİ SUNUCULARDAN DOĞRUDAN OPENAI BEYNİNE BAĞLAN
        const response = await fetch("https://openai.com", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${apiKey.trim()}` 
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.7,
            messages: [
              { 
                role: "system", 
                content: "Sen FIVB seviyesinde kıdemli bir voleybol başantrenörüsün. Görevin, gelen parametrelere göre dünyanın en detaylı, pedagojik, saha dizilimleri ve oyuncu hareketlerini içeren antrenman planlarını hazırlamaktır. Çıktıyı tamamen Türkçe ve profesyonel bir dille, maddeler halinde yaz." 
              },
              { 
                role: "user", 
                content: `Yaş: ${ageGroup}, Cinsiyet: ${gender}, Seviye: ${level}, Oyuncu Sayısı: ${playerCount}, Süre: ${duration}dk. Ana Tema: ${topic}. Bu bilgilere özel, yüzeysel olmayan, çok detaylı bir antrenman programı hazırla.` 
              }
            ]
          })
        });

        const aiData = await response.json();
        
        if (aiData.choices && aiData.choices[0]?.message?.content) {
          return NextResponse.json({
            title: `✨ AI Akıllı Programı (${duration} Dakika)`,
            level: level,
            rawText: aiData.choices[0].message.content
          });
        }
      } catch (innerError) {
        console.log("OpenAI bağlantı sorunu, akıllı yedek motor tetikleniyor...");
      }
    }

    // 2. KÖPRÜ ÇÖZÜM: YAPAY ZEKA BAĞLANTISI KOPARSA ÇALIŞACAK AKILLI YEDEK MOTOR
    let drilA = `• ${topic} Temel Form ve Mekanik Çalışması (15 dk): ${playerCount} sporcu sahada ${topic} konusuna yönelik pozisyon alma ve koordinasyon drili yapar.`;
    let drilB = `• Dinamik Kombinasyon İstasyonu (15 dk): Girdiğiniz "${topic}" başlığına yönelik, ${level} seviyesine uygun hareketli saha içi varyasyonu.`;
    let drilC = `• Taktiksel Uygulama ve Aktarım (15 dk): Çalışılan tekniklerin pasör havuzuna veya hedef bölgelere hassas olarak ulaştırılması serisi.`;

    const planText = `

    | ${ageGroup.toUpperCase()} GRUBU | ${gender.toUpperCase()} TAKIMI ANTRENMAN PROGRAMI (LOCAL MODE) |
    ======================================================================
    Seviye: ${level} | Oyuncu Sayısı: ${playerCount} | Toplam Süre: ${toplam} Dakika
    Günün Ana Odak Teması: ${konu}
    
    ----------------------------------------------------------------------
    1. ISINMA & MOBİLİTE SEKANSI (${isinma} Dakika)
    ----------------------------------------------------------------------
    • Çizgiler arası dinamik koşularla nabız yükseltme ve omuz aktivasyon drilleri.
    
    ----------------------------------------------------------------------
    2. ANA TEMA TEKNİK ÇALIŞMASI: ${konu} (${anaTema} Dakika)
    ----------------------------------------------------------------------
    ${drilA}
    ${drilB}
    ${drilC}
    
    ----------------------------------------------------------------------
    3. TAKTİK & MAÇ SİMÜLASYONU (${taktik} Dakika)
    ----------------------------------------------------------------------
    • Günün konusu olan "${topic}" becerisini test etmek için kontrollü maç. Nizami yapılan her hareket takıma ekstra +2 puan yazılır.
    
    ----------------------------------------------------------------------
    4. SOĞUMA & DEĞERLENDİRME (${soguma} Dakika)
    ----------------------------------------------------------------------
    • Kas ağrılarını önleyici statik esneme ve ${ageGroup} grubuna uygun performans geri bildirimi konuşması.
    `;

    return NextResponse.json({ title: `✨ AI Dinamik Programı (${toplam} Dk)`, level: level, rawText: planText });
  } catch (error) {
    return NextResponse.json({ error: "Sistem hatası" }, { status: 500 });
  }
}
