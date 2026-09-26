/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 9.6, tr: 'Cetvelle ölçmeden üçgen kurabilir miyiz?', en: 'Can we build a triangle without measuring?',
      note: 'Nokta iki nokta işaretledi: A ve B. Cetvelle hiçbir şey ölçmeden bir üçgen kurabilir miyiz?' },
    { scene: 2, start: 10.8, end: 15.6, tr: 'Pergel bir çember çizer', en: 'A compass draws a circle',
      note: 'Pergelin sivri ucunu A noktasına koyup bir çember çizelim. A, çemberin merkezi.' },
    { scene: 2, start: 16.0, end: 23.2, tr: 'Çemberin her noktası merkeze aynı uzaklıkta', en: 'Every point on it is the same distance from the centre',
      note: 'Çemberin üzerindeki her nokta merkeze aynı uzaklıktadır. Bu uzaklığa yarıçap denir. Çizgilerdeki küçük işaretler eşit uzunlukları gösterir.' },
    { scene: 3, start: 24.6, end: 29.6, tr: 'A ve B merkezli iki çember: iki noktada kesişiyorlar', en: 'Two circles around A and B: they cross at two points',
      note: 'Bir çemberi A merkezli, diğerini B merkezli çizelim. İki çember iki noktada kesişiyor.' },
    { scene: 3, start: 30.2, end: 35.4, tr: 'Merkezler ve bir kesişim noktası: üçgen ABC', en: 'The centres and one crossing point: triangle ABC',
      note: 'Kesişim noktalarından birine C diyelim. A, B ve C noktalarını birleştirince bir üçgen oluştu.' },
    { scene: 3, start: 35.8, end: 41.6, tr: 'AC ve BC birer yarıçap; kenarlar farklı: çeşitkenar', en: 'AC and BC are radii; all sides differ: scalene',
      note: 'AC, A merkezli çemberin yarıçapı; BC, B merkezli çemberin yarıçapı. Bu iki yarıçap farklı ve AB de farklı. Üç kenarı farklı: çeşitkenar üçgen.' },
    { scene: 4, start: 42.6, end: 44.6, tr: 'İki çemberin yarıçapı eşit olsun', en: 'Give both circles the same radius',
      note: 'Şimdi iki çemberi de aynı yarıçapla çizelim.' },
    { scene: 4, start: 44.8, end: 48.4, tr: 'Tahmin et: nasıl bir üçgen oluşur?', en: 'Guess: what kind of triangle is it?',
      note: 'Ölçmeden önce tahmin edelim: bu kez nasıl bir üçgen oluştu?' },
    { scene: 4, start: 48.6, end: 53.4, tr: 'AC = BC, ikisi de aynı yarıçap: ikizkenar', en: 'AC = BC, both the same radius: isosceles',
      note: 'AC ve BC aynı yarıçap olduğu için eşit. İki kenarı eşit olan üçgen ikizkenar üçgendir. Hiç ölçmedik!' },
    { scene: 4, start: 53.8, end: 57.8, tr: 'Yarıçaplar eşit kaldıkça hep ikizkenar', en: 'As long as the radii are equal: always isosceles',
      note: 'Yarıçapı büyütüp küçültelim. İki çemberin yarıçapı eşit kaldıkça üçgen hep ikizkenar oluyor.' },
    { scene: 5, start: 58.6, end: 62.6, tr: 'Yarıçapı AB kadar açalım', en: 'Open the compass to exactly AB',
      note: 'Pergeli A ile B arası kadar açalım. Böylece her çember öbür merkezden geçer.' },
    { scene: 5, start: 63.0, end: 68.2, tr: 'AB, AC, BC hepsi yarıçap: eşkenar', en: 'AB, AC, BC are all radii: equilateral',
      note: 'Artık AB, AC ve BC kenarlarının hepsi aynı yarıçap. Üç kenarı eşit: eşkenar üçgen.' },
    { scene: 5, start: 68.6, end: 71.8, tr: 'Her açısı da 60°', en: 'And every angle is 60°',
      note: 'Eşkenar üçgenin her açısı 60 derecedir.' },
    { scene: 6, start: 72.6, end: 78.4, tr: 'Yarıçapları seçerek üç üçgeni de kurduk', en: 'Choosing the radii, we built all three',
      note: 'Yarıçapları farklı seçersek çeşitkenar, eşit seçersek ikizkenar, AB kadar seçersek eşkenar üçgen elde ederiz.' },
    { scene: 6, start: 78.8, end: 83.6, tr: 'Hiç ölçmeden, sadece çemberle!', en: 'No measuring, just circles!',
      note: 'Hiçbir ölçme aracı kullanmadan, sadece çemberin özelliğini kullanarak bu üçgenleri kurduk.' },
    { scene: 7, start: 84.6, end: 90.6, tr: 'İki çember + bir kesişim noktası = üçgen', en: 'Two circles + one crossing point = a triangle',
      note: 'Unutma: kesişen iki çemberin merkezleri ve bir kesişim noktası bir üçgen oluşturur. Kenarlarını çemberlerin yarıçapları belirler.' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
