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
      title: "Picture it",
      help: "Start with the thing in your head. Short, concrete answers work best.",
      fields: [
        {
          name: "prompt_sentence",
          label: "What should the model make?",
          hint: "One sentence. Name the place, subject and result.",
          key: "scene"
        },
        {
          name: "real_place",
          label: "Where is it, and what local facts matter?",
          hint: "Give anchors the model should respect. If you are inventing, say it is a concept.",
          key: "place"
        },
        {
          name: "focal_point",
          label: "What should the viewer notice first?",
          hint: "This becomes the main subject, not background decoration.",
          key: "focal"
        },
        {
          name: "foreground",
          label: "What is close to the camera?",
          hint: "Objects, people, signs, tools, path edges, water, desks or screens.",
          key: "foreground"
        },
        {
          name: "middle_ground",
          label: "What sits in the middle of the scene?",
          hint: "The useful working area: benches, routes, kiosk, room layout, ferry queue, island table, etc.",
          key: "middle"
        },
        {
          name: "background",
          label: "What is behind it?",
          hint: "Horizon, buildings, dunes, bay, workshop wall, trees, maps, noticeboards or public space.",
          key: "background"
        }
      ]
    },
    {
      title: "Make it renderable",
      help: "These answers stop the model guessing the wrong camera, style or mood.",
      fields: [
        {
          name: "camera_view",
          label: "What is the camera or viewing angle?",
          hint: "Examples: eye-level from the doorway, wide establishing shot, overhead plan, isometric, close detail.",
          key: "camera"
        },
        {
          name: "light_weather",
          label: "What light, time, weather or mood?",
          hint: "Examples: morning ferry light, warm workshop afternoon, calm overcast, night mode, post-storm but not panic.",
          key: "light"
        },
        {
          name: "materials_texture",
          label: "What materials, colours and local texture?",
          hint: "Timber, sand, mangrove green, weathered signs, steel kiosk, paper forms, solar screen, local planting.",
          key: "materials"
        },
        {
          name: "people_movement",
          label: "What should people or moving parts do?",
          hint: "Use anonymous people unless real people are deliberately part of the prompt.",
          key: "movement"
        },
        {
          name: "style_reference",
          label: "What style should it use?",
          hint: "Realistic photo, clean concept art, planning-table model, game-engine blockout, documentary render, storyboard.",
          key: "style"
        },
        {
          name: "reference_materials",
          label: "What reference images or source links will you attach?",
          hint: "Name what each reference is for: geography, material, camera, signage style, object shape or mood.",
          key: "references"
        }
      ]
    },
    {
      title: "Make it useful",
      help: "These answers help a world builder or video model keep the scene editable.",
      fields: [
        {
          name: "assets_to_build",
          label: "What separate parts should the tool build?",
          hint: "Examples: kiosk, path, ferry, notice screen, bench, capsule, map table, tool rack, garden bed.",
          key: "assets"
        },
        {
          name: "state_changes",
          label: "What changes over time?",
          hint: "Weather, tide, crowd level, power mode, screen message, event mode, route, season or emergency state.",
          key: "states"
        },
        {
          name: "customisation_controls",
          label: "What should be easy to change later?",
          hint: "Camera, time of day, materials, layout, screen placeholders, people count, access path or world state.",
          key: "controls"
        },
        {
          name: "must_be_accurate",
          label: "What must stay accurate?",
          hint: "Scale, geography, local status, cultural context, source date, safety boundary, what is concept versus real.",
          key: "accuracy"
        },
        {
          name: "negative_prompt",
          label: "What should not appear?",
          hint: "No fake logos, no readable private text, no named real people, no dystopian panic, no official-looking seal.",
          key: "negative"
        },
        {
          name: "iteration_handoff",
          label: "What should version two improve?",
          hint: "Better geography, cleaner layout, less clutter, stronger local materials, calmer tone, more playable layout.",
          key: "iteration"
        }
      ]
    }
  ];

  const configs = {
    "l0-space": {
      title: "Level 0 (L0) Private Room / Object Prompt",
      filename: "l0-private-room-object-prompt.md",
      schema: "straddie.prompt_builder.l0_private_room_object.v2",
      scale: "Level 0 (L0)",
      plainName: "private scene",
      guidance: "Use this for a room, desk, studio, capsule, tool bench, device cluster, garden bed or object that starts under your control.",
      scaleRule: "Treat this as Level 0 (L0): a private scene. Keep identity, routines, health details and live device details out unless the owner deliberately writes them into the prompt.",
      examples: {
        scene: "A calm private repair bench beside a window, ready for a realistic image generator and later a small walkable room model.",
        place: "Private room or object. If based on a real home or studio, describe only the shareable parts.",
        focal: "The organised bench with labelled tool zones and a laptop showing placeholder cards.",
        foreground: "Notebook, safe tools, material samples, small tags, no readable private names.",
        middle: "Work surface, storage, cable path, screen placeholders and clear movement space.",
        background: "Shelves, plants, soft window light, privacy shell and quiet local-server corner.",
        camera: "Eye-level doorway view, slightly wide, natural perspective.",
        light: "Warm late-afternoon light, calm and capable, no hospital or surveillance mood.",
        materials: "Timber bench, recycled boxes, brushed metal tools, paper cards, soft green and sand colours.",
        movement: "No one identifiable. Show a hand placing a tool only if needed.",
        style: "Realistic documentary render with clean product-detail clarity.",
        references: "Attach photos for bench layout, material colour and object shape only.",
        assets: "Bench, shelves, laptop, paper prompt cards, storage boxes, device shell, light source.",
        states: "Day mode and night mode; tidy setup and active repair setup.",
        controls: "Change lighting, tool types, storage layout, camera angle and privacy level.",
        accuracy: "Keep scale practical, leave private documents unreadable, do not invent medical equipment.",
        negative: "Readable private text, faces, exposed addresses, hospital horror, surveillance wall, fake brands.",
        iteration: "Create a top-down layout and a calmer night version."
      }
    },
    "l1-place": {
      title: "Level 1 (L1) Place / Venue World Prompt",
      filename: "l1-place-venue-world-prompt.md",
      schema: "straddie.prompt_builder.l1_place_venue_world.v2",
      scale: "Level 1 (L1)",
      plainName: "shared place scene",
      guidance: "Use this for a venue, street edge, kiosk, noticeboard, maker-space, market, ferry gateway, Ballow Road concept, public screen or local project scene.",
      scaleRule: "Treat this as Level 1 (L1): a shared place. Show the chosen public context, use anonymous people, and label concepts as concepts rather than authority.",
      examples: {
        scene: "A Level 1 (L1) Straddie noticeboard network scene where one local notice becomes a wall screen, kiosk display, tablet view and phone story.",
        place: "Minjerribah / North Stradbroke Island place context. If using Ballow Road, keep 9 Ballow Road and 10-12 Ballow Road separate.",
        focal: "The notice moving cleanly from one Markdown prompt into several local display surfaces.",
        foreground: "Tablet on a shop counter, paper notice card, small material samples, source-date tag.",
        middle: "Wall screen, kiosk, local asset cache, phone preview and clear arrows showing the publishing path.",
        background: "Ferry gateway, coastal trees, modest local buildings, bay glimpses, practical shade.",
        camera: "Wide civic concept view at human height, readable surfaces but no private text.",
        light: "Clear island daylight, practical and calm, not emergency panic.",
        materials: "Weathered timber, solar screen, rugged kiosk, paper notice, teal and sand signage.",
        movement: "Anonymous locals reading, posting and checking notices; ferry in the distance.",
        style: "Realistic civic concept art with clean annotated display surfaces.",
        references: "Attach local photos for ferry context, noticeboard style and material palette.",
        assets: "Wall screen, kiosk, phone story, tablet, notice card, fallback radio, local cache icon set.",
        states: "Normal notice, event notice, low-power fallback, offline mode, review before publish.",
        controls: "Crowd level, time of day, screen type, notice priority, offline/online state and weather.",
        accuracy: "Keep island scale modest, keep status clear, do not invent ownership or official approval.",
        negative: "Police-state wall, luxury mega-development, panic scene, fake logos, real faces, official seal.",
        iteration: "Try everyday mode, market mode, storm fallback and quieter neighbour mode."
      }
    },
    "l2-boundary": {
      title: "Level 2 (L2) Bioregion-Scale Prompt Brief",
      filename: "l2-bioregion-scale-prompt-brief.md",
      schema: "straddie.prompt_builder.l2_bioregion_scale_brief.v2",
      scale: "Level 2 (L2)",
      plainName: "bioregion-scale scene",
      guidance: "Use this for island chains, bays, watersheds, ferry corridors, wetlands, catchments and shared responsibility questions.",
      scaleRule: "Treat this as Level 2 (L2): a wider public-scale brief. Use public-source context and chosen summaries. Do not expose household records, vulnerable-person locations or culturally sensitive details.",
      examples: {
        scene: "A planning-table world model showing Minjerribah inside the Moreton Bay island chain, the bay inside its watershed, and shared information flowing between scales.",
        place: "Minjerribah / North Stradbroke Island, Moreton Bay, South East Queensland watershed. Use public-source scale only.",
        focal: "The relationship between island, bay and watershed, shown as a clear layered model.",
        foreground: "Tabletop map edge, small town markers, prompt cards, source-date tags and simple legend.",
        middle: "Island chain, ferry line, bay water, wetland edges, public screen nodes and safe flow arrows.",
        background: "Watershed outline, river/catchment hints, sky and bay horizon, no private household dots.",
        camera: "Oblique aerial planning-table view, like a documentary atlas mixed with a physical model.",
        light: "Early evening planning-room light with readable map detail and calm civic focus.",
        materials: "Map paper, translucent water layers, timber blocks, pin markers, clear source labels.",
        movement: "Tide arrows, ferry pulse, visitor flow and weather-state overlays as optional layers.",
        style: "Layered atlas plus realistic tabletop model, not a disaster movie.",
        references: "Attach public maps or source links for geography, wetland/catchment boundaries and ferry context.",
        assets: "Island model, bay water layer, watershed layer, ferry path, public screen nodes, source legend.",
        states: "Everyday day, event day, ferry disruption, heatwave, storm fallback and wetland education view.",
        controls: "Tide, weather, visitor volume, ferry state, public screen availability and time horizon.",
        accuracy: "Keep Moreton Bay scale, public Ramsar/wetland context and Country context source-aware.",
        negative: "Dystopian flood panic, fake authority seal, raw household dots, secret sites, sensational disaster scene.",
        iteration: "Create an everyday version and a storm-fallback version using the same base map."
      }
    },
    "simulation-brief": {
      title: "Simulation Customisation Prompt",
      filename: "simulation-customisation-prompt.md",
      schema: "straddie.prompt_builder.simulation_customisation.v2",
      scale: "Level 0 to Level 2 (L0-L2)",
      plainName: "simulation prompt",
      guidance: "Use this when the important thing is not one picture, but a scene with states, controls and changes over time.",
      scaleRule: "Treat this as a rehearsal brief, not a prediction. Show possible states, editable controls and uncertainty. Do not make fake official instructions.",
      examples: {
        scene: "A calm interactive simulation of a Straddie ferry gateway on a busy event day, with screen messages, crowd flow and low-power fallback mode.",
        place: "A chosen place or route, described with public-safe details and no private access information.",
        focal: "The change from normal mode to fallback mode, without panic or false emergency authority.",
        foreground: "Control panel, source-date tag, map legend and one public screen preview.",
        middle: "People as anonymous groups, route paths, shade, waiting zones, ferry or vehicle movement.",
        background: "Bay, street edge, venue, trees, weather layer and public information surfaces.",
        camera: "Split view: walkable scene plus simple overhead map.",
        light: "Readable planning-light style, with day/night state available.",
        materials: "Simple colour-coded layers, local materials, practical signage and clear controls.",
        movement: "People move in groups, screens update, weather changes, power mode changes.",
        style: "Friendly game-engine prototype or digital twin dashboard, not a crisis command centre.",
        references: "Attach route photos, public map, screen layout reference and material palette.",
        assets: "Map layer, route paths, screens, people groups, weather layer, control panel, source labels.",
        states: "Normal, busy, wet weather, ferry delay, low power, after-event reset.",
        controls: "Crowd volume, weather, time, screen mode, staff level, power state and route closure.",
        accuracy: "Label source dates and uncertainty; do not claim live authority or guaranteed prediction.",
        negative: "Fake emergency order, private-person tracking, medical advice, official seal, sensational disaster imagery.",
        iteration: "Compare a heavy option with a smaller, kinder option."
      }
    },
    "scene-space": {
      title: "Plain-English Visual Scene Prompt",
      filename: "plain-english-visual-scene-prompt.md",
      schema: "straddie.prompt_builder.visual_scene.v2",
      scale: "Level 0 to Level 2 (L0-L2)",
      plainName: "visual scene",
      guidance: "Use this as the simplest prompt-spawner: one clear scene, enough visible detail, and a strong first render.",
      scaleRule: "Use the scale the person chose. Ask for missing details rather than inventing private or sensitive context.",
      examples: {
        scene: "A clear realistic image of a Straddie maker-space table where repair tools, material samples and plain-English prompt cards are ready to become a local world-building scene.",
        place: "A local island workshop or public-safe concept scene, not a generic city studio.",
        focal: "The table where ordinary notes become a visual-generation prompt.",
        foreground: "Prompt cards, pen, material swatches, safe tools and one blank device screen.",
        middle: "Workbench, storage boxes, parts, labels and a tidy route through the room.",
        background: "Open door to native plants, shelves, soft light and local workshop texture.",
        camera: "Eye-level wide shot, close enough to understand the objects.",
        light: "Warm natural daylight, practical and welcoming.",
        materials: "Timber, paper, recycled boxes, teal storage, sand and green local palette.",
        movement: "Still image. Optional person only as anonymous hands, not a face.",
        style: "Realistic editorial photograph with clean concept-art control.",
        references: "Attach one room reference, one material reference and one mood reference if available.",
        assets: "Table, laptop, paper forms, parts, storage, doorway, plants, prompt cards.",
        states: "Clean setup, active repair setup and packed-away version.",
        controls: "Camera angle, clutter level, lighting, materials, screen placeholder and colour palette.",
        accuracy: "Keep it grounded, practical and local; no random city skyline or sci-fi clutter.",
        negative: "Readable private text, named real people, fake logos, surveillance aesthetic, disaster sensationalism.",
        iteration: "Make it more local, less cluttered and easier to rebuild in three-dimensional (3D)."
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

  function targetInstruction() {
    const target = value("target_engine").toLowerCase();
    if (target.includes("image")) return "Make one strong still image. Prioritise composition, local detail and visual clarity.";
    if (target.includes("video")) return "Make a short moving shot. Keep geography and object positions stable from frame to frame.";
    if (target.includes("3d") || target.includes("world")) return "Build a walkable three-dimensional (3D) scene with clear scale, separate objects and editable materials.";
    if (target.includes("4d") || target.includes("simulation")) return "Build a time-aware scene with editable states, not a fixed prediction.";
    if (target.includes("game")) return "Build an interactive prototype scene with clear routes, objects, states and simple controls.";
    return "Make a prompt pack that can be split into still image, video and world-building passes.";
  }

  function addPromptLine(lines, label, body) {
    const text = clean(body);
    if (text) lines.push(label + ": " + text);
  }

  function lowerFirst(text) {
    const phrase = clean(text);
    return phrase ? phrase.charAt(0).toLowerCase() + phrase.slice(1) : "";
  }

  function pastePrompt(config) {
    const outputPhrase = lowerFirst(value("output_shape")) || "a high-quality visual scene";
    const target = clean(value("target_engine")) || "an external generator";
    const lines = [
      "Create " + outputPhrase + " for this target: " + target + ".",
      targetInstruction(),
      config.scaleRule
    ];

    addPromptLine(lines, "Quality target", value("quality_target"));
    addPromptLine(lines, "Core scene", value("prompt_sentence"));
    addPromptLine(lines, "Real-world or concept anchor", value("real_place"));
    addPromptLine(lines, "Main focal point", value("focal_point"));
    addPromptLine(lines, "Foreground", value("foreground"));
    addPromptLine(lines, "Middle ground", value("middle_ground"));
    addPromptLine(lines, "Background", value("background"));
    addPromptLine(lines, "Camera and framing", value("camera_view"));
    addPromptLine(lines, "Light, weather and mood", value("light_weather"));
    addPromptLine(lines, "Materials, colours and local texture", value("materials_texture"));
    addPromptLine(lines, "People, movement and behaviour", value("people_movement"));
    addPromptLine(lines, "Style", value("style_reference"));
    addPromptLine(lines, "Reference material to follow", value("reference_materials"));
    addPromptLine(lines, "Must stay accurate", value("must_be_accurate"));

    lines.push("Use placeholders for signs, screens and documents unless exact public text is supplied.");
    lines.push("Do not invent private details, official approval, brand logos, named real people or sensitive locations.");

    return lines.join("\n");
  }

  function negativePrompt() {
    const text = clean(value("negative_prompt"));
    return text || "No readable private text, no named real people, no fake logos, no false official seal, no sensational disaster scene, no surveillance aesthetic.";
  }

  function worldBuilderBrief() {
    const lines = [];
    addPromptLine(lines, "Separate objects or assets", value("assets_to_build"));
    addPromptLine(lines, "States or time changes", value("state_changes"));
    addPromptLine(lines, "Editable controls", value("customisation_controls"));
    addPromptLine(lines, "Reference material", value("reference_materials"));
    addPromptLine(lines, "Version two improvement", value("iteration_handoff"));
    return lines.length ? lines.join("\n") : "No world-builder handoff details supplied yet.";
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
      "This Markdown (.md) file is built for outside image, video, three-dimensional (3D), four-dimensional (4D), game or world-building tools. The first section is the clean prompt to paste into a model. The later sections keep the human notes, source choices and privacy boundaries clear.",
      "",
      "## Copy-Paste Prompt",
      "",
      "```text",
      pastePrompt(config),
      "```",
      "",
      "## Negative Prompt",
      "",
      "```text",
      negativePrompt(),
      "```",
      "",
      "## World-Builder Handoff",
      "",
      "```text",
      worldBuilderBrief(),
      "```",
      "",
      "## Scene Recipe",
      "",
      bullet("Scale", config.scale),
      bullet("Plain name", config.plainName),
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
      "## Accuracy And Edit Controls",
      "",
      bullet("Must stay accurate", readable("must_be_accurate")),
      bullet("Separate assets", readable("assets_to_build")),
      bullet("States over time", readable("state_changes")),
      bullet("Easy controls", readable("customisation_controls")),
      bullet("Version two", readable("iteration_handoff")),
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
      "output_shape: " + yaml(value("output_shape")),
      "quality_target: " + yaml(value("quality_target")),
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
