/* SAHNE 5 — YARIÇAP = AB: EŞKENAR (58–72 s)
   Open both circles to AB: each circle passes through the other centre. AB, AC, BC are all radii: equilateral. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film, Ink = LI.Ink;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const s = LI.drawMain(ctx, env, t), out = 1 - seg(t, 71.4, 72.0);
      // each circle goes through the other centre
      [[s.PB, 60.4], [s.PA, 61.0]].forEach(([X, a], i) => { const r = seg(t, a, a + 1.0); if (r > 0 && r < 1) Ink.ring(ctx, X[0], X[1], 16 + 40 * r, { w: 4, alpha: 1 - r, seed: 60 + i, color: LI.AMBER_RGB }); });
      [1, 1, 1].forEach((n, i) => F().ticks(ctx, s.P, i, n, { p: seg(t, 63.0 + i * 0.3, 63.3 + i * 0.3), alpha: out }));
      LI.nameAt(ctx, s, 'eşkenar', t, 63.4, 72.0);
      [0, 1, 2].forEach((i) => F().corner(ctx, s.P, i, { r: 40, p: seg(t, 68.6 + i * 0.25, 69.1 + i * 0.25), label: 60, la: seg(t, 68.9 + i * 0.25, 69.3 + i * 0.25), size: 44, gap: 34, alpha: out }));
    });
  }
  LI.registerScene({ id: 5, start: 58, end: 72, name: 'Radius = AB', nameTr: 'Yarıçap = AB', concept: 'All sides are radii → equilateral', conceptTr: 'Hepsi yarıçap → eşkenar', render });
})(window.LI = window.LI || {});
