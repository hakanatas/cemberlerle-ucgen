/* SAHNE 2 — ÇEMBER VE YARIÇAP (10–24 s)
   The compass draws a circle; every point on it is the same distance from the centre. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const L = KD.L(env), out = 1 - seg(t, 23.2, 24.0), R = 200;
      F().circle(ctx, L.A, R, { p: seg(t, 10.6, 12.4), alpha: out, from: 90 });
      [30, 90, 150, 210, 270, 330].forEach((d, i) => {
        const P = LI.Ang.at(L.A, d + 15, R), k = seg(t, 13.0 + i * 0.3, 13.5 + i * 0.3);
        if (k <= 0) return;
        LI.Ink.path(ctx, [L.A, P], { w: 4, p: k, seed: 20 + i, alpha: out * 0.9 });
        LI.Ink.dot(ctx, P[0], P[1], 7, { seed: 30 + i, alpha: out });
        F().ticks(ctx, [L.A, P], 0, 1, { p: seg(t, 15.2 + i * 0.15, 15.5 + i * 0.15), alpha: out });
      });
      LI.drawAB(ctx, env, t);
    });
  }
  LI.registerScene({ id: 2, start: 10, end: 24, name: 'Circle & radius', nameTr: 'Çember ve yarıçap', concept: 'Every point is one radius away', conceptTr: 'Her nokta merkeze aynı uzaklıkta', render });
})(window.LI = window.LI || {});
