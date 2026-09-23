import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ageGroup = body.ageGroup || "14-16 Yaş (Yıldız)";
    const gender = body.gender || "Kız";
    const level = body.level || "Orta Seviye";
    const playerCount = body.playerCount || "12";
    const duration = body.duration || "90";
    const topic = body.topic || "Temel Teknik";
    const konu = topic.toUpperCase();

    let drilA = ""; let drilB = ""; let drilC = ""; let stratejiNotu = "";
    const aranan = topic.toLowerCase();

    // 🏐 VOLEYBOL AKILLI KELİME TARAYICI ALGORİTMASI
    if (aranan.includes("pasör") || aranan.includes("arka hat") || aranan.includes("varyasyon") || aranan.includes("hücum")) {
      // 1. SENARYO: PASÖR ARKA HATTA / HÜCUM TAKTİKLERİ
      stratejiNotu = `🔥 ${ageGroup.toUpperCase()} İLERİ DÜZEY TAKTİK: Pasörün arka hattan (1, 6, 5 numaradan) file önüne kaçarak 3 hücumcuyla (Smaçör, Orta, Pasör Çaprazı) oyun kurduğu K-1 sistem varyasyonları.`;
      drilA = `• Pasör Kaçma & Dublaj Reaksiyonu (15 dk): ${playerCount} oyuncu sahaya dizilir. Karşı sahadan atılan serbest toplarla oyun başlar, arka hattaki pasör hızlıca file önüne kaçarken diğer oyuncular dublaj ve manşet emniyeti alır.`;
      drilB = `• 3'lü Hücum Kombinasyonları (15 dk): Arka hattan gelen pasör, orta oyuncuya kurşun/kısa pas atarken, 4 numaradaki smaçör içe kat eder, arka hattan (pipe) 6 numara hücum varyasyonuna dahil olur.`;
      drilC = `• Blok Dağıtma Maçı (15 dk): Kontrollü oyun simülasyonu. Pasör arka hattayken 3 hücumcuya blokları tekli bırakacak şekilde sürekli yön değiştirerek (dağıtarak) smaç vurdurma yüzdesi çalışılır.`;
    } 
    else if (aranan.includes("manşet") || aranan.includes("pas") || aranan.includes("karşılama")) {
      // 2. SENARYO: MANŞET PAS VE SERVİS KARŞILAMA
      stratejiNotu = `💡 ${ageGroup.toUpperCase()} TEKNİK ODAK: Manşet pas mekaniğinde kolların kilitlenmesi, topun geliş açısına göre gövdenin pasör havuzuna doğru dönmesi (platform oluşturma) kalitesi.`;
      drilA = `• Yoğun Reaksiyon Manşeti (15 dk): Oyuncular 3'lü gruplara ayrılır. Antrenör kürsüden tempolu ve sert vuruşlar yapar. Sporcular kalçayı alçaltarak manşet platformu kurar.`;
      drilB = `• Hedefe Hassas Aktarım (15 dk): 1 ve 5 numaradan alınan servis karşılama toplarının, file önündeki pasör kutusuna (2-3 numara arası) yüksek ve yumuşak şekilde düşürülme drili.`;
      drilC = `• Servis Karşılama Baskısı (15 dk): Üst üste 5 adet kusursuz manşet pasör havuzuna ulaşana kadar dril devam eder. Hata yapıldığında seri sıfırlanır.`;
    } 
    else {
      // 3. SENARYO: DİĞER GENEL KONULAR
      stratejiNotu = `📋 ${ageGroup} grubu ${level} seviyesi için ${topic} çalışması genel stratejik planlamasıdır.`;
      drilA = `• ${topic} Temel Form ve Mekanik (15 dk): Girdiğiniz "${topic}" konusuna yönelik duruş, saha içi pozisyon alımı ve topsuz koordinasyon drili.`;
      drilB = `• Dinamik Kombinasyon (15 dk): ${playerCount} sporcu ile ${level} düzeyine uygun tempolu ve hareketli ${topic} istasyon çalışması.`;
      drilC = `• Taktiksel Uygulama (15 dk): ${topic} becerisinin kontrollü rallilerle oyun içi alanlara aktarılması ve yüzdelik ölçümü.`;
    }

    // ⏰ MATEMATİKSEL ZAMAN HESAPLAYICI
    const toplam = parseInt(duration) || 90;
    const isinma = Math.round(toplam * 0.16);
    const taktik = Math.round(toplam * 0.22);
    const soguma = Math.round(toplam * 0.11);
    const anaTema = toplam - (isinma + taktik + soguma);

    const dinamikPlanMetni = `

    | ${ageGroup.toUpperCase()} GRUBU | ${gender.toUpperCase()} TAKIMI ANTRENMAN PROGRAMI |
    ======================================================================
    Seviye: ${level} | Sporcu Sayısı: ${playerCount} Oyuncu | Toplam Süre: ${toplam} Dakika
    Günün Ana Odak Teması: ${konu}
    
    ${stratejiNotu}
    
    ----------------------------------------------------------------------
    1. ISINMA & MOBİLİTE SEKANSI (${isinma} Dakika)
    ----------------------------------------------------------------------
    • Çizgiler arası dinamik koşularla nabız yükseltme ve voleybola özgü omuz aktivasyon drilleri.
    
    ----------------------------------------------------------------------
    2. ANA TEMA TEKNİK ÇALIŞMASI: ${konu} (${anaTema} Dakika)
    ----------------------------------------------------------------------
    ${drilA}
    ${drilB}
    ${drilC}
    
    ----------------------------------------------------------------------
    3. TAKTİK & MAÇ SİMÜLASYONU (${taktik} Dakika)
    ----------------------------------------------------------------------
    • Günün konusu olan "${topic}" becerisini test etmek için kontrollü maç simülasyonu. Kurallara uygun mükemmel yapılan her "${topic}" aksiyonu takıma direkt +2 puan kazandırır.
    
    ----------------------------------------------------------------------
    4. SOĞUMA & ANTRENÖR DEĞERLENDİRMESİ (${soguma} Dakika)
    ----------------------------------------------------------------------
    • Kaslarda laktik asit birikimini önlemek için statik esneme ve ${ageGroup} grubuna uygun günün performans feedback konuşması.
    `;

    return NextResponse.json({ title: `✨ AI Dinamik Programı (${toplam} Dk)`, level: level, rawText: dinamikPlanMetni });
  } catch (error) {
    return NextResponse.json({ error: "Sistem hatası" }, { status: 500 });
  }
}
