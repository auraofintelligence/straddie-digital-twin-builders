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
      title: "L0 Sovereign Space Node",
      filename: "sovereign-space-node.md",
      schema: "straddie.digital_twin.sovereign_space_node.v0",
      scale: "L0",
      guidance: "This starts private. Describe the space enough for the owner and trusted reviewer, not for the whole public web.",
      fields: [
        ["boundary_label", "What private space is this?", "Room, studio, garden, capsule, device cluster, desk, home server or private support space."],
        ["purpose", "What should this space help with?", "Remembering, care, repair, learning, comfort, energy, food, planning, privacy, safety or simulation."],
        ["public_summary", "What tiny summary could be shared later?", "A minimal non-sensitive description, such as 'repair bench with public tool-share interest'."],
        ["private_boundary", "What must stay private?", "Health notes, identity details, household routines, family context, raw sensor streams, location-sensitive details."],
        ["sources", "What local evidence or hints exist?", "Photos, device list, rough map, owner notes, intake form, maintenance logs, source links."],
        ["next_handoff", "What can an agent do next?", "Draft checklist, summarise private notes, prepare questions, compare options, remind owner, but wait for approval before sharing."]
      ]
    },
    "l1-place": {
      title: "L1 Sensorium Place Pack",
      filename: "sensorium-place-pack.md",
      schema: "straddie.digital_twin.sensorium_place_pack.v0",
      scale: "L1",
      guidance: "This is for a trusted venue, street, project, kiosk, noticeboard, maker-space or local crew.",
      fields: [
        ["boundary_label", "What place or local mesh is being described?", "Venue, street, ferry gateway, Ballow Road site, maker-space, public screen, kiosk, event, local crew."],
        ["purpose", "What public job does it do?", "Noticeboard, repair, shelter, training, market, health support, transport, civic rehearsal, food, media."],
        ["public_summary", "What can residents or visitors safely understand?", "A plain public summary that does not reveal private contacts, private addresses or unapproved claims."],
        ["private_boundary", "What stays local or approval-only?", "Contacts, access details, expensive gear locations, lease terms, unsafe instructions, cultural or neighbour-sensitive details."],
        ["sources", "What evidence supports the place pack?", "Public links, photos, maps, opening hours, equipment lists, venue notes, expiry dates, reviewer comments."],
        ["next_handoff", "What should happen next?", "Ask a steward, check planning, create a notice, run a small scenario, prepare grant evidence, update the source date."]
      ]
    },
    "l2-boundary": {
      title: "L2 Living Boundary Map",
      filename: "living-boundary-map.md",
      schema: "straddie.digital_twin.l2_living_boundary.v0",
      scale: "L2",
      guidance: "This is for public or bioregional summaries: island, catchment, civic front, food system, disaster corridor or watershed.",
      fields: [
        ["boundary_label", "What living boundary is being mapped?", "Minjerribah, Moreton Bay watershed, Straddie town network, ferry corridor, food system, civic front."],
        ["purpose", "Why does this boundary matter?", "Care, ecology, disaster readiness, transport, public screens, water, cultural context, planning, public benefit."],
        ["public_summary", "What should the public be able to understand?", "A source-dated summary of the boundary and why it matters, without exposing L0/L1 raw data."],
        ["private_boundary", "What must not be exposed at L2?", "Household records, culturally sensitive places, vulnerable locations, raw sensor feeds, unreviewed site assumptions."],
        ["sources", "What maps, sources or authority notes matter?", "WetlandInfo, Moreton Bay Foundation, TMR, local pages, public reports, reviewed place packs."],
        ["next_handoff", "What should an agent compare or source-check next?", "Catchment maps, public pages, stale status, L1 source trails, correction requests, summary language."]
      ]
    },
    "simulation-brief": {
      title: "Civic Simulation Brief",
      filename: "civic-simulation-brief.md",
      schema: "straddie.digital_twin.civic_simulation_brief.v0",
      scale: "L0-L2",
      guidance: "This is for rehearsing a practical scenario before a decision, not proving a predetermined answer.",
      fields: [
        ["boundary_label", "What scenario is being rehearsed?", "Ferry pressure, market night, disaster kiosk fallback, health surge, Ballow Road event, maker-space day, watershed risk."],
        ["purpose", "What decision should the rehearsal help?", "Where to place people, screens, tools, beds, notices, vehicles, reviewers, power, water, food or backup paths."],
        ["public_summary", "What public output could be safe?", "Scenario note, source-dated dashboard, grant appendix, kiosk packet, public-safe summary, next-step list."],
        ["private_boundary", "What data cannot go into the public simulation?", "Health, identity, family, household, commercial, cultural, security, exact vulnerable-route or private contact data."],
        ["sources", "What inputs are needed?", "Maps, event times, ferry notes, weather, public notices, venue constraints, source dates, local observations."],
        ["next_handoff", "What is the smallest useful test?", "Choose one scenario, collect safe sample data, run a tabletop review, invite a human reviewer, publish only the summary."]
      ]
    },
    "scene-space": {
      title: "Plain-English Scene / Space Brief",
      filename: "scene-space-brief.md",
      schema: "straddie.digital_twin.scene_space_brief.v0",
      scale: "L0-L2",
      guidance: "This is the simplest bridge file: describe one scene in normal words so a human or agent can decide which scale it belongs to.",
      fields: [
        ["boundary_label", "What scene or space are we describing?", "Morning ferry queue, repair table, public notice screen, market corner, capsule room, wetland lookout, street edge."],
        ["purpose", "What is happening here?", "Who arrives, what they need, what moves, what waits, what breaks, what helps, what should be calmer next time."],
        ["public_summary", "What could be safely visible to a stranger?", "A short scene description that avoids names, private contacts, sensitive routes and unreviewed claims."],
        ["private_boundary", "What should the scene not reveal?", "Exact household details, health details, vulnerable people, cultural specifics, private access, security-sensitive information."],
        ["sources", "What did this description come from?", "Direct observation, photo, local note, public source link, memory, old archive, steward interview, rough map."],
        ["next_handoff", "Which builder should this become next?", "L0 sovereign space node, L1 place pack, L2 living boundary map, civic simulation brief, or hold for review."]
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
    return String(text || "digital-twin-note")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "digital-twin-note";
  }

  function section(title, body) {
    return ["## " + title, "", body || "TODO", ""].join("\n");
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

  function buildMarkdown() {
    const config = activeConfig();
    const title = value("record_title") || config.title;
    const sourceDate = value("source_date") || todayIso();

    return [
      "---",
      "schema: " + yaml(config.schema),
      "scale: " + yaml(config.scale),
      "builder_type: " + yaml(value("builder_type")),
      "title: " + yaml(title),
      "prepared_by: " + yaml(value("prepared_by")),
      "source_date: " + yaml(sourceDate),
      "draft_status: " + yaml(value("draft_status")),
      "visibility: " + yaml(config.scale === "L0" ? "private_by_default" : "permissioned_until_reviewed"),
      "---",
      "",
      "# " + title,
      "",
      "This file is a draft digital twin builder note. It should be reviewed by the right human steward before being used for public claims, site decisions, health decisions, funding applications or agent automation.",
      "",
      section("Builder Guidance", config.guidance),
      section("Boundary Or Place", value("boundary_label")),
      section("Purpose", value("purpose")),
      section("Public-Safe Summary", value("public_summary")),
      section("Private Or Approval-Only Boundary", value("private_boundary")),
      section("Sources, Evidence And Signals", value("sources")),
      section("Reviewer", value("reviewer")),
      section("Consent Scope", value("consent_scope")),
      section("Next Handoff", value("next_handoff")),
      section("Correction Or Withdrawal Path", value("correction_path")),
      "## Public Boundary",
      "",
      "- This note is not an approval, legal advice, clinical advice, cultural permission, property claim or funding commitment.",
      "- L0 raw data stays private unless the owner explicitly chooses otherwise.",
      "- L1 place context needs steward review before becoming public.",
      "- L2 summaries should use aggregate, source-dated and correction-ready information.",
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
    setStatus("Markdown updated.");
  });

  copyButton?.addEventListener("click", async () => {
    updateOutput();
    try {
      await navigator.clipboard.writeText(output.value);
      setStatus("Markdown copied.");
    } catch (error) {
      output.select();
      document.execCommand("copy");
      setStatus("Markdown selected and copied.");
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
