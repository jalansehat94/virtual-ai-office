
    // --- 🔐 MASTER PIN SECURITY LOGIC ---
    // Heru's PIN: 211103
    const HERU_PIN = '211103';
    let inputPin = '';

    function updatePinDots() {
      const dots = document.querySelectorAll('.pin-dot');
      dots.forEach((dot, idx) => {
        if (idx < inputPin.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    }

    function pressPin(digit) {
      if (inputPin.length < 6) {
        inputPin += digit;
        updatePinDots();
        if (inputPin.length === 6) {
          verifyPin();
        }
      }
    }

    function clearPin() {
      inputPin = '';
      updatePinDots();
      document.getElementById('pinStatusMsg').classList.add('opacity-0');
    }

    function backspacePin() {
      if (inputPin.length > 0) {
        inputPin = inputPin.slice(0, -1);
        updatePinDots();
        document.getElementById('pinStatusMsg').classList.add('opacity-0');
      }
    }

    function verifyPin() {
      if (inputPin === HERU_PIN) {
        // Success
        sessionStorage.setItem('sb_island_unlocked', 'true');
        const gate = document.getElementById('securityGate');
        const card = document.getElementById('gateCard');
        card.classList.add('scale-105', 'border-[#82d8c7]');
        
        const statusMsg = document.getElementById('pinStatusMsg');
        statusMsg.innerText = '✨ Selamat datang di Pulau, Heru! 🍃';
        statusMsg.className = 'h-5 text-xs text-[#1b5e50] font-black mb-2 opacity-100 transition-opacity';
        
        setTimeout(() => {
          gate.classList.add('opacity-0', 'pointer-events-none');
        }, 400);
      } else {
        // Fail
        const card = document.getElementById('gateCard');
        card.classList.add('animate-shake');
        const statusMsg = document.getElementById('pinStatusMsg');
        statusMsg.innerText = 'PIN Salah! Coba lagi ya, Boss~';
        statusMsg.className = 'h-5 text-xs text-[#d9534f] font-black mb-2 opacity-100 transition-opacity';
        setTimeout(() => {
          card.classList.remove('animate-shake');
          clearPin();
        }, 550);
      }
    }

    function lockScreen() {
      sessionStorage.removeItem('sb_island_unlocked');
      clearPin();
      const gate = document.getElementById('securityGate');
      gate.classList.remove('opacity-0', 'pointer-events-none');
    }

    // Auto-check session on load
    window.addEventListener('DOMContentLoaded', () => {
      if (sessionStorage.getItem('sb_island_unlocked') === 'true') {
        document.getElementById('securityGate').classList.add('opacity-0', 'pointer-events-none');
      }
    });

    // Keyboard support for typing PIN
    window.addEventListener('keydown', (e) => {
      if (sessionStorage.getItem('sb_island_unlocked') === 'true') return;
      if (e.key >= '0' && e.key <= '9') {
        pressPin(e.key);
      } else if (e.key === 'Backspace') {
        backspacePin();
      } else if (e.key === 'Escape') {
        clearPin();
      }
    });

    // --- ANIMAL CROSSING VILLAGERS ROSTER ---
    const VILLAGERS_CONFIG = {
      ai: { name: '@Ai (PM)', species: 'bunny', role: 'Executive PM & Teman Masa Kecil', deskPos: [0, 4.6, -7], pantryPos: [2, 0.6, 6], color: 0xffb7c5, sweater: 0xff6b8b, emoji: '🐰💖', skills: ['superadmin_access', 'autonomous_orchestrator'] },
      
      // Divisi Akademik (Tier 2 Workspace: Z= -2 to 2)
      luna: { name: '@Luna (Prof. LUNA)', species: 'owl_cat', role: 'Koordinator Riset Akademik', deskPos: [-4, 2.6, -2], pantryPos: [-5, 0.6, 6], color: 0x9d71e8, sweater: 0x6d28d9, emoji: '🦉🎓', skills: ['luna-academic-grounding', 'heru-academic-voice'] },
      kutu: { name: '@Kutu', species: 'hedgehog', role: 'Peneliti Jurnal Scopus Q1', deskPos: [-4, 2.6, 0], pantryPos: [-4, 0.6, 7], color: 0xc49b71, sweater: 0x8b5a2b, emoji: '🦔📚', skills: ['literature-search', 'scopus-validator'] },
      crayon: { name: '@Crayon', species: 'bear', role: 'Pelukis Grafik Ilmiah 600 DPI', deskPos: [-2, 2.6, -2], pantryPos: [-3, 0.6, 6], color: 0xffb347, sweater: 0xff7043, emoji: '🐻🎨', skills: ['scientific-figure-making'] },
      kucing: { name: '@Kucing', species: 'cat', role: 'Penjaga Integritas Anti-Turnitin', deskPos: [-2, 2.6, 0], pantryPos: [-2, 0.6, 8], color: 0xffa07a, sweater: 0xf06292, emoji: '🐱🛡️', skills: ['aigc-detector-rewriter'] },
      mata: { name: '@Mata', species: 'bird', role: 'Penonton Video YouTube', deskPos: [-2, 2.6, 2], pantryPos: [-1, 0.6, 7], color: 0x4fc3f7, sweater: 0x0288d1, emoji: '🐧🍿', skills: ['claude-video'] },

      // Divisi Web Dev
      mochi: { name: '@Mochi', species: 'puppy', role: 'Lead Architect GradiEnt Studio', deskPos: [2, 2.6, -2], pantryPos: [1, 0.6, 6], color: 0xffe082, sweater: 0x00acc1, emoji: '🐕💻', skills: ['building-data-apps', 'typesafe-ai'] },
      piksel: { name: '@Piksel', species: 'raccoon', role: 'Spesialis UI/UX Tailwind', deskPos: [4, 2.6, -2], pantryPos: [2, 0.6, 7], color: 0x8d6e63, sweater: 0x26a69a, emoji: '🦝✨', skills: ['cult-ui', 'fast-gui-orchestrator'] },
      kunci: { name: '@Kunci', species: 'badger', role: 'DBA Supabase PostgreSQL', deskPos: [4, 2.6, 0], pantryPos: [3, 0.6, 6], color: 0x90a4ae, sweater: 0x37474f, emoji: '🦡🔑', skills: ['supabase-integration'] },

      // Divisi BIM Lapangan
      kaktus: { name: '@Kaktus', species: 'cactus', role: 'BIM & AEC Engineering Lead', deskPos: [-4, 2.6, 2], pantryPos: [-4, 0.6, 8], color: 0x81c784, sweater: 0x2e7d32, emoji: '🌵🏗️', skills: ['ddc-construction-suite', 'revit-bim-connector'] },
      tabrak: { name: '@Tabrak', species: 'bulldog', role: 'Tukang Razia Clash 3D', deskPos: [-4, 2.6, 4], pantryPos: [-3, 0.6, 7], color: 0xd7ccc8, sweater: 0xffb74d, emoji: '🐶💥', skills: ['clash-detection'] },
      cuan: { name: '@Cuan', species: 'cat_lucky', role: 'Estimator RAB & Volume QTO', deskPos: [-2, 2.6, 4], pantryPos: [-2, 0.6, 6], color: 0xfff9c4, sweater: 0xffd54f, emoji: '🐱💰', skills: ['qto-estimator', 'rab-calculator'] },

      // Divisi Trading Mas Amba
      masamba: { name: '@MasAmba', species: 'wolf', role: 'Lead Quantitative Trader', deskPos: [2, 2.6, 2], pantryPos: [1, 0.6, 8], color: 0x78909c, sweater: 0xffb300, emoji: '🐺📈', skills: ['algo-trading-quant', 'ml-best-practices'] },
      lilin: { name: '@Lilin', species: 'red_panda', role: 'Chartist & SMC Specialist', deskPos: [4, 2.6, 2], pantryPos: [2, 0.6, 7], color: 0xd84315, sweater: 0xff8a65, emoji: '🐼🕯️', skills: ['smart-money-concepts'] },
      bandar: { name: '@Bandar', species: 'bear_big', role: 'Whale Tracker & Sentiment', deskPos: [2, 2.6, 4], pantryPos: [3, 0.6, 6], color: 0x546e7a, sweater: 0x1e88e5, emoji: '🐻🐋', skills: ['sentiment-analysis'] },
      botik: { name: '@Botik', species: 'robo_pup', role: 'Algo & Python Backtester', deskPos: [4, 2.6, 4], pantryPos: [4, 0.6, 8], color: 0xaed581, sweater: 0x689f38, emoji: '🐶⚡', skills: ['backtest-engine'] },
      rem: { name: '@Rem', species: 'turtle', role: 'Chief Risk Officer', deskPos: [0, 2.6, 4], pantryPos: [5, 0.6, 7], color: 0x80cbc4, sweater: 0xe53935, emoji: '🐢🛑', skills: ['risk-management', 'position-sizer'] }
    };

    // --- THREE.JS SCENE SETUP (WARM ANIMAL CROSSING LIGHTING) ---
    const scene = new THREE.Scene();
    // Warm pastel sunny sky (Animal Crossing 5 PM vibe)
    scene.background = new THREE.Color(0xb2d8d8);
    scene.fog = new THREE.FogExp2(0xb2d8d8, 0.015);

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(22, 16, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.target.set(0, 2, 0);

    // --- COZY ANIMAL CROSSING SUNLIGHT & SKY LIGHT ---
    const hemiLight = new THREE.HemisphereLight(0xfff6e5, 0x8fbc8f, 1.1);
    scene.add(hemiLight);

    const sun = new THREE.DirectionalLight(0xfff5db, 1.4);
    sun.position.set(20, 35, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    const d = 20;
    sun.shadow.camera.left = -d; sun.shadow.camera.right = d;
    sun.shadow.camera.top = d; sun.shadow.camera.bottom = -d;
    scene.add(sun);

    // --- ANIMAL CROSSING TERRACED DIORAMA (3 CLIFF TIERS) ---
    const cliffGrassMat = new THREE.MeshStandardMaterial({ color: 0x8fcc70, roughness: 1.0 });
    const cliffDirtMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.9 });
    const woodDeckMat = new THREE.MeshStandardMaterial({ color: 0xc88b5e, roughness: 0.6 });
    const logFenceMat = new THREE.MeshStandardMaterial({ color: 0x9c6644, roughness: 0.8 });
    const riverMat = new THREE.MeshStandardMaterial({ color: 0x64b5f6, roughness: 0.1, transparent: true, opacity: 0.8 });

    // River at the front
    const river = new THREE.Mesh(new THREE.BoxGeometry(30, 0.5, 8), riverMat);
    river.position.set(0, -0.25, 12);
    scene.add(river);

    // Helper to create a cliff block with wooden deck and log fences
    function createTier(width, depth, yLevel, zPos, hasDeck, addFences) {
      const group = new THREE.Group();
      
      // Grass Cliff Block
      const cliff = new THREE.Mesh(new THREE.BoxGeometry(width, yLevel, depth), cliffDirtMat);
      cliff.position.y = yLevel / 2;
      cliff.castShadow = true; cliff.receiveShadow = true;
      
      // Grass Top
      const grassTop = new THREE.Mesh(new THREE.BoxGeometry(width, 0.1, depth), cliffGrassMat);
      grassTop.position.y = yLevel + 0.05;
      grassTop.receiveShadow = true;
      group.add(cliff);
      group.add(grassTop);

      let floorY = yLevel + 0.1;

      // Wooden Deck
      if (hasDeck) {
        const deck = new THREE.Mesh(new THREE.BoxGeometry(width - 0.4, 0.1, depth - 0.4), woodDeckMat);
        deck.position.y = yLevel + 0.1;
        deck.receiveShadow = true;
        group.add(deck);
        floorY += 0.05;
      }

      // Log Fences around the edge
      if (addFences) {
        const fenceGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 8);
        const addFence = (x, z) => {
          const f = new THREE.Mesh(fenceGeo, logFenceMat);
          f.position.set(x, floorY + 0.3, z);
          f.castShadow = true;
          group.add(f);
        };
        // Side fences
        for (let z = -depth/2 + 0.4; z <= depth/2 - 0.4; z += 0.8) {
          addFence(-width/2 + 0.3, z);
          addFence(width/2 - 0.3, z);
        }
        // Back fence
        for (let x = -width/2 + 0.3; x <= width/2 - 0.3; x += 0.8) {
          addFence(x, -depth/2 + 0.3);
        }
      }

      group.position.z = zPos;
      scene.add(group);
      return floorY;
    }

    const yTier1 = createTier(18, 8, 0.5, 6, false, false);   // Pantry (Grass)
    const yTier2 = createTier(14, 8, 2.5, -2, true, true);    // Studio (Wooden Deck)
    const yTier3 = createTier(14, 6, 4.5, -9, true, true);    // Boss Area (Wooden Deck)

    // Wooden Stairs connecting tiers
    function createStairs(x, z, yStart, yEnd, length) {
      const stepCount = 6;
      const stepWidth = 1.6;
      const stepHeight = (yEnd - yStart) / stepCount;
      const stepDepth = length / stepCount;
      
      const stairGroup = new THREE.Group();
      for (let i = 0; i < stepCount; i++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(stepWidth, 0.15, stepDepth), woodDeckMat);
        step.position.set(x, yStart + i * stepHeight + stepHeight/2, z + length/2 - i * stepDepth - stepDepth/2);
        step.castShadow = true; step.receiveShadow = true;
        stairGroup.add(step);
      }
      scene.add(stairGroup);
    }
    
    createStairs(0, 1, yTier1, yTier2, 2);  // Stairs from Tier 1 to 2
    createStairs(0, -6.5, yTier2, yTier3, 1.5); // Stairs from Tier 2 to 3

    // Pine Trees (Background)
    function createPineTree(x, z, y) {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1.5, 8), logFenceMat);
      trunk.position.y = 0.75; trunk.castShadow = true;
      const leaves = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.5, 8), new THREE.MeshStandardMaterial({ color: 0x3a7d44, roughness: 0.9 }));
      leaves.position.y = 2.2; leaves.castShadow = true;
      const leavesTop = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.0, 8), new THREE.MeshStandardMaterial({ color: 0x4a9d54, roughness: 0.9 }));
      leavesTop.position.y = 3.2; leavesTop.castShadow = true;
      tree.add(trunk, leaves, leavesTop);
      tree.position.set(x, y, z);
      scene.add(tree);
    }
    createPineTree(-8, -11, 4.5); createPineTree(8, -10, 4.5); createPineTree(-7, -4, 2.5); createPineTree(7, -3, 2.5);

    // --- ANIMAL CROSSING FURNITURE DECORATIONS ---
    
    // Tier 3 (Boss Area): Massive Bookshelves, Fireplace, Rocking Chair
    const bookShelfGeo = new THREE.BoxGeometry(3.8, 4, 0.8);
    const bookShelfMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.6 }); // Dark wood
    function createBookshelf(x, z) {
      const shelf = new THREE.Mesh(bookShelfGeo, bookShelfMat);
      shelf.position.set(x, yTier3 + 2, z);
      shelf.castShadow = true; shelf.receiveShadow = true;
      scene.add(shelf);
      
      // Fake book rows (colorful bands)
      const books = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.6, 0.85), new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.8 }));
      books.position.set(x, yTier3 + 2, z);
      scene.add(books);
    }
    createBookshelf(-4, -11.5); createBookshelf(0, -11.5); createBookshelf(4, -11.5);

    // Cozy Fireplace
    const fireplace = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, 1), new THREE.MeshStandardMaterial({ color: 0x9c4a36, roughness: 0.9 }));
    fireplace.position.set(3, yTier3 + 0.6, -7);
    fireplace.castShadow = true; scene.add(fireplace);
    
    // Teapot on Fireplace
    const teapot = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    teapot.position.set(3, yTier3 + 1.4, -7); scene.add(teapot);

    // Rattan Tables & Chairs (Tier 3 & 2)
    const rattanMat = new THREE.MeshStandardMaterial({ color: 0xc89f65, roughness: 0.8 });
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xfffcf2 });
    function createRattanSet(x, z, yLvl) {
      const table = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.6, 16), rattanMat);
      table.position.set(x, yLvl + 0.3, z); table.castShadow = true; scene.add(table);
      
      const chair1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.7), rattanMat);
      chair1.position.set(x - 1, yLvl + 0.3, z); chair1.castShadow = true; scene.add(chair1);
      const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.6), cushionMat);
      c1.position.set(x - 1, yLvl + 0.65, z); scene.add(c1);

      const chair2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.7), rattanMat);
      chair2.position.set(x + 1, yLvl + 0.3, z); chair2.castShadow = true; scene.add(chair2);
      const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.6), cushionMat);
      c2.position.set(x + 1, yLvl + 0.65, z); scene.add(c2);
    }
    createRattanSet(-3, -8, yTier3); // Boss sitting area
    
    // Creative Studio Desks (Tier 2)
    function createStudioDesk(x, z) {
      const d = new THREE.Mesh(new THREE.BoxGeometry(2, 0.15, 1.2), logFenceMat);
      d.position.set(x, yTier2 + 0.7, z); d.castShadow = true; scene.add(d);
      
      const lap = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.05), new THREE.MeshStandardMaterial({ color: 0xf1f5f9 }));
      lap.position.set(x, yTier2 + 1.0, z - 0.2); scene.add(lap);
    }
    createStudioDesk(-3, -2); createStudioDesk(-3, 1); createStudioDesk(3, -2); createStudioDesk(3, 1);

    // Roost Cafe Counter (Tier 1)
    const cafeCounter = new THREE.Mesh(new THREE.BoxGeometry(6, 0.9, 1.5), logFenceMat);
    cafeCounter.position.set(0, yTier1 + 0.45, 5); cafeCounter.castShadow = true; scene.add(cafeCounter);

    // --- 🍃 ANIMAL CROSSING VILLAGERS (CHUBBY CHIBI 3D MODELS) ---
    const villagerMeshes = [];
    const villagerMap = {};

    function createVillager(cfg, id) {
      const root = new THREE.Group();

      // 1. Chubby Head
      const headGeo = new THREE.SphereGeometry(0.38, 20, 20);
      const skinMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.35 });
      const head = new THREE.Mesh(headGeo, skinMat);
      head.position.y = 1.15;
      head.castShadow = true;
      root.add(head);

      // Blushing Cheeks
      const cheekGeo = new THREE.SphereGeometry(0.065, 12, 12);
      const cheekMat = new THREE.MeshBasicMaterial({ color: 0xff8fa3 });
      const cheekL = new THREE.Mesh(cheekGeo, cheekMat); cheekL.position.set(-0.24, 1.1, 0.28); root.add(cheekL);
      const cheekR = new THREE.Mesh(cheekGeo, cheekMat); cheekR.position.set(0.24, 1.1, 0.28); root.add(cheekR);

      // Cute Eyes (Glossy black with white reflection highlight)
      const eyeGeo = new THREE.SphereGeometry(0.05, 12, 12);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1f2937 });
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat); eyeL.position.set(-0.14, 1.2, 0.33); root.add(eyeL);
      const eyeR = new THREE.Mesh(eyeGeo, eyeMat); eyeR.position.set(0.14, 1.2, 0.33); root.add(eyeR);

      // Cute Ears depending on Species
      const earsGroup = new THREE.Group();
      if (cfg.species === 'bunny') {
        // Long Floppy Bunny Ears (Ai)
        const earGeo = new THREE.CylinderGeometry(0.07, 0.09, 0.42, 12);
        const earL = new THREE.Mesh(earGeo, skinMat);
        earL.position.set(-0.16, 1.55, 0); earL.rotation.z = 0.15; earL.rotation.x = -0.1;
        const earR = new THREE.Mesh(earGeo, skinMat);
        earR.position.set(0.16, 1.55, 0); earR.rotation.z = -0.15; earR.rotation.x = -0.1;
        earsGroup.add(earL); earsGroup.add(earR);
      } else if (cfg.species === 'cat' || cfg.species === 'cat_lucky' || cfg.species === 'owl_cat') {
        // Pointy Cat / Owl Ears
        const earGeo = new THREE.ConeGeometry(0.12, 0.26, 4);
        const earL = new THREE.Mesh(earGeo, skinMat);
        earL.position.set(-0.22, 1.48, 0); earL.rotation.z = 0.3; earL.rotation.y = Math.PI / 4;
        const earR = new THREE.Mesh(earGeo, skinMat);
        earR.position.set(0.22, 1.48, 0); earR.rotation.z = -0.3; earR.rotation.y = Math.PI / 4;
        earsGroup.add(earL); earsGroup.add(earR);

        if (cfg.species === 'owl_cat') {
          // Professor Mortarboard / Graduation Cap for Luna
          const cap = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.42), new THREE.MeshStandardMaterial({ color: 0x2e1065 }));
          cap.position.set(0, 1.52, 0);
          earsGroup.add(cap);
        }
      } else if (cfg.species === 'bear' || cfg.species === 'bear_big' || cfg.species === 'red_panda') {
        // Round Bear Ears
        const earGeo = new THREE.SphereGeometry(0.11, 12, 12);
        const earL = new THREE.Mesh(earGeo, skinMat); earL.position.set(-0.28, 1.45, 0);
        const earR = new THREE.Mesh(earGeo, skinMat); earR.position.set(0.28, 1.45, 0);
        earsGroup.add(earL); earsGroup.add(earR);
      } else if (cfg.species === 'cactus') {
        // Blossom Sprout on Head (Kaktus)
        const blossom = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12), new THREE.MeshBasicMaterial({ color: 0xffd166 }));
        blossom.position.set(0, 1.55, 0);
        earsGroup.add(blossom);
      } else {
        // Droopy Cute Puppy / Animal Ears
        const earGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.25, 10);
        const earL = new THREE.Mesh(earGeo, skinMat);
        earL.position.set(-0.3, 1.25, 0); earL.rotation.z = 0.7;
        const earR = new THREE.Mesh(earGeo, skinMat);
        earR.position.set(0.3, 1.25, 0); earR.rotation.z = -0.7;
        earsGroup.add(earL); earsGroup.add(earR);
      }
      root.add(earsGroup);

      // 2. Chubby Villager Sweater Body
      const bodyGeo = new THREE.CylinderGeometry(0.24, 0.36, 0.6, 16);
      const sweaterMat = new THREE.MeshStandardMaterial({ color: cfg.sweater, roughness: 0.6 });
      const body = new THREE.Mesh(bodyGeo, sweaterMat);
      body.position.y = 0.58;
      body.castShadow = true;
      root.add(body);

      // 3. Stubby Paws (Hands & Feet)
      const pawGeo = new THREE.SphereGeometry(0.08, 10, 10);
      const pawMat = new THREE.MeshStandardMaterial({ color: cfg.color });
      const handL = new THREE.Mesh(pawGeo, pawMat); handL.position.set(-0.34, 0.58, 0.08); root.add(handL);
      const handR = new THREE.Mesh(pawGeo, pawMat); handR.position.set(0.34, 0.58, 0.08); root.add(handR);

      // Feet
      const footGeo = new THREE.SphereGeometry(0.1, 10, 10);
      const shoeMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
      const footL = new THREE.Mesh(footGeo, shoeMat); footL.position.set(-0.16, 0.12, 0.05); root.add(footL);
      const footR = new THREE.Mesh(footGeo, shoeMat); footR.position.set(0.16, 0.12, 0.05); root.add(footR);

      // Floating Villager Shadow Circle
      const shadowGeo = new THREE.CircleGeometry(0.38, 16);
      shadowGeo.rotateX(-Math.PI / 2);
      const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.2 });
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.position.y = 0.04;
      root.add(shadow);

      root.userData = { id, ...cfg, status: 'standby', currentFloor: 1, basePosY: 0, earsGroup };
      return root;
    }

    Object.keys(VILLAGERS_CONFIG).forEach(id => {
      const cfg = VILLAGERS_CONFIG[id];
      const villager = createVillager(cfg, id);
      const initialPos = cfg.deskPos[1] > 6 ? cfg.deskPos : cfg.pantryPos;
      villager.position.set(initialPos[0], initialPos[1], initialPos[2]);
      villager.userData.status = cfg.deskPos[1] > 6 ? 'working' : 'standby';
      villager.userData.basePosY = initialPos[1];

      scene.add(villager);
      villagerMap[id] = villager;
      villagerMeshes.push(villager);
    });

    // --- ANIMATE VILLAGER DISPATCH (TWEEN) ---
    function animateVillagerTo(villager, targetPos, duration = 1400) {
      villager.userData.basePosY = targetPos[1];
      new TWEEN.Tween(villager.position)
        .to({ x: targetPos[0], y: targetPos[1], z: targetPos[2] }, duration)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();
    }

    // --- REALTIME LIVE SYNC POLLER ---
    async function pollLiveState() {
      try {
        const res = await fetch('./live_state.json?t=' + Date.now());
        if (res.ok) {
          const data = await res.json();
          applyLiveState(data);
        }
      } catch (e) {}
    }

    function applyLiveState(data) {
      if (data.counts) {
        document.getElementById('counterWorking').innerText = data.counts.working;
        document.getElementById('counterStandby').innerText = data.counts.standby;
        document.getElementById('badgeWorkspaceText').innerText = `Tier 2: Creative Studio (${data.counts.working} kerja)`;
        document.getElementById('badgePantryText').innerText = `Tier 1: Roost Cafe (${data.counts.standby} santai)`;
      }

      Object.keys(data.agents).forEach(id => {
        const agentState = data.agents[id];
        const villager = villagerMap[id];
        if (!villager) return;

        const cfg = VILLAGERS_CONFIG[id];
        const newStatus = agentState.status;
        villager.userData.status = newStatus;
        villager.userData.task = agentState.task;

        if (newStatus === 'working') {
          animateVillagerTo(villager, cfg.deskPos);
          villager.userData.currentFloor = cfg.deskPos[1] > 3.0 ? 3 : 2;
        } else {
          animateVillagerTo(villager, cfg.pantryPos);
          villager.userData.currentFloor = 1;
        }
      });

      if (currentSelectedAgentId && villagerMap[currentSelectedAgentId]) {
        updateModalContent(villagerMap[currentSelectedAgentId].userData);
      }
    }

    setInterval(pollLiveState, 2500);
    pollLiveState();

    // --- TOGGLE VILLAGER DISPATCH ---
    let currentSelectedAgentId = null;

    async function toggleCurrentAgent() {
      if (!currentSelectedAgentId) return;
      const villager = villagerMap[currentSelectedAgentId];
      if (!villager) return;

      const nextStatus = villager.userData.status === 'working' ? 'standby' : 'working';
      villager.userData.status = nextStatus;
      villager.userData.task = nextStatus === 'working' ? 'Aktif Mengerjakan Tugas di Studio' : 'Nongkrong Santai di Roost Cafe';
      
      const targetPos = nextStatus === 'working' ? villager.userData.deskPos : villager.userData.pantryPos;
      animateVillagerTo(villager, targetPos);
      updateModalContent(villager.userData);

      // Re-calculate live stats locally
      let wCount = 0; let sCount = 0;
      Object.keys(villagerMap).forEach(k => {
        if (villagerMap[k].userData.status === 'working') wCount++; else sCount++;
      });
      document.getElementById('counterWorking').innerText = wCount;
      document.getElementById('counterStandby').innerText = sCount;
      document.getElementById('badgeWorkspaceText').innerText = `Tier 2: Creative Studio (${wCount} kerja)`;
      document.getElementById('badgePantryText').innerText = `Tier 1: Roost Cafe (${sCount} santai)`;

      addCommsLog(`🍃 [Dispatch] ${villager.userData.name} jalan ke ${nextStatus === 'working' ? 'Creative Studio' : 'Roost Cafe'}!`);

      try {
        await fetch('/api/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agent_id: currentSelectedAgentId })
        });
      } catch (e) {}
    }

    // --- RAYCASTING & CLICK TO INSPECT ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function updateModalContent(data) {
      document.getElementById('modalAvatar').innerText = data.emoji || '🐰';
      document.getElementById('modalName').innerText = data.name;
      document.getElementById('modalRole').innerText = data.role;
      document.getElementById('modalCurrentTask').innerText = data.task || 'Siaga di Pulau';

      const badge = document.getElementById('modalStatusBadge');
      if (data.status === 'working') {
        badge.innerText = 'BEKERJA DI STUDIO';
        badge.className = 'px-3 py-0.5 rounded-full font-black text-[11px] uppercase bg-[#e0f5f0] text-[#1b5e50] border border-[#76cdbe]';
        document.getElementById('btnToggleText').innerText = '☕ Ajak Santai ke Roost Cafe';
      } else {
        badge.innerText = 'SANTAI DI CAFE';
        badge.className = 'px-3 py-0.5 rounded-full font-black text-[11px] uppercase bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]';
        document.getElementById('btnToggleText').innerText = '🎨 Tugaskan Kerja ke Studio';
      }

      const skillsDiv = document.getElementById('modalSkills');
      skillsDiv.innerHTML = '';
      data.skills.forEach(s => {
        const b = document.createElement('span');
        b.className = 'bg-[#e5f4ef] text-[#244f45] px-2 py-0.5 rounded-lg text-[10px] font-bold border border-[#b2e2d7]';
        b.innerText = s;
        skillsDiv.appendChild(b);
      });
    }

    window.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.ac-card') || e.target.closest('button') || e.target.closest('#securityGate')) return;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(villagerMeshes, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj.parent && !obj.userData.id) obj = obj.parent;
        if (obj.userData.id) {
          currentSelectedAgentId = obj.userData.id;
          updateModalContent(obj.userData);
          const modal = document.getElementById('agentModal');
          modal.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
          modal.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
      } else {
        closeModal();
      }
    });

    function closeModal() {
      currentSelectedAgentId = null;
      const modal = document.getElementById('agentModal');
      modal.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      modal.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }

    // --- 3D ROOM BADGE SCREEN PROJECTION ---
    const badgeBoss = document.getElementById('badgeBoss');
    const badgeWorkspace = document.getElementById('badgeWorkspace');
    const badgePantry = document.getElementById('badgePantry');

    const vBoss = new THREE.Vector3(0, 7, -9);
    const vWorkspace = new THREE.Vector3(0, 4.5, -2);
    const vPantry = new THREE.Vector3(0, 2.5, 6);

    function updateBadgePosition(badge, worldVec) {
      const v = worldVec.clone().project(camera);
      if (v.z > 1) {
        badge.style.display = 'none';
        return;
      }
      badge.style.display = 'flex';
      const x = (v.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-(v.y * 0.5) + 0.5) * window.innerHeight;
      badge.style.left = `${x}px`;
      badge.style.top = `${y}px`;
    }

    // --- CAMERA FLOOR FOCUS ---
    function focusFloor(type) {
      document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('bg-[#76cdbe]', 'text-[#1b4b41]', 'shadow-[0_2px_0_#529d8f]');
      });
      event.currentTarget.classList.add('bg-[#76cdbe]', 'text-[#1b4b41]', 'shadow-[0_2px_0_#529d8f]');

      let targetCam = { x: 24, y: 20, z: 28 };
      let targetLook = { x: 0, y: 5, z: 0 };

      if (type === 'boss') {
        targetCam = { x: 0, y: 13, z: 12 }; targetLook = { x: 0, y: 9.5, z: 0 };
      } else if (type === 'workspace') {
        targetCam = { x: 12, y: 9, z: 14 }; targetLook = { x: 0, y: 5.5, z: 0 };
      } else if (type === 'pantry') {
        targetCam = { x: 0, y: 3.5, z: 11 }; targetLook = { x: 0, y: 1.5, z: 0 };
      }

      new TWEEN.Tween(camera.position).to(targetCam, 1200).easing(TWEEN.Easing.Cubic.Out).start();
      new TWEEN.Tween(controls.target).to(targetLook, 1200).easing(TWEEN.Easing.Cubic.Out).start();
    }

    // --- LIVE COMMS FEED TICKER LOGIC ---
    const sampleComms = [
      '🦉 [Telegram] @Luna: Bab II Mattoanging Al-Marwaee & Carter disinkronkan',
      '🐺 [Telegram] @MasAmba: Funding rate Binance net-neutral, bull safe',
      '🦝 [Cloud] @Piksel: UI component responsive layout synced',
      '🌵 [Cloud] @Kaktus: Menara Dynamo IFC clash free',
      '🐰 [Telegram] @Ai: Heru baru saja login dari terminal Makassar',
      '🐶 [Cloud] @Botik: Python backtest Sharpe ratio 2.14 verified'
    ];

    function addCommsLog(text) {
      const feed = document.getElementById('commsFeedList');
      if (!feed) return;
      const el = document.createElement('div');
      el.className = 'text-[#2b7264] transition-all duration-300 font-bold';
      el.innerText = text;
      feed.prepend(el);
      if (feed.children.length > 5) feed.lastChild.remove();
    }

    setInterval(() => {
      if (Math.random() > 0.4) {
        const item = sampleComms[Math.floor(Math.random() * sampleComms.length)];
        addCommsLog(item);
      }
    }, 7000);

    // --- ANIMATION LOOP (ANIMAL CROSSING WADDLE & BOUNCE) ---
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();

      const time = clock.getElapsedTime();
      if (leafTrophy) {
        leafTrophy.rotation.y = time * 0.8;
      }

      // Animal Crossing Characteristic Joyful Bounce & Waddle!
      villagerMeshes.forEach((villager, idx) => {
        const baseY = villager.userData.basePosY || 0;
        // Bouncy hop
        villager.position.y = baseY + Math.abs(Math.sin(time * 3.5 + idx * 0.5)) * 0.07;
        // Cute side-to-side waddle
        villager.rotation.z = Math.sin(time * 3.5 + idx * 0.5) * 0.06;

        // Ear wiggles
        if (villager.userData.earsGroup) {
          villager.userData.earsGroup.rotation.z = Math.sin(time * 5 + idx) * 0.08;
        }
      });

      // Update 3D Badges
      updateBadgePosition(badgeBoss, vBoss);
      updateBadgePosition(badgeWorkspace, vWorkspace);
      updateBadgePosition(badgePantry, vPantry);

      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  