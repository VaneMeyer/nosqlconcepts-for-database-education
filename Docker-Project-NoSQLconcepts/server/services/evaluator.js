import dotenv from "dotenv";

dotenv.config();

const OLLAMA_URL =
  process.env.OLLAMA_URL ||
  "http://localhost:11434";

const MODELS =
  (process.env.LLM_MODELS || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);


const API_MODELS = [
  "gwdg/qwen3-coder-next",
  "gwdg/deepseek-v4-flash",
  "meta-llama-3.1-8b-instruct",
];

const API_URL =
  process.env.LLM_API_URL || "";

const API_USER_ID =
  process.env.LLM_USER_ID || "";

const API_KEY =
  process.env.LLM_API_KEY || "";

const API_MODEL =
  process.env.LLM_MODEL || "";

const TEMPERATURE =
  Number(
    process.env.LLM_TEMPERATURE ?? 0
  );

const TIMEOUT_MS =
  Number(
    process.env.LLM_TIMEOUT_MS ??
      120000
  );

// Maximale Anzahl generierter Tokens.
const NUM_PREDICT =
  Number(
    process.env.LLM_NUM_PREDICT ??
      200
  );

const NUM_CTX =
  Number(
    process.env.LLM_NUM_CTX ??
      4096
  );

const KEEP_ALIVE =
  process.env.LLM_KEEP_ALIVE ?? "0";

/* const CATEGORIES = [
  "CORRECT",
  "SYNTAX_FEHLER",
  "FALSCHE_TABELLE",
  "FALSCHES_ATTRIBUT",
  "JOIN_FEHLER",
  "FILTER_FEHLER",
  "AGGREGATION_FEHLER",
  "GROUP_BY_FEHLER",
  "SUBQUERY_FEHLER",
  "SEMANTISCHER_FEHLER",
  "TEILWEISE_KORREKT",
  "SONSTIGER_FEHLER",
]; */
const CATEGORIES = [
  "CORRECT",
  "INCORRECT",
 
]; 

export async function evaluateWithModels({
  task,
  studentSolution,
  humanEvaluation,
  studentID,
}) {
  if (
    !MODELS.length &&
    !API_MODELS.length
  ) {
    throw Error(
      "No LLM models configured"
    );
  }

  if (
    !task?.taskID?.trim()
  ) {
    throw Error(
      "taskID is required"
    );
  }

  if (
    !studentID?.trim()
  ) {
    throw Error(
      "studentID is required"
    );
  }

  if (
    !humanEvaluation?.tutorID?.trim()
  ) {
    throw Error(
      "tutorID is required"
    );
  }

  
  const allModels = [
    ...MODELS.map((model) => ({
      model,
      provider: "ollama",
    })),

    ...API_MODELS.map((model) => ({
      model,
      provider: "api",
    })),
  ];

  const results =
    await Promise.all(
      allModels.map(
        ({ model, provider }) =>
          evaluateOne({
            model,
            provider,
            task,
            studentSolution,
          })
      )
    );

  return results.map(
    (result) => ({
      ...result,

      comparisonToHuman:
        result.success
          ? compare(
              result.evaluation,
              humanEvaluation,
              Number(task.maxPoints)
            )
          : null,
    })
  );
}

async function evaluateOne({
  model,
  provider,
  task,
  studentSolution,
}) {
  const started = Date.now();

  try {
    const raw =
      await generate(
        model,
        prompt(
          task,
          studentSolution
        ),
        provider
      );

    const parsed =
      parseJson(raw);

    const evaluation =
      normalize(
        parsed,
        Number(task.maxPoints)
      );

    return {
      model,
      provider,
      success: true,
      durationMs:
        Date.now() - started,
      evaluation,
    };
  } catch (error) {
    return {
      model,
      provider,
      success: false,
      durationMs:
        Date.now() - started,
      error: error.message,
    };
  }
}

const DATABASE_SCHEMA = `
DATABASE SCHEMA:
eteam(id, teamname, coach)
  id: team identifier
  teamname: team name
  coach: coach name

game(id, mdate, stadium, team1, team2)
  id: match identifier
  mdate: match date
  stadium: stadium
  team1 -> eteam.id
  team2 -> eteam.id

goal(matchid, teamid, player, gtime)
  matchid -> game.id
  teamid -> eteam.id
  player: scoring player
  gtime: goal minute

RELATIONSHIPS:
game.team1 -> eteam.id
game.team2 -> eteam.id
goal.matchid -> game.id
goal.teamid -> eteam.id
`;

function prompt(
  task,
  student
) {
  return `You are an expert university database tutor.

Evaluate the student's SQL solution independently.

Use only:
- task description
- database schema
- reference solution
- maximum points
- student solution

Evaluate semantic correctness, not only syntax.
Give partial credit where justified.
Do not invent requirements.

${DATABASE_SCHEMA}

Return ONLY valid JSON. No Markdown and no text outside JSON.

TASK:
${task.description}

REFERENCE SOLUTION:
${task.referenceSolution}

MAX POINTS:
${task.maxPoints}

STUDENT SOLUTION:
${student}

ALLOWED ERROR CATEGORIES:
${CATEGORIES.join(", ")}

JSON:
{
  "points": number,
  "errorCategory": "allowed category",
  "errorSummary": "short main error with maximum 5 words or 'No relevant error.'",
  "reasoning": "short justification in one sentence",
  "confidence": number between 0 and 1
}`;
}


async function generate(
  model,
  promptText,
  provider
) {
  if (
    provider === "api"
  ) {
    return generateFromApi(
      model,
      promptText
    );
  }

  return generateFromOllama(
    model,
    promptText
  );
}


async function generateFromOllama(
  model,
  promptText
) {
  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () =>
        controller.abort(),
      TIMEOUT_MS
    );

  const requestStarted =
    Date.now();

  try {
    const response =
      await fetch(
        `${OLLAMA_URL}/api/generate`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            model,
            prompt: promptText,
            stream: false,
            keep_alive:
              KEEP_ALIVE,

            options: {
              temperature:
                TEMPERATURE,

              num_predict:
                NUM_PREDICT,

              num_ctx:
                NUM_CTX,

              num_thread: 4,
            },
          }),

          signal:
            controller.signal,
        }
      );

    if (!response.ok) {
      throw Error(
        `Ollama HTTP ${response.status}: ${await response.text()}`
      );
    }

    const data =
      await response.json();

    const nsToSeconds =
      (value) =>
        Number(value || 0) /
        1e9;

    const generationSeconds =
      nsToSeconds(
        data.eval_duration
      );

    const tokensPerSecond =
      generationSeconds > 0
        ? (
            data.eval_count /
            generationSeconds
          ).toFixed(2)
        : "n/a";

    console.log(
      `\n===== OLLAMA PERFORMANCE: ${model} =====`
    );

    console.table({
      PromptCharacters:
        promptText.length,

      RequestTotalSeconds:
        (
          (Date.now() -
            requestStarted) /
          1000
        ).toFixed(2),

      ModelLoadSeconds:
        nsToSeconds(
          data.load_duration
        ).toFixed(2),

      PromptEvaluationSeconds:
        nsToSeconds(
          data.prompt_eval_duration
        ).toFixed(2),

      GenerationSeconds:
        generationSeconds.toFixed(
          2
        ),

      OllamaTotalSeconds:
        nsToSeconds(
          data.total_duration
        ).toFixed(2),

      InputTokens:
        data.prompt_eval_count,

      OutputTokens:
        data.eval_count,

      TokensPerSecond:
        tokensPerSecond,
    });

    if (
      !data.response
    ) {
      throw Error(
        "Ollama returned no response"
      );
    }

    return data.response;
  } catch (error) {
    if (
      error.name ===
      "AbortError"
    ) {
      throw Error(
        `Ollama timeout after ${TIMEOUT_MS} ms`
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}


async function generateFromApi(
  model,
  promptText
) {
  if (!API_URL) {
    throw Error(
      "LLM_API_URL is not configured"
    );
  }

  if (!API_USER_ID) {
    throw Error(
      "LLM_USER_ID is not configured"
    );
  }

  if (!API_KEY) {
    throw Error(
      "LLM_API_KEY is not configured"
    );
  }

  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () =>
        controller.abort(),
      TIMEOUT_MS
    );

  const requestStarted =
    Date.now();

  try {
    
    const endpoint =
      API_URL.replace(
        /\/+$/,
        ""
      ).endsWith(
        "/chat/completions"
      )
        ? API_URL.replace(
            /\/+$/,
            ""
          )
        : `${API_URL.replace(
            /\/+$/,
            ""
          )}/chat/completions`;

    const response =
      await fetch(
        endpoint,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${API_KEY}`,

            "X-User-ID":
              API_USER_ID,
          },

          body: JSON.stringify({
            model,

            messages: [
              {
                role: "user",
                content:
                  promptText,
              },
            ],

            temperature:
              TEMPERATURE,

            max_tokens:
              NUM_PREDICT,

            stream: false,
          }),

          signal:
            controller.signal,
        }
      );

    if (!response.ok) {
      throw Error(
        `API HTTP ${response.status}: ${await response.text()}`
      );
    }

    const data =
      await response.json();

   
    const content =
      data?.choices?.[0]?.message
        ?.content;

    if (
      typeof content ===
        "string" &&
      content.trim()
    ) {
      console.log(
        `\n===== API PERFORMANCE: ${model} =====`
      );

      console.table({
        PromptCharacters:
          promptText.length,

        RequestTotalSeconds:
          (
            (Date.now() -
              requestStarted) /
            1000
          ).toFixed(2),

        Model:
          model,

        Provider:
          "OpenAI-compatible API",
      });

      return content;
    }

   
    if (
      Array.isArray(
        content
      )
    ) {
      const text =
        content
          .map((item) =>
            typeof item ===
              "string"
              ? item
              : item?.text ||
                ""
          )
          .join("");

      if (text.trim()) {
        return text;
      }
    }

    throw Error(
      "API returned no valid message content"
    );
  } catch (error) {
    if (
      error.name ===
      "AbortError"
    ) {
      throw Error(
        `API timeout after ${TIMEOUT_MS} ms`
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function parseJson(
  value
) {
  const text =
    String(value)
      .trim()
      .replace(
        /^```json\s*/i,
        ""
      )
      .replace(
        /^```\s*/i,
        ""
      )
      .replace(
        /\s*```$/,
        ""
      )
      .trim();

  try {
    return JSON.parse(
      text
    );
  } catch {
    const start =
      text.indexOf("{");

    const end =
      text.lastIndexOf("}");

    if (
      start >= 0 &&
      end > start
    ) {
      try {
        return JSON.parse(
          text.slice(
            start,
            end + 1
          )
        );
      } catch {
        throw Error(
          "LLM returned invalid JSON"
        );
      }
    }

    throw Error(
      "LLM did not return valid JSON"
    );
  }
}

function normalize(
  value,
  maxPoints
) {
  if (
    !value ||
    typeof value !==
      "object"
  ) {
    throw Error(
      "LLM evaluation is not an object"
    );
  }

  const points =
    Number(value.points);

  const confidence =
    Number(value.confidence);

  if (
    !Number.isFinite(points)
  ) {
    throw Error(
      "Invalid points"
    );
  }

  if (
    !CATEGORIES.includes(
      value.errorCategory
    )
  ) {
    throw Error(
      `Unknown error category: ${value.errorCategory}`
    );
  }

  if (
    !Number.isFinite(
      maxPoints
    ) ||
    maxPoints <= 0
  ) {
    throw Error(
      "Invalid maximum points"
    );
  }

  return {
    points:
      Number(
        Math.min(
          maxPoints,
          Math.max(
            0,
            points
          )
        ).toFixed(2)
      ),

    errorCategory:
      value.errorCategory,

    errorSummary:
      String(
        value.errorSummary ||
          ""
      ).trim(),

    reasoning:
      String(
        value.reasoning ||
          ""
      ).trim(),

    confidence:
      Number.isFinite(
        confidence
      )
        ? Number(
            Math.min(
              1,
              Math.max(
                0,
                confidence
              )
            ).toFixed(4)
          )
        : null,
  };
}

function compare(
  evaluation,
  humanEvaluation,
  maxPoints
) {
  const llmPoints =
    Number(
      evaluation.points
    );

  const tutorPoints =
    Number(
      humanEvaluation.points
    );

  const difference =
    llmPoints -
    tutorPoints;

  const normalizedDifference =
    maxPoints > 0
      ? (difference /
          maxPoints) *
        100
      : 0;

  return {
    pointDifference:
      Number(
        difference.toFixed(2)
      ),

    absolutePointDifference:
      Number(
        Math.abs(
          difference
        ).toFixed(2)
      ),

    normalizedDifferencePercent:
      Number(
        normalizedDifference.toFixed(
          2
        )
      ),

    categoryMatches:
      humanEvaluation.category
        ? evaluation.errorCategory ===
          humanEvaluation.category
        : null,
  };
}

export {
  CATEGORIES,
  MODELS,
  API_MODELS,
};