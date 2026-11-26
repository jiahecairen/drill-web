System.register("chunks:///_virtual/AdService.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e0fe4QGSCFOoKbTgMDAqWH9", "AdService", undefined);
      // Placeholder: replace with wx.createRewardedVideoAd when the WeChat ad unit exists.
      var rewardedAd = exports('rewardedAd', {
        show: function show() {
          return Promise.resolve(true);
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Art.ts", ['cc', './AtlasRects.ts'], function (exports) {
  var cclegacy, resources, ImageAsset, Texture2D, SpriteFrame, Rect, Size, Vec2, Node, Layers, UITransform, Sprite, Color, Label, ATLAS_RECTS;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      resources = module.resources;
      ImageAsset = module.ImageAsset;
      Texture2D = module.Texture2D;
      SpriteFrame = module.SpriteFrame;
      Rect = module.Rect;
      Size = module.Size;
      Vec2 = module.Vec2;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Color = module.Color;
      Label = module.Label;
    }, function (module) {
      ATLAS_RECTS = module.ATLAS_RECTS;
    }],
    execute: function () {
      exports({
        glowSprite: glowSprite,
        label: label,
        loadArt: loadArt,
        node: node,
        panel: panel,
        sprite: sprite
      });
      cclegacy._RF.push({}, "78d60jyXexBVI9yIC8hz3nz", "Art", undefined);
      var frames = new Map();
      var glowFrame = null;
      var ORE_KEYS = ['coal', 'copper', 'iron', 'silver', 'gold', 'platinum', 'cobalt', 'mithril', 'titanium', 'adamantite', 'uranium', 'luminite', 'iridium', 'ruby', 'sapphire', 'emerald', 'diamond'];
      var EXTRA_ART = ['warehouse', 'hardRock', 'bedrock', 'explosion', 'explosionRing', 'cannon_foundation', 'cannon_support', 'cannon_barrel', 'dirt_orange', 'dirt_mid', 'dirt_deep', 'dirt_abyss', 'bigGold1', 'bigGold2', 'bigGold3', 'bigGold4'].concat(ORE_KEYS.map(function (k) {
        return "ore_" + k;
      }), ['backing_1', 'backing_2', 'backing_3', 'backing_4', 'backing_5', 'backing_6'], Array.from({
        length: 10
      }, function (_, i) {
        return ["cannon_barrel_" + (i + 1), "cannon_support_" + (i + 1), "proj_" + (i + 1)];
      }).flat());
      var FALLBACK = {
        warehouse: 'coin',
        hardRock: 'rock',
        bedrock: 'rock',
        explosion: 'coin',
        explosionRing: 'coin',
        cannon_foundation: 'cannon',
        cannon_support: 'cannon',
        cannon_barrel: 'cannon',
        dirt_orange: 'dirt',
        dirt_mid: 'dirt',
        dirt_deep: 'darkDirt',
        dirt_abyss: 'darkDirt',
        bigGold1: 'gold',
        bigGold2: 'gold',
        bigGold3: 'gold',
        bigGold4: 'gold'
      };
      for (var _i = 0, _ORE_KEYS = ORE_KEYS; _i < _ORE_KEYS.length; _i++) {
        var k = _ORE_KEYS[_i];
        FALLBACK["ore_" + k] = 'gold';
      }
      for (var i = 1; i <= 10; i++) {
        FALLBACK["cannon_barrel_" + i] = 'cannon';
        FALLBACK["cannon_support_" + i] = 'cannon';
        FALLBACK["proj_" + i] = 'drill';
      }

      /** Art that came from the asset library as separate trimmed images; a missing file falls back to an atlas sprite. */
      function loadExtras() {
        return Promise.all(EXTRA_ART.map(function (name) {
          return new Promise(function (done) {
            resources.load("art/extra/" + name, ImageAsset, function (err, image) {
              if (!err && image) {
                var tex = new Texture2D();
                tex.image = image;
                tex.setFilters(Texture2D.Filter.LINEAR, Texture2D.Filter.LINEAR);
                var f = new SpriteFrame();
                f.packable = false;
                f.texture = tex;
                f.rect = new Rect(0, 0, image.width, image.height);
                f.originalSize = new Size(image.width, image.height);
                frames.set(name, f);
              }
              done();
            });
          });
        })).then(function () {
          return undefined;
        });
      }

      /** Soft white radial falloff used for flames and lights; tinted per use. */
      function makeGlow() {
        var size = 64,
          data = new Uint8Array(size * size * 4);
        for (var y = 0; y < size; y++) for (var x = 0; x < size; x++) {
          var d = Math.hypot(x - 31.5, y - 31.5) / 32,
            a = Math.max(0, 1 - d),
            o = (y * size + x) * 4;
          data[o] = data[o + 1] = data[o + 2] = 255;
          data[o + 3] = Math.round(255 * a * a);
        }
        var tex = new Texture2D();
        tex.reset({
          width: size,
          height: size,
          format: Texture2D.PixelFormat.RGBA8888,
          mipmapLevel: 0
        });
        tex.setFilters(Texture2D.Filter.LINEAR, Texture2D.Filter.LINEAR);
        tex.uploadData(data);
        var f = new SpriteFrame();
        f.packable = false;
        f.texture = tex;
        f.rect = new Rect(0, 0, size, size);
        f.originalSize = new Size(size, size);
        return f;
      }
      function loadArt() {
        return new Promise(function (resolve, reject) {
          resources.load('art/atlas', ImageAsset, function (err, image) {
            if (err) {
              reject(err);
              return;
            }
            var texture = new Texture2D();
            texture.image = image;
            texture.setFilters(Texture2D.Filter.LINEAR, Texture2D.Filter.LINEAR);
            for (var _i2 = 0, _arr = Object.keys(ATLAS_RECTS); _i2 < _arr.length; _i2++) {
              var name = _arr[_i2];
              var _ATLAS_RECTS$name = ATLAS_RECTS[name],
                x = _ATLAS_RECTS$name[0],
                y = _ATLAS_RECTS$name[1],
                w = _ATLAS_RECTS$name[2],
                h = _ATLAS_RECTS$name[3];
              var _frame = new SpriteFrame();
              _frame.packable = false;
              _frame.texture = texture;
              _frame.rect = new Rect(x, y, w, h);
              _frame.originalSize = new Size(w, h);
              _frame.offset = new Vec2(0, 0);
              if (name === 'panel') {
                _frame.insetLeft = _frame.insetRight = 62;
                _frame.insetTop = _frame.insetBottom = 62;
              }
              frames.set(name, _frame);
            }
            glowFrame = makeGlow();
            loadExtras().then(resolve, reject);
          });
        });
      }
      var frame = exports('frame', function frame(name) {
        var _ref, _frames$get;
        return (_ref = (_frames$get = frames.get(name)) != null ? _frames$get : backingChunk(name)) != null ? _ref : frames.get(FALLBACK[name]);
      });

      /** The wall behind the tunnels is a seamless tile; each cell shows the matching 1/8 x 1/8 piece ("backing_<tier>_<cx>_<cy>") so neighbours line up. */
      function backingChunk(name) {
        var m = /^backing_(\d)_(\d)_(\d)$/.exec(name);
        var base = m ? frames.get("backing_" + m[1]) : undefined;
        if (!m || !base) return undefined;
        var w = base.rect.width / 8,
          h = base.rect.height / 8,
          f = new SpriteFrame();
        f.packable = false;
        f.texture = base.texture;
        f.rect = new Rect(Number(m[2]) * w, Number(m[3]) * h, w, h);
        f.originalSize = new Size(w, h);
        frames.set(name, f);
        return f;
      }
      function node(name, parent, x, y) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        var n = new Node(name);
        n.layer = Layers.Enum.UI_2D;
        n.parent = parent;
        n.setPosition(x, y);
        n.addComponent(UITransform);
        return n;
      }
      function sprite(name, parent, w, h, x, y) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        var n = node(name, parent, x, y);
        var s = n.addComponent(Sprite);
        s.sizeMode = Sprite.SizeMode.CUSTOM;
        s.trim = false;
        s.spriteFrame = frame(name);
        n.getComponent(UITransform).setContentSize(w, h);
        return s;
      }
      function glowSprite(parent, w, h, x, y) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        var n = node('Glow', parent, x, y);
        var s = n.addComponent(Sprite);
        s.sizeMode = Sprite.SizeMode.CUSTOM;
        s.trim = false;
        s.spriteFrame = glowFrame;
        n.getComponent(UITransform).setContentSize(w, h);
        return s;
      }
      function panel(parent, w, h, x, y) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        // Drawn at double size and scaled down so the rounded corners stay proportionate on small panels.
        var s = sprite('panel', parent, w * 2, h * 2, x, y);
        s.type = Sprite.Type.SLICED;
        s.node.setScale(0.5, 0.5);
        return s;
      }
      function label(parent, text, size, x, y, color, align) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        if (color === void 0) {
          color = Color.WHITE;
        }
        if (align === void 0) {
          align = 'center';
        }
        var n = node('Label', parent, x, y);
        var l = n.addComponent(Label);
        l.string = text;
        l.fontSize = size;
        l.lineHeight = Math.round(size * 1.2);
        l.isBold = true;
        l.color = color.clone();
        l.horizontalAlign = align === 'left' ? Label.HorizontalAlign.LEFT : align === 'right' ? Label.HorizontalAlign.RIGHT : Label.HorizontalAlign.CENTER;
        n.getComponent(UITransform).setAnchorPoint(align === 'left' ? 0 : align === 'right' ? 1 : 0.5, 0.5);
        l.enableOutline = true;
        l.outlineColor = new Color(16, 20, 44, 255);
        l.outlineWidth = Math.max(2, Math.round(size / 11));
        return l;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AtlasRects.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "db8a15i4VFBtbjMibC03yXb", "AtlasRects", undefined);
      // Generated by tools/slice_art.mjs. Rect = [x, y, width, height] in atlas pixels.
      var ATLAS_RECTS = exports('ATLAS_RECTS', {
        cannon: [17, 24, 328, 359],
        drill: [373, 98, 166, 281],
        dirt: [568, 135, 214, 224],
        darkDirt: [806, 135, 216, 224],
        rock: [1046, 135, 217, 224],
        grass: [1284, 115, 235, 243],
        crack0: [336, 432, 247, 250],
        crack1: [642, 432, 252, 251],
        crack2: [952, 432, 252, 250],
        gold: [25, 749, 271, 236],
        gem: [329, 749, 212, 233],
        mushroom: [571, 736, 200, 245],
        coin: [813, 787, 169, 174],
        panel: [1015, 775, 503, 189]
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Ballistics.ts", ['cc', './Config.ts'], function (exports) {
  var cclegacy, CONFIG;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CONFIG = module.CONFIG;
    }],
    execute: function () {
      exports({
        flightDirection: flightDirection,
        flightPoint: flightPoint,
        kineticEnergy: kineticEnergy,
        solveAim: solveAim,
        speedForRange: speedForRange
      });
      cclegacy._RF.push({}, "84146VlOYFAqaGXFSzn4Lq8", "Ballistics", undefined);
      var clamp = function clamp(v, a, b) {
        return Math.max(a, Math.min(b, v));
      };

      /** Energy carried by a given speed, in fuel-equivalent units, so speed that is braked away becomes free digging. */
      function kineticEnergy(speed) {
        return 0.5 * CONFIG.sim.kineticFactor * speed * speed;
      }

      /** Launch speed that carries a shot `range` tiles over flat ground at 45 degrees. */
      function speedForRange(range) {
        return Math.sqrt(CONFIG.sim.gravity * range);
      }

      /**
       * Drag vector is start minus current, in screen pixels with +y up (slingshot convention).
       * The barrel only turns between `aim.minAngleDeg` and 90° (straight up): a pull outside that fan is
       * clamped onto the nearest edge, so every shot flies up-and-right. Length sets the power.
       */
      function solveAim(pullX, pullY, maxSpeed) {
        if (maxSpeed === void 0) {
          maxSpeed = speedForRange(CONFIG.aim.baseMaxRange);
        }
        var aim = CONFIG.aim,
          cannon = CONFIG.cannon,
          sim = CONFIG.sim;
        var pull = Math.hypot(pullX, pullY);
        if (pull < aim.deadzonePx) return null;

        // The barrel turns in the up-right fan [minAngleDeg, 90°]. A pull wraps to the nearer fan edge:
        // anything past straight-down to the left (under -90°) wraps up to 90° rather than jumping across the world.
        var raw = Math.atan2(pullY, pullX);
        var angle = clamp(raw < -Math.PI / 2 ? Math.PI / 2 : raw, aim.minAngleDeg * Math.PI / 180, Math.PI / 2);
        var power = clamp((pull - aim.deadzonePx) / (aim.fullPullPx - aim.deadzonePx), 0, 1);
        var minSpeed = speedForRange(aim.minRange);
        var speed = minSpeed + (Math.max(minSpeed, maxSpeed) - minSpeed) * power;
        var vx = speed * Math.cos(angle),
          vy = speed * Math.sin(angle); // vy is upward
        var muzzleX = cannon.x + cannon.barrelLength * Math.cos(angle);
        var muzzleY = Math.min(-0.05, cannon.pivotY - cannon.barrelLength * Math.sin(angle)); // never below the surface
        // y(t) = muzzleY - vy t + g t^2 / 2 reaches the surface (y = 0) on the way down.
        var flightTime = (vy + Math.sqrt(vy * vy - 2 * sim.gravity * muzzleY)) / sim.gravity;
        return {
          angle: angle,
          speed: speed,
          landingX: muzzleX + vx * flightTime,
          flightTime: flightTime,
          power: power,
          muzzleX: muzzleX,
          muzzleY: muzzleY
        };
      }

      /** Closed-form position, y grows downward and the surface is y = 0. Shared by preview and flight. */
      function flightPoint(shot, t) {
        var sim = CONFIG.sim;
        return {
          x: shot.muzzleX + shot.speed * Math.cos(shot.angle) * t,
          y: shot.muzzleY - shot.speed * Math.sin(shot.angle) * t + 0.5 * sim.gravity * t * t
        };
      }
      function flightDirection(shot, t) {
        var vx = shot.speed * Math.cos(shot.angle);
        var vy = -shot.speed * Math.sin(shot.angle) + CONFIG.sim.gravity * t;
        var len = Math.hypot(vx, vy);
        return {
          x: vx / len,
          y: vy / len
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Config.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      var _cells;
      cclegacy._RF.push({}, "15cbbVK7NlP/KJRifT5WDtb", "Config", undefined); // All tunable values live here. Units are tiles unless a name says otherwise.
      /** The seventeen ores, from the common ones near the cannon to the rare ones far away and deep down. */
      var ORES = exports('ORES', [{
        key: 'coal',
        name: '煤',
        cost: 2,
        coins: 5
      }, {
        key: 'copper',
        name: '铜',
        cost: 2,
        coins: 7
      }, {
        key: 'iron',
        name: '铁',
        cost: 3,
        coins: 10
      }, {
        key: 'silver',
        name: '银',
        cost: 3,
        coins: 14
      }, {
        key: 'gold',
        name: '金',
        cost: 4,
        coins: 19
      }, {
        key: 'platinum',
        name: '铂',
        cost: 4,
        coins: 27
      }, {
        key: 'cobalt',
        name: '钴',
        cost: 5,
        coins: 38
      }, {
        key: 'mithril',
        name: '秘银',
        cost: 5,
        coins: 53
      }, {
        key: 'titanium',
        name: '钛',
        cost: 6,
        coins: 74
      }, {
        key: 'adamantite',
        name: '精金',
        cost: 6,
        coins: 103
      }, {
        key: 'uranium',
        name: '铀',
        cost: 7,
        coins: 145
      }, {
        key: 'luminite',
        name: '流明矿',
        cost: 7,
        coins: 202
      }, {
        key: 'iridium',
        name: '铱',
        cost: 8,
        coins: 283
      }, {
        key: 'ruby',
        name: '红宝石',
        cost: 8,
        coins: 397
      }, {
        key: 'sapphire',
        name: '蓝宝石',
        cost: 9,
        coins: 556
      }, {
        key: 'emerald',
        name: '绿宝石',
        cost: 9,
        coins: 778
      }, {
        key: 'diamond',
        name: '钻石',
        cost: 10,
        coins: 1089
      }]);
      /** Each zone (or deeper rock band) shifts the ore index up by this much, so ten cannon levels spread over seventeen ores. */
      var ORE_TIER_STEP = exports('ORE_TIER_STEP', 1.45);
      var oreIndexFor = exports('oreIndexFor', function oreIndexFor(tier) {
        return Math.min(ORES.length - 1, Math.floor(Math.max(0, tier) * ORE_TIER_STEP));
      });
      var ORE_BASE = exports('ORE_BASE', 20);
      var CELL = exports('CELL', {
        EMPTY: 0,
        MUD: 1,
        ROCK: 3,
        BIG_GOLD: 5,
        FOUNDATION: 6,
        HARD1: 9,
        HARD2: 10,
        BEDROCK: 11,
        HARD3: 12,
        HARD4: 13
      });
      var oreCell = exports('oreCell', function oreCell(key) {
        return ORE_BASE + ORES.findIndex(function (o) {
          return o.key === key;
        });
      });
      var isOre = exports('isOre', function isOre(cell) {
        return cell >= ORE_BASE && cell < ORE_BASE + ORES.length;
      });
      var oreIndex = exports('oreIndex', function oreIndex(cell) {
        return cell - ORE_BASE;
      });
      var RESOURCE_KEYS = exports('RESOURCE_KEYS', ['mud', 'rock', 'deep'].concat(ORES.map(function (o) {
        return o.key;
      })));
      var RESOURCE_NAME = exports('RESOURCE_NAME', function () {
        var out = {
          mud: '泥砖',
          rock: '岩石',
          deep: '深层岩'
        };
        for (var _i = 0, _ORES = ORES; _i < _ORES.length; _i++) {
          var o = _ORES[_i];
          out[o.key] = o.name;
        }
        return out;
      }());
      var CONFIG = exports('CONFIG', {
        saveKey: 'drill_miner_save_v1',
        saveVersion: 18,
        // v18：稀有度阶梯大修——深渊长脉封顶流明矿(11)；铱=bump3%、红宝石=伴生3%、蓝宝石=伴生2% 小脉、绿宝=伴生1.2%+保底、钻石=深渊小脉封顶 3 块；岩膜富集封顶精金(9)；地图生成末尾加确定性阶梯收尾（某档格数≥上一档就就地降档），保证 钻<绿宝<蓝宝<红宝<铱<流明 在任意 seed 恒成立；旧档矿图作废重开（测试期可接受）；v17：矿级=min(距离档, 深度档)——越深越稀有、浅层（含远处地表）绝不出稀有矿，稀有矿全图密度阶梯单调，钻石只在深渊顶带；v16：矿区边界随钻进取向自动生成（存档新增 mineOx/mineWidth，地图窗口可向左/右无限扩展）；v15：矿石只按到炮台的距离分区（深度不再涨矿级）+ 升级上限链（燃料/硬度≤炮台、钻力≤硬度）+ 越级矿 3~6 倍耗能；v14：存档新增 stats 统计页数据
        mineId: 'mine_01',
        view: {
          designWidth: 720,
          designHeight: 1280,
          tilePx: 40,
          aimSurfaceRatio: 0.42,
          // surface height from the top of the screen while aiming
          aimZoom: 1.7,
          // close-up on the cannon for easier thumb aiming
          flightZoom: 0.35,
          // far view while the shell is airborne, so the mine is readable at a glance
          farCenterRow: 0,
          // world row at screen centre in the far view: the ground line sits mid-screen
          farFollowY: 0.4,
          // how much the far view follows the shell vertically
          lightRadius: 3,
          // tiles lit around the drill while it is underground
          revealRadius: 4.5,
          // tiles remembered permanently along its path
          aimFollow: 0.55,
          // how far the camera pans with the finger while aiming, so a short drag pulls a long way
          aimSmooth: 0.14,
          aimPanLimit: 16,
          // tiles
          digZoom: 1.7,
          // as close as the aiming view when the shell enters the ground
          approachHeight: 30,
          // tiles above the ground where the camera starts closing in
          ambientDepth: 7,
          // daylight fades to black over this many rows
          flightSmooth: 0.14,
          digSmooth: 0.12,
          returnSmooth: 0.5,
          zoomSmooth: 0.45,
          maxCamSpeed: 260,
          // tiles per second
          digDrillRatio: 0.36 // drill height from the top of the screen while digging
        },

        map: {
          width: 340,
          height: 1040,
          seed: 20261122,
          // the abyss: the drill keeps the landing angle all the way down, so a 1000-tile shaft needs ~150 tiles of sideways room — the map is a wide basin, deepest at the far side, and near-vertical launches are the only way to the floor
          // The generated window starts as [0, width) and silently grows toward these hidden world bounds —
          // they sit more than twice as far from the cannon as the longest possible shot, so the true edge is
          // never reachable and, with growMargin ahead of the drill, the mining area never reads as bounded.
          worldLeft: -470,
          worldRight: 810,
          growChunk: 128,
          growMargin: 24,
          // ground past a generated edge grows by growChunk columns once the drill nears it; the margin is wider than half the view, so new ground is born off-screen
          openingOffset: 10,
          // the hand-made opening sits around the cannon
          hard1Start: 46,
          hard1Amp: 12,
          // an irregular 14-tile membrane of hard rock (needs drill tier 1); soft deep ground lies under it
          hard2Start: 94,
          hard2Amp: 14,
          // a 12-tile membrane of harder rock (tier 2); beyond it stretches the deep floor
          hard3Start: 330,
          hard3Amp: 12,
          // 深渊岩膜（tier 3）：千米深渊的第一道大关，膜下矿区更富
          hard4Start: 620,
          hard4Amp: 14,
          // 星核岩膜（tier 4）：最后一道门，门后是全图最富的矿区直到基岩
          // Distance bands from the cannon. Zone k is the ground a cannon of level k can newly reach (reach = 35 + 13k + a few).
          zoneEdges: [39, 52, 65, 78, 91, 104, 117, 130, 143, 156],
          // 深度分带：depthZone(y) = 带起点 ≤ y 的个数。矿级 = min(水平距离带, 深度带)——越深越稀有、越浅越普通；
          // 近炮台列的水平上限仍封顶（近处再深也是普通矿，冻结的 ore-overreach 检查要求）。带起点压到 0~78：
          // 第 k 级矿住在炮台 k 级单发真能钻到的深度带里（实测阶梯 tools/tune/_depth_probe23.mjs），58~78 是岩膜1之下的软带。
          // 深度→矿级：depthBands[i] = 第 i 级矿（0=煤 … 14=蓝宝）自然露头的最浅深度；钻石（15/16）只靠 bump 与深渊矿脉。
          // 越深越稀有：地表 0~8 行只有煤铜铁，银从 9 行起，宝石（红宝 74、蓝宝 80）要钻过第一道岩膜才见。
          // 水平距离仍是总闸（近炮台处再深也封顶在低阶矿，冻结的 ore-overreach 检查按水平射程封顶）。
          depthBands: [2, 5, 9, 14, 20, 26, 32, 38, 44, 50, 56, 62, 68],
          // 深度封顶 12=流明矿：深渊基础矿脉不再全是蓝宝石（第二稀有必须第二稀有），13+ 只靠 bump/保底/钻石小脉
          commonOre: 5,
          // 混入开关（>0 生效）：富矿区里约一成六是「全谱杂质」——从煤一直到比本层目标矿低一级的任意矿都可能出现，越低的层占比越小但绝不缺席
          commonOreChance: 0.16,
          // 深处每片矿约一成六直接是基础矿材；浅层（矿级 < 3）完全不受影响
          commonOreFromLevel: 3 // 从哪级矿起开始混入基础矿材
        },

        // The barrel pivots about (x, pivotY); a shell leaves from the muzzle at the end of the barrel, so it depends on the angle.
        cannon: {
          x: 14,
          pivotY: -1.38,
          barrelLength: 1.7,
          baseHalfWidth: 2.5
        },
        aim: {
          edgeBandPx: 90,
          // thickness of the red cancel gradient along the bottom of the screen
          cancelEdgePx: 48,
          // letting go this close to the bottom edge cancels the shot
          cancelRampPx: 120,
          // the red gradient starts to show this far above the bottom edge
          deadzonePx: 24,
          // shorter drags cancel the shot
          fullPullPx: 460,
          // pull that reaches the cannon's full power
          minAngleDeg: 30,
          // the barrel only turns in the up-right fan: from this elevation to straight up (90°); pulls outside are clamped to the nearest edge
          minRange: 4,
          // flat range of the weakest shot, in tiles
          baseMaxRange: 35,
          // flat range of a level-0 cannon at full power; upgrades extend it
          guideTiles: 2,
          // the aim guide is a fixed short stub: it shows direction but never how far you can pull
          wallMargin: 6 // the mine-boundary fence stands this many tiles past the current range and slides outward on every range upgrade (pure visual frontier; the arc already ends short of it)
        },

        shotBonus: {
          // a lucky shell: sometimes a shot pays coins the moment it leaves the barrel (a UI-layer treat; the headless core economy never sees it)
          chance: 0.12,
          // odds a launch is golden
          base: 6,
          // coins it pays
          perLevel: 2,
          // + this many per fuel/drill level, so the treat scales with the run
          jitter: 6 // + 0..jitter-1 random coins
        },

        sim: {
          tickRate: 120,
          plumbFrom: 200,
          // 千米深渊自垂：这个深度以下，四壁把钻杆一点点推回垂直——旧井越挖越直，下一炮才能顺着同一条井往更深处叠加
          plumb: 0.6,
          // 每偏 1 秒洞壁挤直 45% 的横向动量
          deepPressFrom: 280,
          // 千米深渊的重量：超过这个深度，每格额外耗能随深度线性上涨（深部挤压）
          deepPressPer: 0.0035,
          // 每深 1 格 +0.35% 耗能 —— 1000 米约 3.5 倍，靠「钻头增压」科技最多削掉 60%
          gravity: 40,
          // Tiles per second. Empty tunnel runs at the landing speed (as fast as the flight); fresh ground is slower.
          speeds: {
            mud: 38,
            ore: 13,
            rock: 13,
            hard1: 13,
            hard2: 9
          },
          // ore is real resistance, not soft soil: the drill sinks into it and bores
          embedSpeed: 4,
          // tiles per second the nose sinks into the block that stops it
          minPower: 0.1,
          // fraction of the speed left when the drill is nearly out of power
          powerCurve: 1.4,
          kineticFactor: 0.005,
          // fuel-equivalent energy per (tile/s)^2 / 2: speed that is braked away becomes free digging (kept small: a Lv0 shot should die in soil, not coast into the membrane)
          overdriveCap: 0.6,
          // the overdrive (fire) bar holds at most this fraction of a full fuel bar
          overdriveFactor: 0.016,
          // landing overdrive = factor × landing speed² (× kinetic-recycler bonus): a full-power hit fills the bar
          overdriveOreBonus: 0.4,
          // while the fire burns, ore costs this fraction less to pierce
          overdriveBurn: 0.5,
          // each ore cell pierced blows this much of the fire away
          oreGain: 0.35,
          // piercing ore kicks this fraction of its paid energy back into the bank: hitting a vein recharges the drill and it keeps boring down
          shotCharge: 0.75,
          // maxed cannon: every shell launches mega-charged, starting with this much extra fuel
          landCharge: 10,
          // maxed recycler: every landing refills this much free fuel
          magPulseBase: 13,
          // magnetic skill: a pulse bomb drops every (base − 2×level) ore blocks bored (Lv1: 11, Lv2: 9, Lv3: 7)
          magPulseRadius: 1.8,
          // a pulse only blasts ORE within this small radius — free, and it never touches soil or rock
          coastDrag: 30,
          // tiles/s^2 a drill with no energy left loses while coasting through open space
          digAccel: 60,
          // tiles/s^2 the drill spins up towards a material's speed
          brake: 400,
          // tiles/s^2 it brakes when it meets solid ground
          maxDigSpeed: 140,
          drillRadius: 0.3,
          carveRadius: 0.38,
          // always larger than drillRadius, so tunnels stay wider than the drill
          bigOreFuelPerSecond: 16
        },
        cells: (_cells = {}, _cells[CELL.MUD] = {
          cost: 1,
          coins: 1,
          key: 'mud'
        }, _cells[CELL.ROCK] = {
          cost: 5,
          coins: 1,
          key: 'rock'
        }, _cells[CELL.HARD1] = {
          cost: 1,
          coins: 12,
          key: 'deep',
          tier: 1
        }, _cells[CELL.HARD2] = {
          cost: 2,
          coins: 90,
          key: 'deep',
          tier: 2
        }, _cells[CELL.HARD3] = {
          cost: 2,
          coins: 380,
          key: 'deep',
          tier: 3
        }, _cells[CELL.HARD4] = {
          cost: 3,
          coins: 1500,
          key: 'deep',
          tier: 4
        }, _cells),
        bigGold: {
          x: 40,
          y: 4,
          width: 3,
          height: 3,
          hp: 32,
          oreReward: 60
        },
        // the opening giant sits beyond the Lv0 full charge, so big bodies are always a "save up and aim" prize, never a freebie

        upgrades: {
          baseFuel: 24,
          fuelPerLevel: 3,
          // slow growth: depth must come from better rock-breaking, not just more fuel
          baseDrill: 1,
          drillPerLevel: 0.45,
          // 钻力升级更值钱：钻力封顶在钻头硬度之下（最多 Lv5），每级必须省下足够能量，深渊才钻得穿
          fuelFirstPrice: 52,
          drillFirstPrice: 44,
          priceGrowth: 1.85,
          // each level costs this much more than the last
          maxDrill: 10,
          // 钻力封顶 Lv10——Eagle 的炮弹/钻头图正好 10 级素材（drill_projectile_lv01..10），满级即整套素材用尽
          maxFuel: 11,
          // 燃料封顶：炮台满级（Lv10）时燃料最高 Lv11——燃料等级不得超过炮台等级（UI 两边都显示 Lv.11）
          cannonRangePerLevel: 13 // ten cannon levels reach the far end of the 340-wide map
        },

        shells: {
          max: 12,
          regenSeconds: 300,
          adReward: 5
        },
        // v1.1.0：基础储存 5→12；弹药仓最多再升 8 级到 20

        hitFeedback: {
          bodyShakePx: 6,
          bodyPunch: 0.035,
          drillShakePx: 3,
          drillShakeDeg: 3.5,
          shakeSeconds: 0.14,
          crackStages: 12
        },
        settle: {
          freezeSeconds: 0.45,
          cardSeconds: 0.5,
          flySeconds: 0.62,
          flyStagger: 0.13,
          holdSeconds: 0.55,
          maxIconsPerType: 3
        }
      });
      for (var i = 0; i < ORES.length; i++) CONFIG.cells[ORE_BASE + i] = {
        cost: ORES[i].cost,
        coins: ORES[i].coins,
        key: ORES[i].key
      };
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameRoot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Ballistics.ts', './Config.ts', './GameStore.ts', './Skills.ts', './ShotSim.ts', './Art.ts', './AdService.ts', './Sound.ts', './TerrainView.ts', './Lang.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Color, game, Game, screen, sys, view, ResolutionPolicy, Graphics, UITransform, UIOpacity, Vec3, Sprite, Label, Mask, Component, Node, solveAim, flightPoint, CONFIG, ORES, RESOURCE_KEYS, RESOURCE_NAME, CELL, isOre, fuelAt, drillAt, GameStore, SKILLS, skillNode, effectText, ShotSim, node, sprite, glowSprite, panel, label, frame, loadArt, rewardedAd, Sound, TerrainView, GRASS_DEPTH, t, getLang, setLang, initLang;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      game = module.game;
      Game = module.Game;
      screen = module.screen;
      sys = module.sys;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
      Graphics = module.Graphics;
      UITransform = module.UITransform;
      UIOpacity = module.UIOpacity;
      Vec3 = module.Vec3;
      Sprite = module.Sprite;
      Label = module.Label;
      Mask = module.Mask;
      Component = module.Component;
      Node = module.Node;
    }, function (module) {
      solveAim = module.solveAim;
      flightPoint = module.flightPoint;
    }, function (module) {
      CONFIG = module.CONFIG;
      ORES = module.ORES;
      RESOURCE_KEYS = module.RESOURCE_KEYS;
      RESOURCE_NAME = module.RESOURCE_NAME;
      CELL = module.CELL;
      isOre = module.isOre;
    }, function (module) {
      fuelAt = module.fuelAt;
      drillAt = module.drillAt;
      GameStore = module.GameStore;
    }, function (module) {
      SKILLS = module.SKILLS;
      skillNode = module.skillNode;
      effectText = module.effectText;
    }, function (module) {
      ShotSim = module.ShotSim;
    }, function (module) {
      node = module.node;
      sprite = module.sprite;
      glowSprite = module.glowSprite;
      panel = module.panel;
      label = module.label;
      frame = module.frame;
      loadArt = module.loadArt;
    }, function (module) {
      rewardedAd = module.rewardedAd;
    }, function (module) {
      Sound = module.Sound;
    }, function (module) {
      TerrainView = module.TerrainView;
      GRASS_DEPTH = module.GRASS_DEPTH;
    }, function (module) {
      t = module.t;
      getLang = module.getLang;
      setLang = module.setLang;
      initLang = module.initLang;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "7d3c1pSTmtPipshbA1efxo0", "GameRoot", undefined);
      var ccclass = _decorator.ccclass;

      /** Critically damped follow with a speed cap; returns [position, velocity]. */
      function smoothDamp(current, target, velocity, smoothTime, maxSpeed, dt) {
        var time = Math.max(0.0001, smoothTime),
          omega = 2 / time,
          x = omega * dt;
        var decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
        var maxChange = maxSpeed * time;
        var change = Math.max(-maxChange, Math.min(maxChange, current - target));
        var goal = current - change,
          temp = (velocity + omega * change) * dt;
        var out = goal + (change + temp) * decay,
          vel = (velocity - omega * temp) * decay;
        if (target - current > 0 === out > target) {
          out = target;
          vel = (out - target) / dt;
        }
        return [out, vel];
      }
      var T = CONFIG.view.tilePx;
      var TICK = 1 / CONFIG.sim.tickRate;
      var GOLD = new Color(255, 214, 72, 255);
      var SOFT = new Color(190, 210, 255, 255);
      var RES_ART = function () {
        var out = {
          mud: {
            art: 'dirt_mid'
          },
          rock: {
            art: 'rock'
          },
          deep: {
            art: 'hardRock'
          }
        };
        for (var _iterator = _createForOfIteratorHelperLoose(ORES), _step; !(_step = _iterator()).done;) {
          var o = _step.value;
          out[o.key] = {
            art: "ore_" + o.key
          };
        }
        return out;
      }();
      /** The cannon, its support and the shell each have ten looks from the art library; cannon level 0 starts with the worst. */
      var ART_TIERS = 10;
      var artTier = function artTier(cannonLevel) {
        return Math.max(1, Math.min(ART_TIERS, cannonLevel + 1));
      };
      /** Barrel and support are drawn on one shared 512 canvas (shown at CANNON_SCALE); the barrel turns about the support's hub. */
      var CANNON_SCALE = 0.22,
        BARREL_ART_ANGLE = 46.3;
      var HUB = {
        x: 255,
        y: 222
      }; // hub ring centre in canvas pixels, y down
      var BARREL_PIVOT = {
        x: 203,
        y: 309
      }; // the point on the barrel, toward its rear, that sits on the hub
      var SUPPORT_BOTTOM = 445;
      var SUPPORT_BASE_Y = 6; // height of the support's underside above the ground line           // lowest visible row of the support
      var PROJ_LENGTH = T * 0.78 * 281 / 166,
        PROJ_ASPECT = 70 / 128;
      var RES_COIN = function () {
        var out = {};
        for (var _i = 0, _Object$keys = Object.keys(CONFIG.cells); _i < _Object$keys.length; _i++) {
          var id = _Object$keys[_i];
          var def = CONFIG.cells[Number(id)];
          if (out[def.key] === undefined) out[def.key] = def.coins;
        }
        return out;
      }();

      // coin flyers land on the wallet, ore icons on the factory button

      var FLAME_TMP = new Color(255, 255, 255, 255);
      var memoryFallback = new Map();
      var storage = {
        getItem: function getItem(k) {
          try {
            return sys.localStorage.getItem(k);
          } catch (_unused) {
            var _memoryFallback$get;
            return (_memoryFallback$get = memoryFallback.get(k)) != null ? _memoryFallback$get : null;
          }
        },
        setItem: function setItem(k, v) {
          try {
            sys.localStorage.setItem(k, v);
          } catch (_unused2) {
            memoryFallback.set(k, v);
          }
        }
      };
      var GameRoot = exports('GameRoot', (_dec = ccclass('GameRoot'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameRoot, _Component);
        function GameRoot() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.mode = 'loading';
          _this.store = void 0;
          _this.map = void 0;
          _this.sim = null;
          _this.W = CONFIG.view.designWidth;
          _this.H = CONFIG.view.designHeight;
          _this.safeTop = 0;
          _this.world = void 0;
          _this.terrain = void 0;
          _this.sky = void 0;
          _this.ground = void 0;
          _this.clouds = null;
          // soft glow-sprite cloud band, built once by drawBackdrop
          _this.aimGfx = void 0;
          _this.boundGfx = void 0;
          _this.wallShown = -1;
          _this.bodyCount = -1;
          _this.recordGfx = void 0;
          /** Arc of the shot currently in flight, and of the one before it: aiming shows the last arc, never this one. */
          _this.pathPts = [];
          _this.lastPath = [];
          _this.drill = void 0;
          _this.fx = void 0;
          _this.hud = void 0;
          _this.walletRoot = void 0;
          _this.walletLabel = void 0;
          _this.hint = void 0;
          _this.depthLabel = void 0;
          _this.fuelGfx = void 0;
          _this.toast = void 0;
          _this.cards = [];
          _this.settleRoot = void 0;
          _this.factoryButton = void 0;
          _this.factoryBadge = void 0;
          _this.factoryDot = void 0;
          _this.badgeSeen = new Set();
          // upgrades that were already available when the workshop was last closed
          _this.settingsHold = null;
          _this.factoryHold = null;
          // long-press the workshop button 3s to start/stop the AI bot
          _this.recIndex = 0;
          _this.botActive = false;
          _this.botBadge = void 0;
          _this.botShotN = 0;
          _this.botWait = 0;
          _this.speed100 = false;
          _this.clock = 0;
          // real time, unaffected by the test speed-up
          _this.fastForward = false;
          _this.cancelRoot = void 0;
          _this.cancelFade = void 0;
          _this.cancelLabel = void 0;
          _this.fingerEdge = 1e9;
          _this.coinHold = null;
          _this.touchGfx = void 0;
          _this.touchCur = {
            x: 0,
            y: 0
          };
          _this.fadeNode = void 0;
          _this.fadeState = 'none';
          _this.fadeT = 0;
          _this.factoryBounce = 0;
          _this.shownEnergy = 0;
          _this.energyGfx = void 0;
          _this.cannonRig = void 0;
          _this.barrelPivot = void 0;
          _this.barrelSprite = void 0;
          _this.supportSprite = void 0;
          _this.cannonTierShown = 0;
          _this.drillTierShown = 0;
          _this.barrelAngle = 45;
          _this.lastShotAngle = 45;
          // the barrel keeps the angle it fired at instead of springing back to default
          _this.barrelKick = 0;
          _this.finger = void 0;
          _this.touchStartWorld = {
            x: 0,
            y: 0
          };
          _this.aimPan = {
            x: 0,
            y: 0
          };
          _this.introActive = false;
          _this.introT = 0;
          _this.factoryRoot = void 0;
          _this.settingsRoot = void 0;
          _this.settingsButton = void 0;
          _this.statsRoot = void 0;
          _this.playAcc = 0;
          _this.settingsHits = [];
          _this.statsHits = [];
          /** HUD chrome created once at boot; re-labelled in place when the player flips the language. */
          _this.i18nLabels = [];
          _this.settingsDrag = null;
          _this.resetArmed = 0;
          _this.rings = [];
          _this.lineFx = [];
          _this.fxFree = [];
          _this.shellRoot = void 0;
          _this.shellLabel = void 0;
          _this.adButton = void 0;
          _this.adLabel = void 0;
          _this.camX = 0;
          _this.camY = 0;
          _this.returning = false;
          _this.velX = 0;
          _this.velY = 0;
          _this.velZ = 0;
          _this.rx = 0;
          _this.ry = 0;
          _this.time = 0;
          _this.flameRoot = void 0;
          _this.tailGlow = void 0;
          _this.flames = [];
          _this.flamePool = [];
          _this.lastTail = null;
          _this.frameMax = 0;
          _this.zoom = CONFIG.view.aimZoom;
          _this.touchId = null;
          _this.touchStart = {
            x: 0,
            y: 0
          };
          _this.aim = null;
          _this.acc = 0;
          _this.checkpointTimer = 0;
          _this.modeTimer = 0;
          _this.shownWallet = 0;
          _this.walletPulse = 0;
          _this.flyers = [];
          _this.bonus = [];
          // lucky-shell coins still flying to the wallet (they fly during 'shot', unlike settle flyers)
          _this.debris = [];
          _this.debrisPool = [];
          _this.popCoins = 0;
          _this.popTimer = 0;
          _this.recordDepth = 0;
          _this.recordPassed = false;
          _this.toastTime = 0;
          _this.factoryScroll = 0;
          _this.factoryContent = null;
          _this.factoryDrag = null;
          _this.factoryOwned = [];
          _this.factoryMsg = '';
          _this.factoryMsgGood = false;
          _this.adPending = false;
          _this.drillShake = 0;
          _this.shellUiTimer = 0;
          _this.onKeyDown = function (e) {
            var _e$target;
            var tag = (_e$target = e.target) == null ? void 0 : _e$target.tagName;
            if (e.repeat || e.code !== 'Slash' && e.key !== '/' || tag === 'INPUT' || tag === 'TEXTAREA' || _this.mode === 'loading') return;
            e.preventDefault();
            _this.toggleTestMode();
          };
          _this.factoryMsgLabel = null;
          return _this;
        }
        var _proto = GameRoot.prototype;
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this2 = this;
            var cp, input;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  initLang();
                  this.applyViewport();
                  _context.next = 4;
                  return loadArt();
                case 4:
                  this.store = new GameStore(storage);
                  this.map = this.store.buildMap();
                  this.map.grow(-1);
                  this.map.grow(1); // pre-grow one chunk on both sides: the opening view sits in open ground, never next to an edge
                  this.buildWorld();
                  this.applyCannonTier();
                  this.applyDrillTier();
                  this.buildHud();
                  Sound.init(this.node);
                  this.layout();
                  this.shownWallet = this.store.data.wallet;
                  this.refreshHud();
                  cp = this.store.data.checkpoint;
                  if (cp) this.resume(cp);else this.enterIdle();
                  this.snapCamera();
                  this.returning = false;
                  this.introActive = this.store.data.lastSettledShot === 0 && !cp;
                  input = node('Input', this.node);
                  input.getComponent(UITransform).setContentSize(4000, 4000);
                  input.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
                  input.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
                  input.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
                  input.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
                  game.on(Game.EVENT_HIDE, this.saveProgress, this);
                  screen.on('window-resize', this.onResize, this);
                  if (sys.isBrowser) window.addEventListener('keydown', this.onKeyDown, true);
                  globalThis.__drill = {
                    state: function state() {
                      return {
                        speed100: _this2.speed100,
                        badge: [_this2.factoryBadge.active, _this2.factoryDot.active],
                        cannon: {
                          tier: _this2.cannonTierShown
                        },
                        mode: _this2.mode,
                        wallet: _this2.store.data.wallet,
                        shownWallet: _this2.shownWallet,
                        fuelLevel: _this2.store.data.fuelLevel,
                        drillLevel: _this2.store.data.drillLevel,
                        best: _this2.store.data.bestDepth,
                        shot: _this2.store.data.lastSettledShot,
                        cleared: _this2.store.data.clearedCells.length,
                        bodyHp: _this2.map.bodies[0].hp,
                        camera: [_this2.camX, _this2.camY, _this2.zoom],
                        mapWidth: _this2.map.width,
                        devInfinite: _this2.store.devInfiniteShells,
                        drillX: _this2.sim ? _this2.rx : null,
                        frameMax: _this2.frameMax,
                        tileUpdates: _this2.terrain.updates,
                        tileUpdatesMax: _this2.terrain.maxUpdates,
                        shells: _this2.store.data.shells,
                        nextShell: _this2.store.secondsToNextShell(),
                        adVisible: _this2.adButton.active,
                        crack: _this2.terrain.crackOf(0),
                        bodyShake: _this2.terrain.shakeOf(0),
                        drillShake: _this2.drillShake,
                        seen: _this2.map.seen.reduce(function (a, b) {
                          return a + b;
                        }, 0),
                        speed: _this2.sim ? _this2.sim.state.speed : 0,
                        skills: _this2.store.data.skills,
                        inventory: _this2.store.data.inventory,
                        introActive: _this2.introActive,
                        cancelVisible: _this2.cancelRoot.active,
                        fingerEdge: _this2.fingerEdge,
                        energy: _this2.shownEnergy,
                        drillVisible: _this2.drill.node.active,
                        landSpeed: _this2.sim ? _this2.sim.state.landSpeed : 0,
                        phase: _this2.sim ? _this2.sim.state.phase : '',
                        maxRange: _this2.store.stats().maxRange,
                        sim: _this2.sim ? {
                          fuel: _this2.sim.state.fuel,
                          blocks: _this2.sim.state.blocks,
                          coins: _this2.sim.state.coins,
                          y: _this2.sim.state.y,
                          phase: _this2.sim.state.phase
                        } : null,
                        checkpoint: !!_this2.store.data.checkpoint,
                        view: [_this2.W, _this2.H]
                      };
                    },
                    reset: function reset() {
                      _this2.store.reset();
                      location.reload();
                    },
                    wipe: function wipe(cover, t) {
                      _this2.fadeNode.active = true;
                      _this2.drawWipe(cover, t);
                    },
                    wipeClear: function wipeClear() {
                      _this2.fadeNode.active = false;
                      _this2.fadeNode.getComponent(Graphics).clear();
                    }
                  };
                case 31:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }();
        _proto.onDestroy = function onDestroy() {
          game.off(Game.EVENT_HIDE, this.saveProgress, this);
          screen.off('window-resize', this.onResize, this);
          if (sys.isBrowser) window.removeEventListener('keydown', this.onKeyDown, true);
        };
        _proto.applyViewport = function applyViewport() {
          var size = screen.windowSize,
            narrow = size.width / size.height <= CONFIG.view.designWidth / CONFIG.view.designHeight + 0.001;
          // Wide screens (iPad landscape, desktop): keep the design height and let the width run to the real page
          // width — no letterbox bars, the sky covers 100% and the edge-anchored HUD sits at the screen's sides.
          view.setDesignResolutionSize(CONFIG.view.designWidth, CONFIG.view.designHeight, narrow ? ResolutionPolicy.FIXED_WIDTH : ResolutionPolicy.FIXED_HEIGHT);
          // 3.8's Canvas has no fit flags and never overrides the design resolution — the view policy above is the
          // whole story (its old 2.x-era updateCanvasSize() is gone from the engine; calling it crashed web builds).
          var visible = view.getVisibleSize();
          this.W = visible.width;
          this.H = visible.height;
          try {
            var safe = sys.getSafeAreaRect();
            this.safeTop = Math.max(0, Math.min(120, this.H - (safe.y + safe.height)));
          } catch (_unused3) {
            this.safeTop = 0;
          }
        };
        _proto.onResize = function onResize() {
          this.applyViewport();
          if (this.mode !== 'loading') {
            this.layout();
            this.terrain.refresh(this.camX, this.camY, this.zoom, this.W, this.H, this.currentLight());
          }
        }

        // ---------------------------------------------------------------- scene
        ;

        _proto.buildWorld = function buildWorld() {
          this.sky = node('Sky', this.node).addComponent(Graphics);
          this.world = node('World', this.node);
          this.ground = node('Ground', this.world).addComponent(Graphics);
          this.drawBackdrop();
          this.terrain = new TerrainView(this.world, this.map);
          this.recordGfx = node('Record', this.world).addComponent(Graphics);
          // Foundation under a support and barrel from the art library; the barrel turns about the support's hub.
          var cs = 512 * CANNON_SCALE,
            supY = SUPPORT_BASE_Y + (SUPPORT_BOTTOM - 256) * CANNON_SCALE;
          var hubY = supY + (256 - HUB.y) * CANNON_SCALE;
          this.cannonRig = node('CannonRig', this.world, this.terrain.px(CONFIG.cannon.x), 0);
          sprite('cannon_foundation', this.cannonRig, 226 * 0.6, 223 * 0.6, 2.1, 66.6);
          // The barrel is drawn first so the support's hub ring covers its rear end.
          this.barrelPivot = node('BarrelPivot', this.cannonRig, (HUB.x - 256) * CANNON_SCALE, hubY);
          this.barrelSprite = sprite('cannon_barrel_1', this.barrelPivot, cs, cs);
          this.barrelSprite.node.getComponent(UITransform).setAnchorPoint(BARREL_PIVOT.x / 512, 1 - BARREL_PIVOT.y / 512);
          this.supportSprite = sprite('cannon_support_1', this.cannonRig, cs, cs, 0, supY);
          this.aimGfx = node('Aim', this.world).addComponent(Graphics);
          this.boundGfx = node('Boundary', this.world).addComponent(Graphics); // the moving mine-boundary fence draws above the terrain
          this.flameRoot = node('Flame', this.world);
          this.drill = sprite('proj_1', this.world, PROJ_LENGTH, PROJ_LENGTH * PROJ_ASPECT);
          this.tailGlow = glowSprite(this.drill.node, 46, 72, -(PROJ_LENGTH / 2 + 16), 0);
          this.tailGlow.node.angle = 90;
          this.tailGlow.color = new Color(255, 168, 56, 235);
          this.tailGlow.node.active = false;
          this.drill.node.active = false;
          this.fx = node('Fx', this.world);
          for (var i = 0; i < 12; i++) this.fxFree.push(node("FxLine" + i, this.fx).addComponent(Graphics)); // pooled line-art layers: blasts, pulses, breaks draw as pure geometry
        };

        _proto.drawSky = function drawSky() {
          var g = this.sky,
            bands = 22,
            W = this.W + 4,
            H = this.H + 4;
          g.clear();
          for (var i = 0; i < bands; i++) {
            var k = i / (bands - 1);
            g.fillColor = new Color(44 + 118 * k, 96 + 112 * k, 176 + 62 * k, 255);
            g.rect(-W / 2, H / 2 - H * (i + 1) / bands, W, H / bands + 1);
            g.fill();
          }
        }

        /** Clouds live in the world so the camera's speed reads clearly during flight. */;
        _proto.drawBackdrop = function drawBackdrop() {
          // The mine can grow left (worldLeft) as the drill bores, so the dark backdrop and clouds span the whole
          // world width, not just the current map: the camera pinned at the left edge must never expose bare sky.
          var u = this.ground,
            w0 = CONFIG.map.worldLeft * T,
            w = (CONFIG.map.worldRight - CONFIG.map.worldLeft) * T,
            depth = (CONFIG.map.height + 40) * T;
          u.clear();
          u.fillColor = new Color(3, 2, 5, 255);
          u.rect(w0, -depth - GRASS_DEPTH, w, depth);
          u.fill();
          if (this.clouds) return;
          // Clouds are soft glow SPRITES, not Graphics circles: ~270 tessellated circle fills made this one node the
          // single biggest occupant of the shared 2D batcher buffer, and Safari throws "Length out of range of buffer"
          // the moment that buffer overflows (Chrome silently tolerates it). A sprite is 4 vertices; the whole band is now trivial.
          this.clouds = node('Clouds', this.world);
          this.clouds.setSiblingIndex(1); // above the dark rect, below the terrain
          for (var i = 0; i < 90; i++) {
            var x = w0 + (i + 0.5) / 90 * w + Math.sin(i * 12.9898) * 90; // clouds spread over the whole world
            var y = (5 + Math.abs(Math.sin(i * 78.233)) * 95) * T,
              r = 26 + Math.abs(Math.sin(i * 3.7)) * 22;
            for (var _iterator2 = _createForOfIteratorHelperLoose([[-r, 0, 0.72], [0, 0.2 * r, 1], [r, 0, 0.68]]), _step2; !(_step2 = _iterator2()).done;) {
              var _step2$value = _step2.value,
                dx = _step2$value[0],
                dy = _step2$value[1],
                k = _step2$value[2];
              var c = glowSprite(this.clouds, r * 2.5 * k, r * 2.0 * k, x + dx, y + dy);
              c.color = new Color(255, 255, 255, 46); // the three puffs overlap and add up toward the old 62 alpha
            }
          }
        };

        _proto.buildHud = function buildHud() {
          this.hud = node('Hud', this.node);
          this.walletRoot = node('Warehouse', this.hud);
          panel(this.walletRoot, 216, 76);
          sprite('coin', this.walletRoot, 44, 45, -70, 0);
          this.trLabel(label(this.walletRoot, t('金币'), 17, 8, 19, SOFT), '金币');
          this.walletLabel = label(this.walletRoot, '0', 31, 8, -11, GOLD);
          this.hint = label(this.hud, t('向后拖动，松手发射'), 34);
          this.depthLabel = label(this.hud, t('0 米'), 42);
          this.fuelGfx = node('Fuel', this.hud).addComponent(Graphics);
          this.toast = label(this.hud, '', 30, 0, 0, GOLD);
          this.toast.node.active = false;
          this.cards = [this.buildCard('fuel', t('燃料'), 'dirt'), this.buildCard('drill', t('钻力'), 'rock')];
          this.shellRoot = node('Shells', this.hud);
          panel(this.shellRoot, 216, 58);
          sprite('drill', this.shellRoot, 20, 34, -78, 0);
          this.shellLabel = label(this.shellRoot, '', 23, -56, 0, Color.WHITE, 'left');
          this.adButton = node('AdButton', this.hud);
          panel(this.adButton, 400, 92);
          this.adLabel = label(this.adButton, '', 27, 0, 0, GOLD);
          this.adButton.active = false;
          this.factoryButton = node('FactoryButton', this.hud);
          panel(this.factoryButton, 220, 92);
          sprite('warehouse', this.factoryButton, 70, 67, -66, 0);
          this.trLabel(label(this.factoryButton, t('加工坊'), 30, 34, 0, GOLD), '加工坊');
          this.settingsButton = node('SettingsButton', this.hud);
          panel(this.settingsButton, 216, 54);
          this.trLabel(label(this.settingsButton, t('设置'), 26, 0, 0, SOFT), '设置');
          this.factoryBadge = node('Badge', this.factoryButton, 62, 40);
          var badge = node('BadgeBg', this.factoryBadge).addComponent(Graphics);
          badge.fillColor = new Color(226, 48, 48, 255);
          badge.roundRect(-46, -16, 92, 32, 14);
          badge.fill();
          badge.lineWidth = 3;
          badge.strokeColor = new Color(255, 255, 255, 255);
          badge.roundRect(-46, -16, 92, 32, 14);
          badge.stroke();
          this.trLabel(label(this.factoryBadge, t('可升级'), 20, 0, 0, Color.WHITE), '可升级');
          this.factoryBadge.active = false;
          this.factoryDot = node('Dot', this.factoryButton, 100, 34);
          var dot = node('DotBg', this.factoryDot).addComponent(Graphics);
          dot.fillColor = new Color(226, 48, 48, 255);
          dot.circle(0, 0, 12);
          dot.fill();
          dot.lineWidth = 3;
          dot.strokeColor = new Color(255, 255, 255, 255);
          dot.circle(0, 0, 12);
          dot.stroke();
          this.factoryDot.active = false;
          this.touchGfx = node('Touch', this.hud).addComponent(Graphics);
          this.fadeNode = node('Fade', this.hud);
          this.fadeNode.addComponent(Graphics);
          this.fadeNode.active = false;
          this.cancelRoot = node('Cancel', this.hud);
          this.cancelFade = this.cancelRoot.addComponent(UIOpacity);
          this.cancelRoot.addComponent(Graphics);
          this.cancelLabel = this.trLabel(label(this.cancelRoot, t('拖拽至底部取消发射'), 32, 0, 0, Color.WHITE), '拖拽至底部取消发射');
          this.cancelRoot.active = false;
          this.cancelRoot.setSiblingIndex(0);
          this.energyGfx = node('Energy', this.hud).addComponent(Graphics);
          this.energyGfx.node.active = false;
          this.finger = node('Finger', this.hud).addComponent(Graphics);
          this.finger.node.active = false;
          this.factoryRoot = node('Factory', this.hud);
          this.factoryRoot.active = false;
          this.settingsRoot = node('Settings', this.hud);
          this.settingsRoot.active = false;
          this.statsRoot = node('Stats', this.hud);
          this.statsRoot.active = false;
          this.toast.node.setSiblingIndex(this.hud.children.length - 1);
          this.settleRoot = node('Settle', this.hud);
          this.settleRoot.active = false;
        };
        _proto.buildCard = function buildCard(kind, name, _icon) {
          var root = node("Card_" + kind, this.hud);
          root.getComponent(UITransform).setContentSize(324, 150);
          panel(root, 324, 150);
          var title = label(root, name, 28, 0, 44);
          var value = label(root, '', 25, 0, 4, SOFT);
          sprite('coin', root, 30, 31, -38, -42);
          var price = label(root, '', 29, 8, -42, GOLD, 'left');
          return {
            kind: kind,
            root: root,
            title: title,
            value: value,
            price: price
          };
        };
        _proto.layout = function layout() {
          var W = this.W,
            H = this.H,
            top = H / 2 - this.safeTop;
          this.drawSky();
          this.layoutCancel();
          this.fadeNode.setSiblingIndex(this.hud.children.length - 1);
          this.walletRoot.setPosition(-W / 2 + 114, top - 62);
          this.shellRoot.setPosition(-W / 2 + 114, top - 134);
          this.adButton.setPosition(0, -H / 2 + 250);
          this.factoryButton.setPosition(W / 2 - 124, top - 70);
          this.settingsButton.setPosition(-W / 2 + 114, top - 204);
          this.energyGfx.node.setPosition(-W / 2 + 34, 40);
          this.hint.node.setPosition(0, -H * 0.12);
          this.depthLabel.node.setPosition(0, top - 148);
          this.fuelGfx.node.setPosition(0, top - 190);
          this.toast.node.setPosition(0, top - 250);
          // Cards hug the screen sides (they follow the width, so iPad/desktop spreads them apart instead of
          // clumping them under the cannon), with a floor so a phone's narrow 720 keeps the old centred pair.
          this.cards[0].root.setPosition(Math.min(-166, -W / 2 + 166), -H / 2 + 112);
          this.cards[1].root.setPosition(Math.max(166, W / 2 - 166), -H / 2 + 112);
          this.applyCamera();
        }

        /** A narrow red gradient along the bottom edge only: opaque at the very bottom, fading upward. */;
        _proto.layoutCancel = function layoutCancel() {
          var g = this.cancelRoot.getComponent(Graphics),
            W = this.W,
            H = this.H,
            band = CONFIG.aim.edgeBandPx,
            bands = 22,
            bh = band / bands;
          this.cancelRoot.setPosition(0, 0);
          this.cancelLabel.node.setPosition(0, -H / 2 + band * 0.5);
          g.clear();
          for (var i = 0; i < bands; i++) {
            g.fillColor = new Color(232, 40, 40, Math.round(235 * Math.pow(1 - i / bands, 1.5)));
            g.rect(-W / 2 - 2, -H / 2 + i * bh, W + 4, bh + 1);
            g.fill();
          }
        };
        _proto.refreshHud = function refreshHud() {
          var d = this.store.data;
          this.walletLabel.string = String(Math.round(this.shownWallet));
          this.updateFactoryBadge();
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.cards), _step3; !(_step3 = _iterator3()).done;) {
            var _c$root$getComponent;
            var c = _step3.value;
            var level = c.kind === 'fuel' ? d.fuelLevel : d.drillLevel,
              price = this.store.price(c.kind);
            var cut = function cut(l) {
              return Math.round((1 - 1 / drillAt(l)) * 100);
            }; // how much less energy each block costs
            var maxed = c.kind === 'drill' && level >= CONFIG.upgrades.maxDrill || c.kind === 'fuel' && level >= CONFIG.upgrades.maxFuel; // 封顶：卡片停在 MAX，不再报错误音
            var capped = !maxed && (c.kind === 'drill' ? level >= this.store.skillLevel('hardness') + 1 : level >= this.store.skillLevel('cannon') + 1); // 上限链：钻力≤钻头硬度、燃料≤炮台
            c.title.string = t(maxed ? (c.kind === 'fuel' ? '燃料' : '钻力') + " MAX" : (c.kind === 'fuel' ? '燃料' : '钻力') + " Lv." + (level + 1));
            c.value.string = t(c.kind === 'fuel' ? "\u603B\u80FD\u91CF " + fuelAt(level) + " \u2192 " + fuelAt(level + 1) : maxed ? "\u6BCF\u683C\u8017\u80FD -" + cut(level) + "%\uFF08\u5DF2\u6EE1\u7EA7\uFF09" : "\u6BCF\u683C\u8017\u80FD -" + cut(level) + "% \u2192 -" + cut(level + 1) + "%");
            c.price.string = maxed ? 'MAX' : capped ? t(c.kind === 'fuel' ? "\u9700\u70AE\u53F0 Lv." + (level + 1) : "\u9700\u786C\u5EA6 Lv." + (level + 1)) : String(price); // 上限链提示：先升上一级科技才能继续买
            c.price.color = maxed ? GOLD : capped ? new Color(160, 200, 255, 255) : d.wallet >= price ? GOLD : new Color(255, 130, 120, 255);
            var op = (_c$root$getComponent = c.root.getComponent(UIOpacity)) != null ? _c$root$getComponent : c.root.addComponent(UIOpacity);
            op.opacity = maxed || capped || d.wallet >= price ? 255 : 178;
          }
          this.updateRecommend();
        };
        _proto.setCards = function setCards(on) {
          for (var _iterator4 = _createForOfIteratorHelperLoose(this.cards), _step4; !(_step4 = _iterator4()).done;) {
            var c = _step4.value;
            c.root.active = on;
          }
          this.factoryButton.active = on;
          this.settingsButton.active = on;
        }

        // ---------------------------------------------------------------- input
        ;

        _proto.point = function point(e) {
          var p = e.getUILocation();
          return {
            x: p.x - view.getVisibleSize().width / 2,
            y: p.y - view.getVisibleSize().height / 2
          };
        };
        _proto.cardAt = function cardAt(x, y) {
          var _this$cards$find;
          return (_this$cards$find = this.cards.find(function (c) {
            return c.root.active && Math.abs(x - c.root.position.x) <= 162 && Math.abs(y - c.root.position.y) <= 75;
          })) != null ? _this$cards$find : null;
        };
        _proto.onTouchStart = function onTouchStart(e) {
          Sound.startMusic();
          if (this.mode === 'settings') {
            if (this.touchId === null) this.settingsTouch(this.point(e));
            return;
          }
          if (this.mode === 'stats') {
            if (this.touchId === null) this.statsTouch(this.point(e));
            return;
          }
          if (this.mode === 'factory') {
            if (!this.factoryDrag) {
              var _p = this.point(e);
              this.factoryDrag = {
                id: e.getID(),
                y0: _p.y,
                scroll0: this.factoryScroll,
                moved: false,
                p: _p
              };
            }
            return;
          }
          if (this.touchId !== null || this.mode !== 'idle') return;
          var p = this.point(e);
          if (Math.abs(p.x - this.walletRoot.position.x) <= 108 && Math.abs(p.y - this.walletRoot.position.y) <= 38) {
            this.coinHold = {
              id: e.getID(),
              t: this.clock
            };
            return;
          }
          if (this.factoryButton.active && Math.abs(p.x - this.factoryButton.position.x) <= 110 && Math.abs(p.y - this.factoryButton.position.y) <= 46) {
            this.factoryHold = {
              id: e.getID(),
              t: this.clock
            };
            return;
          }
          if (this.settingsButton.active && Math.abs(p.x - this.settingsButton.position.x) <= 108 && Math.abs(p.y - this.settingsButton.position.y) <= 27) {
            this.settingsHold = {
              id: e.getID(),
              t: this.clock
            };
            return;
          }
          if (this.adButton.active && Math.abs(p.x - this.adButton.position.x) <= 200 && Math.abs(p.y - this.adButton.position.y) <= 46) {
            this.watchAd();
            return;
          }
          var card = this.cardAt(p.x, p.y);
          if (card) {
            if (this.store.buy(card.kind)) {
              Sound.play('upgrade');
              this.shownWallet = this.store.data.wallet;
              this.refreshHud();
              this.applyDrillTier();
              this.pulse(card.root);
            } else if (card.kind === 'drill' && this.store.data.drillLevel >= CONFIG.upgrades.maxDrill) this.showToast(t('钻力已满级'));else if (card.kind === 'fuel' && this.store.data.fuelLevel >= CONFIG.upgrades.maxFuel) this.showToast(t('燃料已满级'));else if (card.kind === 'drill' && this.store.data.drillLevel >= this.store.skillLevel('hardness') + 1) this.showToast(t("\u94BB\u529B\u4E0D\u5F97\u8D85\u8FC7\u94BB\u5934\u786C\u5EA6\u2014\u2014\u5148\u5347\u7EA7\u300C\u94BB\u5934\u786C\u5EA6 Lv." + (this.store.data.drillLevel + 1) + "\u300D"));else if (card.kind === 'fuel' && this.store.data.fuelLevel >= this.store.skillLevel('cannon') + 1) this.showToast(t("\u71C3\u6599\u4E0D\u5F97\u8D85\u8FC7\u70AE\u53F0\u7B49\u7EA7\u2014\u2014\u5148\u5347\u7EA7\u300C\u70AE\u53F0 Lv." + (this.store.data.fuelLevel + 1) + "\u300D"));else Sound.play('error');
            return;
          }
          if (!this.store.canFire) {
            Sound.play('error');
            this.showToast(t('炮弹用完了'));
            return;
          }
          this.touchId = e.getID();
          this.touchStart = p;
          this.touchCur = p;
          this.fingerEdge = p.y + this.H / 2; // distance from the bottom edge
          this.touchStartWorld = this.screenToWorld(p.x, p.y);
          this.introActive = false;
        };
        _proto.screenToWorld = function screenToWorld(sx, sy) {
          return {
            x: this.camX + sx / (T * this.zoom),
            y: this.camY - sy / (T * this.zoom)
          };
        }

        /**
         * The pull is measured in world space from where the finger first touched. The camera pans with the finger,
         * so a short drag can reach the cannon's full power while the player is never told where that limit is.
         */;
        _proto.updateAim = function updateAim(m, current) {
          var v = CONFIG.view,
            k = T * v.aimZoom;
          var pull;
          if (current) {
            var cur = this.screenToWorld(current.x, current.y);
            pull = {
              x: (this.touchStartWorld.x - cur.x) * k,
              y: (cur.y - this.touchStartWorld.y) * k
            };
          } else pull = {
            x: -m.x * (1 + v.aimFollow),
            y: -m.y * (1 + v.aimFollow)
          }; // the demo finger has no real camera feedback
          var limit = v.aimPanLimit,
            f = v.aimFollow / (T * v.aimZoom);
          this.aimPan = {
            x: Math.max(-limit, Math.min(limit, m.x * f)),
            y: Math.max(-limit, Math.min(limit, -m.y * f))
          };
          this.aim = solveAim(pull.x, pull.y, this.store.stats().maxSpeed);
        };
        _proto.onTouchMove = function onTouchMove(e) {
          if (this.mode === 'settings' && this.settingsDrag) {
            this.setSlider(this.settingsDrag, this.point(e).x);
            return;
          }
          if (this.factoryDrag && e.getID() === this.factoryDrag.id) {
            this.dragFactory(this.point(e).y);
            return;
          }
          if (e.getID() !== this.touchId) return;
          var p = this.point(e);
          this.touchCur = p;
          this.updateAim({
            x: p.x - this.touchStart.x,
            y: p.y - this.touchStart.y
          }, p);
          this.fingerEdge = p.y + this.H / 2; // distance from the bottom edge
          if (this.aim && this.mode === 'idle') {
            this.mode = 'aim';
            this.hint.node.active = false;
            this.setCards(false);
          }
          if (this.mode === 'aim') {
            this.drawAim();
            this.updateCancelZone();
          } else if (this.mode === 'idle') this.drawAim(); // idle keeps showing the previous arc as a ghost guide
        }

        /** The further the finger goes down, the redder the bottom of the screen becomes; letting go there cancels the shot. */;
        _proto.updateCancelZone = function updateCancelZone() {
          var ramp = CONFIG.aim.cancelRampPx,
            t = Math.max(0, Math.min(1, 1 - this.fingerEdge / ramp));
          this.cancelRoot.active = true;
          this.cancelFade.opacity = Math.round(255 * Math.pow(t, 1.2));
          var inside = this.fingerEdge < CONFIG.aim.cancelEdgePx;
          this.cancelLabel.node.setScale(inside ? 1.12 : 1, inside ? 1.12 : 1);
        }

        /** A white double ring under the finger and a dashed line back to where it first touched. */;
        _proto.drawTouch = function drawTouch() {
          var g = this.touchGfx,
            down = this.touchId !== null && (this.mode === 'idle' || this.mode === 'aim');
          g.clear();
          if (!down) return;
          var a = this.touchStart,
            b = this.touchCur,
            dx = b.x - a.x,
            dy = b.y - a.y,
            len = Math.hypot(dx, dy);
          g.strokeColor = new Color(255, 255, 255, 235);
          g.lineWidth = 4;
          if (len > 24) {
            var ux = dx / len,
              uy = dy / len,
              dash = 16,
              gap = 11;
            for (var _t = 0; _t < len - 30; _t += dash + gap) {
              g.moveTo(a.x + ux * _t, a.y + uy * _t);
              g.lineTo(a.x + ux * Math.min(len - 30, _t + dash), a.y + uy * Math.min(len - 30, _t + dash));
            }
            g.stroke();
            g.fillColor = new Color(255, 255, 255, 200);
            g.circle(a.x, a.y, 6);
            g.fill();
          }
          g.lineWidth = 4;
          g.circle(b.x, b.y, 40);
          g.stroke();
          g.lineWidth = 3;
          g.circle(b.x, b.y, 24);
          g.stroke();
        };
        _proto.onTouchEnd = function onTouchEnd(e) {
          if (this.settingsHold && e.getID() === this.settingsHold.id) {
            this.settingsHold = null;
            this.openSettings();
            return;
          }
          if (this.settingsDrag) {
            this.settingsDrag = null;
            return;
          }
          if (this.factoryDrag && e.getID() === this.factoryDrag.id) {
            var d = this.factoryDrag;
            this.factoryDrag = null;
            if (!d.moved && this.mode === 'factory') this.factoryTouch(d.p);
            return;
          }
          if (this.coinHold && e.getID() === this.coinHold.id) {
            this.coinHold = null;
            return;
          }
          if (this.factoryHold && e.getID() === this.factoryHold.id) {
            this.factoryHold = null;
            this.openFactory();
            return;
          }
          if (e.getID() !== this.touchId) return;
          this.touchId = null;
          var cancelled = this.mode === 'aim' && this.fingerEdge < CONFIG.aim.cancelEdgePx;
          this.cancelRoot.active = false;
          if (cancelled) {
            this.showToast(t('已取消发射'));
            this.store.bumpStat('cancels');
            this.enterIdle();
          } else if (this.mode === 'aim' && this.aim) this.fire(this.aim);else if (this.mode === 'aim') this.enterIdle();
          this.aim = null;
          this.aimPan = {
            x: 0,
            y: 0
          };
        };
        _proto.onTouchCancel = function onTouchCancel(e) {
          if (this.settingsHold && e.getID() === this.settingsHold.id) {
            this.settingsHold = null;
            return;
          }
          if (this.factoryDrag && e.getID() === this.factoryDrag.id) {
            this.factoryDrag = null;
            return;
          }
          if (this.factoryHold && e.getID() === this.factoryHold.id) {
            this.factoryHold = null;
            return;
          }
          if (this.coinHold && e.getID() === this.coinHold.id) {
            this.coinHold = null;
            return;
          }
          if (e.getID() !== this.touchId) return;
          this.touchId = null;
          this.aim = null;
          this.aimPan = {
            x: 0,
            y: 0
          };
          this.cancelRoot.active = false;
          if (this.mode === 'aim') this.enterIdle();
        }

        /** Only a short stub of the real arc: enough to read direction and power without giving away the landing point.
         *  Over it, the previous shot's full arc as a faint ghost: remember where the last one went, but this one stays hidden. */;
        _proto.drawAim = function drawAim() {
          var g = this.aimGfx,
            aim = this.aim;
          g.clear();
          if (this.lastPath.length > 1) {
            g.strokeColor = new Color(190, 226, 255, 165);
            g.lineWidth = 3; // faint but readable over any tile art
            // The sim leaves one path point every 2 ms: a deep mine's long flight can hold tens of thousands of them.
            // Drawing every point would push the Graphics past the engine's 65535-vertex upload limit ("Length out of
            // range of buffer") — thin the path to ~320 points first, then dash by pen toggle, never by inner loops.
            var path = this.lastPath;
            var stride = Math.max(1, Math.ceil(path.length / 320));
            var dash = 0.9,
              acc = 0,
              pen = true;
            var a0 = path[0];
            var total = 0;
            for (var i = stride; i < path.length; i += stride) {
              var b = path[i];
              total += Math.hypot(b.x - a0.x, b.y - a0.y);
              a0 = b;
            }
            if (total > 320 * 1.8) dash = total / 320; // keep ≤ ~320 dashes even on absurdly long paths
            a0 = path[0];
            g.moveTo(this.terrain.px(a0.x), -a0.y * T);
            for (var _i2 = stride; _i2 < path.length; _i2 += stride) {
              var _b = path[_i2];
              var seg = Math.hypot(_b.x - a0.x, _b.y - a0.y);
              a0 = _b;
              if (!(seg > 1e-9)) continue;
              acc += seg;
              if (acc >= dash) {
                acc = 0;
                pen = !pen;
              }
              var px = this.terrain.px(_b.x),
                py = -_b.y * T;
              if (pen) g.lineTo(px, py);else g.moveTo(px, py);
            }
            g.stroke();
          }
          if (!aim) return;
          var length = CONFIG.aim.guideTiles,
            spacing = 0.36; // fixed length: it must not reveal how hard the shot is
          g.fillColor = new Color(255, 255, 255, 240);
          var last = flightPoint(aim, 0),
            travelled = 0,
            nextDot = 0;
          for (var _t2 = 0; _t2 < aim.flightTime && travelled < length; _t2 += 0.004) {
            var p = flightPoint(aim, _t2);
            travelled += Math.hypot(p.x - last.x, p.y - last.y);
            last = p;
            if (travelled >= nextDot) {
              g.circle(this.terrain.px(p.x), -p.y * T, 4.2 * (1 - 0.45 * travelled / length));
              nextDot += spacing;
            }
          }
          g.fill();
        }

        // ---------------------------------------------------------------- shot flow
        ;

        _proto.enterIdle = function enterIdle() {
          this.mode = 'idle';
          this.returning = Math.abs(this.camX - CONFIG.cannon.x) > 10;
          this.sim = null;
          this.drill.node.active = false;
          this.clearFlames();
          this.aimGfx.clear();
          this.recordGfx.clear();
          this.depthLabel.node.active = false;
          this.fuelGfx.node.active = false;
          this.setCards(true);
          this.refreshHud();
          this.refreshShells();
        };
        _proto.muzzleFlash = function muzzleFlash(aim) {
          var dx = Math.cos(aim.angle),
            dy = -Math.sin(aim.angle);
          for (var i = 0; i < 16; i++) this.spawnFlame(aim.muzzleX * T, -aim.muzzleY * T, -dx, -dy, 30);
        };
        _proto.fire = function fire(aim) {
          var sim = ShotSim.start(this.map, this.store.nextShotId, aim, this.store.maxFuel, this.store.drillPower, this.store.stats().mods);
          if (!this.store.startShot(sim.state)) {
            this.showToast(t('炮弹用完了'));
            this.enterIdle();
            return;
          }
          this.luckyShell(aim); // sometimes the shot itself pays: golden muzzle, coins fly to the wallet mid-flight
          // no aimGfx.clear() here: the previous shot's FULL arc stays on screen through this whole flight (tick redraws it every frame)
          this.barrelKick = 1;
          this.lastShotAngle = aim.angle * 180 / Math.PI; // after firing the barrel rests at the shot's own angle
          Sound.play('shoot');
          this.muzzleFlash(aim);
          this.startSim(sim);
          this.refreshShells();
        };
        _proto.resume = function resume(cp) {
          this.startSim(new ShotSim(this.map, cp));
          this.terrain.syncBodies();
          if (this.sim.done) this.beginSettle();
        };
        _proto.startSim = function startSim(sim) {
          this.sim = sim;
          this.mode = 'shot';
          this.returning = false;
          this.lastTail = null;
          this.acc = 0;
          this.rx = sim.state.x;
          this.ry = sim.state.y;
          this.pathPts = [{
            x: sim.state.x,
            y: sim.state.y
          }]; // the previous shot's FULL arc stays on screen the whole flight — not just the stub at the muzzle
          this.checkpointTimer = 0;
          this.recordDepth = this.store.data.bestDepth;
          this.recordPassed = sim.state.maxDepth > this.recordDepth;
          this.drawRecord();
          this.drill.node.active = true;
          this.hint.node.active = false;
          this.setCards(false);
          this.adButton.active = false;
          this.depthLabel.node.active = true;
          this.fuelGfx.node.active = true;
          this.syncDrill();
        };
        _proto.drawRecord = function drawRecord() {
          var g = this.recordGfx;
          g.clear();
          if (this.recordDepth < 1) return;
          var y = -this.recordDepth * T,
            x0 = this.map.left * T,
            x1 = (this.map.left + this.map.width) * T;
          g.lineWidth = 3;
          g.strokeColor = new Color(255, 232, 150, 190);
          var step = Math.max(26, (x1 - x0) / 240); // dash count capped like the aim path: a grown world spans tens of thousands of px
          for (var x = x0; x < x1; x += step) {
            g.moveTo(x, y);
            g.lineTo(x + step * 0.55, y);
          }
          g.stroke();
        };
        _proto.stepSim = function stepSim(dt) {
          var _this3 = this;
          var sim = this.sim;
          this.acc += Math.min(dt, 0.1);
          var px = sim.state.x,
            py = sim.state.y;
          while (this.acc >= TICK && !sim.done) {
            px = sim.state.x;
            py = sim.state.y;
            sim.tick();
            this.acc -= TICK;
          }
          if (this.map.bodies.length !== this.bodyCount) {
            this.bodyCount = this.map.bodies.length;
            this.terrain.syncNewBodies();
          } // ore bodies that came with freshly grown ground get their sprites
          // Render between the last two fixed ticks so fast shells move smoothly at any frame rate.
          var alpha = sim.done ? 1 : Math.min(1, this.acc / TICK);
          this.rx = px + (sim.state.x - px) * alpha;
          this.ry = py + (sim.state.y - py) * alpha;
          var tail = this.pathPts[this.pathPts.length - 1];
          if ((sim.state.phase === 'flight' || sim.state.phase === 'dig') && (!tail || Math.hypot(this.rx - tail.x, this.ry - tail.y) > 0.7)) this.pathPts.push({
            x: this.rx,
            y: this.ry
          }); // the ghost shows the whole arc: flight AND the bored tunnel
          var _loop = function _loop() {
            var e = _step5.value;
            if (e.type === 'land') {
              _this3.burst(sim.state.x, 0.1, 'grass', 7);
              _this3.pushFx('land', sim.state.x, 0.25, 2.6, 0.35);
              Sound.play('land');
            } else if (e.type === 'clear') {
              var _this3$map$xy = _this3.map.xy(e.idx),
                x = _this3$map$xy[0],
                y = _this3$map$xy[1];
              if (!_this3.speed100) _this3.burst(x + 0.5, y + 0.5, e.cell === CELL.ROCK ? 'rock' : isOre(e.cell) ? 'gold' : 'dirt', e.cell === CELL.MUD ? 2 : 4);
              _this3.popCoins += e.coins;
              Sound.play("dig" + (1 + Math.floor(Math.random() * 3)), 0.7, 0.07);
            } else if (e.type === 'bodyHit') {
              _this3.terrain.syncBodies();
              _this3.terrain.hitBody(e.bodyId);
              _this3.drillShake = 1;
            } else if (e.type === 'bodyBreak') {
              _this3.terrain.syncBodies();
              var b = _this3.map.bodies.find(function (bb) {
                return bb.id === e.bodyId;
              }); // ids are position-keyed: look the body up by id, not array index
              for (var i = 0; i < 12; i++) _this3.burst(b.x + Math.random() * b.width, b.y + Math.random() * b.height, 'gold', 2);
              _this3.pushFx('break', b.x + b.width / 2, b.y + b.height / 2, Math.max(2.5, Math.max(b.width, b.height) * 0.9), 0.5);
              _this3.popCoins += e.coins;
              _this3.store.bumpStat('bodiesBroken');
              _this3.showToast(t('大金块破碎！'));
              Sound.play('coin');
            } else if (e.type === 'blast' || e.type === 'magnet') {
              _this3.spawnRing(e.x, e.y, e.radius, e.type === 'blast');
              if (e.type === 'blast') {
                _this3.store.bumpStat('blasts');
                Sound.play('blast');
              } else if (e.pulse) {
                _this3.store.bumpStat('pulses');
                _this3.drillShake = Math.max(_this3.drillShake, 0.5);
                Sound.play('blast', 0.35, 0.12);
              } // 磁场炸弹：小炸一下，抖一抖
            }
          };

          for (var _iterator5 = _createForOfIteratorHelperLoose(sim.events.splice(0)), _step5; !(_step5 = _iterator5()).done;) {
            _loop();
          }
          var s = sim.state;
          if (!this.recordPassed && this.recordDepth >= 1 && s.y > this.recordDepth) {
            this.recordPassed = true;
            this.store.bumpStat('records');
            this.showToast(t('刷新纪录！'));
          }
          this.syncDrill();
          this.emitFlame();
          this.depthLabel.string = t(Math.max(0, Math.floor(s.y)) + " \u7C73");
          this.drawFuel(Math.min(1, s.fuel / s.maxFuel)); // 满级充能可以超过满条，能量条最多画满

          this.popTimer -= dt;
          if (this.popCoins > 0 && this.popTimer <= 0) {
            this.popText("+" + this.popCoins);
            this.popCoins = 0;
            this.popTimer = 0.28;
          } // 挖矿金币只弹字不配音（每块都响太吵）；大金块破碎与钱包进账的单响保留

          this.checkpointTimer += dt;
          if (this.checkpointTimer >= 0.25 && !sim.done) {
            this.checkpointTimer = 0;
            this.store.saveCheckpoint(s);
          }
          if (sim.done) {
            this.store.saveCheckpoint(s);
            if (s.overheat && s.overheat > 0.05) this.store.bumpStat('overdrives');
            this.mode = 'freeze';
            this.modeTimer = CONFIG.settle.freezeSeconds;
          }
        };
        _proto.syncDrill = function syncDrill() {
          var s = this.sim.state,
            h = PROJ_LENGTH;
          var px = this.terrain.px(this.rx) - s.dirX * (h / 2 - CONFIG.sim.carveRadius * T),
            py = -this.ry * T + s.dirY * (h / 2 - CONFIG.sim.carveRadius * T);
          var big = Math.max(1, 0.55 / this.zoom);
          this.drill.node.setScale(big, big);
          var fx = CONFIG.hitFeedback,
            k = this.drillShake,
            side = (Math.random() - 0.5) * 2 * fx.drillShakePx * k,
            along = (Math.random() - 0.5) * 2 * fx.drillShakePx * k;
          this.drill.node.setPosition(px + s.dirY * side + s.dirX * along, py + s.dirX * side - s.dirY * along);
          this.drill.node.angle = Math.atan2(s.dirX, s.dirY) * 180 / Math.PI - 90 + (Math.random() - 0.5) * 2 * fx.drillShakeDeg * k;
        };
        _proto.drawFuel = function drawFuel(k) {
          var g = this.fuelGfx,
            w = 330,
            h = 12;
          if (!Sound.settings.bars) {
            if (g.node.active) g.node.active = false;
            return;
          } // 横条跟竖条同一个开关
          g.clear();
          g.fillColor = new Color(12, 16, 38, 210);
          g.roundRect(-w / 2 - 3, -h / 2 - 3, w + 6, h + 6, 8);
          g.fill();
          if (k > 0.002) {
            g.fillColor = k > 0.3 ? new Color(255, 158, 34, 255) : new Color(255, 76, 62, 255);
            g.roundRect(-w / 2, -h / 2, Math.max(8, w * k), h, 6);
            g.fill();
          }
        };
        _proto.refreshShells = function refreshShells() {
          this.store.syncShells();
          var shells = this.store.data.shells,
            left = this.store.secondsToNextShell();
          var timer = left > 0 ? "  " + Math.floor(left / 60) + ":" + (left % 60 < 10 ? '0' : '') + left % 60 : '';
          var infinite = this.store.devInfiniteShells;
          this.shellLabel.string = infinite ? t('∞ 开发模式') : shells + "/" + this.store.stats().maxShells + timer; // v1.1.0：上限跟着弹药仓走，不再写死基础值
          if (this.mode !== 'idle') return;
          var empty = !this.store.canFire;
          this.adButton.active = empty;
          if (empty && !this.adPending) this.adLabel.string = t("\u5E03\u6EE1\u7535\u94BB\u5BFC\u5F39 +" + CONFIG.shells.adReward + " \u70AE\u5F39\uFF08\u6D4B\u8BD5\uFF09");
          this.hint.string = t(empty ? '炮弹用完了' : '向后拖动，松手发射');
          this.hint.node.active = empty || this.store.data.lastSettledShot === 0;
        }

        // Listens on the window because the engine only receives keys while its canvas has focus.
        /** Long-pressing the coin counter for three seconds turns test mode on or off, same as pressing the slash key. */;
        _proto.toggleTestMode = function toggleTestMode() {
          this.store.devInfiniteShells = !this.store.devInfiniteShells;
          this.showToast(t(this.store.devInfiniteShells ? '测试模式：无限炮弹 开' : '测试模式：无限炮弹 关'));
          this.refreshShells();
        }

        /** Long-press on settings: shells are unlimited and the shot plays out 100 times faster, for testing. */;
        _proto.toggleSpeedMode = function toggleSpeedMode() {
          this.speed100 = !this.speed100;
          Sound.muted = this.speed100;
          this.store.devInfiniteShells = this.speed100;
          this.showToast(t(this.speed100 ? '测试模式：100 倍速 + 无限炮弹 开' : '测试模式：100 倍速 关'), 2);
          this.refreshShells();
        };
        _proto.watchAd = /*#__PURE__*/function () {
          var _watchAd = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var rewarded;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!this.adPending) {
                    _context2.next = 2;
                    break;
                  }
                  return _context2.abrupt("return");
                case 2:
                  this.adPending = true;
                  this.adLabel.string = t('加载中…');
                  rewarded = false;
                  _context2.prev = 5;
                  _context2.next = 8;
                  return rewardedAd.show();
                case 8:
                  rewarded = _context2.sent;
                  _context2.next = 14;
                  break;
                case 11:
                  _context2.prev = 11;
                  _context2.t0 = _context2["catch"](5);
                  rewarded = false;
                case 14:
                  this.adPending = false;
                  if (this.isValid) {
                    _context2.next = 17;
                    break;
                  }
                  return _context2.abrupt("return");
                case 17:
                  if (rewarded) {
                    this.store.grantAdShells();
                    this.store.bumpStat('ads');
                    this.showToast(t("\u70AE\u5F39 +" + CONFIG.shells.adReward));
                  } else this.showToast(t('广告暂不可用，稍后再试'));
                  this.refreshShells();
                case 19:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this, [[5, 11]]);
          }));
          function watchAd() {
            return _watchAd.apply(this, arguments);
          }
          return watchAd;
        }();
        _proto.saveProgress = function saveProgress() {
          if (this.sim && (this.mode === 'shot' || this.mode === 'freeze')) this.store.saveCheckpoint(this.sim.state);
        }

        // ---------------------------------------------------------------- settlement
        ;

        _proto.beginSettle = function beginSettle() {
          var state = this.sim.state;
          this.store.flushPlay(this.playAcc);
          this.playAcc = 0;
          this.lastPath = this.pathPts; // the arc just flown becomes next round's ghost guide
          this.store.settle(state, this.map); // committed before any animation plays
          Sound.play('settle');
          this.mode = 'settle';
          this.depthLabel.node.active = false;
          this.fuelGfx.node.active = false;
          this.buildSettleCard(state);
        };
        _proto.buildSettleCard = function buildSettleCard(s) {
          var _this4 = this;
          var root = this.settleRoot;
          root.destroyAllChildren();
          root.active = true;
          var all = RESOURCE_KEYS.filter(function (k) {
            return s.harvest[k] > 0;
          }).sort(function (a, b) {
            var _RES_COIN$b, _RES_COIN$a;
            return s.harvest[b] * ((_RES_COIN$b = RES_COIN[b]) != null ? _RES_COIN$b : 1) - s.harvest[a] * ((_RES_COIN$a = RES_COIN[a]) != null ? _RES_COIN$a : 1);
          });
          var kinds = all.slice(0, 7);
          var hiddenCoins = all.slice(7).reduce(function (sum, k) {
            var _RES_COIN$k;
            return sum + s.harvest[k] * ((_RES_COIN$k = RES_COIN[k]) != null ? _RES_COIN$k : 1);
          }, 0);
          var cardH = 250 + kinds.length * 64 + (kinds.length ? 76 : 0); // 底部多留一行放金币总额
          root.setPosition(0, -40);
          panel(root, 590, cardH);
          var reason = {
            bottom: '到达地图边缘',
            edge: '前面是更硬的岩壁',
            blocked: '被炮台底座挡住',
            lost: '炮弹飞走了',
            fuel: '燃料耗尽',
            hard: '岩层太硬，需要更好的钻头',
            bedrock: '触到了世界基岩',
            '': '燃料耗尽'
          }[s.stopReason];
          label(root, t(reason), 36, 0, cardH / 2 - 54, GOLD);
          label(root, t("\u6700\u6DF1 " + Math.floor(s.maxDepth) + " \u7C73"), 28, -130, cardH / 2 - 112);
          label(root, t("\u7834\u5757 " + s.blocks), 28, 130, cardH / 2 - 112);
          this.flyers = [];
          var c = CONFIG.settle,
            target = this.factoryButton.position.clone(),
            walletT = this.walletRoot.position;
          this.factoryButton.active = true; // the resources fly to it, so it must be on screen
          kinds.forEach(function (k, i) {
            var _RES_COIN$k2;
            var y = cardH / 2 - 182 - i * 64,
              n = s.harvest[k],
              total = n * ((_RES_COIN$k2 = RES_COIN[k]) != null ? _RES_COIN$k2 : 1) + (i === kinds.length - 1 ? hiddenCoins : 0);
            var iconW = 46;
            _this4.resSprite(k, root, iconW, iconW, -215, y);
            label(root, t(RESOURCE_NAME[k] + " \xD7" + n), 26, -175, y, Color.WHITE, 'left');
            sprite('coin', root, 28, 29, 112, y);
            label(root, "+" + total, 28, 136, y, GOLD, 'left');
            var icons = Math.min(c.maxIconsPerType, Math.max(1, Math.ceil(n / 4)));
            for (var j = 0; j < icons; j++) {
              // the ore icons arc over to the factory button: they are the mined goods themselves
              var f = _this4.resSprite(k, _this4.hud, 44, 44, -215, y - 40).node;
              f.active = false;
              var from = new Vec3(-215 + j * 16, y - 40, 0);
              var side = (_this4.flyers.length % 2 ? 1 : -1) * (70 + j * 26);
              var ctrl = new Vec3((from.x + target.x) / 2 + 170 + side, Math.max(from.y, target.y) - 40 + side * 0.35, 0);
              _this4.flyers.push({
                node: f,
                from: from,
                ctrl: ctrl,
                to: target.clone(),
                delay: c.cardSeconds + i * c.flyStagger + j * 0.05,
                time: 0,
                coins: 0
              });
            }
            var nCoins = Math.min(c.maxIconsPerType, Math.max(1, Math.ceil(total / 120))); // the row's coins fly one by one into the top-left wallet, where the number counts up
            for (var _j = 0; _j < nCoins; _j++) {
              var coins = _j === nCoins - 1 ? total - Math.floor(total / nCoins) * (nCoins - 1) : Math.floor(total / nCoins);
              var _f = sprite('coin', _this4.hud, 30, 31, 0, 0).node;
              _f.active = false;
              var _from = new Vec3(96 + _j * 22, y, 0);
              var _side = (_this4.flyers.length % 2 ? 1 : -1) * (60 + _j * 24);
              var _ctrl = new Vec3((_from.x + walletT.x) / 2 + _side, Math.max(_from.y, walletT.y) - 70 - _side * 0.35, 0);
              _this4.flyers.push({
                node: _f,
                from: _from,
                ctrl: _ctrl,
                to: new Vec3(walletT.x - 70, walletT.y, 0),
                delay: c.cardSeconds + i * c.flyStagger + 0.025 + _j * 0.05,
                time: 0,
                coins: coins,
                coin: true
              });
            }
          });
          if (!kinds.length) label(root, t('本炮没有新收获'), 26, 0, cardH / 2 - 182, SOFT);else {
            // 结算卡最下面一行：这一炮的金币总额（含各类矿石折现与加成，就是实际入账数）
            var y = cardH / 2 - 182 - kinds.length * 64;
            sprite('coin', root, 36, 37, -118, y);
            label(root, "+" + s.coins, 38, -76, y, GOLD, 'left');
            label(root, t('金币总额'), 24, 138, y, SOFT, 'right');
          }
          this.shownWallet = this.store.data.wallet - s.coins;
          this.refreshHud();
          this.modeTimer = this.flyers.length ? 0 : 0.9;
        };
        _proto.stepSettle = function stepSettle(dt) {
          var live = this.bonus.length > 0; // a lucky-shell coin still in the air keeps the card open until it lands in the wallet
          for (var _iterator6 = _createForOfIteratorHelperLoose(this.flyers), _step6; !(_step6 = _iterator6()).done;) {
            var f = _step6.value;
            if (f.time >= 1) continue;
            live = true;
            if (f.delay > 0) {
              f.delay -= dt;
              continue;
            }
            f.node.active = true;
            f.time = Math.min(1, f.time + dt / CONFIG.settle.flySeconds);
            var _t3 = f.time < 0.5 ? 2 * f.time * f.time : 1 - Math.pow(-2 * f.time + 2, 2) / 2,
              u = 1 - _t3;
            f.node.setPosition(u * u * f.from.x + 2 * u * _t3 * f.ctrl.x + _t3 * _t3 * f.to.x, u * u * f.from.y + 2 * u * _t3 * f.ctrl.y + _t3 * _t3 * f.to.y);
            var scale = 1 - 0.3 * _t3;
            f.node.setScale(scale, scale);
            if (f.time >= 1) {
              f.node.destroy();
              if (f.coin) {
                // a coin landed in the wallet: the number counts up and the panel pulses
                this.shownWallet += f.coins;
                this.walletPulse = 1;
                this.walletLabel.string = String(Math.round(this.shownWallet));
                Sound.play('coin', 0.5, 0.08);
              } else this.factoryBounce = 1; // an ore landed in the workshop: the button bounces
            }
          }

          if (live) {
            this.modeTimer = CONFIG.settle.holdSeconds;
            return;
          }
          if (this.flyers.length && this.shownWallet !== this.store.data.wallet) {
            // once every coin landed, snap to the exact credit (coin bonuses live here)
            this.shownWallet = this.store.data.wallet;
            this.walletLabel.string = String(Math.round(this.shownWallet));
          }
          this.modeTimer -= dt;
          if (this.modeTimer <= 0 && this.fadeState === 'none') {
            this.fadeState = 'out';
            this.fadeT = 0;
            this.fadeNode.active = true;
            Sound.play('wipe', 0.6);
          }
        }

        /**
         * Screen wipe between a settled shot and the cannon: white pixel bars slide in from the left, those at the
         * top and bottom first and the middle ones last, until they meet in the middle and cover the screen. The scene
         * is swapped underneath, then the bars slide away from the middle outward to reveal the cannon.
         */;
        _proto.drawWipe = function drawWipe(cover, t) {
          var g = this.fadeNode.getComponent(Graphics),
            W = this.W,
            H = this.H,
            n = 14,
            bh = H / n,
            dur = 0.3,
            step = 0.035,
            px = 12,
            soft = 8;
          var ease = function ease(u) {
            u = Math.max(0, Math.min(1, u));
            return u * u * (3 - 2 * u);
          };
          g.clear();
          for (var row = 0; row < n; row++) {
            var fromEdge = Math.min(row, n - 1 - row),
              fromMiddle = n / 2 - 1 - fromEdge;
            var y = H / 2 - (row + 1) * bh;
            // cover: the right end advances; reveal: the left end advances (so the bar slides out to the right)
            var u = ease((t - (cover ? fromEdge : fromMiddle) * step) / dur);
            var total = W + soft * px;
            var left = cover ? -W / 2 : -W / 2 + u * total,
              right = cover ? -W / 2 + u * total : W / 2 + soft * px;
            if (right - left <= 0) continue;
            // solid body with a stepped gradient at the leading end, drawn as chunky pixels
            var bodyL = cover ? left : left + soft * px,
              bodyR = cover ? right - soft * px : right;
            g.fillColor = new Color(255, 255, 255, 255);
            if (bodyR > bodyL) {
              g.rect(Math.max(-W / 2, bodyL), y, Math.min(W / 2, bodyR) - Math.max(-W / 2, bodyL), bh + 1);
              g.fill();
            }
            for (var k = 0; k < soft; k++) {
              var a = Math.round(235 * (1 - k / soft)),
                x0 = cover ? bodyR + k * px : bodyL - (k + 1) * px;
              if (x0 + px < -W / 2 || x0 > W / 2) continue;
              g.fillColor = new Color(255, 255, 255, a);
              g.rect(x0, y, px, bh + 1);
              g.fill();
            }
          }
        };
        _proto.wipeCoverSeconds = function wipeCoverSeconds() {
          return 0.3 + (14 / 2 - 1) * 0.035;
        };
        _proto.stepFade = function stepFade(dt) {
          if (this.fadeState === 'none') return;
          this.fadeT += dt;
          var hold = 0.08,
            reveal = this.wipeCoverSeconds();
          if (this.fadeState === 'out') {
            this.drawWipe(true, this.fadeT);
            if (this.fadeT >= this.wipeCoverSeconds()) {
              this.drawWipe(true, 10); // fully covered
              this.flyers = [];
              this.settleRoot.destroyAllChildren();
              this.settleRoot.active = false;
              this.shownWallet = this.store.data.wallet;
              this.enterIdle();
              this.returning = false;
              this.snapCamera();
              this.fadeState = 'hold';
              this.fadeT = 0;
            }
          } else if (this.fadeState === 'hold') {
            if (this.fadeT >= hold) {
              this.fadeState = 'in';
              this.fadeT = 0;
            }
          } else {
            this.drawWipe(false, this.fadeT);
            if (this.fadeT >= reveal) {
              this.fadeState = 'none';
              this.fadeNode.active = false;
              this.fadeNode.getComponent(Graphics).clear();
            }
          }
        }

        // ---------------------------------------------------------------- effects & frame
        ;

        _proto.burst = function burst(x, y, art, count) {
          for (var i = 0; i < count; i++) {
            var n = this.debrisPool.pop();
            if (!n) n = sprite(art, this.fx, 9, 9).node;
            var s = n.getComponent(Sprite);
            s.spriteFrame = frame(art);
            n.active = true;
            n.setPosition(this.terrain.px(x), -y * T);
            var size = 6 + Math.random() * 7;
            n.getComponent(UITransform).setContentSize(size, size);
            this.debris.push({
              node: n,
              vx: (Math.random() - 0.5) * 300,
              vy: 60 + Math.random() * 190,
              life: 0.28 + Math.random() * 0.24
            });
          }
        };
        _proto.popText = function popText(text) {
          var _this$sim;
          var s = (_this$sim = this.sim) == null ? void 0 : _this$sim.state;
          if (!s) return;
          var l = label(this.fx, text, 28, this.terrain.px(s.x) + 48, -s.y * T + 24, GOLD);
          var op = l.node.addComponent(UIOpacity);
          this.debris.push({
            node: l.node,
            vx: 0,
            vy: 72,
            life: -0.75
          });
          op.opacity = 255;
        };
        _proto.showToast = function showToast(text, seconds) {
          if (seconds === void 0) {
            seconds = 1.2;
          }
          this.toast.string = text;
          this.toast.node.active = true;
          this.toastTime = seconds;
        };
        _proto.pulse = function pulse(n) {
          var base = n.scale.clone();
          n.setScale(base.x * 1.08, base.y * 0.94);
          this.scheduleOnce(function () {
            if (n.isValid) n.setScale(base);
          }, 0.09);
        }

        // ---------------------------------------------------------------- barrel and energy bar

        /** The barrel turns to the aim, kicks back on firing, and flips so it never hangs upside down when aimed backward. */
        /** Swaps barrel, support and shell art to the look for the current cannon level. */;
        _proto.applyCannonTier = function applyCannonTier() {
          var t = artTier(this.store.skillLevel('cannon'));
          if (t === this.cannonTierShown) return;
          this.cannonTierShown = t;
          this.barrelSprite.spriteFrame = frame("cannon_barrel_" + t);
          this.supportSprite.spriteFrame = frame("cannon_support_" + t);
        }

        /** The drill head wears the Eagle shell art for the current 钻力 level — ten drill-force levels, ten art tiers, maxed = lv10. */;
        _proto.applyDrillTier = function applyDrillTier() {
          var t = artTier(this.store.data.drillLevel);
          if (t === this.drillTierShown) return;
          this.drillTierShown = t;
          this.drill.spriteFrame = frame("proj_" + t);
        };
        _proto.stepBarrel = function stepBarrel(dt) {
          var aiming = !!this.aim && (this.mode === 'aim' || this.introActive && this.mode === 'idle');
          var target = aiming ? this.aim.angle * 180 / Math.PI : this.lastShotAngle;
          var diff = (target - this.barrelAngle + 540) % 360 - 180;
          this.barrelAngle += diff * Math.min(1, dt * 16);
          var left = Math.cos(this.barrelAngle * Math.PI / 180) < 0;
          this.barrelPivot.setScale(left ? -1 : 1, 1);
          this.barrelPivot.angle = left ? this.barrelAngle - (180 - BARREL_ART_ANGLE) : this.barrelAngle - BARREL_ART_ANGLE;
          this.barrelKick = Math.max(0, this.barrelKick - dt * 7);
          var back = this.barrelKick * 12;
          this.barrelSprite.node.setPosition(-Math.cos(BARREL_ART_ANGLE * Math.PI / 180) * back, -Math.sin(BARREL_ART_ANGLE * Math.PI / 180) * back);
        }

        /**
         * Power left to drill with: green when plentiful, red when low. Extra drive (the pull, the fall's speed and banked
         * energy) makes the same bar grow. When the drill stops the bar drains completely and nothing is left on screen.
         * SHOW_LIGHTNING 打开时，绿段顶部的 bank 部分改画成蓝色闪电段（越线的银行动能仍留在彩虹段里）。
         */;
        _proto.drawEnergy = function drawEnergy(dt) {
          var g = this.energyGfx,
            maxFuel = this.store.maxFuel,
            sBars = Sound.settings.bars;
          var fuel = maxFuel,
            bank = 0,
            visible = false,
            draining = false;
          if (this.aim && (this.mode === 'aim' || this.introActive && this.mode === 'idle')) {
            visible = true; // 火焰条已去掉：拉拽不再预告火，条子安静地显示容量
          } else if (this.mode === 'idle') {
            visible = true;
          } else if (this.sim && (this.mode === 'shot' || this.mode === 'freeze')) {
            var s = this.sim.state;
            fuel = s.fuel;
            bank = s.bank || 0; // 刹车存的动能照旧并进能量条，容量越线的部分由彩虹段表达
            draining = this.sim.done;
            visible = true;
          }
          if (!sBars) visible = false; // 设置里关掉了条：竖条永不出现
          if (g.node.active !== visible) g.node.active = visible;
          if (!visible) {
            this.shownEnergy = maxFuel;
            return;
          }
          var target = draining ? 0 : fuel + bank;
          this.shownEnergy = draining ? this.shownEnergy + (target - this.shownEnergy) * Math.min(1, dt * 10) : target;
          var total = this.shownEnergy < 0.02 ? 0 : this.shownEnergy;

          // 能量条尺子固定：满条 = 初始容量的两倍——开局满能量只到半条（白刻度线），
          // 燃料升级把容量推过 50% 之后，越线的那一截用流动的彩虹色表示。绿色段仍是低红高绿的老能量条；SHOW_LIGHTNING 打开时绿段顶部的 bank 画蓝色闪电段。
          var H = 520,
            Wd = 30,
            minPx = 3;
          var base = CONFIG.upgrades.baseFuel,
            fullScale = base * 2;
          var lerp = function lerp(a, b, t) {
            return Math.round(a + (b - a) * t);
          };
          var ratio = Math.max(0, Math.min(1, total / maxFuel));
          var col = ratio < 0.5 ? new Color(lerp(240, 255, ratio / 0.5), lerp(70, 210, ratio / 0.5), lerp(60, 50, ratio / 0.5), 255) : new Color(lerp(255, 80, (ratio - 0.5) / 0.5), lerp(210, 220, (ratio - 0.5) / 0.5), lerp(50, 90, (ratio - 0.5) / 0.5), 255);
          g.clear();
          g.fillColor = new Color(8, 12, 30, 200);
          g.roundRect(-Wd / 2 - 5, -H / 2 - 5, Wd + 10, H + 10, 12);
          g.fill();
          var greenH = Math.min(total, base) / fullScale * H;
          var topH = Math.min(total, fullScale) / fullScale * H;
          if (greenH >= minPx) {
            g.fillColor = col;
            g.roundRect(-Wd / 2, -H / 2, Wd, greenH, 7);
            g.fill();
          } // nothing is drawn once it is empty
          // 蓝色闪电段：刹车存下的动能在绿段顶部单独成段，带老版本的折线电流；排空时不画
          var bankH = !draining && greenH >= minPx ? Math.max(0, Math.min(greenH, bank / fullScale * H)) : 0;
          if (bankH >= 2) {
            var y0 = -H / 2 + greenH - bankH,
              y1 = -H / 2 + greenH;
            g.fillColor = new Color(110, 225, 255, 235);
            g.rect(-Wd / 2, y0, Wd, y1 - y0);
            g.fill();
            g.lineWidth = 3;
            g.strokeColor = new Color(255, 255, 190, 255);
            for (var k = 0; k < 2; k++) {
              // zig-zag charge
              var up = true;
              g.moveTo(-Wd / 2 + 3, y0 + 2);
              for (var y = y0 + 12; y < y1; y += 12) {
                g.lineTo(up ? Wd / 2 - 3 : -Wd / 2 + 3, y + k * 5);
                up = !up;
              }
              g.stroke();
            }
          }
          if (topH - greenH >= 2) {
            for (var _k = 0; _k < 12; _k++) {
              var _y = -H / 2 + greenH + (topH - greenH) * _k / 12,
                _y2 = -H / 2 + greenH + (topH - greenH) * (_k + 1) / 12;
              var h = ((_k / 12 - this.time * 0.35) % 1 + 1) % 1,
                kk = h * 6;
              var r = Math.max(0, Math.min(1, Math.abs(kk % 6 - 3) - 1)),
                gr = Math.max(0, Math.min(1, 2 - Math.abs(kk % 6 - 2))),
                b = Math.max(0, Math.min(1, 2 - Math.abs(kk % 6 - 4)));
              g.fillColor = new Color(Math.round(60 + 195 * r), Math.round(60 + 195 * gr), Math.round(60 + 195 * b), 240);
              g.rect(-Wd / 2, _y, Wd, _y2 - _y + 0.7);
              g.fill();
            }
          }
          g.lineWidth = 2; // 初始容量刻度：新钻头满能量正好停在这条线上
          g.strokeColor = new Color(255, 255, 255, 170);
          g.moveTo(-Wd / 2 - 8, -H / 2 + H / 2);
          g.lineTo(Wd / 2 + 8, -H / 2 + H / 2);
          g.stroke();
          g.lineWidth = 3;
          g.strokeColor = new Color(255, 255, 255, 220);
          g.roundRect(-Wd / 2 - 5, -H / 2 - 5, Wd + 10, H + 10, 12);
          g.stroke();
        }

        // ---------------------------------------------------------------- first-time demo

        /** A looping demonstration of the pull: the finger drags back, the aim stub follows and the camera pans with it. */;
        _proto.stepIntro = function stepIntro(dt) {
          this.introT = (this.introT + dt) % 3.6;
          var t = this.introT,
            ease = function ease(u) {
              return u * u * (3 - 2 * u);
            },
            clamp01 = function clamp01(u) {
              return Math.max(0, Math.min(1, u));
            };
          var start = {
              x: 110,
              y: -250
            },
            drag = {
              x: -120,
              y: -150
            };
          var u = ease(clamp01((t - 0.8) / 1.4));
          var m = {
            x: drag.x * u,
            y: drag.y * u
          };
          var alpha = t < 0.4 ? t / 0.4 : t > 2.7 ? Math.max(0, 1 - (t - 2.7) / 0.35) : 1;
          var press = t > 0.5 && t < 2.7 ? 1 : 0;
          var g = this.finger;
          g.node.active = alpha > 0.01;
          g.node.setPosition(start.x + m.x, start.y + m.y);
          g.clear();
          g.fillColor = new Color(255, 255, 255, Math.round(230 * alpha));
          g.circle(0, 0, 30 - 6 * press);
          g.fill();
          g.lineWidth = 5;
          g.strokeColor = new Color(40, 60, 120, Math.round(255 * alpha));
          g.circle(0, 0, 30 - 6 * press);
          g.stroke();
          g.strokeColor = new Color(255, 255, 255, Math.round(120 * alpha * press));
          g.circle(0, 0, 46 + 6 * Math.sin(this.time * 8));
          g.stroke();
          if (t >= 0.8 && t < 2.7) {
            this.updateAim(m, null);
            this.drawAim();
          } else {
            this.aim = null;
            this.aimPan = {
              x: 0,
              y: 0
            };
            this.aimGfx.clear();
          }
        };
        _proto.endIntro = function endIntro() {
          this.finger.node.active = false;
          this.finger.clear();
          if (this.mode === 'idle') {
            this.aim = null;
            this.aimGfx.clear();
          }
          this.aimPan = {
            x: 0,
            y: 0
          };
        }

        // ---------------------------------------------------------------- factory
        ;

        _proto.resSprite = function resSprite(key, parent, w, h, x, y) {
          if (x === void 0) {
            x = 0;
          }
          if (y === void 0) {
            y = 0;
          }
          var meta = RES_ART[key],
            sp = sprite(meta.art, parent, w, h, x, y);
          if (meta.tint) sp.color = meta.tint;
          return sp;
        };
        _proto.fitLabel = function fitLabel(parent, text, size, x, y, color, width) {
          var l = label(parent, text, size, x, y, color);
          l.overflow = Label.Overflow.SHRINK;
          l.enableWrapText = false;
          l.node.getComponent(UITransform).setContentSize(width, size * 1.4);
          return l;
        }

        /** Upgrades that can be bought right now, keyed by node and level so a new level counts as new. */;
        _proto.availableUpgrades = function availableUpgrades() {
          var _this5 = this;
          return SKILLS.filter(function (n) {
            return _this5.store.skillLevel(n.id) < n.maxLevel && !_this5.store.skillLock(n.id) && _this5.store.canAfford(_this5.store.skillCost(n.id));
          }).map(function (n) {
            return n.id + ":" + _this5.store.skillLevel(n.id);
          });
        }

        /** Full red tag for an upgrade the player has not seen yet; only a small dot for ones already seen and left alone. */;
        _proto.updateFactoryBadge = function updateFactoryBadge() {
          var _this6 = this;
          var now = this.availableUpgrades(),
            fresh = now.some(function (k) {
              return !_this6.badgeSeen.has(k);
            }),
            any = now.length > 0;
          if (this.factoryBadge.active !== fresh) this.factoryBadge.active = fresh;
          var dot = any && !fresh;
          if (this.factoryDot.active !== dot) this.factoryDot.active = dot;
        }

        // ---------------------------------------------------------------- AI bot (long-press the workshop button for 3 s)

        /**
         * The auto-play bot: it aims like the tuning bot (fixed 55°, binary-searched pull, golden-ratio spread over
         * everything the cannon can reach) and buys strictly in the proven plan order, then sweeps the whole tree.
         * It plays on the real economy — no cheats — so its progress is the player's own save advancing.
         */;
        _proto.toggleBot = function toggleBot(on) {
          this.botActive = on != null ? on : !this.botActive;
          if (!this.botBadge || !this.botBadge.isValid) this.makeBotBadge();
          this.botBadge.active = this.botActive;
          if (this.botActive) {
            this.botWait = 0.4;
            this.botBuyAll();
            this.showToast(t('AI 机器人启动 · 再长按加工坊 3 秒停止'));
          } else this.showToast(t('AI 机器人已停止'));
        };
        _proto.makeBotBadge = function makeBotBadge() {
          this.botBadge = node('BotBadge', this.hud);
          label(this.botBadge, t('AI·自动中'), 24, 0, 0, new Color(96, 226, 255));
          this.botBadge.setPosition(this.factoryButton.position.x, this.factoryButton.position.y + 58);
        }

        // ---------------------------------------------------------------- recommendation (推荐 tag)

        /**
         * The current recommendation is the first ROUTE step the player has not completed yet: every completed step
         * hands its 推荐 tag to the next item, so the ladder walks the 1000-run consensus order as the player buys.
         */;
        _proto.recStep = function recStep() {
          var _this7 = this;
          var done = function done(s) {
            return s.item === 'fuel' ? _this7.store.data.fuelLevel >= s.lv : s.item === 'drill' ? _this7.store.data.drillLevel >= s.lv : _this7.store.skillLevel(s.item) >= s.lv;
          };
          while (this.recIndex < GameRoot.ROUTE.length && done(GameRoot.ROUTE[this.recIndex])) this.recIndex++;
          return this.recIndex < GameRoot.ROUTE.length ? GameRoot.ROUTE[this.recIndex] : null;
        }

        /** A small red 推荐 tag hung on a workshop node or an upgrade card. */;
        _proto.recBadge = function recBadge(parent, x, y) {
          var old = parent.getChildByName('RecTag');
          if (old) {
            old.active = true;
            return;
          }
          var b = node('RecTag', parent, x, y);
          var g = node('RecBg', b).addComponent(Graphics);
          g.fillColor = new Color(232, 68, 52, 240);
          g.roundRect(-31, -15, 62, 30, 9);
          g.fill();
          label(b, t('推荐'), 19, 0, 0, Color.WHITE);
          b.setScale(1.18, 1.18, 1);
        }

        /** Show the 推荐 tag on the fuel/drill cards when they are the current step (tree nodes get it in rebuildFactory). */;
        _proto.updateRecommend = function updateRecommend() {
          var rec = this.recStep();
          for (var _iterator7 = _createForOfIteratorHelperLoose(this.cards), _step7; !(_step7 = _iterator7()).done;) {
            var c = _step7.value;
            var on = !!rec && rec.item === c.kind;
            var b = c.root.getChildByName('RecTag');
            if (on) this.recBadge(c.root, 122, 54);else if (b) b.active = false;
          }
        }

        /**
         * Buys strictly in ROUTE order — the 1000-run consensus the 推荐 tag walks too: it looks ahead past steps it
         * cannot afford yet and buys everything affordable, so bot progress and the player's tags never diverge.
         */;
        _proto.botBuyAll = function botBuyAll() {
          var bought = false;
          for (;;) {
            var did = false;
            for (var i = this.recIndex; i < GameRoot.ROUTE.length; i++) {
              var step = GameRoot.ROUTE[i];
              if (step.item === 'fuel' || step.item === 'drill') {
                if (this.store.buy(step.item)) {
                  did = true;
                  bought = true;
                  this.showToast(t(step.item === 'fuel' ? '总能量升级！' : '钻头升级！'));
                  break;
                }
                continue;
              }
              var n = skillNode(step.item);
              if (this.store.skillLevel(step.item) >= step.lv) continue;
              if (this.store.skillLock(step.item)) continue;
              if (this.store.canAfford(this.store.skillCost(step.item)) && this.store.buySkill(step.item)) {
                did = true;
                bought = true;
                this.showToast(t(n.name + " Lv." + this.store.skillLevel(step.item) + "\uFF01"));
                break;
              }
            }
            if (!did) return bought;
          }
        };
        _proto.botTick = function botTick(dt) {
          if (this.store.data.bestDepth >= this.map.height - 12) {
            // 通关：钻头触底，机器人交还方向盘
            this.toggleBot(false);
            this.showToast(t('🎉 通关！钻头抵达地心'));
            return;
          }
          this.botWait -= dt;
          if (this.botWait > 0) return;
          this.botBuyAll();
          if (!this.store.canFire) {
            this.botWait = 0.5;
            return;
          }
          var aim = this.botAim();
          if (aim) this.fire(aim);
          this.botWait = 0.3;
        }

        /** The tuning bot's aim: fixed 55°, pull length binary-searched so the shell lands at the golden-spread target. */;
        _proto.botAim = function botAim() {
          var stats = this.store.stats(),
            angle = 55 * Math.PI / 180;
          var lo = CONFIG.cannon.x + 6,
            hi = CONFIG.cannon.x + stats.maxRange * 0.97;
          var target = lo + (hi - lo) * (++this.botShotN * 0.6180339887 % 1);
          var lo2 = CONFIG.aim.deadzonePx + 1,
            hi2 = CONFIG.aim.fullPullPx;
          for (var i = 0; i < 30; i++) {
            var mid = (lo2 + hi2) / 2,
              a = solveAim(Math.cos(angle) * mid, Math.sin(angle) * mid, stats.maxSpeed);
            if (a.landingX < target) lo2 = mid;else hi2 = mid;
          }
          return solveAim(Math.cos(angle) * hi2, Math.sin(angle) * hi2, stats.maxSpeed);
        };
        _proto.openFactory = function openFactory() {
          if (this.mode !== 'idle') return;
          this.store.bumpStat('factoryOpens');
          this.mode = 'factory';
          this.factoryScroll = 0;
          this.factoryMsg = '';
          this.factoryDrag = null;
          this.setCards(false);
          this.hint.node.active = false;
          this.adButton.active = false;
          Sound.play('click');
          this.rebuildFactory();
          this.factoryRoot.active = true;
        };
        _proto.closeFactory = function closeFactory() {
          for (var _iterator8 = _createForOfIteratorHelperLoose(this.availableUpgrades()), _step8; !(_step8 = _iterator8()).done;) {
            var k = _step8.value;
            this.badgeSeen.add(k);
          }
          this.updateFactoryBadge();
          this.applyCannonTier();
          this.applyDrillTier();
          this.factoryRoot.active = false;
          this.factoryRoot.destroyAllChildren();
          this.mode = 'idle';
          this.setCards(true);
          this.refreshHud();
          this.refreshShells();
        }

        // ---------------------------------------------------------------- settings page

        /** Creates a once-built label already labelled, and remembers it so a language flip can re-label it in place. */;
        _proto.trLabel = function trLabel(l, s) {
          l.string = t(s);
          this.i18nLabels.push({
            l: l,
            s: s
          });
          return l;
        };
        _proto.relabelStatics = function relabelStatics() {
          for (var _iterator9 = _createForOfIteratorHelperLoose(this.i18nLabels), _step9; !(_step9 = _iterator9()).done;) {
            var e = _step9.value;
            e.l.string = t(e.s);
          }
        };
        _proto.openSettings = function openSettings() {
          if (this.mode !== 'idle') return;
          this.store.bumpStat('settingsOpens');
          Sound.play('click');
          this.mode = 'settings';
          this.setCards(false);
          this.hint.node.active = false;
          this.adButton.active = false;
          this.resetArmed = 0;
          this.settingsDrag = null;
          this.rebuildSettings();
          this.settingsRoot.active = true;
        };
        _proto.closeSettings = function closeSettings() {
          Sound.apply();
          this.settingsRoot.active = false;
          this.settingsRoot.destroyAllChildren();
          this.mode = 'idle';
          this.setCards(true);
          this.refreshHud();
          this.refreshShells();
        };
        _proto.openStats = function openStats() {
          if (this.mode !== 'idle') return;
          Sound.play('click');
          this.mode = 'stats';
          this.setCards(false);
          this.hint.node.active = false;
          this.adButton.active = false;
          this.rebuildStats();
          this.statsRoot.active = true;
        };
        _proto.closeStats = function closeStats() {
          this.statsRoot.active = false;
          this.statsRoot.destroyAllChildren();
          this.mode = 'idle';
          this.setCards(true);
          this.refreshHud();
          this.refreshShells();
        }

        /** Everything we know about the player's history, on one scroll-free page. Trim freely. */;
        _proto.rebuildStats = function rebuildStats() {
          var _this8 = this;
          var root = this.statsRoot,
            st = this.store.data.stats,
            d = this.store.data;
          root.destroyAllChildren();
          this.statsHits = [];
          var dim = node('Dim', root).addComponent(Graphics);
          dim.fillColor = new Color(0, 0, 0, 190);
          dim.rect(-2000, -2000, 4000, 4000);
          dim.fill();
          panel(root, 620, 1020);
          sprite('warehouse', root, 52, 50, -104, 460);
          label(root, t('统计'), 40, 20, 460, GOLD);
          var close = node('StatsClose', root, 0, -452);
          panel(close, 220, 64);
          label(close, t('关闭'), 30, 0, 0, SOFT);
          this.statsHits.push({
            x: 0,
            y: -452,
            w: 240,
            h: 84,
            kind: 'close'
          });
          var head = function head(s, x, y) {
            return label(root, t(s), 24, x, y, GOLD);
          };
          var row = function row(x, y, name, value) {
            label(root, t(name), 20, x - 60, y, SOFT);
            _this8.fitLabel(root, t(value), 20, x + 78, y, GOLD, 116);
          };
          head('挖掘历程', -196, 392);
          var mins = Math.floor(st.playSeconds / 60),
            secs = Math.floor(st.playSeconds % 60);
          row(-196, 350, '发射炮弹', st.shots + " \u53D1");
          row(-196, 318, '最深纪录', Math.round(d.bestDepth) + " \u7C73");
          row(-196, 286, '最深单发', Math.round(st.bestShot) + " \u7C73");
          row(-196, 254, '挖开格数', String(st.dugTotal));
          row(-196, 222, '触底次数', String(st.bottoms));
          row(-196, 190, '刷新纪录', st.records + " \u6B21");
          row(-196, 158, '游玩时长', mins + " \u5206 " + secs + " \u79D2");
          head('战斗与经济', 196, 392);
          row(196, 350, '累计收入', String(st.coinsEarned));
          row(196, 318, '累计支出', String(st.coinsSpent));
          row(196, 286, '持有金币', String(d.wallet));
          row(196, 254, '幸运炮弹', st.luckyCount + " \u6B21");
          row(196, 222, '幸运金币', String(Math.round(st.luckyCoins)));
          row(196, 190, '大金块破碎', String(st.bodiesBroken));
          row(196, 158, '终结爆炸', String(st.blasts));
          row(196, 126, '磁场脉冲', String(st.pulses));
          row(196, 94, '过驱触发', String(st.overdrives));
          row(196, 62, '刹车储能', String(Math.round(st.bankedTotal)));
          head('岩土与矿石', 0, 8);
          var keys = ['mud', 'rock', 'deep'].concat(ORES.map(function (o) {
            return o.key;
          }));
          var cell = function cell(k, col, i) {
            var _st$dugBy$k;
            var x = col === 0 ? -262 : 58,
              y = -26 - i * 26;
            _this8.resSprite(k, root, 24, 24, x, y);
            _this8.fitLabel(root, t(RESOURCE_NAME[k]), 18, x + 62, y, Color.WHITE, 108);
            _this8.fitLabel(root, "\xD7" + ((_st$dugBy$k = st.dugBy[k]) != null ? _st$dugBy$k : 0), 18, x + 168, y, GOLD, 60);
          };
          keys.forEach(function (k, i) {
            return cell(k, i < 10 ? 0 : 1, i < 10 ? i : i - 10);
          });
          head('使用习惯', 0, -300);
          row(-196, -336, '工坊打开', String(st.factoryOpens));
          row(-196, -368, '设置打开', String(st.settingsOpens));
          row(196, -336, '取消发射', String(st.cancels));
          row(196, -368, '广告补给', String(st.ads));
        };
        _proto.statsTouch = function statsTouch(p) {
          var hit = this.statsHits.find(function (h) {
            return Math.abs(p.x - h.x) <= h.w / 2 && Math.abs(p.y - h.y) <= h.h / 2;
          });
          if (hit && hit.kind === 'close') {
            this.closeStats();
            return;
          }
          if (Math.abs(p.x) > 310 || Math.abs(p.y) > 510) this.closeStats();
        };
        _proto.rebuildSettings = function rebuildSettings() {
          var _this9 = this;
          var root = this.settingsRoot,
            s = Sound.settings;
          root.destroyAllChildren();
          this.settingsHits = [];
          var dim = node('Dim', root).addComponent(Graphics);
          dim.fillColor = new Color(0, 0, 0, 190);
          dim.rect(-2000, -2000, 4000, 4000);
          dim.fill();
          panel(root, 600, 760);
          label(root, t('设置'), 40, 0, 300, GOLD);
          var close = node('Close', root, 270, 300);
          panel(close, 70, 70);
          label(close, '×', 40);
          this.settingsHits.push({
            x: 270,
            y: 300,
            w: 90,
            h: 90,
            kind: 'close'
          });
          var row = function row(title, y, on, vol, toggle, slider) {
            label(root, t(title), 30, -200, y, Color.WHITE);
            var sw = node("Toggle_" + toggle, root, 150, y);
            panel(sw, 150, 56);
            label(sw, t(on ? '开' : '关'), 28, 0, 0, on ? GOLD : new Color(160, 170, 200, 255));
            _this9.settingsHits.push({
              x: 150,
              y: y,
              w: 170,
              h: 70,
              kind: toggle
            });
            var bar = node("Slider_" + slider, root, 0, y - 62),
              g = bar.addComponent(Graphics);
            g.fillColor = new Color(255, 255, 255, 60);
            g.roundRect(-220, -6, 440, 12, 6);
            g.fill();
            g.fillColor = on ? GOLD : new Color(150, 160, 190, 255);
            g.roundRect(-220, -6, 440 * vol, 12, 6);
            g.fill();
            g.fillColor = Color.WHITE;
            g.circle(-220 + 440 * vol, 0, 18);
            g.fill();
            _this9.settingsHits.push({
              x: 0,
              y: y - 62,
              w: 520,
              h: 56,
              kind: slider
            });
          };
          row('音乐', 200, s.music, s.musicVol, 'music', 'musicVol');
          row('音效', 50, s.sfx, s.sfxVol, 'sfx', 'sfxVol');
          label(root, t('能量/燃料条'), -150, -160, -150, Color.WHITE); // 竖条=剩余能量（燃料+刹车动能），横条=本次燃料；默认隐藏
          var barsSw = node('Toggle_bars', root, 150, -150);
          panel(barsSw, 150, 56);
          label(barsSw, t(s.bars ? '开' : '关'), 28, 0, 0, s.bars ? GOLD : new Color(160, 170, 200, 255));
          this.settingsHits.push({
            x: 150,
            y: -150,
            w: 320,
            h: 70,
            kind: 'bars'
          });
          label(root, t('语言'), 30, -200, -230, Color.WHITE);
          var langSw = node('Toggle_lang', root, 150, -230);
          panel(langSw, 150, 56);
          label(langSw, getLang() === 'en' ? 'EN' : '中文', 28, 0, 0, GOLD);
          this.settingsHits.push({
            x: 150,
            y: -230,
            w: 320,
            h: 70,
            kind: 'lang'
          });
          var statsBtn = node('StatsBtn', root, 0, -300);
          panel(statsBtn, 380, 70);
          label(statsBtn, t('统计'), 26, 0, 0, SOFT);
          this.settingsHits.push({
            x: 0,
            y: -300,
            w: 380,
            h: 80,
            kind: 'stats'
          });
          var reset = node('Reset', root, 0, -370);
          panel(reset, 380, 70);
          label(reset, t(this.resetArmed > 0 ? '再点一次，确认清除全部进度' : '重置存档'), 26, 0, 0, new Color(255, 150, 140, 255));
          this.settingsHits.push({
            x: 0,
            y: -370,
            w: 380,
            h: 80,
            kind: 'reset'
          });
          label(root, t('音效与音乐为临时占位，之后会替换'), 20, 0, -430, SOFT);
        };
        _proto.settingsTouch = function settingsTouch(p) {
          var _this10 = this;
          var s = Sound.settings;
          var hit = this.settingsHits.find(function (h) {
            return Math.abs(p.x - h.x) <= h.w / 2 && Math.abs(p.y - h.y) <= h.h / 2;
          });
          if (!hit) {
            if (Math.abs(p.x) > 300 || Math.abs(p.y) > 380) this.closeSettings();
            return;
          }
          if (hit.kind === 'close') {
            this.closeSettings();
            return;
          }
          if (hit.kind === 'lang') {
            setLang(getLang() === 'en' ? 'zh' : 'en');
            Sound.play('click');
            this.relabelStatics();
            this.refreshHud();
            this.rebuildSettings();
            return;
          }
          if (hit.kind === 'stats') {
            this.closeSettings();
            this.openStats();
            return;
          }
          if (hit.kind === 'music' || hit.kind === 'sfx') {
            s[hit.kind] = !s[hit.kind];
            Sound.apply();
            Sound.play('click');
            if (hit.kind === 'music' && s.music) Sound.startMusic();
            this.rebuildSettings();
          } else if (hit.kind === 'bars') {
            s.bars = !s.bars;
            Sound.apply();
            Sound.play('click');
            this.rebuildSettings();
          } else if (hit.kind === 'musicVol' || hit.kind === 'sfxVol') {
            this.settingsDrag = hit.kind;
            this.setSlider(hit.kind, p.x);
          } else if (hit.kind === 'reset') {
            if (this.resetArmed > 0) {
              this.store.reset();
              game.restart();
              return;
            }
            this.resetArmed = 1;
            this.rebuildSettings();
            this.scheduleOnce(function () {
              if (_this10.resetArmed > 0 && _this10.mode === 'settings') {
                _this10.resetArmed = 0;
                _this10.rebuildSettings();
              }
            }, 4);
          }
        };
        _proto.setSlider = function setSlider(kind, x) {
          Sound.settings[kind] = Math.max(0, Math.min(1, (x + 220) / 440));
          Sound.apply();
          this.rebuildSettings();
        }

        /** Card centre inside the scrolling content, whose origin is the top of the tree viewport. */;
        _proto.factoryPos = function factoryPos(n) {
          return {
            x: n.x * 215,
            y: -112 - n.y * 232
          };
        };
        _proto.factoryMaxScroll = function factoryMaxScroll() {
          var rows = Math.max.apply(Math, SKILLS.map(function (n) {
            return n.y;
          })) + 1;
          return Math.max(0, rows * 232 + 12 - (GameRoot.TREE_TOP - GameRoot.TREE_BOTTOM));
        };
        _proto.dragFactory = function dragFactory(y) {
          var _this$factoryContent;
          var d = this.factoryDrag;
          if (!d.moved && Math.abs(y - d.y0) < 12) return;
          d.moved = true;
          this.factoryScroll = Math.max(0, Math.min(this.factoryMaxScroll(), d.scroll0 + (y - d.y0)));
          (_this$factoryContent = this.factoryContent) == null || _this$factoryContent.setPosition(0, (GameRoot.TREE_TOP - GameRoot.TREE_BOTTOM) / 2 + this.factoryScroll);
        };
        _proto.setFactoryMsg = function setFactoryMsg(text, good) {
          if (good === void 0) {
            good = false;
          }
          this.factoryMsg = text;
          this.factoryMsgGood = good;
          this.showFactoryMsg();
        };
        _proto.showFactoryMsg = function showFactoryMsg() {
          var l = this.factoryMsgLabel;
          if (!l || !l.isValid) return;
          l.string = this.factoryMsg;
          l.color = this.factoryMsgGood ? GOLD : new Color(255, 160, 150, 255);
        }

        /** What is still missing for a price, spelled out for the player. */;
        _proto.missingText = function missingText(cost) {
          var parts = [];
          if (this.store.data.wallet < cost.coins) parts.push("\u91D1\u5E01 " + (cost.coins - this.store.data.wallet));
          for (var _iterator10 = _createForOfIteratorHelperLoose(RESOURCE_KEYS), _step10; !(_step10 = _iterator10()).done;) {
            var _cost$items$k;
            var k = _step10.value;
            var need = (_cost$items$k = cost.items[k]) != null ? _cost$items$k : 0,
              have = this.store.amount(k);
            if (need > have) parts.push(RESOURCE_NAME[k] + " " + (need - have));
          }
          return parts.length ? t("\u8FD8\u7F3A\uFF1A" + parts.join('、')) : '';
        }

        /** The footer icons show just the item's name; coins keep their short description. */;
        _proto.itemInfo = function itemInfo(key) {
          if (key === 'coin') return t('金币：升级和购买的通用货币，挖到方块和矿石时获得。');
          var name = RESOURCE_NAME[key];
          if (getLang() === 'en') return t(name);
          return ORES.some(function (o) {
            return o.key === key;
          }) && name.charAt(name.length - 1) !== '矿' ? name + "\u77FF" : name;
        };
        _proto.rebuildFactory = function rebuildFactory() {
          var _viewport$getComponen,
            _this11 = this;
          var root = this.factoryRoot,
            red = new Color(255, 130, 120, 255);
          root.destroyAllChildren();
          var dim = node('Dim', root).addComponent(Graphics);
          dim.fillColor = new Color(0, 0, 0, 190);
          dim.rect(-2000, -2000, 4000, 4000);
          dim.fill();
          panel(root, 660, 780);
          label(root, t('加工坊'), 40, 0, 330, GOLD);
          var close = node('Close', root, 300, 330);
          panel(close, 70, 70);
          label(close, '×', 40);
          // The tree scrolls inside a clipped viewport; the content's origin is the viewport centre, so its top edge sits at +vh/2.
          var vh = GameRoot.TREE_TOP - GameRoot.TREE_BOTTOM,
            viewport = node('Viewport', root, 0, GameRoot.TREE_BOTTOM + vh / 2);
          ((_viewport$getComponen = viewport.getComponent(UITransform)) != null ? _viewport$getComponen : viewport.addComponent(UITransform)).setContentSize(650, vh);
          viewport.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
          this.factoryScroll = Math.max(0, Math.min(this.factoryMaxScroll(), this.factoryScroll));
          var content = node('Content', viewport, 0, vh / 2 + this.factoryScroll);
          this.factoryContent = content;
          var g = node('Lines', content).addComponent(Graphics);
          g.lineWidth = 6;
          g.strokeColor = new Color(255, 255, 255, 70);
          for (var _iterator11 = _createForOfIteratorHelperLoose(SKILLS), _step11; !(_step11 = _iterator11()).done;) {
            var n = _step11.value;
            for (var _iterator14 = _createForOfIteratorHelperLoose(n.parents), _step14; !(_step14 = _iterator14()).done;) {
              var pid = _step14.value;
              var a = this.factoryPos(skillNode(pid)),
                b = this.factoryPos(n);
              g.moveTo(a.x, a.y);
              g.lineTo(b.x, b.y);
            }
          }
          g.stroke();
          var rec = this.recStep(); // the 1000-run consensus: tag the one node the player should upgrade next
          var _loop2 = function _loop2() {
            var n = _step12.value;
            var pos = _this11.factoryPos(n),
              c = node("Skill_" + n.id, content, pos.x, pos.y);
            var level = _this11.store.skillLevel(n.id),
              maxed = level >= n.maxLevel,
              lock = _this11.store.skillLock(n.id),
              cost = _this11.store.skillCost(n.id);
            panel(c, 196, 204);
            if (rec && rec.item === n.id && !maxed) _this11.recBadge(c, 72, 92);
            label(c, t(n.name), 25, 0, 76);
            label(c, t(maxed ? '已满级' : "Lv." + level + "/" + n.maxLevel), 19, 0, 50, maxed ? GOLD : SOFT);
            _this11.fitLabel(c, t(effectText(n.id, level)), 18, 0, 25, Color.WHITE, 176);
            if (!maxed) {
              sprite('coin', c, 26, 27, -34, -6);
              label(c, String(cost.coins), 24, -16, -6, _this11.store.data.wallet >= cost.coins ? GOLD : red, 'left');
              var needs = RESOURCE_KEYS.filter(function (k) {
                return cost.items[k];
              });
              var xs = needs.length === 1 ? [0] : needs.length === 2 ? [-46, 46] : [-62, 0, 62];
              needs.forEach(function (k, i) {
                _this11.resSprite(k, c, 26, 26, xs[i] - 22, -38);
                label(c, String(cost.items[k]), 22, xs[i] - 6, -38, _this11.store.amount(k) >= cost.items[k] ? Color.WHITE : red, 'left');
              });
              // 锁定原因不再印在卡片上（红字太吵）：卡片保持压暗，点开时仍会在工坊底部提示原因
            }

            c.addComponent(UIOpacity).opacity = !maxed && lock ? 150 : 255;
          };
          for (var _iterator12 = _createForOfIteratorHelperLoose(SKILLS), _step12; !(_step12 = _iterator12()).done;) {
            _loop2();
          }
          // Message line: what is missing, or what a tapped item is.
          var msg = label(root, '', 21, 0, -214, red);
          msg.overflow = Label.Overflow.SHRINK;
          msg.enableWrapText = true;
          msg.node.getComponent(UITransform).setContentSize(620, 52);
          this.factoryMsgLabel = msg;
          this.showFactoryMsg();
          // Everything the player owns, shown with icons only; tap one to learn what it is.
          this.factoryOwned = [];
          var owned = [{
            icon: function icon() {
              return sprite('coin', root, 34, 35);
            },
            n: this.store.data.wallet,
            coin: true,
            key: 'coin'
          }];
          var _loop3 = function _loop3() {
            var k = _step13.value;
            if (_this11.store.amount(k) > 0) owned.push({
              icon: function icon() {
                return _this11.resSprite(k, root, 34, 34);
              },
              n: _this11.store.amount(k),
              coin: false,
              key: k
            });
          };
          for (var _iterator13 = _createForOfIteratorHelperLoose(RESOURCE_KEYS), _step13; !(_step13 = _iterator13()).done;) {
            _loop3();
          }
          owned.slice(0, 20).forEach(function (o, i) {
            var x = -262 + i % 5 * 132,
              y = -252 - Math.floor(i / 5) * 36; // 17 种矿全开也排得下：4 行压到 36 距，底行带图标仍离面板底 13 格
            o.icon().node.setPosition(x - 26, y);
            label(root, String(o.n), 22, x - 6, y, o.coin ? GOLD : Color.WHITE, 'left');
            _this11.factoryOwned.push({
              x: x + 20,
              y: y,
              key: o.key
            });
          });
        };
        _proto.factoryTouch = function factoryTouch(p) {
          if (Math.hypot(p.x - 300, p.y - 330) < 44 || Math.abs(p.x) > 330 || Math.abs(p.y) > 390) {
            this.closeFactory();
            return;
          }
          for (var _iterator15 = _createForOfIteratorHelperLoose(this.factoryOwned), _step15; !(_step15 = _iterator15()).done;) {
            var o = _step15.value;
            if (Math.abs(p.x - o.x) <= 62 && Math.abs(p.y - o.y) <= 17) {
              this.setFactoryMsg(this.itemInfo(o.key), true);
              return;
            }
          }
          if (p.y > GameRoot.TREE_BOTTOM && p.y < GameRoot.TREE_TOP) {
            var ly = p.y - (GameRoot.TREE_TOP + this.factoryScroll);
            for (var _iterator16 = _createForOfIteratorHelperLoose(SKILLS), _step16; !(_step16 = _iterator16()).done;) {
              var n = _step16.value;
              var pos = this.factoryPos(n);
              if (Math.abs(p.x - pos.x) <= 98 && Math.abs(ly - pos.y) <= 102) {
                this.tryBuySkill(n.id);
                return;
              }
            }
          }
        };
        _proto.tryBuySkill = function tryBuySkill(id) {
          var def = skillNode(id),
            lock = this.store.skillLock(id);
          if (lock) {
            Sound.play('error');
            this.setFactoryMsg(t(def.name + "\uFF1A" + lock));
            return;
          }
          if (!this.store.buySkill(id)) {
            Sound.play('error');
            this.setFactoryMsg(t(def.name + "\uFF1A" + (this.missingText(this.store.skillCost(id)) || '资源不足')));
            return;
          }
          this.shownWallet = this.store.data.wallet;
          this.refreshHud();
          Sound.play('upgrade');
          this.factoryMsg = t(def.name + " \u5347\u7EA7\uFF01");
          this.factoryMsgGood = true;
          this.rebuildFactory();
        }

        /**
         * The final blast uses the explosion art; once it goes off the drill is spent, so the drill and its flame vanish
         * and the explosion fades out completely instead of lingering.
         */
        /** Explosions, pulse bombs, big-gold breaks and landings read as simple GEOMETRY: expanding rings, spokes and crosses in pure line art. */;
        _proto.pushFx = function pushFx(kind, x, y, r, life) {
          var g = this.fxFree.pop();
          if (g) {
            g.clear();
            this.lineFx.push({
              kind: kind,
              x: x,
              y: y,
              r: r,
              age: 0,
              life: life,
              g: g
            });
          }
        };
        _proto.spawnRing = function spawnRing(x, y, radius, blast) {
          if (blast) {
            this.pushFx('blast', x, y, radius * 1.25, 0.55);
            this.drill.node.active = false;
            this.clearFlames();
            for (var i = 0; i < 18; i++) this.burst(x + (Math.random() - 0.5) * radius, y + (Math.random() - 0.5) * radius, 'rock', 1);
          } else this.pushFx('pulse', x, y, radius * 1.15, 0.45);
        };
        _proto.stepFx = function stepFx(dt) {
          for (var i = this.lineFx.length - 1; i >= 0; i--) {
            var f = this.lineFx[i];
            f.age += dt;
            if (f.age >= f.life) {
              f.g.clear();
              this.fxFree.push(f.g);
              this.lineFx.splice(i, 1);
              continue;
            }
            var _t4 = f.age / f.life,
              a = 1 - _t4,
              g = f.g;
            var px = this.terrain.px(f.x),
              py = -f.y * T,
              R = f.r * T * (0.3 + 0.85 * Math.sqrt(_t4));
            g.clear();
            if (f.kind === 'blast') {
              g.lineWidth = 4;
              g.strokeColor = new Color(255, 158, 64, Math.round(235 * a));
              g.circle(px, py, R);
              g.stroke();
              g.strokeColor = new Color(255, 226, 120, Math.round(200 * a));
              g.circle(px, py, R * 0.55);
              g.stroke();
              g.strokeColor = new Color(255, 190, 90, Math.round(225 * a));
              for (var k = 0; k < 8; k++) {
                var an = k * Math.PI / 4 + 0.2,
                  c = Math.cos(an),
                  sn = Math.sin(an);
                g.moveTo(px + c * R * 0.7, py + sn * R * 0.7);
                g.lineTo(px + c * R * 1.12, py + sn * R * 1.12);
              }
              g.stroke();
            } else if (f.kind === 'pulse') {
              g.lineWidth = 3;
              g.strokeColor = new Color(110, 200, 255, Math.round(235 * a));
              for (var _k2 = 0; _k2 < 6; _k2++) {
                var an0 = _k2 * Math.PI / 3 + Math.PI / 6,
                  an1 = (_k2 + 1) * Math.PI / 3 + Math.PI / 6;
                if (!_k2) g.moveTo(px + Math.cos(an0) * R, py + Math.sin(an0) * R);
                g.lineTo(px + Math.cos(an1) * R, py + Math.sin(an1) * R);
              }
              g.stroke();
              g.strokeColor = new Color(170, 226, 255, Math.round(200 * a)); // field lines pulling INWARD
              for (var _k3 = 0; _k3 < 4; _k3++) {
                var _an = _k3 * Math.PI / 2 + Math.PI / 4,
                  _c = Math.cos(_an),
                  _sn = Math.sin(_an);
                g.moveTo(px + _c * R * 1.3, py + _sn * R * 1.3);
                g.lineTo(px + _c * R * 0.8, py + _sn * R * 0.8);
              }
              g.stroke();
            } else if (f.kind === 'break') {
              g.lineWidth = 4;
              var d = R * 0.5;
              g.strokeColor = new Color(255, 214, 90, Math.round(235 * a));
              g.moveTo(px - d, py - d);
              g.lineTo(px + d, py + d);
              g.moveTo(px + d, py - d);
              g.lineTo(px - d, py + d);
              g.stroke();
              g.strokeColor = new Color(255, 240, 160, Math.round(200 * a));
              g.moveTo(px, py - R);
              g.lineTo(px + R, py);
              g.lineTo(px, py + R);
              g.lineTo(px - R, py);
              g.close();
              g.stroke();
            } else {
              // land: a shallow ring plus three kicked-up grass ticks
              g.lineWidth = 3;
              g.strokeColor = new Color(150, 220, 120, Math.round(200 * a));
              g.circle(px, py, R * 0.8);
              g.stroke();
              for (var _k4 = -1; _k4 <= 1; _k4++) {
                g.moveTo(px + _k4 * 10, py + 4);
                g.lineTo(px + _k4 * 16, py + 4 + 14 * (1 - Math.abs(_k4) * 0.5));
              }
              g.stroke();
            }
          }
        };
        _proto.stepRings = function stepRings(dt) {
          for (var i = this.rings.length - 1; i >= 0; i--) {
            var ring = this.rings[i];
            ring.age += dt;
            if (ring.age >= ring.life) {
              ring.sprite.node.destroy();
              this.rings.splice(i, 1);
              continue;
            }
            var _t5 = ring.age / ring.life,
              k = ring.size * (ring.start + (1 - ring.start) * Math.sqrt(_t5)) / 64,
              c = ring.sprite.color.clone();
            ring.sprite.node.setScale(k, k);
            c.a = Math.round(255 * (1 - _t5));
            ring.sprite.color = c;
          }
        }

        // ---------------------------------------------------------------- flame & light

        /** Underground is dark: only the area around the drill is lit while it moves. */;
        _proto.currentLight = function currentLight() {
          if (!this.sim || this.mode === 'idle' || this.mode === 'aim' || this.mode === 'loading' || this.ry < 0) return null;
          var flicker = 0.97 + 0.02 * Math.sin(this.time * 17) + 0.015 * Math.sin(this.time * 41);
          return {
            x: this.rx,
            y: this.ry,
            radius: this.store.stats().lightRadius,
            intensity: Math.min(1, flicker)
          };
        };
        _proto.spawnFlame = function spawnFlame(x, y, dx, dy, size) {
          if (this.flames.length > 520) return;
          var f = this.flamePool.pop();
          if (!f) f = {
            sprite: glowSprite(this.flameRoot, 64, 64),
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            age: 0,
            life: 1,
            size: 1
          };
          var speed = 90 + Math.random() * 170;
          f.sprite.node.active = true;
          f.x = x;
          f.y = y;
          f.vx = -dx * speed + (Math.random() - 0.5) * 70;
          f.vy = -dy * speed + (Math.random() - 0.5) * 70;
          f.age = 0;
          f.life = 0.38 + Math.random() * 0.34;
          f.size = size * (0.75 + Math.random() * 0.6);
          f.sprite.node.setPosition(x, y);
          this.flames.push(f);
        }

        /** Emits along the path since last frame so a fast shell leaves a continuous trail, not dots. */;
        _proto.emitFlame = function emitFlame() {
          var _this$lastTail;
          var sim = this.sim,
            s = sim.state;
          if (sim.done) {
            this.lastTail = null;
            return;
          }
          var big = Math.max(1, 0.55 / this.zoom),
            h0 = T * 0.78 * 281 / 166,
            off = h0 / 2 - CONFIG.sim.carveRadius * T;
          var dx = s.dirX,
            dy = -s.dirY; // screen-space direction, y up
          var cx = this.rx * T - dx * off,
            cy = -this.ry * T - dy * off;
          var tx = cx - dx * h0 * big * 0.5,
            ty = cy - dy * h0 * big * 0.5;
          var size = 34 * big,
            last = (_this$lastTail = this.lastTail) != null ? _this$lastTail : {
              x: tx,
              y: ty
            };
          var n = Math.min(70, Math.max(1, Math.ceil(Math.hypot(tx - last.x, ty - last.y) / (size * 0.35))));
          for (var i = 1; i <= n; i++) {
            var _t6 = i / n;
            this.spawnFlame(last.x + (tx - last.x) * _t6, last.y + (ty - last.y) * _t6, dx, dy, size);
          }
          this.lastTail = {
            x: tx,
            y: ty
          };
        };
        _proto.stepFlame = function stepFlame(dt) {
          var burning = this.mode === 'shot' && !!this.sim && !this.sim.done && this.drill.node.active;
          if (this.tailGlow.node.active !== burning) this.tailGlow.node.active = burning;
          if (burning) {
            var k = 1 + 0.18 * Math.sin(this.time * 38) + 0.1 * Math.sin(this.time * 23);
            this.tailGlow.node.setScale(k, 1.25 * k);
          }
          for (var i = this.flames.length - 1; i >= 0; i--) {
            var f = this.flames[i];
            f.age += dt;
            if (f.age >= f.life) {
              f.sprite.node.active = false;
              this.flamePool.push(f);
              this.flames.splice(i, 1);
              continue;
            }
            var _t7 = f.age / f.life,
              drag = Math.max(0, 1 - 2.2 * dt);
            f.vx *= drag;
            f.vy *= drag;
            f.x += f.vx * dt;
            f.y += f.vy * dt + 40 * dt;
            f.sprite.node.setPosition(f.x, f.y);
            var d = f.size * (1 - 0.55 * _t7);
            f.sprite.node.setScale(d / 64, d / 64);
            FLAME_TMP.g = Math.round(236 - 150 * _t7);
            FLAME_TMP.b = Math.round(150 - 130 * _t7);
            FLAME_TMP.a = Math.round(255 * Math.pow(1 - _t7, 1.3) * 0.9);
            f.sprite.color = FLAME_TMP;
          }
        };
        _proto.clearFlames = function clearFlames() {
          for (var _iterator17 = _createForOfIteratorHelperLoose(this.flames), _step17; !(_step17 = _iterator17()).done;) {
            var f = _step17.value;
            f.sprite.node.active = false;
            this.flamePool.push(f);
          }
          this.flames = [];
          this.lastTail = null;
          this.tailGlow.node.active = false;
        };
        _proto.applyCamera = function applyCamera() {
          this.world.setScale(this.zoom, this.zoom);
          this.world.setPosition(-this.camX * T * this.zoom, this.camY * T * this.zoom);
        };
        _proto.cameraGoal = function cameraGoal() {
          var v = CONFIG.view,
            farY = v.farCenterRow;
          if (!this.sim || this.mode === 'idle' || this.mode === 'aim') {
            var ax = CONFIG.cannon.x;
            return this.returning ? {
              x: ax,
              y: farY,
              zoom: v.flightZoom,
              smooth: v.returnSmooth,
              zoomSmooth: v.zoomSmooth
            } : {
              x: ax + this.aimPan.x,
              y: (0.5 - v.aimSurfaceRatio) * this.H / (T * v.aimZoom) + this.aimPan.y,
              zoom: v.aimZoom,
              smooth: this.mode === 'aim' || this.introActive ? v.aimSmooth : v.returnSmooth,
              zoomSmooth: v.zoomSmooth
            };
          }
          var s = this.sim.state,
            W = this.W,
            H = this.H;
          var clampTo = function clampTo(v, lim) {
            return Math.max(-lim, Math.min(lim, v));
          };
          var ease = function ease(t) {
            return t * t * (3 - 2 * t);
          };
          if (s.phase === 'flight') {
            // Close in on the ground while falling so the shell enters it as near as the aiming view.
            var height = -this.ry,
              falling = s.dirY > 0;
            var k = falling && height < v.approachHeight ? 1 - ease(Math.max(0, Math.min(1, height / v.approachHeight))) : 0;
            var zoom = Math.exp(Math.log(v.flightZoom) * (1 - k) + Math.log(v.digZoom) * k);
            var smooth = v.flightSmooth * (1 - k) + 0.05 * k;
            var vx = s.aim.speed * Math.cos(s.aim.angle),
              vy = -s.aim.speed * Math.sin(s.aim.angle) + CONFIG.sim.gravity * s.time;
            var leadX = clampTo(vx * smooth, 0.2 * W / (T * zoom)),
              leadY = clampTo(vy * smooth, 0.2 * H / (T * zoom));
            var farGoalY = farY + this.ry * v.farFollowY,
              nearGoalY = this.ry + leadY + (0.5 - v.digDrillRatio) * H / (T * zoom);
            return {
              x: this.rx + leadX,
              y: farGoalY * (1 - k) + nearGoalY * k,
              zoom: zoom,
              smooth: smooth,
              zoomSmooth: v.zoomSmooth * (1 - k) + 0.16 * k
            };
          }
          var lead = Math.min(v.digSmooth * 0.9 * (s.speed || 0), 0.2 * H / (T * v.digZoom)); // fast runs through old tunnel: keep the view ahead
          return {
            x: this.rx + clampTo(s.dirX * lead, 0.2 * W / (T * v.digZoom)),
            y: this.ry + s.dirY * lead + (0.5 - v.digDrillRatio) * H / (T * v.digZoom),
            zoom: v.digZoom,
            smooth: v.digSmooth,
            zoomSmooth: 0.16
          };
        };
        _proto.clampCamera = function clampCamera() {
          var halfW = this.W / 2 / (T * this.zoom),
            halfH = this.H / 2 / (T * this.zoom);
          // The foundation starts at world x=0 and shells can only fly right (30..90° fan), so the view never
          // needs the pre-grown ground left of it: pin the left screen edge at x=0 instead of at the grown map edge.
          var x = Math.max(halfW, Math.min(this.map.left + this.map.width - halfW, this.camX));
          if (x !== this.camX) {
            this.camX = x;
            this.velX = 0;
          } // pinned at the edge: drop the velocity that was pushing into it
          if (this.zoom > 0.9 && this.camY > this.map.height + 1 - halfH) {
            this.camY = this.map.height + 1 - halfH;
            this.velY = 0;
          }
        };
        _proto.snapCamera = function snapCamera() {
          var goal = this.cameraGoal();
          this.camX = goal.x;
          this.camY = goal.y;
          this.zoom = goal.zoom;
          this.velX = this.velY = this.velZ = 0;
          this.clampCamera();
          this.applyCamera();
          this.terrain.refresh(this.camX, this.camY, this.zoom, this.W, this.H, this.currentLight());
        };
        _proto.stepCamera = function stepCamera(dt) {
          var goal = this.cameraGoal(),
            v = CONFIG.view,
            step = Math.min(dt, 1 / 20);
          var x = smoothDamp(this.camX, goal.x, this.velX, goal.smooth, v.maxCamSpeed, step);
          var y = smoothDamp(this.camY, goal.y, this.velY, goal.smooth, v.maxCamSpeed, step);
          var z = smoothDamp(Math.log(this.zoom), Math.log(goal.zoom), this.velZ, goal.zoomSmooth, 10, step);
          this.camX = x[0];
          this.velX = x[1];
          this.camY = y[0];
          this.velY = y[1];
          this.zoom = Math.exp(z[0]);
          this.velZ = z[1];
          if (this.returning) {
            // The far view is clamped to the map edge, so judge arrival against the reachable position.
            var reachable = Math.max(CONFIG.cannon.x, this.map.left + this.W / 2 / (T * this.zoom));
            if (Math.abs(this.camX - reachable) < 1.5 && Math.abs(this.velX) < 12) this.returning = false;
          }
          this.clampCamera();
          this.applyCamera();
          if (!this.fastForward) this.terrain.refresh(this.camX, this.camY, this.zoom, this.W, this.H, this.currentLight());
        }

        /** The test speed-up runs everything, transitions and animations included, 100 times faster in small steps. */
        /** The mine zone has no fixed edge: the boundary is a frontier that stands a margin past the CURRENT
        * range, and every cannon (range) upgrade slides it visibly outward. The sealed ground past it stays dark. */;
        _proto.wallTarget = function wallTarget() {
          return Math.min(this.map.left + this.map.width - 0.5, CONFIG.cannon.x + this.store.stats().maxRange + CONFIG.aim.wallMargin);
        };
        _proto.drawBoundary = function drawBoundary(dt) {
          var g = this.boundGfx;
          if (this.wallShown < 0) this.wallShown = this.wallTarget();else this.wallShown += (this.wallTarget() - this.wallShown) * Math.min(1, dt * 3); // the fence glides out when a range upgrade lands
          var x = this.terrain.px(this.wallShown),
            h = this.map.height * T,
            right = (this.map.left + this.map.width) * T;
          g.clear();
          if (right - x > 2) {
            g.fillColor = new Color(6, 8, 14, 160);
            g.rect(x, -h, right - x, h);
            g.fill();
          } // unexplored ground past the frontier
          // The old red range-fence line is gone: with the ever-growing zone it only read as a stray red stripe.
        }

        /**
        * A lucky shell: 12% of launches pay coins the moment they leave the barrel. The gold burst blooms at the
        * muzzle (world space) and two coins arc across the screen into the wallet icon, landing while the shell
        * is still in the air. The credit is granted before the checkpoint save, so a crash never eats the gift.
        */;
        _proto.luckyShell = function luckyShell(aim) {
          var b = CONFIG.shotBonus;
          if (Math.random() >= b.chance) return;
          var coins = b.base + b.perLevel * (this.store.data.fuelLevel + this.store.data.drillLevel) + Math.floor(Math.random() * b.jitter);
          this.store.data.wallet += coins;
          this.store.addLucky(coins);
          var gold = glowSprite(this.fx, 64, 64, aim.muzzleX * T, -aim.muzzleY * T);
          gold.color = new Color(255, 214, 92, 255);
          this.rings.push({
            sprite: gold,
            age: 0,
            life: 0.5,
            size: T * 4.2,
            start: 0.3
          });
          var walletT = this.walletRoot.position,
            z = this.world.scale.x;
          var sx = this.world.position.x + aim.muzzleX * T * z,
            sy = this.world.position.y - aim.muzzleY * T * z;
          for (var j = 0; j < 2; j++) {
            var f = sprite('coin', this.hud, 30, 31, 0, 0).node;
            f.active = false;
            var from = new Vec3(sx + (j ? 16 : -12), sy + (j ? 20 : 8), 0);
            var side = (j ? 1 : -1) * 90;
            this.bonus.push({
              node: f,
              from: from,
              ctrl: new Vec3((from.x + walletT.x) / 2 + side, Math.max(from.y, walletT.y) + 60, 0),
              to: new Vec3(walletT.x - 70, walletT.y, 0),
              delay: j * 0.09,
              time: 0,
              coins: j ? coins - Math.floor(coins / 2) : Math.floor(coins / 2)
            });
          }
          this.showToast(t("\u5E78\u8FD0\u70AE\u5F39 +" + coins + " \u91D1\u5E01"));
        }

        /** Lucky coins fly on their own clock: they cross the screen during the shot, not during the settlement. */;
        _proto.stepBonus = function stepBonus(dt) {
          for (var i = this.bonus.length - 1; i >= 0; i--) {
            var f = this.bonus[i];
            if (f.delay > 0) {
              f.delay -= dt;
              continue;
            }
            f.node.active = true;
            f.time = Math.min(1, f.time + dt / CONFIG.settle.flySeconds);
            var _t8 = f.time < 0.5 ? 2 * f.time * f.time : 1 - Math.pow(-2 * f.time + 2, 2) / 2,
              u = 1 - _t8;
            f.node.setPosition(u * u * f.from.x + 2 * u * _t8 * f.ctrl.x + _t8 * _t8 * f.to.x, u * u * f.from.y + 2 * u * _t8 * f.ctrl.y + _t8 * _t8 * f.to.y);
            var sc = 1 - 0.3 * f.time;
            f.node.setScale(sc, sc);
            if (f.time >= 1) {
              f.node.destroy();
              this.bonus.splice(i, 1);
              this.shownWallet += f.coins;
              this.walletPulse = 1;
              this.walletLabel.string = String(Math.round(this.shownWallet));
              Sound.play('coin', 0.5, 0.08);
            }
          }
        };
        _proto.update = function update(dt) {
          if (this.mode === 'loading') return;
          this.clock += dt;
          this.playAcc += dt; // real seconds only: the 100× substeps below must not fake playtime
          if (this.coinHold && this.clock - this.coinHold.t >= 3) {
            this.coinHold = null;
            this.toggleTestMode();
          }
          if (this.settingsHold && this.clock - this.settingsHold.t >= 3) {
            this.settingsHold = null;
            this.toggleSpeedMode();
          }
          if (this.factoryHold && this.clock - this.factoryHold.t >= 3) {
            this.factoryHold = null;
            this.toggleBot();
          }
          if (!this.speed100) {
            this.fastForward = false;
            this.tick(dt);
            return;
          }
          var left = Math.min(dt, 0.05) * 100;
          while (left > 1e-6) {
            var step = Math.min(left, 1 / 30);
            left -= step;
            this.fastForward = left > 1e-6; // only the last step draws the terrain
            this.tick(step);
          }
          this.fastForward = false;
        };
        _proto.tick = function tick(dt) {
          var t0 = performance.now();
          this.time += dt;
          this.stepFlame(dt);
          this.stepRings(dt);
          this.stepFx(dt);
          this.drawTouch();
          this.stepFade(dt);
          this.stepBarrel(dt);
          this.drawEnergy(dt);
          this.drawBoundary(dt);
          this.stepBonus(dt);
          if (this.introActive && this.mode === 'idle') this.stepIntro(dt);else if (this.finger.node.active || this.introT > 0) {
            this.endIntro();
            this.introT = 0;
          }
          if (this.botActive && this.mode === 'idle') this.botTick(dt);
          if (this.mode === 'shot') this.stepSim(dt);else if (this.mode === 'freeze') {
            this.modeTimer -= this.speed100 ? dt / 100 : dt;
            if (this.modeTimer <= 0) this.beginSettle();
          } // the freeze (fire bar over the energy bar) holds in REAL seconds even in 100× test mode, so the overdrive is actually visible
          else if (this.mode === 'settle') this.stepSettle(dt);
          if (this.lastPath.length > 1 && this.mode !== 'aim') this.drawAim(); // the ghost arc lingers from settlement through the NEXT flight — the whole arc, not the muzzle stub (aim mode redraws it in the drag handler)

          this.terrain.updateShake(dt);
          if (this.drillShake > 0) {
            this.drillShake = Math.max(0, this.drillShake - dt / CONFIG.hitFeedback.shakeSeconds);
            if (this.sim && this.drill.node.active) this.syncDrill();
          }
          this.shellUiTimer -= dt;
          if (this.shellUiTimer <= 0) {
            this.shellUiTimer = 0.25;
            this.refreshShells();
          }
          this.stepCamera(dt);
          for (var i = this.debris.length - 1; i >= 0; i--) {
            var d = this.debris[i],
              p = d.node.position;
            if (d.life < 0) {
              // floating coin text counts up from a negative life
              d.life += dt;
              d.node.setPosition(p.x, p.y + d.vy * dt);
              var op = d.node.getComponent(UIOpacity);
              if (op) op.opacity = Math.min(255, Math.max(0, -d.life / 0.3 * 255));
              if (d.life >= 0) {
                d.node.destroy();
                this.debris.splice(i, 1);
              }
              continue;
            }
            d.life -= dt;
            d.vy -= 760 * dt;
            d.node.setPosition(p.x + d.vx * dt, p.y + d.vy * dt);
            if (d.life <= 0) {
              d.node.active = false;
              this.debrisPool.push(d.node);
              this.debris.splice(i, 1);
            }
          }
          if (this.toastTime > 0) {
            this.toastTime -= dt;
            if (this.toastTime <= 0) this.toast.node.active = false;
          }
          if (this.factoryBounce > 0) {
            // Squash and stretch: first narrow and tall, then wide and short, settling back.
            this.factoryBounce = Math.max(0, this.factoryBounce - dt * 3.2);
            var _t9 = 1 - this.factoryBounce,
              v = Math.sin(_t9 * Math.PI * 2.6) * (1 - _t9);
            this.factoryButton.setScale(1 - 0.22 * v, 1 + 0.26 * v);
            if (this.factoryBounce === 0) this.factoryButton.setScale(1, 1);
          }
          if (this.walletPulse > 0) {
            this.walletPulse = Math.max(0, this.walletPulse - dt * 6);
            var s = 1 + 0.12 * this.walletPulse;
            this.walletRoot.setScale(s, s);
          }
          this.frameMax = Math.max(this.frameMax * 0.995, performance.now() - t0);
        };
        return GameRoot;
      }(Component), _class2.ROUTE = [
      // 第 20 轮重导出：分区矿图 + 上限链（燃料/硬度≤炮台、钻力≤硬度）下的 40 次实跑，取最接近中位（696 发）
      // 通关 run 的完整购买序（tools/tune/route_single.mjs → autotest/route_single.json）——照此阶梯，钻头直达地心。
      {
        item: 'fuel',
        lv: 1
      }, {
        item: 'drill',
        lv: 1
      }, {
        item: 'cannon',
        lv: 1
      }, {
        item: 'fuel',
        lv: 2
      }, {
        item: 'cannon',
        lv: 2
      }, {
        item: 'fuel',
        lv: 3
      }, {
        item: 'cannon',
        lv: 3
      }, {
        item: 'fuel',
        lv: 4
      }, {
        item: 'cannon',
        lv: 4
      }, {
        item: 'fuel',
        lv: 5
      }, {
        item: 'hardness',
        lv: 1
      }, {
        item: 'hardness',
        lv: 2
      }, {
        item: 'drill',
        lv: 2
      }, {
        item: 'drill',
        lv: 3
      }, {
        item: 'light',
        lv: 1
      }, {
        item: 'cannon',
        lv: 5
      }, {
        item: 'fuel',
        lv: 6
      }, {
        item: 'light',
        lv: 2
      }, {
        item: 'light',
        lv: 3
      }, {
        item: 'cannon',
        lv: 6
      }, {
        item: 'fuel',
        lv: 7
      }, {
        item: 'blast',
        lv: 1
      }, {
        item: 'recycler',
        lv: 1
      }, {
        item: 'magnet',
        lv: 1
      }, {
        item: 'survey',
        lv: 1
      }, {
        item: 'magnet',
        lv: 2
      }, {
        item: 'light',
        lv: 4
      }, {
        item: 'cannon',
        lv: 7
      }, {
        item: 'fuel',
        lv: 8
      }, {
        item: 'light',
        lv: 5
      }, {
        item: 'magnet',
        lv: 3
      }, {
        item: 'recycler',
        lv: 2
      }, {
        item: 'survey',
        lv: 2
      }, {
        item: 'shells',
        lv: 1
      }, {
        item: 'recycler',
        lv: 3
      }, {
        item: 'cannon',
        lv: 8
      }, {
        item: 'fuel',
        lv: 9
      }, {
        item: 'diameter',
        lv: 1
      }, {
        item: 'reload',
        lv: 1
      }, {
        item: 'cannon',
        lv: 9
      }, {
        item: 'light',
        lv: 6
      }, {
        item: 'fuel',
        lv: 10
      }, {
        item: 'cannon',
        lv: 10
      }, {
        item: 'fuel',
        lv: 11
      }, {
        item: 'refine',
        lv: 1
      }, {
        item: 'hardness',
        lv: 3
      }, {
        item: 'hardness',
        lv: 4
      }, {
        item: 'drill',
        lv: 4
      }, {
        item: 'drill',
        lv: 5
      }], _class2.TREE_TOP = 300, _class2.TREE_BOTTOM = -180, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameStore.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Config.ts', './MineMap.ts', './Skills.ts'], function (exports) {
  var _extends, _createForOfIteratorHelperLoose, _createClass, cclegacy, CONFIG, RESOURCE_KEYS, MineMap, statsOf, lockReason, skillPrice, skillNode;
  return {
    setters: [function (module) {
      _extends = module.extends;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CONFIG = module.CONFIG;
      RESOURCE_KEYS = module.RESOURCE_KEYS;
    }, function (module) {
      MineMap = module.MineMap;
    }, function (module) {
      statsOf = module.statsOf;
      lockReason = module.lockReason;
      skillPrice = module.skillPrice;
      skillNode = module.skillNode;
    }],
    execute: function () {
      exports({
        drillAt: drillAt,
        fuelAt: fuelAt,
        priceAt: priceAt
      });
      cclegacy._RF.push({}, "988afyQGoVKOptj0i5VCBLX", "GameStore", undefined);

      /** Lifetime statistics shown on the 统计 page. Counters are bumped in settle()/buy()/buySkill() and by the view layer. */

      function freshStats() {
        return {
          shots: 0,
          coinsEarned: 0,
          coinsSpent: 0,
          luckyCount: 0,
          luckyCoins: 0,
          bestShot: 0,
          dugTotal: 0,
          dugBy: {},
          bodiesBroken: 0,
          blasts: 0,
          pulses: 0,
          overdrives: 0,
          bankedTotal: 0,
          fuelBuys: 0,
          drillBuys: 0,
          skillBuys: 0,
          cancels: 0,
          ads: 0,
          records: 0,
          bottoms: 0,
          playSeconds: 0,
          factoryOpens: 0,
          settingsOpens: 0
        };
      }
      function freshSave() {
        return {
          version: CONFIG.saveVersion,
          mineId: CONFIG.mineId,
          wallet: 0,
          fuelLevel: 0,
          drillLevel: 0,
          bestDepth: 0,
          lastSettledShot: 0,
          clearedCells: [],
          bodyHp: {},
          bottomReached: false,
          checkpoint: null,
          shells: CONFIG.shells.max,
          shellClock: 0,
          seen: '',
          mineOx: 0,
          mineWidth: CONFIG.map.width,
          skills: {},
          inventory: {},
          stats: freshStats()
        };
      }
      function fuelAt(level) {
        return CONFIG.upgrades.baseFuel + CONFIG.upgrades.fuelPerLevel * level;
      }
      function drillAt(level) {
        return CONFIG.upgrades.baseDrill + CONFIG.upgrades.drillPerLevel * level;
      }
      function priceAt(kind, level) {
        var u = CONFIG.upgrades;
        var price = kind === 'fuel' ? u.fuelFirstPrice : u.drillFirstPrice;
        for (var i = 0; i < level; i++) price = Math.ceil(price * u.priceGrowth);
        return price;
      }
      var GameStore = exports('GameStore', /*#__PURE__*/function () {
        function GameStore(storage, now) {
          if (now === void 0) {
            now = Date.now;
          }
          this.data = void 0;
          this.storage = void 0;
          this.now = void 0;
          /** Developer-only and never saved. */
          this.devInfiniteShells = false;
          this.storage = storage;
          this.now = now;
          this.data = this.read();
          this.syncShells();
        }
        var _proto = GameStore.prototype;
        _proto.read = function read() {
          try {
            var raw = this.storage.getItem(CONFIG.saveKey);
            if (raw) {
              var parsed = JSON.parse(raw);
              if (parsed.version === CONFIG.saveVersion && parsed.mineId === CONFIG.mineId) return _extends({}, freshSave(), parsed);
            }
          } catch (_unused) {/* a corrupt save starts a new mine */}
          return freshSave();
        };
        _proto.write = function write() {
          this.storage.setItem(CONFIG.saveKey, JSON.stringify(this.data));
        };
        _proto.stats = function stats() {
          return statsOf({
            fuel: this.data.fuelLevel,
            drill: this.data.drillLevel,
            skills: this.data.skills
          });
        };
        _proto.skillLevel = function skillLevel(id) {
          var _this$data$skills$id;
          return (_this$data$skills$id = this.data.skills[id]) != null ? _this$data$skills$id : 0;
        };
        _proto.skillLock = function skillLock(id) {
          return lockReason({
            fuel: this.data.fuelLevel,
            drill: this.data.drillLevel,
            skills: this.data.skills
          }, id);
        };
        _proto.skillCost = function skillCost(id) {
          return skillPrice(id, this.skillLevel(id));
        };
        _proto.amount = function amount(key) {
          var _this$data$inventory$;
          return (_this$data$inventory$ = this.data.inventory[key]) != null ? _this$data$inventory$ : 0;
        };
        _proto.canAfford = function canAfford(cost) {
          if (this.data.wallet < cost.coins) return false;
          for (var _iterator = _createForOfIteratorHelperLoose(RESOURCE_KEYS), _step; !(_step = _iterator()).done;) {
            var _cost$items$k;
            var k = _step.value;
            if (this.amount(k) < ((_cost$items$k = cost.items[k]) != null ? _cost$items$k : 0)) return false;
          }
          return true;
        };
        _proto.buySkill = function buySkill(id) {
          var node = skillNode(id),
            cost = this.skillCost(id);
          if (this.skillLock(id) || this.data.checkpoint || !this.canAfford(cost) || this.skillLevel(id) >= node.maxLevel) return false;
          this.data.wallet -= cost.coins;
          for (var _iterator2 = _createForOfIteratorHelperLoose(RESOURCE_KEYS), _step2; !(_step2 = _iterator2()).done;) {
            var k = _step2.value;
            if (cost.items[k]) this.data.inventory[k] = this.amount(k) - cost.items[k];
          }
          this.data.skills[id] = this.skillLevel(id) + 1;
          this.data.stats.coinsSpent += cost.coins;
          this.data.stats.skillBuys++;
          this.write();
          return true;
        };
        /** Builds the live map from committed terrain plus any in-progress shot. */
        _proto.buildMap = function buildMap() {
          var _this$data$mineOx, _this$data$mineWidth;
          var map = new MineMap();
          map.growTo((_this$data$mineOx = this.data.mineOx) != null ? _this$data$mineOx : 0, (_this$data$mineWidth = this.data.mineWidth) != null ? _this$data$mineWidth : CONFIG.map.width); // rebuild the grown world first: cleared cells and ore bodies live in its stable indices
          map.unpackSeen(this.data.seen);
          map.applySaved(this.data.clearedCells, this.data.bodyHp);
          var cp = this.data.checkpoint;
          if (cp) map.applySaved(cp.clearedCells, cp.bodyHp);
          return map;
        }

        /** Applies elapsed regeneration. A clock moved backwards restarts the timer and grants nothing. */;
        _proto.syncShells = function syncShells() {
          var d = this.data,
            now = this.now(),
            st = this.stats(),
            period = st.regenSeconds * 1000;
          if (d.shells >= st.maxShells || now < d.shellClock) {
            d.shellClock = now;
            return;
          }
          var gained = Math.floor((now - d.shellClock) / period);
          if (gained <= 0) return;
          d.shells = Math.min(st.maxShells, d.shells + gained);
          d.shellClock = d.shells >= st.maxShells ? now : d.shellClock + gained * period;
          this.write();
        };
        _proto.secondsToNextShell = function secondsToNextShell() {
          var st = this.stats();
          if (this.data.shells >= st.maxShells) return 0;
          var left = this.data.shellClock + st.regenSeconds * 1000 - this.now();
          return Math.max(0, Math.ceil(left / 1000));
        }

        /** Spends one shell and stores the shot's first checkpoint in the same write. */;
        _proto.startShot = function startShot(state) {
          this.syncShells();
          if (!this.canFire || this.data.checkpoint) return false;
          if (!this.devInfiniteShells) this.data.shells--;
          this.data.checkpoint = JSON.parse(JSON.stringify(state));
          this.write();
          return true;
        }

        /** Ad rewards may exceed the regeneration cap. */;
        _proto.grantAdShells = function grantAdShells() {
          this.syncShells();
          this.data.shells += CONFIG.shells.adReward;
          if (this.data.shells >= this.stats().maxShells) this.data.shellClock = this.now();
          this.write();
        };
        _proto.saveCheckpoint = function saveCheckpoint(state) {
          this.data.checkpoint = JSON.parse(JSON.stringify(state));
          this.write();
        }

        /** Commits one finished shot in a single write. Repeating the same shot id is a no-op. */;
        _proto.settle = function settle(state, map) {
          var d = this.data;
          if (state.shotId <= d.lastSettledShot) return false;
          d.wallet += state.coins;
          d.bestDepth = Math.max(d.bestDepth, state.maxDepth);
          d.lastSettledShot = state.shotId;
          d.clearedCells = d.clearedCells.concat(state.clearedCells);
          d.bodyHp = map.bodyHpSnapshot();
          d.seen = map.packSeen();
          d.mineOx = map.left;
          d.mineWidth = map.width;
          for (var _iterator3 = _createForOfIteratorHelperLoose(RESOURCE_KEYS), _step3; !(_step3 = _iterator3()).done;) {
            var _d$inventory$k;
            var k = _step3.value;
            if (state.harvest[k]) d.inventory[k] = ((_d$inventory$k = d.inventory[k]) != null ? _d$inventory$k : 0) + state.harvest[k];
          }
          d.bottomReached = d.bottomReached || state.stopReason === 'bottom';
          var st = d.stats;
          st.shots++;
          st.coinsEarned += state.coins;
          st.dugTotal += state.blocks;
          st.bestShot = Math.max(st.bestShot, state.maxDepth);
          st.bankedTotal += state.bank || 0;
          if (state.stopReason === 'bottom') st.bottoms++;
          for (var _iterator4 = _createForOfIteratorHelperLoose(RESOURCE_KEYS), _step4; !(_step4 = _iterator4()).done;) {
            var _st$dugBy$_k;
            var _k = _step4.value;
            if (state.harvest[_k]) st.dugBy[_k] = ((_st$dugBy$_k = st.dugBy[_k]) != null ? _st$dugBy$_k : 0) + state.harvest[_k];
          }
          d.checkpoint = null;
          this.write();
          return true;
        };
        _proto.price = function price(kind) {
          return priceAt(kind, kind === 'fuel' ? this.data.fuelLevel : this.data.drillLevel);
        };
        _proto.buy = function buy(kind) {
          var price = this.price(kind);
          if (this.data.wallet < price || this.data.checkpoint) return false;
          // 升级上限链：炮台是技能树之根——燃料不得超过炮台等级（燃料/炮台各 +1 显示），钻力不得超过钻头硬度。
          if (kind === 'drill' && this.data.drillLevel >= Math.min(CONFIG.upgrades.maxDrill, this.skillLevel('hardness') + 1)) return false; // drill tops out at Lv10 AND never out-runs 钻头硬度
          if (kind === 'fuel' && this.data.fuelLevel >= Math.min(CONFIG.upgrades.maxFuel, this.skillLevel('cannon') + 1)) return false; // fuel is capped by the cannon (and by maxFuel at max cannon)
          this.data.wallet -= price;
          if (kind === 'fuel') this.data.fuelLevel++;else this.data.drillLevel++;
          this.data.stats.coinsSpent += price;
          if (kind === 'fuel') this.data.stats.fuelBuys++;else this.data.stats.drillBuys++;
          this.write();
          return true;
        };
        _proto.reset = function reset() {
          this.data = freshSave();
          this.write();
        }

        /** Bump a lifetime counter (no write: it rides along with the next checkpoint/settle save). */;
        _proto.bumpStat = function bumpStat(kind, n) {
          if (n === void 0) {
            n = 1;
          }
          this.data.stats[kind] += n;
        }
        /** Lucky-shell bonus: counted immediately because it can happen mid-flight after the last checkpoint. */;
        _proto.addLucky = function addLucky(coins) {
          this.data.stats.luckyCount++;
          this.data.stats.luckyCoins += coins;
          this.write();
        }
        /** Accumulate real play seconds in one write per shot. */;
        _proto.flushPlay = function flushPlay(sec) {
          if (sec > 0) this.data.stats.playSeconds += sec;
        };
        _createClass(GameStore, [{
          key: "maxFuel",
          get: function get() {
            return fuelAt(this.data.fuelLevel);
          }
        }, {
          key: "drillPower",
          get: function get() {
            return drillAt(this.data.drillLevel);
          }
        }, {
          key: "canFire",
          get: function get() {
            return this.devInfiniteShells || this.data.shells > 0;
          }
        }, {
          key: "nextShotId",
          get: function get() {
            return this.data.lastSettledShot + 1;
          }
        }]);
        return GameStore;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Lang.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _extends, _createForOfIteratorHelperLoose, cclegacy, sys;
  return {
    setters: [function (module) {
      _extends = module.extends;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }],
    execute: function () {
      exports({
        getLang: getLang,
        initLang: initLang,
        setLang: setLang,
        t: t
      });
      cclegacy._RF.push({}, "2e7cdD+yqxLVKG3kVukVlRT", "Lang", undefined);

      /**
       * Language layer. Chinese stays the authoring language next to the code; every player-visible string is
       * passed through t(). In English mode t() first tries an exact dictionary hit, then ordered regex patterns
       * for the dynamic templates (numbers, ore names, recursion). Anything unmatched falls through untranslated,
       * so a missed string degrades to Chinese instead of disappearing.
       */

      var KEY = 'drill_lang_v1';
      var cur = 'en';

      /** Reads the saved choice once at boot; players who never touched the switch see English. */
      function initLang() {
        try {
          var v = sys.localStorage.getItem(KEY);
          if (v === 'zh' || v === 'en') cur = v;
        } catch (_unused) {/* keep default */}
      }
      function setLang(l) {
        cur = l;
        try {
          sys.localStorage.setItem(KEY, l);
        } catch (_unused2) {/* session-only */}
      }
      function getLang() {
        return cur;
      }

      // Ore / resource names, shared by the workshop, the settle card and the stats page.
      var NAMES = {
        '泥砖': 'Clay',
        '岩石': 'Rock',
        '深层岩': 'Deep Rock',
        '煤': 'Coal',
        '铜': 'Copper',
        '铁': 'Iron',
        '银': 'Silver',
        '金': 'Gold',
        '铂': 'Platinum',
        '钴': 'Cobalt',
        '秘银': 'Mithril',
        '钛': 'Titanium',
        '精金': 'Adamantite',
        '铀': 'Uranium',
        '流明矿': 'Luminite',
        '铱': 'Iridium',
        '红宝石': 'Ruby',
        '蓝宝石': 'Sapphire',
        '绿宝石': 'Emerald',
        '钻石': 'Diamond',
        '金币': 'Coins'
      };
      for (var k in NAMES) NAMES[k + '矿'] = NAMES[k]; // the shop footer appends 矿 in Chinese mode (铁矿)

      var DICT = _extends({}, NAMES, {
        // HUD
        '向后拖动，松手发射': 'Drag back, release to fire',
        '炮弹用完了': 'Out of shells',
        '∞ 开发模式': '∞ Dev mode',
        '加工坊': 'Workshop',
        '设置': 'Settings',
        '统计': 'Stats',
        '可升级': 'Ready!',
        '已满级': 'MAX',
        '拖拽至底部取消发射': 'Drag to the bottom to cancel',
        '刷新纪录！': 'New record!',
        '大金块破碎！': 'Big nugget cracked!',
        '已取消发射': 'Launch cancelled',
        '钻力已满级': 'Drill power maxed',
        '燃料已满级': 'Fuel maxed',
        '燃料': 'Fuel',
        '钻力': 'Drill',
        '加载中…': 'Loading…',
        '广告暂不可用，稍后再试': 'Ads unavailable — try again later',
        '总能量升级！': 'Energy upgraded!',
        '钻头升级！': 'Drill upgraded!',
        '🎉 通关！钻头抵达地心': '🎉 Cleared! The drill reached the core',
        'AI 机器人启动 · 再长按加工坊 3 秒停止': 'AI bot ON · hold Workshop 3s again to stop',
        'AI 机器人已停止': 'AI bot stopped',
        'AI·自动中': 'AI auto',
        '推荐': 'NEXT',
        '关闭': 'Close',
        '×': '×',
        '测试模式：无限炮弹 开': 'Dev mode: infinite shells ON',
        '测试模式：无限炮弹 关': 'Dev mode: infinite shells OFF',
        '测试模式：100 倍速 + 无限炮弹 开': 'Dev mode: 100× speed + infinite shells ON',
        '测试模式：100 倍速 关': 'Dev mode: 100× speed OFF',
        // stop reasons (settle card header)
        '到达地图边缘': 'Map edge reached',
        '前面是更硬的岩壁': 'Harder rock ahead',
        '被炮台底座挡住': 'Blocked by the cannon base',
        '炮弹飞走了': 'The shell flew away',
        '燃料耗尽': 'Out of fuel',
        '岩层太硬，需要更好的钻头': 'Rock too hard — a better drill is needed',
        '触到了世界基岩': 'Touched the world bedrock',
        '本炮没有新收获': 'Nothing new from this shot',
        '金币总额': 'Coins total',
        // settings
        '音乐': 'Music',
        '音效': 'Sound FX',
        '能量/燃料条': 'Energy / fuel bars',
        '开': 'On',
        '关': 'Off',
        '语言': 'Language',
        '中文': '中文',
        'EN': 'EN',
        '重置存档': 'Reset save',
        '再点一次，确认清除全部进度': 'Tap again to erase ALL progress',
        '音效与音乐为临时占位，之后会替换': 'Music & SFX are placeholders, to be replaced',
        // stats page
        '挖掘历程': 'Digging log',
        '发射炮弹': 'Shots fired',
        '最深纪录': 'Deepest record',
        '最深单发': 'Deepest shot',
        '挖开格数': 'Cells dug',
        '触底次数': 'Times bottomed',
        '刷新纪录': 'Records beaten',
        '游玩时长': 'Play time',
        '战斗与经济': 'Combat & economy',
        '累计收入': 'Total income',
        '累计支出': 'Total spent',
        '持有金币': 'Coins held',
        '幸运炮弹': 'Lucky shots',
        '幸运金币': 'Lucky coins',
        '大金块破碎': 'Big nuggets',
        '磁场脉冲': 'Mag pulses',
        '过驱触发': 'Overdrives',
        '刹车储能': 'Brake energy',
        '岩土与矿石': 'Rock & ore',
        '使用习惯': 'Habits',
        '工坊打开': 'Workshop opens',
        '设置打开': 'Settings opens',
        '取消发射': 'Cancels',
        '广告补给': 'Ad refills',
        // workshop
        '资源不足': 'Not enough resources',
        '金币：升级和购买的通用货币，挖到方块和矿石时获得。': 'Coins: the currency for upgrades. Earned by digging blocks and ore.',
        // skill names
        '炮台': 'Cannon',
        '钻头硬度': 'Drill hardness',
        '光源弹头': 'Light shell',
        '钻头直径': 'Drill diameter',
        '终结爆炸': 'Final blast',
        '磁场': 'Magnetism',
        '精炼钻头': 'Refined bit',
        '能量回收': 'Energy recovery',
        '地质勘探': 'Geology survey',
        '冲击钻': 'Impact drill',
        '弹药仓': 'Shell bay',
        '精矿加成': 'Ore bonus',
        '钻头增压': 'Bit pressure',
        '快速装填': 'Fast reload',
        '光源': 'Light',
        // skill descriptions
        '提高最大射程，解锁更远的矿区，炮台外观随等级升级': 'Longer range opens farther zones; the cannon reskins as it levels',
        '能钻开更硬的岩层；千米深渊还有两道大关': 'Drills harder rock; two great gates wait below 1000 m',
        '照亮并记住更大的地下范围': 'Lights — and remembers — a wider underground area',
        '钻孔更宽，但更重、更耗动力': 'Wider holes, but heavier and thirstier for power',
        '停钻时在尖端爆炸，炸开周围方块': 'Explodes at the tip when the drill stops',
        '停钻时吸走周围的矿石；钻进途中每挖够几格矿石自动引爆磁场炸弹，炸走旁边的矿石': 'Pulls in nearby ore on stop; every few ore cells dug fires a magnetic bomb',
        '打碎矿石更省动力': 'Breaking ore costs less power',
        '刹车时把更多动能存成免费挖掘能量': 'Braking banks more kinetic energy into free dig power',
        '白天光照到更深的地下，看得更远': 'Daylight reaches deeper, showing more',
        '在实体里钻得更快': 'Drills faster inside solids',
        '炮弹上限 +1': 'Shell cap +1',
        '矿石卖出更多金币': 'Ore sells for more coins',
        '千米深渊越深压力越大、越挖越费劲；每级抵消 12% 深部额外耗能': 'Below 1000 m pressure resists you; each level cancels 12% of it',
        '炮弹恢复更快': 'Shells regenerate faster',
        // lock texts
        '无': 'none',
        '普通岩层': 'ordinary rock',
        '可钻深层岩': 'drills deep rock',
        '可钻底层岩': 'drills floor rock',
        '可钻深渊岩': 'drills abyss rock',
        '可钻星核岩': 'drills star-core rock',
        '需要钻头硬度 Lv.3': 'Needs drill hardness Lv.3'
      });
      var name = function name(zh) {
        var _DICT$zh;
        return (_DICT$zh = DICT[zh]) != null ? _DICT$zh : zh;
      };
      var CHARGE = {
        '每发起始能量 +75%': 'each shot starts with +75% energy',
        '挖矿回能翻倍': 'double ore regen',
        '着陆免费回能': 'free landing energy'
      };
      var PATTERNS = [
      // card titles & prices
      [/^(燃料|钻力) MAX$/, function (m) {
        return name(m[1]) + " MAX";
      }], [/^(燃料|钻力) Lv\.(\d+)$/, function (m) {
        return name(m[1]) + " Lv." + m[2];
      }], [/^炮弹 \+(\d+)$/, function (m) {
        return "+" + m[1] + " shells";
      }], [/^幸运炮弹 \+(\d+) 金币$/, function (m) {
        return "Lucky shot +" + m[1] + " coins";
      }], [/^(.+?) Lv\.(\d+)！$/, function (m) {
        return name(m[1]) + " Lv." + m[2] + "!";
      }], [/^布满电钻导弹 \+(\d+) 炮弹（测试）$/, function (m) {
        return "Refill missiles +" + m[1] + " (test)";
      }], [/^(\S+) ×(\d+)$/, function (m) {
        return name(m[1]) + " \xD7" + m[2];
      }],
      // stats values
      [/^(\d+) 米$/, function (m) {
        return m[1] + " m";
      }], [/^(\d+) 发$/, function (m) {
        return "" + m[1];
      }], [/^(\d+) 次$/, function (m) {
        return "" + m[1];
      }], [/^(\d+) 分 (\d+) 秒$/, function (m) {
        return m[1] + "m " + m[2] + "s";
      }], [/^最深 (\d+) 米$/, function (m) {
        return "Deepest " + m[1] + " m";
      }], [/^破块 (\d+)$/, function (m) {
        return m[1] + " blocks";
      }],
      // lockReason texts (Skills.ts)
      [/^需要先解锁「(.+)」$/, function (m) {
        return "Unlock \u201C" + name(m[1]) + "\u201D first";
      }], [/^需要炮台 Lv\.(\d+)$/, function (m) {
        return "Needs cannon Lv." + m[1];
      }], [/^需要燃料 Lv\.(\d+)$/, function (m) {
        return "Needs fuel Lv." + m[1];
      }], [/^需要光源 Lv\.(\d+)$/, function (m) {
        return "Needs light Lv." + m[1];
      }], [/^需要炮台 Lv\.(\d+)，钻头硬度不得超过炮台等级$/, function (m) {
        return "Needs cannon Lv." + m[1] + " \u2014 hardness cannot exceed the cannon";
      }], [/^需要炮台 Lv\.(\d+)，才能打到所需的矿石$/, function (m) {
        return "Needs cannon Lv." + m[1] + " to reach the ore in the price";
      }],
      // effectText texts (Skills.ts)
      [/^射程 (\d+) 格$/, function (m) {
        return "Range " + m[1];
      }], [/^直径 ([\d.]+) 格$/, function (m) {
        return "\xD8 " + m[1];
      }], [/^爆炸半径 ([\d.]+)$/, function (m) {
        return "Blast " + m[1];
      }], [/^照明 (\d+) 格$/, function (m) {
        return "Light " + m[1];
      }], [/^停钻吸取 ([\d.]+) · 每钻 (\d+) 格矿放一发磁场炸弹$/, function (m) {
        return "Pull " + m[1] + " \xB7 mag-pulse per " + m[2] + " ore";
      }], [/^矿石耗能 -(\d+)%$/, function (m) {
        return "Ore cost -" + m[1] + "%";
      }], [/^动能回收 \+(\d+)%$/, function (m) {
        return "Brake energy +" + m[1] + "%";
      }], [/^日光深度 (\d+) 层$/, function (m) {
        return "Daylight " + m[1] + " layers";
      }], [/^钻进速度 \+(\d+)%$/, function (m) {
        return "Dig speed +" + m[1] + "%";
      }], [/^炮弹上限 (\d+)$/, function (m) {
        return "Shell cap " + m[1];
      }], [/^矿石收益 \+(\d+)%$/, function (m) {
        return "Ore income +" + m[1] + "%";
      }], [/^恢复 ([\d.]+) 分钟\/发$/, function (m) {
        return "Reload " + m[1] + " min/shell";
      }], [/^(.+) · 满级充能：(.+)$/, function (m) {
        var _CHARGE$m$;
        return t(m[1]) + " \xB7 MAX charge: " + ((_CHARGE$m$ = CHARGE[m[2]]) != null ? _CHARGE$m$ : m[2]);
      }],
      // upgrade-card value/price lines (GameRoot.refreshHud) — must beat the generic "A → B" pattern below
      [/^总能量 (\d+) → (\d+)$/, function (m) {
        return "Energy " + m[1] + " \u2192 " + m[2];
      }], [/^每格耗能 -(\d+)% → -(\d+)%$/, function (m) {
        return "Cell cost -" + m[1] + "% \u2192 -" + m[2] + "%";
      }], [/^每格耗能 -(\d+)%（已满级）$/, function (m) {
        return "Cell cost -" + m[1] + "% (MAX)";
      }], [/^需炮台 Lv\.(\d+)$/, function (m) {
        return "Cannon Lv." + m[1] + " req.";
      }], [/^需硬度 Lv\.(\d+)$/, function (m) {
        return "Hardness Lv." + m[1] + " req.";
      }], [/^(.+) → (.+)$/, function (m) {
        return t(m[1]) + " \u2192 " + t(m[2]);
      }],
      // effectText "current → next"
      // workshop messages: "name：reason" (lock / missing / upgrade). The nameless 还缺： must beat the generic name：pattern.
      [/^还缺：(.+)$/, function (m) {
        return "Missing " + m[1].split('、').map(function (p) {
          return p.replace(/^(\S+) (\d+)$/, function (_s, a, b) {
            return name(a) + " " + b;
          });
        }).join(', ');
      }], [/^([^：]+)：还缺：(.+)$/, function (m) {
        return name(m[1]) + ": missing " + m[2].split('、').map(function (p) {
          return p.replace(/^(\S+) (\d+)$/, function (_s, a, b) {
            return name(a) + " " + b;
          });
        }).join(', ');
      }], [/^([^：]+)：(.+)$/, function (m) {
        return name(m[1]) + ": " + t(m[2]);
      }], [/^(.+) 升级！$/, function (m) {
        return name(m[1]) + " upgraded!";
      }],
      // cap-chain toasts (card taps)
      [/^钻力不得超过钻头硬度——先升级「钻头硬度 Lv\.(\d+)」$/, function (m) {
        return "Drill power cannot exceed drill hardness \u2014 upgrade \u201CDrill hardness Lv." + m[1] + "\u201D first";
      }], [/^燃料不得超过炮台等级——先升级「炮台 Lv\.(\d+)」$/, function (m) {
        return "Fuel cannot exceed the cannon \u2014 upgrade \u201CCannon Lv." + m[1] + "\u201D first";
      }]];
      function t(s) {
        if (cur === 'zh') return s;
        var ex = DICT[s];
        if (ex !== undefined && ex !== '') return ex;
        for (var _iterator = _createForOfIteratorHelperLoose(PATTERNS), _step; !(_step = _iterator()).done;) {
          var _step$value = _step.value,
            re = _step$value[0],
            f = _step$value[1];
          var _m = s.match(re);
          if (_m) return f(_m);
        }
        return s;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Ballistics.ts', './Config.ts', './GameStore.ts', './MineMap.ts', './ShotSim.ts', './Skills.ts', './AdService.ts', './Art.ts', './AtlasRects.ts', './GameRoot.ts', './Lang.ts', './Sound.ts', './TerrainView.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MineMap.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Config.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, CELL, CONFIG, isOre, oreCell, ORES, oreIndexFor, ORE_BASE;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CELL = module.CELL;
      CONFIG = module.CONFIG;
      isOre = module.isOre;
      oreCell = module.oreCell;
      ORES = module.ORES;
      oreIndexFor = module.oreIndexFor;
      ORE_BASE = module.ORE_BASE;
    }],
    execute: function () {
      exports('crackStage', crackStage);
      cclegacy._RF.push({}, "bf607lKe/dMVblBE5Bni9/I", "MineMap", undefined);
      function seeded(seed) {
        var t = seed >>> 0;
        return function () {
          t = t + 0x6d2b79f5 >>> 0;
          var r = Math.imul(t ^ t >>> 15, 1 | t);
          r ^= r + Math.imul(r ^ r >>> 7, 61 | r);
          return ((r ^ r >>> 14) >>> 0) / 4294967296;
        };
      }

      /** 0 means undamaged; any damage shows at least stage 1, and stages grow with lost health. */
      var ORE_BASE_CELL = ORE_BASE;
      function crackStage(hp, maxHp, stages) {
        if (hp >= maxHp) return 0;
        return Math.max(1, Math.min(stages, Math.ceil((1 - hp / maxHp) * stages)));
      }

      /** Terrain data shared by carving, movement and rendering. Cell (x, y) spans [x, x+1) x [y, y+1). */
      var MineMap = exports('MineMap', /*#__PURE__*/function () {
        function MineMap() {
          this.height = CONFIG.map.height;
          /** Left edge of the generated window, in world cells. It slides left as `grow` extends the world that way. */
          this.left = 0;
          /** Width of the generated window; `grow` extends it outward. The buffer holds the whole hidden world up
           *  front, so extending never moves a cell index: cleared cells and ore-body ids stay valid forever. */
          this.width = CONFIG.map.width;
          /** Buffer row length: every column of the hidden world, allocated once. */
          this.stride = CONFIG.map.worldRight - CONFIG.map.worldLeft;
          this.cells = void 0;
          this.seen = void 0;
          this.seenVersion = 0;
          this.bodyAt = void 0;
          this.bodies = [];
          this.plain = void 0;
          this.version = 0;
          this.cells = new Uint8Array(this.stride * this.height);
          this.seen = new Uint8Array(this.stride * this.height);
          this.plain = new Uint8Array(this.stride * this.height);
          this.bodyAt = new Int16Array(this.stride * this.height).fill(-1);
          this.build();
          this.buildFoundation();
          // 稀有度阶梯收尾（地图完整生成后，确定性）：从最稀的矿向回扫——某档格数 ≥ 上一档（更便宜的矿）就把多余格就地降一档，
          // 保证 钻石<绿宝<蓝宝石<红宝石<铱<流明 的密度阶梯在任意 seed 恒成立（概率只决定均值，规则兜底阶梯）
          {
            var counts = new Array(ORES.length).fill(0);
            for (var y = 2; y < this.height; y++) for (var x = 0; x < this.width; x++) {
              var c = this.cells[this.index(x, y)];
              if (c >= ORE_BASE_CELL && c < ORE_BASE_CELL + ORES.length) counts[c - ORE_BASE_CELL]++;
            }
            for (var t = ORES.length - 1; t >= 12; t--) {
              // 链顶=流明矿(11)：密度必须最高，永不降级
              var over = counts[t] - (counts[t - 1] - 1);
              if (over <= 0) continue;
              for (var _y = 2; _y < this.height && over > 0; _y++) for (var _x = 0; _x < this.width && over > 0; _x++) {
                var i = this.index(_x, _y);
                var _c = this.cells[i];
                if (_c !== ORE_BASE_CELL + t) continue;
                this.cells[i] = ORE_BASE_CELL + (t - 1);
                counts[t]--;
                counts[t - 1]++;
                over--;
              }
            }
          }
        }

        /** The cannon stands on an indestructible base, running from the left edge of the map, that shots can hit without damage. */
        var _proto = MineMap.prototype;
        _proto.buildFoundation = function buildFoundation() {
          var c = CONFIG.cannon,
            b = Math.floor(c.x + c.baseHalfWidth);
          for (var x = 0; x <= Math.min(this.width - 1, b); x++) for (var y = 0; y < 2; y++) this.cells[this.index(x, y)] = CELL.FOUNDATION;
        };
        _proto.isSeen = function isSeen(x, y) {
          return this.inBounds(x, y) && this.seen[this.index(x, y)] === 1;
        }

        /** Permanently lights every tile within `radius` of the point. */;
        _proto.reveal = function reveal(cx, cy, radius) {
          var changed = false;
          var r2 = radius * radius;
          for (var y = Math.max(0, Math.floor(cy - radius)); y <= Math.min(this.height - 1, Math.ceil(cy + radius)); y++) {
            for (var x = Math.max(this.left, Math.floor(cx - radius)); x <= Math.min(this.left + this.width - 1, Math.ceil(cx + radius)); x++) {
              var i = this.index(x, y);
              if (this.seen[i]) continue;
              var dx = x + 0.5 - cx,
                dy = y + 0.5 - cy;
              if (dx * dx + dy * dy <= r2) {
                this.seen[i] = 1;
                changed = true;
              }
            }
          }
          if (changed) this.seenVersion++;
        };
        _proto.packSeen = function packSeen() {
          var seg = this.width >> 2,
            off = this.left - CONFIG.map.worldLeft; // window width is always a multiple of 4 (340 + n·128)
          var out = '';
          for (var y = 0; y < this.height; y++) {
            var base = y * this.stride + off;
            for (var c = 0; c < seg; c++) {
              var i = base + c * 4;
              out += (this.seen[i] << 3 | this.seen[i + 1] << 2 | this.seen[i + 2] << 1 | this.seen[i + 3]).toString(16);
            }
          }
          return out;
        };
        _proto.unpackSeen = function unpackSeen(packed) {
          var seg = this.width >> 2,
            off = this.left - CONFIG.map.worldLeft;
          if (packed.length !== seg * this.height) return;
          for (var y = 0; y < this.height; y++) {
            var base = y * this.stride + off;
            for (var c = 0; c < seg; c++) {
              var v = parseInt(packed[y * seg + c], 16) || 0;
              for (var b = 0; b < 4; b++) if (v >> 3 - b & 1) this.seen[base + c * 4 + b] = 1;
            }
          }
          this.seenVersion++;
        }

        /**
         * Deterministic splitmix-style hash of one column of the hidden world: terrain past the first map is
         * painted from (x, y, stream) alone, so a freshly grown strip reads like original ground — same veins,
         * membranes, cave honeycomb and deep gambling — and regenerating any strip always yields the same bytes.
         */;
        _proto.hash = function hash(x, y, s) {
          var h = Math.imul(x + 374761393, s | 1) ^ Math.imul(y + 668265263, 0x27d4eb2d);
          h = Math.imul(h ^ h >>> 13, 1274126177);
          h ^= h >>> 16;
          return (h >>> 0) / 4294967296;
        };
        _proto.colSpan = function colSpan(x, y, s, a, b) {
          return a + this.hash(x, y, s) * (b - a);
        }

        /** Order-independent big-body rule: a candidate column hosts a body only when it beats every other
         *  candidate whose soil ring would overlap its own, and never collides with a hand-authored body of the
         *  first map. Pure function of position, so bodies are the same however the world grew. */;
        _proto.bodyWins = function bodyWins(x, by) {
          var big = CONFIG.bigGold,
            wx = big.width + 6,
            wy = big.height + 6,
            mine = this.hash(x, 1, 0x51ee);
          for (var _iterator = _createForOfIteratorHelperLoose(this.bodies), _step; !(_step = _iterator()).done;) {
            var b = _step.value;
            if (b.x >= 0 && b.x < CONFIG.map.width && Math.abs(b.x - x) <= wx && Math.abs(b.y - by) <= wy) return false;
          } // the first map's bodies are immovable
          for (var xi = x - wx; xi <= x + wx; xi++) {
            if (xi === x) continue;
            if (this.hash(xi, 0, 0x51ee) >= 0.0625 || Math.abs(xi - CONFIG.cannon.x) < 56) continue;
            var other = this.hash(xi, 1, 0x51ee);
            if (Math.abs(Math.floor(3 + other * 105) - by) > wy) continue;
            if (other > mine || other === mine && xi < x) return false; // a higher-priority candidate takes the spot, whoever was generated first
          }

          return true;
        }

        /** True when some winning body's plain-soil ring would cover this cell — same order-free test `bodyWins` makes. */;
        _proto.nearWinner = function nearWinner(x, y) {
          var big = CONFIG.bigGold;
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.bodies), _step2; !(_step2 = _iterator2()).done;) {
            var b = _step2.value;
            if (b.x >= 0 && b.x < CONFIG.map.width && x > b.x - 4 && x < b.x + b.width + 3 && y > b.y - 4 && y < b.y + b.height + 3) return true;
          }
          for (var xi = x - (big.width + 3); xi <= x + (big.width + 3); xi++) {
            if (this.hash(xi, 0, 0x51ee) >= 0.0625 || Math.abs(xi - CONFIG.cannon.x) < 56) continue;
            var by = Math.floor(3 + this.hash(xi, 1, 0x51ee) * 105);
            if (x < xi - 4 || x > xi + big.width + 3 || y < by - 4 || y > by + big.height + 3) continue;
            if (this.bodyWins(xi, by)) return true;
          }
          return false;
        }

        /** Extends the generated ground by up to `n` columns on one side. Stops at the hidden world bounds,
         *  which sit far beyond the longest possible shot — a player can never reach them. */;
        _proto.grow = function grow(side, n) {
          if (n === void 0) {
            n = CONFIG.map.growChunk;
          }
          var m = CONFIG.map;
          if (side < 0) n = Math.min(n, this.left - m.worldLeft);else n = Math.min(n, m.worldRight - (this.left + this.width));
          if (n <= 0) return false;
          var x0 = side < 0 ? this.left - n : this.left + this.width;
          if (side < 0) this.left -= n;
          this.width += n;
          this.generate(x0, x0 + n);
          this.version++;
          this.seenVersion++;
          return true;
        }

        /** Feed the drill's current position every dig step: once it nears a generated edge, more ground
         *  silently appears beyond it, so the mining area never feels bounded. The margin keeps the new edge
         *  outside the camera, and each extension is a full chunk wide. */;
        _proto.ensureRoom = function ensureRoom(x) {
          var mg = CONFIG.map.growMargin;
          if (x - this.left < mg) this.grow(-1);else if (this.left + this.width - x < mg) this.grow(1);
        }

        /** Rebuilds a saved world: grows the fresh map out to the saved window. Generation replays the same
         *  outward chunk order growth uses in play, so the same window reproduces the same bytes every reload. */;
        _proto.growTo = function growTo(left, width) {
          var m = CONFIG.map;
          left = Math.max(m.worldLeft, Math.min(0, Math.floor(left)));
          var right = left + Math.min(m.worldRight - left, Math.max(m.width, Math.floor(width)));
          var oldLeft = this.left,
            oldRight = this.left + this.width;
          for (var x1 = oldLeft; x1 > left; x1 -= m.growChunk) {
            var x0 = Math.max(left, x1 - m.growChunk);
            this.left = x0;
            this.width = oldRight - x0;
            this.generate(x0, x1);
          }
          for (var _x2 = oldRight; _x2 < right; _x2 += m.growChunk) {
            var _x3 = Math.min(right, _x2 + m.growChunk);
            this.left = left;
            this.width = _x3 - left;
            this.generate(_x2, _x3);
          }
          this.left = left;
          this.width = right - left;
          this.version++;
          this.seenVersion++;
        }

        /** Generates hidden-world columns [x0, x1), mirroring build()'s per-column rules so new ground carries
         *  the same distributions: scatter veins and caves, big ore bodies, the honeycomb of deep caves, the
         *  hard membranes with their soil pockets and lone boulders, the bedrock floor, and the deep ore gamble. */;
        _proto.generate = function generate(x0, x1) {
          var _this = this;
          var m = CONFIG.map;
          // scatter(): ore veins, rock bands and shallow caves — hash-grid candidates every ~2.3 columns, the density its 1.6-3 step gives.
          var _loop = function _loop(x) {
            if (_this.hash(x, 0, 0x5c8) >= 0.435) return 1; // continue
            var c = 1;
            var rng = function rng() {
              return _this.hash(x, c++, 0x5c8);
            };
            for (var k = 0; k < 3; k++) {
              var roll = rng();
              var _y4 = roll < 0.56 && rng() < 0.6 ? _this.colSpan(x, k, 0x2b1, 2, 44) : _this.colSpan(x, k, 0x2c2, 2, 136);
              var rich = _this.richness(x, _y4); // 深度决定矿脉富度：浅层小、深处大
              if (roll < 0.56) _this.blob(x, _y4, _this.colSpan(x, k, 0x2d3, 1.3, 2.3) * (1 + rich * 0.4), _this.colSpan(x, k, 0x2e4, 1.1, 1.8), _this.pickOre(x, Math.floor(_y4), rng));else if (roll < 0.72) _this.rect(Math.floor(x), Math.floor(_y4), Math.floor(_this.colSpan(x, k, 0x2f5, 3, 8)), Math.floor(_this.colSpan(x, k, 0x306, 1, 3)), CELL.ROCK);else if (_y4 > 5) _this.cave(x, _y4, _this.colSpan(x, k, 0x317, 2.4, 4.4), _this.colSpan(x, k, 0x328, 1.4, 2.2), rng);
            }
          };
          for (var x = x0; x < x1; x++) {
            if (_loop(x)) continue;
          }
          // Big ore bodies: ~1 per 16 columns, plain-soil ring, richer far from the cannon — the build() rule per column.
          for (var _x4 = x0; _x4 < x1; _x4++) {
            if (this.hash(_x4, 0, 0x51ee) >= 0.0625) continue;
            if (Math.abs(_x4 - CONFIG.cannon.x) < 56) continue;
            var by = Math.floor(3 + this.hash(_x4, 1, 0x51ee) * 105);
            if (this.bodyWins(_x4, by)) this.addBody(_x4, by, this.richness(_x4, by), 1 + Math.floor(this.hash(_x4, 2, 0x51ee) * 4));
          }
          // Deep caves: the deep-floor honeycomb. Candidates live and die inside the strip, so growing never
          // carves into ground the drill already met — the frontier wall stays whole just out of sight.
          var _loop2 = function _loop2(_x5) {
            if (_this.hash(_x5, 0, 0x5eed) >= 0.185) return 1; // continue
            // ~1 per 5.25 columns, 8% of build()'s stream skipped anyway: the same bare stretches
            var h2s = _this.layerStart2(_x5),
              h3 = _this.layerStart3(_x5),
              h4 = _this.layerStart4(_x5);
            var band = _this.hash(_x5, 2, 0x5eed);
            var cy = band < 0.4 ? _this.colSpan(_x5, 3, 0x5eed, h2s + 20, h3 - 6) : band < 0.7 ? _this.colSpan(_x5, 3, 0x5eed, h3 + 18, h4 - 6) : _this.colSpan(_x5, 3, 0x5eed, h4 + 19, _this.height - 12);
            var c = 4;
            var rng = function rng() {
              return _this.hash(_x5, c++, 0x5eed);
            };
            _this.cave(_x5 + _this.colSpan(_x5, c++, 0x5eed, -2, 2), cy, _this.colSpan(_x5, c++, 0x5eed, 2.2, 4.6), _this.colSpan(_x5, c++, 0x5eed, 1.2, 2.6), rng);
          };
          for (var _x5 = x0; _x5 < x1; _x5++) {
            if (_loop2(_x5)) continue;
          }
          // Hard membranes, soil pockets, lone boulders and the bedrock floor — layers() per column.
          for (var _x6 = x0; _x6 < x1; _x6++) {
            var h1 = this.layerStart1(_x6),
              h2 = this.layerStart2(_x6),
              h3 = this.layerStart3(_x6),
              h4 = this.layerStart4(_x6);
            for (var y = Math.max(2, h1); y < this.height; y++) {
              var i = this.index(_x6, y),
                cell = this.cells[i];
              if (this.plain[i]) continue;
              if (cell === CELL.MUD) this.cells[i] = y < h1 + 14 ? CELL.HARD1 : y < h2 ? CELL.MUD : y < h2 + 9 ? CELL.HARD2 : y < h3 ? CELL.MUD : y < h3 + 12 ? CELL.HARD3 : y < h4 ? CELL.MUD : y < h4 + 13 ? CELL.HARD4 : CELL.MUD;else if (cell === CELL.ROCK && y >= h2) this.cells[i] = y >= h4 ? CELL.HARD4 : y >= h3 ? CELL.HARD3 : CELL.HARD2;
            }
            if (this.hash(_x6, 7, 0x77) < 90 / 340) this.pocket(_x6, this.colSpan(_x6, 8, 0x77, m.hard1Start, this.height - 4), 1 + this.hash(_x6, 9, 0x77) * 2.4, 0.8 + this.hash(_x6, 10, 0x77) * 1.6); // soil pockets break up the hard layers
            if (this.hash(_x6, 11, 0x77) < 26 / 340) {
              // lone hard boulders in the deep floors: soft ground with a few teeth
              var _by = this.colSpan(_x6, 12, 0x77, m.hard2Start + 16, this.height - 22),
                iy = Math.floor(_by);
              if (!this.nearWinner(_x6, iy)) this.blob(_x6, _by, this.colSpan(_x6, 13, 0x77, 1.5, 3.7), this.colSpan(_x6, 14, 0x77, 1, 2.6), iy >= m.hard4Start ? CELL.HARD4 : iy >= m.hard3Start ? CELL.HARD3 : CELL.HARD2);
            }
          }
          for (var _y2 = this.height - 2; _y2 < this.height; _y2++) for (var _x7 = x0; _x7 < x1; _x7++) this.cells[this.index(_x7, _y2)] = CELL.BEDROCK;
          // deepOre(): sparse gamble veins — the same 8-in-13.5-column density as build()'s stream, 越深越密。
          var _loop3 = function _loop3(_x8) {
              var by0 = _this.colSpan(_x8, 1, 0x9e37, 42, _this.height - 6),
                iy = Math.max(_this.layerStart1(_x8) + 3, Math.floor(by0));
              if (_this.nearWinner(_x8, iy)) return 0; // continue
              if (_this.hash(_x8, 0, 0x9e37) > 0.05 + Math.max(0, Math.min(1, (by0 - 42) / (_this.height - 48))) * 0.09) return 0; // continue
              // 越深的赌博矿脉越密（底部 ~1/7 列），但仍远稀于浅层散矿
              var c = 2;
              var rng = function rng() {
                return _this.hash(_x8, c++, 0x9e37);
              };
              _this.blob(_x8, Math.max(_this.layerStart1(_x8) + 3, by0), 0.8 + rng() * 1.8, 0.7 + rng() * 1.5, _this.pickOre(_x8, iy, rng));
            },
            _ret;
          for (var _x8 = x0; _x8 < x1; _x8++) {
            _ret = _loop3(_x8);
            if (_ret === 0) continue;
          }
          // Deep rows: veins multiply and swell with depth, the same n-per-340-column density as build(), plus far-side companions.
          var _loop4 = function _loop4(_x9) {
            var _loop5 = function _loop5(row) {
                var deep = (row - 240) / (_this.height - 248);
                if (_this.hash(_x9, 40 + row, 0x9e37) > (2 + Math.round(deep * 6)) / 340) return 0; // continue
                var c = 0;
                var rng = function rng() {
                  return _this.hash(_x9, 60 + row * 3 + c++, 0x9e37);
                };
                var by = row + rng() * 16,
                  iy = Math.floor(by);
                if (_this.nearWinner(_x9, iy)) return 0; // continue
                _this.blob(_x9, by, 0.9 + rng() * 1.6 + deep * 1.7, 0.7 + rng() * 1.2 + deep * 0.8, _this.pickOre(_x9, iy, rng));
                var far = Math.max(0, Math.min(1, (_x9 - CONFIG.cannon.x) / 130));
                if (rng() < far * 0.9) _this.blob(_x9, row + rng() * 16, 0.7 + rng() * 1.2 + deep * 1.2, 0.6 + rng() * 1.0 + deep * 0.6, _this.pickOre(_x9, row, rng)); // companion vein on the far side
              },
              _ret2;
            for (var row = 240; row < _this.height - 8; row += 16) {
              _ret2 = _loop5(row);
              if (_ret2 === 0) continue;
            }
          };
          for (var _x9 = x0; _x9 < x1; _x9++) {
            _loop4(_x9);
          }
          // upgradeOre(): ore that survived into a hard band is pushed one tier out — the same per-column rule.
          for (var _x10 = x0; _x10 < x1; _x10++) for (var _y3 = 2; _y3 < this.height - 2; _y3++) {
            if (this.bandOf(_x10, _y3) === 0) continue;
            var _cell = this.cells[this.index(_x10, _y3)];
            if (!isOre(_cell)) continue;
            var lvl = this.oreLevelAt(_x10, _y3);
            var want = Math.min(9, lvl + 1); // 岩膜只富集到精金(9)封顶：10+（燃料矿以上）全走 bump/保底/深渊小脉——否则岩膜缝隙把深部长脉整批拔成铱矿，密度阶梯倒挂
            if (_cell > ORE_BASE_CELL + want) continue;
            if (_cell < ORE_BASE_CELL + Math.max(0, want - 1)) continue; // 岩膜只富集到精金(9)封顶（收尾阶梯兜底稀有度阶梯）
            this.cells[this.index(_x10, _y3)] = ORE_BASE_CELL + want;
          }
        };
        _proto.index = function index(x, y) {
          return y * this.stride + (x - CONFIG.map.worldLeft);
        }
        /** World cell of a flat buffer index (stable across growth). */;
        _proto.xy = function xy(idx) {
          return [CONFIG.map.worldLeft + idx % this.stride, Math.floor(idx / this.stride)];
        };
        _proto.inBounds = function inBounds(x, y) {
          return x >= this.left && y >= 0 && x < this.left + this.width && y < this.height;
        };
        _proto.get = function get(x, y) {
          return this.inBounds(x, y) ? this.cells[this.index(x, y)] : CELL.EMPTY;
        };
        _proto.set = function set(x, y, type) {
          if (this.inBounds(x, y)) this.cells[this.index(x, y)] = type;
        };
        _proto.rect = function rect(x, y, w, h, type) {
          for (var j = y; j < y + h; j++) for (var i = x; i < x + w; i++) this.set(i, j, type);
        };
        _proto.blob = function blob(cx, cy, rx, ry, type) {
          for (var j = Math.floor(cy - ry); j <= Math.ceil(cy + ry); j++) for (var i = Math.floor(cx - rx); i <= Math.ceil(cx + rx); i++) {
            var dx = (i + 0.5 - cx) / rx,
              dy = (j + 0.5 - cy) / ry;
            if (dx * dx + dy * dy <= 1 && this.get(i, j) !== CELL.BEDROCK && this.get(i, j) !== CELL.FOUNDATION) this.set(i, j, type); // bedrock never turns to ore: a vein that grazes the abyss floor stops at its edge; the cannon's indestructible base is likewise vein-proof, even when a later-grown strip grazes it
          }
        }

        /** Hand-placed, reproducible first mine. */;
        _proto.build = function build() {
          this.cells.fill(CELL.MUD);
          var o = CONFIG.map.openingOffset;

          // Every placement sits inside the wedge reachable from the cannon's near landing point.
          // Shallow veins: reachable on shot one and at least a tunnel width apart.
          this.blob(o + 8.2, 3.2, 1.7, 1.5, oreCell('coal'));
          this.blob(o + 10, 8.4, 1.5, 1.2, oreCell('copper'));
          this.blob(o + 16.3, 2.6, 1.5, 1.7, oreCell('coal'));

          // Natural cave with a little decoration.
          this.cave(o + 14.5, 12, 2.9, 1.7, seeded(11));
          this.rect(o + 7, 14, 4, 1, CELL.ROCK);

          // Rock shell guarding the first gem pocket, so drill power has a visible use.
          this.rect(o + 8, 18, 7, 2, CELL.ROCK);
          this.rect(o + 8, 20, 2, 3, CELL.ROCK);
          this.rect(o + 13, 20, 2, 3, CELL.ROCK);
          this.rect(o + 8, 23, 7, 1, CELL.ROCK);
          this.blob(o + 11.5, 21.5, 1.7, 1.5, oreCell('copper'));

          // Deeper strata.
          this.blob(o + 9, 27, 1.8, 1.5, oreCell('copper'));
          this.blob(o + 15, 26, 1.8, 1.6, oreCell('copper'));
          this.rect(o + 7, 30, 5, 1, CELL.ROCK);
          this.rect(o + 13, 31, 5, 1, CELL.ROCK);
          this.cave(o + 13, 34, 3.2, 1.8, seeded(12));
          this.blob(o + 12, 38, 2, 1.6, oreCell('coal'));
          this.blob(o + 16, 40, 1.5, 1.5, oreCell('coal'));
          this.rect(o + 8, 42, 10, 1, CELL.ROCK);
          this.blob(o + 13, 45, 3, 1.5, oreCell('copper'));
          this.scatter();
          this.addBody(CONFIG.bigGold.x + o, CONFIG.bigGold.y, 0, 1);
          var rng = seeded(CONFIG.map.seed + 1);
          for (var x = 30 + rng() * 6; x < this.width - 6; x += 12 + rng() * 8) if (Math.abs(x - CONFIG.cannon.x) >= 56) {
            var by = 3 + rng() * 105;
            this.addBody(Math.floor(x), Math.floor(by), this.richness(x, by), 1 + Math.floor(rng() * 4));
          }
          this.deepCaves();
          this.layers();
          this.deepOre(); // after the caves: gamble veins hang on the cave walls instead of being carved away
          this.upgradeOre();
          this.guaranteeDeposits(seeded(CONFIG.map.seed + 101)); // 保底矿最后画（散布/深脉/upgradeOre 之后）：保证每种定价矿在本列软土里留足 12+ 格，不被后续层盖掉
          // 稀有度阶梯收尾（画完全部矿斑后，确定性）：从最稀向回扫，某档格数 ≥ 上一档就就地降级多余格——
          // 保证 钻石<绿宝<蓝宝石<红宝石<铱<流明 的密度阶梯在任意 seed 恒成立（概率只决定均值，规则兜底阶梯）
          {
            var counts = new Array(ORES.length).fill(0);
            for (var y = 2; y < this.height; y++) for (var _x11 = 0; _x11 < this.width; _x11++) {
              var c = this.cells[this.index(_x11, y)];
              if (c >= ORE_BASE_CELL && c < ORE_BASE_CELL + ORES.length) counts[c - ORE_BASE_CELL]++;
            }
            for (var t = ORES.length - 1; t >= 12; t--) {
              // 链顶=流明矿(11)：密度必须最高，永不降级
              var over = counts[t] - (counts[t - 1] - 1);
              if (over <= 0) continue;
              for (var _y5 = 0; _y5 < this.height && over > 0; _y5++) for (var _x12 = 0; _x12 < this.width && over > 0; _x12++) {
                var i = this.index(_x12, _y5);
                var _c2 = this.cells[i];
                if (_c2 !== ORE_BASE_CELL + t) continue;
                this.cells[i] = ORE_BASE_CELL + (t - 1);
                counts[t]--;
                counts[t - 1]++;
                over--;
              }
            }
          }
        }

        /**
         * Hard rock earns its name: any ore that survived into a hard band is pushed to the tier one zone out,
         * so breaking into a membrane always reveals seams richer than the soil above — richer, and still beyond
         * what the drill of the day crushes cheaply (越级矿要 3~6 倍能量才钻得动).
         */;
        _proto.upgradeOre = function upgradeOre() {
          for (var y = 2; y < this.height - 2; y++) {
            for (var x = 3; x < this.width - 3; x++) {
              if (this.bandOf(x, y) === 0) continue;
              var c = this.cells[this.index(x, y)];
              if (!isOre(c)) continue;
              var lvl = this.oreLevelAt(x, y);
              var want = Math.min(9, lvl + 1); // 同 generate：岩膜富集封顶精金(9)
              if (c > ORE_BASE_CELL + want) continue; // already richer than the rule asks: leave lucky natural bumps
              if (c < ORE_BASE_CELL + Math.max(0, want - 1)) continue; // 只富集已达 want-1 的矿脉：低两档以上是刻意混入的杂矿，整批拔高会炸掉稀有度阶梯（浅层蓝宝石巨斑就是这么来的）
              this.cells[this.index(x, y)] = ORE_BASE_CELL + want;
            }
          }
        }

        /** Smooth pseudo-noise in 0..1 that makes the rock layers start at irregular depths. */;
        _proto.layerNoise = function layerNoise(x, seed) {
          return 0.5 + 0.3 * Math.sin(x * 0.11 + seed) + 0.2 * Math.sin(x * 0.27 + seed * 2.3);
        }

        /** Hard rock as irregular membranes over soft deep ground: break through a membrane and one shot can
         *  bore very deep into the soft ground under it. The deep floor below the second membrane is mostly soft
         *  too, so a late drill keeps finding new ground instead of grinding one dead layer forever. */;
        _proto.layers = function layers() {
          var _this2 = this;
          var m = CONFIG.map,
            rng = seeded(m.seed + 7);
          for (var x = 0; x < this.width; x++) {
            var h1 = this.layerStart1(x),
              h2 = this.layerStart2(x),
              h3 = this.layerStart3(x),
              h4 = this.layerStart4(x);
            for (var y = Math.max(2, h1); y < this.height; y++) {
              var i = this.index(x, y),
                c = this.cells[i];
              if (this.plain[i]) continue;
              if (c === CELL.MUD) this.cells[i] = y < h1 + 14 ? CELL.HARD1 : y < h2 ? CELL.MUD : y < h2 + 9 ? CELL.HARD2 : y < h3 ? CELL.MUD : y < h3 + 12 ? CELL.HARD3 : y < h4 ? CELL.MUD : y < h4 + 13 ? CELL.HARD4 : CELL.MUD;else if (c === CELL.ROCK && y >= h2) this.cells[i] = y >= h4 ? CELL.HARD4 : y >= h3 ? CELL.HARD3 : CELL.HARD2; // standing rock deep down turns into the membrane that gates that depth
            }
          }

          for (var k = 0; k < 90; k++) {
            // soil pockets and veins break up the hard layers
            var px = rng() * this.width,
              py = m.hard1Start + rng() * (this.height - m.hard1Start - 4);
            this.pocket(px, py, 1 + rng() * 2.4, 0.8 + rng() * 1.6);
          }
          var _loop6 = function _loop6() {
            // lone hard boulders in the deep floors: soft ground with a few teeth, never a second membrane; deeper floors get the harder stone
            var rx = 1.5 + rng() * 2.2,
              ry = 1 + rng() * 1.6;
            var bx = rng() * _this2.width,
              by = m.hard2Start + 16 + rng() * (_this2.height - m.hard2Start - 22);
            var ix = Math.floor(bx),
              iy = Math.floor(by);
            if (_this2.bodies.some(function (b) {
              return ix > b.x - 4 && ix < b.x + b.width + 3 && iy > b.y - 4 && iy < b.y + b.height + 3;
            })) return 1; // continue
            _this2.blob(bx, by, rx, ry, iy >= m.hard4Start ? CELL.HARD4 : iy >= m.hard3Start ? CELL.HARD3 : CELL.HARD2);
          };
          for (var _k = 0; _k < 26; _k++) {
            if (_loop6()) continue;
          }
          for (var _y6 = this.height - 2; _y6 < this.height; _y6++) for (var _x13 = 0; _x13 < this.width; _x13++) this.cells[this.index(_x13, _y6)] = CELL.BEDROCK;
        };
        _proto.pocket = function pocket(cx, cy, rx, ry) {
          for (var j = Math.floor(cy - ry); j <= Math.ceil(cy + ry); j++) for (var i = Math.floor(cx - rx); i <= Math.ceil(cx + rx); i++) {
            var dx = (i + 0.5 - cx) / rx,
              dy = (j + 0.5 - cy) / ry,
              c = this.get(i, j);
            if (dx * dx + dy * dy <= 1 && (c === CELL.HARD1 || c === CELL.HARD2 || c === CELL.HARD3 || c === CELL.HARD4)) this.set(i, j, CELL.MUD);
          }
        }

        /** 0 near the surface, 1 by the soft band under the first rock membrane: vein and boulder size and big-body
         *  payout grow with DEPTH — the deep is richer, distance only caps which tier a vein may be. */;
        _proto.richness = function richness(x, y) {
          return Math.max(0, Math.min(1, (y - 8) / 70));
        }

        /** First solid row at or below `fromY` in a column, or -1. */;
        _proto.floorRow = function floorRow(x, fromY) {
          for (var y = Math.max(0, fromY); y < this.height; y++) if (this.get(x, y) !== CELL.EMPTY) return y;
          return -1;
        }

        /** A cave with rocks growing up from its floor. */;
        _proto.cave = function cave(cx, cy, rx, ry, rng) {
          this.blob(cx, cy, rx, ry, CELL.EMPTY);
          var rocks = 1 + Math.floor(rng() * 3);
          for (var k = 0; k < rocks; k++) {
            var x = Math.floor(cx + (rng() - 0.5) * rx * 1.5),
              floor = this.floorRow(x, Math.floor(cy));
            if (floor < 1) continue;
            var height = 1 + Math.floor(rng() * 3);
            for (var j = 1; j <= height; j++) if (this.get(x, floor - j) === CELL.EMPTY) this.set(x, floor - j, CELL.ROCK);
            if (height >= 2) for (var _i = 0, _arr = [-1, 1]; _i < _arr.length; _i++) {
              var dx = _arr[_i];
              if (this.get(x + dx, floor - 1) === CELL.EMPTY && rng() < 0.7) this.set(x + dx, floor - 1, CELL.ROCK);
            }
          }
        };
        _proto.layerStart1 = function layerStart1(x) {
          var m = CONFIG.map;
          return Math.floor(m.hard1Start + (this.layerNoise(x, 1.7) - 0.5) * 2 * m.hard1Amp);
        };
        _proto.layerStart2 = function layerStart2(x) {
          var m = CONFIG.map;
          return Math.floor(m.hard2Start + (this.layerNoise(x, 4.1) - 0.5) * 2 * m.hard2Amp);
        };
        _proto.layerStart3 = function layerStart3(x) {
          var m = CONFIG.map;
          return Math.floor(m.hard3Start + (this.layerNoise(x, 6.9) - 0.5) * 2 * m.hard3Amp);
        };
        _proto.layerStart4 = function layerStart4(x) {
          var m = CONFIG.map;
          return Math.floor(m.hard4Start + (this.layerNoise(x, 9.3) - 0.5) * 2 * m.hard4Amp);
        }

        /** Zone k is the stretch of ground that a cannon of level k can newly reach. */;
        _proto.zoneOf = function zoneOf(x) {
          var d = Math.abs(x - CONFIG.cannon.x);
          var zone = 0;
          for (var _iterator3 = _createForOfIteratorHelperLoose(CONFIG.map.zoneEdges), _step3; !(_step3 = _iterator3()).done;) {
            var edge = _step3.value;
            if (d > edge) zone++;
          }
          return zone;
        }

        /** 0 soft top soil, 1-4 below each hardness membrane. Deeper bands are HARDER to dig, not richer: what ore
         *  lives here is decided purely by distance from the cannon, so a vertical shaft never out-runs the cannon. */;
        _proto.bandOf = function bandOf(x, y) {
          return y >= this.layerStart4(x) ? 4 : y >= this.layerStart3(x) ? 3 : y >= this.layerStart2(x) ? 2 : y >= this.layerStart1(x) ? 1 : 0;
        }

        /**
         * Ore tier of a spot: the zone the cannon must reach to dig here — depth alone never tiers the loot.
         * The ores a cannon level needs for its next upgrade lie in the zones it can already reach; anything
         * richer sits in farther ground, behind a harder membrane, or both (and costs 3-6x to force).
         */
        /** 越深越稀有、越浅越普通（深度决定自然矿级），水平距离是总闸（近炮台处再深也封顶在低阶矿——冻结的
         *  ore-overreach 检查按水平射程封顶）。返回「自然基础矿级」0~14，pickOre 的 bump 最多再 +1。 */;
        _proto.oreLevelAt = function oreLevelAt(x, y) {
          return Math.min(oreIndexFor(this.zoneOf(x)), this.depthOre(y));
        }

        /** 深度矿级：depthBands[i] 是第 i 级矿的自然露头深度——地表只有煤铜铁，宝石藏在岩膜之下。 */;
        _proto.depthOre = function depthOre(y) {
          var z = -1;
          for (var _iterator4 = _createForOfIteratorHelperLoose(CONFIG.map.depthBands), _step4; !(_step4 = _iterator4()).done;) {
            var edge = _step4.value;
            if (y >= edge) z++;
          }
          return Math.max(0, z);
        };
        _proto.pickOre = function pickOre(x, y, rng) {
          var r = rng(),
            lvl = this.oreLevelAt(x, y),
            common = CONFIG.map.commonOre;
          // 深层不再断供基础材料：每片矿约一成六直接是煤铜铁银金——远处也能补上工坊要的基础矿材。
          // 富矿 bump 26%：同带内更稀的一级出现率一定低于基级（基矿 ~58%、bump 26%、杂质 16%）。
          if (common > 0 && lvl >= CONFIG.map.commonOreFromLevel && r < CONFIG.map.commonOreChance) {
            var top = lvl; // 全谱混入：宝石矿田里也能刮出煤铜铁——越普通的层占比越大（三角权重），没有任何一层会缺席
            var h = Math.imul(x + 1, 374761393) + Math.imul(y + 1, 668265263); // splitmix finalizer: unbiased over any modulus, unlike raw imul/xor (mod 17 it starved the whole bottom map of coal)
            h = Math.imul(h ^ h >>> 13, 1274126177);
            h ^= h >>> 16;
            var u = (h >>> 0) / 4294967296; // 三角权重：普通矿混入率高于稀有矿（越普通越常见）
            return ORE_BASE_CELL + Math.min(top, Math.floor((top + 1) * (1 - Math.sqrt(u))));
          }
          var bump = lvl >= 13 ? r >= CONFIG.map.commonOreChance && r < CONFIG.map.commonOreChance + 0.03 : lvl >= CONFIG.map.commonOreFromLevel ? r >= CONFIG.map.commonOreChance && r < CONFIG.map.commonOreChance + 0.26 : r < 0.26; // 宝石档（13+）bump 3%（与红宝石伴生同频）：铱必须比红宝石密，深部 26% 旧值会让红宝石反超
          var idx = Math.min(ORES.length - 1, lvl + (bump ? 1 : 0)); // richer bumps are kept rare: too many and the ore the cannon actually needs turns scarce
          return ORE_BASE_CELL + idx;
        }

        /** The deep floor is a honeycomb of old mine caves: many, overlapping into linked tunnels that a drill
         *  flies through for free once it breaks in — deep shots coast sideways between the gambling veins.
         *  Its own RNG stream keeps scatter, layers and deepOre (and their seeded tests) byte-identical. */;
        _proto.deepCaves = function deepCaves() {
          var rng = seeded(CONFIG.map.seed + 0x5eed),
            span = function span(a, b) {
              return a + rng() * (b - a);
            };
          for (var x = 5; x < this.width - 4; x += span(3.5, 7)) {
            if (rng() < 0.08) continue; // a few bare stretches: not one endless open shaft
            var h3 = this.layerStart3(Math.floor(x)),
              h4 = this.layerStart4(Math.floor(x));
            var band = rng(); // caves live in the three soft bands between the four membranes — never a hole through a hardness gate, all the way down to the abyss floor
            var cy = band < 0.4 ? span(this.layerStart2(Math.floor(x)) + 20, h3 - 6) : band < 0.7 ? span(h3 + 18, h4 - 6) : span(h4 + 19, this.height - 12);
            this.cave(x + span(-2, 2), cy, span(2.2, 4.6), span(1.2, 2.6), rng);
          }
        }

        /** Extra ore far down: veins multiply and swell with depth, but what TIER they are is pure distance from
         *  the cannon — depth hardens rock, never enriches ore. The hard layers also hold the regular ores of
         *  their zone tier, so soft soil emptied near the cannon never dead-ends an upgrade.
         *  A side RNG stream keeps the base terrain layout (and its seeded tests) untouched; only deep cells gain ore patches. */;
        _proto.deepOre = function deepOre() {
          var _this3 = this;
          var rng = seeded(CONFIG.map.seed + 0x9e37),
            span = function span(a, b) {
              return a + rng() * (b - a);
            };
          var _loop7 = function _loop7() {
              var bx = x + span(-2, 2),
                by = span(42, _this3.height - 6); // starts at the first hard layer: dig through and you find every tier of ore
              if (rng() > 0.95 - Math.max(0, Math.min(1, (by - 42) / (_this3.height - 48))) * 0.35) return 0; // continue
              // 越深的矿脉越稀（浅处 95% 站点出矿，底仓只剩 60%）——越深越稀有，稀有必更稀有
              var ix = Math.floor(bx),
                iy = Math.floor(by);
              if (_this3.bodies.some(function (b) {
                return ix > b.x - 4 && ix < b.x + b.width + 3 && iy > b.y - 4 && iy < b.y + b.height + 3;
              })) return 0; // continue
              // keep the plain-soil ring around big bodies
              _this3.blob(bx, Math.max(_this3.layerStart1(ix) + 3, by), 0.8 + rng() * 1.8, 0.7 + rng() * 1.5, _this3.pickOre(ix, Math.max(_this3.layerStart1(ix) + 3, iy), rng)); // sparse and wildly sized: most of the deep floor is bare, one lucky patch pays for a dozen dry shots
            },
            _ret3;
          for (var x = 6; x < this.width - 4; x += span(9, 18)) {
            _ret3 = _loop7();
            if (_ret3 === 0) continue;
          }
          // 越深矿脉越少、但每脉更大更富（矿级随深度上升）——稀有矿在全图密度始终低于普通矿（用户规则），
          // 深钻的回报是「一条顶十条」的巨脉，不是更密的矿网（一次短钻只刮到一小片，赌博感仍在）。
          for (var row = 170; row < this.height - 8; row += 16) {
            var deep = Math.max(0, row - 240) / (this.height - 248); // 0 where the deep floors begin, 1 at the bottom — veins get SPARSER but stay big and rich
            var _loop8 = function _loop8() {
              // 深渊矿脉至少 3 条/行（原 2）：毕业（L10）进深渊撞得上富矿，空炮连击不再拖到 10
              var bx = span(6, _this3.width - 6),
                by = row + span(0, 16);
              var ix = Math.floor(bx),
                iy = Math.floor(by);
              if (_this3.bodies.some(function (b) {
                return ix > b.x - 4 && ix < b.x + b.width + 3 && iy > b.y - 4 && iy < b.y + b.height + 3;
              })) return 1; // continue
              var veinLvl = Math.min(11, _this3.oreLevelAt(ix, iy)); // 深渊长脉封顶流明矿(11)=深渊主矿：铱(12)靠 bump 2%，红宝石(13)靠伴生 6%，蓝宝石(14)靠伴生 3%，绿宝(15)/钻石(16)靠 dg 小脉——越值钱越罕见
              var gemRoll = rng();
              var topRow = row < 360 && rng() < 0.4; // 深渊顶带 40% 矿脉升成流明矿：毕业后（L10）先撞上 202 币富矿带，毕业钱包不再负中位（收尾阶梯仍会把铱以上压回阶梯）
              _this3.blob(bx, by, 0.9 + rng() * 1.6 + deep * 1.7, 0.7 + rng() * 1.2 + deep * 0.8, ORE_BASE_CELL + (topRow ? 11 : veinLvl + (gemRoll < 0.03 ? 2 : gemRoll < 0.05 ? 3 : gemRoll < 0.07 ? 4 : 0))); // 3% 红宝石(+2)、1.5% 蓝宝石(+3)：阶梯 rub>sap
              if (gemRoll < 0.07) _this3.blob(bx + span(-8, 8), by + span(-6, 6), 1.2 + rng() * 0.6, 1.0 + rng() * 0.5, ORE_BASE_CELL + veinLvl + (gemRoll < 0.03 ? 2 : gemRoll < 0.05 ? 3 : 4)); // 独立宝石小脉：不被主脉盖掉，保证 红宝石>蓝宝石 的密度差真的存在；绿宝 0.05-0.07（1.2%→2%）：pressureL3 需 18 绿宝，min 种子 19 格贴脸
              if (veinLvl >= 12 && rng() < 0.03 + deep * 0.07) _this3.blob(bx + span(-6, 6), by + span(-4, 4), 1.0 + rng() * 0.7, 0.8 + rng() * 0.5, ORE_BASE_CELL + Math.min(ORES.length - 1, veinLvl + 4)); // 钻石=绿宝的 1/5 概率：最稀有必须最稀有
              var far = Math.max(0, Math.min(1, (bx - CONFIG.cannon.x) / 130)); // 距离轴：离炮台越远的矿脉越可能带一条伴生矿；深度越深伴生越少（稀有必更稀有）
              if (rng() < far * (0.85 - deep * 0.45)) {
                var tx = span(6, _this3.width - 6),
                  ty = row + span(0, 16);
                var ti = Math.floor(tx),
                  tj = Math.floor(ty);
                if (!_this3.bodies.some(function (b) {
                  return ti > b.x - 4 && ti < b.x + b.width + 3 && tj > b.y - 4 && tj < b.y + b.height + 3;
                })) _this3.blob(tx, ty, 0.7 + rng() * 1.2 + deep * 1.2, 0.6 + rng() * 1.0 + deep * 0.6, _this3.pickOre(ti, tj, rng));
              }
              var diaPatches = 0; // 宝石斑块计数：绿宝封顶 10 块、钻石封顶 6 块——保证 钻石<绿宝<蓝宝石 的阶梯任何 seed 都成立
              var dg = span(6, _this3.width - 6),
                dgy = row + span(0, 16); // 深渊宝石小脉：远端低概率画绿宝（+3），更远处再低概率画钻石（+4）——最稀有必须最稀有
              if (diaPatches < 6 && rng() < 0.05 + deep * 0.10) {
                diaPatches++;
                _this3.blob(dg, dgy, 0.8 + rng() * 0.5, 0.7 + rng() * 0.4, ORE_BASE_CELL + 16);
              } // 钻石：全图最稀有——只住在深渊（y240+），深度就是它的门票；封顶 3→6（min 种子 6 格 < pressureL4 需 12 → 死单，抬到 ≥24）
            };

            for (var k = 0, n = 3 + Math.round((1 - deep) * 2); k < n; k++) {
              if (_loop8()) continue;
            }
          }
        }

        /** Reproducible strata for everything beyond the hand-placed opening. */;
        _proto.scatter = function scatter() {
          var rng = seeded(CONFIG.map.seed),
            span = function span(a, b) {
              return a + rng() * (b - a);
            };
          for (var x = 3; x < this.width - 3; x += span(1.6, 3)) {
            for (var k = 0; k < 3; k++) {
              var roll = rng();
              var y = roll < 0.56 && rng() < 0.6 ? span(2, 44) : span(2, 136); // most ore patches lie in the soft soil; below 136 is the deep floor's business
              var rich = this.richness(x, y); // 深度决定矿脉富度：浅层小、深处大
              if (roll < 0.56) this.blob(x, y, span(1.3, 2.3) * (1 + rich * 0.4), span(1.1, 1.8), this.pickOre(x, y, rng));else if (roll < 0.72) this.rect(Math.floor(x), Math.floor(y), Math.floor(span(3, 8)), Math.floor(span(1, 3)), CELL.ROCK);else if (y > 5) this.cave(x, y, span(2.4, 4.4), span(1.4, 2.2), rng);
            }
          }
        }

        /** Guarantees a few patches of every ore a cannon level needs in the soft soil of the zone it opens. */;
        _proto.guaranteeDeposits = function guaranteeDeposits(rng) {
          var _this4 = this;
          var edges = [0].concat(CONFIG.map.zoneEdges);
          for (var zone = 0; zone < edges.length; zone++) {
            var last = zone === edges.length - 2; // the last zone: pull the patches 4 tiles closer so a shot at that level can still reach them
            for (var pair = 0; pair < 2; pair++) for (var k = 0, n = 3 + Math.floor(zone / 3) + (pair === 0 ? Math.floor(zone / 3) : 0); k < n; k++) {
              // 宝石副矿(pair1 t13+)不再加成片数：浅层蓝宝石巨斑 62-63 格超门禁 50——宝石密度靠深渊伴生脉维持，浅层只留基础 3 片   // farther zones: the main ore gets extra patches so it is findable at range（分窗+矿体避让修好后 3 片就够 12 格门禁，宝石不会因此爆密度）
              // 两片保底矿分窗不互涂：主矿(pair0)住本带近侧，副矿(pair1)住远侧——否则后画的副矿会把主矿整个盖掉，
              // 低 seed 的炮台就永远凑不齐上一级订单（L5 的秘银被 L6 的钛整片盖没就是这么来的）。
              var near = zone === 0 ? 5 : pair === 1 ? zone >= 7 || last ? edges[zone] + 6 : edges[zone + 1] - 7 : zone === 6 ? edges[zone] - 8 : last ? edges[zone] + 1 : edges[zone] + 2; // 主矿(pair0)住带区近侧（zone6 再向近侧扩 8 格给 Lv9 顺路取货），副矿(pair1)住远侧 3 格——两窗彻底分离
              var far = zone >= 7 || last ? pair === 0 ? edges[zone] + 6 : edges[zone] + 9 : pair === 0 ? edges[zone + 1] - 7 : edges[zone + 1] - 4; // 仍 ≤ reach(本级)−spill，永不越级进上一级的射程
              var lo = Math.ceil(CONFIG.cannon.x + near),
                hi = Math.min(this.width - 4, Math.floor(CONFIG.cannon.x + far));
              if (hi <= lo) continue;
              var tRaw = oreIndexFor(zone) + pair;
              var t = Math.min(ORES.length - 1, tRaw); // 这片保底矿的矿级（tRaw>=15 是宝石副矿：改画小片散点，浅层不再出现 60+ 格的顶级宝石巨矿斑）
              // 矿体必须坐在纯净土上（冻结测试）：保底矿若贴着矿体就换一处再画，最多试 6 处（与 deepOre 同一避让环）
              var _loop9 = function _loop9() {
                  var x = lo + rng() * (hi - lo);
                  var y;
                  if (t <= 6) y = 4 + rng() * 22; // 基础保底矿住浅层
                  else {
                    // 高阶保底矿画在本列软土层底部上方 16~11 格（blob 半径 2 也绝不进岩膜——硬膜里的矿不计入射程覆盖检查）
                    var s1 = _this4.layerStart1(Math.floor(x));
                    y = Math.max(8, s1 - 16) + rng() * 12; // 软土底 10 格散布（16→12 起）：宝石级 blob 不拖进岩膜——岩膜 upgradeOre 会把浅层蓝宝石整列拔成 50+ 格巨斑（浅层稀有矿视觉违和）
                  }

                  var inRing = _this4.bodies.some(function (b) {
                    return x > b.x - 4 && x < b.x + b.width + 3 && y > b.y - 4 && y < b.y + b.height + 3;
                  });
                  if (inRing) return 0; // continue
                  var gem = tRaw >= 13;
                  var rx = gem ? 0.9 + rng() * 0.4 : 1.8 + rng() * 0.6 + 0.04 * zone + (zone >= 8 && !last && pair === 0 ? rng() * 0.5 : 0);
                  var ry = gem ? 0.8 + rng() * 0.3 : 1.4 + rng() * 0.5 + (zone >= 8 && !last && pair === 0 ? rng() * 0.4 : 0);
                  _this4.blob(x, y, rx, ry, ORE_BASE_CELL + t); // 非宝石：越远越多越大；宝石副矿：小片   // farther zones: more and bigger patches
                  return 1; // break
                },
                _ret4;
              for (var attempt = 0; attempt < 10; attempt++) {
                _ret4 = _loop9();
                if (_ret4 === 0) continue;
                if (_ret4 === 1) break;
              }
            }
          }
        }

        /**
         * A big ore body is drawn over a wide patch of plain soil (no other ore, rock or cave) so its see-through
         * edges never show a hole or another tile behind it.
         */;
        _proto.addBody = function addBody(x, y, rich, variant) {
          var big = CONFIG.bigGold,
            margin = 2;
          for (var j = y - margin; j < y + big.height + margin; j++) for (var i = x - margin; i < x + big.width + margin; i++) {
            if (!this.inBounds(i, j) || j < 2) continue;
            var idx = this.index(i, j);
            if (this.cells[idx] === CELL.FOUNDATION) continue;
            this.cells[idx] = CELL.MUD;
            this.plain[idx] = 1;
          }
          var body = {
            id: (x - CONFIG.map.worldLeft) * 16 + Math.floor(y / 65),
            // position-keyed so the id never depends on the order bodies were generated in: a save's bodyHp survives reloads however the world grew
            x: x,
            y: y,
            width: big.width,
            height: big.height,
            variant: variant,
            maxHp: big.hp * (1 + rich * 1.5),
            hp: big.hp * (1 + rich * 1.5),
            oreReward: Math.round(big.oreReward * (1 + rich * 2)),
            cells: []
          };
          for (var _j = y; _j < y + big.height; _j++) for (var _i2 = x; _i2 < x + big.width; _i2++) {
            if (!this.inBounds(_i2, _j)) continue;
            var _idx = this.index(_i2, _j);
            this.cells[_idx] = CELL.BIG_GOLD;
            this.bodyAt[_idx] = body.id;
            body.cells.push(_idx);
          }
          this.bodies.push(body);
        };
        _proto.clear = function clear(idx) {
          this.cells[idx] = CELL.EMPTY;
          this.bodyAt[idx] = -1;
          this.version++;
        };
        _proto.breakBody = function breakBody(body) {
          body.hp = 0;
          for (var _iterator5 = _createForOfIteratorHelperLoose(body.cells), _step5; !(_step5 = _iterator5()).done;) {
            var idx = _step5.value;
            this.clear(idx);
          }
        }

        /** Solid cells whose square touches a circle of `radius` swept along the segment, nearest first. */;
        _proto.solidsInSweep = function solidsInSweep(ax, ay, bx, by, radius) {
          var minX = Math.max(this.left, Math.floor(Math.min(ax, bx) - radius)),
            maxX = Math.min(this.left + this.width - 1, Math.floor(Math.max(ax, bx) + radius));
          var minY = Math.max(0, Math.floor(Math.min(ay, by) - radius)),
            maxY = Math.min(this.height - 1, Math.floor(Math.max(ay, by) + radius));
          var len = Math.hypot(bx - ax, by - ay),
            samples = Math.max(1, Math.ceil(len / 0.02));
          var hits = [];
          for (var y = minY; y <= maxY; y++) for (var x = minX; x <= maxX; x++) {
            var idx = this.index(x, y);
            if (this.cells[idx] === CELL.EMPTY) continue;
            for (var s = 0; s <= samples; s++) {
              var t = s / samples,
                px = ax + (bx - ax) * t,
                py = ay + (by - ay) * t;
              var qx = Math.max(x, Math.min(x + 1, px)),
                qy = Math.max(y, Math.min(y + 1, py));
              var d = Math.hypot(px - qx, py - qy);
              if (d <= radius) {
                hits.push({
                  idx: idx,
                  at: t,
                  d: d
                });
                break;
              }
            }
          }
          hits.sort(function (p, q) {
            return p.at - q.at || p.d - q.d || p.idx - q.idx;
          });
          return hits.map(function (h) {
            return h.idx;
          });
        }

        /** Clears every solid cell not in the saved state and restores ore-body damage. */;
        _proto.applySaved = function applySaved(clearedCells, bodyHp) {
          for (var _iterator6 = _createForOfIteratorHelperLoose(clearedCells), _step6; !(_step6 = _iterator6()).done;) {
            var idx = _step6.value;
            if (idx < 0 || idx >= this.cells.length) continue;
            this.clear(idx);
            var _this$xy = this.xy(idx),
              cx = _this$xy[0],
              cy = _this$xy[1];
            this.reveal(cx + 0.5, cy + 0.5, CONFIG.view.revealRadius);
          }
          for (var _iterator7 = _createForOfIteratorHelperLoose(this.bodies), _step7; !(_step7 = _iterator7()).done;) {
            var body = _step7.value;
            var saved = bodyHp[String(body.id)];
            if (saved !== undefined) body.hp = saved;
            if (body.hp <= 0) this.breakBody(body);
          }
        };
        _proto.bodyHpSnapshot = function bodyHpSnapshot() {
          var out = {};
          for (var _iterator8 = _createForOfIteratorHelperLoose(this.bodies), _step8; !(_step8 = _iterator8()).done;) {
            var b = _step8.value;
            out[String(b.id)] = b.hp;
          }
          return out;
        };
        return MineMap;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShotSim.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Ballistics.ts', './Config.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, _createClass, cclegacy, flightDirection, flightPoint, CONFIG, CELL, isOre, oreIndex, oreCell, RESOURCE_KEYS;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      flightDirection = module.flightDirection;
      flightPoint = module.flightPoint;
    }, function (module) {
      CONFIG = module.CONFIG;
      CELL = module.CELL;
      isOre = module.isOre;
      oreIndex = module.oreIndex;
      oreCell = module.oreCell;
      RESOURCE_KEYS = module.RESOURCE_KEYS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1b792fYPzNILr0U4ACRCKct", "ShotSim", undefined);

      /** Per-shot modifiers that come from upgrades; stored in the checkpoint so a resumed shot behaves the same. */

      var DEFAULT_MODS = exports('DEFAULT_MODS', {
        drillRadius: CONFIG.sim.drillRadius,
        carveRadius: CONFIG.sim.carveRadius,
        costMult: 1,
        deepCost: 0,
        blastRadius: 0,
        magnetRadius: 0,
        revealRadius: CONFIG.view.revealRadius,
        drillTier: 0,
        oreCostMult: 1,
        speedMult: 1,
        bankMult: 1,
        coinMult: 1,
        oreGainMult: 1,
        shotCharge: 0,
        landFuel: 0,
        magPulse: 0,
        magPulseRadius: 0,
        oreTierMax: 99 // no cannon gate by default: the limit is injected from the store's cannon level
      });

      var EPS = 1e-6;
      var clamp = function clamp(v, a, b) {
        return Math.max(a, Math.min(b, v));
      };

      /** One shot on a fixed tick, so outcomes never depend on the frame rate. */
      var ShotSim = exports('ShotSim', /*#__PURE__*/function () {
        function ShotSim(map, state) {
          this.state = void 0;
          this.map = void 0;
          this.events = [];
          this.lastRevealKey = -1;
          this.map = map;
          this.state = state;
          if (state.overheat === undefined) state.overheat = 0;
          if (state.boreCap === undefined) state.boreCap = 0;
        }
        ShotSim.start = function start(map, shotId, aim, maxFuel, drillPower, mods) {
          var _mods$shotCharge, _mods;
          if (mods === void 0) {
            mods = DEFAULT_MODS;
          }
          var p = flightPoint(aim, 0),
            d = flightDirection(aim, 0);
          var harvest = {};
          for (var _iterator = _createForOfIteratorHelperLoose(RESOURCE_KEYS), _step; !(_step = _iterator()).done;) {
            var k = _step.value;
            harvest[k] = 0;
          }
          return new ShotSim(map, {
            shotId: shotId,
            aim: aim,
            phase: 'flight',
            time: 0,
            x: p.x,
            y: p.y,
            dirX: d.x,
            dirY: d.y,
            fuel: maxFuel * (1 + ((_mods$shotCharge = (_mods = mods) == null ? void 0 : _mods.shotCharge) != null ? _mods$shotCharge : 0)),
            maxFuel: maxFuel,
            landSpeed: 0,
            speed: 0,
            drillPower: drillPower,
            bank: 0,
            mods: _extends({}, DEFAULT_MODS, mods),
            maxDepth: 0,
            blocks: 0,
            coins: 0,
            oreStreak: 0,
            harvest: harvest,
            clearedCells: [],
            bodyHp: map.bodyHpSnapshot(),
            stopReason: '',
            embedTo: null,
            embedReason: ''
          });
        };
        var _proto = ShotSim.prototype;
        _proto.tick = function tick() {
          if (this.state.phase === 'flight') this.tickFlight();else if (this.state.phase === 'dig') this.tickDig();
        };
        _proto.runToEnd = function runToEnd(maxTicks) {
          if (maxTicks === void 0) {
            maxTicks = 400000;
          }
          for (var i = 0; i < maxTicks && !this.done; i++) this.tick();
          return this.state;
        };
        _proto.tickFlight = function tickFlight() {
          var s = this.state,
            dt = 1 / CONFIG.sim.tickRate;
          s.time += dt;
          if (s.time >= s.aim.flightTime) {
            s.time = s.aim.flightTime;
            var _d = flightDirection(s.aim, s.time);
            s.x = s.aim.landingX;
            s.y = 0;
            s.dirX = _d.x;
            s.dirY = _d.y;
            s.landSpeed = Math.hypot(s.aim.speed * Math.cos(s.aim.angle), -s.aim.speed * Math.sin(s.aim.angle) + CONFIG.sim.gravity * s.time);
            if (s.x < this.map.left + 0.5 || s.x > this.map.left + this.map.width - 0.5) {
              this.stop('lost');
              return;
            } // a shell that lands beyond even the grown ground is a wasted shot
            s.speed = s.landSpeed; // no jump: the drill enters the ground at the speed the shell arrived with
            s.overheat = Math.min(s.maxFuel * CONFIG.sim.overdriveCap, s.mods.bankMult * CONFIG.sim.overdriveFactor * s.landSpeed * s.landSpeed); // a hard landing stores fall energy as overdrive: a bar of fire that makes ore easier to pierce
            if (s.mods.landFuel) s.fuel += s.mods.landFuel; // maxed recycler: the shock of hitting ground refills a slab of free fuel
            s.phase = 'dig';
            this.events.push({
              type: 'land',
              x: s.x,
              y: s.y
            });
            return;
          }
          var p = flightPoint(s.aim, s.time),
            d = flightDirection(s.aim, s.time);
          s.x = p.x;
          s.y = p.y;
          s.dirX = d.x;
          s.dirY = d.y;
          if (s.x < this.map.left - 6 || s.x > this.map.left + this.map.width + 6) this.stop('lost'); // shot clean out of the world
        }

        /** Energy available right now: the fuel tank plus whatever braking has banked. */;
        _proto.available = function available() {
          return this.state.fuel + (this.state.bank || 0);
        }

        /** Pays from the bank first, then from fuel. */;
        _proto.spend = function spend(amount) {
          var s = this.state,
            fromBank = Math.min(s.bank || 0, amount);
          s.bank = (s.bank || 0) - fromBank;
          s.fuel = Math.max(0, s.fuel - (amount - fromBank));
        }

        /** Drill speed shrinks as the power runs out. */;
        _proto.powerFactor = function powerFactor() {
          var s = this.state,
            f = clamp(this.available() / Math.max(EPS, s.maxFuel), 0, 1);
          return CONFIG.sim.minPower + (1 - CONFIG.sim.minPower) * Math.pow(f, CONFIG.sim.powerCurve);
        };
        _proto.tickDig = function tickDig() {
          var s = this.state,
            sim = CONFIG.sim,
            m = this.mods,
            r = m.drillRadius;
          if (s.embedTo) {
            this.tickEmbed();
            return;
          }
          this.map.ensureRoom(s.x); // the drill digs where the ground keeps growing: near an edge the world silently extends ahead of it
          // Speed carries momentum: through open tunnel it keeps gaining speed as a falling shell does, and it
          // brakes towards the material's pace when it meets solid ground, so it never jumps.
          var dt = 1 / sim.tickRate,
            current = s.speed || s.landSpeed || sim.speeds.mud;
          var ahead = this.map.solidsInSweep(s.x, s.y, s.x + s.dirX * Math.max(1, current * 0.05), s.y + s.dirY * Math.max(1, current * 0.05), m.carveRadius);
          var speed;
          if (ahead.length) {
            var target = this.speedOf(this.map.cells[ahead[0]]) * this.powerFactor() * m.speedMult;
            speed = current > target ? Math.max(target, current - sim.brake * dt) : Math.min(target, current + sim.digAccel * dt);
            if (speed < current) s.bank = Math.min(s.maxFuel, (s.bank || 0) + m.bankMult * 0.5 * sim.kineticFactor * (current * current - speed * speed)); // braking pays into the bank
            s.boreCap = Math.max(s.boreCap || 0, sim.speeds.mud); // a live bore remembers the pace the walls allow it
          } else if (this.available() <= EPS) {
            speed = current - sim.coastDrag * dt; // out of energy: no more gaining speed from the fall, it coasts to a halt
            if (speed <= 1) {
              this.beginEmbed(0, 'fuel');
              return;
            }
          } else {
            speed = current + sim.gravity * Math.max(0, s.dirY) * dt;
            if (s.boreCap) speed = Math.min(speed, s.boreCap); // in a bore it has dug, the walls cap the pace; a wild cave still lets it fall and gain
          }

          speed = clamp(speed, 0.3, sim.maxDigSpeed);
          if (s.y > sim.plumbFrom) s.dirX *= 1 - sim.plumb * dt; // deep strata plumb the shaft: below plumbFrom the walls push the drill back toward vertical, so every later shot re-enters the same shaft and the abyss grows straight down
          s.speed = speed;
          var step = speed / sim.tickRate;
          var nx = s.x + s.dirX * step,
            ny = s.y + s.dirY * step;
          var bound = '';

          // Clip the step to the playable bounds. The map edge is NOT a gameplay "mine boundary" any more — the real
          // frontier is the range fence (GameRoot.drawBoundary), which slides outward with every range upgrade and
          // only merges with the map edge at max cannon. Physics stays untouched: the fence is where the arc ends.
          var frac = 1;
          if (nx < r) {
            frac = Math.min(frac, (r - s.x) / (nx - s.x));
            bound = 'edge';
          }
          if (nx > this.map.left + this.map.width - r) {
            frac = Math.min(frac, (this.map.left + this.map.width - r - s.x) / (nx - s.x));
            bound = 'edge';
          }
          if (ny > this.map.height - r) {
            var f = (this.map.height - r - s.y) / (ny - s.y);
            if (f <= frac) {
              frac = f;
              bound = 'bottom';
            }
          }
          if (bound) {
            frac = Math.max(0, frac);
            nx = s.x + (nx - s.x) * frac;
            ny = s.y + (ny - s.y) * frac;
          }
          var solids = this.map.solidsInSweep(s.x, s.y, nx, ny, m.carveRadius);
          for (var _iterator2 = _createForOfIteratorHelperLoose(solids), _step2; !(_step2 = _iterator2()).done;) {
            var _def$tier;
            var idx = _step2.value;
            var cell = this.map.cells[idx];
            if (cell === CELL.EMPTY) continue; // cleared earlier this tick by a broken body
            if (cell === CELL.FOUNDATION) {
              this.beginEmbed(idx, 'blocked');
              return;
            }
            if (cell === CELL.BEDROCK) {
              this.beginEmbed(idx, 'bedrock');
              return;
            }
            if (cell === CELL.BIG_GOLD) {
              if (!this.drillBody(this.map.bodyAt[idx], idx)) return;
              continue;
            }
            var def = CONFIG.cells[cell];
            if (((_def$tier = def.tier) != null ? _def$tier : 0) > m.drillTier) {
              this.beginEmbed(idx, 'hard');
              return;
            }
            var over = (s.overheat || 0) > 0; // fall energy stored on landing: while the fire bar burns, ore takes this much less to pierce
            var press = 1 + Math.max(0, s.y - CONFIG.sim.deepPressFrom) * CONFIG.sim.deepPressPer * (1 - Math.min(0.6, m.deepCost)); // 深部挤压：千米之下每格都更沉，钻头增压最多削掉六成
            var ot = isOre(cell) ? oreIndex(cell) - m.oreTierMax : 0; // 越级矿：超出当前炮台允许的最富一级——越一级 3 倍、越两级以上 6 倍能量才钻得动
            var overMult = ot <= 0 ? 1 : ot === 1 ? 3 : 6;
            var cost = def.cost * press * m.costMult * (isOre(cell) ? m.oreCostMult * overMult * (over ? 1 - CONFIG.sim.overdriveOreBonus : 1) : 1) / s.drillPower;
            if (this.available() + EPS < cost) {
              this.beginEmbed(idx, 'fuel');
              return;
            }
            this.spend(cost);
            if (isOre(cell)) s.bank = Math.min(s.maxFuel, (s.bank || 0) + cost * CONFIG.sim.oreGain * m.oreGainMult); // piercing ore kicks energy back: a fat vein recharges the drill and it keeps boring down
            this.collect(idx, cell);
            if (isOre(cell) && over) s.overheat = Math.max(0, (s.overheat || 0) - CONFIG.sim.overdriveBurn); // every ore pierced blows a little of the fire away
            if (isOre(cell)) {
              s.oreStreak = (s.oreStreak || 0) + 1;
              if (m.magPulse > 0 && s.oreStreak >= m.magPulse) {
                // 磁场炸弹：攒够几格矿石，磁场引爆，免费炸走旁边一小片矿
                s.oreStreak = 0;
                this.areaClear('magnet', m.magPulseRadius, true);
              }
            }
          }
          s.x = nx;
          s.y = ny;
          var cellKey = Math.floor(nx) * 4096 + Math.floor(ny);
          if (cellKey !== this.lastRevealKey) {
            this.lastRevealKey = cellKey;
            this.map.reveal(nx, ny, m.revealRadius);
          }
          s.maxDepth = Math.max(s.maxDepth, s.y);
          if (bound) this.stop(bound);
        };
        _proto.speedOf = function speedOf(cell) {
          var v = CONFIG.sim.speeds;
          switch (cell) {
            case CELL.MUD:
              return v.mud;
            case CELL.HARD1:
              return v.hard1;
            case CELL.HARD2:
            case CELL.BEDROCK:
              return v.hard2;
            default:
              // Ore is never soft like soil: the drill sinks into it and bores, and rarer, denser ore bores even slower than rock.
              if (isOre(cell)) return Math.max(v.hard2 + 1, v.ore - (CONFIG.cells[cell].cost - 2) * 0.8);
              return v.rock;
          }
        }

        /** Rewards one cell: clears it and credits its coins and resource. */;
        _proto.collect = function collect(idx, cell) {
          var _s$harvest$def$key;
          var s = this.state,
            def = CONFIG.cells[cell],
            value = Math.ceil(def.coins * this.mods.coinMult - 1e-9);
          this.map.clear(idx);
          s.clearedCells.push(idx);
          s.blocks++;
          s.coins += value;
          s.harvest[def.key] = ((_s$harvest$def$key = s.harvest[def.key]) != null ? _s$harvest$def$key : 0) + 1;
          this.events.push({
            type: 'clear',
            idx: idx,
            cell: cell,
            coins: value
          });
        }

        /**
         * The drill must never end in mid-air, so it keeps travelling straight along its heading into the first block
         * on its path. This only picks the target; tickEmbed moves it there, so the nose visibly sinks in and never slides sideways.
         */;
        _proto.beginEmbed = function beginEmbed(_idx, reason) {
          var s = this.state,
            depth = 0.42;
          var tx = s.x,
            ty = s.y;
          for (var t = 0; t <= 12; t += 0.02) {
            var x = s.x + s.dirX * t,
              y = s.y + s.dirY * t;
            if (this.map.get(Math.floor(x), Math.floor(y)) !== CELL.EMPTY) {
              tx = x + s.dirX * depth;
              ty = y + s.dirY * depth;
              if (this.map.get(Math.floor(tx), Math.floor(ty)) === CELL.EMPTY) {
                tx = x;
                ty = y;
              } // the bite would cross into open space: rest on the rim instead
              break;
            }
          }
          if (tx === s.x && ty === s.y) {
            // no solid within reach ahead (long tunnel or natural cave): sink back into the wall just drilled through
            var fresh = new Set(s.clearedCells); // this shot's own tunnel is open now, but it was solid ground when it stopped the shell
            for (var _t = 0.02; _t <= 24; _t += 0.02) {
              var _x = s.x - s.dirX * _t,
                _y = s.y - s.dirY * _t;
              var i = this.map.index(Math.floor(_x), Math.floor(_y));
              if (this.map.get(Math.floor(_x), Math.floor(_y)) !== CELL.EMPTY && !fresh.has(i)) {
                tx = _x - s.dirX * depth;
                ty = _y - s.dirY * depth;
                if (this.map.get(Math.floor(tx), Math.floor(ty)) === CELL.EMPTY) {
                  tx = _x;
                  ty = _y;
                }
                break;
              }
            }
          }
          s.embedTo = {
            x: clamp(tx, this.map.left + this.mods.drillRadius, this.map.left + this.map.width - this.mods.drillRadius),
            y: clamp(ty, 0, this.map.height - this.mods.drillRadius)
          };
          s.embedReason = reason;
        };
        _proto.tickEmbed = function tickEmbed() {
          var s = this.state,
            target = s.embedTo;
          var dx = target.x - s.x,
            dy = target.y - s.y,
            dist = Math.hypot(dx, dy);
          s.speed = Math.max(CONFIG.sim.embedSpeed, dist * 4); // eases out: quick over a long gap, a slow sink at the end
          var step = s.speed / CONFIG.sim.tickRate;
          if (dist <= step) {
            s.x = target.x;
            s.y = target.y;
            var reason = s.embedReason;
            s.embedTo = null;
            this.stop(reason);
            return;
          }
          s.x += dx / dist * step;
          s.y += dy / dist * step;
          s.maxDepth = Math.max(s.maxDepth, s.y);
        };
        _proto.breakBody = function breakBody(body) {
          var _s$clearedCells, _s$harvest$gold;
          var s = this.state,
            cells = body.cells.slice();
          this.map.breakBody(body);
          (_s$clearedCells = s.clearedCells).push.apply(_s$clearedCells, cells);
          s.blocks += cells.length;
          var coins = Math.ceil(body.oreReward * CONFIG.cells[oreCell('gold')].coins * this.mods.coinMult - 1e-9);
          s.coins += coins;
          s.harvest.gold = ((_s$harvest$gold = s.harvest.gold) != null ? _s$harvest$gold : 0) + body.oreReward;
          s.bodyHp[String(body.id)] = 0;
          this.events.push({
            type: 'bodyBreak',
            bodyId: body.id,
            coins: coins
          });
        }

        /** Returns true once the body is gone and the drill may keep moving this tick. */;
        _proto.drillBody = function drillBody(bodyId, idx) {
          var s = this.state,
            body = this.map.bodies.find(function (b) {
              return b.id === bodyId;
            }),
            mult = Math.max(EPS, this.mods.costMult); // body ids are position-keyed, not array indexes
          if (this.available() <= EPS) {
            this.beginEmbed(idx, 'fuel');
            return false;
          }
          var use = Math.min(this.available(), CONFIG.sim.bigOreFuelPerSecond * mult / CONFIG.sim.tickRate, body.hp * mult / s.drillPower);
          this.spend(use);
          body.hp = Math.max(0, body.hp - use * s.drillPower / mult);
          if (body.hp <= EPS) {
            this.breakBody(body);
            return true;
          }
          s.bodyHp[String(body.id)] = body.hp;
          this.events.push({
            type: 'bodyHit',
            bodyId: bodyId
          });
          if (this.available() <= EPS) this.beginEmbed(idx, 'fuel');
          return false;
        }

        /** Explosion and magnet go off where the drill came to rest, free of fuel cost. */;
        _proto.finale = function finale() {
          var m = this.mods;
          if (m.blastRadius > 0) this.areaClear('blast', m.blastRadius);
          if (m.magnetRadius > 0) this.areaClear('magnet', m.magnetRadius);
          var s = this.state;
          this.map.reveal(s.x, s.y, Math.max(m.revealRadius, m.blastRadius + 1, m.magnetRadius));
        };
        _proto.areaClear = function areaClear(kind, radius, pulse) {
          var _this = this;
          if (pulse === void 0) {
            pulse = false;
          }
          var s = this.state,
            map = this.map,
            r2 = radius * radius,
            hit = new Set(),
            tier = this.mods.drillTier;
          this.events.push(_extends({
            type: kind,
            x: s.x,
            y: s.y,
            radius: radius
          }, pulse ? {
            pulse: true
          } : {}));
          for (var y = Math.max(0, Math.floor(s.y - radius)); y <= Math.min(map.height - 1, Math.ceil(s.y + radius)); y++) {
            var _loop = function _loop() {
                var _CONFIG$cells$cell$ti;
                var idx = map.index(x, y),
                  cell = map.cells[idx];
                if (cell === CELL.EMPTY || cell === CELL.FOUNDATION || cell === CELL.BEDROCK) return 0; // continue
                var dx = x + 0.5 - s.x,
                  dy = y + 0.5 - s.y;
                if (dx * dx + dy * dy > r2) return 0; // continue
                if (cell === CELL.BIG_GOLD) {
                  var id = map.bodyAt[idx],
                    body = map.bodies.find(function (b) {
                      return b.id === id;
                    });
                  if (kind !== 'blast' || hit.has(id) || !body || body.hp <= 0) return 0; // continue
                  hit.add(id);
                  body.hp = Math.max(0, body.hp - body.maxHp * 0.3);
                  s.bodyHp[String(id)] = body.hp;
                  if (body.hp <= EPS) _this.breakBody(body);else _this.events.push({
                    type: 'bodyHit',
                    bodyId: id
                  });
                  return 0; // continue
                }

                if (((_CONFIG$cells$cell$ti = CONFIG.cells[cell].tier) != null ? _CONFIG$cells$cell$ti : 0) > tier) return 0; // continue
                if (isOre(cell) && oreIndex(cell) > _this.mods.oreTierMax) return 0; // continue
                // 越级矿连爆炸/磁场都薅不走：只有烧能量硬钻才钻得动
                if (kind === 'magnet' && !isOre(cell)) return 0; // continue
                _this.collect(idx, cell);
              },
              _ret;
            for (var x = Math.max(map.left, Math.floor(s.x - radius)); x <= Math.min(map.left + map.width - 1, Math.ceil(s.x + radius)); x++) {
              _ret = _loop();
              if (_ret === 0) continue;
            }
          }
        };
        _proto.stop = function stop(reason) {
          var s = this.state;
          s.phase = 'done';
          s.stopReason = reason;
          s.maxDepth = Math.max(s.maxDepth, s.y);
          this.events.push({
            type: 'stop',
            reason: reason
          });
          if (reason !== 'lost') this.finale();
        };
        _createClass(ShotSim, [{
          key: "done",
          get: function get() {
            return this.state.phase === 'done';
          }
        }, {
          key: "mods",
          get: function get() {
            var _this$state$mods;
            return _extends({}, DEFAULT_MODS, (_this$state$mods = this.state.mods) != null ? _this$state$mods : {});
          }
        }]);
        return ShotSim;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Skills.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Config.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, ORES, oreIndexFor, ORE_TIER_STEP, CONFIG;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ORES = module.ORES;
      oreIndexFor = module.oreIndexFor;
      ORE_TIER_STEP = module.ORE_TIER_STEP;
      CONFIG = module.CONFIG;
    }],
    execute: function () {
      exports({
        cannonLevelForOre: cannonLevelForOre,
        effectText: effectText,
        levelOf: levelOf,
        lockReason: lockReason,
        skillPrice: skillPrice,
        statsOf: statsOf
      });
      cclegacy._RF.push({}, "7e756IurblO95qvXpJA5Ozu", "Skills", undefined);
      var c = function c(coins, items) {
        if (items === void 0) {
          items = {};
        }
        return {
          coins: coins,
          items: items
        };
      };
      var ore = function ore(i) {
        return ORES[Math.max(0, Math.min(ORES.length - 1, i))].key;
      };

      /**
       * Cannon level k+1 asks for the ores found one and two zones back: both lie in ground the level-k cannon already
       * reaches (zone k holds ore index floor(1.45 k) and the next one), so each upgrade is paid for by the band the
       * previous one opened and opens the next band.
       */
      var CANNON_PRICES = function () {
        var coins = [80, 140, 940, 1500, 2400, 4340, 6940, 10200, 15900, 17600]; // 拟合器收敛表：每级 ≈ 攒 4~20 发；L8-10 尾段贴毕业窗净收（3820/3238 末步净收 -160/+127、每发中位≈0）：5.7k→4.4k→3.7k，富种空窗 ≤20 发、穷种靠 refine 补给 ≤24 发
        return coins.map(function (coins, k) {
          var a = ore(oreIndexFor(Math.max(0, k - 1))),
            b = ore(oreIndexFor(k));
          var items = {};
          items[a] = 6 + Math.floor(k * 0.8); // round→floor：k6 秘银门 11→10（166145925 懒炮扇面只采到 13 圈内秘银中的 10，12 格保底与 11 门零余量卡步；floor 只降 k1/2/6/7 各 1，阶梯仍不降）
          if (b !== a) items[b] = 2 + Math.floor(k * 0.3);
          return c(coins, items);
        });
      }();

      /** Placeholder tree: art and more nodes arrive later, so everything is data. */
      var SKILLS = exports('SKILLS', [{
        id: 'cannon',
        name: '炮台',
        desc: '提高最大射程，解锁更远的矿区，炮台外观随等级升级',
        maxLevel: 10,
        x: 0,
        y: 0,
        parents: [],
        prices: CANNON_PRICES
      }, {
        id: 'hardness',
        name: '钻头硬度',
        desc: '能钻开更硬的岩层；千米深渊还有两道大关',
        maxLevel: 4,
        x: -1,
        y: 0,
        parents: [],
        prices: [c(470, {
          iron: 20,
          silver: 10
        }), c(570, {
          gold: 20,
          platinum: 15,
          cobalt: 10
        }), c(1360, {
          iridium: 24,
          ruby: 18
        }), c(2710, {
          sapphire: 24,
          emerald: 18,
          diamond: 12
        })]
      }, {
        id: 'light',
        name: '光源弹头',
        desc: '照亮并记住更大的地下范围',
        maxLevel: 6,
        x: 1,
        y: 0,
        parents: [],
        prices: [c(2100, {
          coal: 10
        }), c(2510, {
          copper: 15,
          iron: 10
        }), c(4950, {
          silver: 20,
          gold: 10
        }), c(6720, {
          gold: 20,
          platinum: 15
        }), c(8300, {
          platinum: 20,
          cobalt: 10
        }), c(9280, {
          cobalt: 25,
          mithril: 15
        })]
      }, {
        id: 'diameter',
        name: '钻头直径',
        desc: '钻孔更宽，但更重、更耗动力',
        maxLevel: 3,
        x: -1,
        y: 1,
        parents: ['cannon'],
        prices: [c(9290, {
          copper: 20,
          iron: 10
        }), c(11190, {
          iron: 25,
          silver: 15
        }), c(13250, {
          silver: 25,
          gold: 20,
          platinum: 10
        })]
      }, {
        id: 'blast',
        name: '终结爆炸',
        desc: '停钻时在尖端爆炸，炸开周围方块',
        maxLevel: 4,
        x: 0,
        y: 1,
        parents: ['cannon'],
        prices: [c(4600, {
          coal: 18,
          copper: 10
        }), c(5600, {
          iron: 20,
          silver: 10
        }), c(7590, {
          silver: 25,
          gold: 15
        }), c(8560, {
          gold: 25,
          platinum: 15,
          cobalt: 10
        })]
      }, {
        id: 'magnet',
        name: '磁场',
        desc: '停钻时吸走周围的矿石；钻进途中每挖够几格矿石自动引爆磁场炸弹，炸走旁边的矿石',
        maxLevel: 3,
        x: 1,
        y: 1,
        parents: ['light'],
        prices: [c(4600, {
          iron: 10,
          silver: 5
        }), c(5610, {
          gold: 10,
          platinum: 5
        }), c(7580, {
          cobalt: 10,
          mithril: 5
        })]
      }, {
        id: 'refine',
        name: '精炼钻头',
        desc: '打碎矿石更省动力',
        maxLevel: 4,
        x: -1,
        y: 2,
        parents: ['diameter'],
        prices: [c(12310, {
          iron: 20,
          silver: 15
        }), c(14820, {
          silver: 25,
          gold: 15
        }), c(17600, {
          gold: 25,
          platinum: 15
        }), c(18350, {
          platinum: 20,
          cobalt: 15,
          mithril: 10
        })]
      }, {
        id: 'recycler',
        name: '能量回收',
        desc: '刹车时把更多动能存成免费挖掘能量',
        maxLevel: 3,
        x: 0,
        y: 2,
        parents: ['blast'],
        prices: [c(6860, {
          iron: 20,
          silver: 15
        }), c(8330, {
          silver: 25,
          gold: 15
        }), c(9800, {
          platinum: 20,
          cobalt: 10
        })]
      }, {
        id: 'survey',
        name: '地质勘探',
        desc: '白天光照到更深的地下，看得更远',
        maxLevel: 3,
        x: 1,
        y: 2,
        parents: ['magnet'],
        prices: [c(4560, {
          coal: 20,
          copper: 15
        }), c(5560, {
          copper: 25,
          iron: 20
        }), c(7690, {
          iron: 25,
          silver: 20
        })]
      }, {
        id: 'impact',
        name: '冲击钻',
        desc: '在实体里钻得更快',
        maxLevel: 4,
        x: -1,
        y: 3,
        parents: ['refine'],
        prices: [c(9200, {
          copper: 25,
          iron: 15
        }), c(11120, {
          iron: 25,
          silver: 20
        }), c(13520, {
          silver: 25,
          gold: 20
        }), c(16000, {
          gold: 25,
          platinum: 20
        })]
      }, {
        id: 'shells',
        name: '弹药仓',
        desc: '炮弹上限 +1（前几级早期就能买）',
        maxLevel: 8,
        x: 0,
        y: 3,
        parents: [],
        prices: [c(260, {
          coal: 8
        }), c(720, {
          coal: 12,
          copper: 8
        }), c(1600, {
          copper: 14,
          iron: 8
        }), c(3200, {
          iron: 16,
          silver: 8
        }), c(5200, {
          silver: 18,
          gold: 10
        }), c(7200, {
          gold: 18,
          platinum: 10
        }), c(9200, {
          platinum: 16,
          cobalt: 10
        }), c(11400, {
          cobalt: 18,
          mithril: 10
        })]
      },
      // v1.1.0：上限 12+8=20；去父节点前置、首级只花煤炭，早期可升；矿石门自动限档，单项 ≤10 贴 12 格保底留余量
      {
        id: 'bonus',
        name: '精矿加成',
        desc: '矿石卖出更多金币',
        maxLevel: 5,
        x: 1,
        y: 3,
        parents: ['survey'],
        prices: [c(9060, {
          silver: 20,
          gold: 10
        }), c(11000, {
          gold: 20,
          platinum: 10
        }), c(13140, {
          platinum: 20,
          cobalt: 15
        }), c(15270, {
          cobalt: 25,
          mithril: 15
        }), c(17820, {
          mithril: 20,
          titanium: 15
        })]
      }, {
        id: 'pressure',
        name: '钻头增压',
        desc: '千米深渊越深压力越大、越挖越费劲；每级抵消 12% 深部额外耗能',
        maxLevel: 5,
        x: -1,
        y: 4,
        parents: ['impact'],
        prices: [c(9100, {
          ruby: 18,
          sapphire: 12
        }), c(11200, {
          sapphire: 22,
          emerald: 16
        }), c(13800, {
          emerald: 18,
          diamond: 10
        }),
        // 宝石尾级贴全图最低种子存量（绿宝min19→18 / 钻石min6→10 需提脉量）：pressure L3-5 不再是死单
        c(17000, {
          diamond: 12
        }), c(20900, {
          diamond: 20
        })]
      }, {
        id: 'reload',
        name: '快速装填',
        desc: '炮弹恢复更快',
        maxLevel: 4,
        x: 0,
        y: 4,
        parents: ['shells'],
        prices: [c(4570, {
          coal: 20,
          iron: 10
        }), c(5480, {
          iron: 25,
          silver: 15
        }), c(7570, {
          gold: 20,
          platinum: 10
        }), c(8530, {
          cobalt: 20,
          mithril: 10
        })]
      }]);
      var skillNode = exports('skillNode', function skillNode(id) {
        return SKILLS.find(function (n) {
          return n.id === id;
        });
      });
      function levelOf(l, id) {
        var _l$skills$id;
        return id === 'fuel' ? l.fuel : id === 'drill' ? l.drill : (_l$skills$id = l.skills[id]) != null ? _l$skills$id : 0;
      }

      /** Lowest cannon level whose reach covers ground where this ore can be found. */
      function cannonLevelForOre(key) {
        var idx = ORES.findIndex(function (o) {
          return o.key === key;
        });
        return Math.max(0, Math.ceil((idx - 1) / ORE_TIER_STEP));
      }

      /** Why the next level cannot be bought yet, or '' when it can. */
      function lockReason(l, id) {
        var node = skillNode(id),
          cur = levelOf(l, id),
          next = cur + 1;
        if (cur >= node.maxLevel) return '已满级';
        for (var _iterator = _createForOfIteratorHelperLoose(node.parents), _step; !(_step = _iterator()).done;) {
          var p = _step.value;
          if (levelOf(l, p) < 1) return "\u9700\u8981\u5148\u89E3\u9501\u300C" + skillNode(p).name + "\u300D";
        }
        if (id === 'diameter') {
          if (levelOf(l, 'cannon') < next) return "\u9700\u8981\u70AE\u53F0 Lv." + next;
          if (l.fuel < next * 2) return "\u9700\u8981\u71C3\u6599 Lv." + (next * 2 + 1);
        }
        if (id === 'hardness' && cur > levelOf(l, 'cannon')) return "\u9700\u8981\u70AE\u53F0 Lv." + (cur + 1) + "\uFF0C\u94BB\u5934\u786C\u5EA6\u4E0D\u5F97\u8D85\u8FC7\u70AE\u53F0\u7B49\u7EA7"; // 上限链：硬度 ≤ 炮台（炮台是技能树的根）
        if (id === 'pressure' && levelOf(l, 'hardness') < 3) return '需要钻头硬度 Lv.3';
        if (id === 'blast' && levelOf(l, 'cannon') < next) return "\u9700\u8981\u70AE\u53F0 Lv." + next;
        if (id === 'magnet' && levelOf(l, 'light') < next) return "\u9700\u8981\u5149\u6E90 Lv." + next;
        // The ores in the price must be findable within the cannon's reach — clamped to the cannon's own ceiling
        // (Lv10), because a gate above max level would be unreachable: at max cannon the whole map, star cores
        // included, is in range, so the last cannon tier is precisely the "you may enter the abyss" badge.
        var need = Math.min(skillNode('cannon').maxLevel, Math.max.apply(Math, [0].concat(Object.keys(node.prices[cur].items).map(cannonLevelForOre))));
        if (levelOf(l, 'cannon') < need) return "\u9700\u8981\u70AE\u53F0 Lv." + need + "\uFF0C\u624D\u80FD\u6253\u5230\u6240\u9700\u7684\u77FF\u77F3";
        return '';
      }
      function skillPrice(id, level) {
        var _skillNode$prices$lev;
        return (_skillNode$prices$lev = skillNode(id).prices[level]) != null ? _skillNode$prices$lev : {
          coins: 0,
          items: {}
        };
      }
      function statsOf(l) {
        var d = levelOf(l, 'diameter'),
          blast = levelOf(l, 'blast'),
          magnet = levelOf(l, 'magnet'),
          light = levelOf(l, 'light');
        var survey = levelOf(l, 'survey'),
          cannon = levelOf(l, 'cannon');
        var maxRange = (CONFIG.aim.baseMaxRange + CONFIG.upgrades.cannonRangePerLevel * cannon) * (1 - 0.07 * d); // a heavier drill flies shorter
        var drillRadius = CONFIG.sim.drillRadius + 0.07 * d;
        return {
          maxRange: maxRange,
          maxSpeed: Math.sqrt(CONFIG.sim.gravity * maxRange),
          lightRadius: CONFIG.view.lightRadius + light,
          maxShells: CONFIG.shells.max + levelOf(l, 'shells'),
          regenSeconds: CONFIG.shells.regenSeconds * (1 - 0.12 * levelOf(l, 'reload')),
          ambientDepth: CONFIG.view.ambientDepth + 2 * survey,
          cannonTier: cannon,
          mods: {
            drillRadius: drillRadius,
            carveRadius: drillRadius + (CONFIG.sim.carveRadius - CONFIG.sim.drillRadius),
            costMult: 1 + 0.3 * d,
            deepCost: 0.12 * levelOf(l, 'pressure'),
            blastRadius: blast ? 1.8 + 0.8 * (blast - 1) : 0,
            magnetRadius: magnet ? 3 + 1.5 * (magnet - 1) : 0,
            revealRadius: CONFIG.view.revealRadius + 0.6 * light + 0.8 * survey,
            drillTier: levelOf(l, 'hardness'),
            oreCostMult: 1 - 0.08 * levelOf(l, 'refine'),
            speedMult: 1 + 0.12 * levelOf(l, 'impact'),
            bankMult: 1 + 0.35 * levelOf(l, 'recycler'),
            coinMult: 1 + 0.12 * levelOf(l, 'bonus'),
            shotCharge: cannon >= skillNode('cannon').maxLevel ? CONFIG.sim.shotCharge : 0,
            // 炮台满级：每发炮弹满充能起飞
            landFuel: levelOf(l, 'recycler') >= skillNode('recycler').maxLevel ? CONFIG.sim.landCharge : 0,
            // 能量回收满级：着陆免费补能
            oreGainMult: levelOf(l, 'refine') >= skillNode('refine').maxLevel ? 2 : 1,
            // 精炼满级：挖矿回能翻倍
            magPulse: magnet ? CONFIG.sim.magPulseBase - 2 * magnet : 0,
            // 磁场：每钻这么多格矿放一发磁场炸弹（Lv1 每 11、Lv2 每 9、Lv3 每 7）
            magPulseRadius: magnet ? CONFIG.sim.magPulseRadius : 0,
            oreTierMax: Math.min(ORES.length - 1, oreIndexFor(cannon) + 1) // 当前炮台照常钻得动的最富一级（下一级素材）；再越一级 3 倍、越两级以上 6 倍耗能
          }
        };
      }

      /** "current -> next" description for the workshop card. */
      function effectText(id, level) {
        var at = function at(n) {
          switch (id) {
            case 'cannon':
              return "\u5C04\u7A0B " + (CONFIG.aim.baseMaxRange + CONFIG.upgrades.cannonRangePerLevel * n) + " \u683C";
            case 'diameter':
              return "\u76F4\u5F84 " + (2 * (CONFIG.sim.drillRadius + 0.07 * n)).toFixed(2) + " \u683C";
            case 'blast':
              return n ? "\u7206\u70B8\u534A\u5F84 " + (1.8 + 0.8 * (n - 1)).toFixed(1) : '无';
            case 'hardness':
              return ['普通岩层', '可钻深层岩', '可钻底层岩', '可钻深渊岩', '可钻星核岩'][n];
            case 'light':
              return "\u7167\u660E " + (CONFIG.view.lightRadius + n) + " \u683C";
            case 'magnet':
              return n ? "\u505C\u94BB\u5438\u53D6 " + (3 + 1.5 * (n - 1)).toFixed(1) + " \xB7 \u6BCF\u94BB " + (CONFIG.sim.magPulseBase - 2 * n) + " \u683C\u77FF\u653E\u4E00\u53D1\u78C1\u573A\u70B8\u5F39" : '无';
            case 'refine':
              return "\u77FF\u77F3\u8017\u80FD -" + 8 * n + "%";
            case 'recycler':
              return "\u52A8\u80FD\u56DE\u6536 +" + 35 * n + "%";
            case 'survey':
              return "\u65E5\u5149\u6DF1\u5EA6 " + (CONFIG.view.ambientDepth + 2 * n) + " \u5C42";
            case 'impact':
              return "\u94BB\u8FDB\u901F\u5EA6 +" + 12 * n + "%";
            case 'shells':
              return "\u70AE\u5F39\u4E0A\u9650 " + (CONFIG.shells.max + n);
            case 'bonus':
              return "\u77FF\u77F3\u6536\u76CA +" + 12 * n + "%";
            case 'reload':
              return "\u6062\u590D " + (CONFIG.shells.regenSeconds * (1 - 0.12 * n) / 60).toFixed(1) + " \u5206\u949F/\u53D1";
          }
        };
        var max = skillNode(id).maxLevel;
        if (level >= max) {
          // 满级充能：把"到底了"变成"解锁隐藏效果"的惊喜
          var charge = id === 'cannon' ? ' · 满级充能：每发起始能量 +75%' : id === 'refine' ? ' · 满级充能：挖矿回能翻倍' : id === 'recycler' ? ' · 满级充能：着陆免费回能' : '';
          return at(level) + charge;
        }
        return at(level) + " \u2192 " + at(level + 1);
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Sound.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _extends, _createForOfIteratorHelperLoose, cclegacy, sys, AudioSource, resources, AudioClip;
  return {
    setters: [function (module) {
      _extends = module.extends;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
      AudioSource = module.AudioSource;
      resources = module.resources;
      AudioClip = module.AudioClip;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1cfff6m46VCY4thldqWSt1N", "Sound", undefined);
      // bars：显示左侧能量条+顶部燃料条的开关（显示偏好，跟音频共用这套 localStorage 设置）

      var KEY = 'drill_settings_v1';
      var DEFAULTS = {
        music: true,
        sfx: true,
        musicVol: 0.5,
        sfxVol: 0.8,
        bars: false
      }; // 条默认隐藏：能量=燃料+动能的读法交给玩家自己感受

      /**
       * Placeholder audio: the clips are synthesized by tools/gen_audio.mjs into assets/resources/audio and can be replaced
       * with real files of the same names later. Settings persist in localStorage.
       */
      var Sound = exports('Sound', /*#__PURE__*/function () {
        function Sound() {}
        Sound.init = function init(host) {
          try {
            var raw = sys.localStorage.getItem(KEY);
            if (raw) Sound.settings = _extends({}, DEFAULTS, JSON.parse(raw));
          } catch (_unused) {/* keep defaults */}
          Sound.sfxSource = host.addComponent(AudioSource);
          Sound.bgmSource = host.addComponent(AudioSource);
          Sound.bgmSource.loop = true;
          resources.loadDir('audio', AudioClip, function (err, clips) {
            if (err || !clips) return;
            for (var _iterator = _createForOfIteratorHelperLoose(clips), _step; !(_step = _iterator()).done;) {
              var c = _step.value;
              Sound.clips.set(c.name, c);
            }
            if (Sound.musicWanted) Sound.startMusic();
          });
        };
        Sound.save = function save() {
          try {
            sys.localStorage.setItem(KEY, JSON.stringify(Sound.settings));
          } catch (_unused2) {/* ignore */}
        }

        /** Plays an effect; `gap` seconds is the minimum spacing for the same sound so rapid events do not pile up. */;
        Sound.play = function play(name, volume, gap) {
          var _Sound$last$get;
          if (volume === void 0) {
            volume = 1;
          }
          if (gap === void 0) {
            gap = 0;
          }
          var s = Sound.settings,
            clip = Sound.clips.get(name),
            src = Sound.sfxSource;
          if (!s.sfx || Sound.muted || !clip || !src) return;
          var now = Date.now() / 1000;
          if (gap > 0 && now - ((_Sound$last$get = Sound.last.get(name)) != null ? _Sound$last$get : 0) < gap) return;
          Sound.last.set(name, now);
          src.playOneShot(clip, s.sfxVol * volume);
        }

        /** Music may only start after the first touch (browsers block autoplay); safe to call repeatedly. */;
        Sound.startMusic = function startMusic() {
          Sound.musicWanted = true;
          var clip = Sound.clips.get('bgm'),
            src = Sound.bgmSource;
          if (!clip || !src) return;
          src.clip = clip;
          src.volume = Sound.settings.musicVol;
          if (Sound.settings.music) {
            if (!src.playing) src.play();
          } else src.pause();
        }

        /** Applies changed settings to the running music and saves them. */;
        Sound.apply = function apply() {
          Sound.save();
          var src = Sound.bgmSource;
          if (!src) return;
          src.volume = Sound.settings.musicVol;
          if (!Sound.musicWanted) return;
          if (Sound.settings.music) {
            if (!src.playing) src.play();
          } else src.pause();
        };
        return Sound;
      }());
      Sound.settings = _extends({}, DEFAULTS);
      Sound.muted = false;
      // effects are silenced while the test speed-up runs
      Sound.clips = new Map();
      Sound.sfxSource = null;
      Sound.bgmSource = null;
      Sound.musicWanted = false;
      Sound.last = new Map();
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TerrainView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Config.ts', './MineMap.ts', './Art.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, Color, Graphics, UITransform, CONFIG, ORE_BASE, ORES, CELL, isOre, oreIndex, crackStage, sprite, node, frame;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Graphics = module.Graphics;
      UITransform = module.UITransform;
    }, function (module) {
      CONFIG = module.CONFIG;
      ORE_BASE = module.ORE_BASE;
      ORES = module.ORES;
      CELL = module.CELL;
      isOre = module.isOre;
      oreIndex = module.oreIndex;
    }, function (module) {
      crackStage = module.crackStage;
    }, function (module) {
      sprite = module.sprite;
      node = module.node;
      frame = module.frame;
    }],
    execute: function () {
      var _TINT;
      cclegacy._RF.push({}, "ddd99KhOJNJ07b+cQX18Vv4", "TerrainView", undefined);
      var T = CONFIG.view.tilePx;
      var LEVELS = 12;
      /** Thickness of the grass on a surface block: the sky reaches this far into the top row where the ground has been dug away. */
      var GRASS_DEPTH = exports('GRASS_DEPTH', T * 0.3);
      var BACKING = -2,
        HIDDEN = -3; // slot states besides a real cell type: the wall behind a tunnel, and nothing drawn
      var LEVEL_COLOR = Array.from({
        length: LEVELS
      }, function (_, i) {
        var v = Math.round(255 * (0.1 + 0.9 * i / (LEVELS - 1)));
        return new Color(v, Math.round(v * 0.96), Math.round(v * 0.92), 255);
      });
      // Placeholder crack art: one segment per damage stage. Swap renderCrack when the crack sprites arrive.
      var CRACK_SEGMENTS = [[0.5, 0.02, 0.44, 0.22], [0.44, 0.22, 0.54, 0.36], [0.54, 0.36, 0.46, 0.52], [0.46, 0.52, 0.3, 0.62], [0.54, 0.36, 0.72, 0.46], [0.3, 0.62, 0.22, 0.8], [0.72, 0.46, 0.9, 0.42], [0.46, 0.52, 0.56, 0.72], [0.22, 0.8, 0.08, 0.88], [0.72, 0.46, 0.76, 0.68], [0.56, 0.72, 0.5, 0.98], [0.76, 0.68, 0.94, 0.8]];
      var SILVER_CELL = ORE_BASE + ORES.findIndex(function (o) {
        return o.key === 'silver';
      });
      // Silver reads as cold metal next to warm iron: a faint blue tint on the tile, plus glinting star pixels on top.
      var TINT = (_TINT = {}, _TINT[CELL.HARD2] = [0.85, 0.65, 0.95], _TINT[CELL.HARD3] = [0.62, 0.5, 1.0], _TINT[CELL.HARD4] = [1.0, 0.52, 0.34], _TINT[CELL.BEDROCK] = [0.6, 0.6, 0.72], _TINT[SILVER_CELL] = [0.84, 0.94, 1.12], _TINT);
      var shadeCache = new Map();
      function shade(level, tint) {
        if (!tint) return LEVEL_COLOR[level];
        var key = level + "|" + tint[0] + "|" + tint[1] + "|" + tint[2];
        var c = shadeCache.get(key);
        if (!c) {
          var base = LEVEL_COLOR[level];
          c = new Color(base.r * tint[0], base.g * tint[1], base.b * tint[2], 255);
          shadeCache.set(key, c);
        }
        return c;
      }
      var TerrainView = exports('TerrainView', /*#__PURE__*/function () {
        function TerrainView(parent, map) {
          this.root = void 0;
          this.slots = [];
          this.cols = 0;
          this.rows = 0;
          this.viewKey = '';
          this.prevBox = null;
          this.updates = 0;
          this.maxUpdates = 0;
          this.bodySprites = new Map();
          this.map = void 0;
          this.skyline = void 0;
          this.sparkleGfx = void 0;
          this.skyVersion = -1;
          this.root = node('Terrain', parent);
          this.skyline = node('Skyline', parent).addComponent(Graphics); // after the tiles, so it draws above them
          this.sparkleGfx = node('Sparkles', parent).addComponent(Graphics); // last world layer: silver glints above its tile
          this.map = map;
          for (var _iterator = _createForOfIteratorHelperLoose(map.bodies), _step; !(_step = _iterator()).done;) {
            var b = _step.value;
            this.createBody(b, parent);
          }
        }
        var _proto = TerrainView.prototype;
        _proto.px = function px(x) {
          return x * T;
        };
        _proto.createBody = function createBody(b, parent) {
          var cx = this.px(b.x + b.width / 2),
            cy = -(b.y + b.height / 2) * T,
            w = b.width * T,
            h = b.height * T;
          var bw = w * 1.14,
            s = sprite("bigGold" + b.variant, parent, bw, bw * 145 / 160, cx, cy); // keeps the art's proportions
          s.node.active = false;
          var g = node('Crack', s.node).addComponent(Graphics);
          g.strokeColor = new Color(62, 28, 12, 255);
          this.bodySprites.set(b.id, {
            sprite: s,
            crack: g,
            stage: 0,
            x: cx,
            y: cy,
            shake: 0,
            lvl: -1
          });
          this.syncBody(b);
        };
        _proto.syncBody = function syncBody(b) {
          var view = this.bodySprites.get(b.id);
          if (b.hp <= 0) return;
          var stage = crackStage(b.hp, b.maxHp, CONFIG.hitFeedback.crackStages);
          if (stage === view.stage) return;
          view.stage = stage;
          this.renderCrack(view.crack, stage, b.width * T * 1.06, b.height * T * 1.06);
        };
        _proto.renderCrack = function renderCrack(g, stage, w, h) {
          var total = CONFIG.hitFeedback.crackStages,
            count = Math.ceil(stage / total * CRACK_SEGMENTS.length);
          g.clear();
          if (!count) return;
          g.lineWidth = 2.5 + 2.5 * stage / total;
          for (var i = 0; i < count; i++) {
            var _CRACK_SEGMENTS$i = CRACK_SEGMENTS[i],
              x1 = _CRACK_SEGMENTS$i[0],
              y1 = _CRACK_SEGMENTS$i[1],
              x2 = _CRACK_SEGMENTS$i[2],
              y2 = _CRACK_SEGMENTS$i[3];
            g.moveTo((x1 - 0.5) * w, (0.5 - y1) * h);
            g.lineTo((x2 - 0.5) * w, (0.5 - y2) * h);
          }
          g.stroke();
        };
        _proto.hitBody = function hitBody(id) {
          var view = this.bodySprites.get(id);
          if (view) view.shake = 1;
        };
        _proto.updateShake = function updateShake(dt) {
          var fx = CONFIG.hitFeedback;
          this.bodySprites.forEach(function (view) {
            if (view.shake <= 0) return;
            view.shake = Math.max(0, view.shake - dt / fx.shakeSeconds);
            var amp = fx.bodyShakePx * view.shake,
              punch = 1 + fx.bodyPunch * view.shake;
            view.sprite.node.setPosition(view.x + (Math.random() - 0.5) * 2 * amp, view.y + (Math.random() - 0.5) * 2 * amp);
            view.sprite.node.setScale(punch, punch);
          });
        };
        _proto.shakeOf = function shakeOf(id) {
          var _this$bodySprites$get, _this$bodySprites$get2;
          return (_this$bodySprites$get = (_this$bodySprites$get2 = this.bodySprites.get(id)) == null ? void 0 : _this$bodySprites$get2.shake) != null ? _this$bodySprites$get : 0;
        };
        _proto.crackOf = function crackOf(id) {
          var _this$bodySprites$get3, _this$bodySprites$get4;
          return (_this$bodySprites$get3 = (_this$bodySprites$get4 = this.bodySprites.get(id)) == null ? void 0 : _this$bodySprites$get4.stage) != null ? _this$bodySprites$get3 : 0;
        };
        _proto.syncBodies = function syncBodies() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.map.bodies), _step2; !(_step2 = _iterator2()).done;) {
            var b = _step2.value;
            this.syncBody(b);
          }
        }
        /** Ore bodies that appeared with newly grown ground get their sprites; the rest just re-check damage. */;
        _proto.syncNewBodies = function syncNewBodies() {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.map.bodies), _step3; !(_step3 = _iterator3()).done;) {
            var b = _step3.value;
            if (!this.bodySprites.has(b.id)) this.createBody(b, this.root.parent);
          }
        };
        _proto.baseFrame = function baseFrame(x, y, cell) {
          if (cell === CELL.EMPTY) return "backing_" + (Math.min(5, Math.floor(y / 23)) + 1) + "_" + (x % 8 + 8) % 8 + "_" + y % 8; // the wall behind a tunnel, by depth (x can be negative once the world grew left)
          if (cell === CELL.ROCK || cell === CELL.FOUNDATION) return 'rock';
          if (cell === CELL.HARD1 || cell === CELL.HARD3) return 'hardRock'; // 深渊岩：同一块硬岩贴图上出紫色
          if (cell === CELL.HARD2 || cell === CELL.HARD4 || cell === CELL.BEDROCK) return 'bedrock'; // 星核岩：基岩贴图出熔岩橙
          if (y === 0) return 'grass';
          if (isOre(cell)) return "ore_" + ORES[oreIndex(cell)].key; // ore tiles carry their own soil
          return y < 24 ? 'dirt_orange' : y < 55 ? 'dirt_mid' : y < 95 ? 'dirt_deep' : 'dirt_abyss';
        }

        /**
         * Daylight fades smoothly to black with depth; only the drill's own light adds to it (bored tunnels stay dark).
         * Returns a level 1..LEVELS-1, or -1 for tiles still in the dark.
         */;
        _proto.levelOf = function levelOf(x, y, light) {
          var v = Math.pow(Math.max(0, 1 - (y + 0.5) / CONFIG.view.ambientDepth), 1.3);
          if (light) {
            // Brightness ramps smoothly to zero at the edge of the light, so nothing pops in or flickers there.
            var t = 1 - Math.hypot(x + 0.5 - light.x, y + 0.5 - light.y) / light.radius;
            if (t > 0) v = Math.max(v, t * t * (3 - 2 * t) * light.intensity);
          }
          var level = Math.round(v * (LEVELS - 1));
          return level <= 0 ? -1 : level;
        };
        _proto.resetSlots = function resetSlots(cols, rows) {
          for (var _iterator4 = _createForOfIteratorHelperLoose(this.slots), _step4; !(_step4 = _iterator4()).done;) {
            var slot = _step4.value;
            if (slot) {
              slot.base.node.destroy();
            }
          }
          this.slots = [];
          this.cols = cols;
          this.rows = rows;
          this.viewKey = '';
        };
        _proto.syncCell = function syncCell(x, y, light) {
          var cell = this.map.get(x, y),
            lvl = this.levelOf(x, y, light),
            code = cell === CELL.EMPTY ? BACKING : cell;
          var idx = (x % this.cols + this.cols) % this.cols + (y % this.rows + this.rows) % this.rows * this.cols,
            cellKey = this.map.index(x, y); // stable per world cell, even at negative x
          var slot = this.slots[idx];
          if (lvl < 0) {
            if (slot && slot.key === cellKey && slot.cell !== HIDDEN) {
              slot.base.node.active = false;
              slot.cell = HIDDEN;
              this.updates++;
            }
            return;
          }
          if (slot && slot.key === cellKey && slot.cell === code && slot.lvl === lvl) return;
          if (!slot) {
            slot = {
              base: sprite('dirt_orange', this.root, T + 1, T + 1),
              shown: 'dirt_orange',
              key: -1,
              cell: -1,
              lvl: -1
            };
            this.slots[idx] = slot;
          }
          this.updates++;
          slot.key = cellKey;
          slot.cell = code;
          slot.lvl = lvl;
          var name = this.baseFrame(x, y, cell);
          if (!slot.base.node.active) slot.base.node.active = true;
          if (slot.shown !== name) {
            slot.base.spriteFrame = frame(name);
            slot.shown = name;
          }
          slot.base.color = shade(lvl, TINT[cell]);
          var px = this.px(x + 0.5),
            top = y === 0 && cell === CELL.EMPTY; // a dug-out surface cell keeps sky above its wall
          var h = top ? T + 1 - GRASS_DEPTH : T + 1;
          slot.base.node.getComponent(UITransform).setContentSize(T + 1, h);
          slot.base.node.setPosition(px, top ? -GRASS_DEPTH - (T - GRASS_DEPTH) / 2 : -(y + 0.5) * T);
        }

        /** Ore bodies only appear once their tiles have been lit. */
        /** Where the surface has been dug away, a dark green line marks the sky's edge at the height of the grass on neighbouring blocks. */;
        _proto.drawSkyline = function drawSkyline() {
          if (this.skyVersion === this.map.version) return;
          this.skyVersion = this.map.version;
          var g = this.skyline;
          g.clear();
          g.fillColor = new Color(46, 112, 34, 255);
          for (var x = this.map.left; x < this.map.left + this.map.width; x++) if (this.map.get(x, 0) === CELL.EMPTY) g.rect(this.px(x), -GRASS_DEPTH - 3, T, 6);
          g.fill();
        }

        /**
         * Silver glints: a few star pixels per lit silver tile, each with its own deterministic spot, phase and
         * speed, blinking on and off. Hidden ore never sparkles — the glint follows the very same lighting rule
         * as the tile itself, so the effect can never peek at ore the drill has not revealed.
         */;
        _proto.drawSparkles = function drawSparkles(left, right, top, bottom, light) {
          var g = this.sparkleGfx;
          g.clear();
          var t = performance.now() / 1000;
          var stars = []; // cx, cy, arm, w
          for (var y = top; y <= bottom; y++) for (var x = left; x <= right; x++) {
            if (this.map.get(x, y) !== SILVER_CELL || this.levelOf(x, y, light) < 0) continue;
            var h = (Math.imul(x + 7, 0x27d4eb2d) ^ Math.imul(y + 13, 0x165667b1)) >>> 0;
            for (var s = 0; s < 3; s++) {
              var k = Math.imul(h ^ Math.imul(s + 5, 0x9e3779b1), 0x85ebca6b) >>> 0;
              var w = Math.sin(t * (1.4 + k % 9 * 0.24) + k % 628 * 0.01);
              if (w < 0.45) continue;
              stars.push(this.px(x + (k >>> 7) % 72 / 100 + 0.14), -(y + (k >>> 17) % 72 / 100 + 0.14) * T, 1.5 + 2.4 * w, w);
            }
          }
          if (!stars.length) return;
          g.fillColor = new Color(214, 232, 250, 235); // cool silver-white cross arms
          for (var i = 0; i < stars.length; i += 4) {
            var cx = stars[i],
              cy = stars[i + 1],
              a = stars[i + 2];
            g.rect(cx - a, cy - 0.8, a * 2, 1.6);
            g.rect(cx - 0.8, cy - a, 1.6, a * 2);
          }
          g.fill();
          g.fillColor = new Color(255, 255, 255, 250); // white core on the brightest twinkles
          for (var _i = 0; _i < stars.length; _i += 4) if (stars[_i + 3] > 0.85) g.rect(stars[_i] - 1, stars[_i + 1] - 1, 2, 2);
          g.fill();
        };
        _proto.updateActors = function updateActors(light) {
          var map = this.map;
          for (var _iterator5 = _createForOfIteratorHelperLoose(map.bodies), _step5; !(_step5 = _iterator5()).done;) {
            var b = _step5.value;
            var view = this.bodySprites.get(b.id);
            var seen = false;
            if (b.hp > 0) {
              for (var _iterator6 = _createForOfIteratorHelperLoose(b.cells), _step6; !(_step6 = _iterator6()).done;) {
                var i = _step6.value;
                if (map.seen[i]) {
                  seen = true;
                  break;
                }
              }
            }
            // Only lit ground is visible: tunnels the drill has already bored give no light of their own.
            var lvl = seen ? this.levelOf(Math.floor(b.x + b.width / 2), Math.floor(b.y + b.height / 2), light) : -1,
              visible = lvl >= 0;
            if (view.sprite.node.active !== visible) view.sprite.node.active = visible;
            if (!visible) continue;
            if (view.lvl !== lvl) {
              view.lvl = lvl;
              view.sprite.color = LEVEL_COLOR[lvl];
            }
          }
        }

        /**
         * Tiles live in a fixed ring of sprites addressed by (x mod cols, y mod rows), so a moving camera only
         * touches the tiles that newly enter view. Tiles that have never been lit are not drawn at all.
         */;
        _proto.refresh = function refresh(cameraX, cameraY, zoom, viewWidth, viewHeight, light) {
          this.updates = 0;
          var minZoom = CONFIG.view.flightZoom;
          var cols = Math.ceil(viewWidth / (T * minZoom)) + 6,
            rows = Math.min(Math.ceil(viewHeight / (T * minZoom)) + 6, this.map.height);
          if (cols > this.cols || rows > this.rows) this.resetSlots(Math.max(cols, this.cols), Math.max(rows, this.rows));
          var halfW = viewWidth / 2 / (T * zoom),
            halfH = viewHeight / 2 / (T * zoom);
          var left = Math.max(this.map.left, Math.floor(cameraX - halfW) - 3),
            right = Math.min(this.map.left + this.map.width - 1, Math.floor(cameraX + halfW) + 3);
          var top = Math.max(0, Math.floor(cameraY - halfH) - 3),
            bottom = Math.min(this.map.height - 1, Math.floor(cameraY + halfH) + 3);
          this.drawSkyline();
          var key = left + "," + right + "," + top + "," + bottom + "," + this.map.version + "," + this.map.seenVersion;
          if (key !== this.viewKey) {
            this.viewKey = key;
            for (var y = top; y <= bottom; y++) for (var x = left; x <= right; x++) this.syncCell(x, y, light);
          }
          this.drawSparkles(left, right, top, bottom, light);

          // The light moves every frame: refresh its neighbourhood, including the area it just left.
          var box = light ? [Math.floor(light.x - light.radius) - 1, Math.floor(light.y - light.radius) - 1, Math.floor(light.x + light.radius) + 1, Math.floor(light.y + light.radius) + 1] : null;
          var prev = this.prevBox;
          if (box || prev) {
            var l = Math.max(left, Math.min(box ? box[0] : 1e9, prev ? prev[0] : 1e9)),
              t = Math.max(top, Math.min(box ? box[1] : 1e9, prev ? prev[1] : 1e9));
            var r = Math.min(right, Math.max(box ? box[2] : -1e9, prev ? prev[2] : -1e9)),
              b = Math.min(bottom, Math.max(box ? box[3] : -1e9, prev ? prev[3] : -1e9));
            for (var _y = t; _y <= b; _y++) for (var _x = l; _x <= r; _x++) this.syncCell(_x, _y, light);
          }
          this.prevBox = box;
          this.updateActors(light);
          if (this.updates > this.maxUpdates) this.maxUpdates = this.updates;
        };
        return TerrainView;
      }());
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});