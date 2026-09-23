import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const age = body.ageGroup || "14-16 Yaş (Yıldız)";
    const level = body.level || "Orta Seviye";
    const count = body.playerCount || "12";
    const dur = body.duration || "90";
    const konu = (body.topic || "Temel Teknik").toUpperCase();

    // 1. YAŞ GRUBUNA GÖRE PEDAGOJİK YAKLAŞIM VE SAHA DİZİLİŞİ BELİRLEME
    let yasDetayi = `• ${count} sporcu sahada 2'şerli eşleşerek temel ${konu} formuna odaklanır.`;
    if (age.includes("8-10")) {
      yasDetayi = `• 8-10 Yaş Mini Voleybol Standartları: Ağır yükleme yapılmaz, ${count} mini sporcu hafif/sünger toplarla oyun oynayarak ${konu} mekaniğini öğrenir.`;
    } else if (age.includes("17+")) {
      yasDetayi = `• 17+ Yetişkin ve A Takım Düzeyi: Maksimum reaksiyon hızı! ${count} profesyonel sporcu tam maç temposunda kombine ${konu} istasyonlarında çalışır.`;
    }

    // 2. SEVİYEYE GÖRE ZORLUK VE METOT BELİRLEME
    let seviyeDetayi = `• ${level} seviyesine uygun kayma adımlı deplasmanlı ${konu} çalışması yapılır.`;
    if (level === "Başlangıç") {
      seviyeDetayi = `• Başlangıç Seviyesi Metodu: İzole ve topsuz mekanik gösterimler ön plandadır. Hatalı duruşlarda antrenör anında müdahale eder.`;
    } else if (level === "İleri Düzey") {
      seviyeDetayi = `• İleri Düzey Profesyonel Metodu: Driller arasına skor baskısı, çiftli blok savunmaları ve üst üste 3 hatasız aksiyon disiplini eklenir.`;
    }

    // 3. SÜRE MATEMATİĞİ HESAPLAMA
    const toplam = parseInt(dur) || 90;
    const isinma = Math.round(toplam * 0.16);
    const taktik = Math.round(toplam * 0.22);
    const soguma = Math.round(toplam * 0.11);
    const anaTema = toplam - (isinma + taktik + soguma);

    // 4. ŞABLON BİRLEŞTİRİCİ
    const planText = `
    🏐 ${age.toUpperCase()} GRUBU | ANTRENMAN PROGRAMI
    ======================================================================
    Seviye: ${level} | Oyuncu Sayısı: ${count} | Toplam Süre: ${toplam} Dakika
    Günün Ana Odak Teması: ${konu}
    
    ----------------------------------------------------------------------
    1. ISINMA & MOBİLİTE SEKANSI (${isinma} Dakika)
    ----------------------------------------------------------------------
    • Çizgiler arası dinamik koşularla nabız yükseltme ve omuz aktivasyonu.
    
    ----------------------------------------------------------------------
    2. ANA TEMA TEKNİK ÇALIŞMASI: ${konu} (${anaTema} Dakika)
    ----------------------------------------------------------------------
    • Dril A - Mekanik Adaptasyon: Girilen "${konu}" başlığına yönelik temel duruş ve pozisyon alma çalışması.
    ${yasDetayi}
    ${seviyeDetayi}
    • Dril B - Hedefe Aktarım: Çalışılan "${konu}" aksiyonlarının pasör havuzuna hassas olarak ulaştırılması serisi.
    
    ----------------------------------------------------------------------
    3. TAKTİK & MAÇ SİMÜLASYONU (${taktik} Dakika)
    ----------------------------------------------------------------------
    • Günün konusu olan "${konu}" becerisini oyun içine aktarmak için kontrollü maç. Nizami yapılan her hareket takıma ekstra +2 puan yazılır.
    
    ----------------------------------------------------------------------
    4. SOĞUMA & DEĞERLENDİRME (${soguma} Dakika)
    ----------------------------------------------------------------------
    • Kas ağrılarını önleyici statik esneme ve ${age} grubuna uygun performans geri bildirimi konuşması.
    `;

    return NextResponse.json({ title: `✨ AI Dinamik Programı (${toplam} Dk)`, level: level, rawText: planText });
  } catch (e) {
    return NextResponse.json({ error: "Hata" }, { status: 500 });
  }
}
