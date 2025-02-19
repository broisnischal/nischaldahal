import { useHints } from "#app/utils/client-hints.tsx";
import { useRequestInfo } from "#app/utils/request-info.js";
import { setTheme, type Theme } from "#app/utils/theme.server.js";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invariantResponse } from "@epic-web/invariant";
import { Monitor, Moon, Sun } from 'lucide-react';
import { data, redirect, useFetcher } from "react-router";
import { ServerOnly } from "remix-utils/server-only";
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
  const requestInfo = useRequestInfo();

  const [form] = useForm({
    id: "theme-switch",
    lastResult: fetcher.data?.result,
  });

  // const optimisticMode = useOptimisticThemeMode()
  const mode = userPreference ?? 'system'

  const nextMode =
    mode === "system" ? "light" : mode === "light" ? "dark" : "light";

  const modeLabel = {
    light: <Sun />,
    dark: <Moon />,
    system: <Monitor />
  };

  return (
    <fetcher.Form
      method="POST"
      {...getFormProps(form)}
      action="/resources/theme-switch"
    >
      <ServerOnly>
        {() => (
          <input type="hidden" name="redirectTo" value={requestInfo.path} />
        )}
      </ServerOnly>
      <input type="hidden" name="theme" value={nextMode} />
      <div>
        <button className="cursor-pointer" type="submit">{modeLabel[mode]}</button>
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
  return requestInfo.userPrefs.theme ?? hints.theme;
}



/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
// export function useOptimisticThemeMode() {
//   const fetchers = useFetchers();
//   const themeFetcher = fetchers.find(
//     (f) => f.formAction === '/resources/theme-switch'
//   );

//   if (themeFetcher && themeFetcher.formData) {
//     const submission = parseWithZod(themeFetcher.formData, {
//       schema: ThemeFormSchema,
//     });

//     if (submission.status === 'success') {
//       return submission.value.theme;
//     }
//   }

//   return null
// }