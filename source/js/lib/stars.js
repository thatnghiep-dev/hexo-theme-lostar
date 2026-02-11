/**
 * LostStar — Starfield Effect
 * Twinkling stars + occasional shooting stars on a fixed canvas.
 * Canvas is created dynamically and appended to document.body
 * to avoid layout interference from the theme's `* { position: relative }` rule.
 */
mixins.stars = {
	mounted() {
		// Create canvas dynamically — avoids layout push from EJS template
		const canvas = document.createElement("canvas");
		canvas.id = "stars-canvas";
		document.body.appendChild(canvas);

		const ctx = canvas.getContext("2d");
		let w, h;
		let stars = [];
		const shootingStars = [];
		let animId = null;

		// --- Config ---
		const STAR_COUNT = 90;
		const SHOOTING_INTERVAL = 1400; // ms between shooting stars
		const MAX_SHOOTING_STARS = 4;
		const EXTRA_SHOOTING_CHANCE = 0.35;
		const COLORS = [
			"rgba(255,255,255,", // white
			"rgba(173,216,255,", // soft blue
			"rgba(255,223,150,", // soft gold
			"rgba(200,180,255,", // soft lavender
		];

		function resize() {
			w = canvas.width = window.innerWidth;
			h = canvas.height = window.innerHeight;
		}

		function createStar() {
			return {
				x: Math.random() * w,
				y: Math.random() * h,
				r: Math.random() * 1.8 + 0.4,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
				alpha: Math.random() * 0.6 + 0.2,
				twinkleSpeed: Math.random() * 0.015 + 0.005,
				twinkleDir: Math.random() > 0.5 ? 1 : -1,
				driftX: (Math.random() - 0.5) * 0.08,
				driftY: (Math.random() - 0.5) * 0.04,
			};
		}

		function createShootingStar() {
			const fromLeft = Math.random() > 0.5;
			return {
				x: fromLeft
					? Math.random() * w * 0.6
					: w * 0.4 + Math.random() * w * 0.6,
				y: Math.random() * h * 0.5,
				len: Math.random() * 60 + 40,
				speed: Math.random() * 6 + 4,
				angle: fromLeft
					? Math.PI / 6 + Math.random() * (Math.PI / 6)
					: (Math.PI * 5) / 6 - Math.random() * (Math.PI / 6),
				alpha: 1,
				decay: Math.random() * 0.015 + 0.01,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
			};
		}

		function init() {
			resize();
			stars = [];
			for (let i = 0; i < STAR_COUNT; i++) {
				stars.push(createStar());
			}
		}

		function drawStar(s) {
			// Twinkle
			s.alpha += s.twinkleSpeed * s.twinkleDir;
			if (s.alpha >= 0.85) {
				s.alpha = 0.85;
				s.twinkleDir = -1;
			}
			if (s.alpha <= 0.1) {
				s.alpha = 0.1;
				s.twinkleDir = 1;
			}

			// Drift
			s.x += s.driftX;
			s.y += s.driftY;

			// Wrap around
			if (s.x < -5) s.x = w + 5;
			if (s.x > w + 5) s.x = -5;
			if (s.y < -5) s.y = h + 5;
			if (s.y > h + 5) s.y = -5;

			// Glow
			ctx.beginPath();
			ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
			ctx.fillStyle = s.color + s.alpha * 0.15 + ")";
			ctx.fill();

			// Core
			ctx.beginPath();
			ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
			ctx.fillStyle = s.color + s.alpha + ")";
			ctx.fill();
		}

		function drawShootingStar(ss) {
			const tailX = ss.x - Math.cos(ss.angle) * ss.len;
			const tailY = ss.y - Math.sin(ss.angle) * ss.len;

			const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
			grad.addColorStop(0, ss.color + ss.alpha + ")");
			grad.addColorStop(1, ss.color + "0)");

			ctx.beginPath();
			ctx.moveTo(ss.x, ss.y);
			ctx.lineTo(tailX, tailY);
			ctx.strokeStyle = grad;
			ctx.lineWidth = 1.5;
			ctx.stroke();

			// Head glow
			ctx.beginPath();
			ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
			ctx.fillStyle = ss.color + ss.alpha + ")";
			ctx.fill();

			// Move
			ss.x += Math.cos(ss.angle) * ss.speed;
			ss.y += Math.sin(ss.angle) * ss.speed;
			ss.alpha -= ss.decay;
		}

		function animate() {
			ctx.clearRect(0, 0, w, h);

			for (const s of stars) {
				drawStar(s);
			}

			for (let i = shootingStars.length - 1; i >= 0; i--) {
				drawShootingStar(shootingStars[i]);
				if (shootingStars[i].alpha <= 0) {
					shootingStars.splice(i, 1);
				}
			}

			animId = requestAnimationFrame(animate);
		}

		// Spawn shooting stars periodically
		const shootingTimer = setInterval(() => {
			if (shootingStars.length < MAX_SHOOTING_STARS) {
				shootingStars.push(createShootingStar());
				if (
					Math.random() < EXTRA_SHOOTING_CHANCE &&
					shootingStars.length < MAX_SHOOTING_STARS
				) {
					shootingStars.push(createShootingStar());
				}
			}
		}, SHOOTING_INTERVAL);

		// Visibility API — pause when tab is hidden
		const onVisibility = () => {
			if (document.hidden) {
				cancelAnimationFrame(animId);
				animId = null;
			} else if (!animId) {
				animId = requestAnimationFrame(animate);
			}
		};
		document.addEventListener("visibilitychange", onVisibility);

		// Resize handler
		let resizeTimeout;
		const onResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				resize();
				for (const s of stars) {
					if (s.x > w) s.x = Math.random() * w;
					if (s.y > h) s.y = Math.random() * h;
				}
			}, 200);
		};
		window.addEventListener("resize", onResize);

		// Start
		init();
		animate();

		// Cleanup on unmount
		this._starsCleanup = () => {
			cancelAnimationFrame(animId);
			clearInterval(shootingTimer);
			document.removeEventListener("visibilitychange", onVisibility);
			window.removeEventListener("resize", onResize);
			canvas.remove();
		};
	},
	unmounted() {
		if (this._starsCleanup) this._starsCleanup();
	},
};
