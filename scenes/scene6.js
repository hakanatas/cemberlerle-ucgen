/* SAHNE 6 — ÜÇÜ BİR ARADA (72–84 s)  The three constructions side by side. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film, Ink = LI.Ink;
  const SET = [
    { ra: 220, rb: 150, ticks: [3, 2, 1], name: 'çeşitkenar' },
    { ra: 200, rb: 200, ticks: [2, 1, 1], name: 'ikizkenar' },
    { ra: 260, rb: 260, ticks: [1, 1, 1], name: 'eşkenar' },
  ];
  /** three small constructions; o.t0 start time, o.alpha */
  LI.Trio = function (ctx, env, t, o) {
    const d = 150, sc = d / 260, a = o.alpha;
    if (a <= 0) return;
    SET.forEach((m, i) => {
      const G = env.V ? [40, -640 + i * 380] : [-280 + i * 420, 30];
      const PA = [G[0] - d / 2, G[1]], PB = [G[0] + d / 2, G[1]];
      const ra = m.ra * sc, rb = m.rb * sc, C = F().cross(PA, PB, ra, rb), P = [PA, PB, C];
      const t0 = o.t0 + i * 0.8;
      F().circle(ctx, PA, ra, { p: seg(t, t0, t0 + 0.7), alpha: a, from: 60, seed: 70 + i, ink: 0.45, w: 3.5, arm: false });
      F().circle(ctx, PB, rb, { p: seg(t, t0 + 0.2, t0 + 0.9), alpha: a, from: 120, seed: 74 + i, ink: 0.45, w: 3.5, arm: false });
      F().fill(ctx, P, seg(t, t0 + 1.0, t0 + 1.4) * a);
      F().outline(ctx, P, { p: seg(t, t0 + 0.8, t0 + 1.4), alpha: a, w: 8, seed: 80 + i });
      [PA, PB, C].forEach((X, j) => Ink.dot(ctx, X[0], X[1], 7 * seg(t, t0 + 0.8, t0 + 1.0), { seed: 84 + j, alpha: a }));
      m.ticks.forEach((n, j) => F().ticks(ctx, P, j, n, { p: seg(t, t0 + 1.3, t0 + 1.6), alpha: a }));
      A.text(ctx, m.name, G[0], G[1] + (env.V ? 185 : 200), { size: 50, p: seg(t, t0 + 1.4, t0 + 2.0), alpha: a });
    });
  };
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => LI.Trio(ctx, env, t, { t0: 72.4, alpha: 1 }));
  }
  LI.registerScene({ id: 6, start: 72, end: 84, name: 'All three', nameTr: 'Üçü bir arada', concept: 'Choose the radii, get the triangle', conceptTr: 'Yarıçapı seç, üçgeni kur', render });
})(window.LI = window.LI || {});
