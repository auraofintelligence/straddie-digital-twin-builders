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

  const configs = {
    "l0-space": {
      title: "Level 0 (L0) Private Room / Object Prompt",
      filename: "l0-private-room-object-prompt.md",
      schema: "straddie.prompt_builder.l0_private_room_object.v1",
      scale: "Level 0 (L0)",
      guidance: "Use this for a private room, desk, studio, capsule, tool bench, device cluster, garden bed or object scene. It should help a generator make a faithful visual without exposing private life.",
      fields: [
        ["scene_or_space", "What exact room, object or private space should be generated?", "A repair bench beside a window, a capsule berth, a quiet home server shelf, a garden work table, a private planning desk."],
        ["simulation_goal", "What should the generated scene help someone understand?", "Layout, mood, affordances, safety, comfort, tool access, privacy boundary, repair flow, rest flow or support workflow."],
        ["viewer_or_camera", "Where is the viewer or camera?", "Eye-level doorway view, top-down layout, close-up object render, gentle over-the-shoulder view, before/after comparison."],
        ["visible_subjects", "What must be visibly included?", "Furniture, tools, screens, storage, cable paths, plants, lighting, labels, materials, device silhouettes, clear work zones."],
        ["world_rules", "What should be true inside this little world?", "No public access, low clutter, warm lighting, quiet support mode, owner-controlled devices, no intrusive sensors."],
        ["customisation_controls", "What should a user be able to customise?", "Colour, tool types, storage layout, screen content placeholders, lighting, accessibility, privacy shell, day/night mode."],
        ["style_reference", "What visual style should it use?", "Realistic documentary render, clean product mock-up, cosy workshop, gentle sci-fi, low-poly 3D, architectural cutaway, diagrammatic isometric."],
        ["accuracy_rules", "What details should stay accurate?", "Scale, material type, privacy shell, device location, no fake brand logos, no invented medical equipment, no impossible layout."],
        ["negative_prompt", "What should the generator avoid?", "No surveillance wall, no hospital horror, no messy dystopia, no readable private text, no faces, no exposed identity documents."],
        ["private_exclusions", "What private details must not be shown?", "Names, addresses, health data, family photos, live messages, exact device keys, exact access paths, household routines."],
        ["iteration_handoff", "What should the next version adjust?", "Make it more accessible, add better storage, create top-down view, render a safer night version, make it ready for a world builder."]
      ]
    },
    "l1-place": {
      title: "Level 1 (L1) Place / Venue World Prompt",
      filename: "l1-place-venue-world-prompt.md",
      schema: "straddie.prompt_builder.l1_place_venue_world.v1",
      scale: "Level 1 (L1)",
      guidance: "Use this for a venue, street edge, kiosk, noticeboard, maker-space, market, ferry gateway, Ballow Road concept, public screen or local project scene.",
      fields: [
        ["scene_or_space", "What place or local scene should be generated?", "Dunwich ferry gateway, 9 Ballow co-working room, 10-12 Ballow public-use concept, maker-space bench, disaster kiosk, noticeboard wall."],
        ["simulation_goal", "What should the scene let people rehearse?", "Visitor flow, notice publishing, tool sharing, emergency fallback, market night, health-surge logistics, public screen placement."],
        ["viewer_or_camera", "Where is the viewer or camera?", "Street-level walk-in, ferry-arrival perspective, kiosk close-up, public-meeting view, overhead site sketch, playable third-person view."],
        ["visible_subjects", "What must be visibly included?", "Screens, signs, benches, shade, paths, people as anonymous silhouettes, ferry movement, tools, power points, storage, seating, local planting."],
        ["world_rules", "What should be true in the generated place?", "Public-friendly, not overbuilt, island scale, clear exits, no false approvals, calm signage, accessible circulation, practical weather shelter."],
        ["customisation_controls", "What should a world builder be able to change?", "Crowd level, weather, time of day, screen content, kiosk mode, event type, power state, market layout, emergency state."],
        ["style_reference", "What visual style should it use?", "Realistic civic concept art, clean game-engine blockout, local documentary render, annotated public-space sketch, warm island workshop."],
        ["accuracy_rules", "What details should stay accurate?", "Keep Straddie scale modest, separate 9 Ballow from 10-12 Ballow, avoid fake ownership claims, keep QUAMPI/ferry context source-aware."],
        ["negative_prompt", "What should the generator avoid?", "No luxury mega-development, no military bunker look, no panic scene, no police-state screen wall, no brand logos, no real faces."],
        ["private_exclusions", "What local or private details must not be shown?", "Private contacts, exact keys, vulnerable households, sensitive routes, unapproved cultural details, private leases or security layouts."],
        ["iteration_handoff", "What should the next version adjust?", "Try an everyday mode, disaster mode, market mode, quieter neighbour mode, grant mock-up mode, or playable route test."]
      ]
    },
    "l2-boundary": {
      title: "Level 2 (L2) Island / Watershed Simulation Prompt",
      filename: "l2-island-watershed-simulation-prompt.md",
      schema: "straddie.prompt_builder.l2_island_watershed_simulation.v1",
      scale: "Level 2 (L2)",
      guidance: "Use this for Minjerribah, Moreton Bay, the ferry corridor, wetlands, catchments, island systems and living-boundary simulations.",
      fields: [
        ["scene_or_space", "What island, bay or watershed world should be generated?", "Minjerribah in Moreton Bay, the ferry corridor, Dunwich/Gumpi gateway, wetland edge, bay catchment flow, island resilience map."],
        ["simulation_goal", "What should the simulation make easier to understand?", "Tide, ferry pressure, visitor movement, storm surge, heat, wetlands, public screens, water logic, ecological sensitivity, civic response."],
        ["viewer_or_camera", "Where is the viewer or camera?", "Aerial map, low-orbit overview, bay-level drone pass, interactive atlas, catchment cutaway, walkable island overview."],
        ["visible_subjects", "What must be visibly included?", "Bay water, sand islands, ferry line, town nodes, wetlands, mangroves, public screens, simple flow arrows, source markers, safe aggregation."],
        ["world_rules", "What should be true across the world?", "Level 0 (L0) homes are not exposed, Level 1 (L1) places are summarised, Level 2 (L2) uses public-source context, ecological and cultural sensitivity remain visible."],
        ["customisation_controls", "What should the simulation let users change?", "Weather, tide, visitor volume, ferry disruption, heatwave, festival day, health surge, kiosk availability, catchment pressure, time horizon."],
        ["style_reference", "What visual style should it use?", "Layered atlas, documentary satellite-meets-tabletop, civic game map, clean watershed model, soft realistic environmental simulation."],
        ["accuracy_rules", "What details should stay accurate?", "Respect Moreton Bay scale, include Ramsar/wetland sensitivity, keep Country context respectful, do not invent precise hidden data."],
        ["negative_prompt", "What should the generator avoid?", "No dystopian flood panic, no raw household dots, no fake official map seal, no dramatic disaster clickbait, no secret-place exposure."],
        ["private_exclusions", "What data must never appear at Level 2 (L2)?", "Household records, exact vulnerable-person locations, private health data, culturally sensitive sites, unreviewed raw sensor feeds."],
        ["iteration_handoff", "What should the next simulation version test?", "Everyday ferry pulse, storm fallback, heatwave rest network, wetland education view, public-screen network, quieter tourism scenario."]
      ]
    },
    "simulation-brief": {
      title: "Simulation Customisation Prompt",
      filename: "simulation-customisation-prompt.md",
      schema: "straddie.prompt_builder.simulation_customisation.v1",
      scale: "Level 0 to Level 2 (L0-L2)",
      guidance: "Use this when the important thing is not one picture, but a set of controls for changing the simulation state.",
      fields: [
        ["scene_or_space", "What simulation is being customised?", "Ferry pressure, market night, disaster kiosk fallback, health surge, Ballow Road public-use test, maker-space day, watershed stress test."],
        ["simulation_goal", "What question should the simulation help answer?", "Where people move, what screens show, how power fails, what gets crowded, where help appears, which smaller option works best."],
        ["viewer_or_camera", "How should the user experience it?", "God-view dashboard, walkable scene, split before/after, scenario sliders, agent-eye view, public-screen preview, storyboard sequence."],
        ["visible_subjects", "What variables or entities must be visible?", "People as anonymous groups, vehicles, ferries, screens, tools, beds, paths, queues, water, shade, power, food, review gates."],
        ["world_rules", "What rules should govern the simulation?", "Use plausible movement, keep official-channel boundaries, separate private and public layers, show uncertainty, avoid false precision."],
        ["customisation_controls", "What controls should exist?", "Crowd volume, weather, tide, time, event type, screen mode, generator availability, staff level, road/ferry disruption, health-surge load."],
        ["style_reference", "What style makes the simulation usable?", "Simple digital twin dashboard, friendly game-engine prototype, isometric map, planning-table model, annotated storyboard."],
        ["accuracy_rules", "What should remain source-bound?", "Public dates, property status, health claims, emergency advice, cultural authority, ecological layers and live infrastructure state."],
        ["negative_prompt", "What should the generator avoid?", "No guaranteed predictions, no fake emergency instruction, no private-person tracking, no false clinical advice, no official-looking seal."],
        ["private_exclusions", "What cannot feed or appear in the simulation?", "Names, medical records, private contact details, precise vulnerable routes, household routines, raw live feeds without consent."],
        ["iteration_handoff", "What should be tested next?", "Add one control, compare two scenarios, export a still frame, make a public-safe version, prepare a reviewer walkthrough."]
      ]
    },
    "scene-space": {
      title: "Plain-English Visual Scene Prompt",
      filename: "plain-english-visual-scene-prompt.md",
      schema: "straddie.prompt_builder.visual_scene.v1",
      scale: "Level 0 to Level 2 (L0-L2)",
      guidance: "Use this as the simplest prompt-spawner: one clear scene, plain words, enough constraints for the generator to produce a useful first visual.",
      fields: [
        ["scene_or_space", "What scene should the generator create?", "Morning ferry queue, repair table, public notice screen, market corner, capsule room, wetland lookout, street edge."],
        ["simulation_goal", "What should the image or world help someone see?", "The feeling, layout, movement, bottleneck, opportunity, missing tool, safer option, calmer future, or simulation question."],
        ["viewer_or_camera", "What view should it use?", "Wide establishing shot, close detail, first-person, overhead, isometric, split-screen before/after, storyboard panel."],
        ["visible_subjects", "What visible details matter?", "Objects, people as silhouettes, weather, paths, screens, natural features, signage placeholders, tools, materials, light, water."],
        ["world_rules", "What should be true in the scene?", "Plain English, grounded Australian island context, no fantasy unless requested, no false official claims, humans remain dignified."],
        ["customisation_controls", "What should be easy to change later?", "Weather, lighting, crowd level, time of day, screen text placeholders, materials, camera angle, colour, route, scenario state."],
        ["style_reference", "What style should the generator follow?", "Realistic, cinematic but calm, planning-table model, watercolour concept, low-poly prototype, documentary photograph, 3D render."],
        ["accuracy_rules", "What must be accurate enough?", "Location relationship, scale, mood, constraints, cultural/ecological sensitivity, safety boundary, not inventing private details."],
        ["negative_prompt", "What should not appear?", "No readable private text, no named real people, no logos, no disaster sensationalism, no surveillance aesthetic, no generic city skyline."],
        ["private_exclusions", "What private or sensitive detail should stay out?", "Names, addresses, private messages, health details, exact access codes, sensitive cultural or ecological locations."],
        ["iteration_handoff", "What should version two improve?", "More accurate geography, clearer signage placeholders, better camera angle, less clutter, more local material texture, more playable layout."]
      ]
    }
  };

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function value(name) {
    const element = form.elements[name];
    return element ? String(element.value || "").trim() : "";
  }

  function yaml(text) {
    return '"' + String(text || "TODO").replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
  }

  function slugify(text) {
    return String(text || "simulation-prompt")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "simulation-prompt";
  }

  function fallback(name) {
    return value(name) || "TODO";
  }

  function section(title, body) {
    return ["## " + title, "", body || "TODO", ""].join("\n");
  }

  function bullet(label, body) {
    return "- " + label + ": " + (body || "TODO");
  }

  function activeConfig() {
    return configs[value("builder_type")] || configs["l0-space"];
  }

  function renderDynamicFields() {
    const config = activeConfig();
    dynamicFields.innerHTML = `
      <legend>${config.title}</legend>
      <p class="field-guidance">${config.guidance}</p>
      ${config.fields.map(([name, label, placeholder]) => `
        <label>${label}
          <textarea name="${name}" placeholder="${placeholder}"></textarea>
        </label>
      `).join("")}
    `;
  }

  function masterPrompt(config) {
    return [
      "Create a " + fallback("output_shape").toLowerCase() + " for a " + fallback("target_engine").toLowerCase() + ".",
      "Scene or world: " + fallback("scene_or_space"),
      "Purpose: " + fallback("simulation_goal"),
      "Viewpoint: " + fallback("viewer_or_camera"),
      "Visible details: " + fallback("visible_subjects"),
      "World rules: " + fallback("world_rules"),
      "Style: " + fallback("style_reference"),
      "Customisation controls: " + fallback("customisation_controls"),
      "Accuracy rules: " + fallback("accuracy_rules"),
      "Avoid: " + fallback("negative_prompt"),
      "Do not expose: " + fallback("private_exclusions"),
      "Scale logic: treat this as " + config.scale + " and do not leak details from a smaller scale into a larger public simulation."
    ].join("\n\n");
  }

  function buildMarkdown() {
    const config = activeConfig();
    const title = value("record_title") || config.title;
    const sourceDate = value("source_date") || todayIso();

    return [
      "---",
      "schema: " + yaml(config.schema),
      "scale: " + yaml(config.scale),
      "prompt_type: " + yaml(config.title),
      "target_generator: " + yaml(value("target_engine")),
      "output_shape: " + yaml(value("output_shape")),
      "title: " + yaml(title),
      "prepared_by: " + yaml(value("prepared_by")),
      "source_date: " + yaml(sourceDate),
      "draft_status: " + yaml(value("draft_status")),
      "visibility: " + yaml(config.scale.includes("(L0)") && !config.scale.includes("L0-L2") ? "private_prompt_by_default" : "permissioned_until_reviewed"),
      "---",
      "",
      "# " + title,
      "",
      "This file is a draft prompt packet for visual generators, video generators, 3D world builders, game prototypes or agent-driven simulations. It is meant to create accurate, customisable simulation scenes from plain English, not to publish raw private data or claim approval.",
      "",
      section("Builder Guidance", config.guidance),
      section("Master Prompt For Generator", masterPrompt(config)),
      "## Scene And World Details",
      "",
      bullet("Scene or space", value("scene_or_space")),
      bullet("Simulation goal", value("simulation_goal")),
      bullet("Viewer or camera", value("viewer_or_camera")),
      bullet("Visible subjects", value("visible_subjects")),
      bullet("World rules", value("world_rules")),
      "",
      "## Style And Customisation",
      "",
      bullet("Style reference", value("style_reference")),
      bullet("Customisation controls", value("customisation_controls")),
      bullet("Next iteration handoff", value("iteration_handoff")),
      "",
      "## Accuracy And Safety Constraints",
      "",
      bullet("Accuracy rules", value("accuracy_rules")),
      bullet("Negative prompt", value("negative_prompt")),
      bullet("Private or sensitive exclusions", value("private_exclusions")),
      "",
      "## Review And Reuse",
      "",
      bullet("Reviewer", value("reviewer")),
      bullet("Consent or reuse scope", value("consent_scope")),
      bullet("Correction path", value("correction_path")),
      "",
      "## Prompt Boundary",
      "",
      "- This is not an approval, legal advice, clinical advice, cultural permission, property claim or funding commitment.",
      "- Level 0 (L0) prompt packets should not reveal private rooms, people, routines, health context or exact access details unless the owner explicitly chooses that use.",
      "- Level 1 (L1) place simulations should keep site control, cultural context, safety and current status visibly uncertain until checked.",
      "- Level 2 (L2) simulations should use aggregate, public-source and reviewable context rather than raw household or sensitive place data.",
      "- Visual generators should use placeholders instead of readable private notes, logos, official seals or named real people.",
      "",
      "## Linked Public Doors",
      "",
      "- Digital Twin Builders: https://auraofintelligence.github.io/straddie-digital-twin-builders/",
      "- P4A civic twin builders: https://auraofintelligence.github.io/p4a_xyz/pages/civic-twin-builders.html",
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
