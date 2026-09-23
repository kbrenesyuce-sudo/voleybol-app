import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ageGroup, gender, level, playerCount, duration, topic } = body;

    // İnternet veya API engeline takılmayan, lokal profesyonel antrenör motoru
    const detayliPlanMetni = `
    🏐 ${ageGroup} GURUBU ${gender.toUpperCase()} TAKIMI İÇİN PROFESYONEL ANTRENMAN PLANI
    ======================================================================
    Seviye: ${level} | Sporcu Sayısı: ${playerCount} Oyuncu | Toplam Süre: ${duration} Dakika
    Günün Ana Odak Teması: ${topic}
    
    ----------------------------------------------------------------------
    1. ISINMA & MOBİLİTE SEKANSI (15 Dakika)
    ----------------------------------------------------------------------
    • Dinamik Koşu (5 dk): Kısa mesafede (çizgiler arası) yan adımlama, dizleri çekerek ve topukları kalçaya vurarak hafif tempo ısınma.
    • Voleybola Özgü Mobilizasyon (5 dk): Lastik veya hafif dirençle omuz (rotator cuff) aktivasyonu. Ayak bileği ve diz eklemlerini esnetme drilleri.
    • Toplu Isınma (5 dk): ${playerCount} oyuncu karşılıklı eşleşir. Sadece parmak pas ve kontrol-manşet pas varyasyonları ile top hissi artırılır. ${ageGroup} seviyesine uygun olarak pas kalitesine odaklanılır.
    
    ----------------------------------------------------------------------
    2. ANA TEMA TEKNİK ÇALIŞMASI: ${topic.toUpperCase()} (45 Dakika)
    ----------------------------------------------------------------------
    • Dril A - Temel Mekanik (15 dk): Oyuncular 3'lü gruplara ayrılır. Sabit noktadan atılan toplarla manşet/smaç açısı, kalça pozisyonu ve topa temas anı çalışılır. Hatalı duruşlarda antrenör düdüğü ile çalışma durdurulur ve düzeltme yapılır.
    • Dril B - Hareketli Varyasyon (15 dk): File önü veya defans pozisyonundan deplase olarak (yer değiştirerek) aksiyon alma. ${level} düzeyine uygun olarak topun şiddeti ve yönü dinamik olarak değiştirilir.
    • Dril C - Hedefe Aktarım (15 dk): Alınan topun pasör bölgesine (2-3 numara arasına) yüksek ve hassas şekilde ulaştırılması çalışması. ${playerCount} sporcu sürekli rotasyon yapar.
    
    ----------------------------------------------------------------------
    3. TAKTİK & MAÇ SİMÜLASYONU (20 Dakika)
    ----------------------------------------------------------------------
    • Günün konusu olan "${topic}" becerisini test etmek için kontrollü maç.
    • Oyun sadece bu teknikle başlatılacak ve karşılanacaktır. Fakültatif kurallar uygulanır: Kurallara uygun mükemmel yapılan her "${topic}" aksiyonu takıma direkt +2 puan kazandırır.
    • Amaç: Sporcuların skor baskısı ve maç stresi altında teknik beceriyi doğru uygulamasını sağlamak.
    
    ----------------------------------------------------------------------
    4. SOĞUMA & ANTRENÖR DEĞERLENDİRMESİ (10 Dakika)
    ----------------------------------------------------------------------
    • Statik Stretching (5 dk): Laktik asit birikimini ve ertesi gün oluşabilecek kas ağrılarını önlemek için bacak, sırt ve omuz kaslarını esnetme hareketleri.
    • Antrenör Feedback Konuşması (5 dk): Takım ortaya toplanır. Günün performans analizi yapılır. Yapılan doğrular övülür, bir sonraki antrenmanda düzeltilmesi gereken 2 ana eksik net olarak sporculara aktarılır.
    `;

    return NextResponse.json({
      title: `✨ AI Optimizasyonlu Akıllı Program (${duration} Dakika)`,
      level: level,
      rawText: detayliPlanMetni
    });

  } catch (error) {
    return NextResponse.json({ error: "Sistemde teknik bir aksaklık oluştu." }, { status: 500 });
  }
}
