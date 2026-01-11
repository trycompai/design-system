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

  await transport.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

