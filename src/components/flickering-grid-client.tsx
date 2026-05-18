"use client";

import dynamic from "next/dynamic";

const FlickeringGridLazy = dynamic(
  () =>
    import("@/components/magicui/flickering-grid").then(
      (m) => m.FlickeringGrid
    ),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  }
);

export function FlickeringGridClient(
  props: React.ComponentProps<typeof FlickeringGridLazy>
) {
  return <FlickeringGridLazy {...props} />;
}
