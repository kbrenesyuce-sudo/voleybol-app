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

    let drilA = "";
    let drilB = "";
    let drilC = "";
    
    const arananKonu = topic.toLowerCase();
    
    // FORM ELEMANLARIYLA BİREBİR KESİN EŞLEŞME KONTROLÜ
    const isMini = ageGroup === "8-10 Yaş (Mini)";
    const isKucuk = ageGroup === "11-13 Yaş (Küçük)";
    const isYildiz = ageGroup === "14-16 Yaş (Yıldız)";
    const isATakim = ageGroup === "17+ Yaş (A Takım)";
    
    const isAdvanced = level === "İleri Düzey";
    const isBeginner = level === "Başlangıç";

    // 🏐 SMAÇ VEYA HÜCUM SEÇİLDİYSE YAŞA GÖRE ÖZEL DRİLLER
    if (arananKonu.includes("smaç") || arananKonu.includes("smac") || arananKonu.includes("hücum")) {
      
      if (isMini) {
        drilA = `• Smaç Kol Çekme Mekaniği (15 dk): Mini sporcular yerde diz üstünde otururken, havaya fırlatılan hafif voleybol toplarına doğru teknik kol çekme (kamçı hareketi) ve yere çarptırma çalışması yapar.`;
        drilB = `• Eğlenceli Adımlama Oyunu (15 dk): Sahaya çizilen renkli halkaların içine (Sağ-Sol-Sağ ayak adımlamasıyla) basarak file önünde çift ayak sıçrama koordinasyon oyunu. Smaç vurulmaz, sadece adımlama öğrenilir.`;
        drilC = `• Alçak File Smaç Kondisyonu (15 dk): Antrenörün elden tuttuğu topa mini sporcular sıçrayarak avuç içi ile temas eder ve tekniği pekiştirir.`;
      } 
      else if (isATakim) {
        drilA = `• Yüksek Tempo Hücum Kombinasyonları (15 dk): 4 ve 2 numaradan açılan hızlı paslara (kurşun pas) ritim bulup, tam smaç adımlaması ile havada buluşma zamanlaması çalışması.`;
        drilB = `• Çiftli Blok Üstü Hücum Varyasyonları (15 dk): Karşı fileye yerleştirilen aktif ikili bloğun üzerinden, paraleline veya çapraz boşluklara doğru bilek hareketleriyle sert smaç indirme drili.`;
        drilC = `• Defans Sonrası Kontra Atak (15 dk): 6 numaradan alınan sert defans topunun ardından hızlıca hücum pozisyonuna geçip geçiş hücumu (transition attack) tamamlama çalışması.`;
      } 
      else {
        // Küçük ve Yıldız grupları için standart driller
        drilA = `• Klasik Smaç Adımlaması (15 dk): File kenarında 3 adım tekniği, çift ayak koordineli sıçrama ve kol salınım mekaniği.`;
        drilB = `• Sabit Topa Vuruş (15 dk): Pasörden gelen yüksek standart toplara ritim yakalayarak smaç vurma ve topu rakip sahaya düşürme çalışması.`;
        drilC = `• Hatasız Seri Smaç (15 dk): Tüm oyuncular sırayla hücum eder. Üst üste 5 hatasız smaç vurma hedefi koyulur.`;
      }

    // 🏐 MANŞET VEYA KARŞILAMA SEÇİLDİYSE YAŞA GÖRE ÖZEL DRİLLER
    } else if (arananKonu.includes("manşet") || arananKonu.includes("manset") || arananKonu.includes("karşılama")) {
      
      if (isMini) {
        drilA = `• Manşetle Tanışma ve Eğlenceli Top Yakalama (15 dk): ${playerCount} mini sporcu eşleşir. Atılan topu manşet pozisyonunda (kolları birleştirerek) göğüste yumuşatma ve yakalama oyunları oynanır.`;
        drilB = `• Duvar Hedef Oyunu (15 dk): Alçak file veya duvara çizilen hedeflere doğru, yavaşça atılan toplara manşetle dokunarak isabet sağlama çalışması.`;
        drilC = `• Basit Rotasyon (15 dk): Topu karşılayan oyuncu sıranın arkasına geçer, pasör bölgesindeki arkadaşına topu elden teslim eder.`;
      } 
      else if (isATakim) {
        drilA = `• Reaksiyonel Manşet Mekaniği (15 dk): Keskin ve sert gelen şut makinesi veya antrenör vuruşlarına karşı kalçayı alçaltarak topu karşılama drili.`;
        drilB = `• Deplase Savunma & Sistem Entegrasyonu (15 dk): Defans oyuncuları sahada 1 ve 5 numaradan hızlıca yer değiştirerek (deplase olarak) alan savunması manşeti çalışır.`;
        drilC = `• Hedefe Milimetrik Aktarım (15 dk): Sert servislerin 2-3 numara arasına (pasörün tam eline) yüksek ve yumuşak şekilde ulaştırılması yüzdesi ölçülür. Target zone çalışması.`;
      } 
      else {
        drilA = `• Standart Manşet Açısı Çalışması (15 dk): Sabit noktadan atılan toplarla omuz-kol kilitlenmesi ve topa temas anı mekaniği.`;
        drilB = `• Hareketli Manşet (15 dk): Sağa ve sola atılan kısa adımlı toplara doğru kayma adımı atarak manşet pozisyonunu koruma drili.`;
        drilC = `• Pasör Bölgesine Aktarım (15 dk): Alınan manşetlerin pasör bölgesine kontrollü olarak atılması varyasyonu.`;
      }

    // 🏐 DİĞER TÜM ÖZEL KONULAR İÇİN STANDART ALTYAPI
    } else {
      drilA = `• ${topic} Seviyeye Özel Temel Çalışma (15 dk): ${ageGroup} grubunun fiziki kapasitesine uygun ${topic} mekanik anlatımı.`;
      drilB = `• ${topic} Dinamik İstasyon Drili (15 dk): ${playerCount} oyuncunun katılımıyla ${level} düzeyine göre ayarlanan saha içi varyasyonu.`;
      drilC = `• ${topic} Hedefli Uygulama (15 dk): Çalışmanın oyun içi alanlara aktarılması ve kontrolü.`;
    }

    // 💡 STRATEJİK SEVİYE NOTLARI
    let seviyeNotu = "💡 ORTA SEVİYE STRATEJİSİ: Hareketli drillerde tempo dengeli tutulmalı, sporcuların deplase olurken dengede kalmasına odaklanılmalıdır.";
    if (isBeginner) {
      seviyeNotu = `⚠️ BAŞLANGIÇ SEVİYESİ UYARISI: Teknik formun bozulmaması için driller yavaş tempoda yapılmalı, ${isMini ? "oyun ve eğlence ön planda tutulmalıdır." : "sakatlık önleyici omuz aktivasyonuna maksimum süre ayrılmalıdır."}`;
    } else if (isAdvanced) {
      seviyeNotu = "🔥 İLERİ DÜZEY TAKTİĞİ: Maksimum tempo! Driller arasına skor baskısı eklenmeli, hatasız üst üste 3 aksiyon kuralı uygulanarak profesyonel disiplin sağlanılmalıdır.";
    }

    // ⏰ MATEMATİKSEL ZAMAN HESAPLAYICI
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
    ${drilC}
    
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
