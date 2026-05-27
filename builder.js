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
      guidance: "Use this for a private room, desk, studio, capsule, tool bench, device cluster, garden bed or object scene. You choose the detail and the generator builds from your prompt.",
      fields: [
        ["scene_or_space", "What room, object or private space do you want generated?", "A repair bench beside a window, a capsule berth, a quiet home server shelf, a garden work table, a private planning desk."],
        ["simulation_goal", "What do you want the scene to show?", "Layout, mood, affordances, safety, comfort, tool access, privacy choice, repair flow, rest flow or support workflow."],
        ["viewer_or_camera", "Where is the viewer or camera?", "Eye-level doorway view, top-down layout, close-up object render, gentle over-the-shoulder view, before/after comparison."],
        ["visible_subjects", "What do you want visible?", "Furniture, tools, screens, storage, cable paths, plants, lighting, labels, materials, device silhouettes, clear work zones."],
        ["world_rules", "What are your world settings?", "Local-only use, low clutter, warm lighting, quiet support mode, owner-controlled devices, no intrusive sensors."],
        ["customisation_controls", "What do you want to customise?", "Colour, tool types, storage layout, screen content placeholders, lighting, accessibility, privacy shell, day/night mode."],
        ["style_reference", "What visual style do you want?", "Realistic documentary render, clean product mock-up, cosy workshop, gentle sci-fi, low-poly 3D, architectural cutaway, diagrammatic isometric."],
        ["accuracy_rules", "What details do you want kept accurate?", "Scale, material type, privacy shell, device location, no fake brand logos, no invented medical equipment, no impossible layout."],
        ["negative_prompt", "What do you want left out?", "Surveillance wall, hospital horror, messy dystopia, readable private text, faces, exposed identity documents."],
        ["private_exclusions", "What details stay local?", "Names, addresses, health data, family photos, live messages, exact device keys, exact access paths, household routines."],
        ["iteration_handoff", "What do you want version two to change?", "Make it more accessible, add better storage, create top-down view, render a calmer night version, make it ready for a world builder."]
      ]
    },
    "l1-place": {
      title: "Level 1 (L1) Place / Venue World Prompt",
      filename: "l1-place-venue-world-prompt.md",
      schema: "straddie.prompt_builder.l1_place_venue_world.v1",
      scale: "Level 1 (L1)",
      guidance: "Use this for a venue, street edge, kiosk, noticeboard, maker-space, market, ferry gateway, Ballow Road concept, public screen or local project scene.",
      fields: [
        ["scene_or_space", "What place or local scene do you want generated?", "Dunwich ferry gateway, 9 Ballow co-working room, 10-12 Ballow public-use concept, maker-space bench, disaster kiosk, noticeboard wall."],
        ["simulation_goal", "What do you want the scene to rehearse?", "Visitor flow, notice publishing, tool sharing, emergency fallback, market night, health-surge logistics, public screen placement."],
        ["viewer_or_camera", "Where is the viewer or camera?", "Street-level walk-in, ferry-arrival perspective, kiosk close-up, public-meeting view, overhead site sketch, playable third-person view."],
        ["visible_subjects", "What do you want visible?", "Screens, signs, benches, shade, paths, people as anonymous silhouettes, ferry movement, tools, power points, storage, seating, local planting."],
        ["world_rules", "What are your place settings?", "Public-friendly, not overbuilt, island scale, clear exits, mark ideas as ideas, calm signage, accessible circulation, practical weather shelter."],
        ["customisation_controls", "What do you want a world builder to change?", "Crowd level, weather, time of day, screen content, kiosk mode, event type, power state, market layout, emergency state."],
        ["style_reference", "What visual style do you want?", "Realistic civic concept art, clean game-engine blockout, local documentary render, annotated public-space sketch, warm island workshop."],
        ["accuracy_rules", "What details do you want kept accurate?", "Keep Straddie scale modest, separate 9 Ballow from 10-12 Ballow, do not invent ownership, keep QUAMPI/ferry context source-aware."],
        ["negative_prompt", "What do you want left out?", "Luxury mega-development, military bunker look, panic scene, police-state screen wall, brand logos, real faces."],
        ["private_exclusions", "What local details stay local?", "Private contacts, exact keys, vulnerable households, sensitive routes, cultural details you have not chosen to use, private leases or security layouts."],
        ["iteration_handoff", "What do you want version two to change?", "Try an everyday mode, disaster mode, market mode, quieter neighbour mode, grant mock-up mode, or playable route test."]
      ]
    },
    "l2-boundary": {
      title: "Level 2 (L2) Island / Watershed Simulation Prompt",
      filename: "l2-island-watershed-simulation-prompt.md",
      schema: "straddie.prompt_builder.l2_island_watershed_simulation.v1",
      scale: "Level 2 (L2)",
      guidance: "Use this for Minjerribah, Moreton Bay, the ferry corridor, wetlands, catchments, island systems and watershed simulations.",
      fields: [
        ["scene_or_space", "What island, bay or watershed world do you want generated?", "Minjerribah in Moreton Bay, the ferry corridor, Dunwich/Gumpi gateway, wetland edge, bay catchment flow, island resilience map."],
        ["simulation_goal", "What do you want the simulation to make visible?", "Tide, ferry pressure, visitor movement, storm surge, heat, wetlands, public screens, water logic, ecological sensitivity, civic response."],
        ["viewer_or_camera", "Where is the viewer or camera?", "Aerial map, low-orbit overview, bay-level drone pass, interactive atlas, catchment cutaway, walkable island overview."],
        ["visible_subjects", "What do you want visible?", "Bay water, sand islands, ferry line, town nodes, wetlands, mangroves, public screens, simple flow arrows, source markers, safe aggregation."],
        ["world_rules", "What are your world settings?", "Level 0 (L0) homes stay local, Level 1 (L1) places appear as summaries, Level 2 (L2) uses public-source context, ecological and cultural context remain visible."],
        ["customisation_controls", "What do you want users to change?", "Weather, tide, visitor volume, ferry disruption, heatwave, festival day, health surge, kiosk availability, catchment pressure, time horizon."],
        ["style_reference", "What visual style do you want?", "Layered atlas, documentary satellite-meets-tabletop, civic game map, clean watershed model, soft realistic environmental simulation."],
        ["accuracy_rules", "What details do you want kept accurate?", "Moreton Bay scale, Ramsar/wetland context, Country context, source markers, no precise hidden data."],
        ["negative_prompt", "What do you want left out?", "Dystopian flood panic, raw household dots, fake authority seal, dramatic disaster clickbait, secret-place exposure."],
        ["private_exclusions", "What details stay local at Level 2 (L2)?", "Household records, exact vulnerable-person locations, private health data, culturally sensitive sites, unreviewed raw sensor feeds."],
        ["iteration_handoff", "What do you want the next simulation to test?", "Everyday ferry pulse, storm fallback, heatwave rest network, wetland education view, public-screen network, quieter tourism scenario."]
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
        ["simulation_goal", "What do you want the simulation to answer?", "Where people move, what screens show, how power fails, what gets crowded, where help appears, which smaller option works best."],
        ["viewer_or_camera", "How do you want the user to experience it?", "God-view dashboard, walkable scene, split before/after, scenario sliders, agent-eye view, public-screen preview, storyboard sequence."],
        ["visible_subjects", "What variables or entities do you want visible?", "People as anonymous groups, vehicles, ferries, screens, tools, beds, paths, queues, water, shade, power, food, chosen helper points."],
        ["world_rules", "What simulation settings do you choose?", "Plausible movement, source-labelled emergency info, separate private and shared layers, visible uncertainty, no false precision."],
        ["customisation_controls", "What controls do you want?", "Crowd volume, weather, tide, time, event type, screen mode, generator availability, staff level, road/ferry disruption, health-surge load."],
        ["style_reference", "What style makes the simulation usable?", "Simple digital twin dashboard, friendly game-engine prototype, isometric map, planning-table model, annotated storyboard."],
        ["accuracy_rules", "What do you want source-labelled?", "Public dates, property status, health claims, emergency advice, cultural authority, ecological layers and live infrastructure state."],
        ["negative_prompt", "What do you want left out?", "Guaranteed predictions, fake emergency instruction, private-person tracking, false clinical advice, authority-looking seal."],
        ["private_exclusions", "What do you keep out of the simulation?", "Names, medical records, private contact details, precise vulnerable routes, household routines, raw live feeds you have not chosen to use."],
        ["iteration_handoff", "What do you want to test next?", "Add one control, compare two scenarios, export a still frame, make a public version, prepare a walkthrough."]
      ]
    },
    "scene-space": {
      title: "Plain-English Visual Scene Prompt",
      filename: "plain-english-visual-scene-prompt.md",
      schema: "straddie.prompt_builder.visual_scene.v1",
      scale: "Level 0 to Level 2 (L0-L2)",
      guidance: "Use this as the simplest prompt-spawner: one clear scene, plain words, enough constraints for the generator to produce a useful first visual.",
      fields: [
        ["scene_or_space", "What scene do you want the generator to create?", "Morning ferry queue, repair table, public notice screen, market corner, capsule room, wetland lookout, street edge."],
        ["simulation_goal", "What do you want the image or world to show?", "The feeling, layout, movement, bottleneck, opportunity, missing tool, safer option, calmer future, or simulation question."],
        ["viewer_or_camera", "What view do you want?", "Wide establishing shot, close detail, first-person, overhead, isometric, split-screen before/after, storyboard panel."],
        ["visible_subjects", "What visible details do you want?", "Objects, people as silhouettes, weather, paths, screens, natural features, signage placeholders, tools, materials, light, water."],
        ["world_rules", "What scene settings do you choose?", "Plain English, grounded Australian island context, no fantasy unless requested, label mock-ups as mock-ups, humans remain dignified."],
        ["customisation_controls", "What do you want easy to change later?", "Weather, lighting, crowd level, time of day, screen text placeholders, materials, camera angle, colour, route, scenario state."],
        ["style_reference", "What style do you want the generator to follow?", "Realistic, cinematic but calm, planning-table model, watercolour concept, low-poly prototype, documentary photograph, 3D render."],
        ["accuracy_rules", "What details do you want accurate?", "Location relationship, scale, mood, constraints, cultural/ecological sensitivity, safety choices, not inventing private details."],
        ["negative_prompt", "What do you want left out?", "Readable private text, named real people, logos, disaster sensationalism, surveillance aesthetic, generic city skyline."],
        ["private_exclusions", "What private or sensitive detail stays local?", "Names, addresses, private messages, health details, exact access codes, sensitive cultural or ecological locations."],
        ["iteration_handoff", "What do you want version two to improve?", "More accurate geography, clearer signage placeholders, better camera angle, less clutter, more local material texture, more playable layout."]
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
      "World settings: " + fallback("world_rules"),
      "Style: " + fallback("style_reference"),
      "Customisation controls: " + fallback("customisation_controls"),
      "Accuracy choices: " + fallback("accuracy_rules"),
      "Avoid: " + fallback("negative_prompt"),
      "Keep local: " + fallback("private_exclusions"),
      "Scale logic: treat this as " + config.scale + " and use only the smaller-scale details the owner has chosen to include."
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
      "visibility: " + yaml(config.scale.includes("(L0)") && !config.scale.includes("L0-L2") ? "private_by_owner_choice" : "shared_by_owner_choice"),
      "---",
      "",
      "# " + title,
      "",
      "This file is a self-sovereign prompt packet for visual generators, video generators, 3D world builders, game prototypes or agent-driven simulations. It turns plain English choices into accurate, customisable scenes.",
      "",
      section("Builder Guidance", config.guidance),
      section("Master Prompt For Generator", masterPrompt(config)),
      "## Scene And World Details",
      "",
      bullet("Scene or space", value("scene_or_space")),
      bullet("Simulation goal", value("simulation_goal")),
      bullet("Viewer or camera", value("viewer_or_camera")),
      bullet("Visible subjects", value("visible_subjects")),
      bullet("World settings", value("world_rules")),
      "",
      "## Style And Customisation",
      "",
      bullet("Style reference", value("style_reference")),
      bullet("Customisation controls", value("customisation_controls")),
      bullet("Next iteration handoff", value("iteration_handoff")),
      "",
      "## Accuracy And Sovereignty Settings",
      "",
      bullet("Accuracy choices", value("accuracy_rules")),
      bullet("Leave out", value("negative_prompt")),
      bullet("Keep local", value("private_exclusions")),
      "",
      "## Sharing And Reuse",
      "",
      bullet("Chosen helpers", value("reviewer")),
      bullet("Sharing choice", value("consent_scope")),
      bullet("Revision path", value("correction_path")),
      "",
      "## Self-Sovereignty Notes",
      "",
      "- Owner choice sets the detail level.",
      "- Level 0 (L0) prompt packets stay private unless the owner chooses a shared version.",
      "- Level 1 (L1) place simulations label site status, cultural context, safety and current status clearly.",
      "- Level 2 (L2) simulations use public-source context and summaries people choose to share.",
      "- Use placeholders when real names, private notes, logos, authority seals or identifiable people are not part of the chosen output.",
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
