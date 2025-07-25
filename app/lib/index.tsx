import type { getPublicEnv, getPublicEnvExpose } from "#app/misc/env.common.ts";

export function ScriptDangerously({
    nonce,
    html,
}: {
    nonce?: string;
    html: string;
}) {
    return (
        <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
                __html: html,
            }
            }
        />
    );
}

type Props = ReturnType<typeof getPublicEnvExpose>;

function PublicEnv(props: Props) {
    return (
        <script
            id="public-env"
            dangerouslySetInnerHTML={{
                __html: `window.PUBLIC_ENV = ${JSON.stringify(props)};`,
            }
            }
        />
    );
}

export { PublicEnv };

declare global {
    interface Window {
        PUBLIC_ENV: Props;
    }
}
