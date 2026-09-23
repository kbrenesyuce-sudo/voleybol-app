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

    const toplamSure = parseInt(duration) || 90;
    const isinmaSuresi = Math.round(toplamSure * 0.16);
    const taktikSure = Math.round(toplamSure * 0.22);
    const sogumaSure = Math.round(toplamSure * 0.11);
    const anaTemaSuresi = toplamSure - (isinmaSuresi + taktikSure + sogumaSure);

    const db: Record<string, Record<string, { strateji: string; a: string; b: string; c: string }>> = {
      "8-10 Yaş (Mini)": {
        "Başlangıç": {
          strateji: `⚠️ MİNİ VOLEYBOL BAŞLANGIÇ: 8-10 yaş başlangıç seviyesinde ${konu} konusu tamamen oyunlaştırılmalı, top korkusunu yenme ve temel el-göz koordinasyonuna odaklanılmalıdır.`,
          a: `• Oyunsal Tanışma (15 dk): Mini sporcular ${playerCount} kişiyle halka olur. ${konu} hareketinin temel duruşu gösterilir. Hafif/sünger toplarla can yakmadan yumuşak temas oyunları oynanır.`,
          b: `• Koordinasyon Parkuru (15 dk): Sahaya dizilen renkli hunilerin arasından geçerek ${konu} pozisyonu alma ve sabit duran topa doğru teknik el/kol hareketiyle dokunma simülasyonu.`,
          c: `• Ödüllü Hedef Oyunu (15 dk): Antrenörün çok yakından havadan yavaşça bıraktığı toplara mini sporcular sıçramadan/koşmadan sadece doğru ${konu} tekniğiyle dokunarak yerdeki minderleri vurmaya çalışır.`
        },
        "Orta Seviye": {
          strateji: `💡 MİNİ VOLEYBOL ORTA SEVİYE STRATEJİSİ: Çocuklar ${konu} hareketini biliyor. Ritim ve adımlama kalitesine odaklanılmalı, hafif hareketlilik eklenmelidir.`,
          a: `• Ritimli Adımlama (15 dk): ${konu} için gereken temel ayak adımlaması yerde çizili çizgiler üzerinde müzik veya alkış ritmiyle çalışılır. Son aşamada top fırlatılarak teknik birleştirilir.`,
          b: `• Eşli Kontrollü Drill (15 dk): 2'şerli eşleşen mini oyuncular, birbirlerine kontrollü şekilde top atarak havada veya yerde ${konu} tekniğini üst üste 3 kez hatasız yapmaya çalışır.`,
          c: `• File Önü Adaptasyon (15 dk): Alçaltılmış mini voleybol filesi önünde, antrenörün attığı toplara doğru hamle yaparak ${konu} aksiyonunu file üzerinden karşı sahaya aktarma çalışması.`
        },
        "İleri Düzey": {
          strateji: `🔥 MİNİ VOLEYBOL İLERİ DÜZEY TAKTİĞİ: Yarışmacı mini takım altyapısı. ${konu} konusu saha içi pozisyon geçişleri ve mini maç taktikleriyle işlenmelidir.`,
          a: `• Dinamik İstasyon Düzeni (15 dk): 3'lü gruplar halinde sürekli rotasyonla gelen toplara ${konu} uygulama. Hız ve çabuklukamp parametreleri drille eklenir.`,
          b: `• Hedefli Seri Aksiyon (15 dk): File önünde veya defansta, ardı ardına gelen 4 topa ${konu} tekniğiyle müdahale etme ve topu sahanın derin köşelerine yönlendirme drili.`,
          c: `• Mini Oyun Simülasyonu (15 dk): Sadece ${konu} tekniğinin kullanılabildiği, hatasız yapılan her hareketin takıma ekstra puan getirdiği yüksek tempolu mini saha maçı.`
        }
      },
      "17+ Yaş (A Takım)": {
        "Başlangıç": {
          strateji: `⚠️ A TAKIM BAŞLANGIÇ UYARISI: Yetişkin hobi seviyesinde ${konu} konusu, fiziksel gücü doğru yönlendirerek hatasız teknik form oluşturma odaklı işlenir.`,
          a: `• Kuvvet Dengeli Teknik (15 dk): Yetişkin kas yapısına uygun olarak ${konu} anında vücut ağırlığını dengeli dağıtma, omuz ve diz sakatlıklarını önleyici doğru duruş drili.`,
          b: `• Net Hedefli Besleme (15 dk): Sahada pozisyon alan ${playerCount} yetişkin sporcuya gelen standart topları, oyun kurallarını bozmadan temiz bir ${konu} vuruşuyla sisteme dahil etme.`,
          c: `• Basit Maç Formatı (15 dk): Kuralların basitleştirildiği, sadece ${konu} başarısına odaklanan kontrollü set oyunu.`
        },
        "Orta Seviye": {
          strateji: `💡 A TAKIM ORTA SEVİYE SİSTEMİ: Profesyonel lig öncesi veya üniversite takımı. ${konu} konusu taktik sistemler ve kombine drillerle verilir.`,
          a: `• 6 Bölge Kombinasyon Sistemi (15 dk): Sahanın farklı 6 noktasına rastgele fırlatılan toplara hareketlenerek organizasyon kurma ve ${konu} tekniğini yüksek yüzdelik doğruluğuyla tamamlama.`,
          b: `• Blok Arkası Dublaj ve Savunma (15 dk): Bloktan seken blok-aut toplarını veya plase düşüşlerini ${konu} ile yukarı çıkarıp kontra atak başlatma drili.`,
          c: `• Taktiksel Servis / Hücum Karşılama (15 dk): Rakibin stratejik hamlelerine karşı defansif duruşu bozmadan ${konu} mekaniğini koruma varyasyonu.`
        },
        "İleri Düzey": {
          strateji: `🔥 A TAKIM İLERİ DÜZEY OPTİMİZASYONU: Üst Düzey Profesyonel Lig Standartları! Maksimum fiziksel güç, agresif taktikler ve sıfır hata toleransı ile ${konu} optimizasyonu.`,
          a: `• Ultra Hızlı Geçiş Mimarisi (15 dk): 0.5 saniye reaksiyon süresi! Blok inişi sonrası anında geriye deplase olup, gelen sert kontra topa ${konu} ile bitirici hamleyi yapma drili.`,
          b: `• Çiftli/Üçlü Blok Dağıtma Stratejisi (15 dk): Karşıdaki kurulu 3'lü profesyonel bloğu manipüle etmek için ${konu} aksiyonlarında havada yön değiştirme, bilek kırışları ve plase varyasyonları.`,
          c: `• Kriz Anı ve Sistem Testi (15 dk): Skor 24-23 iken, takım en yorgun seviyedeyken üst üste 3 adet kusursuz ${konu} aksiyonu yaparak seti ve maçı bitirme drili.`
        }
      }
    };

    const kat = db[ageGroup] || db["17+ Yaş (A Takım)"];
    const res = kat[level] || kat["Orta Seviye"];

    const dinamikPlanMetni = `
    🏐 ${ageGroup.toUpperCase()} GRUBU | ${gender.toUpperCase()} TAKIMI ANTRENMAN PROGRAMI
    ======================================================================
    Seviye: ${level} | Sporcu Sayısı: ${playerCount} Oyuncu | Toplam Süre: ${toplamSure} Dakika
    Günün Ana Odak Teması: ${konu}
    
    ${res.strateji}
    
    ----------------------------------------------------------------------
    1. ISINMA & MOBİLİTE SEKANSI (${isinmaSuresi} Dakika)
    ----------------------------------------------------------------------
    • Dinamik Koşu: Sahada çizgiler arası yan adımlama, dizleri çekerek ve topukları kalçaya vurarak nabız yükseltme.
    • Mobilizasyon: Voleybola özgü omuz (rotator cuff) aktivasyonu, ayak bileği ve diz eklemlerini esnetme hareketleri.
    • Toplu Isınma: ${playerCount} oyuncu karşılıklı eşleşerek kısa mesafeli parmak ve kontrollü manşet pas serileriyle top hissini artırır.
    
    ----------------------------------------------------------------------
    2. ANA TEMA TEKNİK ÇALIŞMASI: ${konu} (${anaTemaSuresi} Dakika)
    ----------------------------------------------------------------------
    ${res.a}
    ${res.b}
    ${res.c}
    
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
