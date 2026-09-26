/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   Two fixed points A and B. A circle around A (radius r1) and a circle
   around B (radius r2). C is their upper crossing point, so
   AC = r1 and BC = r2 by definition — no ruler needed.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, track, inOut, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;
  const R2D = 180 / Math.PI;

  const rel = (V, X) => [X[0] - V[0], X[1] - V[1]];
  const degOf = (v) => Math.atan2(-v[1], v[0]) * R2D;
  /** inside-angle sector at corner i: start direction and sweep (degrees) */
  function sector(P, i) {
    const V = P[i], a = P[(i + P.length - 1) % P.length], b = P[(i + 1) % P.length];
    let d1 = degOf(rel(V, a)), d2 = degOf(rel(V, b));
    let sw = (((d2 - d1) % 360) + 360) % 360;
    if (sw > 180) { d1 = d2; sw = 360 - sw; }
    return { V, d1, sw };
  }
  /** amber arc (or square for 90°) for the inside angle at corner i, with an optional degree label */
  function corner(ctx, P, i, o = {}) {
    const { V, d1, sw } = sector(P, i), r = o.r ?? 56, a = o.alpha ?? 1;
    if (a <= 0) return;
    const k = o.p ?? 1;
    A.wedge(ctx, V, r, d1, d1 + sw, (o.fill ?? 0.2) * a * k);
    if (Math.abs(sw - 90) < 0.6 && o.square !== false) A.square(ctx, V, d1, r * 0.62, { p: k, alpha: a });
    else A.arc(ctx, V, r, d1 + 2, d1 + sw - 2, { p: k, alpha: a, w: o.w ?? 6, seed: 40 + i });
    if (o.label != null && (o.la ?? 0) > 0) {
      const m = d1 + sw / 2, L = A.at(V, m, r + (o.gap ?? 56) + (sw < 40 ? 26 : 0));
      A.deg(ctx, o.label, L[0], L[1], { size: o.size ?? 52, halo: true, alpha: o.la * a });
    }
  }
  /** little equal-length marks on side i (n strokes) */
  function ticks(ctx, P, i, n, o = {}) {
    const V = P[i], W = P[(i + 1) % P.length], M = [(V[0] + W[0]) / 2, (V[1] + W[1]) / 2];
    const d = degOf(rel(V, W)), a = o.alpha ?? 1; if (a <= 0 || n <= 0) return;
    for (let j = 0; j < n; j++) {
      const C = A.at(M, d, (j - (n - 1) / 2) * 15);
      Ink.path(ctx, [A.at(C, d + 90, -18), A.at(C, d + 90, 18)], { w: 6, color: LI.AMBER_RGB, alpha: a, p: o.p ?? 1, seed: 90 + i * 3 + j, taper: [0.1, 0.1] });
    }
  }
  const outline = (ctx, P, o = {}) => Ink.path(ctx, P.concat([P[0]]), { w: o.w ?? 10, p: o.p ?? 1, seed: o.seed ?? 7, taper: [0.02, 0.02], wob: 0.12, dry: 0.3, bleed: 0.5, alpha: o.alpha ?? 1 });
  function fill(ctx, P, a) { if (a <= 0) return; ctx.fillStyle = `rgba(${LI.AMBER_RGB},${0.1 * a})`; ctx.beginPath(); P.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); }

  /** radii over time (horizontal units; vertical uses the same numbers) */
  const r1 = (t) => track([[0, 220], [42.4, 220], [44.4, 200], [53.8, 200], [54.8, 260], [55.8, 180], [57, 200], [58.4, 200], [60.2, 260], [92, 260]], t);
  const r2 = (t) => track([[0, 150], [42.4, 150], [44.4, 200], [53.8, 200], [54.8, 260], [55.8, 180], [57, 200], [58.4, 200], [60.2, 260], [92, 260]], t);

  /** upper crossing point of circle(PA, ra) and circle(PB, rb) (PA, PB on a horizontal line) */
  function cross(PA, PB, ra, rb, lower) {
    const d = PB[0] - PA[0], x = (d * d + ra * ra - rb * rb) / (2 * d), h = Math.sqrt(Math.max(0, ra * ra - x * x));
    return [PA[0] + x, PA[1] + (lower ? h : -h)];
  }

  /** a circle drawn on like a compass: arc from `from`° CCW, with the radius arm while drawing */
  function circle(ctx, C, r, o = {}) {
    const p = o.p ?? 1, a = o.alpha ?? 1, st = o.from ?? 0; if (p <= 0 || a <= 0) return;
    const n = Math.max(24, Math.round(r / 4)), pts = [];
    for (let i = 0; i <= n; i++) pts.push(A.at(C, st + 360 * i / n, r));
    Ink.path(ctx, pts, { w: o.w ?? 4.5, p, seed: o.seed ?? 3, taper: [0.02, 0.02], wob: 0.15, dry: 0.3, alpha: a * (o.ink ?? 0.8) });
    if (p < 1 && o.arm !== false) {
      const E = A.at(C, st + 360 * p, r);
      Ink.path(ctx, [C, E], { w: 3, seed: (o.seed ?? 3) + 1, taper: [0, 0], alpha: 0.55 * a });
      Ink.dot(ctx, E[0], E[1], 7, { seed: 9, color: LI.AMBER_RGB, bleed: 0 });
    }
  }
  const label = (ctx, s, X, dx, dy, a, size) => A.text(ctx, s, X[0] + dx, X[1] + dy, { size: size ?? 52, alpha: a, font: `italic ${size ?? 52}px "LI Brush", cursive` });

  /** the main construction at time t */
  function state(t, env) {
    const L = KD.L(env), a1 = r1(t), a2 = r2(t);
    const C = cross(L.A, L.B, a1, a2), D = cross(L.A, L.B, a1, a2, true);
    return { PA: L.A, PB: L.B, C, D, r1: a1, r2: a2, P: [L.A, L.B, C] };
  }

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    KD.look(p, [(L.A[0] + L.B[0]) / 2, L.A[1] - 120]);
    const brush = (a, b) => { if (t > a && t < b) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; } };
    brush(2.9, 5.6); brush(10.4, 12.6); brush(24.2, 28.0);
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(42.2, 44.6); pointing(53.6, 57.2); pointing(58.2, 60.4);
    const puz = seg(t, 44.8, 45.2) * (1 - seg(t, 48.2, 48.5));
    if (puz > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.6 * puz; p.mouth = -0.1; p.lookY -= 0.3; }
    if (t > 28.0 && t < 29.6) { p.mouthOpen = 0.55; p.eyeScale = 1.1; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(40.0, 41.6); joy(51.4, 53.0); joy(66.4, 68.0); joy(81.6, 83.2);
    if (t > 85.0) {
      const j = (t - 85.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 21.0, 21.15), hump(t, 33.0, 33.15), hump(t, 56.0, 56.15), hump(t, 63.0, 63.15), hump(t, 76.0, 76.15));
    return p;
  }

  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  LI.Film = { sector, corner, ticks, outline, fill, r1, r2, cross, circle, label, state, nokta, base };
})(window.LI = window.LI || {});
