import { useHints } from "#app/utils/client-hints.tsx";
import { useRequestInfo } from "#app/utils/request-info.js";
import { setTheme, type Theme } from "#app/utils/theme.server.js";
import { getFormProps, useForm } from "@conform-to/react";
import { data, redirect, useFetcher } from "react-router";

import { parseWithZod } from "@conform-to/zod";
import { invariantResponse } from "@epic-web/invariant";
import { z } from "zod";
import type { Route } from "./+types/theme-switch";

const ThemeFormSchema = z.object({
  theme: z.enum(["system", "light", "dark"]),
  // this is useful for progressive enhancement
  redirectTo: z.string().optional(),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: ThemeFormSchema });

  invariantResponse(submission.status === "success", "Invalid theme received");

  const { theme, redirectTo } = submission.value;

  const responseInit = {
    headers: { "set-cookie": setTheme(theme) },
  };
  if (redirectTo) {
    return redirect(redirectTo, responseInit);
  } else {
    return data({ result: submission.reply() }, responseInit);
  }
}

export function ThemeSwitch({
  userPreference,
}: {
  userPreference?: Theme | null;
}) {
  const fetcher = useFetcher();

  const [form] = useForm({
    id: "theme-switch",
    lastResult: fetcher.data?.result,
  });

  const mode = userPreference ?? "system";

  const nextMode =
    mode === "system" ? "light" : mode === "light" ? "dark" : "system";

  const modeLabel = {
    light: <span className="">Light</span>,
    dark: <span className="">Dark</span>,
    system: <span className="">System</span>,
  };

  return (
    <fetcher.Form
      method="POST"
      {...getFormProps(form)}
      action="/resources/theme-switch"
    >
      <input type="hidden" name="theme" value={nextMode} />
      <div>
        <button type="submit">{modeLabel[mode]}</button>
      </div>
    </fetcher.Form>
  );
}

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  // const optimisticMode = useOptimisticThemeMode();
  // if (optimisticMode) {
  //   return optimisticMode === "system" ? hints.theme : optimisticMode;
  // }
  return requestInfo.hints.theme ?? hints.theme;
}
