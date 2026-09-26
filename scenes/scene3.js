/* SAHNE 3 — İKİ ÇEMBER, BİR ÜÇGEN (24–42 s)
   A circle around A, a circle around B; they cross at two points. A, B and one
   crossing point C make a triangle. AC and BC are radii. Here all three sides differ: scalene. */
(function (LI) {
  'use strict';
  const { seg, outBack, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film, Ink = LI.Ink;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  /** the construction shared by scenes 3–5 */
  LI.drawMain = function (ctx, env, t) {
    const s = F().state(t, env), a = seg(t, 24.0, 24.3) * (1 - seg(t, 71.6, 72.4));
    if (a <= 0) return s;
    F().circle(ctx, s.PA, s.r1, { p: t >= 42 ? 1 : seg(t, 24.4, 26.0), alpha: a, from: 60, seed: 3, ink: 0.6 });
    F().circle(ctx, s.PB, s.r2, { p: t >= 42 ? 1 : seg(t, 26.2, 27.8), alpha: a, from: 120, seed: 5, ink: 0.6 });
    // the two crossing points
    const k = outBack(seg(t, 28.0, 28.4)), dim = 1 - 0.65 * seg(t, 29.6, 30.2);
    if (k > 0) {
      Ink.dot(ctx, s.C[0], s.C[1], 10 * k, { seed: 40, color: LI.AMBER_RGB, alpha: a, bleed: 0 });
      Ink.dot(ctx, s.D[0], s.D[1], 10 * k, { seed: 41, color: LI.AMBER_RGB, alpha: a * dim, bleed: 0 });
      const r = seg(t, 28.2, 29.4);
      if (r > 0 && r < 1) [s.C, s.D].forEach((X, i) => Ink.ring(ctx, X[0], X[1], 16 + 40 * r, { w: 4, alpha: 1 - r, seed: 42 + i, color: LI.AMBER_RGB }));
    }
    // the triangle
    F().fill(ctx, s.P, seg(t, 31.4, 32.0) * a);
    F().outline(ctx, s.P, { p: seg(t, 30.4, 31.6), alpha: a });
    F().label(ctx, 'C', s.C, 0, -46, seg(t, 30.2, 30.7) * a);
    LI.drawAB(ctx, env, t, { alpha: 1 });
    return s;
  };
  LI.nameAt = (ctx, s, str, t, a, b) => A.text(ctx, str, s.C[0], s.C[1] - 110, { size: 60, p: seg(t, a, a + 0.8), alpha: 1 - seg(t, b - 0.4, b), halo: true });
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const s = LI.drawMain(ctx, env, t), out = 1 - seg(t, 41.4, 42.0);
      // AC and BC are radii
      Ink.path(ctx, [s.PA, s.C], { w: 9, p: seg(t, 35.8, 36.6), color: LI.AMBER_RGB, alpha: 0.85 * out, seed: 50 });
      Ink.path(ctx, [s.PB, s.C], { w: 9, p: seg(t, 37.0, 37.8), color: LI.AMBER_RGB, alpha: 0.85 * out, seed: 51 });
      [3, 2, 1].forEach((n, i) => F().ticks(ctx, s.P, i, n, { p: seg(t, 38.2 + i * 0.3, 38.5 + i * 0.3), alpha: out }));
      LI.nameAt(ctx, s, 'çeşitkenar', t, 38.8, 42.0);
    });
  }
  LI.registerScene({ id: 3, start: 24, end: 42, name: 'Two circles, one triangle', nameTr: 'İki çember, bir üçgen', concept: 'Centres + one crossing point', conceptTr: 'Merkezler + bir kesişim noktası', render });
})(window.LI = window.LI || {});
