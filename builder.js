(function () {
  const form = document.querySelector("[data-digital-twin-builder]");
  const dynamicFields = document.querySelector("[data-dynamic-fields]");
  const output = document.querySelector("[data-markdown-output]");
  const status = document.querySelector("[data-builder-status]");
  const typeSelect = document.querySelector("[data-builder-type]");
  const copyButton = document.querySelector("[data-copy-markdown]");
  const downloadButton = document.querySelector("[data-download-markdown]");
  const clearButton = document.querySelector("[data-clear-form]");

  if (!form || !dynamicFields || !output || !typeSelect) return;

  const fieldGroups = [
    {
      title: "Base render",
      help: "Describe one picture. If it needs multiple places, times or outputs, put those in the follow-up notes.",
      fields: [
        {
          name: "prompt_sentence",
          label: "What is in the picture?",
          hint: "One subject, one place, one clear result.",
          key: "scene"
        },
        {
          name: "real_place",
          label: "Where is it?",
          hint: "Name the real place, or say it is a concept inspired by that place.",
          key: "place"
        },
        {
          name: "focal_point",
          label: "What should we notice first?",
          hint: "This is the main subject. Keep it simple.",
          key: "focal"
        },
        {
          name: "camera_view",
          label: "Where is the camera?",
          hint: "Eye-level, overhead, close-up, wide shot, doorway view, isometric, or from across the street.",
          key: "camera"
        },
        {
          name: "light_weather",
          label: "What light or weather?",
          hint: "Morning sun, overcast day, warm workshop light, sunset, rain clearing, or night lighting.",
          key: "light"
        },
        {
          name: "style_reference",
          label: "What should it look like?",
          hint: "Realistic photo, clean concept art, tabletop model, storyboard frame, game-engine blockout.",
          key: "style"
        }
      ]
    },
    {
      title: "Visible details",
      help: "Only add details that can sit in the same frame without turning it into a collage.",
      fields: [
        {
          name: "foreground",
          label: "What is closest to the camera?",
          hint: "Three to five visible things. No private text unless you mean to show it.",
          key: "foreground"
        },
        {
          name: "middle_ground",
          label: "What is around the main subject?",
          hint: "The working area: path, bench, screen, room layout, waiting area, table map or doorway.",
          key: "middle"
        },
        {
          name: "background",
          label: "What is behind it?",
          hint: "Horizon, trees, bay, dunes, shelves, wall, nearby buildings or open sky.",
          key: "background"
        },
        {
          name: "materials_texture",
          label: "What materials and colours?",
          hint: "Timber, paper, sand, water, steel, weathered signs, green planting, local colours.",
          key: "materials"
        },
        {
          name: "people_movement",
          label: "Are people shown?",
          hint: "Say none, anonymous locals, hands only, small group, or simple movement.",
          key: "movement"
        },
        {
          name: "must_be_accurate",
          label: "What must not be guessed?",
          hint: "Geography, scale, building type, public/private line, cultural context, or source date.",
          key: "accuracy"
        }
      ]
    },
    {
      title: "Follow-up notes",
      help: "Use these after the first picture looks right. They are not part of the first render unless you choose to paste them.",
      fields: [
        {
          name: "reference_materials",
          label: "What references will you attach?",
          hint: "Name what each reference is for: place, camera, material, object shape, mood or map.",
          key: "references"
        },
        {
          name: "assets_to_build",
          label: "What separate parts might a world builder need later?",
          hint: "One object per phrase: kiosk, path, screen, bench, ferry, table map, tool rack, garden bed.",
          key: "assets"
        },
        {
          name: "state_changes",
          label: "What changes in a video or simulation?",
          hint: "One or two changes: tide rising, screen changing, lights turning on, crowd growing, rain starting.",
          key: "states"
        },
        {
          name: "customisation_controls",
          label: "What should be easy to change later?",
          hint: "Camera, time of day, screen text, materials, clutter level, people count, route, weather.",
          key: "controls"
        },
        {
          name: "negative_prompt",
          label: "What should not appear?",
          hint: "Wrong place, fake logos, readable private text, named real people, dystopian panic, official-looking seal.",
          key: "negative"
        },
        {
          name: "iteration_handoff",
          label: "What should the next version improve?",
          hint: "Cleaner layout, more local detail, less clutter, calmer light, better map accuracy, simpler objects.",
          key: "iteration"
        }
      ]
    }
  ];

  const configs = {
    "l0-space": {
      title: "Level 0 (L0) Private Room / Object Prompt",
      filename: "l0-private-room-object-prompt.md",
      schema: "straddie.prompt_builder.l0_private_room_object.v3",
      scale: "Level 0 (L0)",
      plainName: "private scene",
      guidance: "Use this for a room, desk, studio, capsule, tool bench, device cluster, garden bed or object that starts under your control.",
      scaleRule: "Level 0 (L0) note for the human file: this starts as a private room, object or workbench. Do not paste private identity, health, address or routine details into a public model.",
      examples: {
        scene: "A realistic photo of a tidy repair bench in a small private workshop.",
        place: "Private island workshop, concept image only.",
        focal: "A laptop and blank prompt cards on the workbench.",
        camera: "Eye-level wide shot from the doorway.",
        light: "Warm afternoon daylight from one side window.",
        style: "Photorealistic, natural, practical, not glossy.",
        foreground: "Notebook, pen, timber samples, small hand tools.",
        middle: "Workbench, laptop, blank cards, storage boxes.",
        background: "Plain shelves, one window, soft green plants.",
        materials: "Timber, paper, brushed metal, teal boxes, sand-coloured labels.",
        movement: "No people.",
        accuracy: "No readable names, addresses, health notes or family details.",
        references: "One room photo for layout; one material photo for colours.",
        assets: "Workbench; laptop; blank cards; storage boxes; shelves.",
        states: "Make a second version at night with a desk lamp on.",
        controls: "Camera angle; clutter level; lighting; screen content.",
        negative: "Readable private text, faces, address labels, medical gear, surveillance wall, fake brands.",
        iteration: "Make it less cluttered and easier to rebuild as a simple room."
      }
    },
    "l1-place": {
      title: "Level 1 (L1) Place / Venue World Prompt",
      filename: "l1-place-venue-world-prompt.md",
      schema: "straddie.prompt_builder.l1_place_venue_world.v3",
      scale: "Level 1 (L1)",
      plainName: "shared place scene",
      guidance: "Use this for a venue, street edge, kiosk, noticeboard, maker-space, market, ferry gateway, Ballow Road concept, public screen or local project scene.",
      scaleRule: "Level 1 (L1) note for the human file: this is a shared place. Use public-safe context, anonymous people and clear concept labels.",
      examples: {
        scene: "A realistic photo of a community noticeboard beside a small island ferry waiting area.",
        place: "Dunwich / Minjerribah ferry gateway, public-safe concept image.",
        focal: "One blank noticeboard with a clear shelter around it.",
        camera: "Eye-level wide shot from the footpath.",
        light: "Clear morning daylight after rain.",
        style: "Photorealistic civic concept image.",
        foreground: "Path edge, small signpost, sandy ground, low planting.",
        middle: "Noticeboard shelter, bench, blank paper notices, a small solar light.",
        background: "Bay water, ferry terminal shapes, coastal trees.",
        materials: "Weathered timber, dull metal, paper notices, sand, teal paint.",
        movement: "Two anonymous locals standing near the board, no readable faces.",
        accuracy: "Do not show real private notices, fake council approval or exact emergency instructions.",
        references: "One ferry-area photo for place; one noticeboard photo for structure.",
        assets: "Noticeboard; shelter; bench; path; solar light; blank paper notices.",
        states: "Make a second version with the same board in low-power evening mode.",
        controls: "Time of day; number of people; notice layout; weather; camera distance.",
        negative: "Fake logos, readable private notices, police-state wall, luxury development, panic scene, real faces.",
        iteration: "Make the scene more recognisably local and less busy."
      }
    },
    "l2-boundary": {
      title: "Level 2 (L2) Bioregion-Scale Prompt Brief",
      filename: "l2-bioregion-scale-prompt-brief.md",
      schema: "straddie.prompt_builder.l2_bioregion_scale_brief.v3",
      scale: "Level 2 (L2)",
      plainName: "bioregion-scale scene",
      guidance: "Use this for island chains, bays, watersheds, ferry corridors, wetlands, catchments and shared responsibility questions.",
      scaleRule: "Level 2 (L2) note for the human file: this is a wider public-scale brief. Use public-source context and do not expose household records, vulnerable-person locations or sensitive sites.",
      examples: {
        scene: "A realistic tabletop map model of Minjerribah sitting inside Moreton Bay.",
        place: "Minjerribah / North Stradbroke Island and Moreton Bay, public-source concept model.",
        focal: "The island shape and surrounding bay water on the table.",
        camera: "Oblique overhead view, like a documentary photo of a physical planning model.",
        light: "Soft late-afternoon room light.",
        style: "Realistic tabletop model, not a satellite map.",
        foreground: "Paper legend, pencil, small timber blocks, map edge.",
        middle: "Raised island model, blue bay layer, simple ferry line.",
        background: "Pinned public map outline of the wider watershed on a wall.",
        materials: "Matte paper, translucent blue plastic, timber markers, pencil lines.",
        movement: "No people.",
        accuracy: "Keep it as a concept model; do not invent exact boundaries or private household markers.",
        references: "Public map for island and bay shape; photo reference for tabletop model style.",
        assets: "Island layer; bay layer; ferry line; legend; watershed wall map.",
        states: "Make a second version that highlights rain flowing from watershed to bay.",
        controls: "Map scale; labels on/off; ferry line on/off; rain layer on/off.",
        negative: "Disaster movie, fake authority seal, private property dots, secret sites, red panic overlays.",
        iteration: "Make the geography clearer before adding data layers."
      }
    },
    "simulation-brief": {
      title: "Simulation Customisation Prompt",
      filename: "simulation-customisation-prompt.md",
      schema: "straddie.prompt_builder.simulation_customisation.v3",
      scale: "Level 0 to Level 2 (L0-L2)",
      plainName: "simulation prompt",
      guidance: "Use this when the important thing is not one picture, but a scene with states, controls and changes over time.",
      scaleRule: "Human note: this prepares a rehearsal or model input. It is not a prediction, official instruction or live operating system.",
      examples: {
        scene: "A simple overhead model of a ferry waiting area on a normal day.",
        place: "A public ferry gateway concept based on Straddie, with no private access details.",
        focal: "The waiting area, ferry queue and public screen positions.",
        camera: "Clean overhead/isometric view.",
        light: "Bright daytime planning view.",
        style: "Simple game-engine blockout with readable shapes.",
        foreground: "Legend and three labelled controls beside the model.",
        middle: "Queue area, path, public screen, shaded waiting zone.",
        background: "Bay edge, road edge, trees, ferry ramp shape.",
        materials: "Flat colours, simple blocks, clear paths, no tiny text.",
        movement: "Anonymous people as simple groups, not tracked individuals.",
        accuracy: "Do not claim this is live data or official advice.",
        references: "Public map for layout; one ferry-area photo for local feel.",
        assets: "Queue path; screen; shade; ferry ramp; people groups; control panel.",
        states: "Second pass: busier queue; third pass: rain starts; fourth pass: lights switch on.",
        controls: "Crowd level; weather; screen message; lighting; route open/closed.",
        negative: "Fake emergency order, individual tracking dots, medical advice, official seal, panic colours.",
        iteration: "Make the base layout clear before adding moving states."
      }
    },
    "scene-space": {
      title: "Plain-English Visual Scene Prompt",
      filename: "plain-english-visual-scene-prompt.md",
      schema: "straddie.prompt_builder.visual_scene.v3",
      scale: "Level 0 to Level 2 (L0-L2)",
      plainName: "visual scene",
      guidance: "Use this as the simplest prompt-spawner: one clear scene, enough visible detail, and a strong first render.",
      scaleRule: "Use the scale the person chose. Ask for missing details rather than inventing private or sensitive context.",
      examples: {
        scene: "A realistic photo of a maker-space table with repair tools and blank prompt cards.",
        place: "Island workshop concept, inspired by Straddie materials.",
        focal: "The blank prompt cards in the centre of the table.",
        camera: "Eye-level wide shot from one side of the table.",
        light: "Warm natural daylight.",
        style: "Realistic editorial photograph.",
        foreground: "Pen, paper cards, timber swatches, small tools.",
        middle: "Workbench, laptop with blank screen, storage boxes.",
        background: "Open doorway, green plants, simple shelves.",
        materials: "Timber, paper, recycled boxes, teal storage, sand and green colours.",
        movement: "No people.",
        accuracy: "Keep it practical and local; no random city skyline or science-fiction clutter.",
        references: "One workshop photo; one material palette photo.",
        assets: "Table; laptop; cards; tools; storage; doorway.",
        states: "Second pass: active workshop version with a few tools moved.",
        controls: "Camera angle; clutter level; light; colour palette; screen left blank.",
        negative: "Readable private text, faces, fake logos, surveillance aesthetic, disaster scene.",
        iteration: "Make it less cluttered and more clearly local."
      }
    }
  };

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function value(name) {
    const element = form.elements[name];
    return element ? String(element.value || "").trim() : "";
  }

  function clean(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function yaml(text) {
    return '"' + String(text || "not supplied").replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
  }

  function slugify(text) {
    return String(text || "simulation-prompt")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "simulation-prompt";
  }

  function activeConfig() {
    return configs[value("builder_type")] || configs["l0-space"];
  }

  function selectedTool() {
    const target = value("target_engine").toLowerCase();
    if (target.includes("openai")) {
      return {
        name: "OpenAI GPT Image 2",
        type: "image",
        model: "gpt-image-2",
        settingHint: "Use the tool's image model, chosen aspect ratio and quality setting. Keep edits as separate follow-up prompts.",
        opener: "Create one high-quality still image from this brief.",
        closing: "Keep the request literal. Do not add extra locations, timelines, dashboards or unrelated symbols."
      };
    }
    if (target.includes("grok") && target.includes("video")) {
      return {
        name: "Grok Imagine video",
        type: "video",
        model: "grok-imagine-video",
        settingHint: "Use one short shot, the chosen aspect ratio and a simple motion direction. Do not ask for a whole story in one prompt.",
        opener: "Create one short video shot from this brief.",
        closing: "Keep the camera, place and objects stable. Animate only the movement described."
      };
    }
    if (target.includes("grok")) {
      return {
        name: "Grok Imagine image",
        type: "image",
        model: "grok-imagine-image-quality",
        settingHint: "Use the image model, chosen aspect ratio and resolution. Keep the prompt short enough to stay visually coherent.",
        opener: "Create one still image from this brief.",
        closing: "Keep the scene readable and grounded. Do not add unrelated comedy, fantasy or celebrity elements."
      };
    }
    if (target.includes("world labs") && target.includes("prep")) {
      return {
        name: "World Labs Marble image/video prep",
        type: "world-prep",
        model: "Marble image or video input",
        settingHint: "Make a clean spatial reference image first. World builders need visible ground, depth and separate objects more than decorative labels.",
        opener: "Create one spatial reference image for a later three-dimensional (3D) world.",
        closing: "Show a clear ground plane, depth, separate objects and visible surfaces. Avoid close-up-only framing, flat posters and tiny unreadable labels."
      };
    }
    if (target.includes("world labs")) {
      return {
        name: "World Labs Marble text to world",
        type: "world",
        model: "Marble text-to-world",
        settingHint: "Write a spatial scene prompt. Keep it under the tool limit and describe the environment, not a collage of ideas.",
        opener: "Create one spatial three-dimensional (3D) world scene from this brief.",
        closing: "Prioritise walkable space, ground plane, depth, object placement and clear room or outdoor boundaries."
      };
    }
    return {
      name: "General image generator",
      type: "image",
      model: "tool chosen by user",
      settingHint: "Use the chosen aspect ratio and quality setting. Generate one base image before asking for edits, motion or a world.",
      opener: "Create one still image from this brief.",
      closing: "Keep this to one scene, one moment, one camera view and one main subject."
    };
  }

  function fieldExample(config, field) {
    return config.examples[field.key] || "";
  }

  function renderDynamicFields() {
    const config = activeConfig();
    dynamicFields.innerHTML = `
      <div class="builder-note">
        <strong>${config.title}</strong>
        <span>${config.guidance}</span>
      </div>
      ${fieldGroups.map((group, index) => `
        <fieldset class="prompt-step">
          <legend>${index + 2}. ${group.title}</legend>
          <p class="field-guidance">${group.help}</p>
          ${group.fields.map((field) => `
            <label>${field.label}
              <span class="field-help">${field.hint}</span>
              <textarea name="${field.name}" placeholder="${fieldExample(config, field)}"></textarea>
            </label>
          `).join("")}
        </fieldset>
      `).join("")}
    `;
  }

  function addPromptLine(lines, label, body) {
    const text = clean(body);
    if (text) lines.push(label + ": " + text);
  }

  function conciseList(text) {
    return clean(text).replace(/,\s*/g, ", ");
  }

  function toolSettings() {
    const profile = selectedTool();
    const lines = [
      "- Tool profile: " + profile.name,
      "- Model or mode: " + profile.model,
      "- First pass: " + (value("output_shape") || "One still image"),
      "- Aspect ratio: " + (value("aspect_ratio") || "16:9 landscape"),
      "- Fidelity: " + (value("quality_target") || "Medium / normal quality"),
      "- Practical note: " + profile.settingHint
    ];

    if (profile.type === "video") {
      lines.push("- Motion rule: use one short shot before asking for a sequence.");
    }
    if (profile.type === "world" || profile.type === "world-prep") {
      lines.push("- Spatial rule: make the base scene readable before adding controls, states or data overlays.");
    }

    return lines.join("\n");
  }

  function pastePrompt(config) {
    const profile = selectedTool();
    const lines = [
      profile.opener,
      "Aspect ratio: " + (value("aspect_ratio") || "16:9 landscape") + ".",
      "Keep it to one place, one moment, one camera view and one main subject."
    ];

    addPromptLine(lines, "Scene", value("prompt_sentence"));
    addPromptLine(lines, "Place", value("real_place"));
    addPromptLine(lines, "Main subject", value("focal_point"));
    addPromptLine(lines, "Camera", value("camera_view"));
    addPromptLine(lines, "Light", value("light_weather"));
    addPromptLine(lines, "Style", value("style_reference"));
    addPromptLine(lines, "Foreground", value("foreground"));
    addPromptLine(lines, "Middle ground", value("middle_ground"));
    addPromptLine(lines, "Background", value("background"));
    addPromptLine(lines, "Materials and colours", value("materials_texture"));
    addPromptLine(lines, profile.type === "video" ? "Movement" : "People", value("people_movement"));
    addPromptLine(lines, "Do not guess", value("must_be_accurate"));
    addPromptLine(lines, "Use attached references for", value("reference_materials"));

    lines.push("Leave signs, screens and documents blank or unreadable unless exact public text is supplied.");
    lines.push("Do not add private details, official approval, brand logos, named real people or sensitive locations.");
    lines.push(profile.closing);

    return lines.join("\n");
  }

  function negativePrompt() {
    const text = clean(value("negative_prompt"));
    return text || "Wrong location, readable private text, named real people, fake logos, false official seal, sensational disaster scene, surveillance aesthetic, random sci-fi clutter, extra dashboards, unrelated symbols.";
  }

  function followUpPrompts() {
    const lines = [];
    const iteration = clean(value("iteration_handoff"));
    const states = clean(value("state_changes"));
    const controls = clean(value("customisation_controls"));
    const assets = clean(value("assets_to_build"));

    if (iteration) {
      lines.push("Edit pass:");
      lines.push("Use the approved base image. Change only this: " + iteration + ". Keep the same place, camera angle, main subject and overall style.");
      lines.push("");
    }

    if (states) {
      lines.push("Video or simulation pass:");
      lines.push("Use the approved base scene. Animate only these changes: " + states + ". Keep geography, object positions and camera direction stable.");
      lines.push("");
    }

    if (assets || controls) {
      lines.push("World-builder pass:");
      lines.push("Use the approved base scene as the reference. Build separate editable parts: " + (conciseList(assets) || "not supplied yet") + ".");
      if (controls) lines.push("Expose these simple controls: " + controls + ".");
      lines.push("Keep the first world draft simple before adding extra states or data layers.");
    }

    return lines.length ? lines.join("\n") : "No follow-up prompts supplied yet. Get the first image right before adding edits, video, states or world controls.";
  }

  function handoffNotes() {
    const lines = [];
    addPromptLine(lines, "Separate objects or assets", value("assets_to_build"));
    addPromptLine(lines, "States or time changes", value("state_changes"));
    addPromptLine(lines, "Editable controls", value("customisation_controls"));
    addPromptLine(lines, "Reference material", value("reference_materials"));
    addPromptLine(lines, "Version two improvement", value("iteration_handoff"));
    return lines.length ? lines.join("\n") : "No handoff details supplied yet.";
  }

  function readable(name) {
    return value(name) || "Not supplied yet.";
  }

  function bullet(label, body) {
    return "- " + label + ": " + (clean(body) || "Not supplied yet.");
  }

  function buildMarkdown() {
    const config = activeConfig();
    const title = value("record_title") || config.title;
    const sourceDate = value("source_date") || todayIso();

    return [
      "# " + title,
      "",
      "This Markdown (.md) file keeps the model prompt separate from the human notes. Paste the first prompt only. Use the follow-up prompts after the first image or world draft is close to the picture in your head.",
      "",
      "## 1. Paste This First",
      "",
      "```text",
      pastePrompt(config),
      "```",
      "",
      "## 2. Negative Prompt",
      "",
      "```text",
      negativePrompt(),
      "```",
      "",
      "## 3. Tool Settings",
      "",
      toolSettings(),
      "",
      "## 4. Follow-Up Prompts",
      "",
      "```text",
      followUpPrompts(),
      "```",
      "",
      "## 5. Human Scene Notes",
      "",
      bullet("Scale", config.scale),
      bullet("Plain name", config.plainName),
      bullet("Human scale note", config.scaleRule),
      bullet("Scene", readable("prompt_sentence")),
      bullet("Place facts", readable("real_place")),
      bullet("Focal point", readable("focal_point")),
      bullet("Foreground", readable("foreground")),
      bullet("Middle ground", readable("middle_ground")),
      bullet("Background", readable("background")),
      bullet("Camera", readable("camera_view")),
      bullet("Light/weather/mood", readable("light_weather")),
      bullet("Materials/local texture", readable("materials_texture")),
      bullet("People/movement", readable("people_movement")),
      bullet("Style", readable("style_reference")),
      bullet("Reference material", readable("reference_materials")),
      "",
      "## 6. World Or Video Handoff Notes",
      "",
      bullet("Must stay accurate", readable("must_be_accurate")),
      bullet("Separate assets", readable("assets_to_build")),
      bullet("States over time", readable("state_changes")),
      bullet("Easy controls", readable("customisation_controls")),
      bullet("Version two", readable("iteration_handoff")),
      "",
      "```text",
      handoffNotes(),
      "```",
      "",
      "## Privacy And Sharing Choices",
      "",
      bullet("Prompt status", value("draft_status")),
      bullet("Chosen helpers", value("reviewer")),
      bullet("Share or reuse choice", value("consent_scope")),
      bullet("Correction path", value("correction_path")),
      bullet("Private or sensitive details not included", value("private_exclusions")),
      "",
      "## Packet Metadata",
      "",
      "```yaml",
      "schema: " + yaml(config.schema),
      "scale: " + yaml(config.scale),
      "prompt_type: " + yaml(config.title),
      "target_generator: " + yaml(value("target_engine")),
      "first_pass: " + yaml(value("output_shape")),
      "aspect_ratio: " + yaml(value("aspect_ratio")),
      "fidelity: " + yaml(value("quality_target")),
      "title: " + yaml(title),
      "prepared_by: " + yaml(value("prepared_by")),
      "source_date: " + yaml(sourceDate),
      "draft_status: " + yaml(value("draft_status")),
      "```",
      "",
      "## Public Doors",
      "",
      "- Digital Twin Builders: https://auraofintelligence.github.io/straddie-digital-twin-builders/",
      "- Purple Party for Australia civic twin builders: https://auraofintelligence.github.io/p4a_xyz/pages/civic-twin-builders.html",
      "- Straddie Noticeboard Network: https://auraofintelligence.github.io/straddie-noticeboard-network/",
      "- Straddie Capsule Surge Lab: https://auraofintelligence.github.io/straddie-capsule-surge-lab/",
      ""
    ].join("\n");
  }

  function saveState() {
    const state = {};
    Array.from(form.elements).forEach((element) => {
      if (element.name) state[element.name] = element.value;
    });
    sessionStorage.setItem("straddieDigitalTwinBuilder", JSON.stringify(state));
  }

  function restoreState() {
    try {
      const state = JSON.parse(sessionStorage.getItem("straddieDigitalTwinBuilder") || "{}");
      if (state.builder_type && configs[state.builder_type]) typeSelect.value = state.builder_type;
      renderDynamicFields();
      Object.keys(state).forEach((name) => {
        if (form.elements[name]) form.elements[name].value = state[name];
      });
    } catch (error) {
      renderDynamicFields();
    }
  }

  function setStatus(message) {
    if (!status) return;
    status.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => {
      status.textContent = "";
    }, 2600);
  }

  function updateOutput() {
    output.value = buildMarkdown();
    saveState();
  }

  typeSelect.addEventListener("change", () => {
    renderDynamicFields();
    updateOutput();
  });

  form.addEventListener("input", updateOutput);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateOutput();
    setStatus("Prompt packet updated.");
  });

  copyButton?.addEventListener("click", async () => {
    updateOutput();
    try {
      await navigator.clipboard.writeText(output.value);
      setStatus("Prompt packet copied.");
    } catch (error) {
      output.select();
      document.execCommand("copy");
      setStatus("Prompt packet selected and copied.");
    }
  });

  downloadButton?.addEventListener("click", () => {
    updateOutput();
    const config = activeConfig();
    const filename = slugify(value("record_title") || config.filename.replace(/\.md$/i, "")) + ".md";
    const blob = new Blob([output.value], { type: "text/markdown;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 0);
    setStatus(filename + " ready.");
  });

  clearButton?.addEventListener("click", () => {
    sessionStorage.removeItem("straddieDigitalTwinBuilder");
    form.reset();
    renderDynamicFields();
    updateOutput();
    setStatus("Cleared.");
  });

  restoreState();
  updateOutput();
})();
