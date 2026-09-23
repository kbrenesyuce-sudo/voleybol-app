import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ageGroup = body.ageGroup || "14-16 Yaş (Yıldız)";
    const gender = body.gender || "Kız";
    const level = body.level || "Orta Seviye";
    const playerCount = body.playerCount || "12";
    const duration = body.duration || "90";
    const topic = body.topic || "Manşet Altyapısı";

    let drilA = `• ${topic} Temel Mekanik Çalışması (15 dk): ${playerCount} sporcu ile sahada ${topic} konusuna yönelik pozisyon alma çalışması.`;
    let drilB = `• ${topic} Kombinasyon Drili (15 dk): Dinamik hareket içeren, ${level} seviyesine göre zorluğu optimize edilmiş ${topic} saha içi varyasyonu.`;

    const arananKonu = topic.toLowerCase();

    if (arananKonu.includes("manşet") || arananKonu.includes("manset") || arananKonu.includes("karşılama")) {
      drilA = `• Manşet Mekaniği Drili (15 dk): ${playerCount} oyuncu 3'lü istasyonlara bölünür. Sabit noktadan atılan toplarla manşet açısı, kalça pozisyonu ve topa temas anı çalışılır.`;
      drilB = `• Hassas Hedef Aktarımı (15 dk): File önünden deplase olarak (yer değiştirerek) gelen sert topları karşılayıp 2-3 numara arasındaki pasör bölgesine yüksek ve hassas şekilde ulaştırma varyasyonları.`;
    } else if (arananKonu.includes("smaç") || arananKonu.includes("smac") || arananKonu.includes("hücum")) {
      drilA = `• Smaç Adımlaması & Zamanlama (15 dk): File kenarında 3 adım tekniği, çift ayak sıçrama ve kol çekme mekaniği çalışması. ${level} seviyesine uygun olarak top atış yüksekliği ayarlanır.`;
      drilB = `• Blok Üstü Hücum Varyasyonları (15 dk): Pasörden gelen paslara ritim bulup, savunma bloklarının üzerinden veya boşluklarından topu sert şekilde rakip sahaya indirme drili.`;
    } else if (arananKonu.includes("servis")) {
      drilA = `• İsabet ve Teknik Drili (15 dk): Alttan veya üstten servis mekaniği. Oyuncular çizgi gerisinde hedef dubalara doğru kontrollü atışlar gerçekleştirir.`;
      drilB = `• Baskı Altında Servis (15 dk): Nabız yüksekken (şınav/koşu sonrası) arka arkaya 5 başarılı servis atma serisi. ${ageGroup} pedagojisine uygun motivasyon odaklı driller.`;
    }

    let seviyeNotu = "💡 ORTA SEVİYE STRATEJİSİ: Hareketli drillerde topun şiddeti %20 artırılmalı, sporcuların deplase olurken dengede kalmasına odaklanılmalıdır.";
    if (level === "Başlangıç") {
      seviyeNotu = "⚠️ BAŞLANGIÇ SEVİYESİ UYARISI: Teknik formun bozulmaması için driller yavaş tempoda yapılmalı, sakatlık önleyici omuz aktivasyonuna maksimum süre ayrılmalıdır.";
    } else if (level === "İleri Düzey") {
      seviyeNotu = "🔥 İLERİ DÜZEY TAKTİĞİ: Maksimum tempo! Driller arasına skor baskısı eklenmeli, hatasız üst üste 3 aksiyon kuralı uygulanmalıdır.";
    }

    const toplamSure = parseInt(duration) || 90;
    const isinmaSuresi = Math.round(toplamSure * 0.16);
    const taktikSure = Math.round(toplamSure * 0.22);
    const sogumaSure = Math.round(toplamSure * 0.11);
    const anaTemaSuresi = toplamSure - (isinmaSuresi + taktikSure + sogumaSure);

    const dinamikPlanMetni = `
    🏐 ${ageGroup.toUpperCase()} GRUBU | ${gender.toUpperCase()} TAKIMI ANTRENMAN PROGRAMI
    ======================================================================
    Seviye: ${level} | Sporcu Sayısı: ${playerCount} Oyuncu | Toplam Süre: ${toplamSure} Dakika
    Günün Ana Odak Teması: ${topic.toUpperCase()}
    
    ${seviyeNotu}
    
    ----------------------------------------------------------------------
    1. ISINMA & MOBİLİTE SEKANSI (${isinmaSuresi} Dakika)
    ----------------------------------------------------------------------
    • Dinamik Koşu: Sahada çizgiler arası yan adımlama, dizleri çekerek ve topukları kalçaya vurarak nabız yükseltme.
    • Mobilizasyon: Voleybola özgü omuz (rotator cuff) aktivasyonu, ayak bileği ve diz eklemlerini esnetme hareketleri.
    • Toplu Isınma: ${playerCount} oyuncu karşılıklı eşleşerek kısa mesafeli parmak ve kontrollü manşet pas serileriyle top hissini artırır.
    
    ----------------------------------------------------------------------
    2. ANA TEMA TEKNİK ÇALIŞMASI: ${topic.toUpperCase()} (${anaTemaSuresi} Dakika)
    ----------------------------------------------------------------------
    ${drilA}
    ${drilB}
    • Dril C - Hedefe Aktarım (15 dk): Alınan topların pasör bölgesine (2-3 numara arasına) yüksek ve hassas şekilde ulaştırılması. ${playerCount} sporcu sürekli rotasyonla yer değiştirir.
    
    ----------------------------------------------------------------------
    3. TAKTİK & MAÇ SİMÜLASYONU (${taktikSure} Dakika)
    ----------------------------------------------------------------------
    • Günün konusu olan "${topic}" becerisini oyun içine aktarmak için kontrollü maç simülasyonu.
    • Oyun sadece bu teknikle başlatılacak veya karşılanacaktır. Kurallara uygun mükemmel yapılan her "${topic}" aksiyonu takıma direkt +2 puan kazandırır.
    
    ----------------------------------------------------------------------
    4. SOĞUMA & ANTRENÖR DEĞERLENDİRMESİ (${sogumaSure} Dakika)
    ----------------------------------------------------------------------
    • Statik Stretching: Kaslarda laktik asit birikimini ve ertesi gün oluşabilecek ağrıları önlemek için bacak, sırt ve omuz kaslarını esnetme.
    • Antrenör Feedback Konuşması: Takım ortaya toplanır. ${ageGroup} pedagojisine uygun olarak günün performansı değerlendirilir; yapılan doğrular övülür, geliştirilmesi gereken eksikler aktarılır.
    `;

    return NextResponse.json({
      title: `✨ AI Dinamik Programı (${toplamSure} Dakika)`,
      level: level,
      rawText: dinamikPlanMetni
    });

  } catch (error) {
    return NextResponse.json({ error: "Sistemde teknik bir aksaklık oluştu." }, { status: 500 });
  }
}
