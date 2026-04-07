import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TranslateRequest {
  text: string;
  sourceLang: string;
  targetLangs: string[];
}

async function translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data && data[0] && data[0][0] && data[0][0][0]) {
      return data[0][0][0];
    }

    return text;
  } catch (error) {
    console.error(`Translation error for ${targetLang}:`, error);
    return text;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { text, sourceLang, targetLangs }: TranslateRequest = await req.json();

    const translations: Record<string, string> = {};

    translations[sourceLang] = text;

    for (const targetLang of targetLangs) {
      if (targetLang === sourceLang) {
        translations[targetLang] = text;
        continue;
      }

      const translated = await translateText(text, sourceLang, targetLang);
      translations[targetLang] = translated;

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return new Response(
      JSON.stringify({ translations }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
