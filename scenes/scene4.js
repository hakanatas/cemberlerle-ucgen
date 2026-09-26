/* SAHNE 4 — EŞİT YARIÇAP: İKİZKENAR (42–58 s)
   Give both circles the same radius. Guess first; then AC = BC: isosceles, whatever that radius is. */
(function (LI) {
  'use strict';
  const { seg, outBack } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const s = LI.drawMain(ctx, env, t), out = 1 - seg(t, 57.6, 58.2);
      const q = outBack(seg(t, 44.9, 45.4)) * (1 - seg(t, 48.2, 48.6));
      if (q > 0) A.text(ctx, '?', s.C[0], s.C[1] - 110, { size: 110 * q, color: A.amber });
      [2, 1, 1].forEach((n, i) => F().ticks(ctx, s.P, i, n, { p: seg(t, 48.6 + i * 0.3, 48.9 + i * 0.3), alpha: out }));
      LI.nameAt(ctx, s, 'ikizkenar', t, 49.0, 58.0);
    });
  }
  LI.registerScene({ id: 4, start: 42, end: 58, name: 'Equal radii', nameTr: 'Eşit yarıçap', concept: 'AC = BC → isosceles', conceptTr: 'AC = BC → ikizkenar', render });
})(window.LI = window.LI || {});
