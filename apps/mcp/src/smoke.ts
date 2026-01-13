import path from "node:path";
import process from "node:process";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const client = new Client(
    { name: "design-system-mcp-smoke", version: "0.0.0" },
    { capabilities: {} },
  );

  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [path.join(process.cwd(), "dist", "index.js")],
    env: Object.fromEntries(
      Object.entries(process.env).filter(([, v]) => typeof v === "string"),
    ) as Record<string, string>,
  });

  await client.connect(transport);

  const tools = await client.listTools();
  const toolNames = tools.tools.map((t) => t.name).sort();
  console.log("tools:", toolNames);

  const listResult = await client.callTool({
    name: "design_system_list_components",
    arguments: {},
  });
  console.log(
    "design_system_list_components:",
    (listResult as any).content?.[0]?.type,
  );

  const sourceResult = await client.callTool({
    name: "design_system_get_component_source",
    arguments: { id: "molecules/card" },
  });
  console.log(
    "design_system_get_component_source:",
    (sourceResult as any).content?.[0]?.type,
  );

  // Test new tools
  const themeResult = await client.callTool({
    name: "design_system_get_theme",
    arguments: {},
  });
  const themeContent = (themeResult as any).content?.[1]?.text;
  const themeTokens = themeContent ? JSON.parse(themeContent) : {};
  console.log(
    "design_system_get_theme:",
    `light=${Object.keys(themeTokens.light || {}).length} tokens, dark=${Object.keys(themeTokens.dark || {}).length} tokens`,
  );

  const guidelinesResult = await client.callTool({
    name: "design_system_get_usage_guidelines",
    arguments: {},
  });
  const guidelinesText = (guidelinesResult as any).content?.[1]?.text || "";
  console.log(
    "design_system_get_usage_guidelines:",
    `${guidelinesText.length} chars, includes className rule: ${guidelinesText.includes("className")}`,
  );

  const installResult = await client.callTool({
    name: "design_system_installation",
    arguments: { framework: "next-app" },
  });
  const installContent = (installResult as any).content?.[0]?.text;
  const installData = installContent ? JSON.parse(installContent) : {};
  console.log(
    "design_system_installation:",
    `framework=${installData.framework}, steps=${installData.steps?.length || 0}`,
  );

  // Test the new comprehensive docs tool
  const docsResult = await client.callTool({
    name: "design_system_get_component_docs",
    arguments: { id: "atoms/button" },
  });
  const docsText = (docsResult as any).content?.[0]?.text || "";
  const docsJson = (docsResult as any).content?.[1]?.text;
  const docsData = docsJson ? JSON.parse(docsJson) : {};
  console.log(
    "design_system_get_component_docs:",
    `exports=${docsData.exports?.length || 0}, variants=${docsData.variants?.length || 0}, hasStory=${docsData.hasStory}`,
  );
  console.log("  -> includes className warning:", docsText.includes("className"));

  await transport.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

