"use server";


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    BedrockAgentRuntimeClient,
    InvokeAgentCommand,
  } from "@aws-sdk/client-bedrock-agent-runtime";
  
  /**
   * @typedef {Object} ResponseBody
   * @property {string} completion
   */
  
  /**
   * Invokes a Bedrock agent to run an inference using the input
   * provided in the request body.
   *
   * @param {string} prompt - The prompt that you want the Agent to complete.
   * @param {string} sessionId - An arbitrary identifier for the session.
   */
  export const invokeBedrockAgent = async (prompt, sessionId) => {
    const client = new BedrockAgentRuntimeClient({
      region: "eu-west-3",
      credentials: {
        accessKeyId: process.env.AWS_BEDROCK_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_BEDROCK_SECRET_ACCESS_KEY,
      },
    });


    const agentId = process.env.AWS_BEDROCK_AGENT_ID;
    const agentAliasId = process.env.AWS_BEDROCK_AGENT_ALIAS_ID
  
    const command = new InvokeAgentCommand({
      agentId,
      agentAliasId,
      sessionId,
      inputText: prompt,
    });
  
    try {
      let completion = "";
      const response = await client.send(command);
  
      if (response.completion === undefined) {
        throw new Error("Completion is undefined");
      }
  
      for await (let chunkEvent of response.completion) {
        const chunk = chunkEvent.chunk;
        // console.log(chunk);
        const decodedResponse = new TextDecoder("utf-8").decode(chunk.bytes);
        completion += decodedResponse;
      }
  
      return { sessionId: sessionId, completion };
    } catch (err) {
      console.error(err);
    }
  };
  
  // Call function if run directly
  import { fileURLToPath } from "url";
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const result = await invokeBedrockAgent("I need help.", "123");
    console.log(result);
  }