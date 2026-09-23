import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      ageGroup,
      gender,
      level,
      playerCount,
      duration,
      topic,
    } = body;

    // Gelen verileri güvenli varsayılanlarla temizle
    const yasGrubu = ageGroup || "U13";
    const cinsiyet = gender || "Kız";
    const seviye = level || "Orta";
    const sporcuSayisi = parseInt(playerCount) || 12;
    const toplamSure = parseInt(duration) || 90;
    const anaKonu = topic || "Temel Teknik";

    // Süre dağılımı
    const isinma = Math.round(toplamSure * 0.15);
    const soguma = Math.round(toplamSure * 0.10);
    const anaCalisma = Math.round(toplamSure * 0.50);
    const taktik = toplamSure - isinma - soguma - anaCalisma;

    // OpenAI API anahtarı
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && apiKey.startsWith("sk-")) {
      try {
        /*
         * ÖNEMLİ:
         * openai.com değil, gerçek API endpoint'i kullanılmalı.
         */
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey.trim()}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              temperature: 0.75,
              messages: [
                {
                  role: "system",
                  content: `
Sen deneyimli ve kıdemli bir altyapı voleybol başantrenörüsün.

Görevin, verilen parametrelere göre GERÇEKTEN FARKLI,
uygulanabilir ve pedagojik voleybol antrenman programları oluşturmaktır.

ÇOK ÖNEMLİ:

Ana konu değiştiğinde sadece başlığı değiştirme.

Örneğin:

MANŞET seçildiyse programın içeriği;
- platform oluşturma
- ayak çalışması
- vücut açısı
- hedef bölge
- hareketli manşet
- servis karşılama
- üçlü karşılama
- oyun aktarımı

üzerine kurulmalıdır.

SERVİS seçildiyse;
- başlangıç pozisyonu
- top atışı
- temas noktası
- kol hareketi
- hedef bölgeler
- farklı servis türleri
- baskı altında servis
- servis sonrası pozisyon

üzerine kurulmalıdır.

BLOK seçildiyse;
- hazır pozisyon
- okuma
- yana kayma
- çapraz adım
- sıçrama zamanlaması
- el pozisyonu
- blok sonrası geçiş
- blok-savunma bağlantısı

üzerine kurulmalıdır.

HÜCUM seçildiyse;
- yaklaşma
- son iki adım
- kol salınımı
- sıçrama
- temas noktası
- farklı hücum bölgeleri
- blok okuma
- hücum sonrası geçiş

üzerine kurulmalıdır.

Yani ana konu değiştiğinde DRILL'LER, oyuncu hareketleri,
saha yerleşimi, koç komutları, tekrar sayıları ve taktik aktarım
da değişmelidir.

Aynı drill'i farklı başlıklarla tekrar kullanma.

Her drill için mümkün olduğunca:
1. Drill adı
2. Süre
3. Oyuncuların saha dizilimi
4. Başlangıç pozisyonu
5. Oyuncu hareketleri
6. Topun akışı
7. Koçun vereceği komutlar
8. Tekrar sayısı
9. Başarı kriteri
10. Yaygın hata ve düzeltmesi

ver.

Program tamamen Türkçe olsun.

Program verilen yaş grubuna, seviyeye ve sporcu sayısına uygun olsun.

Çocuk yaş gruplarında fiziksel yüklenmeyi yaşa uygun tut.

Aynı antrenman şablonunu her kategoriye kopyalama.
                      `,
                },
                {
                  role: "user",
                  content: `
Aşağıdaki bilgiler için özel bir voleybol antrenmanı hazırla:

YAŞ GRUBU: ${yasGrubu}
CİNSİYET: ${cinsiyet}
SEVİYE: ${seviye}
SPORCU SAYISI: ${sporcuSayisi}
TOPLAM SÜRE: ${toplamSure} dakika
ANA KONU: ${anaKonu}

SÜRE YAPISI:
- Isınma ve mobilite: yaklaşık ${isinma} dakika
- Ana teknik çalışma: yaklaşık ${anaCalisma} dakika
- Taktik / oyun aktarımı: yaklaşık ${taktik} dakika
- Soğuma ve değerlendirme: yaklaşık ${soguma} dakika

Ana konu olan "${anaKonu}" programın merkezinde olmalı.

Özellikle ${anaKonu} için yaş, seviye ve oyuncu sayısına
uygun en az 3 farklı drill oluştur.

Drill'ler birbirinin tekrarı olmasın.

Saha dizilimlerini açıkça tarif et.

Program sahada bir antrenör tarafından doğrudan uygulanabilecek
kadar detaylı olsun.
                  `,
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const aiData = await response.json();

          const aiText = aiData.choices?.[0]?.message?.content;

          if (aiText) {
            return NextResponse.json({
              success: true,
              title: `✨ AI Akıllı Programı - ${anaKonu}`,
              level: seviye,
              topic: anaKonu,
              ageGroup: yasGrubu,
              gender: cinsiyet,
              playerCount: sporcuSayisi,
              duration: toplamSure,
              rawText: aiText,
            });
          }
        } else {
          const errorText = await response.text();

          console.error(
            "OpenAI API hatası:",
            response.status,
            errorText
          );
        }
      } catch (openaiError) {
        console.error(
          "OpenAI bağlantı hatası:",
          openaiError
        );
      }
    }

    /*
     * =========================================================
     * YEDEK MOTOR
     * =========================================================
     *
     * OpenAI çalışmazsa sistem tamamen çökmeyecek.
     * Ancak artık topic'i sadece başlığa koymak yerine
     * konuya göre farklı içerik üretecek.
     */

    const konu = anaKonu.toLowerCase();

    let teknikDrilleri: string[] = [];

    if (konu.includes("manşet")) {
      teknikDrilleri = [
        `• Platform ve açı çalışması (15 dk): ${sporcuSayisi} sporcu çiftler halinde çalışır. Amaç, topu vücudun önünde karşılamak ve hedef bölgeye kontrollü göndermektir.`,

        `• Hareketli manşet (15 dk): Sporcular başlangıç pozisyonundan sağa-sola hareket ederek gelen topları karşılar. Her tekrar sonrası başlangıç pozisyonuna dönülür.`,

        `• Servis karşılama (15 dk): Üçlü karşılama düzeninde servis atan oyuncular farklı bölgelere servis gönderir. Karşılayanlar topu pasör bölgesine aktarmaya çalışır.`,
      ];
    } else if (konu.includes("servis")) {
      teknikDrilleri = [
        `• Servis ritmi ve top atışı (15 dk): Sporcular servis çizgisinde top atış yüksekliğini ve temas noktasını kontrol eder.`,

        `• Hedef bölge servisi (15 dk): Sahanın 1, 5 ve 6 numaralı bölgelerine hedef servisleri uygulanır.`,

        `• Baskı altında servis (15 dk): Oyuncular belirlenen hedefe servis atarak takım puanı toplamaya çalışır. Hatalı servislerde tekrar ve teknik düzeltme yapılır.`,
      ];
    } else if (konu.includes("blok")) {
      teknikDrilleri = [
        `• Blok hazır pozisyonu (15 dk): Oyuncular file önünde dizler hafif bükülü şekilde hazır pozisyonda bekler ve hücum yönüne göre pozisyon alır.`,

        `• Yana kayma ve çapraz adım (15 dk): Blok oyuncuları file boyunca yana hareket ederek hücumcunun karşısında doğru noktaya ulaşır.`,

        `• Blok-savunma bağlantısı (15 dk): Bloktan çıkan topun arka alan tarafından karşılanması çalışılır. Blok oyuncusu ve savunmacı koordinasyonu ön plandadır.`,
      ];
    } else if (
      konu.includes("hücum") ||
      konu.includes("smaç")
    ) {
      teknikDrilleri = [
        `• Hücum yaklaşma adımları (15 dk): Sporcular üç veya dört adımlı yaklaşma ritmini topsuz olarak çalışır.`,

        `• Sıçrama ve temas noktası (15 dk): Pasör tarafından gönderilen toplara kontrollü hücum uygulanır. Temas noktası ve kol salınımı takip edilir.`,

        `• Blok üzerinden hücum (15 dk): Hücumcular karşılarındaki blokçunun pozisyonunu okuyarak farklı yönlere hücum eder.`,
      ];
    } else if (
      konu.includes("pas") ||
      konu.includes("parmak")
    ) {
      teknikDrilleri = [
        `• Parmak pas temel mekaniği (15 dk): El şekli, dirsek pozisyonu ve topun alınış yüksekliği çalışılır.`,

        `• Hareketli parmak pas (15 dk): Sporcular öne, arkaya ve yanlara hareket ederek pas verir.`,

        `• Pasör-hücum bağlantısı (15 dk): Pasörler farklı bölgelerden gelen topları hücumculara uygun yüksekliğe aktarmaya çalışır.`,
      ];
    } else {
      teknikDrilleri = [
        `• ${anaKonu} temel teknik çalışması (15 dk): Oyuncular temel mekanik ve doğru vücut pozisyonu üzerine çalışır.`,

        `• ${anaKonu} hareketli uygulama (15 dk): Oyuncular teknik hareketi saha içinde hareket ederek uygular.`,

        `• ${anaKonu} oyun aktarımı (15 dk): Çalışılan beceri kontrollü oyun içerisinde kullanılır.`,
      ];
    }

    const planText = `
${yasGrubu.toUpperCase()} - ${cinsiyet.toUpperCase()} VOLEYBOL ANTRENMANI

Ana Tema: ${anaKonu}
Seviye: ${seviye}
Oyuncu Sayısı: ${sporcuSayisi}
Toplam Süre: ${toplamSure} dakika

==================================================
1. ISINMA & MOBİLİTE
${isinma} DAKİKA
==================================================

• Hafif tempo koşular.
• Dinamik kalça, diz ve ayak bileği mobilitesi.
• Omuz ve kol aktivasyonu.
• Voleybola özgü kısa reaksiyon hareketleri.

==================================================
2. ANA TEKNİK ÇALIŞMA
${anaCalisma} DAKİKA
==================================================

${teknikDrilleri.join("\n\n")}

==================================================
3. TAKTİK & OYUN AKTARIMI
${taktik} DAKİKA
==================================================

• Günün ana konusu olan "${anaKonu}" kontrollü oyun içerisinde
kullanılır.

• Başarı kriterine göre takım puanı verilir.

• Koç, oyuncuların teknik hareketi oyun içerisinde doğru
zamanda kullanıp kullanmadığını takip eder.

==================================================
4. SOĞUMA & DEĞERLENDİRME
${soguma} DAKİKA
==================================================

• Hafif tempo düşürme.
• Dinamikten statik esnemeye geçiş.
• Günün teknik kazanımlarının kısa değerlendirmesi.
• Oyunculara bireysel geri bildirim.
`;

    return NextResponse.json({
      success: true,
      title: `✨ Dinamik Voleybol Programı - ${anaKonu}`,
      level: seviye,
      topic: anaKonu,
      ageGroup: yasGrubu,
      gender: cinsiyet,
      playerCount: sporcuSayisi,
      duration: toplamSure,
      rawText: planText,
    });

  } catch (error) {
    console.error("Sistem hatası:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Sistem hatası",
      },
      {
        status: 500,
      }
    );
  }
}