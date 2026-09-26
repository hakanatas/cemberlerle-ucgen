/* SAHNE 1 — İKİ NOKTA (0–10 s)  Nokta is born and marks two points A and B. Can we build a triangle without measuring? */
(function (LI) {
  'use strict';
  const { seg, outBack } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  /** points A, B and the segment AB (always on screen after scene 1) */
  LI.drawAB = function (ctx, env, t, o = {}) {
    const L = KD.L(env), a = o.alpha ?? 1;
    const ka = outBack(seg(t, 3.2, 3.6)), kb = outBack(seg(t, 3.8, 4.2));
    LI.Ink.path(ctx, [L.A, L.B], { w: 6, p: seg(t, 4.4, 5.4), seed: 12, alpha: a });
    if (ka > 0) LI.Ink.dot(ctx, L.A[0], L.A[1], 11 * ka, { seed: 13, alpha: a });
    if (kb > 0) LI.Ink.dot(ctx, L.B[0], L.B[1], 11 * kb, { seed: 14, alpha: a });
    F().label(ctx, 'A', L.A, -34, 42, seg(t, 3.4, 3.9) * a);
    F().label(ctx, 'B', L.B, 34, 42, seg(t, 4.0, 4.5) * a);
  };
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.drawAB(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Two points', nameTr: 'İki nokta', concept: 'A triangle without a ruler?', conceptTr: 'Cetvelsiz üçgen?', render });
})(window.LI = window.LI || {});
